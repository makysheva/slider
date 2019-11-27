import { Marker } from "../marker/Marker";
import { FillBar } from "../fill_bar/FillBar";
import { Orientation } from "../../model/Orientation";
import { Controller } from "../../controller/Controller";

export class Slider {
    private static readonly SLIDER_CLASS: string = 'slider';
    private static readonly  SLIDER_VERTICAL_CLASS: string = 'slider--vertical';

    private _controller: Controller;

    protected _parent: HTMLElement;
    protected _container: HTMLElement;
    private _marker: Marker;
    private _rangeMarkers: Marker[];
    private _fillBar: FillBar;
    private _orientation: Orientation;

    constructor(parent: HTMLElement, orientation: Orientation, controller: Controller, isRange: boolean = false) {
        this._parent = parent;
        this._controller = controller;
        this._orientation = orientation;

        this._container = document.createElement('div');
        this._container.classList.add(Slider.SLIDER_CLASS);

        if (orientation == Orientation.Vertical) {
            this._container.classList.add(Slider.SLIDER_VERTICAL_CLASS);
        }

        this._parent.appendChild(this._container);

        
        this._fillBar = new FillBar(this._container, orientation);

        this._rangeMarkers = [];
        this._rangeMarkers.push(new Marker(this._container, this, 0));

        if (isRange) {
            this._rangeMarkers.push(new Marker(this._container, this, 1));
        }
        
    }

    update(orientation: Orientation, position: number, value: number, id: number) {
        if (orientation == Orientation.Horizontal) {
            this.updateHorizontalPosition(position, orientation, value, id);
        } else {
            this.updateVerticalPosition(position, orientation, value, id);
        }
        
    }
 
    showLabel() {
        this._marker.showLabel();
    }

    hideLabel() {
        this._marker.hideLabel();
    }

    changeOrientation(orientation: Orientation) {
        if (orientation == Orientation.Horizontal) {
            this.setHorizontal();
        }

        if (orientation == Orientation.Vertical) {
            this.setVertical();
        }
    }

    getOrientation(): Orientation {
        return this._orientation;
    }

    getSliderLength() :number {
        if (this._orientation == Orientation.Horizontal) {
            return this._container.getBoundingClientRect().width;
        }

        if (this._orientation == Orientation.Vertical) {
            return this._container.getBoundingClientRect().height;
        }

        return 0;
    }

    getX(): number {
        return this._container.getBoundingClientRect().left;
    }

    getY(): number {
        return this._container.getBoundingClientRect().top;
    }

    moveMarker(position: number, id: number) {
        this._controller.move(position, id);
    }

    private setHorizontal() {
        this._orientation = Orientation.Horizontal;
        this._container.classList.remove(Slider.SLIDER_VERTICAL_CLASS);
        for (let i = 0; i < this._rangeMarkers.length; i++) {
            this._rangeMarkers[i].setHorizontal();
        }
        
        this._fillBar.setHorizontal();
    }

    private setVertical() {
        this._orientation = Orientation.Vertical;
        this._container.classList.add(Slider.SLIDER_VERTICAL_CLASS);
        for (let i = 0; i < this._rangeMarkers.length; i++) {
            this._rangeMarkers[i].setVertical();
        }
        this._fillBar.setVertical();
    }

    private updateHorizontalPosition(position: number, orientation: Orientation, value: number, id: number) {
        let sliderLength: number = this._container.getBoundingClientRect().width - this._rangeMarkers[id].getWidht();
        position = position * sliderLength;
        this._rangeMarkers[id].setPositionX(position);
        this._rangeMarkers[id].setValue(value);
        
        if (this._rangeMarkers.length > 1) {
            let left: number = this._rangeMarkers[0].getCenterByX();
            let right: number = this._rangeMarkers[1].getCenterByX() - this._container.getBoundingClientRect().left;
            this._fillBar.update(left - this._container.getBoundingClientRect().left, this._container.getBoundingClientRect().width - right, orientation);
        } else {
            this._fillBar.update(0, this._container.getBoundingClientRect().width - position, orientation);
        }
    }

    private updateVerticalPosition(position: number, orientation: Orientation, value: number, id: number) {
        let sliderLength: number = this._container.getBoundingClientRect().height - this._rangeMarkers[id].getHeight();
        position = sliderLength - position * sliderLength;
        this._rangeMarkers[id].setPositionY(position);
        this._rangeMarkers[id].setValue(value);
        
        if (this._rangeMarkers.length > 1) {
            let bottom: number = this._rangeMarkers[0].getCenterByY();
            this._fillBar.update( this._container.getBoundingClientRect().bottom - bottom, position , orientation);
        } else {
            this._fillBar.update(0, position, orientation);
        }
        
    }

}