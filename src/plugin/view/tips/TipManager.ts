import Tip from './Tip';
import TipData from './TipData';

class TipManager {
  private parent: HTMLElement;

  private tips: Map<string, Tip> = new Map<string, Tip>();

  private data: TipData;

  constructor(parent: HTMLElement) {
    this.parent = parent;

    this.init();
  }

  public update(data: TipData) {
    this.data = data;

    if (!this.data.isVisible) {
      this.hideTip('hight');
      this.hideTip('united');
      this.hideTip('low');
      return;
    }

    if (this.data.isRange) {
      this.updateRangeTips();
    } else {
      this.updateLow();
      this.hideTip('hight');
      this.hideTip('united');
    }
  }

  public setDragListener(fn: (key: string, x: number, y: number) => void) {
    this.tips.forEach((tip: Tip) => {
      tip.setDragListener(fn);
    });
  }

  private init() {
    this.tips.set('low', new Tip(this.parent, 'low'));
    this.tips.set('hight', new Tip(this.parent, 'hight'));
    this.tips.set('united', new Tip(this.parent, 'united'));
  }

  private updateRangeTips() {
    this.preRender();
    const hightTip: Tip | undefined = this.tips.get('hight');
    const lowTip: Tip | undefined = this.tips.get('low');
    if (hightTip && lowTip) {
      if (lowTip.checkCollision(hightTip)) {
        lowTip.destroy();
        hightTip.destroy();
        this.showUnitedTip();
      } else {
        this.hideTip('united');
        this.updateLow();
        this.updateHight();
      }
    }
  }

  private preRender() {
    this.updateLow();
    this.updateHight();
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

  private hideTip(key: string) {
    const tip: Tip | undefined = this.tips.get(key);
    if (tip) {
      tip.destroy();
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
