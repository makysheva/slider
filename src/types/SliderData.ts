import Orientation from './Orientation';
import Slider from '../model/Slider';

class SliderData {
  public orientation: Orientation;

  public lowPointer: { value: number, position: number };

  public hightPointer: { value: number, position: number };

  public isRange: boolean;

  public isVisibleTooltip: boolean;


  constructor(model: Slider) {
    this.orientation = model.getOrientation();
    this.lowPointer = {
      position: model.getPointPosition(),
      value: model.getValue(),
    };
    this.hightPointer = {
      position: model.getPointPosition(1),
      value: model.getValue(1),
    };
    this.isRange = model.getRange();
    this.isVisibleTooltip = model.getTooltipVisibility();
  }
}

export default SliderData;
