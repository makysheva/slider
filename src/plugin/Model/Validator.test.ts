import Validator from './Validator';
// eslint-disable-next-line no-unused-vars
import IState from './IState';
import Orientation from '../Types/Orientation';

describe('Validator class tests', () => {
  describe('validate method', () => {
    let state: IState;

    beforeEach(() => {
      state = {
        isRange: false,
        isTips: true,
        max: 100,
        min: 0,
        orientation: Orientation.Horizontal,
        step: 1,
        values: [0, 100],
      };
    });

    test('min should less then max', () => {
      state.min = 100;
      const { min } = Validator.validateMinMax(state);
      expect(min).toBe(0);
    });

    test('step should less or equal to range', () => {
      state.step = 101;
      const step = Validator.validateStep(state);
      expect(step).toBe(1);
    });

    test('value in single slider should be between min and max', () => {
      state.isRange = false;
      state.values[0] = 101;
      const values = Validator.validateValues(state);
      expect(values[0]).toBe(0);
    });

    test('low value in range slider should be greater or equal min', () => {
      state.isRange = true;
      state.values[0] = -1;
      const values = Validator.validateValues(state);
      expect(values[0]).toBe(0);
    });

    test('high value in range slider should be less then max', () => {
      state.isRange = true;
      state.values[1] = 101;
      const values = Validator.validateValues(state);
      expect(values[1]).toBe(100);
    });

    test('low value in range slider should less then high', () => {
      state.isRange = true;
      state.values[1] = 50;
      state.values[0] = 51;
      const values = Validator.validateValues(state);
      expect(values[0]).toBe(0);
    });

    test('high value in range slider should be greater then low', () => {
      state.isRange = true;
      state.values[0] = 50;
      state.values[1] = 49;
      const values = Validator.validateValues(state);
      expect(values[1]).toBe(100);
    });

    test('should set low value to min if this value out of range min|max', () => {
      state.isRange = false;
      state.values[0] = 5;
      const values = Validator.validateValues(state);
      expect(values[0]).toBe(5);
    });
  });
});
