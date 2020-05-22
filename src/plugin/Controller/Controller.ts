import Model from '../Model/Model';
import View from '../View/MainView';

interface IPointPosition { position: number, id: number }

class Controller {
  private model: Model;

  private view: View;

  constructor(container: HTMLElement, model: Model) {
    this.model = model;
    this.init(container);
  }

  private init(container: HTMLElement) {
    this.view = new View(container, this);
    this.view.add('changePosition', this.onChangeViewPosition);
    this.view.add('changePointPosition', this.onChangeViewPointPosition);
    this.updateView();
    this.model.add('change', this.onChangeModel);
  }

  private onChangeViewPosition = (position: number) => {
    this.model.setPosition(position);
  }

  private onChangeViewPointPosition = (point: IPointPosition) => {
    this.model.setPointPosition(point.position, point.id);
  }

  private onChangeModel = () => {
    this.updateView();
  }

  private updateView() {
    const low = this.model.getPointPosition(0);
    const high = this.model.getPointPosition(1);
    this.view.update({ ...this.model.getState(), low, high });
  }
}

export default Controller;
