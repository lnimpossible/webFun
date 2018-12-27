(function(TF){
	var cacheData;
	let userInfo = TF.LoginCache.userInfo;
    TF.genPersonDetails = function(selector, personData){
    	var data;
    	data = (cacheData)? cacheData:cacheData=personData;
    	data = (cacheData)? cacheData:cacheData=personData;
    	var isManager = (userInfo.rank_field.indexOf('TASK') !== -1)? true:false;
    	if(isManager){
    		var action = `<div class="person-details-right-item" action="createTask">
                    		<img src="static/image/layout/common/selected-camera-task.png">
                            <p>派发任务</p>
                    	</div>`;
    	}else{
    		var action = '';
    	}
	    var nodeStr =   `<div class="thing-detail person-detail">
                    <div class="person-detail-close close-btn">
                        <img class="v-a-m mr8" src="static/image/layout/common/red-close.png" alt="">
                        关闭
                    </div>
                    <div class="thing-detail-name flex item-center mb14">
                        <div class="person-detail-avatar-wrap mr10">
                        	<div class="person-detail-avatar" style="background-image: url(${data.avatar})"></div>
                        </div>
                    	<span>${data.nickname}</span>
                    </div>
                    <div class="person-detail-body thing-detail-body">
                        <ul class="fl">
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">姓名：</span>
                                <span class="thing-detail-v">${data.nickname}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">单位：</span>
                                <span class="thing-detail-v">天覆科技</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">部门：</span>
                                <span class="thing-detail-v">${data.department||'技术部门'}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">职位：</span>
                                <span class="thing-detail-v">${(data.job||'无')}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">电话：</span>
                                <span class="thing-detail-v">${(data.phone||'无')}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">邮箱:</span>
                                <span class="thing-detail-v">${(data.email||'无')}</span>
                            </li>
                        </ul>
                        <div class="thing-detail-related2 fr">
                        	<div class="person-details-right-item" action="chat">
                        		<img src="static/image/layout/common/selected-person-chat.png">
                                <p>人员会话</p>
                        	</div>
                        	${action}
                        	<div class="person-details-right-item" action="tracker">
                        		<img src="static/image/layout/common/person-detail-tracker.png">
                                <p>人员轨迹</p>
                        	</div>
                        </div>
                    </div>
                </div>`;
    	
        $('#'+selector).append(nodeStr);
        
        $(".person-detail-close").click(function(){
            TF.closeNewFunction();
            cacheData = null;
        });
        $('.person-details-right-item').click(function(){
        	let action = $(this).attr('action');
        	switch(action){
        		case 'chat':
        			TF.openNewFunction('chat', data);
        			var itemData = data;
        			itemData.content='';
			      	itemData.target_id=data.id;
			      	TF.chatInit.updateChatInfo({
			          	targetAccount:itemData.id,
						targetName:itemData.nickname,
			      		targetHead:itemData.avatar,
			          	chatType:'instant'
					});
			      	TF.chatEffect.insertChatItem(itemData);
        		break;
        		case 'createTask':
        			var taskData = {
        				person:{
        					name: [data.nickname],
        					id: [data.id]
        				},
        				crumb: 'personDetails'
        			};
        			TF.openNewFunction('createTask', taskData);
        		break;
        		case 'tracker': 
					TF.openNewFunction('trackerDate', data)
        		break;
        	}
        })
    }
})(TF)