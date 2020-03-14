import Orientation from '../types/Orientation';
import OrientationManager from './OrientationManager';

class Fill {
  private parent: HTMLElement;

  private fillElement: HTMLElement;

  private orientationManager: OrientationManager;

  constructor(parent: HTMLElement) {
    this.parent = parent;

    this.createFillElement();
    this.initOrientationManager();
  }

  public update(low: number, hight: number, orientation: Orientation) {
    this.updateOrientation(orientation);
    this.setPosition(low, hight);
  }

  private initOrientationManager() {
    this.orientationManager = new OrientationManager(this.fillElement);
    this.orientationManager.addOrientationClass(Orientation.Horizontal, 'slider__fill_horizontal');
    this.orientationManager.addOrientationClass(Orientation.Vertical, 'slider__fill_vertical');
  }

  private setPosition(low: number, hight: number) {
    if (this.orientationManager.getCurrentOrientation() === Orientation.Horizontal) {
      this.fillElement.style.left = `${low}%`;
      this.fillElement.style.right = `${hight}%`;
    } else {
      this.fillElement.style.bottom = `${low}%`;
      this.fillElement.style.top = `${hight}%`;
    }
  }

  private createFillElement() {
    this.fillElement = document.createElement('div');
    this.fillElement.classList.add('slider__fill');
    this.parent.appendChild(this.fillElement);
  }

  private updateOrientation(orientation: Orientation) {
    this.orientationManager.setCurrentOrientation(orientation);
  }
}

export default Fill;
