import { SliderModel } from "../model/SliderModel";
import { Options } from "../model/Options";
import { Controller } from "./Controller";

export class SlideController {
    private _model: SliderModel;

    constructor(parent:HTMLElement, props: Options) {
        //props.orientation = Orientation.Vertical;
        props.min = 0;
        props.max = 100;
        props.step = 10;
        props.range = true;
        //props.orientation = Orientation.Vertical;
        this._model = new SliderModel(props);
        let contr: Controller = new Controller(parent, this._model);
        //contr.changeOrientation(Orientation.Vertical);
        /*
        this.makeView(parent);
        
        this._view.showLabel();
        this.updatePosition();

        window.addEventListener('resize', this.onResize.bind(this));
        */

        //let view: Slider = new Slider(parent, props.orientation ? props.orientation : Orientation.Horizontal, this);
        //view.setVertical();
        //view.update(Orientation.Horizontal, .1);
    }
/*
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
    }*/
}