import Slider from './plugin/Slider';

$(function () {
  $.fn.slider = function (props) {
    const controller = new Slider(this.get(0), props);
    return controller;
  };
});
