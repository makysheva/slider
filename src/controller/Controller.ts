import Model from '../model/Slider';
import View from '../view/Slider';
import Orientation from '../types/Orientation';
import SliderData from '../types/SliderData';

class Controller {
  private model: Model;

  private view: View;

  constructor(container: HTMLElement) {
    this.model = new Model();
    // this.model.setOrientation(Orientation.Vertical);
    // this.model.setValue(67);
    this.model.setRange(true);
    this.model.setMin(-40);
    this.model.setMax(1000);
    // this.model.setMax(1000);
    this.view = new View(container, this);
    this.updateView();

    this.model.addListener('change', this.onChangeModel.bind(this));
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
    // console.log('new pos: ' + this.model.getPointPosition());
    const data: SliderData = new SliderData(this.model);
    console.log(data);
    

    this.view.update(data);
  }
}

export default Controller;
