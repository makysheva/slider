import Orientation from '../Types/Orientation';
import OrientationManager from './OrientationManager';
import Drag from '../Drag/Drag';

class Pointer {
  private parent: HTMLElement;

  private pointerElement: HTMLElement;

  private orientationManager: OrientationManager;

  private drag: Drag;

  constructor(parent: HTMLElement, key: string) {
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

  public setDragListener(fn: (key: string, x: number, y: number) => void) {
    this.drag.setDragListener(fn);
  }

  public destroy() {
    this.parent.removeChild(this.pointerElement);
  }

  private init(key: string) {
    this.pointerElement = document.createElement('div');
    this.pointerElement.classList.add('slider__pointer');
    this.parent.appendChild(this.pointerElement);
    this.drag = new Drag(this.pointerElement, key);
    this.initOrientationManager();
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
