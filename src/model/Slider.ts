import Orientation from '../types/Orientation';
import Observer from '../observer/Observer';

class Slider {
  private min: number = 0;

  private max: number = 100;

  private isRange: boolean = false;

  private orientation: Orientation = Orientation.Horizontal;

  private step: number = 1;

  private values: number[] = [0, 100];

  private isVisibleTooltips: boolean = true;

  private observer: Observer = new Observer();

  public setMin(min: number) {
    if (min < this.max) {
      this.min = min;

      if (this.values[0] < this.min) {
        this.values[0] = this.min;
      }

      if (this.isRange && this.values[1] <= this.min) {
        this.values[1] = this.min + this.step;
      }
    }

    this.emitChangeEvent();
  }

  public getMin(): number {
    return this.min;
  }

  public setMax(max: number) {
    if (max > this.min) {
      this.max = max;

      if (this.isRange) {
        if (this.values[1] > this.max) {
          this.values[1] = this.max;
        }
        if (this.values[0] >= this.max) {
          this.values[0] = this.max - this.step;
        }
      } else {
        if (this.values[0] > this.max) {
          this.values[0] = this.max;
        }
      }
    }

    this.emitChangeEvent();
  }

  public getMax(): number {
    return this.max;
  }

  public setRange(isRange: boolean) {
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
    if (step <= this.max && step > 0) {
      this.step = step;

      if (this.values[0] % this.step !== 0) {
        this.values[0] = this.getValueByStep(this.values[0]);
      }

      if (this.isRange && this.values[1] % this.step !== 0) {
        this.values[1] = this.getValueByStep(this.values[1]);
      }
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
    this.setNewPointPosition(position, pointer);
    this.emitChangeEvent();
  }

  public getPointPosition(pointer: number = 0): number {
    // return this.values[pointer] / (this.min + this.max);
    return (this.values[pointer] - this.min) / (this.max - this.min);
  }

  public setPosition(position: number) {
    if (this.isRange) {
      const lowPosition: number = this.getPointPosition();
      const hightPosition: number = this.getPointPosition(1);

      if (position <= lowPosition) {
        this.setNewPointPosition(position, 0);
      }

      if (position >= hightPosition) {
        this.setNewPointPosition(position, 1);
      }

      if (position > lowPosition && position < hightPosition) {
        const lowDistToMiddle: number = position - lowPosition;
        const hightDistToMiddle: number = hightPosition - position;
        if (lowDistToMiddle <= hightDistToMiddle) {
          this.setNewPointPosition(position, 0);
        } else {
          this.setNewPointPosition(position, 1);
        }
      }
    } else {
      this.setNewPointPosition(position, 0);
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

  public addListener(event: string, fn: Function) {
    this.observer.add(event, fn);
  }

  public removeListener(event: string, fn: Function) {
    this.observer.remove(event, fn);
  }

  private setNewValue(value: number, pointer: number) {
    if (!this.isRange && pointer === 1) {
      return;
    }

    if (value >= this.min && value <= this.max) {
      if (this.isRange) {
        if (pointer === 0) {
          this.setValueToLowPointer(value);
        } else if (pointer === 1) {
          this.setValueToHightPointer(value);
        }
      } else {
        this.values[pointer] = this.getValueByStep(value);
      }
    }
  }

  private setValueToLowPointer(value: number) {
    if (this.getRoundedValueByStep(value) < this.values[1]) {
      this.values[0] = this.getValueByStep(value);
    } else {
      this.values[0] = this.values[1] - this.step;
    }
  }

  private setValueToHightPointer(value: number) {
    if (this.getRoundedValueByStep(value) > this.values[0]) {
      this.values[1] = this.getValueByStep(value);
    } else {
      this.values[1] = this.values[0] + this.step;
    }
  }

  private setNewPointPosition(position: number, pointer: number) {
    let newPosition = (position < 0) ? 0 : position;
    newPosition = (position > 1) ? 1 : position;
    let value: number = (this.max - this.min) * newPosition + this.min;
    if (value < this.min) value = this.min;
    if (value > this.max) value = this.max;
    this.setNewValue(value, pointer);
  }

  private getValueByStep(value: number) {
    let resultValue = 0;

    if (value === this.max) {
      resultValue = this.max;
    } else {
      resultValue = this.getRoundedValueByStep(value);
    }

    return resultValue;
  }

  private getRoundedValueByStep(value: number): number {
    return Math.round(value / this.step) * this.step;
  }

  private emitChangeEvent() {
    this.observer.emit('change', this);
  }
}

export default Slider;
