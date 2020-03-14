import Orientation from './Orientation';

export interface IProps {
  min?: number;
  max?: number;
  low?: number;
  hight?: number;
  step?: number;
  orientation?: Orientation;
  isRange?: boolean;
  isTips?: boolean;
}
