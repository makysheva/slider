import Orientation from '../../Types/Orientation';

class TipData {
  public isRange: boolean;

  public orientation: Orientation;

  public low: IPoint;

  public high: IPoint;

  public isVisible: boolean;

  constructor(
    low: IPoint,
    high: IPoint,
    orientation: Orientation,
    isRange: boolean,
    isVisible: boolean,
  ) {
    this.isRange = isRange;
    this.orientation = orientation;
    this.low = { value: low.value, position: low.position };
    this.high = { value: high.value, position: high.position };
    this.isVisible = isVisible;
  }
}

interface IPoint { value: number, position: number }

export default TipData;
