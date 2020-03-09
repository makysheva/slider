import Tip from './Tip';
import Orientation from '../../types/Orientation';
import TipData from './TipData';

class TipManager {
  private parent: HTMLElement;

  private tips: Map<string, Tip> = new Map<string, Tip>();

  private data: TipData;

  private collision: { low: number, hight: number };

  private isCollision: boolean;


  constructor(parent: HTMLElement) {
    this.parent = parent;

    this.tips.set('low', new Tip(this.parent));
    this.tips.set('hight', new Tip(this.parent));
    this.tips.set('united', new Tip(this.parent));
  }

  public update(data: TipData) {
    this.data = data;

    if (this.data.isRange) {
      this.updateRangeTips();
    } else {
      this.isCollision = false;
      this.updateLow();
    }
  }

  private updateRangeTips() {
    if (this.isCollision && this.checkCollision()) {
      this.showUnitedTip();
    } else {
      const hightTip: Tip | undefined = this.tips.get('hight');
      const lowTip: Tip | undefined = this.tips.get('low');
      if (hightTip && lowTip) {
        if (lowTip.checkCollision(hightTip)) {
          this.isCollision = true;
          this.collision = { low: this.data.low.position, hight: this.data.hight.position };
          lowTip.destroy();
          hightTip.destroy();
          this.showUnitedTip();
        } else {
          this.isCollision = false;
          this.hideUnitedTip();
          this.updateLow();
          this.updateHight();
        }
      }
    }
  }

  private checkCollision(): boolean {
    if (this.isOutOfRange()) {
      return false;
    }
    return true;
  }

  private isOutOfRange(): boolean {
    let result: boolean = false;

    if (this.data.orientation === Orientation.Horizontal) {
      result = this.collision.low > this.data.low.position
        || this.collision.hight < this.data.hight.position;
    } else {
      result = this.data.low.position > this.collision.low
      || this.data.hight.position < this.collision.hight;
    }

    return result;
  }

  private showUnitedTip() {
    const unitedTip: Tip | undefined = this.tips.get('united');

    if (unitedTip) {
      unitedTip.create();
      const low: number = this.data.low.position;
      const hight: number = this.data.hight.position;
      const position: number = ((hight - low) / 2) + low;
      const tipText: string = `${this.data.low.value} - ${this.data.hight.value}`;
      unitedTip.update(tipText, position, this.data.orientation);
    }
  }

  private hideUnitedTip() {
    const unitedTip: Tip | undefined = this.tips.get('united');
    if (unitedTip) {
      unitedTip.destroy();
    }
  }

  private updateLow() {
    const tip: Tip | undefined = this.tips.get('low');
    if (tip) {
      tip.create();
      tip.update(this.data.low.value.toString(), this.data.low.position, this.data.orientation);
    }
  }

  private updateHight() {
    let tip: Tip | undefined;
    if (this.data.isRange) {
      tip = this.tips.get('hight');
      if (tip) {
        tip.create();
        tip.update(
          this.data.hight.value.toString(),
          this.data.hight.position,
          this.data.orientation,
        );
      }
    } else {
      tip = this.tips.get('hight');
      if (tip) {
        tip.destroy();
      }
    }
  }
}

export default TipManager;
