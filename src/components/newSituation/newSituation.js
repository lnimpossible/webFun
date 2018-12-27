(function(TF){
	let prePage;
	let userInfo = TF.LoginCache.userInfo;
	let cache = null, typeArr;
	
	TF.genNewSituation=function(selector, data){
		TF.requestData.situationTypeList().then(function(typeData){
			console.log(typeData)
			typeArr = typeData;
			genNewSituation(selector, data)
		})
	}
    function genNewSituation(selector, data){
    	var typeDom = "";
    	typeArr.forEach(function(type){
    		typeDom+=`<li class="situation-type" type-id="${type.id}">${type.name}</li>`;
    	})
	    var nodeStr=`<div class="new-situation">
                <div class="new-situation-close close-btn">
                    <img class="mr8" src="static/image/layout/common/red-close.png" alt="">
                    关闭
                </div>
                <p class="new-situation-title">正在创建新情况......</p>
                <div class="new-situation-content">
                    <ul>
                        <li class="mt10 pr">
                        	<i class="fa fa-star red necessary"></i>
                            <span class="new-situation-k mr8">情况名称：</span>
                            <input class="new-situation-name" type="text">
                        </li>
                        <li class="mt10 pr">
                        	<i class="fa fa-star red necessary"></i>
                            <span class="new-situation-k mr8">情况类型：</span>
                           	<span class="new-situation-type">
                           		<span class="situation-type-name" type-id="">选择类型</span>
                           		<i class="fa fa-chevron-down fr mt5 mr10"></i>
                           	</span>
                           	<ul class="new-situation-type-list">
                           		${typeDom}
                           	</ul>
                        </li>
                        <li class="mt10 pr">
                        	<i class="fa fa-star red necessary"></i>
                            <span class="new-situation-k mr8">情况小类：</span>
                           	<span class="new-situation-type">
                           		<span class="situation-type-name" type-id="">选择类型</span>
                           		<i class="fa fa-chevron-down fr mt5 mr10"></i>
                           	</span>
                           	<ul class="new-situation-type-list">
                           		${typeDom}
                           	</ul>
                        </li>
                        <li class="mt10 pr">
                        	<i class="fa fa-star red necessary"></i>
                            <span class="new-situation-k mr8">地理位置：</span>
                            <input readonly="readonly" class="new-situation-pos" type="text">
                            <span class="new-situation-b new-situation-position"></span>
                        </li>
                        <li class="mt10">
                            <span class="new-situation-k mr8">上传图片：</span>
                            <input type="file" id="situation-picture" style="display:none;" accept="image/png, image/jpeg"/>
                            <label for="situation-picture" class="new-situation-b1 add-situation-picture">
                                <i class="fa fa-plus"></i>
                            </label>
                        </li>
                        <li class="mt10">
                            <span class="new-situation-k mr8">上传语音：</span>
                            <input class="situation-voice-name" type="text" readonly="readonly">
                            <input type="file" id="situation-voice" style="display:none;" accept=".mp3"/>
                            <label for="situation-voice" class="new-situation-b add-situation-voice"></label>
                        </li>
                        <li class="mt10">
                            <span class="new-situation-k mr8">上传视频：</span>
                            <input class="situation-video-name" type="text" readonly="readonly">
                            <input type="file" id="situation-video" style="display:none;" accept=".mp4,.mov"/>
                            <label for="situation-video" class="new-situation-b add-situation-video"></label>
                        </li>
                        <li class="mt10">
                            <span class="new-situation-k mr8">情况备注：</span>
                            <textarea class="new-situation-remark" cols="30" rows="10" style="resize:none;"></textarea>
                        </li>
                    </ul>
                </div>
                <div class="new-situation-ensure mt10">
                    确认创建情况
                </div>
            </div>`;
    	
        $('#'+selector).append(nodeStr);
		
        // 关闭
       	$(".new-situation-close").click(function(){
            TF.closeNewFunction();
            cache = null;
        })
       	
       	// 情况类型
       	$('.new-situation-type').click(function(){
       		$('.new-situation-type-list').slideToggle();
       		$(this).find('i').toggleClass('rotate')
       	})
       	$('.new-situation-type-list').on('click', 'li', function(){
       		$('.situation-type-name').html($(this).html())
       		.attr('type-id', $(this).attr('type-id'));
       		$('.new-situation-type-list').slideUp();
       		$('.fa-chevron-down').removeClass('rotate')
       	})
	    
	    // 选择位置
	    let address,pos;
	    $('.new-situation-position').click(function(){
	    	TF.hideNewFunction();
	    	TF.earthExecute.getPosition(function (position) {
	    		situationPos = position.longitude+','+position.latitude;
		        TF.showNewFunction();
		        TF.requestData.getAddressByPosition(position).then(function(res){
		        	$('.new-situation-pos').val(res);
		        	TF.earthExecute.closeGetPoint();
		        	address = res;
		        	pos = situationPos;
		        })
		    })
	    })
	    
		// 上传图片
		let pictureUrl = [];
		$('#situation-picture').change(function(event){
			var fileObj = event.target.files[0];
           	var formFile = new FormData();
           	formFile.append("action", "UploadVMKImagePath");  
           	formFile.append("file", fileObj);
           	TF.requestData.uploadFile(formFile).then(function(data){
           		pictureUrl.push(data.save_path);
           		var previewDom = '<div class="situation-picture-preview" style="background-image: url('+data.save_path+')"></div>';
           		$('#situation-picture').before(previewDom);
           		(pictureUrl.length==3)&&$('.add-situation-picture').remove();
           	})
		})
		
		// 上传语音
		let voiceUrl;
		$('#situation-voice').change(function(){
			var fileObj = event.target.files[0];
           	var formFile = new FormData();
           	formFile.append("action", "UploadVMKImagePath");  
           	formFile.append("file", fileObj);
           	$('.situation-voice-name').val(fileObj.name)
           	TF.requestData.uploadFile(formFile).then(function(data){
           		voiceUrl = data.save_path;
           	})
		})
		
		// 上传视频
		let videoUrl;
		$('#situation-video').change(function(){
			var fileObj = event.target.files[0];
           	var formFile = new FormData();
           	formFile.append("action", "UploadVMKImagePath");  
           	formFile.append("file", fileObj);
           	$('.situation-video-name').val(fileObj.name)
           	TF.requestData.uploadFile(formFile).then(function(data){
           		videoUrl = data.save_path;
           	})
		})
		
		// 备注
		$('.new-situation-remark').change(function(){

		})
	    var clickTime = 0;
	    $('.new-situation-ensure').click(function(){
	    	if(!$('.new-situation-name').val()){
	    		TF.notice.message('请输入情况名称!');
	    		return 
	    	}
	    	if(!$('.situation-type-name').attr('type-id')){
	    		TF.notice.message('请选择情况类型!');
	    		return
	    	}
	    	if(!$('.new-situation-pos').val()){
	    		TF.notice.message('请设置情况地理位置!');
	    		return
	    	}
	    	if(clickTime==1){return};
	    	clickTime=1;
	    	
	    	var parama = {
	    		name: $('.new-situation-name').val(),
	    		type_id: $('.situation-type-name').attr('type-id'),
	    		origin_type: 'user',
	    		origin_id: userInfo.id,
	    		address: $('.new-situation-pos').val(),
	    		position: pos,
	    		details: $('.new-situation-remark').val()||'',
	    		picture: pictureUrl.length==0? '':pictureUrl.join(','),
	    		video: videoUrl||'',
	    		audio: voiceUrl||''
	    	}
	    	TF.closeNewFunction();
	    	TF.requestData.situationUpload(parama).then(function(res){
	    		TF.notice.message('上报情况成功!');
	    		TF.closeNewFunction();
	    	})
	    })
    }
})(TF)