import Slider from '../../src/plugin/Model/Model';
import Orientation from '../../src/plugin/types/Orientation';
import Model from '../../src/plugin/Model/Model';

describe('Slider class', () => {
  let slider: Slider;

  beforeEach(() => { slider = new Slider(); });

  describe('GetValue method', () => {
    test('should return default value in single slider', () => {
      expect(slider.getValue()).toBe(0);
    });

    test('should return default low value in range slider', () => {
      expect(slider.getValue(0)).toBe(0);
    });

    test('should return default high value in range slider', () => {
      expect(slider.getValue(1)).toBe(100);
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
      slider.setMin(min);
      slider.setValue(-1);
      expect(slider.getValue()).toBe(min);
    });

    test('should set value to max if value greater then max in single slider', () => {
      const max = 50;
      slider.setMax(max);
      slider.setValue(51);
      expect(slider.getValue()).toBe(max);
    });

    test('should set value with right step in single slider', () => {
      slider.setMin(20);
      slider.setMax(60);
      slider.setStep(4);
      slider.setValue(23);
      expect(slider.getValue()).toBe(24);
    });

    test('should set low value less then high value in range slider', () => {
      slider.setRange(true);
      slider.setMax(200);
      slider.setValue(101);
      expect(slider.getValue()).toBe(99);
    });

    test('should set high value less them max or equal', () => {
      slider.setRange(true);
      slider.setMax(120);
      slider.setValue(121, 1);
      expect(slider.getValue(1)).toBe(120);
    });

    test('if high value less then low, should set high value greater', () => {
      slider.setRange(true);
      slider.setValue(40);
      slider.setValue(39, 1);
      expect(slider.getValue(1)).toBe(41);
    });
  });

  describe('GetPointPosition method', () => {
    test('should get current position', () => {
      slider.setMin(20);
      slider.setMax(50);
      slider.setValue(35);
      expect(slider.getPointPosition()).toBe(0.5);
    });
  });

  describe('SetPointPosition method', () => {
    test('should set correct value by position in single slider', () => {
      slider.setMin(20);
      slider.setPointPosition(0.4);
      expect(slider.getValue()).toBe(52);
    });

    test('should set correct low value by position in range slider', () => {
      slider.setRange(true);
      slider.setPointPosition(0.5);
      expect(slider.getValue()).toBe(50);
    });

    test('should set correct high value by position in range slider', () => {
      slider.setRange(true);
      slider.setPointPosition(0.5);
      slider.setPointPosition(0.4, 1);
      expect(slider.getValue(1)).toBe(51);
    });

    test('should set max if value equal or greater then 1', () => {
      slider.setPointPosition(1.1);
      expect(slider.getPointPosition()).toBe(1);
    });
  });

  describe('SetPosition method', () => {
    test('should set correct value in single slider', () => {
      slider.setMin(10);
      slider.setMax(50);
      slider.setPosition(0.5);
      expect(slider.getValue()).toBe(30);
    });

    test('if value less then low, then low should be set in range slider', () => {
      slider.setRange(true);
      slider.setPointPosition(0.5);
      slider.setPosition(0.2);
      expect(slider.getValue()).toBe(20);
    });

    test('if value greater then high, then high should be set in range slider', () => {
      slider.setRange(true);
      slider.setPointPosition(0.5, 1);
      slider.setPosition(0.8);
      expect(slider.getValue(1)).toBe(80);
    });

    test('should set correct low value in range slider', () => {
      slider.setRange(true);
      slider.setPosition(0.4);
      expect(slider.getValue()).toBe(40);
    });

    test('should set correct high value in range slider', () => {
      slider.setRange(true);
      slider.setPosition(0.51);
      expect(slider.getValue(1)).toBe(51);
    });

    test('if position == 1 in single slider, should set value to max', () => {
      slider.setStep(80);
      slider.setPosition(1);
      expect(slider.getValue()).toBe(100);
    });

    test('if position == 1 in range slider, should set high value to max', () => {
      slider.setRange(true);
      slider.setStep(33);
      slider.setPosition(1);
      expect(slider.getValue(1)).toBe(100);
    });
  });

  describe('Get/set range methods', () => {
    test('getRange method should return true in range slider', () => {
      slider.setRange(true);
      expect(slider.getRange()).toBe(true);
    });

    test('set range should set high pointer greater then low', () => {
      slider.setMax(200);
      slider.setValue(100);
      slider.setRange(true);
      expect(slider.getValue(1)).toBe(101);
    });

    test('set range should set low pointer to (max - step), if low pointer == max', () => {
      slider.setMax(200);
      slider.setValue(200);
      slider.setRange(true);
      expect(slider.getValue()).toBe(199);
    });

    test('if low value equal max, should set it to max-step', () => {
      slider.setRange(false);
      slider.setValue(100);
      slider.setRange(true);
      expect(slider.getValue(0)).toBe(99);
    });
  });

  describe('Get/set step methods', () => {
    test('getStep should return current step', () => {
      slider.setStep(10);
      expect(slider.getStep()).toBe(10);
    });

    test('setStep should recalculate value in single slider', () => {
      slider.setValue(7);
      slider.setStep(4);
      expect(slider.getValue()).toBe(8);
    });

    test('setStep should recalculate low value in range slider', () => {
      slider.setRange(true);
      slider.setValue(43, 1);
      slider.setStep(5);
      expect(slider.getValue(1)).toBe(45);
    });

    test('should not set step if not valid', () => {
      slider.setStep(200);
      expect(slider.getStep()).toBe(1);
    });
  });

  describe('Get/Set min value', () => {
    test('if value less then min should set value to min in range slider', () => {
      slider.setMin(50);
      expect(slider.getValue()).toBe(50);
    });

    test('should set low value in range slider to min if min less then low', () => {
      slider.setRange(true);
      slider.setValue(49, 1);
      slider.setMin(50);
      expect(slider.getValue()).toBe(50);
    });

    test('getMin method should return current min value', () => {
      slider.setMin(35);
      expect(slider.getMin()).toBe(35);
    });

    test('should not set min if passed value equal or greater then state.max', () => {
      slider.setMin(120);
      expect(slider.getMin()).toBe(0);
    });
  });

  describe('Get/Set max value', () => {
    test('getMax method should return current max value', () => {
      expect(slider.getMax()).toBe(100);
    });

    test('should not set max value if passed max equal or less than state.min', () => {
      slider.setMax(0);
      expect(slider.getMax()).toBe(100);
    });
  });

  describe('Get/Set orientation methods', () => {
    test('get method should return orientation', () => {
      expect(slider.getOrientation()).toBe(Orientation.Horizontal);
    });

    test('set method should set passed orientation', () => {
      slider.setOrientation(Orientation.Vertical);
      expect(slider.getOrientation()).toBe(Orientation.Vertical);
    });
  });

  describe('SetTooltipVisibility method', () => {
    test('should set true', () => {
      slider.setTooltipVisibility(true);
      expect(slider.getTooltipVisibility()).toBe(true);
    });
  });
});
