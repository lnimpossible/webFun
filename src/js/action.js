$(function(){
	$('.menu-master').click(function(){
		var index = $(this).index();
		menuMasterClick(index)
	});
	$('.geo-scene-switch').click(function(){
		geoSceneSwitchClick()
	});
	function menuMasterClick(index,cb){
		var currentMenu = $('.menu-master').eq(index);
		currentMenu.addClass('menu-master-active')
		.siblings().removeClass('menu-master-active');
		switch(index){
			case 0:
				TF.switchModule('monitor');
                TF.sceneController.showMonitor();
			break;
			case 1:
				TF.switchModule('dispatch',cb)
			break;
			case 2:
				TF.switchModule('analysis')
			break;
			case 3: 
				TF.switchModule('special');
				// TF.sceneController.showSpecializedAnalysis();
			break;
		}
	};
	TF.menuMasterClick = menuMasterClick;
	function geoSceneSwitchClick(){
		$('.geo-scene').toggle();
		$('.geo-scene-switch').toggleClass('geo-scene-switched');
		if($('.geo-scene-switch').hasClass('geo-scene-switched')){
			$('.geo-scene-name').html('三维')
            if(TF.Tdve.map === undefined){
                TF.Tdve.init("dimension2");
            }
		}else{
			$('.geo-scene-name').html('二维');
        }
	}
	
	/*
	 * 处理搜索框失去焦点
	 */
	document.body.addEventListener('click', function(event){
		if(!event.target.getAttribute('searchflag')){
			$('.g-search-result').empty().hide();
			$('.g-search-input-cover').show();
			$('.g-search-input').val('').blur();
		}else{
			$('.g-search-input-cover').hide();
			setTimeout(function(){
				$('.g-search-input').focus()
			})
		}
	});

	TF.setScroll = function(){
		$('.nice-scroll').niceScroll({cursorcolor: '#0ae9ff', cursorwidth: '3px'});
	}
	TF.updateScroll = function (){
		$('.nice-scroll').getNiceScroll().show();
		$('.nice-scroll').getNiceScroll().resize();
	}
	
	// 聊天
	$('.chat-box').load('./src/components/chat/index.html', function(){
		
	});
	
	// 图片，视频详情
	TF.picOrVideo = function(data){
		if(data.type=='picture'){
			var pictureList = "";
			data.data.forEach(function(val, index){
				if(data.index){
					var className = (data.index==index)? 'picture-item picture-item-show':'picture-item';
					pictureList+='<li class="'+className+'"><img src="'+val+'"/></li>';
				}else{
					var className = (index==0)? 'picture-item picture-item-show':'picture-item';
					pictureList+='<li class="'+className+'"><img src="'+val+'"/></li>';
				}
			})
			var dom = '<ul class="picture-box">'+
						pictureList+
					  '</ul>'+
					  '<div class="arrow-box">'+
					  	'<i class="fa fa-arrow-left fl pre-picture"></i>'+
					  	'<i class="fa fa-arrow-right fr next-picture"></i>'+
					  '</div>'+
					  '<i class="fa fa-close picture-video-close"></i>';
			$('.picture-video').show().append(dom);
			$('.picture-video-close').click(function(){
				$('.picture-video').empty().hide();
			})
			var currentIndex = data.index||0;
			$('.pre-picture').click(function(){
				if(currentIndex==0){return};
				currentIndex--;
				$('.picture-item').removeClass('picture-item-show')
				.eq(currentIndex).addClass('picture-item-show');
			})
			$('.next-picture').click(function(){
				if(currentIndex==data.data.length-1){return};
				currentIndex++;
				$('.picture-item').removeClass('picture-item-show')
				.eq(currentIndex).addClass('picture-item-show');
			})
		}
		if(data.type=='video'){
			var dom = '<video class="video-box position-center" controls="controls" src="'+data.data+'"></video>'+
			'<i class="fa fa-close picture-video-close"></i>';
			$('.picture-video').show().append(dom);
			$('.picture-video-close').click(function(){
				$('.picture-video').empty().hide();
			})
		}
	}
	
	document.oncontextmenu = function(){
	　　return false;
	}
	
	$(document).keydown(function(event){
		if (event.keyCode == 13) {
           	$('.confirm-ok').click();
           	$('.ejection-button[action="ok"]').click();
        }
		if (event.keyCode == 27) {
           	$('.confirm-calcel').click();
           	$('.ejection-button[action="cancel"]').click();
        }
	})
})
