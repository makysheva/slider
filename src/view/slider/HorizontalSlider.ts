import { Controller } from "../../controller/Controller";
import { Marker } from "../marker/Marker";
import { Orientation } from "../../model/Orientation";
import { FillBar } from "../fill_bar/FillBar";
import Slider from "./Slider";

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

  update(orientation: any, position: number, value: number, markerId: number) {
    let sliderLength: number = this._track.getBoundingClientRect().width;
    position = position * sliderLength;
    this._markers[markerId].setPositionX(position);
    this._markers[markerId].setValue(value);

    let low: number = 0;
    let hight: number = 0;
    const trackRect: DOMRect = this._track.getBoundingClientRect();

    if (this._markers.length > 1) {
      low = this._markers[0].getPositionX() - trackRect.left;
      hight = trackRect.width - (this._markers[1].getPositionX() - trackRect.left);
    } else {
      hight = trackRect.width - (this._markers[0].getPositionX() - trackRect.left);
    }

    this._fillBar.update(low, hight, orientation);
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
}

export default HorizontalSlider;
