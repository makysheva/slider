import Model from '../models/Slider';
import SliderData from '../types/SliderData';
import View from '../view/Slider';

class Controller {
  private model: Model;

  private view: View;

  constructor(container: HTMLElement, model: Model) {
    this.model = model;
    this.init(container);
  }

  public setPosition(pos: number) {
    this.model.setPosition(pos);
  }

  public setPointPosition(pos: number, pointer: number) {
    this.model.setPointPosition(pos, pointer);
  }

  private init(container: HTMLElement) {
    this.view = new View(container, this);
    this.updateView();
    this.model.addListener('change', this.onChangeModel.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onChangeModel() {
    this.updateView();
  }

  private updateView() {
    const data = new SliderData(this.model);
    this.view.update(data);
  }

  private onResize() {
    this.updateView();
  }
}

export default Controller;
