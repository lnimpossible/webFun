(function(TF){
	let cacheData;
    let userInfo = TF.LoginCache.userInfo;
    TF.genTaskDetails = function(selector, taskData){
    	var data;
    	data = (cacheData)? cacheData:cacheData=taskData;
    	console.log(data)
    	var person = data.accept_user_list.map(function(val){
    		return val.nickname
    	})
    	var exp = data.status_code.toString();
    	var myId=userInfo.id, taskId=data.send_user_id;
    	var handleType="";
    	if(myId!=taskId && exp=='1'){
    		handleType = '<img src="static/image/layout/common/situation-detail-handle.png">'+
                        	'<p>处理任务</p>';
    	}
    	if(myId!=taskId && exp=='2'){
    		handleType='<img src="static/image/layout/common/situation-detail-done.png">'+
                       '<p>完成任务</p>';
    	}
    	if(myId==taskId && exp=='3'){
			handleType ='<img src="static/image/layout/common/situation-detail-verify.png">'+
                       '<p>任务审核</p>';
		}
    	if(myId==taskId && exp=='5'){
			handleType ='<img src="static/image/layout/common/situation-detail-verify.png">'+
                       '<p>任务审核</p>';
		}
    	var handle = '<li class="task-details-handle">'+
    					handleType+
    				'</li>';
    	if(data.picture){
    		var picArr = data.picture.split(',');
    		var picDom = "";
    		picArr.forEach(function(val,index){
    			if(index==0){
    				picDom += '<span class="thing-detail-picture task-detail-picture ml10 mr5" '+
    				'style="background-image: url('+val+')"></span>';
    			}else{
    				picDom += '<span class="thing-detail-picture task-detail-picture mr5" '+
    				'style="background-image: url('+val+')"></span>';
    			}
    		})
    	}else{
    		var picDom = '<span class="thing-detail-v">无</span>'
    	}
    	if(data.audio){
    		var audioDom = document.createElement('audio');
    		audioDom.setAttribute('src', data.audio);
    		audioDom.onloadedmetadata = function () {  
    			var time = Math.ceil(audioDom.duration);
    			if(time!==0){
    				$('.audio-time').html( Math.ceil(audioDom.duration)+'”' )
    			}else{
    				$('.audio-time').html('无效的语音')
    			}
		    }
    		audioDom.onended = function () {  
		        $('.audo-stop-img').show();
        		$('.audo-play-img').hide()
		    }
    		var audiItem = `<span class="thing-detail-v audio-play">
                            	<img class="audo-stop-img v-a-m" src="./static/image/layout/common/voice-stop.png" />
                            	<img class="audo-play-img v-a-m" src="./static/image/layout/common/voice-play.gif" />
                            </span>
                            <span class="audio-time"></span>`;
    	}else{
    		var audiItem = `<span class="thing-detail-v">无</span>`
    	}
    	var nodeStr =   `<div class="task-details thing-detail">
                        <div class="task-detail-close close-btn">
                            <img class="mr8" src="static/image/layout/common/red-close.png" alt="">
                            关闭
                        </div>
                        <p class="thing-detail-name mb40">
                        	${data.name}
                            <span class="red-state-dot"></span>
                        </p>
                        <div class="task-detail-body thing-detail-body">
                            <ul class="fl nice-scroll">
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">地址：</span>
                                    <span class="thing-detail-v">${data.name}</span>
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">执行人：</span>
                                    <span class="thing-detail-v">${person.join(',')}</span>
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">类型：</span>
                                    <span class="thing-detail-v">${data.type_name}</span>
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">状态：</span>
                                    <span class="thing-detail-v">${data.status_name}</span>
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">图片:</span>
                                    ${picDom}
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">语音:</span>
                                    ${audiItem}
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">视频:</span>
                                    <span class="thing-detail-v check-video">${data.video? '点击查看视频':'无'}</span>
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">备注：</span>
                                    <span class="thing-detail-v">${data.details||'无备注'}</span>
                                </li>
                            </ul>
                            <ul class="thing-detail-related2 fr">
	                            <li class="task-details-right-item" action="device_camera">
                                    <img src="static/image/layout/common/situation-detail-camera.png" alt="">
                                    <p>周边监控</p>
                                </li>
                                <li class="task-details-right-item" action="device_fire_hydrant">
                                    <img src="static/image/layout/common/situation-detail-broadcast.png" alt="">
                                    <p>周边消防栓</p>
                                </li>
                                <li class="task-details-right-item" action="user_list">
                                    <img src="static/image/layout/common/situation-detail-person.png" alt="">
                                    <p>周边人员</p>
                                </li>
                                ${handle}
	                        </ul>
                        </div>
                    </div>`;
    	
        $('#'+selector).append(nodeStr);
        TF.setScroll();
        $(".task-detail-close").click(function(){
            TF.closeNewFunction();
            cacheData = null;
        });
        $('.task-detail-picture').click(function(){
        	if(!data.picture){return};
        	TF.picOrVideo({
        		type: 'picture',
        		data: picArr
        	})
        })
        $('.audio-play').click(function(){
        	if(!data.audio || $('.audio-time').html()=='无效的语音'){return};
        	audioDom.play();
        	$('.audo-stop-img').hide();
        	$('.audo-play-img').show()
        })
        $('.check-video').click(function(){
        	if(!data.video){return};
        	TF.picOrVideo({
        		type: 'video',
        		data: data.video
        	})
        })
		$(".task-details-right-item").click(function(){
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
            	TF.openNewFunction('multipleThing', {thingType:thingType, data:data, crumb:'task'})
            })
        });
		$('.task-details-handle').click(function(){
			var action = $(this).find('p').html();
        	switch(action){
        		case '处理任务': 
        		TF.openNewFunction('taskHandle',data)
        		break;
        		case '完成任务': 
        		TF.requestData.taskStatusChange({id: data.id, status_code: 3}).then(function(res){
	        		TF.closeNewFunction();
	        		TF.refreshTask();
	        		cacheData = null;
	        	})
        		break;
        		case '任务审核': 
        		(exp=='3')? TF.openNewFunction('taskVerify', data):
        		TF.openNewFunction('taskRefuseVerify', data)
        		break;
        	}
        	cacheData = null;
		})
    }
})(TF)