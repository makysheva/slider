import 'mocha';
import { expect } from 'chai';
import { SliderModel } from '../../src/model/SliderModel';

describe('Tests for SliderModel class', function() {
    describe('check correct initialization model', function() {
        let model: SliderModel = new SliderModel({
            min: 200,
            max: 20,
            step: 10,
            value: 5
        });

        it('max value should be more then min value', function() {
            expect(model.max).to.equal(200);
        });

        it('min value should be less then man value', function () {
            expect(model.min).to.equal(20);
        });
    });
});