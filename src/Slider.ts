import Model from './model/Slider';
import Controller from './controller/Controller';
import Orientation from './types/Orientation';
import { Props } from './types/Props';

class Slider {
  private model: Model;

  private controller: Controller;

  private changeCallback: Function;


  constructor(container: HTMLElement, props: Props = {}) {
    this.model = new Model();
    this.controller = new Controller(container, this.model);

    this.model.addListener('change', this.onChangeModel.bind(this));

    if (props.min) this.model.setMin(props.min);
    if (props.max) this.model.setMax(props.max);
    if (props.isRange) this.model.setRange(props.isRange);
    if (props.isTips) this.model.setTooltipVisibility(props.isTips);
    if (props.orientation) this.model.setOrientation(props.orientation);
    if (props.step) this.model.setStep(props.step);
    if (props.low) this.model.setValue(props.low);
    if (props.hight) this.model.setValue(props.hight, 1);
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

  public addChangeListener(fn: Function) {
    this.changeCallback = fn;
  }

  private onChangeModel() {
    this.changeCallback.call(this);
  }
}

export default Slider;
