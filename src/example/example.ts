import './favicons/favicons';
import './example.scss';
import './Panel/panel.scss';
import Orientation from '../plugin/Types/Orientation';
import Panel from './Panel/Panel';
import IState from '../plugin/Model/IState';

const container = document.querySelector('.example');
if (container) {
  const props: IState = {
    isRange: false,
    isTips: true,
    max: 100,
    min: 0,
    orientation: Orientation.Horizontal,
    step: 1,
    values: [0, 100],
  };
  new Panel(container as HTMLElement, { ...props, max: 1000, values: [0, 1000] });
  new Panel(container as HTMLElement, { ...props, orientation: Orientation.Vertical });
  new Panel(container as HTMLElement, { ...props, isRange: true, isTips: false });
}
