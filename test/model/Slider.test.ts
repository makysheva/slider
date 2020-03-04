import Slider from '../../src/model/Slider';

describe('Slider model.', () => {
  describe('Min and max methods:', () => {
    let slider: Slider;

    beforeEach(() => { slider = new Slider(); });

    test('getMin - check default value', () => {
      expect(slider.getMin()).toBe(0);
    });

    test('setMin should be set', () => {
      const value: number = 5;
      slider.setMin(value);
      expect(slider.getMin()).toBe(value);
    });

    test('min value not be equal or great then max value', () => {
      let value = 100;
      slider.setMin(value);
      expect(slider.getMin()).toBe(0);

      value = 101;
      slider.setMin(value);
      expect(slider.getMin()).toBe(0);
    });

    test('max should be default set value', () => {
      expect(slider.getMax()).toBe(100);
    });

    test('setMax should be set', () => {
      const value = 50;
      slider.setMax(value);
      expect(slider.getMax()).toBe(value);
    });

    test('setMax should not be equal or less them min value', () => {
      let value = 0;
      slider.setMax(value);
      expect(slider.getMax()).toBe(100);

      value = -1;
      slider.setMax(value);
      expect(slider.getMax()).toBe(100);
    });
  });

  describe('Get/set range methods', () => {
    let slider: Slider;

    beforeEach(() => { slider = new Slider(); });

    test('Range default value should be false', () => {
      expect(slider.getRange()).toBe(false);
    });

    test('setRange should be set', () => {
      const isRange: boolean = true;
      slider.setRange(isRange);
      expect(slider.getRange()).toBe(true);
    });
  });
});
