import { Options } from "../../model/Options";
import { SliderFacade } from "../../controller/SliderFacade";
import { ModelEvents } from "../../model/ModelEvents";
import { ModuleDeclaration } from "babel-types";
import { SliderModel } from "../../model/SliderModel";

export class Panel {
    private _slider: SliderFacade;
    private _textFieldLow: JQuery;
    private _textFieldHight: JQuery;
    private _selectOrientation: JQuery;
    private _checkboxLabels: JQuery;
    private _isRange: boolean;

    constructor(parent: HTMLElement, props: Options) {
        this._isRange = props.range || false;
        let container: JQuery = $('<div class="example">');
        let panel: JQuery = $('<div class="example__panel"></div>');
        let slider: JQuery = $('<div class="example__slider"></div>');
        $(parent).append(container);
        container.append(panel);
        container.append(slider);
        this._textFieldLow = $('<input type="number" class="example__element">');
        panel.append(this._textFieldLow);

        if (this._isRange) {
            this._textFieldHight = $('<input type="number" class="example__element">');
            panel.append(this._textFieldHight);
            this._textFieldHight.on('input', this.onChangeHightValue.bind(this));
        }

        this._selectOrientation = $('<select class="example__element">'+
            '<option value="horizontal">Horizontal</option>'+
            '<option value="vertical">Vertical</option>'+
            '</select>'
        );
        panel.append(this._selectOrientation);

        this._checkboxLabels = $('<input type="checkbox"  class="example__element">');
        panel.append(this._checkboxLabels);

        this._slider = new SliderFacade(slider.get(0), props);



        this._textFieldLow.on('input', this.onChangeLowValue.bind(this));

        this._slider.addEventListener(ModelEvents.changeValue, this.onChangeValues.bind(this));
    }

    private onChangeValues(type: ModelEvents, data: SliderModel) {
        this._textFieldLow.val(data.value);
        if (data.range) {
            this._textFieldHight.val(data.values[1]);
        }
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
}