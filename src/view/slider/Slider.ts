import { Marker } from "../marker/Marker";
import { FillBar } from "../fill_bar/FillBar";
import { Orientation } from "../../model/Orientation";

export class Slider {
    private static readonly SLIDER_CLASS: string = 'slider';
    private static readonly  SLIDER_VERTICAL_CLASS: string = 'slider--vertical';

    private _parent: HTMLElement;
    private _container: HTMLElement;
    private _marker: Marker;
    private _fillBar: FillBar;

    constructor(parent: HTMLElement, orientation: Orientation) {
        this._parent = parent;

        this._container = document.createElement('div');
        this._container.classList.add(Slider.SLIDER_CLASS);

        if (orientation == Orientation.Vertical) {
            this._container.classList.add(Slider.SLIDER_VERTICAL_CLASS);
        }

        this._parent.appendChild(this._container);

        this._marker = new Marker(this._container, orientation);
        this._fillBar = new FillBar(this._container, orientation);
    }

    update(orientation: Orientation, position: number) {
        if (orientation == Orientation.Horizontal) {
            this.updateHorizontalPosition(position, orientation);
        } else {
            this.updateVerticalPosition(position, orientation);
        }
        
    }
 
    showLabel() {
        this._marker.showLabel();
    }

    hideLabel() {
        this._marker.hideLabel();
    }

    setHorizontal() {
        this._container.classList.remove(Slider.SLIDER_VERTICAL_CLASS);
        this._marker.setHorizontal();
        this._fillBar.setHorizontal();
    }

    setVertical() {
        this._container.classList.add(Slider.SLIDER_VERTICAL_CLASS);
        this._marker.setVertical();
        this._fillBar.setVertical();
    }

    onMove() {

    }

    private updateHorizontalPosition(position: number, orientation: Orientation) {
        let sliderLength: number = this._container.getBoundingClientRect().width - this._marker.getWidht();
        position = position * sliderLength;
        this._marker.setPositionX(position);
        this._fillBar.update(0, this._container.getBoundingClientRect().width - position, orientation);
    }

    private updateVerticalPosition(position: number, orientation: Orientation) {
        let sliderLength: number = this._container.getBoundingClientRect().height - this._marker.getHeight();
        position = sliderLength - position * sliderLength;
        this._marker.setPositionY( position);
        this._fillBar.update(0, position  , orientation);
    }
}