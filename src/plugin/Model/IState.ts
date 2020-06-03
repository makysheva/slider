// eslint-disable-next-line no-unused-vars
import Orientation from '../Types/Orientation';

interface IState {
  min: number;
  max: number;
  step: number;
  isRange: boolean;
  isTips: boolean;
  orientation: Orientation;
  values: number[];
}

// eslint-disable-next-line no-undef
export default IState;
