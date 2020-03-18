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
      this.hideTip('high');
      this.hideTip('united');
      this.hideTip('low');
      return;
    }

    if (this.data.isRange) {
      this.updateRangeTips();
    } else {
      this.updateLow();
      this.hideTip('high');
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
    this.tips.set('high', new Tip(this.parent, 'high'));
    this.tips.set('united', new Tip(this.parent, 'united'));
  }

  private updateRangeTips() {
    this.preRender();
    const highTip: Tip | undefined = this.tips.get('high');
    const lowTip: Tip | undefined = this.tips.get('low');
    if (highTip && lowTip) {
      if (lowTip.checkCollision(highTip)) {
        lowTip.destroy();
        highTip.destroy();
        this.showUnitedTip();
      } else {
        this.hideTip('united');
        this.updateLow();
        this.updateHigh();
      }
    }
  }

  private preRender() {
    this.updateLow();
    this.updateHigh();
  }

  private showUnitedTip() {
    const unitedTip: Tip | undefined = this.tips.get('united');

    if (unitedTip) {
      unitedTip.create();
      const low: number = this.data.low.position;
      const high: number = this.data.high.position;
      const position: number = ((high - low) / 2) + low;
      const tipText: string = `${this.data.low.value} - ${this.data.high.value}`;
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

  private updateHigh() {
    let tip: Tip | undefined;
    if (this.data.isRange) {
      tip = this.tips.get('high');
      if (tip) {
        tip.create();
        tip.update(
          this.data.high.value.toString(),
          this.data.high.position,
          this.data.orientation,
        );
      }
    } else {
      tip = this.tips.get('high');
      if (tip) {
        tip.destroy();
      }
    }
  }
}

export default TipManager;
