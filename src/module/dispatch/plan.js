(function(TF){
	let tabIndex, planList=null,logList=null;
	let currentPage = 1,getNextPage;
	TF.genPlanList = function(selector){
		var paramater = {
			page: currentPage,
			unit: 10
		}
		TF.requestData.planList(paramater).then(function(data){
			planList = data;
			genPlanList(selector)
		})
		TF.requestData.planLog(paramater).then(function(data){
			logList = data;
		})
	}
	function genPlanList(selector){
		var tabs = $('<ul class="tabs">'+
				'<li class="tab"><span>预案列表</span></li>'+
				'<li class="tab"><span>触发记录</span></li>'+
				'<li class="tab"><span>演练记录</span></li>'+
		'</ul>');
		var card = '<div class="card">'+
						'<div class="card-t flex item-center justify-between">'+
							'<div class="card-info">'+
								'<span class="card-icon"></span>'+
								'<span class="card-name"></span>'+
								'<span class="card-item-num"></span>'+
							'</div>'+
							'<div class="card-close">'+
								'<img class="mr8" src="./static/image/layout/red-close.png"/>关闭'+
							'</div>'+
						'</div>'+
						'<ul class="card-b nice-scroll plan-card-b"><div class="plan-inner"></div></ul>'+
					'</div>';
		var dom = $('<div class="tab-wrap"></div>').append(tabs).append(card);
		$('#'+selector).empty().append(dom);
		TF.setScroll();
		
		$('.tab').click(function(){
			var index = tabIndex = $(this).index();
			var isActive = $(this).hasClass('tab-active');
			$('.tab').removeClass('tab-active');
			if(isActive){
				$('.card').hide();
			}else{
				$(this).addClass('tab-active');
				$('.card').show();
			}
			if(index==0){
				genCard(planList,1);
				var funName = 'planList';
			}else if(index==1){
				genCard(logList,2);
				var funName = 'logList';
			}
			currentPage = 1;
			getNextPage=function(){
				currentPage++;
				var parama = {
					page: currentPage,
					unit: 10
				}
				TF.requestData[funName](parama).then(function(data){
					genCard(data)
				})
			}
		})
		$('.card-close').click(function(){
			$('.card').hide();
			$('.tab').removeClass('tab-active');
		})
		function genCard(data,type){
//			$('.plan-card-b').empty();
			var dom = "";
			data.forEach(function(val, index){
				var itemName = (type==1)? '制定时间':'触发时间';
				dom += '<li class="card-item card-plan-item" planIndex="'+index+'">'+
						'<p class="item-name">'+
							'<span class="red-state-dot"></span>'+val.name+
						'</p>'+
//						'<p class="item-attr">'+
//							'<span class="item-attr-kv">地址:</span>'+
//							'<span class="item-attr-kv">'+val.address+'</span>'+
//						'</p>'+
						'<p class="item-attr">'+
							'<span class="item-attr-kv">'+itemName+':</span>'+
							'<span class="item-attr-kv">'+(val.create_time||val.update_time)+'</span>'+
						'</p>'+
					'</li>';
			})
//			$('.plan-card-b').append(dom);
			$('.plan-card-b').show()[0].scrollTop=0;
			$('.plan-inner').empty().append(dom);
			TF.updateScroll();
			$('.card-plan-item').click(function(){
				var index = $(this).attr('planIndex');
				var itemData = data[index];
				itemData.billboardType = 'plan';
	        	TF.openNewFunction('thingDetail', itemData);
	        	if(itemData.position){
	        		var coordinate=TF.layerManage.toWgs84Coordinate(itemData.position);
					Pangu.Location.flyTo(coordinate.longitude,coordinate.latitude,300);
	        	}
			})
		}

		$('.plan-card-b').scroll(function(){
			var scrollTop = $(this).scrollTop();
			var scrollHeight = $('.plan-inner').height();
			if(scrollTop+$(this).height()-10 == scrollHeight){
				getNextPage()
			}
		})
	}
})(TF)
