(function(TF){
	let personData;
	let crumb = [];
	let indexs = [];
	TF.genPersonList = function(selector){
		if(personData){
			genPersonList(selector);
		}else{
			TF.requestData.getUserList().then(function(data){
				personData = data;
				console.log(personData)
				genPersonList(selector)
			});
		}
	}
	function genPersonList(selector){
		var tabs = $('<ul class="tabs"></ul>');
		var card;
		personData.forEach(function(group){
			tabs.append('<li class="tab"><span>'+group.name+'</span></li>');
			card = '<div class="card">'+
						'<div class="card-t flex item-center justify-between">'+
							'<div class="card-crumb-wrap">'+
								'<div class="card-crumb"></div>'+
							'</div>'+
							'<div class="card-close">'+
								'<img class="mr8" src="./static/image/layout/red-close.png"/>关闭'+
							'</div>'+
						'</div>'+
						'<ul class="card-b nice-scroll person-card-b"></ul>'
					'</div>';
		})
		var dom = $('<div class="tab-wrap"></div>').append(tabs).append(card);
		$('#'+selector).empty().append(dom);
		TF.setScroll();
		
		// 点击tab
		$('.tab').click(function(){
			var index = $(this).index();
			var isActive = $(this).hasClass('tab-active');
			$('.tab').removeClass('tab-active');
			if(!isActive){
				$(this).addClass('tab-active');
				$('.card').show();
				
				var groupData = getGroupData(index);
				genNextLevel(groupData);
				
				crumb=[];
				crumb.push(groupData.name);
				genCrumb();
			}else{
				$('.card-close').click()
			}
			TF.updateScroll();
		})
		// 点击组
		$('.card-b').on('click', '.card-group', function(){
			var index = $(this).attr('groupindex');
			var groupData = getGroupData(index);
			genNextLevel(groupData);
			crumb.push(groupData.name);
			genCrumb()
		})
		// 点击人员
		$('.card-b').on('click', '.card-item', function(){
			var index = $(this).attr('itemindex');
			var itemData = getItemData(index)
			itemData.billboardType = 'person';
			TF.openNewFunction('thingDetail', itemData);
			console.log(itemData)
//			if(itemData.position){
//      		var coordinate=TF.layerManage.toWgs84Coordinate(itemData.position);
//				Pangu.Location.flyTo(coordinate.longitude,coordinate.latitude,300);
//      	}
			var personEntity=Pangu.Data.viewer.entities.getById(itemData.theone);
			console.log(personEntity)
			personEntity&&Pangu.Data.viewer.zoomTo(personEntity);
		})
		// 关闭面板
		$('.card-close').click(function(){
			$('.card').hide();
			$('.tab').removeClass('tab-active');
			indexs=[];
		})
	}
	
	function genNextLevel(data){
		$('.person-card-b').empty();
		data.person_list.forEach(function(person,index){
			var personDom='<li class="card-item" itemindex="'+index+'">'+
				'<p class="item-name">'+person.nickname+'</p>'+
				'<p class="item-attr">'+
					'<span class="item-attr-kv">职位:</span>'+
					'<span class="item-attr-kv">'+person.job+'</span>'+
				'</p>'+
				'<p class="item-attr">'+
					'<span class="item-attr-kv">电话:</span>'+
					'<span class="item-attr-kv">'+person.phone+'</span>'+
				'</p>'+
			'</li>';
			$('.person-card-b').append(personDom)
		})
		data.children.forEach(function(group, index){
			var groupDom='<li class="card-group" groupindex="'+index+'">'+group.name+'</li>';
			$('.person-card-b').append(groupDom)
		})
	}
	function getGroupData(gIndex){
		(gIndex!==undefined)&&indexs.push(gIndex);
		var data = personData;
		indexs.forEach(function(i, index){
			data = (index==0)? data[i]:data.children[i];
		})
		return data
	}
	function getItemData(iIndex){
		var data = personData;
		indexs.forEach(function(i, index){
			data = (index==0)? data[i]:data.children[i];
		})
		return data.person_list[iIndex];
	}
	function genCrumb(){
		var crumbDom = "";
		crumb.forEach(function(val,index){
			if(index == crumb.length-1){
				crumbDom += '<div class="swiper-slide"><div class="crumb" style="color: #0ae9ff;" index="'+index+'">'+val+'</div></div>';
			}else{
				crumbDom +='<div class="swiper-slide">'+
				'<div class="crumb" index="'+index+'">'+val+'<img class="mr8 ml8" src="./static/image/layout/dispatch/crumb-arrow.png" /></div>'+
				'</div>'
			}
		})
		var dom = '<div class="swiper-container crumb-container">'+
					'<div class="swiper-wrapper">'+
					    crumbDom+
					'</div>'+
				'</div>';
		$('.card-crumb').empty().append(dom);
		  var mySwiper = new Swiper ('.crumb-container', {
		    direction: 'horizontal',
			slidesPerView : 'auto'
		}) 
		
		$('.crumb').click(function(){
			var index = $(this).attr('index');
			indexs.splice(Number(index)+1);
			crumb.splice(Number(index)+1);
			var data = getGroupData();
			genNextLevel(data);
			genCrumb()
		})
	}
})(TF)
