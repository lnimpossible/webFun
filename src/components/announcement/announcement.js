(function(TF){
	let currentPage =1;
	let totalPage = 0;
	let announceData = null;
	var paramater = {
		user_id: TF.LoginCache.userInfo.id,
    	page: currentPage
	}
    TF.genAnnouncement = function(selector){
     	TF.requestData.getAnnouncement(paramater).then(function(res){
	    	totalPage = res.msg;
	    	announceData = res.data;
	    	genAnnouncement(selector, res.data)
	    })
    }
    function genAnnouncement(selector, data){
    	var announceList = "";
    	data.forEach(function(val){
    		var top = (val.set_top=='yes')? 'announce-reddot':'announce-graydot';
    		announceList+='<li class="announce-item mb10">'+
								'<span class="'+top+'"></span>'+
								val.title+
							'</li>';
    	})
    var nodeStr='<div class="announce">'+
					'<div class="announce-close"></div>'+
					'<div class="announce-list fl">'+
						'<div class="announce-list-title mb10">公告列表</div>'+
						'<div class="announce-items nice-scroll">'+
							'<ul class="announce-item-wrap">'+
								announceList+
							'</ul>'+
						'</div>'+
					'</div>'+
					'<div class="announce-detail fr">'+
						'<div class="announce-detail-name"></div>'+
						'<div class="announce-detail-content nice-scroll"></div>'+
					'</div>'+
				'</div>';
    	
        $('#'+selector).append(nodeStr);
        TF.setScroll();
        $('.announce-close').click(function(){
        	TF.closeNewFunction();
        })
        $('.announce-item-wrap').on('click','.announce-item',function(){
        	$(this).addClass('announce-active')
        	.siblings().removeClass('announce-active');
        	var announce = announceData[$(this).index()];
        	$('.announce-detail-name').html(announce.title);
        	$('.announce-detail-content').html(announce.content);
        })
        let limitHeight = $('.announce-items').height();
        $('.announce-items').scroll(function(){
        	var scrollTop = $(this).scrollTop();
        	var wrapHeight = $('.announce-item-wrap').height();
        	if(scrollTop+limitHeight>=wrapHeight && currentPage<totalPage){
        		currentPage++;
        		TF.requestData.getAnnouncement(paramater).then(function(res){
			    	totalPage = res.msg;
			    	announceData = res.data;
			    	var announceList = "";
			    	data.forEach(function(val){
			    		announceList+='<li class="announce-item mb10">'+
											'<span class="announce-graydot"></span>'+
											val.title+
										'</li>';
			    	})
			    	$('.announce-item-wrap').append(announceList)
			    })
        	}
        })
    }
})(TF)