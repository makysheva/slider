## **Слайдер**

Demos: [смотреть](https://vovnet.github.io/slider/example/)

JQuery плагин слайдер.

### *Содержание*
- [Использование](#)
- [Тесты](#)

### Использование
Создаем слайдер:
```javascript
$('#slider').slider();
```
Конструктор слайдера принимает следующие параметры:
- минимальное и максимальное значения
- размер шага
- текущее значение (либо массив значений в случае установки `range: true`)
- одиночный или интервал
- горизонтальный или вертикальный вид
- отображать значения над бегунками

Эти значения можно задать либо через функцию `slider`, либо через объект возвращаемый этой функцией:
```javascript
const slider = $('#slider').slider({
    min: 0,
    max: 100,
    range: false,
    value: 50,
    step: 1,
    orientation: 'horizontal',
    showLabels: true
});

slider.minMax = [0, 10];
slider.step = 2;
slider.value = 5;
slider.values = [1, 10]; // в случае, если range: true
slider.orientation = 'vertical';
slider.labels = false;
```

#### События
Можно подписаться на следующие события слайдера:
- изменение значения `'changeValue'`
- изменение ориентации `'changeOrientation'`
- изменение видимости стикеров над бегунками `'changeLabelVisibility'`

```javascript
const slider = $('#slider').slider();

slider.addEventListener('changeValue', () => {
    console.log(slider.value);
});
```

### Тесты
Тесты запускаются командой `npm test`