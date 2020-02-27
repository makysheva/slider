import { Observer } from "../observer/Observer";
import { Options } from "./Options";
import { Orientation } from "./Orientation";
import { MarkerModel } from "./MarkerModel";
import { ModelEvents } from "./ModelEvents";

class SliderModel {
  private _observers: Observer = new Observer();

  private _min: number = 0;
  private _max: number = 100;
  private _step: number = 1;
  private _range: boolean = false;
  private _orientation: Orientation = Orientation.Horizontal;
  private _showLabels: boolean = false;
  private _markers: MarkerModel[];

  constructor(props: Options) {
    let min: number = props.min ? props.min : this._min;
    let max: number = props.max ? props.max : this._max;
    this.minMax = [min, max];
    this._range = props.range ? props.range : this._range;
    this._step = props.step ? props.step : this._step;
    this._showLabels = props.showLabels ? props.showLabels : this._showLabels;
    this._orientation = props.orientation ? props.orientation : this._orientation;

    if (this._range) {
      this._markers = [
        new MarkerModel(this, min),
        new MarkerModel(this, max)
      ];
    } else {
      let value: number = props.value ? props.value : min;
      this._markers = [new MarkerModel(this, value)];
    }
  }

  get minMax(): number[] {
    return [this._min, this._max];
  }

  set minMax(value: number[]) {
    if (value[0] < value[1]) {
      this._min = value[0];
      this._max = value[1];
    } else {
      throw new Error('Min should be less then Max.');
    }
  }

  get value(): number {
    return this._markers[0].value;
  }

  get range(): boolean {
    return this._range;
  }

  set value(value: number) {
    if (this._range) {
      throw new Error('Range slider have multiple values.');
    }
    this.setValue(value, 0);
  }

  get values(): number[] {
    return [this._markers[0].value, this._markers[1].value];
  }

  set values(val: number[]) {
    this.checkRange();

    if (val[0]) {
      this._markers[0].value = val[0];
    }

    if (val[1]) {
      this._markers[1].value = val[1];
    }
  }

  get step(): number {
    return this._step;
  }

  set step(value: number) {
    if (value < (this._max - this._min)) {
      this._step = value;
    } else {
      throw new Error('Step should be between min and max.');
    }
  }

  get position(): number {
    return this._markers[0].position;
  }

  set position(value: number) {
    this.setPosition(value, 0);
  }

  get positions(): number[] {
    return [this._markers[0].position, this._markers[1].position];
  }

  set positions(pos: number[]) {
    this.checkRange();

    if (pos[0]) {
      this._markers[0].position = pos[0];
    }

    if (pos[1]) {
      this._markers[1].position = pos[1];
    }
  }

  set nearestMarkerPosition(pos: number) {
    if (this._range) {
      const firstMarkerPos = this._markers[0].position;
      const secondMarkerPos = this._markers[1].position;

      if (pos <= firstMarkerPos) {
        this.setPosition(pos, 0);
      }

      if (pos >= secondMarkerPos) {
        this.setPosition(pos, 1);
      }

      if (pos > firstMarkerPos && pos < secondMarkerPos) {
        const maxPos = secondMarkerPos - firstMarkerPos;
        const relativePos = pos - firstMarkerPos;
        const middle = maxPos / 2;
        
        if (relativePos <= middle) {
          this.setPosition(pos, 0);
        } else {
          this.setPosition(pos, 1);
        }
      }
    } else {
      this.setPosition(pos, 0);
    }
  }

  get orientation(): Orientation {
    return this._orientation;
  }

  set orientation(orientation: Orientation) {
    this._orientation = orientation;
    this._observers.emmit(ModelEvents.changeOrientation, this);
  }

  get labels(): boolean {
    return this._showLabels;
  }

  set labels(labels: boolean) {
    this._showLabels = labels;
    this._observers.emmit(ModelEvents.changeLabelVisibility, this);
  }

  getValue(id: number = 0): number {
    return this._markers[id].value;
  }

  setValue(value: number, id: number = 0) {
    this._markers[id].value = value;
    this._observers.emmit(ModelEvents.changeValue, this);
  }

  getPosition(id: number = 0): number {
    return this._markers[id].position;
  }

  setPosition(position: number, id: number = 0) {
    let oldPos: number = this._markers[id].position;

    this._markers[id].position = position;

    if (this._range && this._markers[0].value >= this._markers[1].value) {
      this._markers[id].position = oldPos;
    }

    this._observers.emmit(ModelEvents.changeValue, this);
  }

  addEventListener(type: ModelEvents, fn: Function) {
    this._observers.add(type, fn);
  }

  private checkRange() {
    if (!this._range) {
      throw new Error('This is single marker slider.');
    }
  }
}

export { SliderModel };
