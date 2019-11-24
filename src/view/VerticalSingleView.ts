import { SingleView } from "./SingleView";
import { SlideController } from "../controller/SlideController";
import { Orientation } from "../model/Orientation";

export class VerticalSingleView extends SingleView {
    
    constructor(parent: HTMLElement, controller: SlideController, orientation: Orientation) {
        super(parent, controller, orientation);
        this._slider.classList.add('slider--vertical');
    }

    protected calculatePosition(event: any): number {
        return 1 - ((event.pageY - this._slider.getBoundingClientRect().top) / this._slider.clientHeight);
    }

    protected setFill(position: number): void {
        (this._fill as HTMLElement).style.height = position + 'px';
    }

    public update(position: number, value: number): void {
        position = 1 - position;
        let newPosition: number = this._slider.clientHeight * position - this._marker.clientHeight / 2;
        let sliderHeight: number = this._slider.getBoundingClientRect().height;
        let markerHeight: number = this._marker.getBoundingClientRect().height;
        console.log('new pos: ' + newPosition);
        if (newPosition > (sliderHeight - markerHeight)) {
            newPosition = sliderHeight - markerHeight;
        }
        if (newPosition < 0) {
            newPosition = 0;
        }
        (this._marker as HTMLElement).style.top = newPosition.toString() + 'px';
        this.setFill(newPosition);
    }

    

}