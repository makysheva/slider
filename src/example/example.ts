import './scss/example.scss';
import { Orientation } from "../model/Orientation";
import { SliderFacade } from "../controller/SliderFacade";
import { ModelEvents } from '../model/ModelEvents';
import { SliderModel } from '../model/SliderModel';
import { Panel } from './panel/Panel';

$(function() {
    new Panel(document.body, {orientation: Orientation.Vertical});
    new Panel(document.body, {range: true});
    new Panel(document.body, { range: true });
    new Panel(document.body, { range: true, showLabels: true });
    new Panel(document.body, { range: true });
    new Panel(document.body, { range: true });

/*
    let fst: SliderFacade = $('.slider-example').slider({orientation: Orientation.Horizontal, range: true});
    fst.orientation =Orientation.Vertical;
    //fst.orientation = Orientation.Horizontal;
    //fst.value = 32;
    //fst.orientation = Orientation.Vertical;
    fst.addEventListener(ModelEvents.changeValue, function(type: ModelEvents, data: SliderModel) {
        $('#panel_1').val(data.value);
    });

    fst.addEventListener(ModelEvents.changeLabelVisibility, function(type: ModelEvents, data: SliderModel) {
        $('#check_1').prop('checked', fst.labels);  
    });

    $('#panel_1').on('input', function() {
        let val: any = $('#panel_1').val() || ''!;
        fst.value = parseInt( val );
    });

    $('#panel_1').val(fst.value);
    $('#check_1').prop('checked', fst.labels);  

    $('#check_1').change(function() {
        let val: boolean = $('#check_1').prop('checked');
        fst.labels = val;
    });

    $('#select_slider').val(fst.orientation);
    $('#select_slider').change(function() {
        if($(this).val() == 'vertical') {
            fst.orientation = Orientation.Vertical;
        } else {
            fst.orientation = Orientation.Horizontal;
        }
        
    });

    let slider: SliderFacade = $('.slider-example2').slider({orientation: Orientation.Vertical, range: true, labels: true});
    //slider.value = 50;
    //slider.step = 25;
    slider.labels = false;
    slider.labels = true;
    slider.orientation = Orientation.Horizontal;
    //slider.orientation = Orientation.Vertical;
*/
});