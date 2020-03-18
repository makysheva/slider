import Model from '../Model/Model';
import Orientation from './Orientation';

class SliderData {
  public orientation: Orientation;

  public lowPointer: { value: number, position: number };

  public highPointer: { value: number, position: number };

  public isRange: boolean;

  public isVisibleTooltip: boolean;

  public min: number;

  public max: number;

  constructor(model: Model) {
    this.init(model);
  }

  private init(model: Model) {
    this.orientation = model.getOrientation();
    this.lowPointer = {
      position: model.getPointPosition(),
      value: model.getValue(),
    };
    this.highPointer = {
      position: model.getPointPosition(1),
      value: model.getValue(1),
    };
    this.isRange = model.getRange();
    this.isVisibleTooltip = model.getTooltipVisibility();
    this.min = model.getMin();
    this.max = model.getMax();
  }
}

export default SliderData;
