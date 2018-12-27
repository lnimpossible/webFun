(function(TF){
    let handleType;
    var nodeStr='<div class="ejection">'+
                    '<p class="ejection-top">任务审核</p>'+
                    '<div class="ejection-content">'+
                    	'<div class="ejection-item ejection-task-verify ejection-pass-task" action="pass">通过审核</div>'+
                    	'<div class="ejection-item ejection-task-verify ejection-redo-task" action="redo">重新执行</div>'+
                    	'<div class="ejection-item ejection-task-verify ejection-delete-task" action="delete">删除任务</div>'+
                    '</div>'+
                    '<div class="ejection-buttons">'+
                    	'<div class="ejection-button task-verify-btn" action="ok">确定</div>'+
                    	'<div class="ejection-button task-verify-btn" action="cancel">取消</div>'+
                    '</div>'+
                '</div>';
    TF.genTaskVerify=function(selector, info){
        $('#'+selector).append(nodeStr);
        
        $('.ejection-task-verify').click(function(){
        	$(this).addClass('ejection-item-active')
        	.siblings().removeClass('ejection-item-active');
        	handleType = $(this).attr('action');
        })
        $('.task-verify-btn').click(function(){
        	var action = $(this).attr('action');
        	if(action=='cancel'){
        		TF.closeNewFunction();
        	}else{
        		if(!handleType){
	        		TF.notice.message('请选择处理方式!');
	        		return
	        	}
        		if(handleType=='pass'){
		        	TF.requestData.taskStatusChange({id: info.id, status_code: 4}).then(function(res){
		        		TF.closeNewFunction();
		        		TF.refreshTask();
		        	})
        		}
        		if(handleType=='redo'){
        			TF.requestData.taskStatusChange({id: info.id, status_code: 2}).then(function(res){
		        		TF.closeNewFunction();
		        		TF.refreshTask();
		        	})
        		}
        		if(handleType=='delete'){
        			TF.requestData.taskDelete({id: info.id}).then(function(res){
		        		TF.notice.message('删除任务成功!');
		        		TF.closeNewFunction();
		        		TF.refreshTask();
		        	})
        		}
        	}
        })
    }
})(TF)