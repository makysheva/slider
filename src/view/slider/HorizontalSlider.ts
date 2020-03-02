import { Controller } from "../../controller/Controller";
import { Marker } from "../marker/Marker";
import { Orientation } from "../../model/Orientation";
import { FillBar } from "../fill_bar/FillBar";
import Slider from "./Slider";
import MinMax from "../label/MinMax";
import SliderData from "./SliderData";

class HorizontalSlider extends Slider {
  constructor(parent: HTMLElement, controller: Controller) {
    super(parent, controller);
  }

  protected createTrack() {
    this._track = document.createElement('div');
    this._track.classList.add('slider');
    this._parent.appendChild(this._track);
    this._track.addEventListener('click', this.onClickTrack.bind(this));
  }

  update(data: SliderData) {
    let sliderLength: number = this._track.getBoundingClientRect().width;
    let pos: number = data.position * sliderLength;
    this._markers[data.markerId].setPositionX(pos);
    this._markers[data.markerId].setValue(data.value);

    let low: number = 0;
    let hight: number = 0;
    const trackRect: DOMRect = this._track.getBoundingClientRect();

    if (this._markers.length > 1) {
      low = this._markers[0].getPositionX() - trackRect.left;
      hight = trackRect.width - (this._markers[1].getPositionX() - trackRect.left);
    } else {
      hight = trackRect.width - (this._markers[0].getPositionX() - trackRect.left);
    }

    this._fillBar.update(low, hight, data.orientation);
    this._minMax.update(data.min, data.max);
  }

  addMarker(id: number) {
    if (this._markers.length < Slider.MAX_MARKERS) {
      let marker: Marker = new Marker(this._track, this.onMoveMarker.bind(this), id, Orientation.Horizontal);
      this._markers.push(marker);
    }
  }

  protected onClickTrack(e: MouseEvent) {
    const mousePos = e.clientX - this._track.getBoundingClientRect().left;
    const pos = mousePos / this._track.getBoundingClientRect().width;
    this._controller.moveByTrackClick(pos);
  }

  protected onMoveMarker(id: number, clientX: number, clientY: number) {
    const rect: DOMRect = this._track.getBoundingClientRect();
    let pos: number = (clientX - rect.left) / rect.width;
    pos = (pos > 1) ? 1 : pos;
    pos = (pos < 0) ? 0 : pos;
    this._controller.move(pos, id);
  }

  protected createFillBar() {
    this._fillBar = new FillBar(this._track, Orientation.Horizontal);
  }

  protected createMinMax() {
    this._minMax = new MinMax(this._track, Orientation.Horizontal);
  }
}

export default HorizontalSlider;
