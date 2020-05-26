import Example from './Example';

$(() => {
  $('.js-example__slider').each((i, elem) => {
    $(elem).slider({ step: 1, max: 5000, isRange: false, values: [0, 100] });
  });

  $('.js-example').each((_, element) => {
    new Example(element);
  });
});
