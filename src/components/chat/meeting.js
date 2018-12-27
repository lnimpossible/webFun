(function ($,TF) {
    class Client {
        //construct a meeting client with signal client and rtc client
        constructor(signalClient, localAccount) {
            // this.cleanData();//
            this.signal = signalClient;
            this.localAccount = localAccount;
            this.currentMessages = null;
            this.currentMessage=null;
            this.lastMoment = null;
            this.peerStatus='offline';
            this.loadMessagsFist=true;
            this.defaultHeadImg='./static/image/layout/avatar-bg1.png';
            this.pictureUrlArr=[];//聊天组中图片集
            // this.loadFromLocalStorage();
            // this.updateChatList();
            this.subscribeEvents();
        }
        invoke(func, args, cb){
            let session = this.signal.session;
            session && session.invoke(func, args, function(err, val){
                if(err){
                    console.error(val.reason);
                } else {
                    cb && cb(err, val);
                }
            });
        }
        /*清空localStorage */
        cleanData() {
            localStorage.setItem("messages", "");
        }
        /*更新localStorage */
        updateMessageData(messages) {
            // localStorage.setItem("messages", JSON.stringify(this.messages));
          this.currentMessages=messages;
          this.updateMessageList();
        }
        loadFromLocalStorage() {
            this.messages = JSON.parse(localStorage.getItem("messages") || "{}");
        }
        /*更新聊天会话列表*/
        updateMessageList() {
            let client = this;
            if(TF.chatInit.chatType === "channel"){
                client.signal.leave().then(() => {
                    client.signal.join(TF.chatInit.channel).then(() => {
                        client.showMessage();
                    });
                });
            } else {
                client.showMessage();
            }
        }
        showMessage() {
            let client = this;
            let chatMsgContainer = $(".chat-messages");
            this.loadMessagsFist&&chatMsgContainer.html("");
            let html = "";
            this.currentMessages.forEach(function (val,i,item) {
              // i>0&&(client.lastMoment=item[i-1].time);
              // console.log(client.lastMoment);
             if(TF.chatInit.chatType==='channel'){
                TF.chatInit.targetHead=val.avatar;
                TF.chatInit.targetName=val.nickname;
              }
              html += client.buildMsg(val.content, val.send_id.toString() === TF.chatInit.account, val.time,val.type.toString());
            })
            chatMsgContainer.prepend(html);
            client.imageClick();
            if(this.loadMessagsFist){
              chatMsgContainer[0]&&chatMsgContainer.scrollTop(chatMsgContainer[0].scrollHeight);
            }
        }
        sendMessage(message) {
            let client = this;
            var messageContent=message.content;
            if(message.contentType=='2'||message.contentType=='image'){
                TF.requestData.uploadFile(message.formData).then(function (result) {
                    messageContent=result.save_path;
                    send(messageContent);
                    return;
                })
            }else{
                send(messageContent);
            }
            function send(messageContent) {

                let domId=TF.chatInit.targetAccount;
                let sendContent={};
                if (!messageContent.trim()) return false; // empty
                let chatMsgContainer = $(".chat-messages");
                sendContent.action=message.channel||'';
                sendContent.detail='';
                sendContent.type=message.contentType;
                sendContent.time=TF.Utils.createTimeFormat(new Date());
                sendContent.content=messageContent;
                sendContent.send_id=TF.chatInit.account;
                sendContent.send_img=TF.chatInit.userHead;
                sendContent.send_name=TF.chatInit.userName;
                if (message.chatType === "instant") {
                    sendContent.receive_id=TF.chatInit.targetAccount||'';
                    message.noRecord&&(sendContent.user_array=TF.chatInit.groupMembers);
                    client.signal.sendMessage(TF.chatInit.targetAccount.toString(),JSON.stringify(sendContent));
                    if(message.noRecord){return;}
                } else {
                    sendContent.group_id=message.channel||'';
                    domId=message.channel;
                    client.signal.broadcastMessage(JSON.stringify(sendContent));
                }
                TF.chatInit.saveMessageRecord(messageContent,message.contentType,message.channel,client.peerStatus);
                chatMsgContainer.append(client.buildMsg(messageContent, true, new Date(),message.contentType));
                client.imageClick();
                chatMsgContainer.scrollTop(chatMsgContainer[0].scrollHeight);
                let sendText=message.contentType=='2'||message.contentType=='image'?'【图片】':messageContent;
                TF.chatEffect.exchangeChatItem(domId,sendText);
            }

        }
        /*订阅事件监听*/
        subscribeEvents() {
            let signal = this.signal;
            let client = this;
            /*接收到消息单人消息*/
            signal.sessionEmitter.on('onMessageInstantReceive', (account, uid, msg) => {
                msg =JSON.parse(msg);
                console.log(msg);
                let acceptMessage={};
                // this.onReceiveMessage(account, msg, 'instant');
                acceptMessage.target_id=msg.send_id;
                acceptMessage.avatar=msg.send_img;
                acceptMessage.content=msg.content;
                acceptMessage.time=msg.time;
                acceptMessage.isInstant=true;
                switch (msg.type){
                    case '1':
                        this.onReceiveMessage(account, msg.content,msg.type,'instant');
                        TF.newMessageTip(msg);
                        break;
                    case '2':
                        acceptMessage.content='【图片】';
                        this.onReceiveMessage(account, msg.content,msg.type,'instant');break;
                    case '3':
                          TF.openNewFunction('chat');
                          talkinterface_D.showChatwindow({
                            type: 'voice_one',
                            name:msg.send_name,
                            status:0,
                            data: msg.send_img
                          });
                         TF.voiceAndVideoChat.channel=msg.action;
                         TF.voiceAndVideoChat.mediaType='1';
                        break;
                    case '4':
                        TF.openNewFunction('chat');
                        talkinterface_D.showChatwindow({
                            type: 'video_one',
                            name: msg.send_name,
                            status:0,
                            data: msg.send_img
                        });
                        TF.voiceAndVideoChat.channel=msg.action;
                        TF.voiceAndVideoChat.mediaType='2';
                        break;
                    case '33':
                        let popupHead=[];
                        msg.user_array.forEach(function (val) {
                            popupHead.push({id:val.id,portrait_src:val.avatar,name:val.nickname,status:1});
                        });
                        talkinterface_D.showChatwindow({
                            type: 'voice_multi',
                            name: '群语音',
                            status:0,
                            data: popupHead
                        });
                        TF.chatInit.chatType='channel';
                        TF.voiceAndVideoChat.channel=msg.action;
                        TF.voiceAndVideoChat.mediaType='1';
                        acceptMessage.isInstant=false;
                        break;
                    case '44':
                        talkinterface_D.showChatwindow({
                            type: 'video_multi',
                            name: '群视屏',
                            status:0,
                            data: ''
                        });
                        TF.chatInit.chatType='channel';
                        TF.voiceAndVideoChat.channel=msg.action;
                        TF.voiceAndVideoChat.mediaType='2';
                        acceptMessage.isInstant=false;
                        break;
                    case '88':break;
                    case '99':
                        talkinterface_D.hangup();
                    break;
                }
                acceptMessage.isInstant&&TF.chatEffect.insertChatItem(acceptMessage);
            })
            /*接收到消息群消息  （频道）*/
            signal.channelEmitter.on('onMessageChannelReceive', (account, uid, msg) => {
                if (account !== signal._account) {
                    msg =JSON.parse(msg);
                    console.log(msg);
                    TF.chatInit.targetAccount=msg.send_id;
                    TF.chatInit.targetName=msg.send_name;
                    TF.chatInit.targetHead=msg.send_img;
                    this.onReceiveMessage(signal.channel.name, msg.content,msg.type,'channel');
                }
            })
            /*接收到消息群成员离开（频道）*/
            signal.channelEmitter.on('onChannelUserLeaved', (account, uid) => {
                client.invoke('io.agora.signal.channel_query_num',{'name':signal.channel.name}, (err, val) => {
                })
            })
            /*接收到消息群成员加入（频道）*/
            signal.channelEmitter.on('onChannelUserJoined', (account, uid) => {
                client.invoke('io.agora.signal.channel_query_num',{'name':signal.channel.name}, (err, val) => {
                })
            })
        }
        /*收到消息*/
        onReceiveMessage(account,messageContent,contentType,chatType) {
            let client = this;
            let chatMsgContainer = $(".chat-messages");
            var currentAccount=TF.chatInit.targetAccount;
            chatType==='channel'&&(currentAccount=TF.chatInit.channel);
            if (currentAccount+"" ===account+"") {
                $('.chat-box').css('display')=='block'&&TF.requestData.talkRecordStatus({user_id:TF.LoginCache.userInfo.id,target_id:currentAccount});
                chatMsgContainer.append(client.buildMsg(messageContent, false, new Date(),contentType));
                // this.showMessage(this.current_conversation.id)
                chatMsgContainer.scrollTop(chatMsgContainer[0].scrollHeight);
                client.imageClick();
            }
        }
        /*页面上建立消息*/
        buildMsg(msg, me, ts,msgType){
            let html = "";
            let timeStr = this.compareByLastMoment(ts);
            let headImg=me ?TF.chatInit.userHead:TF.chatInit.targetHead;
            headImg=headImg||this.defaultHeadImg;
            if (timeStr) {
                html += `<div class="time-item-str">${timeStr}</div>`
            }
            let className = me ? "message right clearfix" : "message clearfix";
            html += "<li class=\"" + className +"\">";
            html += "<img  class='head-image' src="+headImg+">";
            if (TF.chatInit.chatType==='channel'&&!me) {
                html += `<div class="target-user-name">${TF.chatInit.targetName}</div>`
            }
            if(msgType==='2'){
                this.pictureUrlArr.push(msg);
                html += "<div class='bubble image-message-item'><img class='image-message' src='" + msg + "'/><div class=\"corner\"></div>";
            }else{
                html += "<div class=\"bubble\">" + msg + "<div class=\"corner\"></div>";
            }
            html += "<span>" + this.parseTwitterDate(ts) + "</span></div></li>";
            return html;
        }
        imageClick(){
            var pictureUrlArr=this.pictureUrlArr;
            $('.image-message').click(function () {
                var index=pictureUrlArr.indexOf($(this).attr('src'));
                TF.picOrVideo( {data: pictureUrlArr,index:index,type: 'picture'} );
            })
        }
        compareByLastMoment (ts) {
            return '';
            if (!this.lastMoment) {
                let time = this.lastMoment=new Date();
                return time.toLocaleTimeString()
            }
            let diff = Math.floor((ts-this.lastMoment)/1000)
            if (diff<120) {
                return ''
            }
            else {
                return new Date().toLocaleTimeString()
            }
        }
        /*解析 时间*/
        parseTwitterDate(tdate) {
            var system_date = new Date(Date.parse(tdate));
            var user_date = new Date();
            // if (K.ie) {
            //     system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
            // }
            var diff = Math.floor((user_date - system_date) / 1000);
            if (diff <= 1) {return "刚刚";}
            if (diff < 20) {return diff + " 秒前";}
            if (diff < 40) {return "半分钟前";}
            if (diff < 60) {return "少于一分钟";}
            if (diff <= 90) {return "1分钟前";}
            if (diff <= 3540) {return Math.round(diff / 60) + "分钟前";}
            if (diff <= 5400) {return "1 小时前";}
            if (diff <= 86400) {return Math.round(diff / 3600) + "小时前";}
            if (diff <= 129600) {return "1天前";}
            if (diff < 604800) {return Math.round(diff / 86400) + "天前";}
            if (diff <= 777600) {return "1周前";}
            return   tdate;
        }
    }
    TF.Client=Client;
})(jQuery,TF);