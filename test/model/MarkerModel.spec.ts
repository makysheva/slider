import 'mocha';
import { expect } from 'chai';

import { MarkerModel } from '../../src/model/MarkerModel';
import { SliderModel } from '../../src/model/SliderModel';

describe('Tests for MarkerModel class.', function () {
  describe('#set value getter', function () {
    let slider: SliderModel = new SliderModel({ min: 100, max: 500 });
    it('calculate right position by value', function () {
      let marker: MarkerModel = new MarkerModel(slider, 300);
      expect(marker.position).to.equal(.5);
    });
  });
});
