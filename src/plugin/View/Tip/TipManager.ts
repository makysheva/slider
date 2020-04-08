import { IDragData } from './../Drag/Drag';
import Observer from '../../Observer/Observer';
import Tip from './Tip';
import TipData from './TipData';

class TipManager extends Observer {
  private parent: HTMLElement;

  private tips: Map<string, Tip> = new Map<string, Tip>();

  private data: TipData;

  private dragTip: Tip;

  constructor(parent: HTMLElement) {
    super();
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

  private init() {
    this.tips.set('low', this.createTip('low'));
    this.tips.set('high', this.createTip('high'));
    this.tips.set('united', this.createTip('united'));
  }

  private createTip(key: string): Tip {
    const tip = new Tip(this.parent, key);
    tip.add('drag', this.onDrag);
    return tip;
  }

  private onDrag = (data: IDragData) => {
    this.emit('drag', data);
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
    const { low, high, orientation } = this.data;
    const unitedTip: Tip | undefined = this.tips.get('united');

    if (unitedTip) {
      unitedTip.create();
      const lowPos: number = low.position;
      const highPos: number = high.position;
      const position: number = ((highPos - lowPos) / 2) + lowPos;
      const tipText: string = `${low.value} - ${high.value}`;
      unitedTip.update({
        orientation,
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
    const { low, orientation } = this.data;
    const tip: Tip | undefined = this.tips.get('low');
    if (tip) {
      tip.create();
      tip.update({
        orientation,
        position: low.position,
        value: low.value.toString(),
      });
    }
  }

  private updateHigh() {
    const { high, orientation, isRange } = this.data;
    let tip: Tip | undefined;
    if (isRange) {
      tip = this.tips.get('high');
      if (tip) {
        tip.create();
        tip.update({
          orientation,
          position: high.position,
          value: high.value.toString(),
        });
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
