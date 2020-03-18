import Orientation from './Orientation';

export interface IProps {
  min?: number;
  max?: number;
  low?: number;
  high?: number;
  step?: number;
  orientation?: Orientation;
  isRange?: boolean;
  isTips?: boolean;
}
