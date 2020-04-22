import Observer from './Observer';

describe('Observer class', () => {
  let observer: Observer;

  beforeEach(() => { observer = new Observer(); });

  describe('Add/emit methods', () => {
    test('should set function and event name', () => {
      const mock = jest.fn();
      observer.add('test', mock);
      observer.add('test', mock);
      observer.emit('test');
      expect(mock.mock.calls.length).toBe(2);
    });
  });
});
