import { Orientation } from "../../model/Orientation";

export class LabelView {
    private _parent: HTMLElement;
    private _label: HTMLElement;

    constructor(parent: HTMLElement, orientation: Orientation) {
        this._parent = parent;
        let className: string = 'slider__label';
        if (orientation == Orientation.Vertical) {
            //className += ' label--vertical';
        }
        this._label = document.createElement('div');
        this._label.classList.add(className);
    }

    show() {
        this._parent.appendChild(this._label);
    }

    hide() {
        this._parent.removeChild(this._label);
    }

    setValue(value: number) {
        this._label.innerHTML = value.toString();
    }

    setPosition(position: number) {
        this._label.style.left = position.toString() + 'px';
    }

    getWidth(): number {
        return this._label.getBoundingClientRect().width;
    }
}