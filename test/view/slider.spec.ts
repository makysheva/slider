import 'mocha';
import { expect, assert } from 'chai';
import sinon, { SinonSpy } from 'sinon';
import { Slider } from '../../src/view/slider/Slider';
import { Orientation } from '../../src/model/Orientation';
import { Controller } from '../../src/controller/Controller';
import { SliderModel } from '../../src/model/SliderModel';

describe('Slider tests', () => {
    let controller: Controller = new Controller(document.body, new SliderModel({}));

    beforeEach(() => document.body.innerHTML = '');

    it('Change orientation to vertical', () => {
        let slider: Slider = new Slider(document.body, Orientation.Horizontal, controller);
        slider.changeOrientation(Orientation.Vertical);
        expect(document.querySelectorAll('.slider--vertical').length).to.equal(1);
    });

    it('Change orientation to horizontal', () => {
        let slider: Slider = new Slider(document.body, Orientation.Vertical, controller);
        slider.changeOrientation(Orientation.Horizontal);
        expect(document.querySelectorAll('.slider--vertical').length).to.equal(0);
    });

    it('Set label visibility', () => {
        let slider: Slider = new Slider(document.body, Orientation.Horizontal, controller);
        slider.setLabelVisibility(false);
        expect(document.querySelector('.slider__label')).to.be.null;

        slider.setLabelVisibility(true);
        expect(document.querySelector('.slider__label')).to.not.null;
    });
});