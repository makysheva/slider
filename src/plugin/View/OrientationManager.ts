import Orientation from '../Types/Orientation';

class OrientationManager {
  private classes: Map<string, string>;

  private element: HTMLElement;

  private currentOrientation: Orientation;

  constructor(element: HTMLElement) {
    this.element = element;
    this.classes = new Map<string, string>();
  }

  public addOrientationClass(orientation: Orientation, className: string) {
    this.classes.set(orientation, className);
  }

  public getOrientationClass(orientation: Orientation): string | undefined {
    return this.classes.get(orientation);
  }

  public setCurrentOrientation(orientation: Orientation) {
    if (this.currentOrientation !== orientation) {
      this.currentOrientation = orientation;
      this.removeOrientation();
      this.setOrientation(this.currentOrientation);
    }
  }

  public getCurrentOrientation(): Orientation {
    return this.currentOrientation;
  }

  private resetPosition() {
    this.element.style.top = '';
    this.element.style.bottom = '';
    this.element.style.left = '';
    this.element.style.right = '';
  }

  private removeOrientation() {
    this.classes.forEach((className) => {
      if (this.element.classList.contains(className)) {
        this.element.classList.remove(className);
      }
    });
    this.resetPosition();
  }

  private setOrientation(orientation: Orientation) {
    const newClass: string | undefined = this.classes.get(orientation);
    if (newClass) {
      this.element.classList.add(newClass);
    }
  }
}

export default OrientationManager;
