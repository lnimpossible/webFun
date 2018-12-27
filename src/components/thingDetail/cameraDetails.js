(function(TF){
	let cacheData;
    TF.genCameraDetails = function(selector, cameraData){
    	var data;
    	data = (typeof cameraData == 'string')? cacheData:cacheData=cameraData;
    	
	    var nodeStr =   `<div class="camera-details thing-detail">
                    <div class="camera-detail-close close-btn">
                        <img class="mr8" src="static/image/layout/common/red-close.png" alt="">
                        关闭
                    </div>
                    <p class="thing-detail-name mb40">
                    	监控：${data.name}
                        <span class="green-state-dot"></span>
                    </p>
                    <div class="camera-txt thing-detail-body">
                        <ul class="fl">
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">设备名称：</span>
                                <span class="thing-detail-v">${data.name}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">拍摄区域：</span>
                                <span class="thing-detail-v">${data.name}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">IP地址：</span>
                                <span class="thing-detail-v">${data.ip}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">设备类型：</span>
                                <span class="thing-detail-v">${data.type}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">当前状态：</span>
                                <span class="thing-detail-v">正常</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">所属nvrip:</span>
                                <span class="thing-detail-v">${(data.nvrip||'无')}</span>
                            </li>
                        </ul>
                        <div class="camera-video">
                        	<video class="video" src="" autoplay="autoplay" loop="loop" style="width:100%;"></video>
                            <img class="full-screen" src="static/image/layout/common/camera-detail-fullscreen.png" alt="">
                        </div>
                    </div>
                    <ul class="thing-detail-related1 flex justify-between mt70">
                        <li class="camera-detail-nearby" action="device_camera">
                            <img class="v-a-m pr10" src="static/image/layout/common/camera-detail-monitor.png" alt="">
                            <span>周边监控</span>
                        </li>
                        <li class="camera-detail-nearby" action="device_fire_hydrant">
                            <img class="v-a-m pr10" src="static/image/layout/common/camera-detail-broadcast.png" alt="">
                            <span>周边消防栓</span>
                        </li>
                        <li class="camera-detail-nearby" action="user_list">
                            <img class="v-a-m pr10" src="static/image/layout/common/camera-detail-person.png" alt="">
                            <span>周边人员</span>
                        </li>
                    </ul>
                </div>`;
    	
        $('#'+selector).append(nodeStr);
        $('.video').attr('src', 'http://www.skyinfor.cc:58080/tianchengzhineng/buildings.mp4')[0].play();
        $(".camera-detail-close").click(function(){
            TF.closeNewFunction();
            cacheData = null;
        });
        $(".camera-detail-nearby").click(function(){
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
            		data:data,
            		crumb:'camera'
            	}
            	TF.openNewFunction('multipleThing', newFunData)
            })
        });
    }
})(TF)