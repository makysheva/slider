import Slider from "../view/slider/Slider";
import { Orientation } from "../model/Orientation";
import { SliderModel } from "../model/SliderModel";
import { ModelEvents } from "../model/ModelEvents";
import HorizontalSlider from "../view/slider/HorizontalSlider";
import VerticalSlider from "../view/slider/VerticalSlider";
import SliderData from "../view/slider/SliderData";

class Controller {
  private _parent: HTMLElement;
  private _view: Slider;
  private _model: SliderModel;

  constructor(parent: HTMLElement, model: SliderModel) {
    this._parent = parent;
    this._model = model;

    this.addListenersToModel();
    this.createView();
    this.updateView();
    this.addResizeListener();    
  }

  addListenersToModel() {
    this._model.addEventListener(ModelEvents.changeValue, this.onChangeValue.bind(this));
    this._model.addEventListener(ModelEvents.changeOrientation, this.onChangeOrientation.bind(this));
    this._model.addEventListener(ModelEvents.changeLabelVisibility, this.onChangeLabelVisibility.bind(this));
    this._model.addEventListener(ModelEvents.changeRange, this.onChangeRange.bind(this));
  }

  createView() {
    if (this._model.orientation == Orientation.Horizontal) {
      this._view = new HorizontalSlider(this._parent, this);
    } else {
      this._view = new VerticalSlider(this._parent, this);
    }

    this._view.createSlider();
    this._view.addMarker(0);
    
    if (this._model.range) {
      this._view.addMarker(1);
    }
  }

  destroyView() {
    this._view.destroy();
  }

  addResizeListener() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  move(position: number, id: number) {
    this._model.setPosition(position, id);
  }

  moveByTrackClick(position: number) {
    this._model.nearestMarkerPosition = position;
  }

  changeOrientation(orientation: Orientation) {
    this._model.orientation = orientation;
  }

  private updateView() {
    this._view.setLabelVisibility(this._model.labels);
    let data: SliderData = {
      position: this._model.getPosition(0),
      value: this._model.getValue(0),
      min: this._model.min,
      max: this._model.max,
      orientation: this._model.orientation,
      markerId: 0,
    };
    this._view.update(data);

    if (this._model.range) {
      data.position = this._model.getPosition(1);
      data.value = this._model.getValue(1);
      data.markerId = 1;
      this._view.update(data);
    }
  }

  private onResize(event: any) {
    this.updateView();
  }

  private onChangeValue(data: SliderModel) {
    this.updateView();
  }

  private onChangeLabelVisibility() {
    this._view.setLabelVisibility(this._model.labels);
  }

  private onChangeOrientation() {
    this.destroyView();
    this.createView();
    this.updateView();
  }

  private onChangeRange(isRange: boolean) {
    this.destroyView();
    this.createView();
    this.updateView();
  }
}

export { Controller };
