import { Orientation } from "../../model/Orientation";

export class FillBar {
    private static readonly FILL_CLASS: string = 'slider__fill';
    private static readonly FILL_VERTICAL_CLASS: string = 'slider__fill--vertical';

    protected _parent: HTMLElement;
    protected _bar: HTMLElement;

    constructor(parent: HTMLElement, orientation: Orientation) {
        this._parent = parent;

        this._bar = document.createElement('div');
        this._bar.classList.add(FillBar.FILL_CLASS);
        if (orientation == Orientation.Vertical) {
            this._bar.classList.add(FillBar.FILL_VERTICAL_CLASS);
        }
        this._parent.appendChild(this._bar);
    }
    
    update(low: number, hight: number, orientation: Orientation) {
        if (orientation == Orientation.Horizontal) {
            this._bar.style.left = low + 'px';
            this._bar.style.right = hight + 'px';
        } else {
            this._bar.style.top = hight + 'px';
            this._bar.style.bottom = low + 'px';
        }
    }


    setHorizontal() {
        this._bar.style.top = 'auto';
        this._bar.style.bottom = 'auto';
        this._bar.classList.remove(FillBar.FILL_VERTICAL_CLASS);
    }

    setVertical() {
        this._bar.style.left = 'auto';
        this._bar.style.right = 'auto';
        this._bar.classList.add(FillBar.FILL_VERTICAL_CLASS);
    }
}