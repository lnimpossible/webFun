(function(TF){
	let cacheData;
    TF.genPlanDetails = function(selector, planData){
    	var data = planData;
    	var step = "", response = "";
    	planData.plan_response.forEach(function(val,index){
    		var className = (index==0)? 'thing-detail-k':'thing-detail-k hidden';
    		step+='<li class="thing-detail-kv mb10">'+
                                '<span class="'+className+'">操作步骤：</span>'+
                                '<span class="thing-detail-v1">'+
                                	'第'+(index+1)+'步：'+val.name+
                                '</span>'+
                             '</li>';
            response +=	'<li class="thing-detail-kv mb10">'+
	                    '<span class="thing-detail-k">联动响应：</span>'+
	                        '<span class="thing-detail-v2">触发条件：</span>'+
	                        '<span class="thing-detail-v3">'+planData.plan_condition[0].condition_name+'</span>'+
	                    '</li>'+
	                    '<li class="thing-detail-kv mb10">'+
	                        '<span class="thing-detail-k hidden"></span>'+
	                        '<span class="thing-detail-v2">响应名称:</span>'+
	                        '<span class="thing-detail-v3">'+val.name+'</span>'+
	                    '</li>'+
	                    '<li class="thing-detail-kv mb10">'+
	                        '<span class="thing-detail-k hidden"></span>'+
	                        '<span class="thing-detail-v2">响应类型:</span>'+
	                        '<span class="thing-detail-v3">'+val.response_type+'</span>'+
	                    '</li>'+
	                    '<li class="thing-detail-kv mb10">'+
	                        '<span class="thing-detail-k hidden"></span>'+
	                        '<span class="thing-detail-v2">操作行为:</span>'+
	                        '<span class="thing-detail-v3">'+val.response_action+'</span>'+
	                    '</li>';
    	})
	    var nodeStr =   `<div class="plan-details thing-detail">
                    <div class="plan-detail-close close-btn">
                        <img class="mr8" src="static/image/layout/common/red-close.png" alt="">
                        关闭
                    </div>
                    <p class="thing-detail-name mb40">${planData.name}</p>
                    <div class="plan-detail-body thing-detail-body">
                        <ul class="plan-detail-list nice-scroll">
                        	${step}
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">名称：</span><span class="thing-detail-v1">${planData.name}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">定制时间：</span><span class="thing-detail-v1">${planData.create_time||planData.update_time}</span>
                            </li>
                            ${response}
                        </ul>
                    </div>
                </div>`;
    	
        $('#'+selector).append(nodeStr);
        TF.setScroll();
        $(".plan-detail-close").click(function(){
            TF.closeNewFunction();
        });
    }
})(TF)