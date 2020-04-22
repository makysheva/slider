import Orientation from '../types/Orientation';
import Model from './Model';

describe('Model class', () => {
  let model: Model;

  beforeEach(() => { model = new Model(); });

  describe('GetValue method', () => {
    test('should return default value in single slider', () => {
      expect(model.getValue()).toBe(0);
    });

    test('should return default low value in range slider', () => {
      expect(model.getValue(0)).toBe(0);
    });

    test('should return default high value in range slider', () => {
      expect(model.getValue(1)).toBe(100);
    });
  });

  describe('getState method', () => {
    test('should return current state', () => {
      const state = {
        isRange: true,
        isTips: true,
        max: 100,
        min: 20,
        orientation: Orientation.Horizontal,
        step: 1,
        values: [40, 50],
      };
      const model = new Model(state);

      expect(model.getState()).toEqual(state);
    });
  });

  describe('SetValue method', () => {
    test('should set value to min if value less then min in single slider', () => {
      const min = 10;
      model.setMin(min);
      model.setValue(-1);
      expect(model.getValue()).toBe(min);
    });

    test('should set value to max if value greater then max in single slider', () => {
      const max = 50;
      model.setMax(max);
      model.setValue(51);
      expect(model.getValue()).toBe(max);
    });

    test('should set value with right step in single slider', () => {
      model.setMin(20);
      model.setMax(60);
      model.setStep(4);
      model.setValue(23);
      expect(model.getValue()).toBe(24);
    });

    test('should set low value less then high value in range slider', () => {
      model.setRange(true);
      model.setMax(200);
      model.setValue(101);
      expect(model.getValue()).toBe(99);
    });

    test('should set high value less them max or equal', () => {
      model.setRange(true);
      model.setMax(120);
      model.setValue(121, 1);
      expect(model.getValue(1)).toBe(120);
    });

    test('if high value less then low, should set high value greater', () => {
      model.setRange(true);
      model.setValue(40);
      model.setValue(39, 1);
      expect(model.getValue(1)).toBe(41);
    });
  });

  describe('GetPointPosition method', () => {
    test('should get current position', () => {
      model.setMin(20);
      model.setMax(50);
      model.setValue(35);
      expect(model.getPointPosition()).toBe(0.5);
    });
  });

  describe('SetPointPosition method', () => {
    test('should set correct value by position in single slider', () => {
      model.setMin(20);
      model.setPointPosition(0.4);
      expect(model.getValue()).toBe(52);
    });

    test('should set correct low value by position in range slider', () => {
      model.setRange(true);
      model.setPointPosition(0.5);
      expect(model.getValue()).toBe(50);
    });

    test('should set correct high value by position in range slider', () => {
      model.setRange(true);
      model.setPointPosition(0.5);
      model.setPointPosition(0.4, 1);
      expect(model.getValue(1)).toBe(51);
    });

    test('should set max if value equal or greater then 1', () => {
      model.setPointPosition(1.1);
      expect(model.getPointPosition()).toBe(1);
    });
  });

  describe('SetPosition method', () => {
    test('should set correct value in single slider', () => {
      model.setMin(10);
      model.setMax(50);
      model.setPosition(0.5);
      expect(model.getValue()).toBe(30);
    });

    test('if value less then low, then low should be set in range slider', () => {
      model.setRange(true);
      model.setPointPosition(0.5);
      model.setPosition(0.2);
      expect(model.getValue()).toBe(20);
    });

    test('if value greater then high, then high should be set in range slider', () => {
      model.setRange(true);
      model.setPointPosition(0.5, 1);
      model.setPosition(0.8);
      expect(model.getValue(1)).toBe(80);
    });

    test('should set correct low value in range slider', () => {
      model.setRange(true);
      model.setPosition(0.4);
      expect(model.getValue()).toBe(40);
    });

    test('should set correct high value in range slider', () => {
      model.setRange(true);
      model.setPosition(0.51);
      expect(model.getValue(1)).toBe(51);
    });

    test('if position == 1 in single slider, should set value to max', () => {
      model.setStep(80);
      model.setPosition(1);
      expect(model.getValue()).toBe(100);
    });

    test('if position == 1 in range slider, should set high value to max', () => {
      model.setRange(true);
      model.setStep(33);
      model.setPosition(1);
      expect(model.getValue(1)).toBe(100);
    });
  });

  describe('Get/set range methods', () => {
    test('getRange method should return true in range slider', () => {
      model.setRange(true);
      expect(model.getRange()).toBe(true);
    });

    test('set range should set high pointer greater then low', () => {
      model.setMax(200);
      model.setValue(100);
      model.setRange(true);
      expect(model.getValue(1)).toBe(101);
    });

    test('set range should set low pointer to (max - step), if low pointer == max', () => {
      model.setMax(200);
      model.setValue(200);
      model.setRange(true);
      expect(model.getValue()).toBe(199);
    });

    test('if low value equal max, should set it to max-step', () => {
      model.setRange(false);
      model.setValue(100);
      model.setRange(true);
      expect(model.getValue(0)).toBe(99);
    });
  });

  describe('Get/set step methods', () => {
    test('getStep should return current step', () => {
      model.setStep(10);
      expect(model.getStep()).toBe(10);
    });

    test('setStep should recalculate value in single slider', () => {
      model.setValue(7);
      model.setStep(4);
      expect(model.getValue()).toBe(8);
    });

    test('setStep should recalculate low value in range slider', () => {
      model.setRange(true);
      model.setValue(43, 1);
      model.setStep(5);
      expect(model.getValue(1)).toBe(45);
    });

    test('should not set step if not valid', () => {
      model.setStep(200);
      expect(model.getStep()).toBe(1);
    });
  });

  describe('Get/Set min value', () => {
    test('if value less then min should set value to min in range slider', () => {
      model.setMin(50);
      expect(model.getValue()).toBe(50);
    });

    test('should set low value in range slider to min if min less then low', () => {
      model.setRange(true);
      model.setValue(49, 1);
      model.setMin(50);
      expect(model.getValue()).toBe(50);
    });

    test('getMin method should return current min value', () => {
      model.setMin(35);
      expect(model.getMin()).toBe(35);
    });

    test('should not set min if passed value equal or greater then state.max', () => {
      model.setMin(120);
      expect(model.getMin()).toBe(0);
    });
  });

  describe('Get/Set max value', () => {
    test('getMax method should return current max value', () => {
      expect(model.getMax()).toBe(100);
    });

    test('should not set max value if passed max equal or less than state.min', () => {
      model.setMax(0);
      expect(model.getMax()).toBe(100);
    });
  });

  describe('Get/Set orientation methods', () => {
    test('get method should return orientation', () => {
      expect(model.getOrientation()).toBe(Orientation.Horizontal);
    });

    test('set method should set passed orientation', () => {
      model.setOrientation(Orientation.Vertical);
      expect(model.getOrientation()).toBe(Orientation.Vertical);
    });
  });

  describe('SetTooltipVisibility method', () => {
    test('should set true', () => {
      model.setTooltipVisibility(true);
      expect(model.getTooltipVisibility()).toBe(true);
    });
  });
});
