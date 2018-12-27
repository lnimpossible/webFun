(function(TF){
	let deviceData;
	let tabIndex;
	TF.genDeviceList = function(selector){
		if(deviceData){
			genDeviceList(selector);
		}else{
			TF.requestData.getDeviceList().then(function(data){
				deviceData = data;
				genDeviceList(selector)
			});
		}
	}
	
	function genDeviceList(selector){
		var tabs = $('<ul class="tabs"></ul>');
		var tab = "";
		deviceData.forEach(function(val){
			tab += '<li class="tab"><span>'+val.name+'</span></li>';
		})
		tabs.append(tab);
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
						'<ul class="card-b nice-scroll device-card-b"></ul>'
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
				genCard(deviceData[index])
			}
		})
		$('.card-close').click(function(){
			$('.card').hide();
			$('.tab').removeClass('tab-active');
		})
		$('.device-card-b').on('click', '.card-device-item', function(){
			var deviceIndex = $(this).attr('deviceIndex');
			var data = deviceData[tabIndex].list[deviceIndex];
			data.billboardType = 'camera';
        	TF.openNewFunction('thingDetail', data);
        	if(data.position){
        		var coordinate=TF.layerManage.toWgs84Coordinate(data.position);
				Pangu.Location.flyTo(coordinate.longitude,coordinate.latitude,300);
        	}
		})
		function genCard(data){
			$('.device-card-b').empty();
			var dom = "";
			data.list.forEach(function(val, index){
				dom += '<li class="card-item card-device-item" deviceIndex="'+index+'">'+
						'<p class="item-name"><span class="red-state-dot"></span>'+val.name+'</p>'+
						'<p class="item-attr">'+
							'<span class="item-attr-kv">'+( (data.name=='摄像头')? '所属nvrip':'地址' )+':</span>'+
							'<span class="item-attr-kv">'+( (data.name=='摄像头')? val.nvrip:val.address )+'</span>'+
						'</p>'+
						'<p class="item-attr">'+
							'<span class="item-attr-kv">类型:</span>'+
							'<span class="item-attr-kv">'+val.type+'</span>'+
						'</p>'+
					'</li>'
			})
			$('.device-card-b').append(dom);
			TF.updateScroll();
		}
	}
})(TF)
