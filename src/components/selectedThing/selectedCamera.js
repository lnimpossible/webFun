(function(TF){
	let cacheData, prePage, selectedCamera = {};
	let userInfo = TF.LoginCache.userInfo;
    TF.genSelectedCamera = function(selector, cameraData){
    	var data;
    	data = (typeof cameraData == 'string')? cacheData:cacheData=cameraData;
    	var isManager = (userInfo.rank_field.indexOf('TASK') !== -1)? true:false;
    	if(isManager){
    		var action = `<div class="selected-thing-action selected-camera-task">
                <img class="mb10" src="static/image/layout/common/selected-camera-task.png" alt="">
                <p>派发任务</p>
            </div>`;
    	}else{
    		var action = '';
    	}
	    var nodeStr = `<div class="selected-camera selected-thing">
                    <div class="selected-camera-back back-btn">
                        <img class="mr8" src="static/image/layout/common/back-btn.png" alt="">
                        返回
                    </div>
                    <div class="selected-camera-close close-btn">
                        <img class="mr8" src="static/image/layout/common/red-close.png" alt="">
                        关闭
                    </div>
                    <p class="selected-thing-name mb40">已选监控摄像头（${data.data.length}台）</p>
                    <div class="selected-thing-body">
                        <ul class="fl mutiple-thing-box nice-scroll">
                        	${data.data.map(val => `
							    <li class="mb10 selected-camera-item">
                                    <span class="selected-thing-item1">${val.name}：</span>
                                    <span class="selected-thing-item2">
                                        <span class="green-state-dot"></span>正常
                                    </span>
                                </li>
							`).join('')}
                        </ul>
                        <div class="fr selected-thing-actions">
                            <div class="selected-thing-action selected-camera-screen">
                                <img class="mb10" src="static/image/layout/common/selected-camera-monitor.png" alt="">
                                <p>监控画面</p>
                            </div>
                            ${action}
                        </div>
                    </div>
                </div>`;
    	
        $('#'+selector).append(nodeStr);
        TF.setScroll();
        
        // 返回
        $('.selected-camera-back').click(function(){
        	(cacheData.crumb)? 
        	TF.openNewFunction('thingDetail', cacheData.crumb):$(".close-btn").click();
        })
        // 关闭
        $(".selected-camera-close").click(function(){
            TF.closeNewFunction();
            cacheData = null;
        })
        $('.selected-camera-item').click(function(){
        	var cameraData = data.data[$(this).index()];
        	if(cameraData.id in selectedCamera){
        		delete selectedCamera[cameraData.id];
        		$(this).removeClass('selected-thing-active');
        	}else{
        		selectedCamera[cameraData.id] = cameraData;
        		$(this).addClass('selected-thing-active');
        	}
        })
        /* 调试 */
       	$('.selected-camera-task').click(function(){
       		var relatedDevice = cameraData.data.map(function(val){
//     			return val.id
				return val.theone
       		})
	       TF.openNewFunction('createTask', {
	       		crumb: 'camera',
	       		device: relatedDevice.join(',')
	       });
       	})
    }
})(TF)