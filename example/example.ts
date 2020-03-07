import './scss/example.scss';
import Slider from '../src/view/Slider';
import Controller from '../src/controller/Controller';

document.querySelectorAll('.js-slider').forEach((element) => {
  new Controller(<HTMLElement>element);
});
