import Controller from './Controller/Controller';
import Model from './Model/Model';
import Orientation from './Types/Orientation';
import IState from './Model/IState';

class Slider {
  private model: Model;

  private changeCallback: Callback;

  constructor(container: HTMLElement, props: IState) {
    this.init(container, props);
  }

  public setMin(min: number) {
    this.model.setMin(min);
  }

  public getMin(): number {
    return this.model.getMin();
  }

  public setMax(max: number) {
    this.model.setMax(max);
  }

  public getMax(): number {
    return this.model.getMax();
  }

  public getValue(id: number = 0) {
    return this.model.getValue(id);
  }

  public setValue(value: number, id: number = 0) {
    this.model.setValue(value, id);
  }

  public setRange(isRange: boolean) {
    this.model.setRange(isRange);
  }

  public getRange(): boolean {
    return this.model.getRange();
  }

  public setStep(step: number) {
    this.model.setStep(step);
  }

  public getStep(): number {
    return this.model.getStep();
  }

  public getState(): IState {
    return this.model.getState();
  }

  public setTipVisibility(isVisible: boolean) {
    this.model.setTooltipVisibility(isVisible);
  }

  public getTipVisibility(): boolean {
    return this.model.getTooltipVisibility();
  }

  public setOrientation(orientation: Orientation) {
    this.model.setOrientation(orientation);
  }

  public getOrientation(): Orientation {
    return this.model.getOrientation();
  }

  public addChangeListener(fn: Callback) {
    this.changeCallback = fn;
  }

  private init(container: HTMLElement, props: IState) {
    this.model = new Model(props);
    new Controller(container, this.model);
    this.model.addListener('change', this.onChangeModel);
  }

  private onChangeModel = () => {
    if (this.changeCallback) {
      this.changeCallback.call(this);
    }
  }
}

type Callback = () => void;

export default Slider;
