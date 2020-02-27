import { Orientation } from "../../model/Orientation";
import { Controller } from "../../controller/Controller";
import { Marker } from "../marker/Marker";
import { FillBar } from "../fill_bar/FillBar";

class Slider {
  private static readonly SLIDER_CLASS: string = 'slider';
  private static readonly SLIDER_VERTICAL_CLASS: string = 'slider--vertical';

  private _controller: Controller;

  protected _parent: HTMLElement;
  protected _container: HTMLElement;
  private _markers: Marker[];
  private _fillBar: FillBar;
  private _orientation: Orientation;
  private _isRange: boolean;

  constructor(parent: HTMLElement, orientation: Orientation, controller: Controller, isRange: boolean = false) {
    this._parent = parent;
    this._controller = controller;
    this._orientation = orientation;
    this._isRange = isRange;

    this.createContainer();
    this.createFillBar();
    this.createMarkers();

    this._container.addEventListener('click', this.onClickTrack.bind(this));
  }

  update(orientation: Orientation, position: number, value: number, id: number) {
    if (orientation == Orientation.Horizontal) {
      this.updateHorizontalPosition(position, orientation, value, id);
    } else {
      this.updateVerticalPosition(position, orientation, value, id);
    }
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

  changeOrientation(orientation: Orientation) {
    if (orientation == Orientation.Horizontal) {
      this.setHorizontal();
    }

    if (orientation == Orientation.Vertical) {
      this.setVertical();
    }
  }

  private getSliderLength(): number {
    if (this._orientation == Orientation.Horizontal) {
      return this._container.getBoundingClientRect().width;
    }

    if (this._orientation == Orientation.Vertical) {
      return this._container.getBoundingClientRect().height;
    }

    return 0;
  }

  private getX(): number {
    return this._container.getBoundingClientRect().left;
  }

  private getY(): number {
    return this._container.getBoundingClientRect().top;
  }

  private moveMarker(id: number, clientX: number, clientY: number) {
    let pos: number = 0;

    if (this._orientation == Orientation.Horizontal) {
      pos = (clientX - this.getX()) / this.getSliderLength();
    }

    if (this._orientation == Orientation.Vertical) {
      const offsetPos = clientY - this.getY();
      pos = 1 - (offsetPos / this.getSliderLength());
    }

    pos = (pos > 1) ? 1 : pos;
    pos = (pos < 0) ? 0 : pos;

    this._controller.move(pos, id);
  }

  onClickTrack(e: MouseEvent) {
    if (this._orientation == Orientation.Horizontal) {
      const mousePos = e.clientX - this._container.getBoundingClientRect().left;
      const pos = mousePos / this._container.getBoundingClientRect().width;
      this._controller.moveByTrackClick(pos);
    } else {
      const mousePos = Math.abs(e.clientY - this._container.getBoundingClientRect().bottom);
      const pos = mousePos / this._container.getBoundingClientRect().height;
      this._controller.moveByTrackClick(pos);
    }
  }

  private setHorizontal() {
    this._orientation = Orientation.Horizontal;
    this._container.classList.remove(Slider.SLIDER_VERTICAL_CLASS);
    for (let i = 0; i < this._markers.length; i++) {
      this._markers[i].setHorizontal();
    }

    this._fillBar.setHorizontal();
  }

  private setVertical() {
    this._orientation = Orientation.Vertical;
    this._container.classList.add(Slider.SLIDER_VERTICAL_CLASS);
    for (let i = 0; i < this._markers.length; i++) {
      this._markers[i].setVertical();
    }

    this._fillBar.setVertical();
  }

  private updateHorizontalPosition(position: number, orientation: Orientation, value: number, id: number) {
    let sliderLength: number = this._container.getBoundingClientRect().width;
    position = position * sliderLength;
    this._markers[id].setPositionX(position);
    this._markers[id].setValue(value);

    if (this._markers.length > 1) {
      let left: number = this._markers[0].getLeft();
      let right: number = this._markers[1].getRight() - this._container.getBoundingClientRect().left;
      this._fillBar.update(left - this._container.getBoundingClientRect().left, this._container.getBoundingClientRect().width - right, orientation);
    } else {
      let offset: number = this._markers[0].getWidth() / 2;
      this._fillBar.update(0, this._container.getBoundingClientRect().width - position - offset, orientation);
    }
  }

  private updateVerticalPosition(position: number, orientation: Orientation, value: number, id: number) {
    let sliderLength: number = this._container.getBoundingClientRect().height;
    position = position * sliderLength;
    this._markers[id].setPositionY(position);
    this._markers[id].setValue(value);

    if (this._markers.length > 1) {
      const markerHalfHeight = this._markers[1].getHeight() / 2;
      const bottom: number = this._markers[0].getPositionY() + markerHalfHeight;
      const top: number = this._container.getBoundingClientRect().height - this._markers[1].getPositionY() - markerHalfHeight;
      this._fillBar.update(bottom, top, orientation);
    } else {
      const top = this._container.getBoundingClientRect().height - position;
      this._fillBar.update(0, top, orientation);
    }
  }

  private createContainer() {
    this._container = document.createElement('div');
    this._container.classList.add(Slider.SLIDER_CLASS);

    if (this._orientation == Orientation.Vertical) {
      this._container.classList.add(Slider.SLIDER_VERTICAL_CLASS);
    }

    this._parent.appendChild(this._container);
  }

  private createFillBar() {
    this._fillBar = new FillBar(this._container, this._orientation);
  }

  private createMarkers() {
    this._markers = [];
    this._markers.push(new Marker(this._container, this.moveMarker.bind(this), 0, this._orientation));

    if (this._isRange) {
      this._markers.push(new Marker(this._container, this.moveMarker.bind(this), 1, this._orientation));
    }
  }

}

export { Slider };
