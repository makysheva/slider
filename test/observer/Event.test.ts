import Event from '../../src/plugin/observer/Event';

describe('Event class', () => {
  let event: Event;

  beforeEach(() => { event = new Event('test'); });

  describe('Add method', () => {
    test('should add function', () => {
      const fn = jest.fn();
      expect(event.add(fn)).toBe(true);
    });

    test('should not add function if it been added', () => {
      const fn = jest.fn();
      event.add(fn);
      expect(event.add(fn)).toBe(false);
    });
  });

  describe('Remove method', () => {
    test('should remove function', () => {
      const fn = jest.fn();
      event.add(fn);
      event.emit(null);
      event.remove(fn);
      event.emit(null);
      expect(fn.mock.calls.length).toBe(1);
    });
  });

  describe('GetType method', () => {
    test('should return name of event', () => {
      expect(event.getType()).toBe('test');
    });
  });
});
