/**
 * 3D Pie chart
 * @author Peng Zhang 2012
 * https://github.com/leexr/3D-Pie-chart.gits
 * dount modify by parasaga lixr
 *
 */

Raphael.fn.dount = function(args) {
	var values = args.values;
	var colors = args.colors;
	var tooltips = args.tooltip;
	var dsize = args.dsize || 15;
	var doughnutSize = args.doughnutSize || 1.8;
	var labels = args.labels;

	var percentages = [];
	var sum = 0;
	for (var i = 0; i < values.length; i += 1)  {
		sum += values[i];
	}
	for (var j = 0; j < values.length; j += 1) {
		percentages.push(((values[j]/sum)*100).toFixed(2)+"%");
	}
	var paper = this;
	var r1, r2, cx, cy;
	var pie_half_width = paper.width/2,
	pie_half_height = paper.height,
	pie_radius = (pie_half_width > pie_half_height) ? 1/3*pie_half_height : 1/3*pie_half_width;

	r1 = pie_radius; 
	if(args.radius && args.radius < r1) {
		r1 = args.radius;
	}
	r2 = .8*r1;
	cx = paper.width/2; cy = paper.height/2;

	var nos = values.length;
	if (nos == 1) {
		var e_ = paper.ellipse(cx, cy+17, r1, r2).attr({
				fill: colors[0],
				stroke: "#999"
			});
			var e = paper.ellipse(cx, cy, r1, r2).attr({
				fill: colors[0],
				stroke: "#999",
				opacity: 1
			});
			var c = paper.ellipse(cx, cy, r1/doughnutSize, r2/doughnutSize).attr({
				stroke: "#999",
				fill: "#fff"
			});
			var arcTop = paper.path("M"+(cx+r1/doughnutSize)+","+(cy+17)+
						 "A"+r1/doughnutSize+","+r2/doughnutSize+",0,1,0,"+
						 (cx-r1/doughnutSize)+","+(cy+17)+
						 "L"+(cx-r1/doughnutSize)+","+cy+
						 "A"+r1/doughnutSize+","+r2/doughnutSize+",0,0,1,"+
						 (cx+r1/doughnutSize)+","+cy+"z").attr({stroke: "#111", fill: colors[0],opacity: 1});
			var arcBot = paper.path("M"+(cx+r1/doughnutSize)+","+(cy+17)+
						 "A"+r1/doughnutSize+","+r2/doughnutSize+",0,1,1,"+
						 (cx-r1/doughnutSize)+","+(cy+17)).attr({stroke: "#111", opacity:.2});

	} else {
		function create_label(rect,color,text) {
			var g = paper.set();
			g.push(paper.rect(0,0,10,10,5).attr({
				"stroke-width": "none",
				fill: color,
				x:rect.x,
				y:rect.y
			}));
			g.push(paper.text(50, 20, text).attr({
				'font-size': 14,
				x:rect.x + (rect.x < cx ? -10 : 15),
				y:rect.y + 5,
				'text-anchor': rect.x < cx ? "end" :"start"
			}));
			return g;
		}

		var x = cx + r1, y = cy, preAngle = 0;
		var ix = cx + r1/doughnutSize, iy = cy;
		var all_set = [];
		var topSet = paper.set();
		var angles = []; ttset = [];


		for (var i = 0; i < nos; i += 1) {
			var slice = paper.set();
			var startX = x, startY = y;
			var iStartX = ix, iStartY = iy;
			var ratio = values[i]/sum;
			var angle = 2*ratio*Math.PI, largeArc = 0;
			angles.push(angle);

			if (angle > Math.PI)	{
				largeArc = 1;
			}
			
			x = cx + r1*Math.cos(angle+preAngle);
			y = cy + r2*Math.sin(angle+preAngle);
			ix = cx + r1/doughnutSize*Math.cos(angle+preAngle);
			iy = cy + r2/doughnutSize*Math.sin(angle+preAngle);
			var centerX = (startX+x)/2, centerY = (startY+y)/2;

			var ttx = cx + (r1+45)*Math.cos(angle/2+preAngle),
				tty = cy + (r2+45)*Math.sin(angle/2+preAngle);

			if(labels[i]) {
				ttset.push(create_label({x: ttx, y: tty},colors[i],labels[i]));
			}
			
			var side4 = paper.path("M"+iStartX+","+iStartY),
				side3 = paper.path("M"+startX+","+startY),
				topside = paper.path("M"+x+","+y);

				var top_color =  Raphael.color(colors[i]);
				var dark = Raphael.rgb2hsl(top_color.r, top_color.g, top_color.b);
				dark.l *= 0.7;
				dark = Raphael.getRGB(dark).hex;

				side4 = paper.path("M"+iStartX+","+iStartY+
						"A"+r1/doughnutSize+","+r2/doughnutSize+",0,"+largeArc+",1,"+ix+","+iy+
						"L"+ix+","+(iy+dsize)+
						"A"+r1/doughnutSize+","+r2/doughnutSize+",0,"+largeArc+",0,"+iStartX+","+(iStartY+dsize)+"z").attr({
							fill:dark
						});

				side3 = paper.path("M"+startX+","+startY+
						"A"+r1+","+r2+",0,"+largeArc+",1,"+x+","+y+
						"L"+x+","+(y+dsize)+
						"A"+r1+","+r2+",0,"+largeArc+",0,"+startX+","+(startY+dsize)+"z").attr({
							fill:dark
						});

				topside = paper.path("M"+x+","+y+
						"A"+r1+","+r2+",0,"+largeArc+",0,"+startX+","+startY+
						"L"+iStartX+","+iStartY+
						"A"+r1/doughnutSize+","+r2/doughnutSize+",0,"+largeArc+",1,"+ix+","+iy+
						"z").attr({
							fill:colors[i]
						});
				slice.push(side3, side4, topside);

			topSet.push(topside);
			topSet.toFront();
			
			slice.attr({
				stroke: "none",
			});

			all_set.push(slice);
			preAngle += angle;
		}
	}
};