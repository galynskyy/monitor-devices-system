$(function(){
	ChartUptimeWeek();
});

function ChartUptimeWeek()
{
	var options = {
		chart: {
			renderTo: 'chart_uptime_week',
			type: 'spline'
		},
		title: {
			text: 'Аптайм за 24 часа'
		},
		xAxis: {
			title: {
				text: 'День',
				style: {
					'font-size': '16px',
				}
			},
			labels: {
				style: {
					'font-size': '14px'
				}
			},
			categories: [{}]
		},
		yAxis: {
			min: 0,
            max: 100,
			title: {
				text: 'Значение стабильности',
				style: {
					'font-size': '16px'
				}
			},
			labels: {
				style: {
					'font-size': '14px'
				}
			},
			gridLineDashStyle: 'longdash'
		},
		plotOptions: {
			series: {
				dataLabels: {
					enabled: true,
					formatter: function(){
						return this.y + " %";
					}
				}
			}
		},
		tooltip: {
			headerFormat: 'День: <b>{point.x}</b><br/>',
            pointFormat: 'Значение: <b>{point.y}</b> %'
		},
		series: [{}]
	};
	
	$.getJSON("../ajax/chart/uptime_week.php", function(response){
		options.series[0].name = "Стабильность";
		options.series[0].data = response.amount;
		options.series[0].color = "#F88C0D";
		options.xAxis.categories = response.time;
		var chart = new Highcharts.Chart(options);
	});
}