import ScaleItem from './ScaleItem';
import Orientation from '../../../Types/Orientation';

let parent: HTMLElement;
let field: ScaleItem;

describe('Field class', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    parent = document.createElement('div');
    document.body.appendChild(parent);
    field = new ScaleItem(parent, 'field');
  });

  describe('Update method', () => {
    test('should set position in vertical orientation', () => {
      field.update({ value: '100', position: 10, orientation: Orientation.Vertical });
      const element = parent.firstElementChild as HTMLElement;
      expect(element.style.top).toBe('10px');
    });
  });

  describe('Click event', () => {
    test('should emit click event', () => {
      const handelClick = jest.fn();
      field.add('click', handelClick);
      const clickEvent = new MouseEvent('click');
      if (parent.firstElementChild) {
        parent.firstElementChild.dispatchEvent(clickEvent);
      }
      expect(handelClick).toHaveBeenCalled();
    });
  });
});
