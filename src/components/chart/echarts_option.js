let base64Blue = "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAArij59AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NzliYjQ5My03MjA0LTZmNDItYTY4Yi04MzczYWZmNTRjYTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkRCMDM4NzdGOURGMTFFODg3RDBDMkUxQThCNDgzRkEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkRCMDM4NzZGOURGMTFFODg3RDBDMkUxQThCNDgzRkEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTMyNjdiMWMtY2M5NS04NjRhLWFkOWItMzZmNDdlYzUzMWUwIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YmZhNzkzY2MtZjljYy1hODRhLWIzYzktMzY5NzkwODQwMzUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+1HdzxgAAAJBJREFUeNpiZAAC1y9zGIFUOxDnAjGIPRmIK3bzpPxnYoCAJCAuB2IuIOYE4jKoGANMgScDJvBEVvAOi4L3yAomAfF3JMnvUDGwgxigDtUBUslQ7jygAy/DTQBKygCpUCBWheIQqBgDI5BhD6S3AjE3mhu+ArE3yIRZWCQZoGKzQArUGHADNSYGAmBIKAAIMACFVhzisbWwhAAAAABJRU5ErkJggg==";
let base64Black = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAArij59AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NzliYjQ5My03MjA0LTZmNDItYTY4Yi04MzczYWZmNTRjYTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUI2MTAzMUVGOUNFMTFFODhFQjM5M0YxN0FGODRFRjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUI2MTAzMURGOUNFMTFFODhFQjM5M0YxN0FGODRFRjIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTMyNjdiMWMtY2M5NS04NjRhLWFkOWItMzZmNDdlYzUzMWUwIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YmZhNzkzY2MtZjljYy1hODRhLWIzYzktMzY5NzkwODQwMzUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+KZMU2AAAAJdJREFUeNpi/P//PwObqiYjAwNDOxDnAjGIPRmIK37dvv6fiQECkoC4HIi5gJgTiMugYgwwBZ4MmMATWcE7LAreIyuYBMTfkSS/Q8UYGEGOBAGgQ3WAVDJUwTygAy/DTQBKygCpUCBWheIQqBgDI6uKhj2Q3grE3Ghu+ArE3iAFN4EMNQbs4BYTHkkQUGNiIACGhAKAAAMAEcIfNXixmf4AAAAASUVORK5CYII=';
let base64Orange = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAArij59AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NzliYjQ5My03MjA0LTZmNDItYTY4Yi04MzczYWZmNTRjYTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjNFMjlEOEZGOUNGMTFFODg2MTM4MTU0MDA5M0VBRTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjNFMjlEOEVGOUNGMTFFODg2MTM4MTU0MDA5M0VBRTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTMyNjdiMWMtY2M5NS04NjRhLWFkOWItMzZmNDdlYzUzMWUwIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YmZhNzkzY2MtZjljYy1hODRhLWIzYzktMzY5NzkwODQwMzUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+dsm5ZgAAAJBJREFUeNpiZACCT2vcGIFUOxDnAjGIPRmIK/hCdv1nYoCAJCAuB2IuIOYE4jKoGANMgScDJvBEVvAOi4L3yAomAfF3JMnvUDGwgxigDtUBUslQ7jygAy/DTQBKygCpUCBWheIQqBgDI5BhD6S3AjE3mhu+ArE3yIRZWCQZoGKzQArUGHADNSYGAmBIKAAIMADAzB0PP2YgnwAAAABJRU5ErkJggg==';
let base64Red = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAArij59AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NzliYjQ5My03MjA0LTZmNDItYTY4Yi04MzczYWZmNTRjYTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REU3QTg2MkFGOUNGMTFFOEFGMzJEM0EyMTkxQkFEQUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REU3QTg2MjlGOUNGMTFFOEFGMzJEM0EyMTkxQkFEQUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NGRjMTRhYzQtMTA5Yy1jOTRiLWFlNzMtYTNlY2E2ZjZkYzljIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YmZhNzkzY2MtZjljYy1hODRhLWIzYzktMzY5NzkwODQwMzUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/B3/EQAAAJBJREFUeNpiZACC90FBjECqHYhzgRjEngzEFYLr1v1nYoCAJCAuB2IuIOYE4jKoGANMgScDJvBEVvAOi4L3yAomAfF3JMnvUDGwgxigDtUBUslQ7jygAy/DTQBKygCpUCBWgeIQqBgDI5BhD6S3AjE3mhu+ArE3yIRZWCQZoGKzQArUGHADNSYGAmBIKAAIMACNbRwazwTDbAAAAABJRU5ErkJggg==';
let echartsOption = {
	// 商务区安居指数
	norm1: {
	  	series: [{
		    name: '刻度',
		    type: 'gauge',
		    radius: '80%',
		    min:0,
		    max:100,
		    splitNumber: 5,
		    startAngle: 225,
		    endAngle: -45,
		    axisLine: {
		      show: true,
		      lineStyle: {
		        width: 1,
		        color: [[1,'rgba(0,0,0,0)']]
		      }
		    },//仪表盘轴线
		    axisLabel: {
		      	show: true,
		      	color:'#00ffff',
		      	distance:25,
		    },
		    axisTick: {
		      	show: true,
		       	splitNumber: 5,
		      	lineStyle: {width: 1},
		      	length: -8
		    },
		    splitLine: {
		      	show: true,
		      	length: -20,
		      	lineStyle: {color: '#fff'}
		    },
		    detail: {show: false},
		    pointer: {show: false}
	  	},
	    {
	      	type: 'gauge',
	      	radius: '50%',
	      	center: ['50%', '50%'],
	      	splitNumber: 0, //刻度数量
	      	startAngle: 225,
	      	endAngle: -45,
	      	axisLine: {
	        	show: true,
	        	lineStyle: {
	          	width: 15,
	          	color: [
	            [
	              0.9, new echarts.graphic.LinearGradient(
	              0, 0, 1, 0, [{
	              offset: 0,
	              color: '#5c53de'
	            },
	              {
	                offset: 1,
	                color: '#18c8ff'
	              }
	            ]
	              )
	            ],
	            [
	              1, '#413e54'
	            ]
	          ]
	        }
	      },
	      //分隔线样式。
	      splitLine: {show: false},
	      axisLabel: {show: false},
	      axisTick: {show: false},
	      pointer: {show: false},
	      title: {
	        show: true,
	        offsetCenter: [0, 0],
	        textStyle: {
	          color: '#fff',
	          fontSize: 20
	        }
	      },
	      detail: {
	        show: true,
	        offsetCenter: [0, 0],
	        color: '#0ddff3',
	    textStyle: {
	      fontSize: 24
	    }
	    },
	    data: [90]
	  }
	  ]
	},
	// 商务区实有人口
	totalPeople: {
		"grid": {
			"left": "11%",
			"top": "9",
			'right': "25%",
			"bottom": '10'
		},
		"tooltip": {
			"trigger": "item",
			"textStyle": {
				"fontSize": 12
			},
			"formatter": "{b0}:{c0}"
		},
		"xAxis": {
			"max": 300,
			"splitLine": {
				"show": false
			},
			"axisLine": {
				"show": false
			},
			"axisLabel": {
				"show": false
			},
			"axisTick": {
				"show": false
			}
		},
		"yAxis": [{
			"type": "category",
			"inverse": true,
			"data": [
				"万达广场",
				"中瑞展景",
				"五龙广场",
				"三迪曼哈顿"
			],
			"axisLine": {
				"show": false
			},
			"axisTick": {
				"show": false
			},
			"axisLabel": {
				"margin": -10,
				"textStyle": {
					"color": '#a9b9e8',
					"fontSize": 12
				}
			}
		}],
		"series": [{
			"type": "pictorialBar",
			"symbolRepeat": "fixed",
			"symbolMargin": "13%",
			"label": {
				"normal": {
					show: true,
					formatter: function(params) {
						return(params.value / 300).toFixed(1);
					},
					position: 'right',
					offset: [5, 0],
					textStyle: {
						fontSize: 16,
						color: '#fdfdfd'
					},
				}
			},
			"symbolClip": true,
			"symbolSize": [8, 16],
			"symbolPosition": "start",
			"symbolOffset": [20, 0],
			"symbolBoundingData": 300,
			"data": [{
				"symbol": base64Blue,
				'value': 28
			}, {
				"symbol": base64Orange,
				'value': 54
			}, {
				"symbol": base64Blue,
				'value': 72
			}, {
				"symbol": base64Red,
				'value': 22
			}],
			"z": 10
		}, {
			"type": "pictorialBar",
			"animationDuration": 0,
			"symbolRepeat": "fixed",
			"symbolMargin": "13%",
			"symbol": base64Black,
			"symbolSize": [8, 16],
			"symbolBoundingData": 300,
			"symbolPosition": "start",
			"symbolOffset": [20, 0],
			"data": [300, 300, 300, 300, ],
			"z": 5
		}]
	},
	// 商务区安全态势
	securityState: {
		grid: {
			left: 25,
			right: 0,
			top: 30,
			bottom: 20,
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			axisLine: {
				lineStyle: {
					color: '#1c787c'
				}
			},
			axisLabel: {
				show: false,
				textStyle: {
					show: false,
					color: '#0f3fb4',
					lineHeight: 0
				}
			},
			axisTick: {
				show: false,
			},
			data: ['万达', '中瑞', '五龙', '三迪', '信达', '上坤', '莱顿'],
			splitLine: {
				show: false
			}
		}],
		yAxis: {
			name: '单位: 百起',
			nameTextStyle: {
				color: '#1c787c',
				fontSize: 12,
				fontWeight: 'bold'
			},
			type: 'value',
			min: 0,
			max: 6,
			splitNumber: 3,
			splitLine: {
				show: true,
				lineStyle: {color: '#1c787c'}
			},
			axisLine: {
				show: true,
				lineStyle: {color: '#1c787c'}
			},
			axisLabel: {
				margin: 10,
				textStyle: {color: '#1c787c'}
			},
			axisTick: {show: true},
			splitLine: {show: false}
		},
		series: [{
			type: 'line',
			smooth: true,
			symbol: 'circle',
			symbolSize: 10,
			color: '#00ffff',
			lineStyle: {
				normal: {
					color: "#00ffff",
					width: 2
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(62,220,255, 0.9)'
					}, {
						offset: 1.0,
						color: 'rgba(61,234,255, 0)'
					}], false)
				}
			},
			data: [1, 2, 1, 3, 1, 4, 1.5]
		}]
	},
	// 特殊人群
	specialPeople: {
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)",
	    },
	    title: {
	        text: '特殊人员',
	        left: '28%',
	        top: 'center',
	        textStyle: {
	            color: '#fff',
	            fontSize: 14,
	            align: 'center'
	        }
	    },
	    legend: {
	        right: 40,
	        orient: 'vertical',
	        data: ['矫正人员', '刑满解救人员重犯', '戒毒人员', '邪教人员', '重度精神病人', '信访重点人员', '残疾人', '60岁以上老人'],
	        textStyle: {
	            color: '#fff'
	        },
	        itemGap: 7,
	        itemWidth: 16,
	        itemHeight: 10
	    },
	    series: [
	    	{
	    		center: ['35%', '50%'],
	            name: '特殊人员',
	            type: 'pie',
	            hoverAnimation: false,
	            legendHoverLink: false,
	            radius: ['38%', '45%'],
	            color: 'rgba(5,55,169,0.5)',
	            label: {
	                normal: {position: 'inner'}
	            },
	            labelLine: {
	                normal: {show: false}
	            },
	            tooltip: {show: false},
	            data: [100,100,100,100,100,100,100,100]
	        },
	        {
	        	center: ['35%', '50%'],
	            name: '特殊人员',
	            type: 'pie',
	            radius: ['43%', '55%'],
	            color: ['#00FFFF', '#44EAB1', '#7BDD43', '#FEBE12', '#EBEC2F', '#FF7C44', '#FA3E5F', '#6635EF', '#FFAFDA'],
	            labelLine: {
	                normal: {
	                    show: true,
	                    length: 10,
	                    length2: 10,
	                    lineStyle: {width: 1}
	                }
	            },
	            label: {
	                normal: {
	                    formatter: '{c|{c}}\n{hr|}\n{d|{d}%}',
	                    rich: {
	                        b: {
	                            fontSize: 12,
	                            color: '#12EABE',
	                            align: 'left',
	                            padding: 4
	                        },
	                        hr: {
	                            borderColor: '#12EABE',
	                            width: '100%',
	                            borderWidth: 2,
	                            height: 0
	                        },
	                        d: {
	                            fontSize: 12,
	                            color: '#fff',
	                            align: 'left',
	                            padding: 4
	                        },
	                        c: {
	                            fontSize: 12,
	                            color: '#fff',
	                            align: 'left',
	                            padding: 4
	                        }
	                    }
	                }
	            },
	            data: [{
	                    value: 100,
	                    name: '矫正人员'
	                },
	                {
	                    value: 100,
	                    name: '刑满解救人员重犯'
	                },
	                {
	                    value: 100,
	                    name: '戒毒人员'
	                },
	                {
	                    value: 100,
	                    name: '邪教人员'
	                },
	                {
	                    value: 100,
	                    name: '重度精神病人'
	                },
	                {
	                    value: 100,
	                    name: '信访重点人员'
	                },
	                {
	                    value: 100,
	                    name: '残疾人'
	                },
	                {
	                    value: 100,
	                    name: '60岁以上老人'
	                }
	            ]
	        }
	    ]
	},
	// 数据分析:在线力量
	analysisOnlinePower: {
		tooltip: {
			show: true,
			trigger: 'item'
		},
		radar: {
			center: ['48%', '50%'],
			indicator: [{
					name: '志愿者',
					max: 15
				}, {
					name: '联防队',
					max: 15
				}, {
					name: '特保',
					max: 15
				}, {
					name: '综合管理员',
					max: 15
				}, {
					name: '物业保安',
					max: 15
				}

			],
			radius: '60%',
			splitNumber: 3,
			name: {
				textStyle: {
					color: '#527ed8',
					fontSize: 12
				}
			},
			splitArea: {
				show: true,
				areaStyle: {
					color: '#081542',
					opacity: 1.0
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#112a52',
					opacity: 1.0,
					width: 2
				}
			},
			splitLine: {
				lineStyle: {
					color: '#112a52',
					width: 2
				}
			}
		},
		series: [{
				type: 'radar',
				lineStyle: {
					normal: {
						color: '#1ebcfc',
						width: 2
					}
				},
				data: [
					[4, 10, 5, 2, 8]
				],
				itemStyle: {
					normal: {
						borderColor: '#1ebcfc',
						borderWidth: 4,
					}
				},
				areaStyle: {
					normal: {
						color: {
							type: 'radial',
							x: 0.5,
							y: 0.5,
							r: 0.7,
							colorStops: [{
								offset: 0,
								color: 'rgba(1,1,1,0)'
							}, {
								offset: 0.5,
								color: 'rgba(1,1,1,0)'
							}, {
								offset: 1,
								color: '#1ebcfc'
							}],
							globalCoord: false
						},
						opacity: 0.5,
					}
				}
			}, {
				type: 'radar',
				lineStyle: {
					normal: {
						color: '#fdb924',
						width: 2
					}
				},
				data: [[10, 5, 6, 5, 8]],
				itemStyle: {
					normal: {
						borderColor: '#fdb924',
						borderWidth: 4,
					}
				},
				areaStyle: {
					normal: {
						color: {
							type: 'radial',
							x: 0.5,
							y: 0.5,
							r: 0.7,
							colorStops: [{
								offset: 0,
								color: 'rgba(1,1,1,0)'
							}, {
								offset: 0.5,
								color: 'rgba(1,1,1,0)'
							}, {
								offset: 1,
								color: '#fdb924'
							}],
							globalCoord: false
						},
						opacity: 0.5,
					}
				}
			}, {
				type: 'radar',
				lineStyle: {
					normal: {
						color: '#f61e72',
						width: 2
					}
				},
				data: [[5, 8, 5, 3, 7]],
				itemStyle: {
					normal: {
						borderColor: '#f61e72',
						borderWidth: 4,
					}
				},
				areaStyle: {
					normal: {
						color: {
							type: 'radial',
							x: 0.5,
							y: 0.5,
							r: 0.7,
							colorStops: [{
								offset: 0,
								color: 'rgba(1,1,1,0)'
							}, {
								offset: 0.5,
								color: 'rgba(1,1,1,0)'
							}, {
								offset: 1,
								color: '#f61e72'
							}],
							globalCoord: false
						},
						opacity: 0.5,
					}
				}
			}
		]
	},
	// 数据分析：商务区实有人员
	exactilyPeople: {
		grid: {
			left: 20,
			right: 0,
			top: 40,
			bottom: 10,
			containLabel: true
		},
		tooltip: {
			trigger: 'axis',
	        axisPointer: {
	            type: 'line',
	            lineStyle: {
	                opacity: 0
	            }
	        },
	        formatter: '{c}'
		},
		xAxis: [{
			type: 'category',
			axisLine: {
				lineStyle: {
					color: '#081f59'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#0f3fb4',
					lineHeight: 0
				},
				formatter: function(value) {
					return value.split("").join("\n")
				}
			},
			axisTick: {
				show: false,
			},
			data: ['万达', '中瑞', '五龙', '三迪', '信达', '上坤', '莱顿'],
			splitLine: {
				show: false
			}
		}],
		yAxis: {
			name: '单位: 万人',
			nameTextStyle: {
				color: '#0f3fb4',
				fontSize: 12,
				fontWeight: 'bold'
			},
			type: 'value',
			min: 0,
			max: 40,
			splitNumber: 4,
			splitLine: {
				show: true,
				lineStyle: {
					color: '#081f59'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {color: '#081f59'}
			},
			axisLabel: {
				margin: 0,
				textStyle: {color: '#0f3fb4'}
			},
			axisTick: {show: true,inside: true},
			splitLine: {show: false}
		},
		series: [{
			type: 'line',
			smooth: true,
			symbol: 'circle',
			symbolSize: 10,
			color: '#00ffff',
			lineStyle: {
				normal: {
					color: "#00ffff",
					width: 2
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(62,220,255, 0.9)'
					}, {
						offset: 1.0,
						color: 'rgba(61,234,255, 0)'
					}], false)
				}
			},
			data: [35, 24, 17, 26, 31, 27, 20]
		}]
	},
	// 数据分析:设备在线率
	onlineDevice: {
		grid: {
			left: 0,
			right: 20,
			top: 40,
			bottom: 0,
			containLabel: true
		},
		tooltip: {
			trigger: 'axis',
	        axisPointer: {
	            type: 'line',
	            lineStyle: {
	                opacity: 0
	            }
	        },
	        formatter:'{c}'
		},
		legend: {
			icon: "circle",
			itemWidth: 10,
			itemHeight: 10,
			top: 9,
			right: 0,
			data: ['设备总数', '在线', '掉线'],
			textStyle: {color: '#fff'}
		},
		xAxis: [{
			type: 'category',
			axisLine: {
				show: true,
				lineStyle: {color: '#081f59'}
			},
			axisLabel: {
				textStyle: {
					color: '#0f3fb4',
					margin: 15,
				}
			},
			axisTick: {show: false},
			data: ['广播', '消防栓', '摄像头', 'WIFI', '烟感'],
			splitLine: {show: false}
		}],
		yAxis: {
			name: '    单位(百个)',
			nameTextStyle: {
				width: 100,
				color: '#0f3fb4',
				fontSize: 12,
				fontWeight: 'bold',
				align: 'rigth'
			},
			nameGap: 20,
			type: 'value',
			min: 0,
			max: 120,
			splitNumber: 4,
			splitLine: {
				show: true,
				lineStyle: {color: '#081f59'}
			},
			axisLine: {
				show: true,
				lineStyle: {color: '#081f59'}
			},
			axisLabel: {
				margin: 0,
				textStyle: {color: '#0f3fb4'}
			},
			axisTick: {show: true, inside: true},
			splitLine: {show: false}
		},
		series: [{
			name: '设备总数',
			type: 'bar',
			data: [45, 42, 40, 35, 34, 32, 30, 29],
			barWidth: 10,
			barGap: '20%',
			itemStyle: {
				normal: {
					show: true,
					color: '#0262d5',
					barBorderRadius: [50, 50, 0, 0]
				}
			},
		}, {
			name: '在线',
			type: 'bar',
			data: [90, 53, 45, 70, 30, 40, 28, 10],
			barWidth: 10,
			barGap: '20%',
			itemStyle: {
				normal: {
					show: true,
					color: '#cf8a2b',
					barBorderRadius: [50, 50, 0, 0]
				}
			},
		}, {
			name: '掉线',
			type: 'bar',
			data: [80, 37, 35, 63, 27, 33, 45, 49],
			barWidth: 10,
			barGap: '20%',
			itemStyle: {
				normal: {
					show: true,
					color: '#33cae1',
					barBorderRadius: [50, 50, 0, 0],
				}
			}
		}]
	},
	// 设备在线
	dispatchOnlineDevice: {
		grid: {
			left: 24,
			right: 20,
			top: 40,
			bottom: 10,
			containLabel: true
		},
		legend: {
			icon: "circle",
			itemWidth: 10,
			itemHeight: 10,
			top: 9,
			right: 10,
			data: ['设备总数', '在线', '掉线'],
			textStyle: {color: '#fff'}
		},
		xAxis: [{
			type: 'category',
			axisLine: {
				show: true,
				lineStyle: {color: '#1c787c'}
			},
			axisLabel: {
				textStyle: {
					color: '#1c787c',
					margin: 15,
				}
			},
			axisTick: {show: false},
			data: ['广播', '消防栓', '摄像头', 'WIFI', '烟感'],
			splitLine: {show: false}
		}],
		yAxis: {
			name: '单位(百个)',
			nameTextStyle: {
				width: 100,
				color: '#1c787c',
				fontSize: 12,
				fontWeight: 'bold',
				align: 'rigth'
			},
			type: 'value',
			min: 0,
			max: 100,
			splitNumber: 5,
			splitLine: {
				show: true,
				lineStyle: {color: '#1c787c'}
			},
			axisLine: {
				show: true,
				lineStyle: {color: '#1c787c'}
			},
			axisLabel: {
				margin: 6,
				textStyle: {color: '#1c787c'}
			},
			axisTick: {show: true, inside: true},
			splitLine: {show: false}
		},
		series: [{
			name: '设备总数',
			type: 'bar',
			data: [45, 42, 40, 35, 34, 32, 30, 29],
			barWidth: 10,
			barGap: '20%',
			itemStyle: {
				normal: {
					show: true,
					color: '#0262d5',
					barBorderRadius: [50, 50, 0, 0]
				}
			},
		}, {
			name: '在线',
			type: 'bar',
			data: [90, 53, 45, 70, 30, 40, 28, 10],
			barWidth: 10,
			barGap: '20%',
			itemStyle: {
				normal: {
					show: true,
					color: '#cf8a2b',
					barBorderRadius: [50, 50, 0, 0]
				}
			},
		}, {
			name: '掉线',
			type: 'bar',
			data: [80, 37, 35, 63, 27, 33, 45, 49],
			barWidth: 10,
			barGap: '20%',
			itemStyle: {
				normal: {
					show: true,
					color: '#33cae1',
					barBorderRadius: [50, 50, 0, 0],
				}
			}
		}]
	},
	// 在线力量
	onlinePower: {
		tooltip: {
			show: true,
			trigger: 'item',
		},
		radar: {
			center: ['50%', '55%'],
			indicator: [{
					name: '志愿者',
					max: 15
				}, {
					name: '联防队',
					max: 15
				}, {
					name: '特保',
					max: 15
				}, {
					name: '综合管理员',
					max: 15
				}, {
					name: '物业保安',
					max: 15
				}
			],
			radius: '70%',
			splitNumber: 3,
			name: {
				textStyle: {
					color: '#ffffff',
					fontSize: 12
				}
			},
			splitArea: {
				show: true,
				areaStyle: {
					color: '#081542',
					opacity: 1.0
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#112a52',
					opacity: 1.0,
					width: 2
				}
			},
			splitLine: {
				lineStyle: {
					color: '#112a52',
					width: 2
				}
			}
		},
		series: [{
				type: 'radar',
				lineStyle: {
					normal: {
						color: '#1ebcfc',
						width: 2
					}
				},
				data: [[4, 10, 5, 2, 8]],
				itemStyle: {
					normal: {
						borderColor: '#1ebcfc',
						borderWidth: 4,
					}
				},
				areaStyle: {
					normal: {
						color: {
							type: 'radial',
							x: 0.5,
							y: 0.5,
							r: 0.7,
							colorStops: [{
								offset: 0,
								color: 'rgba(1,1,1,0)'
							}, {
								offset: 0.5,
								color: 'rgba(1,1,1,0)'
							}, {
								offset: 1,
								color: '#1ebcfc'
							}],
							globalCoord: false
						},
						opacity: 0.5,
					}
				}
			}, {
				type: 'radar',
				lineStyle: {
					normal: {
						color: '#fdb924',
						width: 2
					}
				},
				data: [[10, 3, 7, 2, 8]],
				itemStyle: {
					normal: {
						borderColor: '#fdb924',
						borderWidth: 4,
					}
				},
				areaStyle: {
					normal: {
						color: {
							type: 'radial',
							x: 0.5,
							y: 0.5,
							r: 0.7,
							colorStops: [{
								offset: 0,
								color: 'rgba(1,1,1,0)'
							}, {
								offset: 0.5,
								color: 'rgba(1,1,1,0)'
							}, {
								offset: 1,
								color: '#fdb924'
							}],
							globalCoord: false
						},
						opacity: 0.5,
					}
				}
			}, {
				type: 'radar',
				lineStyle: {
					normal: {
						color: '#f61e72',
						width: 2
					}
				},
				data: [[4, 10, 5, 9, 13]],
				itemStyle: {
					normal: {
						borderColor: '#f61e72',
						borderWidth: 4,
					}
				},
				areaStyle: {
					normal: {
						color: {
							type: 'radial',
							x: 0.5,
							y: 0.5,
							r: 0.7,
							colorStops: [{
								offset: 0,
								color: 'rgba(1,1,1,0)'
							}, {
								offset: 0.5,
								color: 'rgba(1,1,1,0)'
							}, {
								offset: 1,
								color: '#f61e72'
							}],
							globalCoord: false
						},
						opacity: 0.5,
					}
				}
			}

		]
	},
	// 车流量统计对比
	specialParkContrast: {
		grid: {
			left: 10,
			right: 20,
			top: 40,
			bottom: 10,
			containLabel: true
		},
		legend: {
			icon: "circle",
			itemWidth: 10,
			itemHeight: 10,
			top: 9,
			right: 10,
			data: ['总车流量', '驶出车辆', '驶入车辆'],
			textStyle: {color: '#fff'}
		},
		xAxis: [{
			type: 'category',
			axisLine: {
				show: true,
				lineStyle: {color: '#0f3fb4'}
			},
			axisLabel: {
				textStyle: {
					color: '#0f3fb4',
					margin: 15,
				}
			},
			axisTick: {show: false},
			data: ['三迪广场', '兴达蓝爵', '五龙广场', '莱顿小城', '万达广场'],
			splitLine: {show: false}
		}],
		yAxis: {
			type: 'value',
			min: 0,
			max: 100,
			splitNumber: 5,
			splitLine: {
				show: true,
				lineStyle: {color: '#0f3fb4'}
			},
			axisLine: {
				show: true,
				lineStyle: {color: '#0f3fb4'}
			},
			axisLabel: {
				margin: 5,
				textStyle: {color: '#0f3fb4'}
			},
			axisTick: {show: true, inside: true},
			splitLine: {show: false}
		},
		series: [{
			name: '总车流量',
			type: 'bar',
			data: [45, 42, 40, 35, 34, 32, 30, 29],
			barWidth: 10,
			barGap: '20%',
			itemStyle: {
				normal: {
					show: true,
					color: '#32c2f5',
					barBorderRadius: [50, 50, 0, 0]
				}
			},
		}, {
			name: '驶出车辆',
			type: 'bar',
			data: [90, 53, 45, 70, 30, 40, 28, 10],
			barWidth: 10,
			barGap: '20%',
			itemStyle: {
				normal: {
					show: true,
					color: '#cf8a2b',
					barBorderRadius: [50, 50, 0, 0]
				}
			},
		}, {
			name: '驶入车辆',
			type: 'bar',
			data: [80, 37, 35, 63, 27, 33, 45, 49],
			barWidth: 10,
			barGap: '20%',
			itemStyle: {
				normal: {
					show: true,
					color: '#eb3851',
					barBorderRadius: [50, 50, 0, 0],
				}
			}
		}]
	},
	// 车流量统计对比
	specialParkTrend: {
		grid: {
			left: 10,
			right: 20,
			top: 40,
			bottom: 10,
			containLabel: true
		},
		legend: {
			icon: "rect",
			itemWidth: 20,
			itemHeight: 2,
			top: 9,
			right: 10,
			data: ['昨日', '今日'],
			textStyle: {color: '#fff'}
		},
		xAxis: [{
			type: 'category',
			axisLine: {
				show: true,
				lineStyle: {color: '#0f3fb4'}
			},
			axisLabel: {
				textStyle: {
					color: '#0f3fb4',
					margin: 15,
				}
			},
			axisTick: {show: false},
			data: ['02:00', '04:00', '06:00', '08:00', '10:00'],
			splitLine: {show: false}
		}],
		yAxis: {
			type: 'value',
			min: 0,
			max: 100,
			splitNumber: 5,
			splitLine: {
				show: true,
				lineStyle: {color: '#0f3fb4'}
			},
			axisLine: {
				show: true,
				lineStyle: {color: '#0f3fb4'}
			},
			axisLabel: {
				margin: 5,
				textStyle: {color: '#0f3fb4'}
			},
			axisTick: {show: true, inside: true},
			splitLine: {show: false}
		},
		series: [{
			name: '昨日',
			type: 'line',
			data: [87, 42, 53, 35, 72, 64, 30, 10],
			showSymbol: false,
			lineStyle: {
	            normal: {width: 2}
	        },
	        itemStyle: {
	            normal: {color: '#0a317e'}
	        }
		}, {
			name: '今日',
			type: 'line',
			data: [30, 53, 45, 70, 30, 40, 28, 10],
			showSymbol: false,
			lineStyle: {
	            normal: {width: 2}
	        },
	        itemStyle: {
	            normal: {color: '#f3781e'}
	        }
		}]
	},
	specialParkPeak: {
		grid: [
	        {x: '0%', y: '0px', width: '50%', height: '100%'},
	        {x2: '0%', y: '0px', width: '50%', height: '100%'}
	    ],
	    tooltip: {
	        formatter: 'Group {a}: ({c})'
	    },
	    xAxis: [
	        {gridIndex: 0, min: 0, max: 1000, inverse: true, type: 'value',show: false,},
	        {gridIndex: 1, min: 0, max: 1000, type: 'value', show: false}
	    ],
	    yAxis: [
	        {gridIndex: 0, min: 0, max: 2, type: 'category',
	            splitLine: {
	                show: true,
	                lineStyle: {
	                    color: '#0a317e'
	                }
	            },
	            axisLine:{
	                lineStyle: {
	                    color: '#0a317e'
	                }
	            }
	        },
	        {gridIndex: 1, min: 0, max: 2, type: 'category',position: 'right',
	            splitLine: {
	                show: true,
	                lineStyle: {
	                    color: '#0a317e'
	                }
	            },
	            axisLine:{
	                lineStyle: {
	                    color: '#0a317e'
	                }
	            }
	        }
	    ],
	    series: [
	        {
	            name: 'I',
	            type: 'bar',
	            xAxisIndex: 0,
	            yAxisIndex: 0,
	            data: [100,200,300],
	            itemStyle: {
					normal: {
						show: true,
						color: {
	                        type: 'linear',
	                        x: 0,
	                        y: 0,
	                        x2: 1,
	                        y2: 0,
	                        colorStops: [{
	                            offset: 0,
	                            color: '#d5a343'
	                        }, {
	                            offset: 1,
	                            color: '#d45930'
	                        }],
	                        globalCoord: false
	                    },
						barBorderRadius: [5, 0, 0, 5]
					}
				},
	            barWidth: '10px',
	            label: {
	                show: true,
	                position: 'left',
	                textStyle: {
	                    color: '#ffffff',
	                    fontSize: '14'
	                }
	            }
	        },
	        {
	            name: 'II',
	            type: 'bar',
	            xAxisIndex: 1,
	            yAxisIndex: 1,
	            data: [50,60,70],
	            itemStyle: {
					normal: {
						show: true,
						color: {
	                        type: 'linear',
	                        x: 0,
	                        y: 0,
	                        x2: 1,
	                        y2: 0,
	                        colorStops: [{
	                            offset: 0,
	                            color: '#04befe'
	                        }, {
	                            offset: 1,
	                            color: '#4481eb'
	                        }],
	                        globalCoord: false
	                    },
						barBorderRadius: [0, 5, 5, 0]
					}
				},
	            barWidth: '10px',
	            label: {
	                show: true,
	                position: 'right',
	                textStyle: {
	                    color: '#ffffff',
	                    fontSize: '14'
	                }
	            }
	        }
	    ]
	},
    insidePagePie: function () {
        let dataStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                shadowBlur: 40,
                borderWidth: 10,
                shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
            }
        };
        let placeHolderStyle = {
            normal: {
                color: '#0b3336',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: '#0b3336'
            }
        };
        let seriesData = [];
        let radius = [
            ['50%', '55%'],
            ['30%', '35%'],
            ['10%', '15%']];
        let left = {
            data: {
                value: [40, 35, 30],
                name: ['租用房屋', '自有房屋', '租售同用']
            },
            color: ['#f8307b', '#edaa00', '#fff'],
            center: ['25%', '65%']
        };
        let right = {
            data: {
                value: [40, 35, 30],
                name: ['民营企业', '合资企业', '国有企业']
            },
            color: ['#00ffc2', '#00d2fe', '#007af2'],
            center: ['75%', '65%']
        };

        let length = 3;
        for (let i = 0; i < length; i ++) {
            for(let j = 0; j < 2; j ++) {
                let value = j == 0 ? left.data.value[i] : right.data.value[i],
                    color = j == 0 ? left.color[i] : right.color[i],
                    name = j == 0 ? left.data.name[i] : right.data.name[i],
                    center = j == 0 ? left.center : right.center;
                seriesData.push({
                    type: 'pie',
                    clockWise: false,
                    radius: radius[i],
                    center: center,
                    itemStyle: dataStyle,
                    hoverAnimation: false,
                    startAngle: 90,
                    label: {
                        borderRadius: '10',
                    },
                    data: [{
                        value: value,
                        name: name,
                        itemStyle: {
                            normal: {
                                color: color,
                                shadowBlur: 20,
                                shadowColor: 'rgba(142,152,241, 0.6)'
                            }
                        }
                    },
                        {
                            value: 100 - value,
                            name: '',
                            tooltip: {
                                show: false
                            },
                            itemStyle: placeHolderStyle
                        },
                    ]
                })

            }
        }

        return {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                show: true,
                formatter: "{b} : &nbsp; &nbsp;{d}%",
                backgroundColor: 'rgba(0,0,0,0.5)', // 背景
                padding: [8, 10], //内边距
                extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
            },
            series: seriesData
        }
    }
}