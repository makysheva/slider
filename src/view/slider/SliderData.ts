import { Orientation } from "../../model/Orientation";

interface SliderData {
  orientation: Orientation;
  position: number;
  value: number;
  min: number;
  max: number;
  markerId: number;
}

export default SliderData;
