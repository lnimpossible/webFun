(function(TF){
    let handleType;
    var nodeStr='<div class="ejection">'+
                    '<p class="ejection-top">处理情况</p>'+
                    '<div class="ejection-content">'+
                    	'<div class="ejection-item ejection-situation-handle ejection-handle-situation" action="handle">处理情况</div>'+
                    	'<div class="ejection-item ejection-situation-handle ejection-report-situation" action="report">报告情况</div>'+
                    '</div>'+
                    '<div class="ejection-buttons">'+
                    	'<div class="ejection-button situation-handle-btn" action="ok">确定</div>'+
                    	'<div class="ejection-button situation-handle-btn" action="cancel">取消</div>'+
                    '</div>'+
                '</div>';
    TF.genSituationHandle=function(selector, info){
        $('#'+selector).append(nodeStr);
        
        $('.ejection-situation-handle').click(function(){
        	$(this).addClass('ejection-item-active')
        	.siblings().removeClass('ejection-item-active');
        	handleType = $(this).attr('action');
        })
        $('.situation-handle-btn').click(function(){
        	var action = $(this).attr('action');
        	if(action=='cancel'){
        		TF.closeNewFunction();
        	}else{
        		if(!handleType){
	        		TF.notice.message('请选择情况处理方式!');
	        		return
	        	}
        		if(handleType=='handle'){
		        	TF.requestData.situationStatusChange({id: info.id, status_code: 2}).then(function(res){
		        		TF.notice.message('处理成功!');
		        		TF.closeNewFunction();
		        	})
        		}
        	}
        	
        	
        })
    }
})(TF)