import 'mocha';
import { expect, assert } from 'chai';
import { SliderModel } from '../../src/model/SliderModel';

describe('Tests for SliderModel class', function() {
    describe('#set/get minMax', function() {
        let model: SliderModel = new SliderModel({});

        it('if min value more or equal max value, to throw Error', function() {
            expect(() => model.minMax = [200, 10]).to.throw();
        });

        it('set minMax shoud be correct', function() {
            model.minMax = [100, 500];
            expect(model.minMax).to.eql([100, 500]);
        });
        
    });

    describe('#set value', function() {
        let model: SliderModel = new SliderModel({});

        it('if set value more or less then min/max, to throw Error', function () {
            expect(() => model.value = 300).to.throw();
        });
    });

    describe('#get/set step', function() {
        let model: SliderModel = new SliderModel({
            step: 1,
            min: 100,
            max: 200,
        });

        it('if step more max, to throw Error', function () {
            expect(() => model.step = 201).to.throw();
        });

        it('is correct #set step', function () {
            model.step = 2;
            expect(model.step).to.equal(2);
        });
    });
});