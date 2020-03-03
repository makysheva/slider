import { SliderFacade } from "../../src/controller/SliderFacade";
import { ModelEvents } from "../../src/model/ModelEvents";
import { SliderModel } from "../../src/model/SliderModel";

class ValueControl {
  private _parent: HTMLElement;
  private _facade: SliderFacade;

  private _minInput: HTMLInputElement;
  private _maxInput: HTMLInputElement;
  private _rangeInput: HTMLInputElement;
  private _maxContainer: HTMLElement;

  constructor(parent: HTMLElement, facade: SliderFacade) {
    this._parent = parent;
    this._facade = facade;

    this._minInput = this.createInput('number');
    this._maxInput = this.createInput('number');
    this._rangeInput = this.createInput('checkbox');

    this._rangeInput.addEventListener('change', this.onChangeRangeInput.bind(this));
    this._minInput.addEventListener('change', this.onChangeMinInput.bind(this));
    this._maxInput.addEventListener('change', this.onChangeMaxInput.bind(this));

    this._parent.appendChild(this.wrapByLabel(this._rangeInput, 'Range'));
    this._parent.appendChild(this.wrapByLabel(this._minInput, 'Low value'));
    
    this._maxContainer = this.wrapByLabel(this._maxInput, 'Hight value');

    this._facade.addEventListener(ModelEvents.changeValue, this.onChangeValue.bind(this));
    this._facade.addEventListener(ModelEvents.changeRange, this.onChangeRange.bind(this));

    if (this._facade.range) {
      this.showMaxInput();
    }
    this.updateFields();
  }

  private onChangeRangeInput() {
    this._facade.range = this._rangeInput.checked;
  }

  private onChangeRange() {
    if (this._facade.range) {
      this.showMaxInput();
    } else {
      this.hideMaxInput();
    }
  }

  private showMaxInput() {
    this._parent.appendChild(this._maxContainer);
    this.updateFields();
  }

  private hideMaxInput() {
    this._parent.removeChild(this._maxContainer);
  }

  private updateFields() {
    const isRange: boolean = this._facade.range;
    this._rangeInput.checked = isRange;
    this._minInput.value = this._facade.getValue(0).toString();
    if (isRange) {
      this._maxInput.value = this._facade.getValue(1).toString();
    }
  }

  private onChangeMinInput() {
    const value: number = +<number><unknown>this._minInput.value;
    this._facade.setValue(value, 0);
  }

  private onChangeMaxInput() {
    const value: number = +<number><unknown>this._maxInput.value;
    this._facade.setValue(value, 1);
  }

  private onChangeValue() {
    this.updateFields();
  }

  private createInput(type: string): HTMLInputElement {
    const element: HTMLInputElement = document.createElement('input');
    element.setAttribute('type', type);
    return element;
  }

  private wrapByLabel(element: HTMLElement, text: string): HTMLElement {
    const label: HTMLElement = document.createElement('label');
    label.classList.add('example__element');
    label.textContent = text;
    label.appendChild(element);
    return label;
  }
}

export default ValueControl;
