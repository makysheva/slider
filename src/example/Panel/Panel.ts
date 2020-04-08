import Slider from '../../plugin/Slider';
import Orientation from '../../plugin/Types/Orientation';
import IState from '../../plugin/Model/IState';

class Panel {
  private parent: HTMLElement;

  private panelElement: HTMLElement;

  private slider: Slider;

  private inputs = new Map<string, HTMLInputElement>();

  constructor(parent: HTMLElement, props: IState) {
    this.parent = parent;

    this.init(props);
    this.update();
  }

  public update = () => {
    const state = this.slider.getState();
    Object.keys(state).forEach((value) => {
      if (value === 'values') {
        this.setInputData('value[0]', (state as any)[value][0]);
        this.setInputData('value[1]', (state as any)[value][1]);
      } else if (value === 'orientation') {
        const isVertical = (state as any)[value] === Orientation.Vertical;
        this.setInputData(value, isVertical);
      } else {
        this.setInputData(value, (state as any)[value]);
      }
    });
  }

  private init(props: IState) {
    const mainElement: HTMLElement = document.createElement('div');
    mainElement.classList.add('panel');
    this.parent.appendChild(mainElement);

    const panelElement = document.createElement('div');
    this.panelElement = panelElement;
    panelElement.classList.add('panel__inputs');
    mainElement.appendChild(panelElement);

    const sliderContainer: HTMLElement = document.createElement('div');
    sliderContainer.classList.add('panel__slider');
    mainElement.appendChild(sliderContainer);

    const inputs = [
      { key: 'min', text: 'Min', fn: this.onChangeMin, type: 'number' },
      { key: 'max', text: 'Max', fn: this.onChangeMax, type: 'number' },
      { key: 'step', text: 'Step', fn: this.onChangeStep, type: 'number' },
      { key: 'value[0]', text: 'Low', fn: this.onChangeLow, type: 'number' },
      { key: 'value[1]', text: 'High', fn: this.onChangeHigh, type: 'number' },
      { key: 'isRange', text: 'Range', fn: this.onChangeRange, type: 'checkbox' },
      { key: 'orientation', text: 'Vertical', fn: this.onChangeVertical, type: 'checkbox' },
      { key: 'isTips', text: 'Tips', fn: this.onChangeTips, type: 'checkbox' },
    ];

    this.initInputs(inputs);

    this.slider = new Slider(sliderContainer, props);
    this.slider.add('change', this.update);
  }

  private initInputs(
    inputs: Array<{ key: string, text: string, fn: () => void, type: string }>,
  ) {
    inputs.forEach((item) => {
      const input = this.createInput(item.text, item.type, item.key);
      input.addEventListener('change', item.fn);
      this.inputs.set(item.key, input);
    });
  }

  private setInputData(key: string, data: number | boolean) {
    const input = this.inputs.get(key);
    if (!input) {
      return;
    }

    if (typeof data === 'number') {
      input.value = data.toString();
    } else {
      input.checked = data;
    }
  }

  private createInput(label: string, type: string = 'number', key: string): HTMLInputElement {
    const labelElement: HTMLElement = document.createElement('label');
    labelElement.textContent = label;
    labelElement.classList.add('panel__label');
    this.panelElement.appendChild(labelElement);

    const input: HTMLInputElement = document.createElement('input');
    input.classList.add('panel__input');
    input.setAttribute('type', type);
    input.setAttribute('name', key);
    labelElement.appendChild(input);

    return input;
  }

  private onChangeMin = () => {
    const value = this.inputs.get('min')?.value;
    this.slider.setMin(Number(value));
  }

  private onChangeMax = () => {
    const value = this.inputs.get('max')?.value;
    this.slider.setMax(Number(value));
  }

  private onChangeLow = () => {
    const value = this.inputs.get('value[0]')?.value;
    this.slider.setValue(Number(value), 0);
  }

  private onChangeHigh = () => {
    const value = this.inputs.get('value[1]')?.value;
    this.slider.setValue(Number(value), 1);
  }

  private onChangeRange = () => {
    const value = this.inputs.get('isRange');
    this.slider.setRange(value?.checked || false);
  }

  private onChangeStep = () => {
    const value = this.inputs.get('step')?.value;
    this.slider.setStep(Number(value));
  }

  private onChangeVertical = () => {
    const checked = this.inputs.get('orientation')?.checked;
    const orientation = checked ? Orientation.Vertical : Orientation.Horizontal;
    this.slider.setOrientation(orientation);
  }

  private onChangeTips = () => {
    const checked = this.inputs.get('isTips')?.checked || false;
    this.slider.setTipVisibility(checked);
  }
}

export default Panel;
