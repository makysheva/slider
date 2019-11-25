import { LabelView } from "../label/LabelView";
import { Orientation } from "../../model/Orientation";

export class Marker {
    private _parent: HTMLElement;
    private _marker: HTMLElement;
    private _label: LabelView;
    private _moveHandler: any;

    constructor(parent: HTMLElement, orientation: Orientation) {
        this._parent = parent;

        this._marker = document.createElement('div');
        this._marker.classList.add('slider__marker');
        this._parent.appendChild(this._marker);
        this._label = new LabelView(this._marker, orientation);
        this._label.show();

        this._marker.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    

    getWidht(): number {
        return this._marker.getBoundingClientRect().width;
    }

    getHeight(): number {
        return this._marker.getBoundingClientRect().height;
    }

    setPositionX(x: number) {
        this._marker.style.left = x + 'px';
    }

    setPositionY(y: number) {
        this._marker.style.top = y + 'px';
    }

    showLabel() {
        this._label.show();
    }

    hideLabel() {
        this._label.hide();
    }

    protected onMouseDown(event: any) {
        event.preventDefault();
        if (!this._moveHandler) {
            //this._moveHandler = this.onMouseMove.bind(this);
            //document.addEventListener('mousemove', this._moveHandler);
        }
    }

    private onMouseUp(event: any) {
        document.removeEventListener('mousemove', this._moveHandler);
        this._moveHandler = null;
    }

    setHorizontal() {
        this._label.setHorizontal();
    }

    setVertical() {
        this._label.setVertical();
    }
}