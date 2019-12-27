import { Orientation } from "../../model/Orientation";

class LabelView {
    private static readonly LABEL_CLASS = 'slider__label';
    private static readonly LABEL_VERTICAL_CLASS = 'slider__label--vertical';

    private _parent: HTMLElement;
    private _label: HTMLElement;

    constructor(parent: HTMLElement, orientation: Orientation) {
        this._parent = parent;

        this._label = document.createElement('div');
        this._label.classList.add(LabelView.LABEL_CLASS);

        if (orientation == Orientation.Vertical) {
            this._label.classList.add(LabelView.LABEL_VERTICAL_CLASS);
        }
    }

    show() {
        this._parent.appendChild(this._label);
    }

    hide() {
        if (this._parent.hasChildNodes()) {
            this._parent.removeChild(this._label);
        }
        
    }

    setValue(value: number) {
        this._label.innerHTML = value.toString();
    }

    setPositionX(x: number) {
        this._label.style.left = x + 'px';
    }

    setPositionY(y: number) {
        this._label.style.top = y + 'px';
    }

    getWidth(): number {
        return this._label.getBoundingClientRect().width;
    }

    getHeight(): number {
        return this._label.getBoundingClientRect().height;
    }

    setHorizontal() {
        this._label.classList.remove(LabelView.LABEL_VERTICAL_CLASS);
    }

    setVertical() {
        this._label.classList.add(LabelView.LABEL_VERTICAL_CLASS);
    }
}

export { LabelView };