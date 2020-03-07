import Orientation from '../types/Orientation';
import OrientationManager from './OrientationManager';
import Tip from './tips/Tip';

class Pointer {
  private parent: HTMLElement;

  private pointerElement: HTMLElement;

  private orientationManager: OrientationManager;

  private onDragFn: (key: string, position: number) => void;

  private isMouseDown: boolean = false;

  private key: string;


  constructor(parent: HTMLElement, key: string) {
    this.parent = parent;
    this.key = key;

    this.pointerElement = document.createElement('div');
    this.pointerElement.classList.add('slider__pointer');
    this.parent.appendChild(this.pointerElement);

    this.pointerElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));

    this.initOrientationManager();
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

  public setDragListener(fn: (key: string, position: number) => void) {
    this.onDragFn = fn;
  }

  public destroy() {
    this.parent.removeChild(this.pointerElement);
  }

  private getHalf(): number {
    return this.pointerElement.getBoundingClientRect().width / 2;
  }

  private initOrientationManager() {
    this.orientationManager = new OrientationManager(this.pointerElement);
    this.orientationManager.addOrientationClass(Orientation.Horizontal, 'slider__pointer_horizontal');
    this.orientationManager.addOrientationClass(Orientation.Vertical, 'slider__pointer_vertical');
  }

  private onMouseDown() {
    this.isMouseDown = true;
  }

  private onMouseUp() {
    this.isMouseDown = false;
  }

  private onMouseMove(e: MouseEvent) {
    if (this.isMouseDown) {
      if (this.orientationManager.getCurrentOrientation() === Orientation.Horizontal) {
        this.onDragFn.call(this, this.key, e.clientX);
      } else {
        this.onDragFn.call(this, this.key, e.clientY);
      }
    }
  }
}

export default Pointer;
