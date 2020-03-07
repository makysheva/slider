import OrientationManager from '../OrientationManager';
import Orientation from '../../types/Orientation';

class Tip {
  private parent: HTMLElement;

  private tipElement: HTMLElement;

  private orientationManager: OrientationManager;

  constructor(parent: HTMLElement) {
    this.parent = parent;

    this.tipElement = document.createElement('div');
    this.tipElement.classList.add('slider__tip');
    this.parent.appendChild(this.tipElement);

    this.orientationManager = new OrientationManager(this.tipElement);
    this.orientationManager.addOrientationClass(Orientation.Horizontal, 'slider__tip_horizontal');
    this.orientationManager.addOrientationClass(Orientation.Vertical, 'slider__tip_vertical');
  }

  update(value: number, position: number, orientation: Orientation) {
    this.orientationManager.setCurrentOrientation(orientation);
    this.tipElement.innerHTML = value.toString();
    if (orientation === Orientation.Horizontal) {
      this.setPosition(position);
    }
  }

  private setPosition(position: number) {
    const rect: DOMRect = this.tipElement.getBoundingClientRect();
    const newPosition: number = position - rect.width / 2;
    this.tipElement.style.left = `${newPosition}px`;
  }
}

export default Tip;
