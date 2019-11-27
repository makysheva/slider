import { Slider } from "../view/slider/Slider";
import { Orientation } from "../model/Orientation";
import { SliderModel } from "../model/SliderModel";

export class Controller {
    private _view: Slider;
    private _model: SliderModel;

    constructor(parent: HTMLElement, model: SliderModel) {
        this._model = model;
        this._view = new Slider(parent, this._model.orientation, this, this._model.range);
        this.updateView();

        window.addEventListener('resize', this.onResize.bind(this));
    }

    private onResize(event: any) {
        this.updateView();
    }

    move(position: number, id: number) {
        //this._model.position = position;
        this._model.setPosition(position, id);
        this.updateView();
    }

    changeOrientation(orientation: Orientation) {
        this._model.orientation = orientation;
        this._view.changeOrientation(orientation);
        this.updateView();
    }

    private updateView() {
        this._view.update(this._model.orientation, this._model.getPosition(0), this._model.getValue(0), 0);
        if (this._model.range) {
            this._view.update(this._model.orientation, this._model.getPosition(1), this._model.getValue(1), 1);
        }
    }
}