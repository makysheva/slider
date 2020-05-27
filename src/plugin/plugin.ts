import $ from 'jquery';
// eslint-disable-next-line no-unused-vars
import IState from './Model/IState';
import Orientation from './Types/Orientation';
import Slider from './Slider';

interface IProps {
  min: number;
  max: number;
  step: number;
  isRange: boolean;
  isTips: boolean;
  orientation: Orientation;
  values: number[];
  onChange: () => void;
}

const create = (container: HTMLElement, $element: JQuery, props: IProps) => {
  const attr = {
    isRange: $element.data('range'),
    isTips: $element.data('tips'),
    max: $element.data('max'),
    min: $element.data('min'),
    orientation: $element.data('orientation'),
    step: $element.data('step'),
    values: $element.data('values'),
  };
  const options = $.extend(attr, props);

  const slider = new Slider(container, options);

  if (props.onChange) {
    slider.add('change', props.onChange);
  }

  $element.data('slider', slider);
};

$.fn.slider = function (props: IProps | string, ...args: any[]) {
  const $element = $(this);

  if (typeof props === 'object') {
    create(this[0], $element, props);
  } else if (args.length === 0) {
    return $element.data('slider')[props]();
  } else {
    return $element.data('slider')[props](...args);
  }

  return this;
};
