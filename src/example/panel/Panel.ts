import { IProps } from '../../plugin/types/IProps';
import Slider from '../../plugin/Slider';
import Orientation from '../../plugin/types/Orientation';

class Panel {
  private parent: HTMLElement;

  private panelElement: HTMLElement;

  private slider: Slider;

  private min: HTMLInputElement;

  private max: HTMLInputElement;

  private step: HTMLInputElement;

  private tips: HTMLInputElement;

  private low: HTMLInputElement;

  private high: HTMLInputElement;

  private range: HTMLInputElement;

  private vertical: HTMLInputElement;

  constructor(parent: HTMLElement, props?: IProps) {
    this.parent = parent;

    this.init(props);
    this.update();
  }

  public update() {
    this.min.value = this.slider.getMin().toString();
    this.max.value = this.slider.getMax().toString();
    this.low.value = this.slider.getValue().toString();
    this.high.value = this.slider.getValue(1).toString();
    this.range.checked = this.slider.getRange();
    this.tips.checked = this.slider.getTipVisibility();
    this.vertical.checked = this.slider.getOrientation() === Orientation.Vertical;
    this.step.value = this.slider.getStep().toString();
    this.low.setAttribute('step', this.step.value);
    this.high.setAttribute('step', this.step.value);
  }

  private init(props?: IProps) {
    const mainElement: HTMLElement = document.createElement('div');
    mainElement.classList.add('panel');
    this.parent.appendChild(mainElement);

    this.panelElement = document.createElement('div');
    this.panelElement.classList.add('panel__inputs');
    mainElement.appendChild(this.panelElement);

    const sliderContainer: HTMLElement = document.createElement('div');
    sliderContainer.classList.add('panel__slider');
    mainElement.appendChild(sliderContainer);

    this.min = this.createInput('Min');
    this.min.addEventListener('change', this.onChangeMin.bind(this));
    this.max = this.createInput('Max');
    this.max.addEventListener('change', this.onChangeMax.bind(this));
    this.step = this.createInput('Step');
    this.step.addEventListener('change', this.onChangeStep.bind(this));
    this.low = this.createInput('Low');
    this.low.addEventListener('change', this.onChangeLow.bind(this));
    this.high = this.createInput('High');
    this.high.addEventListener('change', this.onChangeHigh.bind(this));
    this.range = this.createInput('Range', 'checkbox');
    this.range.addEventListener('change', this.onChangeRange.bind(this));
    this.vertical = this.createInput('Vertical', 'checkbox');
    this.vertical.addEventListener('change', this.onChangeVertical.bind(this));
    this.tips = this.createInput('Tips', 'checkbox');
    this.tips.addEventListener('change', this.onChangeTips.bind(this));

    this.slider = new Slider(sliderContainer, props);
    this.slider.addChangeListener(this.update.bind(this));
  }

  private createInput(label: string, type: string = 'number'): HTMLInputElement {
    const labelElement: HTMLElement = document.createElement('label');
    labelElement.textContent = label;
    labelElement.classList.add('panel__label');
    this.panelElement.appendChild(labelElement);

    const input: HTMLInputElement = document.createElement('input');
    input.classList.add('panel__input');
    input.setAttribute('type', type);
    labelElement.appendChild(input);

    return input;
  }

  private onChangeMin() {
    this.slider.setMin(+this.min.value);
  }

  private onChangeMax() {
    this.slider.setMax(+this.max.value);
  }

  private onChangeLow() {
    this.slider.setValue(+this.low.value, 0);
  }

  private onChangeHigh() {
    this.slider.setValue(+this.high.value, 1);
  }

  private onChangeRange() {
    this.slider.setRange(this.range.checked);
  }

  private onChangeStep() {
    this.slider.setStep(+this.step.value);
  }

  private onChangeVertical() {
    const orientation = this.vertical.checked ? Orientation.Vertical : Orientation.Horizontal;
    this.slider.setOrientation(orientation);
  }

  private onChangeTips() {
    this.slider.setTipVisibility(this.tips.checked);
  }
}

export default Panel;
