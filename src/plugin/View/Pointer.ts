import Orientation from '../Types/Orientation';
import OrientationManager from './OrientationManager';
// eslint-disable-next-line no-unused-vars
import Drag, { IDragData } from './Drag/Drag';
import Observer from '../Observer/Observer';

class Pointer extends Observer {
  private parent: HTMLElement;

  private pointerElement: HTMLElement;

  private orientationManager: OrientationManager;

  private drag: Drag;

  constructor(parent: HTMLElement, key: string) {
    super();
    this.parent = parent;

    this.init(key);
  }

  public update(position: number, orientation: Orientation) {
    this.orientationManager.setCurrentOrientation(orientation);
    const newPosition: string = `${position - this.getHalf()}px`;
    if (orientation === Orientation.Horizontal) {
      this.pointerElement.style.left = newPosition;
    } else {
      this.pointerElement.style.top = newPosition;
    }
  }

  public destroy() {
    this.parent.removeChild(this.pointerElement);
  }

  private init(key: string) {
    this.pointerElement = document.createElement('div');
    this.pointerElement.classList.add('slider__pointer');
    this.parent.appendChild(this.pointerElement);
    this.drag = new Drag(this.pointerElement, key);
    this.drag.add('drag', this.onDrag);
    this.initOrientationManager();
  }

  private onDrag = (data: IDragData) => {
    this.emit('drag', data);
  }

  private getHalf(): number {
    return this.pointerElement.getBoundingClientRect().width / 2;
  }

  private initOrientationManager() {
    this.orientationManager = new OrientationManager(this.pointerElement);
    this.orientationManager.addOrientationClass(Orientation.Horizontal, 'slider__pointer_horizontal');
    this.orientationManager.addOrientationClass(Orientation.Vertical, 'slider__pointer_vertical');
  }
}

export default Pointer;
