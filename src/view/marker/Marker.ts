import { LabelView } from "../label/LabelView";
import { Orientation } from "../../model/Orientation";
import { Slider } from "../slider/Slider";

export class Marker {
    private _parent: HTMLElement;
    private _marker: HTMLElement;
    private _label: LabelView;
    private _moveHandler: any;
    private _slider: Slider;
    private _id: number;

    constructor(parent: HTMLElement, slider: Slider, id: number) {
        this._parent = parent;
        this._slider = slider;
        this._id = id;

        this._marker = document.createElement('div');
        this._marker.classList.add('slider__marker');
        this._parent.appendChild(this._marker);
        this._label = new LabelView(this._marker, this._slider.getOrientation());
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

    getCenterByX(): number {
        return this._marker.getBoundingClientRect().left + this._marker.getBoundingClientRect().width / 2;
    }

    getCenterByY(): number {
        return this._marker.getBoundingClientRect().top + this._marker.getBoundingClientRect().height / 2;
    }

    showLabel() {
        this._label.show();
    }

    hideLabel() {
        this._label.hide();
    }

    setValue(value: number) {
        this._label.setValue(value);
    }

    protected onMouseDown(event: any) {
        event.preventDefault();

        if (!this._moveHandler) {
            this._moveHandler = this.onMove.bind(this);
            document.addEventListener('mousemove', this._moveHandler);
        }
    }

    private onMove(event: any) {
        let pos: number = 0;

        if (this._slider.getOrientation() == Orientation.Horizontal) {
            pos = (event.pageX - this._slider.getX()) / this._slider.getSliderLength();
        }

        if (this._slider.getOrientation() == Orientation.Vertical) {
            let offset: number = document.body.getBoundingClientRect().top;
            pos = 1 - ((event.pageY - this._slider.getY() + offset) / this._slider.getSliderLength());
        }

        pos = (pos > 1) ? 1 : pos;
        pos = (pos < 0) ? 0 : pos;

        this._slider.moveMarker(pos, this._id);
    }

    private onMouseUp(event: any) {
        document.removeEventListener('mousemove', this._moveHandler);
        this._moveHandler = null;
    }

    setHorizontal() {
        this._marker.style.top = 'auto';
        this._label.setHorizontal();
    }

    setVertical() {
        this._marker.style.left = 'auto';
        this._label.setVertical();
    }
}