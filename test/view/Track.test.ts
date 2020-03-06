import Track from '../../src/view/Track';
import Orientation from '../../src/types/Orientation';

describe('Track view class.', () => {
  beforeEach(() => { document.body.innerHTML = ''; });

  describe('Create method: ', () => {
    test('should return the instance of Track class', () => {
      expect(Track.create(document.body, Orientation.Horizontal)).not.toBeNull();
    });

    test('create horizontal slider should add slider__track_horizontal class', () => {
      Track.create(document.body, Orientation.Horizontal);
      expect(document.querySelectorAll('.slider__track_horizontal').length).toBe(1);
    });

    test('create vertical slider should add slider__track_vertical class', () => {
      Track.create(document.body, Orientation.Vertical);
      expect(document.querySelectorAll('.slider__track_vertical').length).toBe(1);
    });
  });
});
