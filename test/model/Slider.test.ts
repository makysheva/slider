import Slider from '../../src/model/Slider';
import Orientation from '../../src/types/Orientation';

describe('Slider model.', () => {
  let slider: Slider;

  beforeEach(() => { slider = new Slider(); });

  describe('Min and max methods:', () => {
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

    test('change min should set low value to min value', () => {
      const low: number = 20;
      slider.setMin(low);
      expect(slider.getValue()).toBe(low);
    });

    test('change min should set hight value to min value + step, if it less', () => {
      const low: number = 50;
      slider.setRange(true);
      slider.setValue(20, 1);
      slider.setMin(low);
      expect(slider.getValue(1)).toBe(low + slider.getStep());
    });

    test('change max should set value to max', () => {
      const max: number = 60;
      slider.setValue(70);
      slider.setMax(max);
      expect(slider.getValue()).toBe(max);
    });

    test('change max in range should set low value to max - step', () => {
      const max: number = 50;
      slider.setRange(true);
      slider.setValue(70);
      slider.setMax(max);
      expect(slider.getValue()).toBe(max - slider.getStep());
    });
  });

  describe('Get/set range methods', () => {
    test('Range default value should be false', () => {
      expect(slider.getRange()).toBe(false);
    });

    test('setRange should be set', () => {
      const isRange: boolean = true;
      slider.setRange(isRange);
      expect(slider.getRange()).toBe(true);
    });
  });

  describe('Get/set orientation methods', () => {
    test('default orientation value should be horizontal', () => {
      expect(slider.getOrientation()).toBe(Orientation.Horizontal);
    });

    test('set should be right', () => {
      slider.setOrientation(Orientation.Vertical);
      expect(slider.getOrientation()).toBe(Orientation.Vertical);
    });
  });

  describe('Step methods', () => {
    test('get should be default value equal 1', () => {
      expect(slider.getStep()).toBe(1);
    });

    test('should be set value', () => {
      const step: number = 2;
      slider.setStep(step);
      expect(slider.getStep()).toBe(step);
    });

    test('step should not be greater then half range', () => {
      let step: number = 51;
      const defaultStep: number = 1;
      slider.setStep(step);
      expect(slider.getStep()).toBe(defaultStep);
      step = 50;
      slider.setStep(step);
      expect(slider.getStep()).toBe(step);
      slider.setMin(20);
      slider.setMax(70);
      step = 45;
      slider.setStep(step);
      expect(slider.getStep()).toBe(step);
    });

    test('step should not be negative or zero', () => {
      let step: number = 0;
      const defaultStep: number = 1;
      slider.setStep(step);
      expect(slider.getStep()).toBe(defaultStep);
      step = -1;
      slider.setStep(step);
      expect(slider.getStep()).toBe(defaultStep);
    });
  });

  describe('Get/set value', () => {
    test('getValue should return default values', () => {
      expect(slider.getValue()).toBe(0);
      expect(slider.getValue(1)).toBe(100);
    });

    test('single slider should set right value', () => {
      const value: number = 40;
      slider.setValue(value);
      expect(slider.getValue()).toBe(value);
    });

    test('setValue should set right value', () => {
      const low: number = 10;
      const hight: number = 90;
      slider.setRange(true);
      slider.setValue(low);
      slider.setValue(hight, 1);
      expect(slider.getValue()).toBe(low);
      expect(slider.getValue(1)).toBe(hight);
    });

    test('values must be in the range', () => {
      const low: number = -1;
      const hight: number = 101;
      slider.setRange(true);
      slider.setValue(low);
      slider.setValue(hight, 1);
      expect(slider.getValue()).toBe(0);
      expect(slider.getValue(1)).toBe(100);
    });

    test('single slider should not be set hight value', () => {
      const hight: number = 80;
      slider.setValue(hight, 1);
      expect(slider.getValue(1)).toBe(100);
    });

    test('low value should be less them hight value', () => {
      const low: number = 50;
      const hight: number = 50;
      slider.setRange(true);
      slider.setValue(hight, 1);
      slider.setValue(low);
      expect(slider.getValue()).toBe(0);
    });

    test('hight value should be greater then low value', () => {
      const low: number = 50;
      const hight: number = 50;
      slider.setRange(true);
      slider.setValue(low);
      slider.setValue(hight, 1);
      expect(slider.getValue(1)).toBe(100);
    });
  });

  describe('Get/set slider position', () => {
    test('setPosition should set valid value', () => {
      const position: number = 0.5;
      slider.setPosition(position);
      expect(slider.getValue()).toBe(50);
      slider.setMin(20);
      slider.setMax(70);
      slider.setPosition(position);
      expect(slider.getValue()).toBe(45);
    });

    test('setPosition should be between 0-1', () => {
      slider.setPosition(-1);
      expect(slider.getValue()).toBe(0);
      slider.setPosition(2);
      expect(slider.getValue()).toBe(100);
    });

    test('getPosition should return relative value of single slider', () => {
      slider.setValue(50);
      expect(slider.getPosition()).toBe(0.5);
    });

    test('getPosition should return relative value of range slider', () => {
      slider.setRange(true);
      slider.setValue(40, 1);
      expect(slider.getPosition(1)).toBe(0.4);
    });
  });
});
