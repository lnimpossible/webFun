(function(TF){
	var cacheData;
	let userInfo = TF.LoginCache.userInfo;
    TF.genRoomDetails = function(selector, roomData){
    	var data;
    	data = (cacheData)? cacheData:cacheData=roomData;
	    var nodeStr =   `<div class="thing-detail room-detail">
                    <div class="room-detail-close close-btn">
                        <img class="v-a-m mr8" src="static/image/layout/common/red-close.png">
                        关闭
                    </div>
                    <div class="thing-detail-name flex item-center mb14">
                        房间号:
                    </div>
                    <div class="room-detail-body thing-detail-body">
                        <ul class="fl">
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">房间户号：</span>
                                <span class="thing-detail-v">${data.nickname}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">场地来源：</span>
                                <span class="thing-detail-v">天覆科技</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">房间性质：</span>
                                <span class="thing-detail-v">${data.department||'技术部门'}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">所属业主：</span>
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