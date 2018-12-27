(function(TF){
    let handleType;
    var nodeStr='<div class="ejection">'+
                    '<p class="ejection-top">处理任务</p>'+
                    '<div class="ejection-content">'+
                    	'<div class="ejection-item ejection-task-handle ejection-accept-task" action="accept">接受任务</div>'+
                    	'<div class="ejection-item ejection-task-handle ejection-refuse-task" action="refuse">拒绝任务</div>'+
                    '</div>'+
                    '<div class="ejection-buttons">'+
                    	'<div class="ejection-button task-handle-btn" action="ok">确定</div>'+
                    	'<div class="ejection-button task-handle-btn" action="cancel">取消</div>'+
                    '</div>'+
                '</div>';
    TF.genTaskHandle=function(selector, info){
        $('#'+selector).append(nodeStr);
        
        $('.ejection-task-handle').click(function(){
        	$(this).addClass('ejection-item-active')
        	.siblings().removeClass('ejection-item-active');
        	handleType = $(this).attr('action');
        })
        $('.task-handle-btn').click(function(){
        	var action = $(this).attr('action');
        	if(action=='cancel'){
        		TF.closeNewFunction();
        	}else{
        		if(!handleType){
	        		TF.notice.message('请选择情况处理方式!');
	        		return
	        	}
        		var code = (handleType=='accept')? 2:5;
        		TF.requestData.taskStatusChange({id: info.id, status_code: code}).then(function(res){
	        		TF.closeNewFunction();
	        		TF.refreshTask()
	        	})
        	}
        })
    }
})(TF)