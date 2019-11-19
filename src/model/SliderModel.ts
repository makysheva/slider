import { Options } from "./Options";
import { Orientation } from "./Orientation";
import { MarkerModel } from "./MarkerModel";

export class SliderModel {
    private _min: number = 0;
    private _max: number = 100;
    private _step: number = 1;
    private _singleMarker: MarkerModel;
    private _range: boolean = false;
    private _orientation: Orientation = Orientation.Horizontal;
    private _showLables: boolean = false;
    private _rangeMarkers: MarkerModel[];

    /**
     * 
     * @param props 
     */
    constructor(props: Options) {
        let min: number = props.min ? props.min : this._min;
        let max: number = props.max ? props.max : this._max;
        this.minMax = [min, max];
        this._range = props.range ? props.range : this._range;

        if (this._range) {
            this._rangeMarkers = [
                new MarkerModel(this, 0),
                new MarkerModel(this, 100)
            ];
        } else {
            let value: number = props.value ? props.value : 0;
            this._singleMarker = new MarkerModel(this, value);
        }
        
        
        this._step = props.step ? props.step : this._step;
        this._showLables = props.showLabels ? props.showLabels : this._showLables;
        this._orientation = props.orientation ? props.orientation : this._orientation;
    }

    
    /**
     * 
     */
    get minMax(): number[] {
        return [this._min, this._max];
    }

    /**
     * 
     */
    set minMax(value: number[]) {
        if (value[0] < value[1]) {
            this._min = value[0];
            this._max = value[1];
        } else {
            throw new Error('Min should be less then Max.');
        }
    }

    /**
     * 
     */
    get value(): number {
        return this._singleMarker.value;
    }

    /**
     * 
     */
    set value(value: number) {
        if (this._range) {
            throw new Error('Range slider have multiple values.');
        }
        this._singleMarker.value = value;
    }

    /**
     * 
     */
    get values(): number[] {
        return [this._rangeMarkers[0].value, this._rangeMarkers[1].value];
    }

    /**
     * 
     */
    set values(val: number[]) {
        this.checkRange();

        if (val[0]) {
            this._rangeMarkers[0].value = val[0];
        }
        
        if (val[1]) {
            this._rangeMarkers[1].value = val[1];
        }
    }

    /**
     * 
     */
    get step(): number {
        return this._step;
    }

    /**
     * 
     */
    set step(value: number) {
        if (value <= this._max) {
            this._step = value;
        } else {
            throw new Error('Step should be between min and max.');
        }
    }

    /**
     * 
     */
    get position(): number {
        return this._singleMarker.position;
    }

    /**
     * 
     */
    set position(value: number) {
        this._singleMarker.position = value;
    }

    /**
     * 
     */
    get positions(): number[] {
        return [this._rangeMarkers[0].position, this._rangeMarkers[1].position];
    }

    /**
     * 
     */
    set positions(pos: number[]) {
        this.checkRange();

        if (pos[0]) {
            this._rangeMarkers[0].position = pos[0];
        }

        if (pos[1]) {
            this._rangeMarkers[1].position = pos[1];
        }
    }

    private checkRange() {
        if (!this._range) {
            throw new Error('This is single marker slider.');
        }
    }
}