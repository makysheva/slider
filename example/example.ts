import './scss/example.scss';
import { Orientation } from "../src/model/Orientation";
import { Panel } from './panel/Panel';

$(function() {
    new Panel(document.body, { orientation: Orientation.Horizontal, showLabels: true, range: false, step: 1 });
    new Panel(document.body, { orientation: Orientation.Vertical, showLabels: true, range: false, step: 5, min: 100, max: 800 });
    new Panel(document.body, { orientation: Orientation.Horizontal, showLabels: false, range: true, step: 1 });
    new Panel(document.body, { orientation: Orientation.Vertical, showLabels: true, range: true, step: 4 });
});