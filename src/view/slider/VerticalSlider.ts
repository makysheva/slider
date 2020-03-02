import { Controller } from "../../controller/Controller";
import { Marker } from "../marker/Marker";
import { FillBar } from "../fill_bar/FillBar";
import { Orientation } from "../../model/Orientation";
import Slider from "./Slider";
import MinMax from "../label/MinMax";
import SliderData from "./SliderData";

class VerticalSlider extends Slider {
  constructor(parent: HTMLElement, controller: Controller) {
    super(parent, controller);
  }

  protected createTrack() {
    this._track = document.createElement('div');
    this._track.classList.add('slider');
    this._track.classList.add('slider--vertical');
    this._parent.appendChild(this._track);
    this._track.addEventListener('click', this.onClickTrack.bind(this));
  }

  destroy() {
    this._track.remove();
  }

  update(data: SliderData) {
    let sliderLength: number = this._track.getBoundingClientRect().height;
    let pos: number = data.position * sliderLength;
    this._markers[data.markerId].setPositionY(pos);
    this._markers[data.markerId].setValue(data.value);

    if (this._markers.length > 1) {
      const markerHalfHeight = this._markers[1].getHeight() / 2;
      const bottom: number = this._markers[0].getPositionY() + markerHalfHeight;
      const top: number = this._track.getBoundingClientRect().height - this._markers[1].getPositionY() - markerHalfHeight;
      this._fillBar.update(bottom, top, data.orientation);
    } else {
      const top = this._track.getBoundingClientRect().height - pos;
      this._fillBar.update(0, top, data.orientation);
    }

    this._minMax.update(data.min, data.max);
  }

  addMarker(id: number) {
    if (this._markers.length < Slider.MAX_MARKERS) {
      let marker: Marker = new Marker(this._track, this.onMoveMarker.bind(this), id, Orientation.Vertical);
      this._markers.push(marker);
    }
  }

  onMoveMarker(id: number, clientX: number, clientY: number) {
    const offsetPos = clientY - this._track.getBoundingClientRect().top;
    let pos: number = 1 - (offsetPos / this._track.getBoundingClientRect().height);
    pos = (pos > 1) ? 1 : pos;
    pos = (pos < 0) ? 0 : pos;

    this._controller.move(pos, id);
  }

  protected onClickTrack(e: MouseEvent) {
    const mousePos = Math.abs(e.clientY - this._track.getBoundingClientRect().bottom);
    const pos = mousePos / this._track.getBoundingClientRect().height;
    this._controller.moveByTrackClick(pos);
  }

  protected createFillBar() {
    this._fillBar = new FillBar(this._track, Orientation.Vertical);
  }

  protected createMinMax() {
    this._minMax = new MinMax(this._track, Orientation.Vertical);
  }
}

export default VerticalSlider;
