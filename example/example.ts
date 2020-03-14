import './scss/example.scss';
import './scss/panel.scss';
import Panel from './panel/Panel';
import './favicons/favicons';
import Orientation from '../src/types/Orientation';

const container = document.querySelector('.example');
if (container) {
  new Panel(<HTMLElement>container);
  new Panel(<HTMLElement>container, { min: 20, max: 300, isRange: true });
  new Panel(<HTMLElement>container, { orientation: Orientation.Vertical });
}
