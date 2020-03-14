import Orientation from '../../types/Orientation';
import OrientationManager from '../OrientationManager';

class Field {
  private parent: HTMLElement;

  private fieldElement: HTMLElement;

  private key: string;

  private clickHandler: (key: string) => void;

  private orientationManager: OrientationManager;

  constructor(parent: HTMLElement, key: string) {
    this.parent = parent;
    this.key = key;

    this.fieldElement = document.createElement('div');
    this.fieldElement.classList.add('slider__range');
    this.parent.appendChild(this.fieldElement);

    this.orientationManager = new OrientationManager(this.fieldElement);
    this.orientationManager.addOrientationClass(Orientation.Horizontal, 'slider__range_horizontal');
    this.orientationManager.addOrientationClass(Orientation.Vertical, 'slider__range_vertical');

    this.fieldElement.addEventListener('click', this.onClick.bind(this));
  }

  public update(value: string, position: number, orientation: Orientation) {
    this.orientationManager.setCurrentOrientation(orientation);
    this.fieldElement.innerHTML = value;
    const rect: DOMRect = this.fieldElement.getBoundingClientRect();
    let pos: number = 0;
    if (orientation === Orientation.Horizontal) {
      pos = position - rect.width / 2;
      this.fieldElement.style.left = `${pos}px`;
    } else {
      pos = position - rect.height / 2;
      this.fieldElement.style.top = `${pos}px`;
    }
    
  }

  public addClickListener(clickHandler: (key: string) => void) {
    this.clickHandler = clickHandler;
  }

  private onClick() {
    this.clickHandler.call(this, this.key);
  }
}

export default Field;
