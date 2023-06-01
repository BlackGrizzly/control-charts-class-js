"use strict";

// коэффициенты
var A2 = [1.880, 1.880, 1.023, 0.729, 0.577, 0.483, 0.419, 0.373, 0.337, 0.308];
var A4 = [1.880, 1.880, 1.190, 0.800, 0.690, 0.550, 0.510, 0.430, 0.410, 0.360];
var B3 = [0.000, 0.000, 0.000, 0.000, 0.000, 0.030, 0.118, 0.185, 0.239, 0.283];
var B4 = [3.267, 3.267, 2.568, 2.266, 2.089, 1.970, 1.882, 1.815, 1.761, 1.716];
var D3 = [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.076, 0.136, 0.184, 0.223];
var D4 = [3.268, 3.268, 2.575, 2.282, 2.116, 2.004, 1.924, 1.864, 1.816, 1.777];
var D2 = [1.128, 1.128, 1.693, 2.059, 2.326, 2.534, 2.704, 2.847, 2.970, 3.078];
var reD2 = [0.8862, 0.8862, 0.5908, 0.4857, 0.4299, 0.3946, 0.3698, 0.3512, 0.3367, 0.3249];
var E2 = 2.66;

var X_MAP = "х";
var R_MAP = "r";
var MR_MAP = "mr";
var MX_MAP = "mх";
var CX_MAP = "cх";
var PN_MAP = "pn";

var chartRules = {
	rule1: { name: "Правило 1", title: "Точка лежит выше (ниже) естественных границ процесса" },
	rule2: { name: "Правило 2", title: "Из трех последовательных точек две лежат выше (ниже) ЦЛ более чем на два стандартных отклонения" },
	rule3: { name: "Правило 3", title: "Из пяти последовательных точек четыре лежат выше (ниже) ЦЛ более чем на одно стандартное отклонение" },
	rule4: { name: "Правило 4", title: "Семь последовательных точек лежат выше (ниже) ЦЛ" },
	rule5: { name: "Правило 5", title: "Шесть последовательных точек расположены в порядке монотонного возрастания (убывания)" },
	rule6: { name: "Правило 6", title: "Среди десяти последовательных точек существует подгруппа из восьми точек (считая слева направо), которая образует монотонно возрастающую (убывающую) последовательность" },
	rule7: { name: "Правило 7", title: "Из двух последовательных точек вторая лежит, по крайней мере, на четыре стандартных отклонения выше (ниже) первой" }
};
// лимиты
class limitsClass {
	constructor() {
		this._top = 0; // верхняя граница
		this._bottom = 0; // нижняя граница
		this._middle = 0; // центральная линия
		this._sig1top = 0; // сигма 1 верхняя
		this._sig1bottom = 0; // сигма 1 нижняя
		this._sig2top = 0; // сигма 2 верхняя
		this._sig2bottom = 0; // сигма 2 нижняя

		this._limit1top = 0; // граница моделей 1 верхняя
		this._limit1bottom = 0; // граница моделей 1 нижняя
		this._limit2top = 0; // граница моделей 2 верхняя
		this._limit2bottom = 0; // граница моделей 2 нижняя
	}

	get top() {
		return this._top;
	}

	set top(value) {
		this._top = value;
	}

	get bottom() {
		return this._bottom;
	}

	set bottom(value) {
		this._bottom = value;
	}

	get middle() {
		return this._middle;
	}

	set middle(value) {
		this._middle = value;
	}

	get sig1top() {
		return this._sig1top;
	}

	set sig1top(value) {
		this._sig1top = value;
	}

	get sig1bottom() {
		return this._sig1bottom;
	}

	set sig1bottom(value) {
		this._sig1bottom = value;
	}

	get sig2top() {
		return this._sig2top;
	}

	set sig2top(value) {
		this._sig2top = value;
	}

	get sig2bottom() {
		return this._sig2bottom;
	}

	set sig2bottom(value) {
		this._sig2bottom = value;
	}

	get limit1top() {
		return this._limit1top;
	}

	set limit1top(value) {
		this._limit1top = value;
	}

	get limit2top() {
		return this._limit2top;
	}

	set limit2top(value) {
		this._limit2top = value;
	}

	get limit1bottom() {
		return this._limit1bottom;
	}

	set limit1bottom(value) {
		this._limit1bottom = value;
	}

	get limit2bottom() {
		return this._limit2bottom;
	}

	set limit2bottom(value) {
		this._limit2bottom = value;
	}

	list() {
		return { 'bottom': this.bottom, 'sig2bottom': this.sig2bottom, 'sig1bottom': this.sig1bottom, 'middle': this.middle, 'sig1top': this.sig1top, 'sig2top': this.sig2top, 'top': this.top, 'limit1top': this.limit1top, 'limit2top': this.limit2top, 'limit1bottom': this.limit1bottom, 'limit2bottom': this.limit2bottom };
	}

}
// правило
class ruleClass {
	constructor(name, description) {
		this.name = name;
		this.description = description;
	}

	get name() {
		return this.name;
	}

	get description() {
		return this.description;
	}

}
// Правило 1

// метки 
class tickClass {
	// конструктор
	constructor(label, color, css, padding, division, offset) {
		this._label = label;
		this._color = color;
		this._css = css;
		this._padding = padding;
		this._division = division;
		this._offset = offset;
		this._values = [];
		this._names = [];
		this._ticks = [];
	}
	// назвениe меток
	get label() {
		return this._label;
	}
	// цвет меток
	get color() {
		return this._color;
	}
	// класс меток
	get css() {
		return this._css;
	}
	// отступ метки
	get padding() {
		return this._padding;
	}
	// 
	get division() {
		return this._division;
	}
	// смещение метки
	get offset() {
		return this._offset;
	}
	// массив меток
	get values() {
		return this._values;
	}
	// массив меток
	get names() {
		return this._names;
	}
	// массив меток
	get ticks() {
		return this._ticks;
	}
	// добавление метки
	add(val, name) {
		this._values.push(val);
		this._names.push(name);
		this._ticks[val] = name;
	}
}
// 
class map {
	// конструктор
	constructor(source, width, height) {
		console.log(source);
		// создание объекта svg
		if (source != undefined) {
			this.width = width;
			this.height = height;
			this.svg = d3.select(source)
				.attr("class", "axis")
				.attr("width", width)
				.attr("height", height)
				.style("width", width);

			this.svg.selectAll("*").remove();

		}
		this._points = [];
		this._max_x = 0;
		this._max_y = 0;
		this._min_y = 0;
		this._mapLine = {
			cLine: { points: [], color: "green", dash: "", name: "CL" },
			tLine: { points: [], color: "red", dash: "", name: "UCL" },
			bLine: { points: [], color: "red", dash: "", name: "LCL" },
			sig1Line1: { points: [], color: "gray", dash: "10 5", name: "1sigma" },
			sig1Line2: { points: [], color: "gray", dash: "10 5", name: "1sigma" },
			sig2Line1: { points: [], color: "gray", dash: "10 5", name: "2sigma" },
			sig2Line2: { points: [], color: "gray", dash: "10 5", name: "2sigma" }
		};
		this.xAxis = {
			caption: "",
			offset: 0
		};
		this.yAxis = {
			caption: "",
			offset: 0
		}
		this.getValue = function (v) { return v; };
		this.getSublineValue = function (v) { return v; };
		this.clickCall = function (i, v) { return this; };
		this.ticks = {};
		this.subline = {};
		this.area = undefined;
		this.clickEvent = true;
		this.caption = "";
	}

	get points() {
		return this._points;
	}

	set points(val_array) {
		this._points = val_array;
	}

	get mapLine() {
		return this._mapLine;
	}

	setGetValue(func) {
		this.getValue = func;
		return this;
	}

	setGetSublineValue(func) {
		this.getSublineValue = func;
		return this;
	}

	setClickCall(func) {
		this.clickCall = func;
		return this;
	}

	setClickEvent(enable = true) {
		this.clickEvent = enable;
		return this;
	}

	setMapLine(line, val_array) {
		this._mapLine[line].points = val_array;
		return this;
	}

	setTicks(ticks = {}) {
		if (!isEmptyObject(ticks))
			this.ticks = ticks;
		return this;
	}

	setAxis(axis = {xAxis: {}, yAxis: {}}) {
		if (!isEmptyObject(axis.xAxis))
			this.xAxis = axis.xAxis;
		if (!isEmptyObject(axis.yAxis))
			this.yAxis = axis.yAxis;
		return this;
	}

	setCaption(caption) {
		if (caption != "")
			this.caption = caption;
		return this;
	}

	get min_y() {
		return this._min_y;
	}

	get max_y() {
		return this._max_y;
	}

	get max_x() {
		return this._max_x;
	}

	set max_x(val) {
		this._max_x = val;
	}

	set min_y(val) {
		this._min_y = val;
	}

	set max_y(val) {
		this._max_y = val;
	}

	// отрисовка карты
	paint(scale = 1, ticks = {}, area = undefined, rules = { 1: true, offset: 320 }, legendOffset = 100, subline = {}) {

		if (this.svg == undefined)
			return this;
		// требуется обяъвленная функция isEmptyObject (в common.js)
		let margin = 20,
			svg = this.svg,
			getValue = this.getValue,
			getSublineValue = this.getSublineValue,
			captionOffset = (this.caption != "" ? 10 : 0);

		svg.attr("width", this.width * scale).style("width", this.width * scale);
		svg.selectAll("*").remove();

		// длина оси X= ширина контейнера svg - отступ слева и справа
		let xAxisLength = this.width * scale - margin - 5;

		// длина оси Y = высота контейнера svg - отступ сверху и снизу
		let yAxisLength = this.height - margin - 15;
		// функция интерполяции значений на ось Х  
		let scaleX = d3.scaleLinear()
			.domain([1, this.max_x])
			.range([margin + 20, xAxisLength]);
		// функция интерполяции значений на ось Y
		let scaleY = d3.scaleLinear()
			.domain([this.max_y, this.min_y])
			.range([margin + 5 + captionOffset, yAxisLength]);

		// Подпись карты
		if (this.caption != "") {
			svg.append("text")
				.attr("x", margin)
				.attr("y", captionOffset)
				.attr("fill", "currentColor")
				.attr("text-anchor", "start")
				.text(this.caption);
		}

		/*let tickCount;
		if (Math.ceil((this.max_y+1) / 20) > 2)
		{
			tickCount = 20; 
		} else {
			tickCount = this.max_y+1; 
		}*/
		// метки оси Y
		let tickValues = [];
		console.log(this.mapLine);
		for (let i in this.mapLine) {
			tickValues.push(this.mapLine[i].points[0][1]);
		}
		// создаем ось Y             
		let yAxis = d3.axisLeft()
			.scale(scaleY)
			//.ticks(tickCount)
			.tickValues(tickValues)
			.tickFormat(function (d) {
				return d3.format("d")(d);
			});
		/*.tickFormat(function(d, i) { 
		   if ((i % 5) == 0 && (d != max || d != min || d != middle))
			   return d;
		   else 
			   return "";
		   });*/
		if (this.area == undefined || area != undefined) {
			if (area != undefined)
				this.area = area;
			else
				this.area = false;
		}
		if (this.area) {
			//добавляем области
			let area = d3.area()
				.x(function (d) { if (d != null) return scaleX(d[0]); })
				.y0(scaleY(this.min_y))
				.y1(function (d) { if (d != null) return scaleY(d[1]); });
			svg.append("g").append("path")
				.attr("d", area(this.points))
				.style("fill", "lightblue");
			if (!isEmptyObject(subline)) {
				this.subline = subline;
			}
			if (!isEmptyObject(this.subline)) {
				for (let i in this.subline) {
					console.log(this.subline[i]);
					svg.append("g").append("path")
						.attr("d", area(this.subline[i].points))
						.style("fill", this.subline[i].color);
				}
			}
		}
		// отрисовка оси Y 
		svg.append("g")
			.classed("y-axis", true)
			.attr("transform", // сдвиг оси вниз и вправо на margin
				"translate(" + (margin + 20) + ",0)")
			.call(yAxis);

		// если задано название оси, выводим
		if (this.yAxis.caption != "") {
			svg.append("text")
				.attr("x", - (yAxisLength / 2 + margin) - this.yAxis.offset)
				.attr("y", margin - 5)
				.attr("fill", "currentColor")
				.style("transform", "rotate(270deg)")
				.attr("text-anchor", "start")
				.text(this.yAxis.caption);
		}

		let xAxis;
		// если метки не заданы
		function defaultTick(val, main) {
			// создаем ось X   
			xAxis = d3.axisBottom()
				.scale(scaleX)
				.ticks(val);
			// отрисовка оси Х     
			svg.append("g")
				.classed("x-axis", true)
				.classed("main-axis", main)
				.attr("transform",  // сдвиг оси вниз и вправо
					"translate(0," + yAxisLength + ")")
				.call(xAxis);
		};
		if (!isEmptyObject(ticks)) {
			this.ticks = ticks;
		}
		// задание осей X
		if (!isEmptyObject(this.ticks)) {
			let ticks = this.ticks;
			// создаем оси X   
			let linesGroup;
			// проход по всем меткам
			for (let i in ticks) {
				if (ticks[i].values.length != 0) {
					xAxis = d3.axisBottom()
						.scale(scaleX)
						.tickValues(ticks[i].values)
						.tickFormat(function (d, a) {
							return ticks[i].names[a];
						})
						.tickPadding(ticks[i].padding);
					svg.append("g")
						.classed("x-axis", true)
						.classed(ticks[i].css, true)
						.attr("transform",  // сдвиг оси вниз и вправо
							"translate(0," + yAxisLength + ")")
						.call(xAxis);

					if (ticks[i].division) {
						linesGroup = svg.append("g");
						// добавление группы линий меток
						for (let j in ticks[i].values) {
							linesGroup.append("line")
								.attr("x1", scaleX(ticks[i].values[j]))
								.attr("x2", scaleX(ticks[i].values[j]))
								.attr("y1", scaleY(this.min_y))
								.attr("y2", scaleY(this.max_y))
								.style("stroke", ticks[i].color);
						}
					}
				} else {
					console.log(2);
					defaultTick(this.max_x, ticks[i].css == "main-axis");
				}
				if (ticks[i].css != "" && ticks[i].offset != 0) {
					d3.selectAll("g." + ticks[i].css + " g.tick text")
						.attr("transform",  // сдвиг текста оси влево/вправо
							"translate(" + ticks[i].offset + ", 0)");
				}
			}
		} else {
			defaultTick(this.max_x, true);
		}
		// если задано название оси, выводим
		if (this.xAxis.caption != "") {
			svg.append("text")
				.attr("x", xAxisLength / 2 + this.xAxis.offset)
				.attr("y", yAxisLength + margin + 10)
				.attr("fill", "currentColor")
				.attr("text-anchor", "start")
				.text(this.xAxis.caption);
		}
		// создаем набор вертикальных линий для сетки   
		svg.selectAll("g.x-axis.main-axis g.tick").each(function (i) {
			d3.select(this)
				.append("line")
				.classed("grid-line", true)
				.classed("vline" + i, true)
				.attr("x1", 0)
				.attr("y1", 0)
				.attr("x2", 0)
				.attr("y2", -yAxisLength + margin + 5 + captionOffset);
		});
		// рисуем горизонтальные линии координатной сетки
		svg.selectAll("g.y-axis g.tick")
			.append("line")
			.classed("grid-line", true)
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", xAxisLength - margin - 20)
			.attr("y2", 0);
		// функция, создающая по массиву точек линии
		let line = d3.line()
			.x(function (d) { return scaleX(d[0]); })
			.y(function (d) { return scaleY(d[1]); })
			.defined(function (d) { if (d != null) return true; else return false; });
		//легенда
		let legend_data = [["Data", "black"]];
		// 			, ["CL", "green"], ["UCL, LCL", "red"], ["1sigma, 2sigma", "gray"], ["Requirement", "blue"]
		// карта
		// контрольные пределы карты
		for (let mline in this.mapLine) {
			if (this.mapLine[mline].points.length != 0) {
				let mapLine = this.mapLine;
				svg.append("g").append("path")
					.attr("d", line(this.mapLine[mline].points))
					.classed("gLine", true)
					.classed(this.mapLine[mline].color + "Line", true)
					.style("stroke", this.mapLine[mline].color)
					.style("stroke-dasharray", this.mapLine[mline].dash)
					.style("fill", "none")
					.style("display", "")
					.on("mouseover", function () {
						let cx = d3.event.pageX + 5,// + d3.mouse(this)[0],
							cy = d3.event.pageY - 30;// + d3.mouse(this)[1];
						let text = mapLine[mline].points.length == 2 ? roundNumber(mapLine[mline].points[0][1], 1) : "";
						if (text != "") {
							d3.select(".board")
								.text(text)
								.style("top", cy + "px")
								.style("left", cx + "px")
								.style("display", "block");
						}
					})
					.on("mouseout", function () {
						d3.select(".board")
							.style("display", "none");
					});
				//.append("title")
				//.text(mapLine[mline].points.length==2?roundNumber(mapLine[mline].points[0][1], 1):"");

				let find = false;
				for (let j = 0; j < legend_data.length; j++) {
					if (legend_data[j][1] == this.mapLine[mline].color) {
						if (legend_data[j][0].indexOf(this.mapLine[mline].name) == -1)
							legend_data[j][0] = legend_data[j][0] + ", " + this.mapLine[mline].name;
						find = true;
						break;
					}
				}
				if (!find)
					legend_data.push([this.mapLine[mline].name, this.mapLine[mline].color]);
			}
		}

		let legendCount = 0;
		// создание легенды
		let legend = svg.append("g")
			.classed("legend", true)
			.selectAll("g")
			.data(legend_data)
			.enter()
			.append("g")
			.attr("data-class", function (d) {
				return d[1] + "Line";
			})
			.attr("data-show", function (d) {
				return "none";
			})
			.attr("transform", function (d, i) {
				legendCount = i;
				return "translate(" + (legendCount * legendOffset + margin + 20) + "," + parseInt(5 + captionOffset) + ")";
			})
			.on("click", function (d) {
				if (d[0] != "Data") {
					let className = this.dataset.class;
					let show = this.dataset.show;
					if (show == "none")
						this.dataset.show = "";
					else
						this.dataset.show = "none";
					d3.selectAll("." + className).style("display", show);
				}
			});

		legend.append("rect")
			.attr("width", 8)
			.attr("height", 8)
			.style("fill", function (d, i) { return d[1]; });

		legend.append("text")
			.attr("x", function (d, i) { return 10; })
			.attr("dy", "0.8em")
			.text(function (d, i) { return d[0] })
		// добавляем состояние
		// проверяем по правилам
		legendCount++;
		let state = this.check_rules(rules);
		svg.append("text")
			.attr("x", legendCount * legendOffset + margin + 20)
			.attr("y", captionOffset)
			.attr("dy", "1em")
			.classed(state.line + "Line", true)
			.style("font-size", "0.9em")
			.style("fill", state.color)
			.text(state.text);

		// рисуем рамку плохих значений
		if (state.points.length > 0) {
			let w = scaleX(state.points[1]) - scaleX(state.points[0]);
			if (w == 0) w = 1;
			svg.append("rect")
				.attr("y", captionOffset + 20)
				.attr("x", scaleX(state.points[0]))
				.attr("width", w)
				.attr("height", yAxisLength - 25)
				.classed(state.line + "Line", true)
				.style("fill", "none")
				.style("stroke", state.color);
		}
		console.log(subline);
		if (!isEmptyObject(subline)) {
			this.subline = subline;
		}
		if (!isEmptyObject(this.subline)) {
			for (let i in this.subline) {
				// добавляем путь: график
				svg.append("g").append("path")
					.attr("d", line(this.subline[i].points))
					.classed("map", true)
					.classed(this.subline[i].class, true)
					.attr("data-id", this.subline[i].id)
					.style("fill", "none")
					.style("stroke", this.subline[i].color)
					.style("stroke-width", this.subline[i].width)
                    .on("mouseover", function () {
                        let cx = d3.event.pageX + 5,
                            cy = d3.event.pageY - 30;
                        let value = getSublineValue(this.dataset.id);
                        d3.select(".board")
                            .text(value)
                            .style("top", cy + "px")
                            .style("left", cx + "px")
                            .style("display", "block");
                    })
                    .on("mouseout", function () {
                        d3.select(".board")
                            .style("display", "none");
                    });
			}
		}
		// правило
		legendCount++;
		svg.append("text")
			.attr("x", legendCount * legendOffset + margin + 40)
			.attr("dy", captionOffset + 13)
			.classed(state.line + "Line", true)
			.classed("rule", true)
			.style("font-size", "0.9em")
			.style("fill", state.color)
			.attr("data-title", state.rule.name + ": " + state.rule.title)
			.text(state.rule.name)
			.on("mouseover", function () {
				let cx = d3.event.pageX + 5,
					cy = d3.event.pageY - 30;
				let title = this.dataset.title;
				d3.select(".board")
					.text(title)
					.style("top", cy + "px")
					.style("left", cx + "px")
					.style("display", "block");
			})
			.on("mouseout", function () {
				d3.select(".board")
					.style("display", "none");
			});
		// добавляем путь: график
		svg.append("g").append("path")
			.attr("d", line(this.points))
			.classed("map", true)
			.style("fill", "none")
			.style("stroke", "black")
			.style("stroke-width", 2);
		// добавляем точки
		let limits = this._limits,
			chart = this;
		svg.selectAll("g.map")
			.data(this.points)
			.enter()
			.append("line")
			.filter(function (d) { return d != null && !d[2]; })
			.attr("x1", function (d) {
				if (d != null) return (scaleX(d[0]) - 5);
			})
			.attr("y1", function (d) {
				if (d != null) return (scaleY(d[1]) - 5);
			})
			.attr("x2", function (d) {
				if (d != null) return (scaleX(d[0]) + 5);
			})
			.attr("y2", function (d) {
				if (d != null) return (scaleY(d[1]) + 5);
			})
			.attr("stroke", "red")
			.attr("stroke-width", 5)
			.classed("xpoint", true);
		svg.selectAll("g.map")
			.data(this.points)
			.enter()
			.append("line")
			.filter(function (d) { return d != null && !d[2]; })
			.attr("x1", function (d) {
				if (d != null) return (scaleX(d[0]) + 5);
			})
			.attr("y1", function (d) {
				if (d != null) return (scaleY(d[1]) - 5);
			})
			.attr("x2", function (d) {
				if (d != null) return (scaleX(d[0]) - 5);
			})
			.attr("y2", function (d) {
				if (d != null) return (scaleY(d[1]) + 5);
			})
			.attr("stroke", "red")
			.attr("stroke-width", 5)
			.classed("xpoint", true);
		svg.selectAll("g.map")
			.data(this.points)
			.enter()
			.append("line")
			.filter(function (d) { return d != null && !d[2]; })
			.attr("x1", function (d) {
				if (d != null) return scaleX(d[0]);
			})
			.attr("y1", function (d) {
				if (d != null) return scaleY(d[1]);
			})
			.attr("x2", function (d) {
				if (d != null) return scaleX(d[0]);
			})
			.attr("y2", function (d) {
				if (d != null) return yAxisLength;
			})
			.attr("stroke", "red")
			.attr("stroke-dasharray", "10 5")
			.attr("stroke-width", 1)
			.classed("xpoint", true);
		svg.selectAll("g.map")
			.data(this.points)
			.enter()
			.append("rect")
			.filter(function (d) { return d != null; })
			.attr("x", function (d) {
				if (d != null) return (scaleX(d[0]) - 3);
			})
			.attr("y", function (d) {
				if (d != null) return (scaleY(d[1]) - 3);
			})
			.attr("title", function (d) {
				if (d != null) return d[0];
			})
			.style("fill", function (d) {
				if (d != null && !d[2]) return "red";
			})
			.classed("point", true)
			.attr("width", 7)
			.attr("height", 7)
			.attr("fill", "black")
			.attr("data-i", function (d) { if (d != null) return d[0] })
			.attr("data-v", function (d) { if (d != null) return d[1] })
			.attr("data-id", function (d) { if (d != null) return d[3] })
			.on("mouseover", function () {
				// событие при наведении мыши на точку
				if (!d3.event.altKey) {
					let cx = d3.event.pageX + 5,
						cy = d3.event.pageY - 30,
						vx = d3.event.view.innerWidth;
					let i = this.dataset.i,
						v = this.dataset.v,
						id = this.dataset.id;
					v = getValue(v, limits, i, id);
					d3.selectAll(".vline" + i)
						.style("stroke-opacity", "1");
					d3.selectAll(".line" + i)
						.style("background", "#BFBFBF");
					let board = d3.select(".board");
					board.html(v)
						.style("top", cy + "px")
						.style("left", cx + "px")
						.style("display", "block");
					let bx = board.style("width");
					bx = bx.replace("px", "");
					if ((cx + parseInt(bx) + 30) >= vx)
						board.style("left", (cx - parseInt(bx) - 30) + "px");
				}
			})
			.on("mouseout", function () {
				// событие при уходе курсора мыши с точки
				let i = this.dataset.i;
				d3.selectAll(".vline" + i)
					.style("stroke-opacity", "0.2");
				d3.selectAll(".line" + i)
					.style("background", "#FFFFFF");
				d3.select(".board")
					.style("display", "none");
			})
			.on("click", function () {
				// событие на клик по точке
				if (chart.clickEvent) {
					let i = this.dataset.i;
					console.log('click point' + i);
					// отключаем точку
					chart.points[i - 1][2] = !chart.points[i - 1][2];
					// функция вызова перерисовки графика
					chart.clickCall(i, chart.points[i - 1][1]);
					//d3.select(this).style("color", 'gray');
					//$(".line").removeClass("curLine");
					//let destination = $(".line"+i).addClass("curLine").offset().top - d3.event.y + 10;
					//$("html, body").animate({ scrollTop: destination },"slow");
				}
			});

		return this;
	}
	// проверка правил
	check_rules(rules) {
		let pass = true,
			rule = "",
			tmp = 0,
			points = [],
			rule2 = { up: [], down: [] },
			rule3 = { up: [], down: [] },
			rule4 = [],
			rule5 = [],
			rule5_prev = null,
			//rule6={up: [], upPrev: null, down: [], downPrev: null},
			rule6 = [],
			rule7_prev = null;
		//функция проверки правила 6
		function check_rule6() {
			let up = [],
				down = [],
				prevUp = null,
				prevDown = null,
				prev = null,
				res = false;

			for (let a1 = rule6.length - 1; a1 >= 0; a1--) {
				for (let a2 = rule6.length - 1; a2 >= 0; a2--) {
					if (a2 == a1) continue;
					up = [],
						down = [],
						prevUp = null,
						prevDown = null,
						prev = null,
						res = false;
					for (let i = 0; i < rule6.length; i++) {
						if (i == a1 && rule6.length > 9) continue;
						if (i == a2 && rule6.length > 8) continue;
						if (prev == null)
							prev = rule6[i];
						if (prevUp == null && prev < rule6[i]) {
							up.push(1);
							prevUp = rule6[i];
						} else {
							if (prevUp < rule6[i]) {
								up.push(1);
								prevUp = rule6[i];
							}
						}
						if (prevDown == null && prev > rule6[i]) {
							down.push(1);
							prevDown = rule6[i];
						} else {
							if (prevDown > rule6[i]) {
								down.push(1);
								prevDown = rule6[i];
							}
						}
					}
					res = up.reduce(sum_array, 0) == 8;
					if (res) return !res;
					res = down.reduce(sum_array, 0) == 8;
					if (res) return !res;
					if (rule6.length == 8) break;
				}
				if (rule6.length == 9) break;
			}
			return !res;
		}
		// сумма элементов массива
		function sum_array(sum, current) {
			return sum + current;
		}
		// получение крайних точек
		function get_points(map, i, count) {
			let cnt = 0,
				p;
			points = [i + 1];
			for (p = i; p >= 0 && cnt < count; p--) {
				if (map[p] != null)
					cnt++;
			}
			points.unshift(p + 2);
		};
		for (let i = 0; i < this.points.length; i++) {
			if (this.points[i] == null || !this.points[i][2])
				continue;
			if (rules[1]) {
				let limit;
				if (this.mapLine.tLine.points.length > 2)
					limit = this.mapLine.tLine.points[i][1];
				else
					limit = this.mapLine.tLine.points[0][1];
				if (this.points[i][1] >= limit) {
					pass = false;
					rule = "rule1";
					points = [i + 1, i + 1];
				}
				if (!pass) break;
				if (this.mapLine.bLine.points.length > 2)
					limit = this.mapLine.bLine.points[i][1];
				else
					limit = this.mapLine.bLine.points[0][1];
				if (this.points[i][1] <= limit) {
					pass = false;
					rule = "rule1";
					points = [i + 1, i + 1];
				}
				if (!pass) break;
			}
			if (rules[2]) {
				let limit;
				if (this.mapLine.sig2Line1.points.length > 2)
					limit = this.mapLine.sig2Line1.points[i][1];
				else
					limit = this.mapLine.sig2Line1.points[0][1];
				if (this.points[i][1] >= limit) {
					rule2.up.push(1);
					pass = !(rule2.up.reduce(sum_array, 0) == 2 && rule2.up.length <= 3)
				} else {
					rule2.up.push(0);
				}
				if (!pass) {
					rule = "rule2";
					get_points(this.points, i, 3);
					break;
				}
				if (this.mapLine.sig2Line2.points.length > 2)
					limit = this.mapLine.sig2Line2.points[i][1];
				else
					limit = this.mapLine.sig2Line2.points[0][1];
				if (this.points[i][1] <= limit) {
					rule2.down.push(1);
					pass = !(rule2.down.reduce(sum_array, 0) == 2 && rule2.down.length <= 3)
				} else {
					rule2.down.push(0);
				}
				if (!pass) {
					rule = "rule2";
					get_points(this.points, i, 3);
					break;
				}
				if (rule2.up.length == 3)
					rule2.up.shift();
				if (rule2.down.length == 3)
					rule2.down.shift();
			}
			if (rules[3]) {
				let limit;
				if (this.mapLine.sig1Line1.points.length > 2)
					limit = this.mapLine.sig1Line1.points[i][1];
				else
					limit = this.mapLine.sig1Line1.points[0][1];
				if (this.points[i][1] >= limit) {
					rule3.up.push(1);
					pass = !(rule3.up.reduce(sum_array, 0) == 4 && rule3.up.length <= 5)
				} else {
					rule3.up.push(0);
				}
				if (!pass) {
					rule = "rule3";
					get_points(this.points, i, 5);
					break;
				}
				if (this.mapLine.sig1Line2.points.length > 2)
					limit = this.mapLine.sig1Line2.points[i][1];
				else
					limit = this.mapLine.sig1Line2.points[0][1];
				if (this.points[i][1] <= limit) {
					rule3.down.push(1);
					pass = !(rule3.down.reduce(sum_array, 0) == 4 && rule3.down.length <= 5)
				} else {
					rule3.down.push(0);
				}
				if (!pass) {
					rule = "rule3";
					get_points(this.points, i, 5);
					break;
				}
				if (rule3.up.length == 5)
					rule3.up.shift();
				if (rule3.down.length == 5)
					rule3.down.shift();
			}
			if (rules[4]) {
				let limit = this.mapLine.cLine.points[0][1];
				if (this.points[i][1] >= limit) {
					rule4.push(1);
					pass = !(rule4.reduce(sum_array, 0) == 7 && rule4.length == 7)
				}
				if (!pass) {
					rule = "rule4";
					get_points(this.points, i, 7);
					break;
				}
				if (this.points[i][1] <= limit) {
					rule4.push(-1);
					pass = !(rule4.reduce(sum_array, 0) == -7 && rule4.length == 7)
				}
				if (!pass) {
					rule = "rule4";
					get_points(this.points, i, 7);
					break;
				}
				if (this.points[i][1] == limit) {
					rule4.push(0);
				}
				if (rule4.length == 7)
					rule4.shift();
			}
			if (rules[5]) {
				if (rule5_prev != null) {
					if (this.points[i][1] > rule5_prev) {
						rule5.push(1);
						pass = !(rule5.reduce(sum_array, 0) == 5 && rule5.length == 5)
					}
					if (!pass) {
						rule = "rule5";
						get_points(this.points, i, 6);
						break;
					}
					if (this.points[i][1] < rule5_prev) {
						rule5.push(-1);
						pass = !(rule5.reduce(sum_array, 0) == -5 && rule5.length == 5)
					}
					if (!pass) {
						rule = "rule5";
						get_points(this.points, i, 6);
						break;
					}
					if (this.points[i][1] == rule5_prev) {
						rule5.push(0);
					}
					if (rule5.length == 5)
						rule5.shift();
				}
				rule5_prev = this.points[i][1];
			}
			if (rules[6]) {
				rule6.push(this.points[i][1]);
				if (rule6.length >= 8) {
					pass = check_rule6();
				}
				if (!pass) {
					rule = "rule6";
					get_points(this.points, i, 10);
					break;
				}
				if (rule6.length == 10)
					rule6.shift();
			}
			if (rules[7]) {
				if (rule7_prev != null) {
					let diff;
					if (this.mapLine.sig1Line1.points.length > 2)
						diff = this.mapLine.sig1Line1.points[i][1] - this.mapLine.cLine.points[0][1];
					else
						diff = this.mapLine.sig1Line1.points[0][1] - this.mapLine.cLine.points[0][1];
					if ((Math.abs(this.points[i][1] - rule7_prev) / diff) >= 4) {
						pass = false;
						rule = "rule7";
						points = [i, i + 1];
						break;
					}
				}
				rule7_prev = this.points[i][1];
			}
		}
		if (pass)
			return { text: "Предсказуемый", color: "green", line: this.mapLine.tLine.color, rule: {}, points: [] };
		else
			return { text: "Непредсказуемый!", color: "red", line: this.mapLine.tLine.color, rule: chartRules[rule], points: points };
	}
}
// класс x карты
class xMap {
	// конструктор
	constructor(source, width, height) {
		this.maps = {};
		this.maps[X_MAP] = new map(source[0], width, height);
		this.maps[MR_MAP] = new map(source[1], width, height);
        this.hideMinus = false;
	}
	// рассчетная функция для x - mR карты
	calc(limits = new limitsClass, fix_limit = false) {
		let prev_value = null,
			sum = 0,
			sum2 = 0,
			value = 0,
			value2 = 0,
			count = 0,
			count2 = 0,
			max = this.maps[X_MAP].max_y,
			max2 = 0,
			min = this.maps[X_MAP].min_y, 
			min2 = null,
			point = 0,
			sigma = 0,
			e_count = this.maps[X_MAP].max_x;
            // TODO: max_x может не быть равным кол-во точек!

		console.log(this);

		for (let i = 1; i <= e_count; i++) {
			if (this.maps[X_MAP].points[i - 1][2]) {
				value = this.maps[X_MAP].points[i - 1][1];
				if (prev_value != null) {
					value2 = Math.abs(prev_value - value);
					if (min2 == null)
						min2 = value2;
					if (value2 > max2)
						max2 = value2;
					if (value2 < min2)
						min2 = value2;
					//if (i<=limit_points)
					{
						sum2 += value2;
						count2++;
					}
					this.maps[MR_MAP].points.push([i, value2]);
				}
				prev_value = value;
				//if (i<=limit_points)
				{
					sum += value;
					count++;
				}
			}
		}
		console.log(fix_limit);
		if (fix_limit) {
			point = limits.middle;
			this.maps[X_MAP].mapLine.cLine.points = [[1, point], [e_count, point]];
			point = limits.top;
			this.maps[X_MAP].mapLine.tLine.points = [[1, point], [e_count, point]];
			if (point > max)
				max = point;
			point = limits.sig1top;
			this.maps[X_MAP].mapLine.sig1Line1.points = [[1, point], [e_count, point]];
			point = limits.sig2top;
			this.maps[X_MAP].mapLine.sig2Line1.points = [[1, point], [e_count, point]];
			point = limits.bottom;
			if (this.hideMinus && point < 0)
				point = 0;
			this.maps[X_MAP].mapLine.bLine.points = [[1, point], [e_count, point]];
			if (point < min)
				min = point;
			point = limits.sig1bottom;
			if (this.hideMinus && point < 0)
				point = 0;
			this.maps[X_MAP].mapLine.sig1Line2.points = [[1, point], [e_count, point]];
			point = limits.sig2bottom;
			if (this.hideMinus && point < 0)
				point = 0;
			this.maps[X_MAP].mapLine.sig2Line2.points = [[1, point], [e_count, point]];

			//расчеты mr карты
			point = roundNumber(sum2 / count2, 1);
			this.maps[MR_MAP].mapLine.cLine.points = [[1, point], [e_count, point]];

			point = D4[0] * this.maps[MR_MAP].mapLine.cLine.points[0][1];
			this.maps[MR_MAP].mapLine.tLine.points = [[1, point], [e_count, point]];
			if (point > max2)
				max2 = point;
			this.maps[MR_MAP].mapLine.bLine.points = [[1, 0], [e_count, 0]];
			sigma = (this.maps[MR_MAP].mapLine.tLine.points[0][1] - this.maps[MR_MAP].mapLine.cLine.points[0][1]) / 3;

			point = this.maps[MR_MAP].mapLine.cLine.points[0][1] + sigma;
			this.maps[MR_MAP].mapLine.sig1Line1.points = [[1, point], [e_count, point]];

			point = this.maps[MR_MAP].mapLine.cLine.points[0][1] + sigma * 2;
			this.maps[MR_MAP].mapLine.sig2Line1.points = [[1, point], [e_count, point]];

			point = this.maps[MR_MAP].mapLine.cLine.points[0][1] - sigma;
			if (this.hideMinus && point < 0)
				point = 0;
			this.maps[MR_MAP].mapLine.sig1Line2.points = [[1, point], [e_count, point]];

			point = this.maps[MR_MAP].mapLine.cLine.points[0][1] - sigma * 2;
			if (this.hideMinus && point < 0)
				point = 0;
			this.maps[MR_MAP].mapLine.sig2Line2.points = [[1, point], [e_count, point]];
			if (this.hideMinus && min2 < 0)
				min2 = 0;
		} else {
			point = roundNumber(sum / count, 1);
			this.maps[X_MAP].mapLine.cLine.points = [[1, point], [e_count, point]];
			limits.middle = point;
			point = roundNumber(sum2 / count2, 1);
			this.maps[MR_MAP].mapLine.cLine.points = [[1, point], [e_count, point]];
			point = this.maps[X_MAP].mapLine.cLine.points[0][1] + E2 * this.maps[MR_MAP].mapLine.cLine.points[0][1];
			this.maps[X_MAP].mapLine.tLine.points = [[1, point], [e_count, point]];
			limits.top = point;
			if (point > max)
				max = point;
			point = this.maps[X_MAP].mapLine.cLine.points[0][1] + E2 * this.maps[MR_MAP].mapLine.cLine.points[0][1] / 3;
			this.maps[X_MAP].mapLine.sig1Line1.points = [[1, point], [e_count, point]];
			limits.sig1top = point;
			point = this.maps[X_MAP].mapLine.cLine.points[0][1] + E2 * this.maps[MR_MAP].mapLine.cLine.points[0][1] / 3 * 2;
			this.maps[X_MAP].mapLine.sig2Line1.points = [[1, point], [e_count, point]];
			limits.sig2top = point;
			point = this.maps[X_MAP].mapLine.cLine.points[0][1] - E2 * this.maps[MR_MAP].mapLine.cLine.points[0][1];
			if (this.hideMinus && point < 0)
				point = 0;
			this.maps[X_MAP].mapLine.bLine.points = [[1, point], [e_count, point]];
			limits.bottom = point;
			if (point < min)
				min = point;
			point = this.maps[X_MAP].mapLine.cLine.points[0][1] - E2 * this.maps[MR_MAP].mapLine.cLine.points[0][1] / 3;
			if (this.hideMinus && point < 0)
				point = 0;
			this.maps[X_MAP].mapLine.sig1Line2.points = [[1, point], [e_count, point]];
			limits.sig1bottom = point;
			point = this.maps[X_MAP].mapLine.cLine.points[0][1] - E2 * this.maps[MR_MAP].mapLine.cLine.points[0][1] / 3 * 2;
			if (this.hideMinus && point < 0)
				point = 0;
			this.maps[X_MAP].mapLine.sig2Line2.points = [[1, point], [e_count, point]];
			limits.sig2bottom = point;
			//расчеты mr карты
			point = D4[0] * this.maps[MR_MAP].mapLine.cLine.points[0][1];
			this.maps[MR_MAP].mapLine.tLine.points = [[1, point], [e_count, point]];
			if (point > max2)
				max2 = point;
			this.maps[MR_MAP].mapLine.bLine.points = [[1, 0], [e_count, 0]];
			sigma = (this.maps[MR_MAP].mapLine.tLine.points[0][1] - this.maps[MR_MAP].mapLine.cLine.points[0][1]) / 3;
			point = this.maps[MR_MAP].mapLine.cLine.points[0][1] + sigma;
			this.maps[MR_MAP].mapLine.sig1Line1.points = [[1, point], [e_count, point]];
			point = this.maps[MR_MAP].mapLine.cLine.points[0][1] + sigma * 2;
			this.maps[MR_MAP].mapLine.sig2Line1.points = [[1, point], [e_count, point]];
			point = this.maps[MR_MAP].mapLine.cLine.points[0][1] - sigma;
			if (this.hideMinus && point < 0)
				point = 0;
			this.maps[MR_MAP].mapLine.sig1Line2.points = [[1, point], [e_count, point]];
			point = this.maps[MR_MAP].mapLine.cLine.points[0][1] - sigma * 2;
			if (this.hideMinus && point < 0)
				point = 0;
			this.maps[MR_MAP].mapLine.sig2Line2.points = [[1, point], [e_count, point]];
			if (this.hideMinus && min2 < 0)
				min2 = 0;
		}

		this.maps[X_MAP].max_y = Math.ceil(max);
		this.maps[MR_MAP].max_y = Math.ceil(max2);
		this.maps[X_MAP].min_y = Math.floor(min);
		this.maps[MR_MAP].min_y = Math.floor(min2);

		let range = (limits.top - limits.middle) / 5;
		limits.limit1top = limits.middle + range;
		limits.limit2top = limits.limit1top + (2 * range);
		limits.limit1bottom = limits.middle - range;
		limits.limit2bottom = limits.limit1bottom - (2 * range);

		return this;
	}
	points(points, grouped = false, max_point, min_point) {

		if (points.length === 1) {
			points.push([2, points[0][1]]);
		}
		if (grouped) {
			for (let i in points) {
				this.maps[X_MAP].points = this.maps[X_MAP].points.concat(points[i].items);
				this.maps[X_MAP].max_x += points[i].count;
			}
		} else {
			this.maps[X_MAP].points = points;
			this.maps[X_MAP].max_x = points.length;
            // TODO: max_x может не быть равным кол-во точек!
		}
		if (max_point !== undefined) {
			this.maps[X_MAP].max_y = max_point;
		} else {
            for (let i in this.maps[X_MAP].points) {
                if (this.maps[X_MAP].points[i][1] > this.maps[X_MAP].max_y)
                    this.maps[X_MAP].max_y = points[i][1];
            }
		}
		if (min_point !== undefined) {
			this.maps[X_MAP].min_y = min_point;
		} else {
            for (let i in this.maps[X_MAP].points) {
                if (this.maps[X_MAP].points[i][1] < this.maps[X_MAP].min_y)
                    this.maps[X_MAP].min_y = points[i][1];
            }
		}

		return this;
	}
	// получение карты
	get_map(map_name) {
		if (this.maps[map_name])
			return this.maps[map_name];
		return undefined;
	}
    // показывать отрицательные значения
    setHideMinus(enable = false) {
        this.hideMinus = enable;
        return this;
    }
}
// класс mx карты
class mxMap {
	// конструктор
	constructor(source, width, height) {
		this.maps = {};
		this.maps[MX_MAP] = new map(source[0], width, height);
		this.maps[R_MAP] = new map(source[1], width, height);
		this.q_count = 0;
        // TODO: показ минусов - обработка
        this.hideMinus = false;
	}
	// рассчетная функция для mx - R карты
	calc(limits = new limitsClass, fix_limit = false) {
		let prev_value = null,
			sum = 0,
			sum2 = 0,
			value = 0,
			value2 = 0,
			count = 0,
			count2 = 0,
			max = this.maps[MX_MAP].max_y,
			max2 = 0,
			min = this.maps[MX_MAP].min_y,
			min2 = null,
			point = 0,
			sigma = 0,
			e_count = this.maps[MX_MAP].max_x;

		for (let i = 1; i <= e_count; i++) {
			if (this.maps[MX_MAP].points[i - 1][2]) {
				value = this.maps[MX_MAP].points[i - 1][1];
				value2 = this.maps[R_MAP].points[i - 1][1];
				//if (i<=limit_points)
				{
					sum += value;
					sum2 += value2;
					count++;
				}
			}
		}
		point = roundNumber(sum / count, 1);
		this.maps[MX_MAP].mapLine.cLine.points = [[1, point], [e_count, point]];
		console.log(point);
		limits.middle = point;
		point = roundNumber(sum2 / count, 1);
		this.maps[R_MAP].mapLine.cLine.points = [[1, point], [e_count, point]];
		point = this.maps[MX_MAP].mapLine.cLine.points[0][1] + A2[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1];
		this.maps[MX_MAP].mapLine.tLine.points = [[1, point], [e_count, point]];
		limits.top = point;
		if (point > max)
			max = point;
		point = this.maps[MX_MAP].mapLine.cLine.points[0][1] + A2[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] / 3;
		this.maps[MX_MAP].mapLine.sig1Line1.points = [[1, point], [e_count, point]];
		limits.sig1top = point;
		point = this.maps[MX_MAP].mapLine.cLine.points[0][1] + A2[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] / 3 * 2;
		this.maps[MX_MAP].mapLine.sig2Line1.points = [[1, point], [e_count, point]];
		limits.sig2top = point;
		point = this.maps[MX_MAP].mapLine.cLine.points[0][1] - A2[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1];
		/*if (point < 0)
			point = 0;*/
		this.maps[MX_MAP].mapLine.bLine.points = [[1, point], [e_count, point]];
		limits.bottom = point;
		if (point < min)
			min = point;
		point = this.maps[MX_MAP].mapLine.cLine.points[0][1] - A2[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] / 3;
		/*if (point < 0)
			point = 0;*/
		this.maps[MX_MAP].mapLine.sig1Line2.points = [[1, point], [e_count, point]];
		limits.sig1bottom = point;
		point = this.maps[MX_MAP].mapLine.cLine.points[0][1] - A2[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] / 3 * 2;
		/*if (point < 0)
			point = 0;*/
		this.maps[MX_MAP].mapLine.sig2Line2.points = [[1, point], [e_count, point]];
		limits.sig2bottom = point;
		point = D4[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1];
		this.maps[R_MAP].mapLine.tLine.points = [[1, point], [e_count, point]];
		if (point > max2)
			max2 = point;
		point = this.maps[R_MAP].mapLine.cLine.points[0][1] + (D4[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] - this.maps[R_MAP].mapLine.cLine.points[0][1]) / 3;
		this.maps[R_MAP].mapLine.sig1Line1.points = [[1, point], [e_count, point]];
		point = this.maps[R_MAP].mapLine.cLine.points[0][1] + (D4[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] - this.maps[R_MAP].mapLine.cLine.points[0][1]) / 3 * 2;
		this.maps[R_MAP].mapLine.sig2Line1.points = [[1, point], [e_count, point]];
		point = D3[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1];
		this.maps[R_MAP].mapLine.bLine.points = [[1, point], [e_count, point]];
		if (point < min2)
			min2 = point;
		point = this.maps[R_MAP].mapLine.cLine.points[0][1] + (D3[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] - this.maps[R_MAP].mapLine.cLine.points[0][1]) / 3;
		this.maps[R_MAP].mapLine.sig1Line2.points = [[1, point], [e_count, point]];
		point = this.maps[R_MAP].mapLine.cLine.points[0][1] + (D3[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] - this.maps[R_MAP].mapLine.cLine.points[0][1]) / 3 * 2;
		this.maps[R_MAP].mapLine.sig2Line2.points = [[1, point], [e_count, point]];

		this.maps[MX_MAP].max_y = Math.ceil(max);
		this.maps[R_MAP].max_y = Math.ceil(max2);
		this.maps[MX_MAP].min_y = Math.floor(min);
		this.maps[R_MAP].min_y = Math.floor(min2);

		let range = (limits.top - limits.middle) / 5;
		limits.limit1top = limits.middle + range;
		limits.limit2top = limits.limit1top + (2 * range);
		limits.limit1bottom = limits.middle - range;
		limits.limit2bottom = limits.limit1bottom - (2 * range);

		console.log(limits);

		return this;
	}
	// точки
	points(points, grouped = false, max_point, min_point) {

		let point = 0,
			cnt = 0,
			max = 0,
			min = 0,
			max_y = 0,
			min_y = 0,
			p = 0;

		console.log(points);

		for (let i in points) {
			point = 0;
			max = points[i][1][0];
			min = points[i][1][0];
			cnt = points[i][1].length;
			for (let j in points[i][1]) {
				point += points[i][1][j];
				if (points[i][1][j] > max)
					max = points[i][1][j];
				if (points[i][1][j] < min)
					min = points[i][1][j];
			}
			if (p == 0) {
				max_y = point / cnt;
				min_y = point / cnt;
			}
			if (min_y > (point / cnt))
				min_y = point / cnt;
			if (max_y < (point / cnt))
				max_y = point / cnt;
			p++;
			this.maps[MX_MAP].points.push([p, point / cnt, points[i][2], points[i][3]]);
			this.maps[R_MAP].points.push([p, max - min, points[i][2], points[i][3]]);
		}

		this.q_count = cnt;

		this.maps[MX_MAP].max_x = p;
		this.maps[MX_MAP].max_y = max_y;
		this.maps[MX_MAP].min_y = min_y;

		console.log(this);

		return this;
	}
	// получение карты
	get_map(map_name) {
		if (this.maps[map_name])
			return this.maps[map_name];
		return undefined;
	}
    // показывать отрицательные значения
    setHideMinus(enable = false) {
        this.hideMinus = enable;
        return this;
    }
}
// класс cx карты
class cxMap {
	// конструктор
	constructor(source, width, height) {
		this.maps = {};
		this.maps[CX_MAP] = new map(source[0], width, height);
		this.maps[R_MAP] = new map(source[1], width, height);
		this.q_count = 0;
	}
	// рассчетная функция для mx - R карты
	calc(limits = new limitsClass, fix_limit = false) {
		let prev_value = null,
			sum = 0,
			sum2 = 0,
			value = 0,
			value2 = 0,
			count = 0,
			count2 = 0,
			max = this.maps[CX_MAP].max_y,
			max2 = 0,
			min = this.maps[CX_MAP].min_y,
			min2 = null,
			point = 0,
			sigma = 0,
			e_count = this.maps[CX_MAP].max_x;

		for (let i = 1; i <= e_count; i++) {
			if (this.maps[CX_MAP].points[i - 1][2]) {
				value = this.maps[CX_MAP].points[i - 1][1];
				value2 = this.maps[R_MAP].points[i - 1][1];
				//if (i<=limit_points)
				{
					sum += value;
					sum2 += value2;
					count++;
				}
			}
		}
		point = roundNumber(sum / count, 1);
		this.maps[CX_MAP].mapLine.cLine.points = [[1, point], [e_count, point]];
		console.log(point);
		limits.middle = point;
		point = roundNumber(sum2 / count, 1);
		this.maps[R_MAP].mapLine.cLine.points = [[1, point], [e_count, point]];
		point = this.maps[CX_MAP].mapLine.cLine.points[0][1] + A4[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1];
		this.maps[CX_MAP].mapLine.tLine.points = [[1, point], [e_count, point]];
		limits.top = point;
		if (point > max)
			max = point;
		point = this.maps[CX_MAP].mapLine.cLine.points[0][1] + A4[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] / 3;
		this.maps[CX_MAP].mapLine.sig1Line1.points = [[1, point], [e_count, point]];
		limits.sig1top = point;
		point = this.maps[CX_MAP].mapLine.cLine.points[0][1] + A4[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] / 3 * 2;
		this.maps[CX_MAP].mapLine.sig2Line1.points = [[1, point], [e_count, point]];
		limits.sig2top = point;
		point = this.maps[CX_MAP].mapLine.cLine.points[0][1] - A4[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1];
		if (point < 0)
			point = 0;
		this.maps[CX_MAP].mapLine.bLine.points = [[1, point], [e_count, point]];
		limits.bottom = point;
		if (point < min)
			min = point;
		point = this.maps[CX_MAP].mapLine.cLine.points[0][1] - A4[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] / 3;
		if (point < 0)
			point = 0;
		this.maps[CX_MAP].mapLine.sig1Line2.points = [[1, point], [e_count, point]];
		limits.sig1bottom = point;
		point = this.maps[CX_MAP].mapLine.cLine.points[0][1] - A4[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] / 3 * 2;
		if (point < 0)
			point = 0;
		this.maps[CX_MAP].mapLine.sig2Line2.points = [[1, point], [e_count, point]];
		limits.sig2bottom = point;
		point = D4[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1];
		this.maps[R_MAP].mapLine.tLine.points = [[1, point], [e_count, point]];
		if (point > max2)
			max2 = point;
		point = this.maps[R_MAP].mapLine.cLine.points[0][1] + (D4[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] - this.maps[R_MAP].mapLine.cLine.points[0][1]) / 3;
		this.maps[R_MAP].mapLine.sig1Line1.points = [[1, point], [e_count, point]];
		point = this.maps[R_MAP].mapLine.cLine.points[0][1] + (D4[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] - this.maps[R_MAP].mapLine.cLine.points[0][1]) / 3 * 2;
		this.maps[R_MAP].mapLine.sig2Line1.points = [[1, point], [e_count, point]];
		point = D3[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1];
		this.maps[R_MAP].mapLine.bLine.points = [[1, point], [e_count, point]];
		if (point < min2)
			min2 = point;
		point = this.maps[R_MAP].mapLine.cLine.points[0][1] + (D3[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] - this.maps[R_MAP].mapLine.cLine.points[0][1]) / 3;
		this.maps[R_MAP].mapLine.sig1Line2.points = [[1, point], [e_count, point]];
		point = this.maps[R_MAP].mapLine.cLine.points[0][1] + (D3[this.q_count - 1] * this.maps[R_MAP].mapLine.cLine.points[0][1] - this.maps[R_MAP].mapLine.cLine.points[0][1]) / 3 * 2;
		this.maps[R_MAP].mapLine.sig2Line2.points = [[1, point], [e_count, point]];

		this.maps[CX_MAP].max_y = Math.ceil(max);
		this.maps[R_MAP].max_y = Math.ceil(max2);
		this.maps[CX_MAP].min_y = Math.floor(min);
		this.maps[R_MAP].min_y = Math.floor(min2);

		let range = (limits.top - limits.middle) / 5;
		limits.limit1top = limits.middle + range;
		limits.limit2top = limits.limit1top + (2 * range);
		limits.limit1bottom = limits.middle - range;
		limits.limit2bottom = limits.limit1bottom - (2 * range);

		console.log(limits);

		return this;
	}
	// точки
	points(points, grouped = false, max_point, min_point) {

		function compareNumeric(a, b) {
			if (a > b) return 1;
			if (a < b) return -1;
		}

		let point = 0,
			cnt = points[0][1].length,
			max = 0,
			min = 0,
			max_y = points[0][1][0],
			min_y = points[0][1][0],
			p = 0,
			cnum = 0,
			odd = false,
			arr = [];

		console.log(points);

		if (cnt % 2 == 0) {
			cnum = cnt / 2;
			odd = false
		} else {
			cnum = (cnt - 1) / 2;
			odd = true;
		}
		for (let i in points) {
			point = 0;
			max = points[i][1][0];
			min = points[i][1][0];
			arr = [];
			for (let j in points[i][1]) {
				arr.push(points[i][1][j]);
				if (points[i][1][j] > max)
					max = points[i][1][j];
				if (points[i][1][j] < min)
					min = points[i][1][j];
				if (points[i][1][j] > max_y)
					max_y = points[i][1][j];
				if (points[i][1][j] < min_y)
					min_y = points[i][1][j];
			}
			arr.sort(compareNumeric);
			if (odd) {
				point = arr[cnum];
			} else {
				point = (arr[cnum] + arr[cnum + 1]) / 2;
			}
			p++;
			this.maps[CX_MAP].points.push([p, point, points[i][2], points[i][3]]);
			this.maps[R_MAP].points.push([p, max - min, points[i][2], points[i][3]]);
		}

		this.q_count = cnt;

		this.maps[CX_MAP].max_x = p;
		this.maps[CX_MAP].max_y = max_y;
		this.maps[CX_MAP].min_y = min_y;

		console.log(this);

		return this;
	}
	// получение карты
	get_map(map_name) {
		if (this.maps[map_name])
			return this.maps[map_name];
		return undefined;
	}
}
// класс-прослойка контрольной карты
class controlChart {
	// конструктор
	constructor(type = X_MAP, source = [], width, height) {
		if (type == X_MAP || type == MR_MAP) {
			this.сс = new xMap(source, width, height);
		} else if (type == MX_MAP || type == R_MAP) {
			this.сс = new mxMap(source, width, height);
		} else if (type == CX_MAP) {
			this.сс = new cxMap(source, width, height);
		}
	}
	// функция, которая значение точки
	setValueFunc(func) {
		let chart = this;
		for (let i in this.сс.maps) {
			this.сс.maps[i].setGetValue(func);
			this.сс.maps[i].setClickCall(function (indx, val) {
				chart.calc(chart.limits, chart.fix_limit).paint(chart.scale, chart.ticks, chart.area, chart.rules, chart.legendOffset, chart.subline);
			});
		}
		return this;
	}
	// функция, которая задает функцию обработки наведения на дополнительную линию
	setSublineValueFunc(func) {
		for (let i in this.сс.maps) {
			this.сс.maps[i].setGetSublineValue(func);
		}
	}
	// установка события на клик по точке
	setClickFunc(func) {
		let chart = this;
		for (let i in this.сс.maps) {
			this.сс.maps[i].setClickCall(function (indx, val) {
				console.log(chart);
				chart.calc(chart.limits, chart.fix_limit).paint(chart.scale, chart.ticks, chart.area, chart.rules, chart.legendOffset, chart.subline);
				func(indx, val);
			});
		}
		return this;
	}
	setClickEvent(enable = true) {
		for (let i in this.сс.maps) {
			this.сс.maps[i].setClickEvent(enable);
		}
		return this;
	}
	// установка подписей осей
	setAxis() {
		let indx = 0;
		for (let i in this.сс.maps) {
			if (arguments.length >= (indx + 1)) {
				this.сс.maps[i].setAxis(arguments[indx]);
			}
			indx++;
		}
		return this;
	}
	// установка подписей осей
	setCaptions() {
		let indx = 0;
		for (let i in this.сс.maps) {
			if (arguments.length >= (indx + 1)) {
				this.сс.maps[i].setCaption(arguments[indx]);
			}
			indx++;
		}
		return this;
	}
	// установка точек графика
	points(points, grouped = false, max_point, min_point) {
		this.сс.points(points, grouped, max_point, min_point);

		/*
				if (points.length === 1) {
					points.push([2, points[0][1]]);
				}
				if (grouped) {
					for (let i in points) {
						this.сс.maps[X_MAP].points = this.сс.maps[X_MAP].points.concat(points[i].items);
						this.сс.maps[X_MAP].max_x+=points[i].count;
					}
				} else {
					this.сс.maps[X_MAP].points = points;
					this.сс.maps[X_MAP].max_x = points.length;
				}
				this.сс.maps[X_MAP].max_y = max_point;
				this.сс.maps[X_MAP].min_y = min_point;*/

		return this;
	}
	// метод вычисления контрольных пределов
	calc(limits = new limitsClass, fix_limit = false) {
		this.limits = limits;
		this.fix_limit = fix_limit;
		this.сс.calc(limits, fix_limit);
		return this;
	};
	// метод отрисовки графика
	paint(scale = 1, ticks = {}, area = undefined, rules = { 1: true, offset: 320 }, legendOffset = 100, subline = {}) {
		this.scale = scale;
		this.ticks = ticks;
		this.area = area;
		this.rules = rules;
		this.legendOffset = legendOffset;
		this.subline = subline;
		for (let i in this.сс.maps) {
			this.сс.maps[i].paint(scale, ticks, area, rules, legendOffset, subline);
		}
		return this;
	}
	// получение карты
	get_map(map_name) {
		return this.сс.get_map(map_name);
	}
    // показывать отрицательные значения
    setHideMinus(enable = false) {
		this.сс.setHideMinus(enable);
        return this;
    }
}