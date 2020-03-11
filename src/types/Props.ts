import Orientation from './Orientation';

export interface Props {
  min?: number;
  max?: number;
  low?: number;
  hight?: number;
  step?: number;
  orientation?: Orientation;
  isRange?: boolean;
  isTips?: boolean;
}
