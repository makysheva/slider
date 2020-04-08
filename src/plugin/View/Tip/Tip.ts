import { IDragData } from './../Drag/Drag';
import Orientation from '../../Types/Orientation';
import OrientationManager from '../OrientationManager';
import Drag from '../Drag/Drag';
import Observer from '../../Observer/Observer';

class Tip extends Observer {
  private parent: HTMLElement;

  private tipElement: HTMLElement;

  private orientationManager: OrientationManager;

  private drag: Drag;

  private key: string;

  constructor(parent: HTMLElement, key: string) {
    super();
    this.parent = parent;
    this.key = key;

    this.init();
  }

  public update(data: { value: string, position: number, orientation: Orientation }) {
    const { value, position, orientation } = data;
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

  public checkCollision(tip: Tip): boolean {
    const rect = tip.getClientRect();

    return this.isCross(rect);
  }

  private init() {
    this.tipElement = document.createElement('div');
    this.tipElement.classList.add('slider__tip');
    this.drag = new Drag(this.tipElement, this.key);
    this.drag.add('drag', this.onDrag);
    this.orientationManager = new OrientationManager(this.tipElement);
    this.orientationManager.addOrientationClass(Orientation.Horizontal, 'slider__tip_horizontal');
    this.orientationManager.addOrientationClass(Orientation.Vertical, 'slider__tip_vertical');
  }

  private onDrag = (data: IDragData) => {
    this.emit('drag', data);
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

  private isCross(rect: DOMRect): boolean {
    const self = this.getClientRect();

    return self.x < rect.x + rect.width
      && self.x + self.width > rect.x
      && self.y < rect.y + rect.height
      && self.y + self.height > rect.y;
  }
}

export default Tip;
