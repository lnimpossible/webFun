(function(TF){
    let handleType;
    var nodeStr='<div class="ejection">'+
                    '<p class="ejection-top">情况审核</p>'+
                    '<div class="ejection-content">'+
                    	'<div class="ejection-item ejection-situation-verify ejection-pass-situation" action="pass">通过审核</div>'+
                    	'<div class="ejection-item ejection-situation-verify ejection-redo-situation" action="redo">重新处理</div>'+
                    	'<div class="ejection-item ejection-situation-verify ejection-redo-situation" action="assign">派发任务</div>'+
                    '</div>'+
                    '<div class="ejection-buttons">'+
                    	'<div class="ejection-button situation-verify-btn" action="ok">确定</div>'+
                    	'<div class="ejection-button situation-verify-btn" action="cancel">取消</div>'+
                    '</div>'+
                '</div>';
    TF.genSituationVerify=function(selector, info){
        $('#'+selector).append(nodeStr);
        
        $('.ejection-situation-verify').click(function(){
        	$(this).addClass('ejection-item-active')
        	.siblings().removeClass('ejection-item-active');
        	handleType = $(this).attr('action');
        })
        $('.situation-verify-btn').click(function(){
        	var action = $(this).attr('action');
        	if(action=='cancel'){
        		TF.closeNewFunction();
        		return
        	}
        	if(!handleType){
        		TF.notice.message('请选择是否通过审核!');
        		return
        	}
        	switch(handleType){
        		case 'pass': 
        		TF.requestData.situationStatusChange({id: info.id, status_code: 4}).then(function(res){
	        		TF.closeNewFunction();
	        		TF.refreshSituation();
	        		TF.earthExecute.removeEvent(info.id)
	        	})
        		break;
        		case 'redo': 
        		TF.requestData.situationStatusChange({id: info.id, status_code: 2}).then(function(res){
	        		TF.closeNewFunction();
	        		TF.refreshSituation()
	        	})
        		break;
        		case 'assign':
        		if(ControlVar.moduleName = 'monitor'){
        			TF.menuMasterClick(1); 
        			setTimeout(function(){
        				TF.handleSituation(info)
        			})
        		}else{
        			TF.handleSituation(info);
        		}
    			TF.closeNewFunction();
        		break;
        	}
        })
    }
})(TF)