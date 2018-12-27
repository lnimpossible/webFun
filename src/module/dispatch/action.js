$(function(){
	let userInfo = TF.LoginCache.userInfo;
	var isManager = (userInfo.rank_field.indexOf('TASK') !== -1)? true:false;
	if(isManager){
		$('.dispatch-add-situation').before(
			'<div class="dispatch-add-task point-event-auto">'+
				'<i class="fa fa-plus"></i>'+
				'创建任务'+
			'</div>'
		)
	}
	$('.dispatch-menu').click(function(){
		let index = $(this).index();
		dispatchMenuClick(index)
	})
	
	function dispatchMenuClick(index){
		$('.dispatch-menu').eq(index).addClass('dispatch-menu-active')
		.siblings().removeClass('dispatch-menu-active');
		$('.dispatch-list-wrap').eq(index).show().siblings('.dispatch-list-wrap').hide();
//		$('.dispatch-r').show();
		$('.dispatch-situation-preview')[0].innerHTML = '';
		$('.dispatch-statistic').hide();
		$('.dispatch-add-task').hide();
		$('.dispatch-add-situation').hide();
		TF.cancelHandleSituation();
		$('#dispatch-lb')[0].innerHTML = '';
		$('#dispatch-rb')[0].innerHTML = '';
		switch(index){
			case 0: 
				TF.genSpecialPerson('#dispatch-lb');
				TF.genPersonList('dispatch-r');
				TF.genOnlinePower('#dispatch-rb')
			break;
			case 1: 
				TF.genDeviceList('dispatch-r');
				TF.onlineDevice('#dispatch-lb')
			break;
			case 2: 
				$('.dispatch-add-situation').show();
				TF.genSituation('dispatch-r');
				TF.situation('#dispatch-rb');
				TF.importSituation('#dispatch-lb')
			break;
			case 3: 
				$('.dispatch-add-task').show();
				TF.genTaskList('dispatch-r');
				TF.task('#dispatch-rb');
				TF.importTask('#dispatch-lb')
			break;
			case 4:
				TF.genPlanList('dispatch-r');
				TF.planExecute('#dispatch-rb');
				TF.planSource('#dispatch-lb');
			break;
		}
	}
	TF.dispatchMenuClick = function(index){
		dispatchMenuClick(index)
	}
	
/* 全局搜索点击事件 */
	// 搜索输入遮罩点击事件
	$('.search-type').click(function(){
		$('.search-type-list').slideToggle()
	})
	$('.search-type-item').click(function(){
		$('.search-type-name').html( $(this).html() )
		$('.search-type-name').attr('type', $(this).attr('type'))
	})
	$('.clear-search-input').click(function(){
		$(this).hide();
		$('.g-search-input').val('');
		setTimeout(function(){
			$('.g-search-input').focus();
		})
	})
	$('.search-sure').click(function(){
		if($('.g-search-input').val()==''){return};
		var parama = {
			user_id: TF.LoginCache.userInfo.id,
			type: $('.search-type-name').attr('type'),
			key: $('.g-search-input').val()
		}
		TF.requestData.gSearch(parama).then(function(data){
			var resData = data;
			for(var item in data){
				if(data[item].length!==0){
					var resultItem = "";
					data[item].forEach(function(val,index){
						resultItem += '<li class="g-search-result-item" group="'+item+'" index="'+index+'">'+(val.name||val.nickname)+'</li>'
					})
					switch(item){
						case 'buliding': var groupName = '建筑';break;
						case 'condition': var groupName = '情况';break;
						case 'device': var groupName = '设备';break;
						case 'task': var groupName = '任务';break;
						case 'user': var groupName = '人员';break;
					}
					var resultGroup = '<li class="g-search-result-group">'+
										'<p class="g-search-result-groupname">'+groupName+'</p>'+
										'<ul>'+resultItem+'</ul>'+
									'</li>';
					$('.g-search-result').show().append(resultGroup);
				}
			}
			$('.g-search-result-item').click(function(){
				var group = $(this).attr('group');
				var index = $(this).attr('index');
				var itemData = resData[group][index];
				if(itemData.position){
					var coordinate=TF.layerManage.toWgs84Coordinate(itemData.position);
					Pangu.Location.flyTo(coordinate.longitude,coordinate.latitude,300);
				}
				switch(group){
					case 'user': 
					itemData.type = 'person';
					TF.openNewFunction('thingDetail',itemData);
					break;
//					case 'device': 
//					itemData.type = 'person';
//					break;
//					case 'building': 
//					itemData.type = 'building';
//					break;
//					case 'condition': 
//					itemData.type = 'situation';
//					break;
//					case 'task': 
//					itemData.type = 'task';
//					break;
				}
//				TF.openNewFunction('thingDetail',itemData);
				$('.g-search-result').empty().hide();
				$('.g-search-input-cover').show();
				$('.g-search-input').val('');
			})
		})
	})

	$('.personal-info').click(function(){
		TF.openNewFunction('personalCenter');
	})
/* 右上角消息按钮 */
	$('.open-chat-btn').click(function(){
		TF.openNewFunction('chat')
	})
/* 事件处理 */

	$('.handle-situation-btn').click(function(){
		var action = $(this).attr('action');
		$(this).addClass('handle-situation-btn-active');
		TF.openNewFunction('handleSituation', action)
	})

	let isSliding = false, lastClientX, shift = 0;
	let rail = document.getElementById("situation-range");
	let slider = document.getElementById("situation-range-slide");
	let tag = document.getElementById("situation-range-up-tag");
	let process = document.getElementById("situation-range-process");
	
	slider.addEventListener('mousedown', function(event){
		isSliding = true;
		lastClientX = event.clientX;
	})
	document.body.addEventListener('mousemove', function(event){
		if(isSliding){
			setShift(event)
		}
	})
	document.body.addEventListener('mouseup', function(){
		isSliding = false;
	})
	document.body.addEventListener('mouseleave', function(){
			isSliding = false;
	})
	function setShift(event){
		var currentClientX = event.clientX;
		var deltaX = currentClientX - lastClientX;
		shift += deltaX;
		if(shift <= 0){
			shift = 0
		}
		if(shift >= 288){
			shift = 288
		}
		slider.style.transform = 'translate('+ shift +'px'+',-6px)';
		lastClientX = currentClientX;
		let rangeNum = shift*5/288
		tag.innerHTML = rangeNum.toString().slice(0,4) + 'KM';
		process.style.width = shift+'px'
	}
	

    var ids = ['circle1', 'circle2', 'circle3', 'circle4'];
    var colors = ['#f72894', '#42f36b', '#fbb03b', '#3debf8'];
    for(var i=0; i<4; i++){
    	createCircleStat(ids[i], colors[i])
    }
    function createCircleStat(id, color){
    	var oLineCap = document.getElementById(id);
		var oContext = oLineCap.getContext("2d");
		oContext.beginPath();
		oContext.arc(40, 40, 38.1, -Math.PI/2, Math.PI*3/4, false)
	    oContext.lineWidth = 4;
	
	    oContext.strokeStyle = color;
	    oContext.lineCap = "round";   
	    oContext.stroke();
    }
    
    // 创建任务
    $('.dispatch-add-task').click(function(){
    	TF.openNewFunction('createTask')
    })
    // 创建情况
    $('.dispatch-add-situation').click(function(){
    	TF.openNewFunction('createSituation')
    })
})
