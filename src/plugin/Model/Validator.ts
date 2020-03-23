/* eslint-disable no-param-reassign */
import IState from './IState';
import Orientation from '../Types/Orientation';

class Validator {
  public static validate(state: IState) {
    Validator.validateMinMax(state);
    Validator.validateStep(state);
    Validator.validateValues(state);
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

  private static validateMinMax(state: IState) {
    if (state.min >= state.max) {
      state.min = Validator.default.min;
      state.max = Validator.default.max;
    }
  }

  private static validateStep(state: IState) {
    if (state.step > state.max - state.min) {
      state.step = Validator.default.step;
    }
  }

  private static validateValues(state: IState) {
    if (!state.isRange) {
      if (state.values[0] < state.min || state.values[0] > state.max) {
        state.values[0] = state.min;
      }
    }

    if (state.isRange) {
      if (state.values[0] < state.min) {
        state.values[0] = state.min;
      }

      if (state.values[1] > state.max) {
        state.values[1] = state.max;
      }

      if (state.values[0] >= state.values[1]) {
        state.values[0] = Validator.default.values[0];
        state.values[1] = Validator.default.values[1];
      }
    }
  }
}

export default Validator;
