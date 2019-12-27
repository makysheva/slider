import 'mocha';
import { expect, assert } from 'chai';
const { JSDOM } = require('jsdom');

import { LabelView } from '../../src/view/label/LabelView';
import { Orientation } from '../../src/model/Orientation';


describe('jsom test', function() {

    let dom: any = JSDOM.fragment('<div></div>');
    let label: LabelView = new LabelView(dom, Orientation.Horizontal);

    it('#setValue method should set value to label', () => {
        label.show();
        label.setValue(23);
        expect('23').to.equal(dom.querySelector('.slider__label').textContent);
    });

    it('#show method should add label to container', () => {
        label.show();
        expect(dom.querySelector('.slider__label')).to.not.be.null;
    });

    it('#hide method shoud remove label from container', () => {
        label.hide();
        expect(dom.querySelector('.slider__label')).to.be.null;
    });

    it('#setHorizontal method shoud remove .slider__label--vertical class', () => {
        label.show();
        label.setHorizontal();
        expect(dom.querySelector('.slider__label--vertical')).to.be.null;
    });

    it('#setVertical method shoud add .slider__label--vertical class', () => {
        label.show();
        label.setVertical();
        expect(dom.querySelector('.slider__label--vertical')).to.not.be.null;
    });
});