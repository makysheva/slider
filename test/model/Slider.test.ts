import Slider from '../../src/model/Slider';
import Orientation from '../../src/types/Orientation';

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

    test('should return default hight value in range slider', () => {
      expect(slider.getValue(1)).toBe(100);
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

    test('should set low value less then hight value in range slider', () => {
      slider.setRange(true);
      slider.setMax(200);
      slider.setValue(101);
      expect(slider.getValue()).toBe(99);
    });

    test('should set hight value less them max or equal', () => {
      slider.setRange(true);
      slider.setMax(120);
      slider.setValue(121, 1);
      expect(slider.getValue(1)).toBe(120);
    });

    test('if hight value less then low, should set hight value greater', () => {
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

    test('should set correct hight value by position in range slider', () => {
      slider.setRange(true);
      slider.setPointPosition(0.5);
      slider.setPointPosition(0.4, 1);
      expect(slider.getValue(1)).toBe(51);
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

    test('if value greater then hight, then hight should be set in range slider', () => {
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

    test('should set correct hight value in range slider', () => {
      slider.setRange(true);
      slider.setPosition(0.51);
      expect(slider.getValue(1)).toBe(51);
    });

    test('if position == 1 in single slider, should set value to max', () => {
      slider.setStep(80);
      slider.setPosition(1);
      expect(slider.getValue()).toBe(100);
    });

    test('if position == 1 in range slider, should set hight value to max', () => {
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

    test('set range should set hight pointer to max', () => {
      slider.setMax(200);
      slider.setValue(199);
      slider.setRange(true);
      expect(slider.getValue(1)).toBe(200);
    });

    test('set range should set low pointer to (max - step), if low pointer == max', () => {
      slider.setMax(200);
      slider.setValue(200);
      slider.setRange(true);
      expect(slider.getValue()).toBe(199);
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
  });
});
