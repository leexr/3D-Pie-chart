3D Pie Chart
============

- Vector-based
- MIT licence

Example
-------

```javascript
    Raphael('wrapper', 700, 500).dount({
        values: [50, 50, 83, 23, 98,100],
        colors: ["#00ff00", "#ff0011", "#faf600", "#0079fa", "#fa8500","#ae1200"],
        labels: ["a - 87", "b - 136", "c - 77", "d - 120","e - 34","f - 66"],
        doughnut: true,
        radius: 80,
        dsize: 15,
        doughnutSize:2.0,
    });
    Raphael('wrapper2', 700, 500).division({
        values: [50, 50, 83, 23, 98,100],
        colors: ["#00ff00", "#ff0011", "#faf600", "#0079fa", "#fa8500","#ae1200"],
        labels: ["a - 87", "b - 136", "c - 77", "d - 120","e - 34","f - 66"],
        doughnut: true,
        radius: 80,
        dsize: 15,
        doughnutSize:2.0,
    });
```

Options
-------
* values
* colors
* radius

-------

![screenshot](https://github.com/leexr/3D-Pie-chart/blob/career_paint/screenshot/screenshot.jpg?raw=true "screenshot")