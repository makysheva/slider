import Controller from '../../src/plugin/Controller/Controller';
import Model from '../../src/plugin/Model/Model';

let element: HTMLElement;
let model: Model;
let controller: Controller;
const updateView = jest.spyOn<any, any>(Controller.prototype, 'updateView');

describe('Controller class', () => {
  beforeEach(() => {
    element = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(element);
    model = new Model();
    controller = new Controller(element, model);
    updateView.mockClear();
  });

  describe('setPosition method', () => {
    test('should call model setPosition method', () => {
      model.setPosition = jest.fn();
      controller.setPosition(1);
      expect(model.setPosition).toHaveBeenCalled();
    });

    describe('setPointPosition method', () => {
      test('should call same model method', () => {
        model.setPointPosition = jest.fn();
        controller.setPointPosition(1, 0);
        expect(model.setPointPosition).toHaveBeenCalled();
      });

      test('should call updateView', () => {
        controller.setPointPosition(1, 0);
        expect(updateView).toHaveBeenCalled();
      });
    });

    describe('Resize window event', () => {
      test('should call updateView method', () => {
        window.dispatchEvent(new Event('resize'));
        expect(updateView).toHaveBeenCalled();
      });
    });
  });
});
