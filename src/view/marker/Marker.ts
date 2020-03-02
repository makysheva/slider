import { LabelView } from "../label/LabelView";
import { Orientation } from "../../model/Orientation";

class Marker {
  private _parent: HTMLElement;
  private _marker: HTMLElement;
  private _label: LabelView;
  private _moveHandler: any;
  private _id: number;
  private _orientation: Orientation;
  private _moveCallback: (id: number, posX: number, posY: number) => void;
  private _positionY: number;

  constructor(parent: HTMLElement, moveCallback: (id: number, posX: number, posY: number) => void, id: number, orientation: Orientation) {
    this._parent = parent;
    this._moveCallback = moveCallback;
    this._id = id;
    this._orientation = orientation;

    this._marker = document.createElement('div');
    this._marker.classList.add('slider__marker');
    this._parent.appendChild(this._marker);
    this._label = new LabelView(this._marker, this._orientation);
    this._label.show();

    this._marker.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  getPositionX(): number {
    const rect: DOMRect = this._marker.getBoundingClientRect();
    return rect.right - (rect.width / 2);
  }

  getWidth(): number {
    return this._marker.getBoundingClientRect().width;
  }

  getHeight(): number {
    return this._marker.getBoundingClientRect().height;
  }

  getLeft(): number {
    return this._marker.getBoundingClientRect().left;
  }

  getRight(): number {
    return this._marker.getBoundingClientRect().right;
  }

  getBottom(): number {
    return this._marker.getBoundingClientRect().bottom;
  }

  setPositionX(x: number) {
    const halfSize = this._marker.getBoundingClientRect().width / 2;
    const position = x - halfSize;
    this._marker.style.left = position + 'px';
  }

  getPositionY(): number {
    return this._positionY;
  }

  setPositionY(y: number) {
    const halfSize = this._marker.getBoundingClientRect().height / 2;
    this._positionY = y - halfSize;
    this._marker.style.bottom = this._positionY + 'px';
  }

  showLabel() {
    this._label.show();
  }

  hideLabel() {
    this._label.hide();
  }

  setValue(value: number) {
    this._label.setValue(value);
  }

  setHorizontal() {
    this._marker.style.top = 'auto';
    this._label.setHorizontal();
  }

  setVertical() {
    this._marker.style.left = 'auto';
    this._label.setVertical();
  }

  protected onMouseDown(event: any) {
    event.preventDefault();

    if (!this._moveHandler) {
      this._moveHandler = this.onMove.bind(this);
      document.addEventListener('mousemove', this._moveHandler);
    }
  }

  private onMove(event: any) {
    this._moveCallback(this._id, event.clientX, event.clientY);
  }

  private onMouseUp(event: any) {
    document.removeEventListener('mousemove', this._moveHandler);
    this._moveHandler = null;
  }

}

export { Marker };
