import $ from 'jquery';
import Example from './Example';

$(() => {
  $('.js-example__slider').each((_, elem) => {
    $(elem).slider({ step: 1 });
  });

  $('.js-example').each((_, element) => {
    new Example(element);
  });
});
