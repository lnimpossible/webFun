(function(TF){
	let userInfo = TF.LoginCache.userInfo;
	let cache = null, crumb;

    var nodeStr=`<div class="new-task">
    				<div class="new-task-back back-btn">
                        <img class="mr8" src="static/image/layout/common/back-btn.png" alt="">
                        返回
                    </div>
                    <div class="new-task-close close-btn">
                        <img class="mr8" src="static/image/layout/common/red-close.png" alt="">
                        关闭
                    </div>
                    <p class="new-task-title">正在创建新任务......</p>
                    <div class="new-task-content">
                        <ul>
                            <li class="mt10 pr">
                            	<i class="fa fa-star red necessary"></i>
                                <span class="new-task-k mr8">任务名称：</span>
                                <input class="new-task-name" type="text">
                            </li>
                            <li class="mt10 pr">
	                        	<i class="fa fa-star red necessary"></i>
	                            <span class="new-task-k mr8">任务类型：</span>
	                           	<span class="new-task-type">
	                           		<span class="task-type-name" type-id="">选择类型</span>
	                           		<i class="fa fa-chevron-down fr mt5 "></i>
	                           	</span>
	                           	<ul class="new-task-type-list">
	                           		<li class="task-type" type-id="1">日常任务</li>
	                           		<li class="task-type" type-id="2">突发任务</li>
	                           	</ul>
	                        </li>
                            <li class="mt10 pr">
                            	<i class="fa fa-star red necessary"></i>
                                <span class="new-task-k mr8">执行人员：</span>
                                <input class="task-person" value="" type="text">
                                <span class="new-task-b new-task-person"></span>
                            </li>
                            <li class="mt10 pr">
                            	<i class="fa fa-star red necessary"></i>
                                <span class="new-task-k mr8">地理位置：</span>
                                <input readonly="readonly" class="new-task-pos" type="text">
                                <span class="new-task-b new-task-position"></span>
                            </li>
                            <li class="mt10">
                                <span class="new-task-k mr8">上传图片：</span>
                                <input type="file" id="task-picture" style="display:none;" accept="image/png, image/jpeg"/>
                                <label for="task-picture" class="new-task-b1 add-task-picture">
                                    <i class="fa fa-plus"></i>
                                </label>
                            </li>
                            <li class="mt10">
                                <span class="new-task-k mr8">上传语音：</span>
                                <input class="task-voice-name" type="text" readonly="readonly">
                                <input type="file" id="task-voice" style="display:none;" accept=".mp3"/>
                                <label for="task-voice" class="new-task-b add-task-voice"></label>
                            </li>
                            <li class="mt10">
                                <span class="new-task-k mr8">上传视频：</span>
                                <input class="task-video-name" type="text" readonly="readonly">
                                <input type="file" id="task-video" style="display:none;" accept=".mp4,.mov"/>
                                <label for="task-video" class="new-task-b add-task-video"></label>
                            </li>
                            <li class="mt10">
                                <span class="new-task-k mr8">任务备注：</span>
                                <textarea class="new-task-remark" cols="30" rows="10" style="resize:none;"></textarea>
                            </li>
                        </ul>
                    </div>
                    <div class="new-task-ensure mt10">
                        确认发布任务
                    </div>
                </div>`;
    TF.genNewTask = function(selector, data){
        $('#'+selector).append(nodeStr);
        if(data&&data.crumb){
        	crumb=data.crumb;
        }
        // 读取缓存的数据
        if(cache){
        	cache.name && $('.new-task-name').val(cache.name);
        	cache.person && $('.task-person').val(cache.person.name.join(','));
        	if(cache.type){
        		$('.task-type-name').html(cache.type.name)
       		.attr('type-id', cache.type.id);
        	}
        	cache.address && $('.new-task-pos').val(cache.address.name);
        	if(cache.picture){
        		cache.picture.forEach(function(val, index){
        			var previewDom = '<div class="task-picture-preview" style="background-image: url('+val+')"></div>';
           			$('#task-picture').before(previewDom);
           			(index==2)&&$('.add-task-picture').remove();
        		})
        	}
        	cache.voice && $('.task-voice-name').val(cache.voice.name);
        	cache.video && $('.task-video-name').val(cache.video.name);
        	cache.remark && $('.new-task-remark').val(cache.remark);
        }else{
        	cache = {};
        }
        // 读取参数中的数据
        if(data){
        	if(data.person){ // 人员信息
        		$('.task-person').val(data.person.name.join(','));
        		cache.person = {};
        		cache.person.name = data.person.name;
        		cache.person.id = data.person.id;
        	}
        	if(data.task){ // 任务信息
        		$('.new-task-name').val(data.task.name);
        		$('.new-task-pos').val(data.task.address);
        		cache.name = data.task.name;
        		cache.address = {
        			name: data.task.address,
        			pos: data.task.position
        		};
        	}
        }
        
        // 返回
        $('.new-task-back').click(function(){
        	if(crumb){
        		(crumb=='personDetails')? 
        		TF.openNewFunction('thingDetail', 'person'):TF.openNewFunction('multipleThing', crumb);
	        	crumb = null;
        	}else{
        		$(".close-btn").click();
        		cache = null;
        	}
        })
        // 关闭
       	$(".new-task-close").click(function(){
            TF.closeNewFunction();
            cache = null;
        })
       	
       	$('.new-task-type').click(function(){
       		$('.new-task-type-list').slideToggle();
       		$(this).find('i').toggleClass('rotate')
       	})
       	$('.new-task-type-list').on('click', 'li', function(){
       		$('.task-type-name').html($(this).html())
       		.attr('type-id', $(this).attr('type-id'));
       		$('.new-task-type-list').slideUp();
       		$('.fa-chevron-down').removeClass('rotate');
       		cache.type = {
       			name: $(this).html(),
       			id: $(this).attr('type-id')
       		}
       	})
       	
       	// 任务名称
       	$('.new-task-name').change(function(){
       		cache.name = $(this).val();
       	})
       	
        // 选择人员
	    $('.new-task-person').click(function(){
	       	TF.openNewFunction('choseTaskPerson', {crumb: 'createTask'})
	    })
	    
	    // 选择位置
	    $('.new-task-position').click(function(){
	    	TF.hideNewFunction();
	    	TF.earthExecute.getPosition(function (position) {
	    		taskPos = position.longitude+','+position.latitude;
		        TF.showNewFunction();
		        TF.requestData.getAddressByPosition(position).then(function(res){
		        	$('.new-task-pos').val(res);
		        	TF.earthExecute.closeGetPoint();
		        	cache.address = {
		        		name: res,
		        		pos: taskPos
		        	}
		        })
		    })
	    })
	    
		// 上传图片
		let pictureUrl = [];
		$('#task-picture').change(function(event){
			var fileObj = event.target.files[0];
           	var formFile = new FormData();
           	formFile.append("action", "UploadVMKImagePath");  
           	formFile.append("file", fileObj);
           	TF.requestData.uploadFile(formFile).then(function(data){
           		pictureUrl.push(data.save_path);
           		cache.picture = pictureUrl;
           		var previewDom = '<div class="task-picture-preview" style="background-image: url('+data.save_path+')"></div>';
           		$('#task-picture').before(previewDom);
           		(pictureUrl.length==3)&&$('.add-task-picture').remove();
           	})
		})
		
		// 上传语音
		let voiceUrl;
		$('#task-voice').change(function(){
			var fileObj = event.target.files[0];
           	var formFile = new FormData();
           	formFile.append("action", "UploadVMKImagePath");  
           	formFile.append("file", fileObj);
           	$('.task-voice-name').val(fileObj.name)
           	TF.requestData.uploadFile(formFile).then(function(data){
           		voiceUrl = data.save_path;
           		cache.voice = {};
           		cache.voice.name = fileObj.name;
           		cache.voice.url = voiceUrl;
           	})
		})
		
		// 上传视频
		let videoUrl;
		$('#task-video').change(function(){
			var fileObj = event.target.files[0];
           	var formFile = new FormData();
           	formFile.append("action", "UploadVMKImagePath");  
           	formFile.append("file", fileObj);
           	$('.task-video-name').val(fileObj.name)
           	TF.requestData.uploadFile(formFile).then(function(data){
           		videoUrl = data.save_path;
           		cache.video = {};
           		cache.video.name = fileObj.name;
           		cache.video.url = voiceUrl;
           	})
		})
		
		// 备注
		$('.new-task-remark').change(function(){
			cache.remark = $(this).val();
		})
	    var clickTime = 0;
	    $('.new-task-ensure').click(function(){
	    	if(!$('.new-task-name').val()){
	    		TF.notice.message('请输入任务名称!');
	    		return 
	    	}
	    	console.log($('.task-type-name').attr('type-id'))
	    	if(!$('.task-type-name').attr('type-id')){
	    		TF.notice.message('请选择任务类型!');
	    		return
	    	}
	    	if(!$('.new-task-pos').val()){
	    		TF.notice.message('请设置任务地理位置!');
	    		return
	    	}
	    	if(clickTime==1){return};
	    	clickTime =1;
	    	
	    	var parama = {
	    		send_user_id: userInfo.id,
	    		name: $('.new-task-name').val(),
	    		type_id: $('.task-type-name').attr('type-id'),
	    		address: $('.new-task-pos').val(),
	    		position: cache.address.pos,
	    		accept_user_id: cache.person.id.join(','),
	    		relation_device: data.device||'',
	    		details: $('.new-task-remark').val()||'',
	    		picture: cache.picture&&cache.picture.join(',')||'',
	    		video: cache.video&&cache.video.url||'',
	    		audio: cache.voice&&cache.voice.url||''
	    	}
	    	TF.closeNewFunction();
	    	TF.requestData.taskUpload(parama).then(function(res){
	    		if(res.code==0){
	    			TF.notice.message('发布任务成功!');
	    			TF.closeNewFunction();
	    			cache = null;
	    		}
	    	})
	    	if(data.situation){
	    		TF.requestData.situationStatusChange({id: info.id, status_code: 4}).then(function(res){
	        		TF.closeNewFunction();
	        		if(data.task){
	        			TF.requestData.taskDelete({id: data.id}).then(function(res){
		        	})
	        		}
	        	})
	    	}
	    })
    }
})(TF)