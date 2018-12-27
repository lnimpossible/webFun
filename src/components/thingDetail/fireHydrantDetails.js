(function(TF){
	let cacheData;
    TF.genFireHydrantDetails = function(selector, hydrantData){
    	var data;
    	data = (typeof hydrantData == 'string')? cacheData:cacheData=hydrantData;
    	
	    var nodeStr = `<div class="hydrant-details thing-detail">
                    <div class="hydrant-detail-close close-btn">
                        <img class="mr8" src="static/image/layout/common/red-close.png" alt="">
                        关闭
                    </div>
                    <p class="thing-detail-name mb40">
                    	消防栓：${data.name}
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
                                <span class="thing-detail-k">负责人：</span>
                                <span class="thing-detail-v">${data.duty_person_name}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">负责人电话：</span>
                                <span class="thing-detail-v">${data.duty_person_phone}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">当前状态：</span>
                                <span class="thing-detail-v">正常</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">管理归属:</span>
                                <span class="thing-detail-v">${data.ascription}</span>
                            </li>
                        </ul>
                        <ul class="thing-detail-related2 fr">
	                        <li class="hydrant-details-right-item hydrant-detail-nearby" action="device_camera">
                                <img src="static/image/layout/common/situation-detail-camera.png" alt="">
                                <p>周边监控</p>
                            </li>
                            <li class="hydrant-details-right-item hydrant-detail-nearby" action="device_fire_hydrant">
                                <img src="static/image/layout/common/situation-detail-broadcast.png" alt="">
                                <p>周边消防栓</p>
                            </li>
                            <li class="hydrant-details-right-item hydrant-detail-nearby" action="user_list">
                                <img src="static/image/layout/common/situation-detail-person.png" alt="">
                                <p>周边人员</p>
                            </li>
	                    </ul>
                    </div>
                </div>`;
    	
        $('#'+selector).append(nodeStr);
        $(".hydrant-detail-close").click(function(){
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
            		crumb: 'fireHydrant'
            	}
            	TF.openNewFunction('multipleThing', newFunData)
            })
        });
    }
})(TF)