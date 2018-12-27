(function(TF){
    TF.genNewChatMessage=function(selector, data){
    	if($(selector).html()!==''){
    		$(selector).html('')
    	}
    	console.log(data)
    	var avatar = (data.image)? '<div class="newest-chat-photo" style="background-image:url('+data.send_img+')"></div>'
    								:'<div class="newest-chat-photo">'+data.send_name.slice(-2)+'</div>';
    	var nodeStr='<div class="newest-chat bounceInLeft animated  flex item-center">'+
	                    '<div class="person-event-info">'+
	                        '<p class="no-select over-ellipsis">'+data.content+'</p>'+
	                    '</div>'+
	                    avatar+
                	'</div>';
    	
        $(selector).append(nodeStr);
        $('.person-event-info').click(function(){
        	TF.openNewFunction('chat')
        })
        var timer = setTimeout(function(){
        	$('.newest-chat').addClass('fadeOut');
        	$('.newest-chat')[0].addEventListener('animationend', function(){
        		$(selector).html('');
        	}, false)
        },10000)
        $('.newest-chat').click(function(){
        	TF.openNewFunction('chat');
        	var msg = data;
        	var itemData = data;
			itemData.content='';
	      	itemData.target_id=data.id;
	      	TF.chatInit.updateChatInfo({
	          	targetAccount:itemData.send_id,
				targetName:itemData.send_name,
	      		targetHead:itemData.send_img,
	          	chatType:'instant'
			});
			var acceptMessage = {};
			acceptMessage.target_id=msg.send_id;
            acceptMessage.avatar=msg.send_img;
            acceptMessage.content=msg.content;
            acceptMessage.time=msg.time;
            acceptMessage.isInstant=true;
	      	TF.chatEffect.insertChatItem(acceptMessage);
	      	
        	clearInterval(timer);
        	$(selector).html('');
        })
        
    }
    TF.newMessageTip=function(option){
    	TF.genNewChatMessage('.chat-preview', option)
    }
})(TF)