import Tip from './Tip';
import Orientation from '../../types/Orientation';

class TipManager {
  private parent: HTMLElement;

  private tips: Map<string, Tip> = new Map<string, Tip>();


  constructor(parent: HTMLElement) {
    this.parent = parent;

    this.tips.set('low', new Tip(this.parent));
    this.tips.set('hight', new Tip(this.parent));
  }

  public update(
    low: { value: number, position: number },
    hight: { value: number, position: number },
    orientation: Orientation,
    isRange: boolean
  ) {
    let tip: Tip | undefined = this.tips.get('low');
    if (tip) {
      tip.update(low.value, low.position, orientation);
    }

    tip = this.tips.get('hight');
    if (tip) {
      tip.update(hight.value, hight.position, orientation);
    }
  }
}

export default TipManager;
