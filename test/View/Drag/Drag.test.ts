import Drag from '../../../src/plugin/View/Drag/Drag';

describe('Drag class', () => {
  let element: HTMLElement;
  let drag: Drag;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(element);
    drag = new Drag(element, 'elem');
  });

  describe('Drag event', () => {
    let mouseDown: MouseEvent;
    let mouseMove: MouseEvent;

    beforeEach(() => {
      mouseDown = new MouseEvent('mousedown');
      mouseMove = new MouseEvent('mousemove', { bubbles: true, clientX: 10 });
    });

    test('should emit drag event if user drag element', () => {
      const mock = jest.fn();
      drag.add('drag', mock);
      element.dispatchEvent(mouseDown);
      element.dispatchEvent(mouseMove);
      expect(mock).toHaveBeenCalled();
    });

    test('should remove listeners on mouseup event', () => {
      const mock = jest.fn();
      drag.add('drag', mock);
      const mouseUp = new MouseEvent('mouseup', { bubbles: true });
      element.dispatchEvent(mouseUp);
      expect(mock).not.toBeCalled();
    });
  });
});
