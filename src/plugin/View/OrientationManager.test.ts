import '@testing-library/jest-dom';
import OrientationManager from './OrientationManager';
import Orientation from '../Types/Orientation';

describe('OrientationManager class', () => {
  let element: HTMLElement;
  let manager: OrientationManager;

  beforeEach(() => {
    element = document.createElement('div');
    manager = new OrientationManager(element);
  });

  describe('getOrientationClass method', () => {
    test('should return class by orientation', () => {
      manager.addOrientationClass(Orientation.Horizontal, 'test_class');
      expect(manager.getOrientationClass(Orientation.Horizontal)).toBe('test_class');
    });
  });

  describe('setCurrentOrientation method', () => {
    test('should remove old class', () => {
      manager.addOrientationClass(Orientation.Horizontal, 'horizontal');
      manager.addOrientationClass(Orientation.Vertical, 'vertical');
      manager.setCurrentOrientation(Orientation.Horizontal);
      manager.setCurrentOrientation(Orientation.Vertical);
      expect(element).not.toHaveClass('horizontal');
    });

    test('should not change current orientation if passed orientation is not defined', () => {
      manager.addOrientationClass(Orientation.Horizontal, 'horizontal');
      manager.setCurrentOrientation(Orientation.Horizontal);
      manager.setCurrentOrientation(Orientation.Vertical);
      expect(element).not.toHaveClass('vertical');
    });

    test('should not change class if orientation is not change', () => {
      manager.addOrientationClass(Orientation.Horizontal, 'horizontal');
      manager.setCurrentOrientation(Orientation.Horizontal);
      manager.setCurrentOrientation(Orientation.Horizontal);
      expect(manager.getCurrentOrientation()).toBe(Orientation.Horizontal);
    });
  });
});
