import { Orientation } from "../model/Orientation";
import { SliderFacade } from "../controller/SliderFacade";

$(function() {
    let fst: SliderFacade = $('.slider-example').slider({orientation: Orientation.Horizontal, range: false});
    fst.orientation =Orientation.Vertical;
    //fst.orientation = Orientation.Horizontal;
    fst.value = 32;
    //fst.orientation = Orientation.Vertical;


    let slider: SliderFacade = $('.slider-example2').slider({orientation: Orientation.Vertical, range: true});
    //slider.value = 50;
    //slider.step = 25;
    slider.labels = false;
    slider.labels = true;
    slider.orientation = Orientation.Horizontal;
    //slider.orientation = Orientation.Vertical;

});