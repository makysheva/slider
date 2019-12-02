import { SliderModel } from "../model/SliderModel";
import { Options } from "../model/Options";
import { Controller } from "./Controller";
import { Orientation } from "../model/Orientation";
import { ModelEvents } from "../model/ModelEvents";

export class SliderFacade {
    private _model: SliderModel;
    private _controller: Controller;

    constructor(parent:HTMLElement, props: Options) {
        this._model = new SliderModel(props);
        this._controller = new Controller(parent, this._model);
    }

    get value(): number {
        return this._model.value;
    }

    set value(value: number) {
        this._model.value = value;
    }

    setValue(value: number, id: number) {
        this._model.setValue(value, id);
    }

    getValue(id: number): number {
        return this._model.getValue(id);
    }

    get step(): number {
        return this._model.step;
    }

    set step(value: number) {
        this._model.step = value;
    }

    get labels(): boolean {
        return this._model.labels;
    }

    set labels(value: boolean) {
        this._model.labels = value;
    }

    get orientation(): Orientation {
        return this._model.orientation;
    }

    set orientation(orientation: Orientation) {
        this._model.orientation = orientation;
    }

    addEventListener(type: ModelEvents, fn: Function) {
        this._model.addEventListener(type, fn);
    }

}