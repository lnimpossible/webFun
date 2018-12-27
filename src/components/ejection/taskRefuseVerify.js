(function(TF){
    let handleType;
    var nodeStr='<div class="ejection">'+
                    '<p class="ejection-top">任务审核</p>'+
                    '<div class="ejection-content">'+
                    	'<div class="ejection-item ejection-task-verify ejection-redo-task" action="reassign">重新分配</div>'+
                    	'<div class="ejection-item ejection-task-verify ejection-redo-task" action="redo">重新执行</div>'+
                    	'<div class="ejection-item ejection-task-verify ejection-delete-task" action="delete">删除任务</div>'+
                    '</div>'+
                    '<div class="ejection-buttons">'+
                    	'<div class="ejection-button task-verify-btn1" action="ok">确定</div>'+
                    	'<div class="ejection-button task-verify-btn1" action="cancel">取消</div>'+
                    '</div>'+
                '</div>';
    TF.genTaskRefuseVerify=function(selector, info){
        $('#'+selector).append(nodeStr);
        
        $('.ejection-task-verify').click(function(){
        	$(this).addClass('ejection-item-active')
        	.siblings().removeClass('ejection-item-active');
        	handleType = $(this).attr('action');
        })
        $('.task-verify-btn1').click(function(){
        	var action = $(this).attr('action');
        	if(action=='cancel'){
        		TF.closeNewFunction();
        	}
        	if(!handleType){
        		TF.notice.message('请选择处理方式!');
        		return
        	}
        	switch(handleType){
    			case 'reassign': 
//      			TF.requestData.taskDelete({id: info.id}).then(function(res){
//		        		TF.closeNewFunction();
//		        	})
	        		TF.openNewFunction('createTask',{task:info})
    			break;
    			case 'redo':
        			TF.requestData.taskStatusChange({id: info.id, status_code: 1}).then(function(res){
		        		TF.notice.message('已经重新执行任务!');
		        		TF.closeNewFunction();
		        		TF.refreshTask()
		        	})
    			break;
    			case 'delete': 
        			TF.requestData.taskDelete({id: info.id}).then(function(res){
		        		TF.notice.message('删除任务成功!');
		        		TF.closeNewFunction();
		        		TF.refreshTask()
		        	})
    			break;
    		}
        })
    }
})(TF)