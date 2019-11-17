import { Options } from "./Options";
import { Orientation } from "./Orientation";

export class SliderModel {
    private _min: number = 0;
    private _max: number = 100;
    private _step: number = 1;
    private _position: number = 0;
    private _positions: number[] = [0, 1];
    private _value: number = 0;
    private _values: number[] = [0, 100];
    private _range: boolean = false;
    private _orientation: Orientation = Orientation.Horizontal;
    private _showLables: boolean = false;

    constructor(props: Options) {
        let min: number = props.min ? props.min : this._min;
        let max: number = props.max ? props.max : this._max;
        this.minMax = [min, max];
        this.value = props.value ? props.value : this.minMax[0];
        this._step = props.step ? props.step : this._step;
        this._values = props.values ? props.values : this._values;
        this._showLables = props.showLabels ? props.showLabels : this._showLables;
        this._orientation = props.orientation ? props.orientation : this._orientation;
        this._range = props.range ? props.range : this._range;

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

    get positions(): number[] {
        return this._positions;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        if (this._min <= value && this._max >= value) {
            this._value = value;
        } else {
            throw new Error('New value should be between min and max.');
        }
    }

    get step(): number {
        return this._step;
    }

    set step(value: number) {
        if (value <= this._max) {
            this._step = value;
        } else {
            throw new Error('Step should be between min and max.');
        }
    }

    get position(): number {
        return this._position;
    }

    set position(value: number) {
        if (value < 0) {
            value = 0;
        }

        if (value > 1) {
            value = 1;
        }
        
        this.value = (value * (this._max - this._min)) + this._min;
        let stepPos: number = Math.round((this.value - this._min) / this._step);
        this._position = stepPos * this._step / (this._max - this._min);
    }
}