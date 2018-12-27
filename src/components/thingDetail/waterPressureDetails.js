(function(TF){
	let cacheData;
    TF.genWaterPressureDetails = function(selector, waterPressure){
    	var data;
    	data = (cacheData)? cacheData:cacheData=waterPressure;
    	
	    var nodeStr =   `<div class="water-pressure-details thing-detail">
                    <div class="water-pressure-detail-close close-btn">
                        <img class="mr8" src="static/image/layout/common/red-close.png" alt="">
                        关闭
                    </div>
                    <p class="thing-detail-name mb40">
                    	水压：${data.name}
                        <span class="green-state-dot"></span>
                    </p>
                    <div class="thing-detail-body">
                        <ul class="fl">
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">设备名称：</span>
                                <span class="thing-detail-v">${data.name}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">设备地址：</span>
                                <span class="thing-detail-v">${data.address}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">当前水压：</span>
                                <span class="thing-detail-v">${data.value}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">管理归属:</span>
                                <span class="thing-detail-v">商务区</span>
                            </li>
                        </ul>
                        <ul class="thing-detail-related2 fr">
	                        <li class="water-pressure-details-right-item hydrant-detail-nearby" action="device_camera">
                                <img src="static/image/layout/common/situation-detail-camera.png" alt="">
                                <p>周边监控</p>
                            </li>
                            <li class="water-pressure-details-right-item hydrant-detail-nearby" action="device_fire_hydrant">
                                <img src="static/image/layout/common/situation-detail-broadcast.png" alt="">
                                <p>周边消防栓</p>
                            </li>
                            <li class="water-pressure-details-right-item hydrant-detail-nearby" action="user_list">
                                <img src="static/image/layout/common/situation-detail-person.png" alt="">
                                <p>周边人员</p>
                            </li>
	                    </ul>
                    </div>
                </div>`;
    	
        $('#'+selector).append(nodeStr);
        $(".water-pressure-detail-close").click(function(){
            TF.closeNewFunction();
            cacheData = null;
        });
        $(".hydrant-detail-nearby").click(function(){
        	var action = $(this).attr('action');
        	var parameter = {
        		position: data.position,
        		type: action
        	}
            TF.requestData.nearby(parameter).then(function(data){
            	var thingType;
            	switch(action){
            		case 'device_camera': thingType='camera'; break;
            		case 'device_fire_hydrant': thingType='hydrant'; break;
            		case 'user_list': thingType='person'; break;
            	}
            	var newFunData = {
            		thingType: thingType,
            		data: data,
            		crumb: 'waterPressure'
            	}
            	TF.openNewFunction('multipleThing', newFunData)
            })
        });
    }
})(TF)