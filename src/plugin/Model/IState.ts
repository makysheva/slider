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

export default IState;
