import './scss/example.scss';
import Slider from '../src/view/Slider';

document.querySelectorAll('.js-slider').forEach((element) => {
  new Slider(<HTMLElement>element);
});
