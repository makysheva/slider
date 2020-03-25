/* eslint-disable no-param-reassign */
import IState from './IState';
import Orientation from '../Types/Orientation';

class Validator {
  public static validateMinMax(state: IState): { min: number, max: number } {
    const result = { min: state.min, max: state.max };
    if (state.min >= state.max) {
      result.min = Validator.default.min;
      result.max = Validator.default.max;
    }
    return result;
  }

  public static validateStep(state: IState): number {
    let { step } = state;
    if (step > state.max - state.min) {
      step = Validator.default.step;
    }
    return step;
  }

  public static validateValues(state: IState): number[] {
    let values = [state.values[0], state.values[1]];

    if (!state.isRange) {
      if (values[0] < state.min || values[0] > state.max) {
        values[0] = state.min;
      }
    }

    if (state.isRange) {
      if (values[0] < state.min) {
        values[0] = state.min;
      }

      if (values[1] > state.max) {
        values[1] = state.max;
      }

      if (values[0] >= values[1]) {
        values = [...Validator.default.values];
      }
    }

    return values;
  }

  private static default: IState = {
    isRange: false,
    isTips: true,
    max: 100,
    min: 0,
    orientation: Orientation.Horizontal,
    step: 1,
    values: [0, 100],
  };
}

export default Validator;
