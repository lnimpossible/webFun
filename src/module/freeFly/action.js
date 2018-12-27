(function(TF){
	let pathData;
	
	var rotateDeg = 0;
	var defaultSpeed = 20;
	var isSlide = false;
	var needRestart = false;
	var lastClientX, lastClientY;
	var freefly = document.getElementById("freefly");
	var speedControl = document.getElementById("speed-control");
	var speedControlSlide = document.getElementById("speed-control-slide");
	var slide = document.getElementById("slide");
	var liveSpeedNode = document.getElementById("live-speed");
	var limitedY = speedControl.offsetTop;                                    // y方向限制
	var originPoint = [speedControl.offsetLeft, speedControl.offsetTop];      // 原点

	$('.freefly-back').click(function(){
//		var flyPath = JSON.parse(pathData[0].position_set);
//		TF.earthExecute.tourByPath(flyPath,defaultSpeed,200,function(){});
		console.log('退出漫游飞行');
		TF.earthExecute.speedControl('stop');
		TF.switchModule('monitor');
	})
	
	$('.route').click(function(){
		var index = $(this).index();
		$(this).addClass('route-active').parents('.swiper-slide')
		.siblings().find('.route').removeClass('route-active')
	})
	
	
	slide.addEventListener('mousedown', function(event){
		isSlide = true;
		lastClientX = event.clientX;
		lastClientY = event.clientY;
	})
	freefly.addEventListener('mousemove', function(event){
		if(!isSlide || event.clientY<limitedY){return};
		
		/*判断上下左右边界取消拖动*/
		if(
			(freefly.clientWidth - event.clientX)<=20 ||
			event.clientX<=20 || 
			(freefly.clientHeight - event.clientY)<=20 ||
			event.clientY<=20
		){
			isSlide = false;
			return
		}
		
		// 弧度
		var rad = Math.atan2( event.clientY-originPoint[1], event.clientX-originPoint[0] );
	
		rotateDeg = (180*rad)/Math.PI - 180;
		var liveSpeed = Math.abs(rotateDeg)/1.8;
		liveSpeedNode.innerHTML = liveSpeed.toString().slice(0,4);
		
		lastClientX = event.clientX;
		lastClientY = event.clientY;
		speedControlSlide.style.transform = 'rotateZ('+rotateDeg+'deg)';
		if(liveSpeed==0){
			TF.earthExecute.speedControl('pause');
			needRestart = true;
			return
		}
		if(needRestart){
			TF.earthExecute.speedControl('start');
			TF.earthExecute.speedControl(liveSpeed/defaultSpeed);
			needRestart = false;
		}else{
			TF.earthExecute.speedControl(liveSpeed/defaultSpeed);
		}
	})
	freefly.addEventListener('mouseup', function(){
		isSlide = false;
	})
	
	TF.requestData.pathList({page:1,unit:10}).then(function(data){
		pathData = data;
		pathData.forEach(function(val,index){
			var dom = '<div class="swiper-slide"><div class="route" index="'+index+'">'+(index+1)+'</div></div>';
			$('.path-wrap').append(dom)
		})
		
		$('.route').click(function(){
			var index = $(this).attr('index');
			var flyPath = JSON.parse(pathData[index].position_set);
			TF.earthExecute.tourByPath(flyPath,defaultSpeed,200,function(a){
				$('.altitude-pointer').css('top', (300-a)+'px')
			});
			liveSpeedNode.innerHTML = defaultSpeed;
			speedControlSlide.style.transform = 'rotateZ('+(-defaultSpeed*1.8)+'deg)';
		})
	})
})(TF)
