import '@testing-library/jest-dom';
import Fill from './Fill';
import Orientation from '../Types/Orientation';

describe('Fill class', () => {
  let div: HTMLElement;
  let fill: Fill;

  beforeEach(() => {
    div = document.createElement('div');
    fill = new Fill(div);
  });

  describe('Constructor', () => {
    test('should create slider__fill class', () => {
      expect(div.firstChild).toHaveClass('slider__fill');
    });
  });

  describe('Update method', () => {
    test('should set left/right positions in Horizontal slider', () => {
      fill.update({ low: 10, high: 100, orientation: Orientation.Horizontal });
      const elementStyle = (div.firstElementChild as HTMLElement).style;
      expect(elementStyle.left).toBe('10%');
      expect(elementStyle.right).toBe('100%');
    });

    test('should set top/bottom positions in Vertical slider', () => {
      fill.update({ low: 10, high: 100, orientation: Orientation.Vertical });
      const elementStyle = (div.firstElementChild as HTMLElement).style;
      expect(elementStyle.bottom).toBe('10%');
      expect(elementStyle.top).toBe('100%');
    });
  });
});
