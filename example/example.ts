import './scss/example.scss';
import './scss/panel.scss';
import Panel from './panel/Panel';

document.querySelectorAll('.js-slider').forEach((element) => {
  new Panel(<HTMLElement>element);
});
