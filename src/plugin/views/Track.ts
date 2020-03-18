import Orientation from '../typess/Orientation';
import OrientationManager from './OrientationManager';

class Track {
  private parent: HTMLElement;

  private trackElement: HTMLElement;

  private orientationManager: OrientationManager;

  constructor(parent: HTMLElement) {
    this.parent = parent;

    this.createTrackElement();
    this.initOrientationManager();
  }

  public update(orientation: Orientation) {
    this.updateOrientation(orientation);
  }

  public getElement(): HTMLElement {
    return this.trackElement;
  }

  public getRelativePosition(clientX: number, clientY: number): number {
    const rect: DOMRect = this.trackElement.getBoundingClientRect();
    let position: number;

    if (this.orientationManager.getCurrentOrientation() === Orientation.Horizontal) {
      position = (clientX - rect.left) / rect.width;
    } else {
      position = 1 - ((clientY - rect.top) / rect.height);
    }

    return position;
  }

  public getAbsolutePosition(relativePosition: number): number {
    const rect: DOMRect = this.trackElement.getBoundingClientRect();
    let position: number;

    if (this.orientationManager.getCurrentOrientation() === Orientation.Horizontal) {
      position = rect.width * relativePosition;
    } else {
      position = rect.height - (rect.height * relativePosition);
    }

    return position;
  }

  private initOrientationManager() {
    this.orientationManager = new OrientationManager(this.trackElement);
    this.orientationManager.addOrientationClass(Orientation.Horizontal, 'slider__track_horizontal');
    this.orientationManager.addOrientationClass(Orientation.Vertical, 'slider__track_vertical');
  }

  private createTrackElement() {
    this.trackElement = document.createElement('div');
    this.parent.appendChild(this.trackElement);
    this.trackElement.classList.add('slider__track');
  }

  private updateOrientation(orientation: Orientation) {
    this.orientationManager.setCurrentOrientation(orientation);
  }
}

export default Track;
