import TipManager from '../../../src/plugin/View/Tip/TipManager';
import TipData from '../../../src/plugin/View/Tip/TipData';
import Orientation from '../../../src/plugin/Types/Orientation';

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
