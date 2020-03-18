import Orientation from '../../Types/Orientation';
import OrientationManager from '../OrientationManager';
import Drag from '../../Drag/Drag';

class Tip {
  private parent: HTMLElement;

  private tipElement: HTMLElement;

  private orientationManager: OrientationManager;

  private drag: Drag;

  private key: string;

  constructor(parent: HTMLElement, key: string) {
    this.parent = parent;
    this.key = key;

    this.init();
  }

  public update(value: string, position: number, orientation: Orientation) {
    this.orientationManager.setCurrentOrientation(orientation);
    this.tipElement.innerHTML = value;
    this.setPosition(position);
  }

  public create() {
    if (!this.parent.contains(this.tipElement)) {
      this.parent.appendChild(this.tipElement);
    }
  }

  public destroy() {
    if (this.parent.contains(this.tipElement)) {
      this.parent.removeChild(this.tipElement);
    }
  }

  public setDragListener(fn: (key: string, x: number, y: number) => void) {
    this.drag.setDragListener(fn);
  }

  public checkCollision(tip: Tip): boolean {
    const rect: DOMRect = tip.getClientRect();
    const self: DOMRect = this.getClientRect();

    if (self.x < rect.x + rect.width
      && self.x + self.width > rect.x
      && self.y < rect.y + rect.height
      && self.y + self.height > rect.y) {
      return true;
    }
    return false;
  }

  private init() {
    this.tipElement = document.createElement('div');
    this.tipElement.classList.add('slider__tip');
    this.drag = new Drag(this.tipElement, this.key);
    this.orientationManager = new OrientationManager(this.tipElement);
    this.orientationManager.addOrientationClass(Orientation.Horizontal, 'slider__tip_horizontal');
    this.orientationManager.addOrientationClass(Orientation.Vertical, 'slider__tip_vertical');
  }

  private getClientRect(): DOMRect {
    return this.tipElement.getBoundingClientRect();
  }

  private setPosition(position: number) {
    const rect: DOMRect = this.tipElement.getBoundingClientRect();
    let newPosition: number = 0;

    if (this.orientationManager.getCurrentOrientation() === Orientation.Horizontal) {
      newPosition = position - rect.width / 2;
      this.tipElement.style.left = `${newPosition}px`;
    } else {
      newPosition = position - rect.height / 2;
      this.tipElement.style.top = `${newPosition}px`;
    }
  }
}

export default Tip;
