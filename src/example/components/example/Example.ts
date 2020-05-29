import $ from 'jquery';
import Orientation from '../../../plugin/Types/Orientation';

class Example {
  private parent: HTMLElement;

  private minInput: HTMLInputElement | null;

  private maxInput: HTMLInputElement | null;

  private stepInput: HTMLInputElement | null;

  private lowInput: HTMLInputElement | null;

  private highInput: HTMLInputElement | null;

  private rangeInput: HTMLInputElement | null;

  private verticalInput: HTMLInputElement | null;

  private tipsInput: HTMLInputElement | null;

  private $slider: JQuery;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.init();
    this.initEventHandlers();
    this.updateInputs();
  }

  private init() {
    this.minInput = this.parent.querySelector('.js-example__min');
    this.maxInput = this.parent.querySelector('.js-example__max');
    this.stepInput = this.parent.querySelector('.js-example__step');
    this.lowInput = this.parent.querySelector('.js-example__low');
    this.highInput = this.parent.querySelector('.js-example__high');
    this.rangeInput = this.parent.querySelector('.js-example__range');
    this.verticalInput = this.parent.querySelector('.js-example__vertical');
    this.tipsInput = this.parent.querySelector('.js-example__tips');
    this.$slider = $(this.parent).find('.js-example__slider');
  }

  private initEventHandlers() {
    if (this.minInput) {
      this.minInput.addEventListener('change', this.handleMinInputChange);
    }
    if (this.maxInput) {
      this.maxInput.addEventListener('change', this.handleMaxInputChange);
    }
    if (this.stepInput) {
      this.stepInput.addEventListener('change', this.handleStepInputChange);
    }
    if (this.lowInput) {
      this.lowInput.addEventListener('change', this.handleLowInputChange);
    }
    if (this.highInput) {
      this.highInput.addEventListener('change', this.handleHighInputChange);
    }
    if (this.rangeInput) {
      this.rangeInput.addEventListener('change', this.handleRangeInputChange);
    }
    if (this.verticalInput) {
      this.verticalInput.addEventListener('change', this.handleVerticalInputChange);
    }
    if (this.tipsInput) {
      this.tipsInput.addEventListener('change', this.handleTipsInputChange);
    }
    this.$slider.slider('add', 'change', this.handleSliderChange);
  }

  private updateInputs() {
    this.updateMinInput();
    this.updateMaxInput();
    this.updateStepInput();
    this.updateLowInput();
    this.updateHighInput();
    this.updateRangeInput();
    this.updateVerticalInput();
    this.updateTipsInput();
  }

  private handleSliderChange = () => {
    this.updateInputs();
  }

  private handleMinInputChange = () => {
    const value: number = Number(this.minInput?.value);
    this.$slider.slider('setMin', value);
  }

  private handleMaxInputChange = () => {
    const value: number = Number(this.maxInput?.value);
    this.$slider.slider('setMax', value);
  }

  private handleStepInputChange = () => {
    const value: number = Number(this.stepInput?.value);
    this.$slider.slider('setStep', value);
  }

  private handleLowInputChange = () => {
    const value: number = Number(this.lowInput?.value);
    this.$slider.slider('setValue', value, 0);
  }

  private handleHighInputChange = () => {
    const value: number = Number(this.highInput?.value);
    this.$slider.slider('setValue', value, 1);
  }

  private handleRangeInputChange = () => {
    const isRange = this.rangeInput?.checked;
    this.$slider.slider('setRange', isRange);
  }

  private handleVerticalInputChange = () => {
    const orientation = this.verticalInput?.checked ? Orientation.Vertical : Orientation.Horizontal;
    this.$slider.slider('setOrientation', orientation);
  }

  private handleTipsInputChange = () => {
    const isTips = this.tipsInput?.checked;
    this.$slider.slider('setTipVisibility', isTips);
  }

  private updateMinInput() {
    const min = this.$slider.slider('getMin');
    if (this.minInput) {
      this.minInput.value = min;
    }
  }

  private updateMaxInput() {
    const max = this.$slider.slider('getMax');
    if (this.maxInput) {
      this.maxInput.value = max;
    }
  }

  private updateStepInput() {
    const step = this.$slider.slider('getStep');
    if (this.stepInput) {
      this.stepInput.value = step;
    }
  }

  private updateLowInput() {
    const low = this.$slider.slider('getValue', 0);
    if (this.lowInput) {
      this.lowInput.value = low;
    }
  }

  private updateHighInput() {
    const high = this.$slider.slider('getValue', 1);
    if (this.highInput) {
      this.highInput.value = high;
    }
  }

  private updateRangeInput() {
    const isRange = this.$slider.slider('getRange');
    if (this.highInput) {
      this.highInput.checked = isRange;
    }
  }

  private updateVerticalInput() {
    const isVertical = this.$slider.slider('getOrientation') === Orientation.Vertical;
    if (this.verticalInput) {
      this.verticalInput.checked = isVertical;
    }
  }

  private updateTipsInput() {
    const isTips = this.$slider.slider('getTipVisibility');
    if (this.tipsInput) {
      this.tipsInput.checked = isTips;
    }
  }
}

export default Example;
