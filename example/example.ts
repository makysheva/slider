import './scss/example.scss';
import './scss/panel.scss';
import Panel from './panel/Panel';
import './favicons/favicons';

document.querySelectorAll('.js-slider').forEach((element) => {
  new Panel(<HTMLElement>element);
});
