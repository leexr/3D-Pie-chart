3D Pie Chart
============

- Vector-based
- MIT licence

Example
-------

```javascript
Raphael('canvas', 700, 500).pie({
	values: [87, 134, 83, 23, 98],
	colors: ["#00ff00", "#ff0011", "#faf600", "#0079fa", "#fa8500"],
	tooltip: ["January - 87", "Feburary - 136", "March - 77", "April - 120","May - 34"],
	doughnut: true,
	radius: 200,
	tilt: "l",
	chartTitle: "Monthly Payment",
	legend: {
		display: true,
		items: ["January - 87", "Feburary - 136", "March - 77", "April - 120","May - 34"]
	}
});
```

Options
-------
* values
* colors
* tooltip: tooltip for each slice
* doughnut: pie chart [false] || doughnut chart [true]
* radius
* tile: adjust pie/doughnut chart viewing angle, options are __["x", "l", "m", "s"]__ (Extra, Large, Medium, Small), default is "l" large
* chartTitle
* legend: display true|false
		  legend items array

-------