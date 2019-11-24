import './scss/slider.scss';
import { SlideController } from './controller/SlideController';

$(function() {
    $.fn.slider = function() {
        let controller: SlideController = new SlideController(this.get(0), {});
    };
});