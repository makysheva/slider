import 'mocha';
import { expect } from 'chai';

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

  it('Update method with horizontal orientation', () => {
    let low: number = 10;
    let hight: number = 20;
    let fill: FillBar = new FillBar(document.body, Orientation.Horizontal);
    fill.update(low, hight, Orientation.Horizontal);
    let element: HTMLElement = document.querySelector('.slider__fill') as HTMLElement;
    expect(element.style.left).to.equal(low + 'px');
    expect(element.style.right).to.equal(hight + 'px');
  });

  it('Update method with vertical orientation', () => {
    let low: number = 10;
    let hight: number = 20;
    let fill: FillBar = new FillBar(document.body, Orientation.Vertical);
    fill.update(low, hight, Orientation.Vertical);
    let element: HTMLElement = document.querySelector('.slider__fill--vertical') as HTMLElement;
    expect(element.style.bottom).to.equal(low + 'px');
    expect(element.style.top).to.equal(hight + 'px');
  });

  beforeEach(() => document.body.innerHTML = '');
});
