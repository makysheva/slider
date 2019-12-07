import { SliderModel } from "./SliderModel";

export class MarkerModel {
    private _slider: SliderModel;
    private _value: number = 0;
    private _position: number = 0;

    constructor(slider: SliderModel, value: number) {
        this._slider = slider;
        this._value = value;
        this.setPositionByValue(this._value);
    }

    get value(): number {
        return this._value;
    }

    set value(val: number) {
        if (val < this._slider.minMax[0] || val > this._slider.minMax[1]) {
            throw new Error('Value must be between the min and max.');
        }

        this._value = val;
        this.setPositionByValue(this._value);
    }

    get position(): number {
        return this._position;
    }

    set position(pos: number) {
        if (pos < 0 || pos > 1) {
            throw new Error('Position must be between 0 and 1.');
        }

        let min: number = this._slider.minMax[0];
        let max: number = this._slider.minMax[1];
        let step: number = this._slider.step;
        
        let val: number = (max - min) * pos + min;
        this._value = this.round(val, step, step);
        this.setPositionByValue(this._value);
    }

    private setPositionByValue(val: number): void {
        let newPos: number = (val - this._slider.minMax[0]) / (this._slider.minMax[1] - this._slider.minMax[0]);
        if (newPos < 0) {
            this._position = 0;
        } else if (newPos > 1) {
            this._position = 1;
        } else {
            this._position = newPos;
        }

    } 

    round(n: number, increment: number, offset: number): number {
        return Math.round((n - offset) / increment) * increment + offset;
    }
}