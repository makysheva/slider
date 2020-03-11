import Slider from './Slider';

$(function () {
  $.fn.slider = function (props) {
    const controller: Slider = new Slider(this.get(0), props);
    return controller;
  };
});
