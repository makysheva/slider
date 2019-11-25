import { SlideController } from "../controller/SlideController";
import { LabelView } from "./label/LabelView";
import { Orientation } from "../model/Orientation";
import { FillBar } from "./fill_bar/FillBar";

export abstract class SingleView {
    protected _parent: HTMLElement;
    protected _controller: SlideController;
    protected _slider: HTMLElement;
    protected _marker: Element;
    protected _fill: FillBar;
    protected _label: LabelView;
    protected _moveHandler: any;

    constructor(parent: HTMLElement, controller: SlideController, orientation: Orientation) {
        this._parent = parent;
        this._controller = controller;

        this._slider = document.createElement('div');
        this._slider.classList.add('slider');
        this._parent.appendChild(this._slider);

        this._marker = document.createElement('div');
        this._marker.classList.add('slider__marker');
        this._slider.appendChild(this._marker);
        this._label = new LabelView(this._slider, orientation);

        this._marker.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    destroy() {
        this._parent.removeChild(this._slider);
    }

    getParent(): HTMLElement {
        return this._parent;
    }

    showLabel() {
        this._label.show();
    }

    hideLabel() {
        this._label.hide();
    }

    public abstract update(position: number, value: number): void;

    protected onMouseDown(event: any) {
        event.preventDefault();
        if (!this._moveHandler) {
            this._moveHandler = this.onMouseMove.bind(this);
            document.addEventListener('mousemove', this._moveHandler);
        }
    }

    protected onMouseMove(event: any) {
        let pos: number = this.calculatePosition(event);
        pos = (pos > 1) ? 1 : pos;
        pos = (pos < 0) ? 0 : pos;
        this._controller.move(pos);
    }

    protected abstract calculatePosition(event: any): number;

    protected onMouseUp(event: any) {
        document.removeEventListener('mousemove', this._moveHandler);
        this._moveHandler = null;
    }

    
}