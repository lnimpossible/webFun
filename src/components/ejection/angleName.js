(function(TF){
    var nodeStr='<div class="ejection">'+
                    '<p class="ejection-top">视角名称</p>'+
                    '<div class="ejection-content">'+
                        '<input class="angle-name-input" type="text" autofocus="autofocus" />'+
                    '</div>'+
                    '<div class="ejection-buttons">'+
                    	'<div class="ejection-button angle-name-button" action="cancel">取消</div>'+
                    	'<div class="ejection-button angle-name-button" action="ok">确定</div>'+
                    '</div>'+
                '</div>';
    TF.genAngleName=function(selector){
        $('#'+selector).append(nodeStr);
        setTimeout(function(){
        	$('.angle-name-input').focus();
        })
        $('.angle-name-button').click(function(){
        	let action = $(this).attr('action');
        	if(action == 'cancel'){
        		TF.cancelSelect();
        		TF.closeNewFunction();
        		return
        	}
        	var viewName = $('.angle-name-input').val();
        	if(viewName == ''){
        			TF.notice.message('请输入视角名称!')
        	}else{
        		var view = TF.earthCommon.getCameraView();
        		var params = {
        			name: viewName,
        			position: view.longitude+','+view.latitude,
        			height: view.height.toString(),
        			heading: view.heading.toString(),
        			pitch: view.pitch.toString(),
        			roll: view.roll.toString()
        		}
				TF.requestData.viewAdd(params).then(function(data){
					TF.refreshViewAngle();
					TF.cancelSelect();
        			TF.closeNewFunction();
				})
        	}
        })
    }
})(TF)
