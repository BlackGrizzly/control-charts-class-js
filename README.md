# control-charts-class-js
Контрольные карты Шухарта (js класс) | Shewhart control charts (js class)

Для работы требуется D3.js

Создание контрольной карты.

#### 1. Подключить скрипт `js/classes/controlChartClasses.js` в индексе

#### 2. На странице создать пустой `svg` и присвоить ему `id` и поместить в `div` с классом `chart`

```html
<div class="chart">
	<svg class="" id="test"></svg>
</div>
```

На странице создать пустой `div` с классом `board`. В нем будут отображаться всплывающие подсказки.

```html
<div class="board"></div>
```

#### 3. Создать массив точек, в котором каждый элемент массива - это массив состоящий из следующих значений:

1. координата x (хранится в `data-i` точки)
2. координата y (хранится в `data-v` точки)
3. признак отображения точки (`true`/`false`)
4. идентификатор точки (хранится в `data-id` точки)

```javascript
var arr=[ [1, 123, true, id1], [2, 234, true, id2], [3, 345, true, id3], ...];
```

#### 4. Создать объект `controlChart`, в конструктор которого передаются:

1. тип контрольной карты (`X_MAP` - карта индивидуальных значений (работает с mR картой), `MX_MAP` - карта средних (работает с R картой), `CX_MAP` - карта медиан (работает с R картой))
2. массив `id` `svg` на странице (для каждой карты свой)
3. ширина
4. высота

```javascript
var qwe=new controlChart(X_MAP, ['#test'], 100, 200);
```

#### 5. У объекта класса `controlChart` вызвать метод `points` c параметрами:

1. массив точек (см. шаг [3](#3-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2-%D1%82%D0%BE%D1%87%D0%B5%D0%BA-%D0%B2-%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BE%D0%BC-%D0%BA%D0%B0%D0%B6%D0%B4%D1%8B%D0%B9-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B0-%D1%8D%D1%82%D0%BE-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2-%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D1%89%D0%B8%D0%B9-%D0%B8%D0%B7-%D1%81%D0%BB%D0%B5%D0%B4%D1%83%D1%8E%D1%89%D0%B8%D1%85-%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B9))
2. признак группировки (`true`/`false`), по умолчанию `false`
3. максимальное значение по y, не обязательно
4. минимальное значение по y, не обязательно

```javascript
qwe.points(arr, false);
```

#### 6. У объекта класса `controlChart` вызвать метод `calc` с параметрами:

1. объект класса `limitsClass`, в котором будут храниться контрольные пределы карты. не обязательный. Задается, если нужно обрабатывать значения контрольных пределов в коде
2. признак фиксирования контрольных пределов (`false`/`true`). по умолчанию `false`, не обязательный. Фиксирует контрольные пределы, которые заданы в `limits`, т.е. контрольные пределы не вычисляются

```javascript
let limits = new limitsClass();  
qwe.calc(limits, false); 
// или 
qwe.calc();
```

#### 7. У объекта класса `controlChart` вызвать метод `setAxis` с параметрами:

1. объект подписи карты 1 (по умолчанию значение {}, не обязательный)
2. объект подписи карты 2 (по умолчанию значение {}, не обязательный)

```javascript
// Структура объекта подписи карты:
axis = 
	{
		xAxis: { 
			caption: "", // подпись оси 
			offset: 0 // смещение от центра
		},
		yAxis: { 
			caption: "", // подпись оси 
			offset: 0 // смещение от центра
		}
	}
```

#### 8. У объекта класса `controlChart` вызвать метод `setCaptions` с параметрами:

1. Название карты 1 (по умолчанию значение "", не обязательный).
2. Название карты 2 (по умолчанию значение "", не обязательный).

#### 9. У объекта класса `controlChart` вызвать метод `paint` с параметрами:

1. масштаб (число, по умолчанию 1, не обязательный)
2. объект меток для оси x (по умолчанию значение {}, не обязательный)

```javascript
// Структура объекта меток
ticks = {
	tick1: {
		values: [], // массив значений по оси x
		color: "#000000", // цвет меток
		names: [] // массив наименований меток,
		padding: 0, // смещение по оси y
		offset: 0, // смещение по оси x (работает только с заданным параметром css)
		division: false, // нужно ли рисовать вертикальные линии (true/false)
		css: "className" // имя класса для кастомизации внешнего вида
	},
	tick2: {/*...*/}
}; 	
```

3. признак, нужно ли закрашивать область под линией графика (`true`/`false`, не обязательный)
4. объект, который устанавливает, по каким правилам проверять карту

```javascript
// Структура объекта правил для проверки
rules = {
	1: true, // проверять ли по правилу 1 
	2: false, // проверять ли по правилу 2 
	/*n: true/false*/
}
```

можно перечислять только правила, по которым нужно проверять, остальные опустить. описание правил смотреть в объекте `chartRules`

5. смещение легенды по оси x

```javascript
legendOffset = 100; 	
```

6. дополнительные линии

```javascript
// Структура объекта дополнительных линий
subline = {
	subline1: {
		points: [[x1, y1], [x2, y2], ..], // массив точек
		color: "#000000", // цвет линии
		width: 0, // толщина линии
		class: "", // класс линии
		id: "" // id линии
	},
	subline2: {/*...*/}
}; 	
```

Примеры:

```javascript
qwe.paint(1, tikets, false, rules, legendOffset, subline);
// или
qwe.paint();
```

#### 10. добавить обработчик при наведении на точку `setValueFunc(func)`. не обязательно. по умолчанию показывается значение по оси y. в функцию передаются следующие значение:

1. `v` - значение по оси y точки
2. `l` - объект класса `limitsClass` (см. выше), содержащий значения контрольных пределов
3. `i` - значение по оси x точки
4. `id` - значение `data-id` точки

```javascript
qwe.setValueFunc(func);
```

#### 11. добавить обработчик при наведении на дополнительную линию `setSublineValueFunc(func)`. не обязательно. по умолчанию показывается значение id дополнительной линии. в функцию передаются следующие значение:

1. `id` - значение `data-id` линии

```javascript
qwe.setSublineValueFunc(func);
```

#### 12. добавить CSS:

```css
/* контрольная карта */
.chart {
    font-weight: bold;
    overflow-x: scroll;
}
.board {
    z-index: 99;
    position: absolute;
    display: none;
    top:0px;
    left:0px;
    background-color: #4D4D4D;
    padding: 5px 10px 5px 10px;
    color: white;
    opacity: 0.9;
    border-radius: 5px;
}
.board a {
    color: white;
}
.axis .grid-line {
    stroke: #000;
    stroke-opacity: 0.2;
}
.chart .point:hover {
    fill: #800080;
    stroke-width: 4;
    --transform: scale(2);
    transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
    cursor: pointer;
}
.chart .gLine {
    stroke-width: 2;
}
.chart .gLine:hover {
    stroke-width: 4;
}
.sub-axis text {
    transform: translateX(-30px);
    -webkit-transform: translateX(-30px);
}
.graph_title {
    margin-bottom: 10px;
}
.legend {
    font-size: 0.7em;
}
.legend g {
    cursor: pointer;
}
```
