import { Orientation } from "../model/Orientation";

$(function() {
    $('.slider-example').slider({orientation: Orientation.Horizontal});
    $('.slider-example2').slider({orientation: Orientation.Vertical});
});