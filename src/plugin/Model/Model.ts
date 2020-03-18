import Observer from '../observer/Observer';
import Orientation from '../types/Orientation';

class Model {
  private min: number = 0;

  private max: number = 100;

  private isRange: boolean = false;

  private orientation: Orientation = Orientation.Horizontal;

  private step: number = 1;

  private values: number[] = [0, 100];

  private isVisibleTooltips: boolean = true;

  private observer = new Observer();

  public setMin(min: number) {
    if (min < this.max) {
      this.min = min;
      this.recalculateValue();
    }

    this.emitChangeEvent();
  }

  public getMin(): number {
    return this.min;
  }

  public setMax(max: number) {
    if (max > this.min) {
      this.max = max;
      this.recalculateValue();
    }

    this.emitChangeEvent();
  }

  public getMax(): number {
    return this.max;
  }

  public setRange(isRange: boolean) {
    if (!this.isRange && isRange) {
      this.isRange = isRange;
      if (this.values[0] === this.max) {
        this.values[0] = this.max - this.step;
      }
      this.setNewValue(this.values[1], 1);
    }
    this.isRange = isRange;
    this.emitChangeEvent();
  }

  public getRange(): boolean {
    return this.isRange;
  }

  public setOrientation(orientation: Orientation) {
    this.orientation = orientation;
    this.emitChangeEvent();
  }

  public getOrientation(): Orientation {
    return this.orientation;
  }

  public setStep(step: number) {
    if (this.isValidStep(step)) {
      this.step = step;
      this.recalculateValue();
    }

    this.emitChangeEvent();
  }

  public getStep(): number {
    return this.step;
  }

  public setValue(value: number, pointer: number = 0) {
    this.setNewValue(value, pointer);
    this.emitChangeEvent();
  }

  public getValue(pointer: number = 0): number {
    return this.values[pointer];
  }

  public setPointPosition(position: number, pointer: number = 0) {
    const value = position >= 1 ? this.max : this.getValueByPosition(position);
    this.setNewValue(value, pointer);
    this.emitChangeEvent();
  }

  public getPointPosition(pointer: number = 0): number {
    return (this.values[pointer] - this.min) / (this.max - this.min);
  }

  public setPosition(position: number) {
    if (position >= 1) {
      const pointer = this.isRange ? 1 : 0;
      this.values[pointer] = this.max;
      this.emitChangeEvent();
      return;
    }

    if (this.isRange) {
      const value = this.getValueByPosition(position);
      if (value < this.values[0]) {
        this.setNewValue(value, 0);
      } else if (value > this.values[1]) {
        this.setNewValue(value, 1);
      } else {
        const pointer = this.closestPointer(value);
        this.setNewValue(value, pointer);
      }
    } else {
      this.setPointPosition(position, 0);
    }

    this.emitChangeEvent();
  }

  public setTooltipVisibility(isVisible: boolean) {
    this.isVisibleTooltips = isVisible;
    this.emitChangeEvent();
  }

  public getTooltipVisibility(): boolean {
    return this.isVisibleTooltips;
  }

  public addListener(event: string, fn: (data: Model) => void) {
    this.observer.add(event, fn);
  }

  public removeListener(event: string, fn: (data: Model) => void) {
    this.observer.remove(event, fn);
  }

  private recalculateValue() {
    if (this.isRange) {
      const high = this.values[1] <= this.min ? this.min + this.step : this.values[1];
      this.setValue(high, 1);
    }
    this.setValue(this.values[0], 0);
  }

  private getValueByPosition(position: number): number {
    return Math.round((this.max - this.min) * position + this.min);
  }

  private roundByStep(value: number): number {
    return Math.round((value - this.min) / this.step) * this.step + this.min;
  }

  private emitChangeEvent() {
    this.observer.emit('change', this);
  }

  private isValidStep(step: number) {
    return (this.max - this.min) >= step && step > 0;
  }

  private setNewValue(value: number, pointer: number) {
    const constraint = this.getConstraint(pointer);
    let roundedValue = this.roundByStep(value);
    roundedValue = roundedValue < constraint.min ? constraint.min : roundedValue;
    roundedValue = roundedValue > constraint.max ? constraint.max : roundedValue;
    this.values[pointer] = roundedValue;
  }

  private getConstraint(pointer: number): { min: number, max: number } {
    const constraint = { min: this.min, max: this.max };

    if (pointer === 0) {
      constraint.min = this.min;
      constraint.max = this.isRange ? this.values[1] - this.step : this.max;
    } else {
      constraint.max = this.max;
      constraint.min = this.isRange ? this.values[0] + this.step : this.min;
    }

    return constraint;
  }

  private closestPointer(value: number): number {
    const distanceToLow = value - this.values[0];
    const distanceToHigh = this.values[1] - value;
    if (distanceToLow <= distanceToHigh) {
      return 0;
    }

    return 1;
  }
}

export default Model;
