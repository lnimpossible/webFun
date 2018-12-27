(function(TF){
	let userInfo = TF.LoginCache.userInfo;
	TF.genTrackerDate=function(selector, personData){
		var nodeStr='<div class="tracker-date">'+
						'<div class="tracker-date-close close-btn">'+
			            	'<img class="mr8" src="static/image/layout/common/red-close.png">关闭'+
			            '</div>'+
			            '<p class="tracker-date-name mb40">选择轨迹时间周期</p>'+
			            '<div class="time-range">'+
			            	'<div class="start-time">'+
			            		'<span class="date1 mr8"></span>'+
			            		'<span class="time1"></span>'+
			            	'</div>'+
			            	'<hr class="tracker-date-hr" />'+
			            	'<div class="end-time">'+
			            		'<span class="date2 mr8"></span>'+
			            		'<span class="time2"></span>'+
			            	'</div>'+
			            	'<div class="refresh-time">'+
			            		'<i class="fa fa-refresh"></i>'+
			            	'</div>'+
			            	'<div class="ensure-time">确认日期</div>'+
			            '</div>'+
			            '<div class="date-panel">'+
			            	'<div class="date-picker fl">'+
			            		'<div class="month-box">'+
									'<i class="fa fa-caret-left pre-month" id="pre-month"></i>'+
									'<span class="month" id="month"></span>'+
									'<i class="fa fa-caret-right next-month" id="next-month"></i>'+
								'</div>'+
								'<div class="week-box">'+
									'<span class="week">日</span>'+
									'<span class="week">一</span>'+
									'<span class="week">二</span>'+
									'<span class="week">三</span>'+
									'<span class="week">四</span>'+
									'<span class="week">五</span>'+
									'<span class="week">六</span>'+
								'</div>'+
								'<div class="day-box" id="day-box">'+
								'</div>'+
			            	'</div>'+
			            	'<div class="time-picker fr">'+
			            		'<i class="fa fa-caret-up time-up"></i>'+
			            		'<div class="times">'+
			            			'<div class="times-inner">'+
			            				'<p class="time">00:00</p>'+
				            			'<p class="time">01:00</p>'+
				            			'<p class="time">02:00</p>'+
				            			'<p class="time">03:00</p>'+
				            			'<p class="time">04:00</p>'+
				            			'<p class="time">05:00</p>'+
				            			'<p class="time">06:00</p>'+
				            			'<p class="time">07:00</p>'+
				            			'<p class="time">08:00</p>'+
				            			'<p class="time">09:00</p>'+
				            			'<p class="time">10:00</p>'+
				            			'<p class="time">11:00</p>'+
				            			'<p class="time">12:00</p>'+
				            			'<p class="time">13:00</p>'+
				            			'<p class="time">14:00</p>'+
				            			'<p class="time">15:00</p>'+
				            			'<p class="time">16:00</p>'+
				            			'<p class="time">17:00</p>'+
				            			'<p class="time">18:00</p>'+
				            			'<p class="time">19:00</p>'+
				            			'<p class="time">20:00</p>'+
				            			'<p class="time">21:00</p>'+
				            			'<p class="time">22:00</p>'+
				            			'<p class="time">23:00</p>'+
			            			'</div>'+
			            		'</div>'+
			            		'<i class="fa fa-caret-down time-down"></i>'+
			            	'</div>'+
			            '</div>'+
					'</div>';
		$('#'+selector).append(nodeStr);
		
		let cYear, cMonth, cDate, cHour;
		function init(){
			var dateI = new Date();
			cYear = dateI.getFullYear(); // 年
			cMonth = dateI.getMonth()+1; // 月
			cDate = dateI.getDate();     // 日
			cHour = dateI.getHours();    // 时
			var startAndEndDate = cYear +'-'+ cMonth +'-'+ cDate;
			var startAndEndTime = cHour+':00'
			$('.date1').html(startAndEndDate);
			$('.time1').html(startAndEndTime);
			$('.date2').html(startAndEndDate);
			$('.time2').html(startAndEndTime);
			$('.times-inner').css('transform', 'translateY('+(-26*(cHour-3))+'px)');
			$('.time').eq(cHour).addClass('time-chosed');
			$('.month').html(cYear +'年'+ cMonth +'月');

			dateI.setMonth(cMonth);
			dateI.setDate(0);
			var day = dateI.getDate();      // 当月的天数
			var week = dateI.getDay();      // 星期
			generateDays(day);
		}
		
		function generateDays(dayCount){
			var week = day2Week();
			var hideDay = "";
			for(var j=0; j<week; j++){
				hideDay+='<div class="day-outer-hide"></div>'
			}
			var day = "";
			for(let i=0; i<dayCount; i++){
				day += '<div class="day-outer" day="'+(i+1)+'"><span class="day">'+(i+1)+'</span></div>'
			}
			$('.day-box').empty().html(hideDay+day);
		}
		
		function day2Week(){
			var now = new Date();
			now.setFullYear(cYear, cMonth-1,1);
			return now.getDay()
		}
		
		function preMonth(){
			(cMonth==1)? cMonth=12:cMonth--;
			(cMonth==1)&&cYear--
			getSpecifyDate();
			$('.month').html(cYear+'年'+cMonth+'月');
		}
		function nextMonth(){
			(cMonth==12)? cMonth=1:cMonth++;
			(cMonth==12)&&cYear++
			getSpecifyDate();
			$('.month').html(cYear+'年'+cMonth+'月');
		}
		function getSpecifyDate(){
			var dateT = new Date();
			dateT.setFullYear(cYear);
			(cMonth==1)? dateT.setMonth(0):dateT.setMonth(cMonth);
			dateT.setDate(0);
			var dayCount = dateT.getDate();
			generateDays(dayCount)
		}
		
		init();
		$('.tracker-date-close').click(function(){
			TF.closeNewFunction()
		})
		$('.refresh-time').click(function(){
			init()
		})
		let choseEndOrStart;
		$('.start-time').click(function(){
			choseEndOrStart = 1;
			$(this).addClass('start-end-time-active');
			$('.end-time').removeClass('start-end-time-active');
		})
		$('.end-time').click(function(){
			choseEndOrStart = 2;
			$(this).addClass('start-end-time-active');
			$('.start-time').removeClass('start-end-time-active');
		})
		
		// 前一个月和后一个月
		$('.pre-month').click(function(){
			preMonth();
		})
		$('.next-month').click(function(){
			nextMonth();
		})
		
		// 日期选择
		$('.day-box').on('click', '.day-outer', function(){
			$(this).find('.day').addClass('day-selected');
			$(this).siblings('.day-outer').find('.day').removeClass('day-selected');
			cDate = $(this).attr('day');
			if(choseEndOrStart==1){var dom = '.date1'};
			if(choseEndOrStart==2){var dom = '.date2'};
			$(dom).empty().html(cYear +'-'+ cMonth +'-'+ cDate);
		})
		
		// 时间上下翻滚，选择时间
		$('.time-up').click(function(){
			if(cHour<=4){return};
			cHour--;
			var value = -26*(cHour-3);
			$('.times-inner').css('transform', 'translateY('+ value +'px)');
		})
		$('.time-down').click(function(){
			if(cHour>=19){return};
			cHour++;
			var value = -26*(cHour-3);
			$('.times-inner').css('transform', 'translateY('+ value +'px)');
		})
		$('.time').click(function(){
			var index = $(this).index();
			$(this).addClass('time-chosed')
			.siblings().removeClass('time-chosed');
			if(choseEndOrStart==1){var dom = '.time1'};
			if(choseEndOrStart==2){var dom = '.time2'};
			$(dom).empty().html( $(this).html() );
		})
		$('.ensure-time').click(function(){
			var start = [ $('.date1').html(),  $('.time1').html()];
			var end = [ $('.date2').html(),  $('.time2').html() ];
			if(start == end){
				TF.notice.message('请选择正确时间段!');
				return
			}
			var paramater = {
				user_id: personData.id,
				start_time: start.join(' '),
				end_time: end.join(' ')
			}
			TF.requestData.userHistoryLocation(paramater).then(function(data){
				if(data.length!==0){
					TF.closeNewFunction();
					TF.earthExecute.showPersonRoute(data);
//					setTimeout(function(){
//						TF.earthExecute.removePersonRoute()
//					},5000)
				}else{
					TF.notice.message('无轨迹信息!')
				}
			})
		})
	}
})(TF)
