(function(TF){
	let userInfo = TF.LoginCache.userInfo;
	let situationData1,situationData2;
	let tabIndex;
	let additiveData = [];
	var filter1, filter2, refreshFunction=null, getNextPage = null,currentPage=1;
	const colors = ['#fe5922','#ffb44a','#4aff64','#ffffff'];
	var groupDom1='<ul class="card-b-extra card-b-extra1 nice-scroll">'+
					'<li class="card-group group1" groupindex="0">上报我的</li>'+
				  	'<li class="card-group group1" groupindex="1">我上报的</li>'+
				  '</ul>';
	var groupDom2='<ul class="card-b-extra card-b-extra2 nice-scroll">'+
					'<li class="card-group" code="0">全部</li>'+
				  	'<li class="card-group" code="1">待处理</li>'+
				  	'<li class="card-group" code="2">处理中</li>'+
				  	'<li class="card-group" code="3">待审核</li>'+
				  	'<li class="card-group" code="4">已完成</li>'+
				  '</ul>';
	TF.requestData.getSituation2Me({user_id: userInfo.id}).then(function(data){
		situationData1 = data;
	})
	TF.requestData.getSituationISend({user_id: userInfo.id}).then(function(data){
		situationData2 = data;
	})
	
	TF.genSituation=function(selector){
		genSituation(selector)
    }
	function genSituation(selector){
		var tabs = $('<ul class="tabs">'+
				'<li class="tab"><span>我的情况</span></li>'+
				'<li class="tab"><span>所有情况</span></li>'+
		'</ul>');
		var card = '<div class="card">'+
						'<div class="card-t flex item-center justify-between">'+
							'<div class="card-info">'+
								'<span class="filter filter1"></span>'+
								'<span class="filter filter2">'+
									'<img class="mr8 ml8" src="./static/image/layout/dispatch/crumb-arrow.png" />'+
									'<span class="filter-text2"></span>'+
								'</span>'+
								'<span class="filter filter3">'+
									'<img class="mr8 ml8" src="./static/image/layout/dispatch/crumb-arrow.png" />'+
									'<span class="filter-text3"></span>'+
								'</span>'+
							'</div>'+
							'<div class="card-close">'+
								'<img class="mr8" src="./static/image/layout/red-close.png"/>关闭'+
							'</div>'+
						'</div>'+
						groupDom1+
						groupDom2+
						'<ul class="card-b nice-scroll situation-card-b"><div class="situation-inner"></div></ul>'+
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
				if(index==1){
					$('.card-b-extra').hide();
					$('.filter').hide();
					currentPage = 1;
					var paramater = {
						user_id: userInfo.id,
						page: currentPage,
						limit: 10
					}
					TF.requestData.situationAll(paramater).then(function(data){
						additiveData = data.list;
						genCard(data.list, true)
					})
					getNextPage=function(){
						currentPage++;
						var paramater = {
							user_id: userInfo.id,
							page: currentPage,
							limit: 10
						}
						TF.requestData.situationAll(paramater).then(function(data){
							additiveData = additiveData.concat(data.list);
							genCard(data.list)
						})
					}
				}else{
					$('.filter').show();
					$('.filter1').html($(this).html()).nextAll().hide();
					$('.card-b-extra1').show().nextAll().hide();
				}
			}
		})
		$('.card-close').click(function(){
			$('.card').hide();
			$('.tab').removeClass('tab-active');
		})
		$('.filter').click(function(){
			var index = $(this).index();
			if(index==0){
				$('.card-b-extra1').show().nextAll().hide();;
			}else if(index==1){
				$('.card-b-extra1').hide().
				next().show().
				next().hide();
			}
			$(this).nextAll().hide()
		})
		// 上报我的，我上报的
		$('.card-b-extra1 li').click(function(){
			filter1=$(this).html();
			$('.filter2').show().find('span').html(filter1);
			$('.card-b-extra1').hide().next().show();
		})
		// 全部，待处理，处理中，待审核，已完成
		$('.card-b-extra2 li').click(function(){
			var that = $(this);
			$('.filter3').show().find('span').html(that.html());
			$('.card-b-extra2').hide();
			var code = that.attr('code');
			var funName = (filter1=='上报我的')? 'getSituation2Me':'getSituationISend';
			var parama = {
				user_id: userInfo.id,
				status_code: code,
				page: 1,
				unit: 10
			}
			refreshFunction = function(){
				currentPage = 1;
				TF.requestData[funName](parama).then(function(data){
					additiveData = data;
					genCard(data, true)
				})
			}
			refreshFunction();
			
			getNextPage=function(){
				currentPage++;
				var parama1 = {
					user_id: userInfo.id,
					status_code: code,
					page: currentPage,
					unit: 10
				}
				TF.requestData[funName](parama1).then(function(data){
					additiveData = additiveData.concat(data);
					genCard(data)
				})
			}
		})
		function genCard(data, single){
			var dom = "";
			data.forEach(function(val, index){
				var color = colors[ Number(val.status_code)-1 ];
				dom += '<li class="card-item card-situation-item" situationIndex="'+( (currentPage-1)*10+index )+'">'+
						'<p class="item-name">'+
							'<span class="red-state-dot"></span>'+val.name+
							'<span class="fr mr20 fs12" style="color:'+color+';">'+val.status_name+'</span>'+
						'</p>'+
						'<p class="item-attr">'+
							'<span class="item-attr-kv">地址:</span>'+
							'<span class="item-attr-kv">'+val.address+'</span>'+
						'</p>'+
						'<p class="item-attr">'+
							'<span class="item-attr-kv">类型:</span>'+
							'<span class="item-attr-kv">'+val.type_name+'</span>'+
						'</p>'+
					'</li>'
			})
//			$('.situation-card-b').append(dom).show();
			$('.situation-card-b').show();
			if(single){
				$('.situation-inner').empty();
				$('.situation-card-b')[0].scrollTop=0;
			};
			$('.situation-inner').append(dom);
			TF.updateScroll();
			$('.card-situation-item').click(function(){
				var index = $(this).attr('situationIndex');
//				var itemData = data[index];
				var itemData = additiveData[index];
				itemData.billboardType = 'situation';
	        	TF.openNewFunction('thingDetail', itemData);
	        	if(itemData.position){
	        		var coordinate=TF.layerManage.toWgs84Coordinate(itemData.position);
					Pangu.Location.flyTo(coordinate.longitude,coordinate.latitude,300);
	        	}
			})
		}
		
		TF.refreshSituation = function(){
			refreshFunction&&refreshFunction()
		}
		$('.situation-card-b').scroll(function(){
			var scrollTop = $(this).scrollTop();
			var scrollHeight = $('.situation-inner').height();
			if(scrollTop+$(this).height()-10 == scrollHeight){
				getNextPage()
			}
		})
	}
})(TF)
