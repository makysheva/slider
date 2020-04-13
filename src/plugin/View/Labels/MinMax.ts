import Controller from '../../Controller/Controller';
import Field from './Field';
import Orientation from '../../Types/Orientation';

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

  public update(data: {
    min: string,
    max: string,
    orientation: Orientation,
    minPos: number,
    maxPos: number,
  }) {
    const {
      max,
      maxPos,
      min,
      minPos,
      orientation,
    } = data;
    this.min.update({ value: min, position: minPos, orientation });
    this.max.update({ value: max, position: maxPos, orientation });
  }

  private init() {
    this.minMaxElement = document.createElement('div');
    this.minMaxElement.classList.add('slider__min-max');
    this.parent.appendChild(this.minMaxElement);
    this.min = new Field(this.minMaxElement, 'min');
    this.min.add('click', this.onClick);
    this.max = new Field(this.minMaxElement, 'max');
    this.max.add('click', this.onClick);
  }

  private onClick = (key: string) => {
    if (key === 'min') {
      this.controller.setPosition(0);
    } else {
      this.controller.setPosition(1);
    }
  }
}

export default MinMax;
