(function(TF){
	var dom = 	'<div class="menu-control menu-control1"></div>'+
				'<div class="menu-control menu-control2"></div>'+
				'<div class="menu-control menu-control3"></div>'+
				'<div class="menu-control menu-control4"></div>'+
				'<div class="menu-control-extend">'+
					'<div class="menu-control-extend1">图层选择</div>'+
					'<div class="menu-control-extend2 flex flex-wrap">'+
						'<div class="menu-control-item menu-control-camera" name="camera">摄像头</div>'+
						'<div class="menu-control-item menu-control-broadcast" name="broadcast">广播</div>'+
						'<div class="menu-control-item menu-control-wifi" name="wifi">wifi</div>'+
						'<div class="menu-control-item menu-control-person" name="person">人员</div>'+
					'</div>'+
					'<div class="menu-control-extend3">'+
						'<span><img src="./static/image/layout/monitor/chose-all.png"/>全选</span>'+
						'<span><img src="./static/image/layout/monitor/clear.png"/>清空</span>'+
					'</div>'+
				'</div>'+
				'<div class="menu-control-extend">'+
					'<div class="menu-control-extend1">框选线选</div>'+
					'<div class="menu-control-extend2 flex flex-wrap">'+
						'<div class="menu-control-item box-select" name="box">框选</div>'+
						'<div class="menu-control-item line-select" name="line">线选</div>'+
					'</div>'+
					'<div class="menu-control-extend3"><span class="clean-select">清除选择</span></div>'+
				'</div>'+
				'<div class="menu-control-extend">'+
					'<div class="menu-control-extend1">视角</div>'+
					'<div class="menu-control-extend2 flex flex-wrap">'+
						'<div class="menu-control-item">视角1</div>'+
						'<div class="menu-control-item">视角2</div>'+
						'<div class="menu-control-item">视角3</div>'+
						'<div class="menu-control-item">视角4</div>'+
					'</div>'+
					'<div class="menu-control-extend3"></div>'+
				'</div>'+
				'<div class="menu-control-extend">'+
					'<div class="menu-control-extend1">测量</div>'+
					'<div class="menu-control-extend2 flex flex-wrap">'+
						'<div class="menu-control-item">高度</div>'+
						'<div class="menu-control-item">长度</div>'+
						'<div class="menu-control-item">面积</div>'+
					'</div>'+
					'<div class="menu-control-extend3"></div>'+
				'</div>';
	TF.genGeoSceneControl = function(selector){
		$('#'+selector).append(dom);
		
		$('.menu-control').click(function(){
			let index = $(this).index();
			$(this).toggleClass('menu-control-active')
			.siblings().removeClass('menu-control-active');
			$('.menu-control-extend').eq(index).slideToggle()
			.siblings('.menu-control-extend').hide();
		});
		$('.menu-control-item').click(function(){
			let name = $(this).attr('name');
			switch(name){
				case 'camera':
				case 'broadcast':
				case 'wifi':
				case 'person':
					console.log('图层控制')
				break;
				
				case 'box':
				case 'line':
					console.log('选择')
				break;
			}
		});
	}
})(TF)
