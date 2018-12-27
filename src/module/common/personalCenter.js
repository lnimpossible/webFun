(function(TF){
	var nodeStr = '<div class="menu-personal cursor-pointer">'+
					'<img class="personal-motion clockwise" src="static/image/layout/monitor/bg-menu-personal1.png"/>'+
					'<img class="personal-motion anticlockwise" src="static/image/layout/monitor/bg-menu-personal2.png"/>'+
					'<img src="static/image/layout/monitor/bg-menu-personal3.png"/>'+
				  '</div>';
	TF.genPersonalCenter = function(selector){
		$(selector).append(nodeStr);
		$('.menu-personal').click(function(){
			console.log(111)
		})
	}
})(TF)
