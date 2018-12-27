(function(TF){
	let cacheData,prePage;
	let userInfo = TF.LoginCache.userInfo;
    TF.genSelectedHydrant = function(selector,hydrantData){
    	var data;
    	data = (typeof hydrantData == 'string')? cacheData:cacheData=hydrantData;
    	var isManager = (userInfo.rank_field.indexOf('TASK') !== -1)? true:false;
    	if(isManager){
    		var action = `<div class="selected-thing-action selected-broadcast-task">
                            <img class="mb10" src="static/image/layout/common/selected-camera-task.png" alt="">
                            <p>派发任务</p>
                        </div>`;
    	}else{
    		var action = '';
    	}
	    var nodeStr =   `<div class="selected-broadcast selected-thing">
                    <div class="selected-broadcast-back back-btn">
                        <img class="mr8" src="static/image/layout/common/back-btn.png" alt="">
                        返回
                    </div>
                    <div class="selected-broadcast-close close-btn">
                        <img class="mr8" src="static/image/layout/common/red-close.png" alt="">
                        关闭
                    </div>
                    <p class="selected-thing-name mb40">已选消防栓（${hydrantData.data.length}台）</p>
                    <div class="selected-broadcast-content selected-thing-content">
                        <ul class="fl">
                            ${hydrantData.data.map(val => `
							    <li class="mb10">
                                    <span class="selected-thing-item1">${val.name}：</span>
                                    <span class="selected-thing-item2">
                                        <span class="green-state-dot"></span>正常
                                    </span>
                                </li>
							`).join('')}
                        </ul>
                        <div class="fr selected-thing-actions">
                            ${action}
                        </div>
                    </div>
                </div>`;
        $('#'+selector).append(nodeStr);
        
        // 返回
        $('.selected-broadcast-back').click(function(){
        	(cacheData.crumb)? 
        	TF.openNewFunction('thingDetail', cacheData.crumb):$(".close-btn").click();
        })
        // 关闭
        $(".selected-broadcast-close").click(function(){
            TF.closeNewFunction();
        })
        
        $('.selected-broadcast-task').click(function(){
        	var relatedDevice = hydrantData.data.map(function(val){
//     			return val.id
				return val.theone
       		})
	       TF.openNewFunction('createTask', {
	       		crumb: 'broadcast',
	       		device: relatedDevice.join(',')
	       });
       	})
    }
})(TF)