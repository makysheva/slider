class Slider {
  private min: number = 0;

  private max: number = 100;

  private isRange: boolean = false;

  public setMin(min: number) {
    if (min < this.max) {
      this.min = min;
    }
  }

  public getMin(): number {
    return this.min;
  }

  public setMax(max: number) {
    if (max > this.min) {
      this.max = max;
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
}

export default Slider;
