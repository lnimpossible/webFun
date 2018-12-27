(function(TF){
    var nodeStr='<div class="ejection">'+
                    '<p class="ejection-top">输入群名称</p>'+
                    '<div class="ejection-content">'+
                        '<input class="group-name-input" type="text" autofocus="autofocus" />'+
                    '</div>'+
                    '<div class="ejection-buttons">'+
                    	'<div class="ejection-button group-name-button" action="cancel">取消</div>'+
                    	'<div class="ejection-button group-name-button" action="ok">确定</div>'+
                    '</div>'+
                '</div>';
    TF.genGroupName=function(selector, personData){
        $('#'+selector).append(nodeStr);
        setTimeout(function(){
        	$('.group-name-input').focus();
        })
        $('.group-name-button').click(function(){
        	let action = $(this).attr('action');
        	if(action == 'cancel'){
        		TF.cancelSelect();
        		TF.closeNewFunction();
        		return
        	}
        	if($('.group-name-input').val()==''){
        		TF.notice.message('请输入群名称!');
        		return
        	}
            TF.chatEffect.createTalkGroup(personData,$('.group-name-input').val());
        	TF.openNewFunction('chat');
        })
    }
})(TF)