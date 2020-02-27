import { Slider } from "../view/slider/Slider";
import { Orientation } from "../model/Orientation";
import { SliderModel } from "../model/SliderModel";
import { ModelEvents } from "../model/ModelEvents";

class Controller {
  private _view: Slider;
  private _model: SliderModel;

  constructor(parent: HTMLElement, model: SliderModel) {
    this._model = model;
    this._model.addEventListener(ModelEvents.changeValue, this.onChangeValue.bind(this));
    this._model.addEventListener(ModelEvents.changeOrientation, this.onChangeOrientation.bind(this));
    this._model.addEventListener(ModelEvents.changeLabelVisibility, this.onChangeLabelVisibility.bind(this));

    this._view = new Slider(parent, this._model.orientation, this, this._model.range);
    this.updateView();

    this._view.setLabelVisibility(this._model.labels);

    window.addEventListener('resize', this.onResize.bind(this));
  }

  move(position: number, id: number) {
    this._model.setPosition(position, id);
  }

  changeOrientation(orientation: Orientation) {
    this._model.orientation = orientation;
  }

  private updateView() {
    this._view.update(this._model.orientation, this._model.getPosition(0), this._model.getValue(0), 0);
    if (this._model.range) {
      this._view.update(this._model.orientation, this._model.getPosition(1), this._model.getValue(1), 1);
    }
  }

  private onResize(event: any) {
    this.updateView();
  }

  private onChangeValue(data: SliderModel) {
    this.updateView();
  }

  private onChangeLabelVisibility(data: SliderModel) {
    this._view.setLabelVisibility(this._model.labels);
  }

  private onChangeOrientation(data: SliderModel) {
    this._view.changeOrientation(this._model.orientation);
    this.updateView();
  }
}

export { Controller };
