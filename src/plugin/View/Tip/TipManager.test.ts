import TipManager from './TipManager';
import TipData from './TipData';
import Orientation from '../../Types/Orientation';

let manager: TipManager;
let parent: HTMLElement;

describe('TipManager class', () => {
  beforeEach(() => {
    parent = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    manager = new TipManager(parent);
  });

  describe('update method', () => {
    test('if visible is false, should hide tips', () => {
      const data = new TipData(
        { value: 0, position: 0 },
        { value: 100, position: 1 },
        Orientation.Horizontal,
        true,
        false,
      );
      manager.update(data);
      expect(parent.querySelectorAll('.slider__tip').length).toBe(0);
    });
  });
});
