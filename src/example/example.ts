import './favicons/favicons';
import './scss/example.scss';
import './scss/panel.scss';
import Orientation from '../plugin/Types/Orientation';
import Panel from './Panel/Panel';

const container = document.querySelector('.example');
if (container) {
  new Panel(container as HTMLElement);
  new Panel(container as HTMLElement, { min: 20, max: 300, isRange: true });
  new Panel(container as HTMLElement, { orientation: Orientation.Vertical });
}
