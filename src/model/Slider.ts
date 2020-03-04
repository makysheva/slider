import Orientation from '../types/Orientation';

class Slider {
  private min: number = 0;

  private max: number = 100;

  private isRange: boolean = false;

  private orientation: Orientation = Orientation.Horizontal;

  private step: number = 1;

  private values: number[] = [0, 100];

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
  }

  public getMax(): number {
    return this.max;
  }

  public setRange(isRange: boolean) {
    this.isRange = isRange;
  }

  public getRange(): boolean {
    return this.isRange;
  }

  public setOrientation(orientation: Orientation) {
    if (this.orientation !== orientation) {
      this.orientation = orientation;
    }
  }

  public getOrientation(): Orientation {
    return this.orientation;
  }

  public setStep(step: number) {
    const half: number = (this.max + this.min) / 2;
    if (step <= half && step > 0) {
      this.step = step;
    }
  }

  public getStep(): number {
    return this.step;
  }

  public setValue(value: number, pointer: number = 0) {
    if (!this.isRange && pointer === 1) {
      return;
    }

    if (value >= this.min && value <= this.max) {
      if (this.isRange) {
        this.setRangedValues(pointer, value);
      } else {
        this.values[pointer] = value;
      }
    }
  }

  public getValue(pointer: number = 0): number {
    return this.values[pointer];
  }

  public setPosition(position: number, pointer: number = 0) {
    position = (position < 0) ? 0 : position;
    position = (position > 1) ? 1 : position;
    this.values[pointer] = (this.min + this.max) * position;
  }

  public getPosition(pointer: number = 0): number {
    return -1;
  }

  private setRangedValues(pointer: number, value: number) {
    if (pointer === 0 && value < this.values[1]) {
      this.values[pointer] = value;
    } else if (pointer === 1 && value > this.values[0]) {
      this.values[pointer] = value;
    }
  }
}

export default Slider;