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
    const { data } = { ...this };
    const unitedTip: Tip | undefined = this.tips.get('united');

    if (unitedTip) {
      unitedTip.create();
      const low: number = data.low.position;
      const high: number = data.high.position;
      const position: number = ((high - low) / 2) + low;
      const tipText: string = `${data.low.value} - ${data.high.value}`;
      unitedTip.update({
        orientation: data.orientation,
        position,
        value: tipText,
      });
    }
  }

  private hideTip(key: string) {
    const tip: Tip | undefined = this.tips.get(key);
    if (tip) {
      tip.destroy();
    }
  }

  private updateLow() {
    const { tips, data } = { ...this };
    const tip: Tip | undefined = tips.get('low');
    if (tip) {
      tip.create();
      tip.update({
        orientation: data.orientation,
        position: data.low.position,
        value: data.low.value.toString(),
      });
    }
  }

  private updateHigh() {
    const { tips, data } = { ...this };
    let tip: Tip | undefined;
    if (data.isRange) {
      tip = tips.get('high');
      if (tip) {
        tip.create();
        tip.update({
          orientation: data.orientation,
          position: data.high.position,
          value: data.high.value.toString(),
        });
      }
    } else {
      tip = tips.get('high');
      if (tip) {
        tip.destroy();
      }
    }
  }
}

export default TipManager;
