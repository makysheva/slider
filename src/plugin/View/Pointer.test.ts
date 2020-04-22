import Pointer from './Pointer';
import Orientation from '../Types/Orientation';

describe('Pointer class', () => {
  let pointer: Pointer;
  let parent: HTMLElement;

  beforeEach(() => {
    parent = document.createElement('div');
    pointer = new Pointer(parent, 'low');
    document.body.innerHTML = '';
    document.body.appendChild(parent);
  });

  describe('Update method', () => {
    test('should set style left in horizontal orientation', () => {
      pointer.update(100, Orientation.Horizontal);
      expect((parent.firstElementChild as HTMLElement).style.left).toBe('100px');
    });

    test('should set style top in vertical orientation', () => {
      pointer.update(50, Orientation.Vertical);
      expect((parent.firstElementChild as HTMLElement).style.top).toBe('50px');
    });
  });

  describe('Destroy method', () => {
    test('should remove element from parent', () => {
      pointer.destroy();
      expect(parent.children.length).toBe(0);
    });
  });

  describe('Drag event', () => {
    test('should emit drag event', () => {
      const mouseDownEvent = new MouseEvent('mousedown');
      const mouseDragEvent = new MouseEvent('mousemove', { bubbles: true, clientX: 100});
      const callback = jest.fn();
      pointer.add('drag', callback);
      const element = parent.firstElementChild;
      if (element) {
        element.dispatchEvent(mouseDownEvent);
        element.dispatchEvent(mouseDragEvent);
      }
      expect(callback).toHaveBeenCalled();
    });
  });
});
