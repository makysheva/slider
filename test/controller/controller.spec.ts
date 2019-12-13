import 'mocha';
import { expect, assert } from 'chai';
import sinon, { SinonSpy, SinonStub } from 'sinon';
import { SliderModel } from '../../src/model/SliderModel';
import { Controller } from '../../src/controller/Controller';
import { Orientation } from '../../src/model/Orientation';

describe('Controller tests', () => {
    it('Change orientation', () => {
        let model: SliderModel = new SliderModel({});
        let controller: Controller = new Controller(document.body, model);
        
        controller.changeOrientation(Orientation.Vertical);
        
        expect(model.orientation).to.equal(Orientation.Vertical);     
    });
});