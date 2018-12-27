(function(TF){
	$('.chat-close').click(function(){
		$('.chat-box').hide()
	})
	
	$('.chat-search-cover').click(function(){
		$(this).hide().prev().focus();
	})
	$('.chat-search-input').blur(function(){
		$(this).val('').next().show()
	})
	
	$('.chat-tab').click(function(){
		$(this).addClass('chat-tab-active')
		.siblings().removeClass('chat-tab-active');
		var index = $(this).index();
		$('.chat-card').eq(index).show().siblings().hide();
		TF.updateScroll();
	})
	$('.chat-list').on('click', '.chat-list-item', function(){
		$(this).addClass('chat-list-item-active')
		.siblings().removeClass('chat-list-item-active')
	})
	
	$('.add-group').click(function(){
		$('.chat-box').hide();
		TF.openNewFunction('chosePerson')
	})

//	$('.chat-person-list').on('click', '.person-group-name', function(){
//		$(this).parent().next().toggle();
//		TF.updateScroll();
//	})
	/*人员列表每一条item 点击*/
//	$('.chat-person-list').on('click', '.person', function(){ 
//		var groupIndex = $(this).parents('.person-group').index();
//		var personIndex = $(this).index();
//		var personData = TF.chatUserList[groupIndex].child[personIndex];
//		TF.chatInit.updateChatInfo({
//          targetAccount:personData.id,
//			targetName:personData.nickname,
//      	targetHead:personData.avatar,
//          chatType:'instant'
//		});
//      $('.chat-tab').get(0).click();
//      personData.content='';
//      personData.target_id=personData.id;
//      TF.chatEffect.insertChatItem(personData);
//      // $(".chat-list").animate({scrollTop: $("#chatItem"+personData.id).offset().top }, {duration: 500,easing: "swing"});
//	});
	$('.chat-list').on('click','.chat-list-item',function () {
	    if($(this).attr('type')==='notice'){
	        TF.chatEffect.constructNoticeList();
	        return;
        }
        $('#chatContainer').show();
        $('#noticeContainer').hide();
        let itemData=TF.chatEffect.chatMap[$(this).attr('data-key')];
        TF.chatEffect.conversationInfo=itemData;
        TF.chatEffect.memberSelect=false;
        $(this).next('li').slideUp();
        let [targetAccount,targetName,targetHead,chatType]=
			[itemData.target_id,itemData.nickname,itemData.avatar,$(this).attr('type')];
        chatType==='instant'&&TF.requestData.talkRecordStatus({user_id:TF.LoginCache.userInfo.id,target_id:targetAccount});
        if(chatType==='channel'){
            [targetAccount,targetName]=[itemData.group_uuid,itemData.group_name];
            TF.chatEffect.addGroupMemeberInfo(targetAccount);
		}
        TF.chatEffect.updateItemUnreadNumber(this);
        TF.chatInit.updateChatInfo({
            targetAccount:targetAccount,
            targetName:targetName,
            targetHead:targetHead,
            chatType:chatType,
            channel:targetAccount
        });
    });
    $('.chat-list').on('mousedown','.chat-list-item',function (e) {
        if (3 == e.which) {//右键为3
            if($(this).attr('type')==='channel'){return;}
            $(this).next('li').slideToggle()
        }
    })
    $('.chat-list').on('click','.delete-chat-item',function (e) {
        $(this).slideUp();
        let talkId=$(this).prev('li').attr('data-key');
        talkId=TF.chatEffect.chatMap[talkId].talk_list_id;
        $(this).prev('li').remove();
        TF.requestData.talkUserListDelete({talk_list_id:talkId});
    });
    $('.look-up').click(function () {
        if(TF.chatInit.chatType==='instant'){
			console.log( TF.chatEffect.conversationInfo);
			var personData = TF.chatUserArr[TF.chatEffect.conversationInfo.user_id];
            personData.type = 'person';
            $('.chat-box').hide();
            TF.openNewFunction('thingDetail', personData);
			return;
		}
		if(!TF.chatEffect.memberSelect){
            $('.group-member-ul').css('display')=='none'? $(this).css('transform','rotate(180deg)'):$(this).css('transform','rotate(0deg)');
            TF.chatEffect.lookAtGroupMemeber();
            $('.group-member-ul').slideToggle(800);
        }

    });



    // $('.chat-list-item').click(function () {
    //
    // });
})(TF)
