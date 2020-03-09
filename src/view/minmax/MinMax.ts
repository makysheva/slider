import Field from './Field';
import Controller from '../../controller/Controller';
import Orientation from '../../types/Orientation';
import OrientationManager from '../OrientationManager';

class MinMax {
  private parent: HTMLElement;

  private controller: Controller;

  private minMaxElement: HTMLElement

  private min: Field;

  private max: Field;

  private orientationManager: OrientationManager;


  constructor(parent: HTMLElement, controller: Controller) {
    this.parent = parent;
    this.controller = controller;

    this.minMaxElement = document.createElement('div');
    this.minMaxElement.classList.add('slider__min-max');
    this.parent.appendChild(this.minMaxElement);

    this.min = new Field(this.minMaxElement, 'min');
    this.min.addClickListener(this.onClick.bind(this));
    this.max = new Field(this.minMaxElement, 'max');
    this.max.addClickListener(this.onClick.bind(this));

    this.orientationManager = new OrientationManager(this.minMaxElement);
    this.orientationManager.addOrientationClass(Orientation.Horizontal, 'slider__min-max_horizontal');
    this.orientationManager.addOrientationClass(Orientation.Vertical, 'slider__min-max_vertical');
  }

  public update(min: string, max: string, orientation: Orientation) {
    this.orientationManager.setCurrentOrientation(orientation);
    this.min.update(min);
    this.max.update(max);
  }

  private onClick(key: string) {
    if (key === 'min') {
      this.controller.setPosition(0);
    } else {
      this.controller.setPosition(1);
    }
  }
}

export default MinMax;
