import { SliderModel } from "../model/SliderModel";
import { Options } from "../model/Options";
import { SliderView } from "../view/SliderView";

export class SlideController {
    private _model: SliderModel;
    private _view: SliderView;

    constructor(container:HTMLElement, props: Options) {
        this._model = new SliderModel(props);
        this._view = new SliderView(container);
    }

    onMove(position: number) {
        this._model.position = position;
        this._view.setPosition(this._model.position);
        // emmit onChange event
    }

    onMoveRange(positions: number[]) {
        this._model.positions = positions;
        this._view.setPositions(this._model.positions);
        // emmit onChange event
    }
}