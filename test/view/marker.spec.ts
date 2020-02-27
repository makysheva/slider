import 'mocha';
import { expect } from 'chai';
import sinon, { SinonSpy } from 'sinon';

import { Marker } from '../../src/view/marker/Marker';
import { Orientation } from '../../src/model/Orientation';

describe('Marker test', () => {
  let callback: SinonSpy;
  let marker: Marker;

  beforeEach(() => {
    document.body.innerHTML = '';
    callback = sinon.spy();
  });

  it('Set position X', () => {
    marker = new Marker(document.body, callback, 0, Orientation.Horizontal);
    let x: number = 10;
    marker.setPositionX(x);
    expect((document.querySelector('.slider__marker') as HTMLElement).style.left).to.equal(x + 'px');
  });

  it('Set position Y', () => {
    marker = new Marker(document.body, callback, 0, Orientation.Vertical);
    let y: number = 10;
    marker.setPositionY(y);
    expect((document.querySelector('.slider__marker') as HTMLElement).style.top).to.equal(y + 'px');
  });

  it('Set horizontal', () => {
    marker = new Marker(document.body, callback, 0, Orientation.Vertical);
    marker.setHorizontal();
    expect((document.querySelector('.slider__marker') as HTMLElement).style.top).to.equal('');
  });

  it('Set vertical', () => {
    marker = new Marker(document.body, callback, 0, Orientation.Horizontal);
    marker.setVertical();
    expect((document.querySelector('.slider__marker') as HTMLElement).style.left).to.equal('');
  });

  it('Move event', () => {
    marker = new Marker(document.body, callback, 0, Orientation.Horizontal);
    let markerElement: HTMLElement = document.querySelector('.slider__marker') as HTMLElement;
    markerElement.dispatchEvent(new MouseEvent('mousedown'));
    let event: MouseEvent = document.createEvent('MouseEvents') as MouseEvent;
    event.initMouseEvent('mousemove', true, true, window, 1, 100, 100, 100, 100, false, false, false, false, 0, null);
    document.dispatchEvent(event);

    sinon.assert.calledOnce(callback);
  });
});
