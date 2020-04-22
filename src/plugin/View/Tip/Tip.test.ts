import '@testing-library/jest-dom';
import Tip from './Tip';

let parent: HTMLElement;
let tip: Tip;

describe('Tip class', () => {
  beforeEach(() => {
    parent = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(parent);
    tip = new Tip(parent, 'tip');
  });
  describe('Destroy method', () => {
    test('should remove tip from parent', () => {
      tip.destroy();
      expect(parent.querySelectorAll('.slider__tip').length).toBe(0);
    });
  });
});
