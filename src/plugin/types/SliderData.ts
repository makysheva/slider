import Slider from '../model/Slider';
import Orientation from './Orientation';

class SliderData {
  public orientation: Orientation;

  public lowPointer: { value: number, position: number };

  public highPointer: { value: number, position: number };

  public isRange: boolean;

  public isVisibleTooltip: boolean;

  public min: number;

  public max: number;

  constructor(model: Slider) {
    this.init(model);
  }

  private init(model: Slider) {
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
