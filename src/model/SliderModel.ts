import { Options } from "./Options";

export class SliderModel {
    private _min: number = 0;
    private _max: number = 100;
    private _step: number = 1;
    private _position: number = 0;
    private _positions: number[] = [0, 1];
    private _value: number = 0;
    private _values: number[] = [0, 100];
    private _range: boolean = false;
    private _orientation: string = 'horizontal';
    private _showLables: boolean = false;

    constructor(props: Options) {
        this._min = props.min ? props.min : this._min;
        this._max = props.max ? props.max : this._max;
        this._step = props.step ? props.step : this._step;
        this._value = props.value ? props.value : this._value;
        this._values = props.values ? props.values : this._values;
        this._showLables = props.showLabels ? props.showLabels : this._showLables;
        this._orientation = props.orientation ? props.orientation : this._orientation;
        this._range = props.range ? props.range : this._range;

        this.init();
    }

    private init(): void {
        if (this._min > this._max) {
            let tmpMax: number = this._max;
            this._max = this._min;
            this._min = tmpMax;
        }

        if (this._value > this._max || this._value < this._min) {
            this._value = this._min;
        }
    }

    get min(): number {
        return this._min;
    }

    get max(): number {
        return this._max;
    }
}