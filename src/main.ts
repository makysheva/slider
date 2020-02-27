import './scss/slider.scss';
import { SliderFacade } from './controller/SliderFacade';

$(function () {
  $.fn.slider = function (props) {
    let controller: SliderFacade = new SliderFacade(this.get(0), props);
    return controller;
  };
});
