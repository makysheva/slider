import 'mocha';
import { expect, assert } from 'chai';
import { FillBar } from '../../src/view/fill_bar/FillBar';
import { Orientation } from '../../src/model/Orientation';

describe('FillBar tests', () => {
    it('Instantiate horizontal FillBar', () => {
        let fill: FillBar = new FillBar(document.body, Orientation.Horizontal);
        expect(document.querySelectorAll('.slider__fill').length).to.equal(1);
        expect(document.querySelectorAll('.slider__fill--vertical').length).to.equal(0);
    });

    it('Instantiate vertical FillBar', () => {
        let fill: FillBar = new FillBar(document.body, Orientation.Vertical);
        expect(document.querySelectorAll('.slider__fill--vertical').length).to.equal(1);
    });

    it('Set vertical method', () => {
        let fill: FillBar = new FillBar(document.body, Orientation.Horizontal);
        fill.setVertical();
        expect(document.querySelectorAll('.slider__fill--vertical').length).to.equal(1);
    });

    it('Set horizontal method', () => {
        let fill: FillBar = new FillBar(document.body, Orientation.Vertical);
        fill.setHorizontal();
        expect(document.querySelectorAll('.slider__fill--vertical').length).to.equal(0);
    });

    it('Update method', () => {
        let low: number = 10;
        let hight: number = 20;
        let fill: FillBar = new FillBar(document.body, Orientation.Horizontal);
        fill.update(low, hight, Orientation.Horizontal);
        let element: HTMLElement = document.querySelector('.slider__fill');
        expect(element.style.left).to.equal(low);
    });

    beforeEach(() => document.body.innerHTML = '');
});