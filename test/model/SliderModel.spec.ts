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

        it('if step more then max, to throw Error', function () {
            expect(() => model.step = 201).to.throw();
        });

        it('is correct #set step', function () {
            model.step = 2;
            expect(model.step).to.equal(2);
        });
    });


    describe('#get/set position', function() {
        let model: SliderModel = new SliderModel({
            step: 1,
            min: 100,
            max: 500,
            value: 101,
        });

        it('if set position less then 0, then it will become equal to 0', function() {
            model.position = -1;
            expect(model.position).to.equal(0);
        });

        it('if set position more then 1, then it will become equal to 1', function() {
            model.position = 2;
            expect(model.position).to.equal(1);
        });

        it('set position shoud be set correct value', function() {
            model.position = .5;
            expect(model.value).to.equal(300);
        });
    });
});