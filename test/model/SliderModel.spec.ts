import 'mocha';
import { expect } from 'chai';

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
            it('if set value more or less then min/max, to throw Error', function () {
            let model: SliderModel = new SliderModel({});
            expect(() => model.value = 300).to.throw();
        });

        it('If range is true, #setValue function must be throw an Error.', function() {
            let model: SliderModel = new SliderModel({range: true});
            expect(() => model.value = 0).to.throw('Range slider have multiple values.');
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

        it('if set position less then 0, then it will throw Error', function() {
            expect(() => model.position = -1).to.throw();
        });

        it('if set position more then 1, then it will throw Error', function() {
            expect(() => model.position = 2).to.throw();
        });

        it('set position shoud be set correct value', function() {
            model.position = .5;
            expect(model.value).to.equal(300);
        });
    });


    describe('#get/set multiple positions for range slider', function() {
        it('if slider is single marker, then throw Error', function() {
            let model: SliderModel = new SliderModel({range: false});
            expect(() => model.positions = []).to.throw('This is single marker slider.');
        });

        it('range slider must correct set positions', function() {
            let model: SliderModel = new SliderModel({ range: true });
            model.positions = [0, 1];
            expect(model.positions).to.eql([0, 1]);
        });
    });

    describe('#get/set multiple values for range slider', function () {
        it('if slider is single marker, then throw Error', function () {
            let model: SliderModel = new SliderModel({ range: false });
            expect(() => model.values = []).to.throw('This is single marker slider.');
        });

        it('range slider must correct set values', function () {
            let model: SliderModel = new SliderModel({ range: true });
            model.values = [5, 10];
            expect(model.values).to.eql([5, 10]);
        });
    });
});