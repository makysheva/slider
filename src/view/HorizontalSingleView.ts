import { SingleView } from "./SingleView";
import { SlideController } from "../controller/SlideController";

export class HorizontalSingleView extends SingleView {

    protected calculatePosition(event: any): number {
        return (event.pageX - this._slider.getBoundingClientRect().left) / this._slider.clientWidth;
    }

    protected setFill(position: number): void {
        (this._fill as HTMLElement).style.width = position + 'px';
    }

    public update(position: number, value: number): void {
        let newPosition: number = this._slider.clientWidth * position;
        let sliderWidth: number = this._slider.getBoundingClientRect().width;
        let markerWidth: number = this._marker.getBoundingClientRect().width;
        if (newPosition > (sliderWidth - markerWidth)) {
            newPosition = sliderWidth - markerWidth;
        }
        (this._marker as HTMLElement).style.left = newPosition.toString() + 'px';
        this.setFill(newPosition);
        this.setLabelPosition(newPosition);
        this._label.setValue(value);
    }

    private setLabelPosition(position: number) {
        let markerPivot: number = this._marker.getBoundingClientRect().width / 2;
        let labelPivot: number = this._label.getWidth() / 2;
        let pos: number = position + markerPivot - labelPivot;
        this._label.setPosition(pos);
    }

    
}