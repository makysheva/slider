import Model from '../Model/Model';
import View from '../View/MainView';

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
    this.model.add('change', this.onChangeModel);
    window.addEventListener('resize', this.handleWindowResize);
  }

  private onChangeModel = () => {
    this.updateView();
  }

  private updateView() {
    const low = this.model.getPointPosition(0);
    const high = this.model.getPointPosition(1);
    this.view.update({ ...this.model.getState(), low, high });
  }

  private handleWindowResize = () => {
    const isSliderExist = this.view && document.contains(this.view.getSliderElement());
    if (isSliderExist) {
      this.updateView();
    } else {
      window.removeEventListener('resize', this.handleWindowResize);
    }
  }
}

export default Controller;
