import { Options } from "../../src/model/Options";
import { SliderFacade } from "../../src/controller/SliderFacade";
import { ModelEvents } from "../../src/model/ModelEvents";
import { Orientation } from "../../src/model/Orientation";

export class Panel {
    private _slider: SliderFacade;
    private _container: JQuery;
    private _textFieldLow: JQuery;
    private _textFieldHight: JQuery;
    private _textFieldStep: JQuery;
    private _selectOrientation: JQuery;
    private _checkboxLabels: JQuery;
    private _isRange: boolean;

    constructor(parent: HTMLElement, props: Options) {
        this._isRange = props.range || false;
        this._container = $('<div class="example">');
        let panel: JQuery = $('<div class="example__panel"></div>');
        let slider: JQuery = $('<div class="example__slider"></div>');
        $(parent).append(this._container);
        this._container.append(panel);
        this._container.append(slider);
        this._textFieldLow = $('<input type="number">');
        panel.append(this._textFieldLow);
        this.wrapLabel(this._textFieldLow, 'Low');

        if (this._isRange) {
            this._textFieldHight = $('<input type="number">');
            panel.append(this._textFieldHight);
            this.wrapLabel(this._textFieldHight, 'Hight');
            this._textFieldHight.on('input', this.onChangeHightValue.bind(this));
        }

        this._textFieldStep = $('<input type="number">');
        panel.append(this._textFieldStep);
        this.wrapLabel(this._textFieldStep, 'Step');
        this._textFieldStep.on('input', this.onChangeStep.bind(this));

        this._selectOrientation = $('<select>'+
            '<option value="horizontal">Horizontal</option>'+
            '<option value="vertical">Vertical</option>'+
            '</select>'
        );
        
        panel.append(this._selectOrientation);
        this.wrapLabel(this._selectOrientation, 'Orientation');

        this._checkboxLabels = $('<input type="checkbox">');
        panel.append(this._checkboxLabels);
        this.wrapLabel(this._checkboxLabels, 'Show labels');

        this._slider = new SliderFacade(slider.get(0), props);

        this._textFieldLow.on('input', this.onChangeLowValue.bind(this));
        this._checkboxLabels.on('change', this.onCheckboxChange.bind(this));
        this._selectOrientation.on('change', this.onChangeOrientation.bind(this));

        this._slider.addEventListener(ModelEvents.changeValue, this.updateValues.bind(this));
        this._slider.addEventListener(ModelEvents.changeLabelVisibility, this.updateLabelsCheckbox.bind(this));
        this._slider.addEventListener(ModelEvents.changeOrientation, this.updateOrientation.bind(this));

        this.updateLabelsCheckbox();
        this.updateValues();
        this.updateOrientation();
        this.updateStep();
    }

    private updateValues() {
        this._textFieldLow.val(this._slider.value);
        if (this._slider.range) {
            this._textFieldHight.val(this._slider.getValue(1));
        }
    }

    private updateStep() {
        this._textFieldStep.val(this._slider.step);
    }

    private onChangeLowValue() {
        if (this._isRange) {
            this._slider.setValue(<number>this._textFieldLow.val(), 0);
        } else {
            this._slider.value = <number>this._textFieldLow.val();
        }
    }

    private onChangeHightValue() {
        this._slider.setValue(<number>this._textFieldHight.val(), 1);
    }

    private onChangeStep() {
        this._slider.step = +<number>this._textFieldStep.val();
    }

    private onChangeOrientation() {
        if (this._selectOrientation.val() == 'horizontal') {
            this._slider.orientation = Orientation.Horizontal;
        } else {
            this._slider.orientation = Orientation.Vertical;
        }
    }

    private updateLabelsCheckbox() {
        this._checkboxLabels.prop('checked', this._slider.labels);
    }

    private updateOrientation() {
        if (this._slider.orientation == Orientation.Horizontal) {
            this._selectOrientation.val('horizontal');
        } else {
            this._selectOrientation.val('vertical');
        }
    }

    private onCheckboxChange() {
        this._slider.labels = this._checkboxLabels.prop('checked');
    }

    private wrapLabel(element: JQuery, text: string): JQuery {
        return element.wrap('<label class="example__element">' + text + '</label>')
    }
}