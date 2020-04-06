import Orientation from '../Types/Orientation';
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

  public update(data: { low: number, high: number, orientation: Orientation }) {
    const { low, high, orientation } = data;
    this.updateOrientation(orientation);
    this.setPosition(low, high);
  }

  private initOrientationManager() {
    this.orientationManager = new OrientationManager(this.fillElement);
    this.orientationManager.addOrientationClass(Orientation.Horizontal, 'slider__fill_horizontal');
    this.orientationManager.addOrientationClass(Orientation.Vertical, 'slider__fill_vertical');
  }

  private setPosition(low: number, high: number) {
    const { fillElement, orientationManager } = { ...this };
    if (orientationManager.getCurrentOrientation() === Orientation.Horizontal) {
      fillElement.style.left = `${low}%`;
      fillElement.style.right = `${high}%`;
    } else {
      fillElement.style.bottom = `${low}%`;
      fillElement.style.top = `${high}%`;
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
