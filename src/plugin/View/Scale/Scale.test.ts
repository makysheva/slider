import Controller from '../../Controller/Controller';
import Model from '../../Model/Model';

describe('MinMax class', () => {
  describe('Click event', () => {
    test('should call controller setPosition method', () => {
      const parent = document.createElement('div');
      const controller = new Controller(parent, new Model());
      const mockSetPosition = jest.fn();
      // controller.setPosition = mockSetPosition;
      const clickEvent = new MouseEvent('click');
      const fields = parent.querySelectorAll('.slider__range');
      fields.forEach((elem) => {
        elem.dispatchEvent(clickEvent);
      });
      expect(mockSetPosition).toHaveBeenCalledTimes(2);
    });
  });
});
