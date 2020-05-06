import IState from './IState';
import Observer from '../Observer/Observer';
import Orientation from '../Types/Orientation';
import Validator from './Validator';

class Model extends Observer {
  private state: IState = {
    isRange: false,
    isTips: true,
    max: 100,
    min: 0,
    orientation: Orientation.Horizontal,
    step: 1,
    values: [0, 100],
  };

  constructor(props?: IState) {
    super();
    if (props) {
      this.setState(props);
    }
  }

  public setState(state: IState) {
    const { min, max } = Validator.validateMinMax(state);
    const step = Validator.validateStep(state);
    const values = Validator.validateValues(state);
    this.state = {
      ...state,
      max,
      min,
      step,
      values,
    };
    this.emitChangeEvent();
  }

  public getState(): IState {
    return { ...this.state };
  }

  public setMin(min: number) {
    if (min < this.state.max) {
      this.state.min = min;
      this.recalculateValue();
    }

    this.emitChangeEvent();
  }

  public getMin(): number {
    return this.state.min;
  }

  public setMax(max: number) {
    if (max > this.state.min) {
      this.state.max = max;
      this.recalculateValue();
    }

    this.emitChangeEvent();
  }

  public getMax(): number {
    return this.state.max;
  }

  public setRange(isRange: boolean) {
    const { max, step, values } = this.state;
    if (Validator.isFalseRange(this.state.isRange, isRange)) {
      this.state.isRange = isRange;
      if (values[0] === max) {
        values[0] = max - step;
      }
      this.setNewValue(values[1], 1);
    }
    this.state.isRange = isRange;
    this.emitChangeEvent();
  }

  public getRange(): boolean {
    return this.state.isRange;
  }

  public setOrientation(orientation: Orientation) {
    this.state.orientation = orientation;
    this.emitChangeEvent();
  }

  public getOrientation(): Orientation {
    return this.state.orientation;
  }

  public setStep(step: number) {
    if (this.isValidStep(step)) {
      this.state.step = step;
      this.recalculateValue();
    }

    this.emitChangeEvent();
  }

  public getStep(): number {
    return this.state.step;
  }

  public setValue(value: number, pointer: number = 0) {
    this.setNewValue(value, pointer);
    this.emitChangeEvent();
  }

  public getValue(pointer: number = 0): number {
    return this.state.values[pointer];
  }

  public setPointPosition(position: number, pointer: number = 0) {
    const value = position >= 1 ? this.state.max : this.getValueByPosition(position);
    this.setNewValue(value, pointer);
    this.emitChangeEvent();
  }

  public getPointPosition(pointer: number = 0): number {
    const { max, min, values } = this.state;
    return (values[pointer] - min) / (max - min);
  }

  public setPosition(position: number) {
    const { max, isRange, values } = this.state;
    if (position >= 1) {
      const pointer = isRange ? 1 : 0;
      values[pointer] = max;
      this.emitChangeEvent();
      return;
    }

    if (isRange) {
      const value = this.getValueByPosition(position);
      if (value < values[0]) {
        this.setNewValue(value, 0);
      } else if (value > values[1]) {
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
    this.state.isTips = isVisible;
    this.emitChangeEvent();
  }

  public getTooltipVisibility(): boolean {
    return this.state.isTips;
  }

  private recalculateValue() {
    const {
      min,
      step,
      values,
      isRange,
    } = this.state;

    if (isRange) {
      const high = values[1] <= min ? min + step : values[1];
      this.setValue(high, 1);
    }
    this.setValue(values[0], 0);
  }

  private getValueByPosition(position: number): number {
    const { max, min } = this.state;
    return Math.round((max - min) * position + min);
  }

  private roundByStep(value: number): number {
    const { min, step } = this.state;
    return Math.round((value - min) / step) * step + min;
  }

  private emitChangeEvent() {
    this.emit('change');
  }

  private isValidStep(step: number) {
    const { max, min } = this.state;
    return (max - min) >= step && step > 0;
  }

  private setNewValue(value: number, pointer: number) {
    const constraint = this.getConstraint(pointer);
    let roundedValue = (value === this.state.max) ? value : this.roundByStep(value);
    if (roundedValue < constraint.min) {
      roundedValue = constraint.min;
    } else if (roundedValue > constraint.max) {
      roundedValue = constraint.max;
    }
    this.state.values[pointer] = roundedValue;
  }

  private getConstraint(pointer: number): { min: number, max: number } {
    const {
      max,
      min,
      step,
      values,
      isRange,
    } = this.state;
    const constraint = { min, max };

    if (pointer === 0) {
      constraint.min = min;
      constraint.max = isRange ? values[1] - step : max;
    } else {
      constraint.max = max;
      constraint.min = isRange ? values[0] + step : min;
    }

    return constraint;
  }

  private closestPointer(value: number): number {
    const distanceToLow = value - this.state.values[0];
    const distanceToHigh = this.state.values[1] - value;
    if (distanceToLow <= distanceToHigh) {
      return 0;
    }

    return 1;
  }
}

export default Model;
