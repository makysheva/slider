import { Orientation } from "../../model/Orientation";

class MinMax {
  private _parent: HTMLElement;
  private _labelMin: HTMLElement;
  private _labelMax: HTMLElement;
  private _orientation: Orientation;

  constructor(parent: HTMLElement, orientation: Orientation) {
    this._parent = parent;
    this._orientation = orientation;

    this.createLabels();
    this.applyOrientation();
  }

  update(min: number, max: number) {
    this._labelMin.textContent = min.toString();
    this._labelMax.textContent = max.toString();
  }

  private createLabels() {
    this._labelMin = document.createElement('div');
    this._labelMin.classList.add('slider__min-max');
    this._parent.appendChild(this._labelMin);
    
    this._labelMax = document.createElement('div');
    this._labelMax.classList.add('slider__min-max');
    this._parent.appendChild(this._labelMax);
  }

  private applyOrientation() {
    if (this._orientation == Orientation.Horizontal) {
      this._labelMin.classList.add('slider__min-max_left');
      this._labelMax.classList.add('slider__min-max_right');
    } else {
      this._labelMin.classList.add('slider__min-max_bottom');
      this._labelMax.classList.add('slider__min-max_top');
    }
  }
}

export default MinMax;
