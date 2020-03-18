import Controller from '../../Controller/Controller';
import Field from './Field';
import Orientation from '../../types/Orientation';

class MinMax {
  private parent: HTMLElement;

  private controller: Controller;

  private minMaxElement: HTMLElement

  private min: Field;

  private max: Field;

  constructor(parent: HTMLElement, controller: Controller) {
    this.parent = parent;
    this.controller = controller;

    this.init();
  }

  public update(
    min: string,
    max: string,
    orientation: Orientation,
    minPos: number,
    maxPos: number,
  ) {
    this.min.update(min, minPos, orientation);
    this.max.update(max, maxPos, orientation);
  }

  private init() {
    this.minMaxElement = document.createElement('div');
    this.minMaxElement.classList.add('slider__min-max');
    this.parent.appendChild(this.minMaxElement);
    this.min = new Field(this.minMaxElement, 'min');
    this.min.addClickListener(this.onClick.bind(this));
    this.max = new Field(this.minMaxElement, 'max');
    this.max.addClickListener(this.onClick.bind(this));
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
