(function(TF){
	let cacheData;
	let userInfo = TF.LoginCache.userInfo;
    
    TF.genSituationDetails = function(selector, situationData){
    	var data;
    	data = (cacheData)? cacheData:cacheData=situationData;
    	console.log(data)
    	var isManager = (userInfo.rank_field.indexOf('TASK') !== -1)? true:false;
    	var handle = '';
    	var exp = data.status_code.toString();
    	if(!isManager&&exp=='1'){
    		handle = '<li class="situation-details-right-item situation-details-handle">'+
                        '<img src="static/image/layout/common/situation-detail-handle.png">'+
                        '<p>处理情况</p>'+
                    '</li>';
    	}
    	if(!isManager&&exp=='2'){
    		handle='<li class="situation-details-right-item situation-details-handle">'+
                        '<img src="static/image/layout/common/situation-detail-done.png">'+
                       '<p>处理完成</p>'+
                    '</li>';
    	}
    	if(isManager&&exp=='3'){
    		handle ='<li class="situation-details-right-item situation-details-handle">'+
                        '<img src="static/image/layout/common/situation-detail-verify.png">'+
                       '<p>情况审核</p>'+
                    '</li>';
    	}
    	var relatedUserId = data.accept_user_id.split(',');
    	if(relatedUserId.indexOf(userInfo.id)==-1){
    		handle = '';
    	}
    	var situationLevel = (data.level=='一级')? 'red-state-dot':'green-state-dot';
    	if(data.picture){
    		var picArr = data.picture.split(',');
    		var picDom = "";
    		picArr.forEach(function(val,index){
    			if(index==0){
    				picDom += '<span class="thing-detail-picture situation-detail-picture ml10 mr5" '+
    				'style="background-image: url('+val+')"></span>';
    			}else{
    				picDom += '<span class="thing-detail-picture situation-detail-picture mr5" '+
    				'style="background-image: url('+val+')"></span>';
    			}
    		})
    	}else{
    		var picDom = '<span class="thing-detail-v">无</span>'
    	}
    	var nodeStr =   `<div class="situation-details thing-detail">
                        <div class="situation-detail-close close-btn">
                            <img class="mr8" src="static/image/layout/common/red-close.png" alt="">
                            关闭
                        </div>
                        <p class="thing-detail-name mb40">
                            ${data.name}
                            <span class="${situationLevel}"></span>
                        </p>
                        <div class="situation-detail-body thing-detail-body">
                            <ul class="fl nice-scroll">
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">来源：</span>
                                    <span class="thing-detail-v">${data.nickname}</span>
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">类型：</span>
                                    <span class="thing-detail-v">${data.type_name}</span>
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">等级：</span>
                                    <span class="thing-detail-v">${data.level}</span>
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">接收人：</span>
                                    <span class="thing-detail-v">${data.accept_user_nickname}</span>
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">时间：</span>
                                    <span class="thing-detail-v">${data.update_time}</span>
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">位置：</span>
                                    <span class="thing-detail-v">${data.address.slice(6)}</span>
                                </li>
                                <li class="thing-detail-kv mb10 situation-picture">
                                    <span class="thing-detail-k">图片：</span>
                                    ${picDom}
                                </li>
                                <li class="thing-detail-kv audio-item mb10">
                                    <span class="thing-detail-k">语音:</span>
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">视频:</span>
                                    <span class="thing-detail-v check-video">${data.video? '点击查看视频':'无'}</span>
                                </li>
                                <li class="thing-detail-kv mb10">
                                    <span class="thing-detail-k">详情:</span>
                                    <span class="thing-detail-v">${data.details||'无'}</span>
                                </li>
                            </ul>
                            <div class="thing-detail-related2 fr">
	                            <ul>
	                                <li class="situation-details-right-item situation-details-nearby" action="device_camera">
	                                    <img src="static/image/layout/common/situation-detail-camera.png">
	                                    <p>周边监控</p>
	                                </li>
	                                <li class="situation-details-right-item situation-details-nearby" action="device_fire_hydrant">
	                                    <img src="static/image/layout/common/situation-detail-broadcast.png">
	                                    <p>周边消防栓</p>
	                                </li>
	                                <li class="situation-details-right-item situation-details-nearby" action="user_list">
	                                    <img src="static/image/layout/common/situation-detail-person.png">
	                                    <p>周边人员</p>
	                                </li>
	                                ${handle}
	                            </ul>
	                        </div>
                        </div>
                    </div>`;
    	
        $('#'+selector).append(nodeStr);
        TF.setScroll();
        
        if(data.audio){
    		var audioDom = document.createElement('audio');
    		audioDom.setAttribute('src', data.audio);
    		audioDom.onloadedmetadata = function () {  
    			var time = Math.ceil(audioDom.duration);
    			if(time!==0&&time!==Infinity){
    				var audioTime = Math.ceil(audioDom.duration)+'”';
    				var audiItem = `<span class="thing-detail-v audio-play">
                            	<img class="audo-stop-img v-a-m" src="./static/image/layout/common/voice-stop.png" />
                            	<img class="audo-play-img v-a-m" src="./static/image/layout/common/voice-play.gif" />
                            </span>
                            <span class="audio-time">${audioTime}</span>`;
    			}else{
    				var audiItem = `<span class="thing-detail-v audio-play">无</span>`;
    			}
    			$('.audio-item').append(audiItem);
		    }
    		audioDom.onended = function (){  
		        $('.audo-stop-img').show();
        		$('.audo-play-img').hide()
		    }
    	}else{
    		var audiItem = `<span class="thing-detail-v">无</span>`;
    		$('.audio-item').append(audiItem)
    	}
        
        $(".situation-detail-close").click(function(){
            TF.closeNewFunction();
            cacheData = null;
        });
        $('.situation-detail-picture').click(function(){
        	if(!data.picture){return};
        	TF.picOrVideo({
        		type: 'picture',
        		data: picArr
        	})
        })
        $('.audio-item').on('click', '.audio-play', function(){
        	if($(this).html()=='无'){return};
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
        $(".situation-details-nearby").click(function(){
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
            	TF.openNewFunction('multipleThing', {thingType:thingType, data:data, crumb:'situation'})
            })
        });
        $('.situation-details-handle').click(function(){
        	var action = $(this).find('p').html();
        	var access = userInfo.rank_field;
        	switch(action){
        		case '处理情况': 
        		TF.requestData.situationStatusChange({id: data.id, status_code: 2}).then(function(res){
	        		TF.closeNewFunction();
	        	})	
        		break;
        		case '处理完成': 
        		TF.requestData.situationStatusChange({id: data.id, status_code: 3}).then(function(res){
	        		TF.notice.message('处理完成!');
	        		TF.closeNewFunction();
	        	})	
        		break;
        		case '情况审核': 
        		TF.openNewFunction('situationVerify', data)	
        		break;
        	}
        	TF.refreshNewestSituation();
        	(TF.refreshSituation!==undefined)&&TF.refreshSituation();
        	cacheData = null;
        })
    }
})(TF)