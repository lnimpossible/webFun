(function(TF){
	let cacheData;
	let userInfo = TF.LoginCache.userInfo;
    TF.genSelectedPerson = function(selector,personData){
    	var data;
    	data = (typeof personData == 'string')? cacheData:cacheData=personData;
    	var isManager = (userInfo.rank_field.indexOf('TASK') !== -1)? true:false;
    	if(isManager){
    		var action = `<div class="selected-thing-action selected-person-task">
                            <img src="static/image/layout/common/selected-camera-task.png" alt="">
                            <p>派发任务</p>
                        </div>`;
    	}else{
    		var action = '';
    	}
    	var activePersonIndex = [];
    	var nodeStr =   `<div class="selected-person selected-thing">
                        <div class="selected-person-back back-btn">
                            <img class="mr8" src="static/image/layout/common/back-btn.png" alt="">
                            返回
                        </div>
                        <div class="selected-person-close close-btn">
                            <img class="mr8" src="static/image/layout/common/red-close.png" alt="">
                            关闭
                        </div>
                        <p class="selected-thing-name mb40">已选人员（${data.data.length}人）</p>
                        <div class="selected-thing-body">
                            <ul class="fl">
                            	${data.data.map((val,index) => `
								    <li class="selected-person-item mb10" index="${index}">
	                                    <span class="selected-thing-item3">${val.nickname}：</span>
	                                    <span class="selected-thing-item3">${val.department||'技术部'}</span>
	                                    <span class="selected-thing-item3">${val.job}</span>
	                                </li>
								`).join('')}
                            </ul>
                            <div class="fr selected-thing-actions">
                                <div class="selected-thing-action selected-person-chat">
                                    <img src="static/image/layout/common/selected-person-chat.png" alt="">
                                    <p>人员会话</p>
                                </div>
                                ${action}
                            </div>
                        </div>
                    </div>`;
    	
        $('#'+selector).append(nodeStr);
        
        // 返回
        $('.selected-person-back').click(function(){
        	(cacheData.crumb)? 
        	TF.openNewFunction('thingDetail', cacheData.crumb):$(".close-btn").click();
        	cacheData = null;
        })
        // 关闭
        $(".selected-person-close").click(function(){
            TF.closeNewFunction();
            cacheData = null;
        })
        $('.selected-person-item').click(function(){
        	var index = $(this).attr('index');
        	var seat = activePersonIndex.indexOf(index);
        	if(seat==-1){
        		activePersonIndex.push(index);
        		$(this).addClass('selected-thing-active')
        	}else{
        		activePersonIndex.splice(seat,1);
        		$(this).removeClass('selected-thing-active')
        	}
        })
        $('.selected-person-chat').click(function(){
        	if(activePersonIndex.length==0){
        		TF.notice.message('请选择至少一人聊天!');
        		return
        	}
        	if(activePersonIndex.length==1){
        		var chatdata = data.data[activePersonIndex[0]];
    			var itemData = chatdata;
				itemData.target_id= chatdata.user_id;
	      		TF.openNewFunction('chat', itemData);
		      	TF.chatInit.updateChatInfo({
		          	targetAccount:itemData.user_id,
					targetName:itemData.nickname,
		      		targetHead:itemData.avatar,
		          	chatType:'instant'
				});
		      	TF.chatEffect.insertChatItem(itemData);
		      	TF.updateScroll()
		      	return
        	}
        	var chatPerson = {};
        	activePersonIndex.forEach(function(i){
	    		chatPerson[data.data[i].user_id] = data.data[i]
	    	})
        	TF.chatEffect.createTalkGroup(chatPerson,$('.group-name-input').val());
	       	TF.openNewFunction('chat');
       	})
        $('.selected-person-task').click(function(){
        	var personName = [], personId = [];
	    	activePersonIndex.forEach(function(i){
	    		personName.push(data.data[i].nickname);
	    		personId.push(data.data[i].user_id)
	    	})
	       TF.openNewFunction('createTask', {
	    		crumb: 'person',
	    		person: {
	    			name: personName,
	    			id: personId
	    		}
	       });
       	})
    }
})(TF)