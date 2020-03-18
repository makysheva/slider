import Orientation from '../typess/Orientation';
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

  public update(low: number, high: number, orientation: Orientation) {
    this.updateOrientation(orientation);
    this.setPosition(low, high);
  }

  private initOrientationManager() {
    this.orientationManager = new OrientationManager(this.fillElement);
    this.orientationManager.addOrientationClass(Orientation.Horizontal, 'slider__fill_horizontal');
    this.orientationManager.addOrientationClass(Orientation.Vertical, 'slider__fill_vertical');
  }

  private setPosition(low: number, high: number) {
    if (this.orientationManager.getCurrentOrientation() === Orientation.Horizontal) {
      this.fillElement.style.left = `${low}%`;
      this.fillElement.style.right = `${high}%`;
    } else {
      this.fillElement.style.bottom = `${low}%`;
      this.fillElement.style.top = `${high}%`;
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
