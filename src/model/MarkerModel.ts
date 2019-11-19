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

        this._value = this.calculateValue(pos, min, max);
        let roundedPosition: number = this.roundPositionByStep(this._value, min, step);
        this._position = this.calculatePosition(roundedPosition, step, min, max);
    }

    private calculateValue(pos: number, min: number, max: number): number {
        return (pos * (max - min)) + min;
    }

    private roundPositionByStep(pos: number, min: number, step: number): number {
        return Math.round((pos - min) / step);
    }

    private calculatePosition(pos: number, step: number, min: number, max: number): number {
        return pos * step / (max - min);
    }

    private setPositionByValue(val: number): void {
        this._position = val / (this._slider.minMax[0] + this._slider.minMax[1]);
    } 
}