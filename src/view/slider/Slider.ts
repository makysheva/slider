import { Orientation } from "../../model/Orientation";
import { Controller } from "../../controller/Controller";
import { Marker } from "../marker/Marker";
import { FillBar } from "../fill_bar/FillBar";

abstract class Slider {
  protected static readonly MAX_MARKERS: number = 2;

  protected _sliderClass: string;
  protected _parent: HTMLElement;
  protected _controller: Controller;
  protected _track: HTMLElement;
  protected _markers: Marker[] = [];
  protected _fillBar: FillBar;

  constructor(parent: HTMLElement, controller: Controller) {
    this._parent = parent;
    this._controller = controller;
  }

  createSlider() {
    this.createTrack();
    this.createFillBar();
  }

  destroy() {
    this._track.remove();
  }

  setLabelVisibility(value: boolean) {
    this._markers.forEach((marker: Marker) => {
      if (value) {
        marker.showLabel();
      } else {
        marker.hideLabel();
      }
    });
  }

  abstract update(orientation: any, position: number, value: number, markerId: number): void;
  abstract addMarker(id: number): void;
  protected abstract createTrack(): void;
  protected abstract onClickTrack(e: MouseEvent): void;
  protected abstract onMoveMarker(id: number, clientX: number, clientY: number): void;
  protected abstract createFillBar(): void;
}

export default Slider;
