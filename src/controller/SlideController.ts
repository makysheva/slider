import { SliderModel } from "../model/SliderModel";
import { Options } from "../model/Options";
import { HorizontalSingleView } from "../view/HorizontalSingleView";
import { Orientation } from "../model/Orientation";
import { SingleView } from "../view/SingleView";
import { VerticalSingleView } from "../view/VerticalSingleView";
import { Slider } from "../view/slider/Slider";

export class SlideController {
    private _model: SliderModel;
    private _view: SingleView;

    constructor(parent:HTMLElement, props: Options) {
        //props.orientation = Orientation.Vertical;
        props.min = 2;
        props.max = 10;
        props.step = 1;
        this._model = new SliderModel(props);
        /*
        this.makeView(parent);
        
        this._view.showLabel();
        this.updatePosition();

        window.addEventListener('resize', this.onResize.bind(this));
        */

        let view: Slider = new Slider(parent, props.orientation ? props.orientation : Orientation.Horizontal);
        //view.setVertical();
        view.update(Orientation.Horizontal, .1);
    }

    destroy() {
        this._view.destroy();
    }

    changeOrientation(orientation: Orientation) {
        if (this._model.orientation !== orientation) {
            this.destroy();
            let parent: HTMLElement = this._view.getParent();
            this._model.orientation = orientation;
            this.makeView(parent);
        }
    }

    move(position: number) {
        this._model.position = position;
        this.updatePosition();
        
        // emmit onChange event
    }

    moveRange(positions: number[]) {
        this._model.positions = positions;
        //this._view.setPositions(this._model.positions);
        // emmit onChange event
    }

    private updatePosition() {
        this._view.update(this._model.position, this._model.value);
    }

    private onResize(event: any) {
        this.updatePosition();
    }

    private makeView(parent: HTMLElement) {
        switch (this._model.orientation) {
            case Orientation.Horizontal:
                this._view = new HorizontalSingleView(parent, this, Orientation.Horizontal);
                break;
            case Orientation.Vertical:
                this._view = new VerticalSingleView(parent, this, Orientation.Vertical);
            break;
        }
    }
}