import './scss/example.scss';
import { Orientation } from "../model/Orientation";
import { Panel } from './panel/Panel';

$(function() {
    new Panel(document.body, {orientation: Orientation.Vertical, showLabels: true, range: true, step: 4});
});