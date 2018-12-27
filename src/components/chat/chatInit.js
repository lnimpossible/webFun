/**
 * Created by Administrator on 2018/8/31/031.
 */
(function (TF) {
  class ChatInit{
    constructor() {
      let securityInfo=TF.LoginCache.userInfo;
      this.account = securityInfo.id.toString();
      this.userName = securityInfo.nickname;
      this.userHead = securityInfo.avatar;
      this.targetAccount = '';
      this.targetName = '';
      this.targetHead = '';
      this.appId = APP_KEY;
      this.channel='';//语音视屏频道
      this.chatType='instant';//单聊是‘1’ 群聊为‘2’
      this.appcert='';
      this.client=null;
      this.groupMembers=[];
      this.groupName='';
      this.selectMediaType=null;
      this.init();
    }
    init(){
      var that=this;
      const appId = this.appId , appcert = this.appcert|| '';
      if (!appId) {alert('appId不存在！');return;}
      let localAccount =this.account;
      let signal = new TF.SignalingClient(appId, appcert);
      this.signal=signal;
      signal.login(localAccount).then(() => {
        that.client= new TF.Client(signal, localAccount);
      });
      this.eventController();
    }
    /*更新聊天信息*/
    updateChatInfo(info){
        this.targetAccount = (info.targetAccount&&info.targetAccount.toString())||info.targetAccount;
        this.targetName = info.targetName||this.targetName;
        this.targetHead = info.targetHead;
        this.channel=info.channel||this.channel;//语音视屏频道
        this.chatType=info.chatType||this.chatType;
        this.groupName=info.groupName||this.groupName;
        this.chatType==='instant'&& this.getTargetAccountStatus(this.targetAccount);
        $('.chat-head').html(this.targetName);//更新对话框头部名称
        this.getMessageList();
        // this.eventController();
    }
    getTargetAccountStatus(targetAccount){
        let that=this;
        let [query, account] = ['io.agora.signal.user_query_user_status',targetAccount];
        this.client&&this.client.invoke(query,{account},function(err, val){
            if (val.status) {
                that.client.peerStatus = 'online'
            }
            else {
                that.client.peerStatus = 'offline'
            }
        });
    }
    /*保存聊天记录*/
    saveMessageRecord(content,contentType,channel,status) {
        let params={};
        params.content=content;
        params.type=contentType;
        params.uid=TF.Utils.guid();
        params.action=channel;
        params.send_id=this.account;
        params.detail='';
        if(this.chatType==='instant'){
            params.receive_id=this.targetAccount;
            params.status=status;
            TF.requestData.talkRecordSave(params);
        }else{
            params.group_uuid=channel;
            TF.requestData.talkGroupRecordSave(params);
        }
    }
    getMessageList(){
        let that=this;
        let totalPage=0;
        var params=that.chatType==='instant'?{
            id1:that.account,
            id2:that.targetAccount,
            page:1
        }:{group_uuid:that.channel};
        var scrollDom = document.getElementById("chatMessages");
        scrollDom&&(scrollDom.onscroll = function(e){
          if(scrollDom.scrollTop<=50&&totalPage>params.page){
              params.page++;
              TF.requestData.getTalkList(params,that.chatType).then(function (result) {
                  that.client.loadMessagsFist=false;
                  that.client.updateMessageData(result.data.reverse());
              })
          }
        });
        TF.requestData.getTalkList(params,that.chatType).then(function (result) {
            totalPage=result.msg;
            that.client.loadMessagsFist=true;
            that.client.updateMessageData(result.data.reverse());
        });
    }
    /*发送媒体聊天*/
    sendMediaChat(selectedMembers){
        var that=this;
        this.groupMembers=[];
        selectedMembers.forEach(function (val) {
            that.groupMembers.push({id:val.id,nickname:val.nickname,avatar:val.avatar});
        })
        this.selectMediaType==='video'?this.sendVideoChat():this.sendVoiceChat();
    }
    /*发送语音聊天*/
    sendVoiceChat(){
        let that =this;
        let popupType='voice_one';
        let popupTitle=that.targetName;
        let popupHead=that.targetHead;
        let message={};
        if(that.chatType==='channel'){
            popupType='voice_multi';
            popupTitle=that.groupName;
            popupHead=[];
        }else{
            that.channel=TF.Utils.guid();
        }
        message.content='【语音通话】';
        message.channel=that.channel;
        that.chatType==='channel'&&that.groupMembers.forEach(function (val,i) {
            popupHead.push({id:val.id,portrait_src:val.avatar,name:val.nickname,status:1});
            message.chatType='instant';
            message.contentType='33';
            message.noRecord=true;
            TF.chatInit.targetAccount=val.id.toString();
            val.id!=TF.chatInit.account&&that.client.sendMessage(message);
        });
        message.contentType='3';
        message.chatType=that.chatType;
        talkinterface_D.showChatwindow({
            type: popupType,
            name: popupTitle,
            status:1,
            data: popupHead
        });
        console.log(popupHead);
        TF.voiceAndVideoChat.join(that.channel,'1');
        that.client.sendMessage(message);
    }
    /*发送视屏聊天*/
    sendVideoChat(){
        let that=this;
        let popupType='video_one';
        let popupTitle=that.targetName;
        let popupHead=that.targetHead;
        let message={};
        if(that.chatType==='channel'){
            popupHead=[];
            popupType='video_multi';
            popupTitle=that.groupName;
        }else{
            that.channel=TF.Utils.guid();
        }
        message.content='【视频通话】';
        message.chatType=that.chatType;
        message.channel=that.channel;
        if(that.chatType==='channel') {
            that.client.sendMessage(message);
            that.groupMembers.forEach(function (val, i) {
                popupHead.push({id: val.id, portrait_src: val.avatar, name: val.nickname, status: 1});
                message.chatType = 'instant';
                message.contentType = '44';
                message.noRecord = true;
                TF.chatInit.targetAccount = val.id.toString();
                val.id != TF.chatInit.account && that.client.sendMessage(message);
            });
            message.contentType = '44';

        }
        message.contentType='4';
        talkinterface_D.showChatwindow({
            type: popupType,
            name: popupTitle,
            status:1,
            data: popupHead
        });
        that.client.sendMessage(message);
        TF.voiceAndVideoChat.join(that.channel,'2');
    }
    eventController(){
      /*发送图片*/
      let that=this;
      $('#selectImageBtn').change(function (event) {
        var file = this.files[0];
        var filePath = $(this).val(),         //获取到input的value，里面是文件的路径
          fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
        var formData = new FormData();
        formData.append('file',file);
        // 检查是否是图片
        if( !fileFormat.match(/.png|.jpg|.gif/) ) {
          TF.Notice.message('上传错误,文件格式必须为：png/jpg/gif');
          return;
        }
        var reader = new FileReader();
        reader.onload = function (evt) {
          var message={content:evt.target.result,contentType:'2',chatType:that.chatType,formData:formData,channel:that.channel}
          that.client.sendMessage(message);
        }
        reader.readAsDataURL(file);
      });
      /*发送信息*/
      $('#message-to-send').off("keydown").on("keydown", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            var message={content:$(this).val(),contentType:'1',chatType:that.chatType,channel:that.channel};
            that.client.sendMessage(message);
            $(this).val("");
        }
     });
      /*发送语音聊天邀请*/
      $('#sendVoiceChat').click(function () {
          that.selectMediaType='voice';
          TF.chatEffect.selectNumer=0;
          if(that.chatType==='channel'){
              TF.chatEffect.selectGroupMemeber();
              return;
          }
          that.sendVoiceChat();
      });
      /*视屏切换*/
      $('.js-video-exchange').dblclick(function () {
        var container=this.id==='videoContainer'?'videoContainerLocation':'videoContainer';
        $(this).addClass('video-container').removeClass('video-container-location');
        $('#'+container).addClass('video-container-location').removeClass('video-container');
      });
      /*发送视屏聊天邀请*/
      $('#sendVideoChat').click(function () {
          that.selectMediaType='video';
          TF.chatEffect.selectNumer=0;
          if(that.chatType==='channel'){
              TF.chatEffect.selectGroupMemeber();
              return;
          }
          that.sendVideoChat();
      });
    $('#sendMessageBtn').click(function (e) {
            e.preventDefault();
            var message={content:$('#message-to-send').val(),contentType:'1',chatType:that.chatType,channel:that.channel};
            that.client.sendMessage(message);
            $('#message-to-send').val("");
        });
    }
  }
  TF.chatInit=new ChatInit();
})(TF);

