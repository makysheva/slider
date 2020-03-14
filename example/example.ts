import './favicons/favicons';
import './scss/example.scss';
import './scss/panel.scss';
import Orientation from '../src/types/Orientation';
import Panel from './panel/Panel';

const container = document.querySelector('.example');
if (container) {
  new Panel(container as HTMLElement);
  new Panel(container as HTMLElement, { min: 20, max: 300, isRange: true });
  new Panel(container as HTMLElement, { orientation: Orientation.Vertical });
}
