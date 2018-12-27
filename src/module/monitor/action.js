$(function(){

/* 全局搜索点击事件 */
	// 搜索输入遮罩点击事件
	$('.search-type').click(function(){
		$('.search-type-list').slideToggle()
	})
	$('.search-type-item').click(function(){
		$('.search-type-name').html( $(this).html() )
		$('.search-type-name').attr('type', $(this).attr('type'))
	})
//	$('.g-search-input-cover').click(function(){
//		$(this).hide();
//		setTimeout(function(){
//			$('.g-search-input').focus();
//		})
//	})
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

/* 个人中心按钮  */
	$('.personal-info').click(function(){
		TF.openNewFunction('personalCenter');
	})

/* 右上角消息按钮 */
	$('.open-chat-btn').click(function(){
		TF.openNewFunction('chat')
	})

/* 自由飞行 */
	$('.aircraft').click(function(){
		TF.switchModule('freefly')
	})
	
})
