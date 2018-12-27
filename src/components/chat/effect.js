/*
 * 聊天模块
 */
(function(TF){
    class ChatEffect{
    	constructor(){
            TF.chatUserList;
            this.chatMap={};//会话列表信息
            this.noticeMap={};//会话列表信息
            this.groupImg='./static/image/chat/group_img.png';//群组默认头像
            this.noticeImg='./static/image/chat/notice.png';//通知头像
			this.conversationInfo=null;//选中会话信息
			this.memberSelect=false;//是否是选择成员
			this.selectNumer=0;
			this.totalUnreadNumer=0;
			this.selectMemebers=[];
			this.currentGroupInfos={};
			this.selectedChatItemDom=null;
			this.memberSelectIsShow=false;
			this.constructUserList();//构建用户列表
			this.constructChatList();//构建会话列表
			TF.updateScroll();//更新下拉样式
		}
		/*构建用户列表*/
        constructUserList(){
        	var indexs = [0],crumb=[];
            TF.requestData.getUserList().then(function(data){
                TF.chatUserList = data;
                TF.chatUserArr = {};
                organize(data);
                function organize(data){
                	data.forEach(function(val){
                		val.person_list.forEach(function(p){
                			TF.chatUserArr[p.id] = p;
                		})
                		if(val.children){
                			organize(val.children)
                		}
                	})
                }
				genNewLevel(data[0]);
				crumb.push(data[0].name);
				genCrumb();
				TF.setScroll();
				// 点击组
				$('.chat-person-list').on('click', '.person-group', function(){
					var index = $(this).attr('groupindex');
					var groupData = getGroupData(index);
					genNewLevel(groupData);
					crumb.push(groupData.name);
					genCrumb()
				})
				// 点击人员
				$('.chat-person-list').on('click', '.person', function(){
					var index = $(this).attr('itemindex');
					var itemData = getItemData(index);
					if(itemData.id==TF.LoginCache.userInfo.id){
					    TF.Notice.message('自己不能和自己聊天！');
					    return;
                    }
					TF.chatInit.updateChatInfo({
			          	targetAccount:itemData.id,
						targetName:itemData.nickname,
			      		targetHead:itemData.avatar,
			          	chatType:'instant'
					});
			      	$('.chat-tab').get(0).click();
			      	itemData.content='';
			      	itemData.target_id=itemData.id;
			      	TF.chatEffect.insertChatItem(itemData);
				})
            })
            function genNewLevel(data){
				$('.chat-person-list').empty();
				data.person_list.forEach(function(person,index){
					let imgString=person.avatar?`<img src=${person.avatar}>`:'';
					var personDom='<li class="person" flag="person" itemindex="'+index+'">'+
		                            '<div class="person-avatar fl mr8 mt10">'+imgString+'</div>'+
		                            '<div class="person-name fl">'+person.nickname+'</div>'+
		                            '<div class="person-job fr">'+person.job+'</div>'+
	                            '</li>';
					$('.chat-person-list').append(personDom)
				})
				data.children.forEach(function(group, index){
					var groupDom='<li class="person-group" groupindex="'+index+'">'+
		                        	'<div class="person-group-top">'+
		                        	'<span class="person-group-name" flag="person-group-name">'+group.name+'</span>'+
		                        	'</div>'+
		                        '<li>';
					$('.chat-person-list').append(groupDom)
				})
				TF.updateScroll();
			};
			function getGroupData(gIndex){
				(gIndex!==undefined)&&indexs.push(gIndex);
				var data = TF.chatUserList;
				indexs.forEach(function(i, index){
					data = (index==0)? data[i]:data.children[i];
				})
				return data
			}
			function getItemData(iIndex){
				var data = TF.chatUserList;
				indexs.forEach(function(i, index){
					data = (index==0)? data[i]:data.children[i];
				})
				return data.person_list[iIndex];
			}
			function genCrumb(){
				var crumbDom = "";
				crumb.forEach(function(val,index){
					if(index == crumb.length-1){
						crumbDom += '<div class="swiper-slide"><div class="chat-crumb" style="color: #fff;" index="'+index+'">'+val+'</div></div>';
					}else{
						crumbDom +='<div class="swiper-slide">'+
						'<div class="chat-crumb" index="'+index+'">'+val+'<img class="mr8 ml8" src="./static/image/layout/dispatch/crumb-arrow.png" /></div>'+
						'</div>'
					}
				})
				var dom = '<div class="swiper-container crumb-container">'+
								'<div class="swiper-wrapper">'+
								    crumbDom+
								'</div>'+
							'</div>';
				$('.chat-card-crumb').empty().append(dom);
				 var mySwiper = new Swiper ('.crumb-container', {
				    direction: 'horizontal',
					slidesPerView : 'auto'
				}) 
				
				$('.chat-crumb').click(function(){
					var index = $(this).attr('index');
					indexs.splice(Number(index)+1);
					crumb.splice(Number(index)+1);
					var data = getGroupData();
					genNewLevel(data);
					genCrumb()
				})
			}
		}
		/*构建会话列表*/
        constructChatList(){
            let that=this;
            TF.requestData.getTalkUserList({user_id:TF.LoginCache.userInfo.id.toString()}).then(function (result) {
            	// console.log(result);
                $('.chat-list').empty();
                that.totalUnreadNumer=0;
                result.reverse().map(function (val) {
                    that.buildChatItem(val);
                    val.list_type==='group'?that.chatMap[val.group_uuid]=val:that.chatMap[val.target_id]=val;
                });
                that.updateTotalUnreadNumber(that.totalUnreadNumer);
                if(!result[0]){return;}
                setTimeout(function () {
                	let itemData=result[result.length-1];
                    let [targetAccount,targetName,targetHead,chatType]=
                        [itemData.target_id,itemData.nickname,itemData.avatar,'instant'];
                    if(itemData.list_type=='system_notice'){
                        that.constructNoticeList();
                    	return;
					}
                    if(itemData.list_type==='group'){
                        [targetAccount,targetName,chatType]=[itemData.group_uuid,itemData.group_name,'channel'];
                        TF.chatEffect.addGroupMemeberInfo(targetAccount);
                    }
                    TF.chatInit.updateChatInfo({
                        targetAccount:targetAccount,
                        targetName:targetName,
                        targetHead:targetHead,
                        chatType:chatType,
                        channel:targetAccount
                    });
                    that.conversationInfo=itemData;
                },800);
                // let chatMsgContainer = $(".chat-messages");
                // chatMsgContainer.scrollTop(chatMsgContainer[0].scrollHeight);
            })
		}
		/*构建通知列表*/
        constructNoticeList(){
        	let [that,totalPage,page]=[this,0,1];
            $('#chatContainer').hide();
            $('#noticeContainer').show();
            $('.notice-list').empty();
            var scrollDom = document.getElementById("noticeList");
            getNoticeList();
            scrollDom&&(scrollDom.onscroll = function(e){
                if(scrollDom.scrollTop>=(scrollDom.scrollHeight-scrollDom.clientHeight-5)&&totalPage>page){
                    page++;
                    getNoticeList();
                }
            });
            function getNoticeList() {
                let params={
                    user_id:TF.LoginCache.userInfo.id.toString(),
                    page:page,
                    unit:5
                }
                TF.requestData.userNoticeList(params).then((response)=>{
                    totalPage=response.msg;
                    response.data.forEach(function (val) {
                        that.noticeMap[val.id]=val;
                        that.buildNoticeItem(val);
                    });
                    $('.showNoticeDetail').click(function () {
                        let noticeInfo=that.noticeMap[$(this).attr('noticeId')];
                        TF.requestData.noticeDetail({notice_type:noticeInfo.notice_type,rele_id:noticeInfo.rele_id}).then((response)=>{
                            // console.log(response);
                            let type = 'task';
                            switch(noticeInfo.notice_type){
                            	case 'task': type = 'task';break;
                            	case 'condition':  type = 'situation';break;
                            }
                            response.billboardType = type;
	        				TF.openNewFunction('thingDetail', response);
                        });
                    });
                });
            }
		}
		buildChatItem(val){
            let that=this;
            let [recordId,name,type,unreadNumber]=[val.target_id,val.nickname,'instant',val.new_msg_num];
            let domId='chatItem'+val.target_id;
            let time=this.changeTimeFormat(val.time);
            let imgString=val.avatar?`<img src=${val.avatar}>`:'';
            if(val.list_type=='group'){
            	imgString=`<img src=${this.groupImg}>`;
                name=val.group_name;
                type='channel';
                domId='chatItem'+val.group_uuid;
                recordId=val.group_uuid;
            }else if(val.list_type=='system_notice'){
                imgString=`<img src=${this.noticeImg}>`;
                name='系统通知: '+val.notice_name;
                type='notice';
                domId='system_notice'+val.id;
                val.content=val.notice_type==='condition'?'情况状态更新':'任务状态更新';
                recordId=val.id;
                unreadNumber=val.unread_num;
			}
            unreadNumber=(!unreadNumber||unreadNumber==0)?'':unreadNumber;
            unreadNumber&&(this.totalUnreadNumer+=Number(unreadNumber));
            let chatItem=`<li id=${domId} type=${type} class="chat-list-item flex justify-between item-center" data-key=${recordId}>
                                <div class="chat-list-l">${imgString}</div>  
                                <div class="chat-list-m">
                                    <p class="chat-list-name">${name}</p>
                                    <p class="chat-list-profile">${val.content}</p>
                                </div>
                                <div class="chat-list-r">
                                     <p>${time}</p>
                                     <p class="unread-number"><span>${unreadNumber}</span></p>
                                </div>
                            </li>
							<li class="delete-chat-item"  talkId="${val.id}"><span><span>删除会话</span></span></li>`;
            $('.chat-list').prepend(chatItem);
        }
        buildNoticeItem(noticeData){
            let [noticeType,relatedUser,timeSting]=['情况通知','上报人：'+noticeData.related_user,'处理时间：'+noticeData.create_time];
            let [noticeStatus,textColor]=['','']
            if(noticeData.notice_type==='task'){
                [noticeType,relatedUser,timeSting]=['任务通知','下发人：'+noticeData.related_user,'接收时间：'+noticeData.create_time]
			}
			switch (noticeData.notice_status){
				case '执行中':
				case '处理中':
					[noticeStatus,textColor]=[noticeData.notice_status+'...','text-color-1'];break;
				case '待审核':[noticeStatus,textColor]=[noticeData.notice_status+'...','text-color-2'];break;
				case '已完成':[noticeStatus,textColor]=[noticeData.notice_status,'text-color-3'];break;
				case '已拒绝':[noticeStatus,textColor]=[noticeData.notice_status,'text-color-4'];break;
				case '待处理':
				case '未接受':
				    [noticeStatus,textColor]=[noticeData.notice_status,'text-color-5'];break;
			}
            let noticeItem=`<li>
						<div class="chat-list-l"><img src="http://skyinfor.cc:58080/shangwuqu/api/public/uploads/5bce93222d0c8.png"></div>
						<div class="notice-content-text">
							<p class=${textColor}>${noticeType}</p>
							<p>${noticeData.notice_name}</p>
							<p class="content-text-gray">${relatedUser}</p>
							<p class="content-text-gray">${timeSting}</p>
							<p class=${textColor}>${noticeStatus}</p>
							<div class="showNoticeDetail" noticeId=${noticeData.id}>查看详情<span></span></div>
						</div>
					</li>`;
            $('.notice-list').append(noticeItem);

		}
        /*改变会话列表的item位置 并使其置顶*/
        exchangeChatItem(itemId,chatContent,time){
		    let $dom=$('#chatItem'+itemId);
            time=time||new Date()
		    time=this.changeTimeFormat(time);
            $dom.find('.chat-list-profile').html(chatContent);
            $dom.children('.chat-list-r').html(time);
		    if($dom.index()!==0){
                $dom.remove();
                $('.chat-list').prepend($dom.get(0));
            }
            $dom&&$dom.get(0)&&$dom.get(0).scrollIntoView(false);//滚动条移动到相应位置
        }
        /*改变时间格式*/
        changeTimeFormat(time){
            time=new Date(Date.parse(time));
            let isToday=TF.Utils.dateFtt("dd",new Date())===TF.Utils.dateFtt("dd",time);
            time=isToday==true?TF.Utils.dateFtt("hh:mm",time):TF.Utils.dateFtt("MM/dd",time);
            return time;
        }
        insertChatItem(options){
            if(!this.chatMap[options.target_id]){
                options.time=options.time||new Date();
                TF.chatEffect.buildChatItem(options);
                TF.chatEffect.chatMap[options.target_id]=options;
                $('#chatItem'+options.target_id).click();
            }else if(options.isInstant){
                this.exchangeChatItem(options.target_id,options.content,options.time);
                this.constructChatList();
            }
            $("#chatItem"+options.target_id)&&$("#chatItem"+options.target_id).get(0).scrollIntoView(false);//跳到相应的位置
            $("#chatItem"+options.target_id)&&$("#chatItem"+options.target_id).addClass('chat-list-item-active').siblings().removeClass('chat-list-item-active');
        }
        //创建群组
		createTalkGroup(groupMemberInfo,groupName){
        	let that=this;
        	let  [userIds,userId]=['',TF.LoginCache.userInfo.id.toString()];
            for (let key in groupMemberInfo){
                userIds+=key+',';
			}
            userIds+=userId;
            groupName=groupName||'群组一';
			console.log(userIds);
			console.log(groupName);
			TF.requestData.createTalkGroup({group_name:groupName,user_id :userIds,group_owner_id:userId}).then((response)=>{
				let options={
                    target_id:response.group_uuid,
					content:'',
					time:new Date(),
                    nickname:groupName,
                    avatar:that.groupImg
				}
                this.insertChatItem(options);//插入条目
				let params={
                    type:'1',
                    group_uuid:response.group_uuid,
                    send_id:userId,
                    content:'让我们来聊天吧！',
					action:'',
					detail:''
                }
                TF.requestData.talkGroupRecordSave(params).then(function (response) {
					console.log(response);
                    that.constructChatList();
                })
            });

		}
		/*添加群成员信息*/
		addGroupMemeberInfo(groupId){
			let that=this;
            TF.requestData.talkGroupInformation({group_uuid:groupId}).then((response)=>{
				let groupListString='';
                that.currentGroupInfos={}
                response.user_list.forEach(function (val) {
                    that.currentGroupInfos[val.id]=val;
                    let domId='member'+val.id;
                    let imgString=val.avatar?`<img src=${val.avatar}>`:'';
                    groupListString+=`
                    <li id=${domId} userId=${val.id} class="group-member-item">
						<div class="chat-list-l">${imgString}</div>
						<p >${val.nickname}</p>
					</li>`
                });
                $('#groupMemberContainer').html(groupListString);
                $('#groupMemberContainer').append(`<div class="group-member-btn"><img id='selectConfirmBtn' src="./static/image/chat/btn_confirm.png"><img id='selectCancelBtn' src="./static/image/chat/btn_cancel.png"></div>`);
                $('.group-member-item').bind('click',function (e) {
                    let userId=$(this).attr('id').substring(6,$(this).attr('id').length);
                    let userInfo=that.currentGroupInfos[userId];
                	if(!that.memberSelect){
                        var personData = TF.chatUserArr[userInfo.id];
                        personData.type = 'person';
                        $('.chat-box').hide();
                        TF.openNewFunction('thingDetail', personData);
                	    return;
                	}
					if($(this).children('.group-member-sel').length>0){
                        if(userId==TF.LoginCache.userInfo.id){return;}
                        that.selectNumer--;
                        $(this).children('.group-member-sel').remove();
                        that.selectMemebers.pop();
					}else{
                        if(that.selectNumer>=8){TF.Notice.message('语音视屏聊天最多可选9人！');return;}
                        that.selectNumer++;
                        $(this).append('<div class="group-member-sel"><img src="./static/image/chat/group_member_p.png"></div>');
                        that.selectMemebers.push(userInfo);
                        console.log(that.selectMemebers);
					}
                });
                $('#selectConfirmBtn').bind('click',()=>{
                    $('.group-member-ul').slideUp(800);
                    console.log(that.selectMemebers);
                    TF.chatInit.sendMediaChat(that.selectMemebers);
                    this.lookAtGroupMemeber();
				});
                $('#selectCancelBtn').bind('click',()=>{
                    this.lookAtGroupMemeber();
                    $('.group-member-ul').slideUp(800);

                })
			})
		}
        selectGroupMemeber(){
			if(this.memberSelect){return};
            let mineDomId='member'+TF.LoginCache.userInfo.id.toString();
            $('#'+mineDomId).append('<div class="group-member-sel"><img src="./static/image/chat/group_member_p.png"></div>');
            this.selectMemebers.push(TF.LoginCache.userInfo);
			$('.group-member-btn').show();
            this.memberSelect=true;
            $('.group-member-ul').slideDown(800);

		}
		/*查看群成员*/
		lookAtGroupMemeber(){
            this.memberSelect=false;//群成员不可以选择
            $('.group-member-btn').hide();
            this.selectMemebers.forEach(function (val) {
                $('#member'+val.id).children('.group-member-sel').remove();
            })
            this.selectMemebers=[];
		}
		updateTotalUnreadNumber(totalNumber){
		    switch (true){
                case (Number(totalNumber)>99):totalNumber='99+';break;
                case (!totalNumber||Number(totalNumber)===0):totalNumber='';break;
            }
            $('.total-unread-number span').html(totalNumber);
        }
        updateItemUnreadNumber(dom){
		    let that=this;
            this.selectedChatItemDom=dom;
            that.totalUnreadNumer-=Number($(dom).children('.chat-list-r').children('.unread-number').children('span').html());
            that.updateTotalUnreadNumber(that.totalUnreadNumer);
            $(dom).children('.chat-list-r').children('.unread-number').children('span').html('');
        }
	}
	TF['chatEffect']=new ChatEffect();
})(TF)
