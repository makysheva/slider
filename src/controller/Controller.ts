import Model from '../model/Slider';
import SliderData from '../types/SliderData';
import View from '../view/Slider';

class Controller {
  private model: Model;

  private view: View;

  constructor(container: HTMLElement, model: Model) {
    this.model = model;
    this.view = new View(container, this);
    this.updateView();

    this.model.addListener('change', this.onChangeModel.bind(this));

    window.addEventListener('resize', this.onResize.bind(this));
  }

  public setPosition(pos: number) {
    this.model.setPosition(pos);
  }

  public setPointPosition(pos: number, pointer: number) {
    this.model.setPointPosition(pos, pointer);
  }

  private onChangeModel() {
    this.updateView();
  }

  private updateView() {
    const data: SliderData = new SliderData(this.model);
    this.view.update(data);
  }

  private onResize() {
    this.updateView();
  }
}

export default Controller;
