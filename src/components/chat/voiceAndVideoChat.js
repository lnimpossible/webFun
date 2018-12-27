(function (TF) {
    class  VoiceAndVideoChat{
        constructor() {
            this.channel_key=null;//频道安全密钥  安全性能不高的可设为null
            this.camera=null;//摄像头设备
            this.microphone=null;//麦克风设备
            this.localStream=null;//
            this.targetStream=null;//
            this.videoContainerId='videoContainer';
            this.videoNumber=2;
            this.videoContainerLocationId='videoContainerLocation';
            this.mediaType='1';//1  为语音  2为视屏
            this.getDevices();
        }
        join(channel,mediaType) {
            var that=this;
            var client=this.client = AgoraRTC.createClient({mode: 'h264_interop'});
            this.videoContainerId='videoContainer';
            this.videoContainerLocationId='videoContainerLocation';
            this.mediaType=mediaType;
            if(TF.chatInit.chatType==='channel'){
                this.videoNumber=2;
                this.videoContainerId='videoMulti';
                this.videoContainerLocationId='videoMulti1';
                mediaType=='1'&&talkinterface_D.join(Number(TF.chatInit.account));
            }
            var showVideo=this.mediaType=='2'?true:false;
            this.client.init(APP_KEY, function () {
                client.join(that.channel_key, channel,Number(TF.chatInit.account), function(uid) {
                    console.log("User " + uid + " join channel successfully");
                    that.localStream = AgoraRTC.createStream({
                        streamID: uid,
                        audio: true,
                        cameraId: that.camera,
                        microphoneId:that.microphone,
                        video: showVideo,
                        screen: false
                    });
                    that.localStream.setVideoProfile('720p_3');
                    // 用户已经准许访问相机和麦克风
                    that.localStream.on("accessAllowed", function() {
                        console.log("accessAllowed");
                    });
                    // 用户拒绝访问相机和麦克风。
                    that.localStream.on("accessDenied", function() {
                        console.log("accessDenied");
                    });
                    that.localStream.init(function() {
                        console.log("getUserMedia successfully");
                        that.localStream.play(that.videoContainerLocationId);//本地视屏播放
                        client.publish(that.localStream, function (err) {
                            console.log("Publish local stream error: " + err);
                        });
                        client.on('stream-published', function (evt) {
                            console.log("Publish local stream successfully");
                        });
                    }, function (err) {
                        console.log("getUserMedia failed", err);
                    });
                }, function(err) {
                    console.log("Join channel failed", err);
                });
            }, function (err) {
                console.log("AgoraRTC client init failed", err);
            });

            client.on('error', function(err) {
                console.log("Got error msg:", err.reason);
                if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
                    client.renewChannelKey(channelKey, function(){
                        console.log("Renew channel key successfully");
                    }, function(err){
                        console.log("Renew channel key failed: ", err);
                    });
                }
            });
            //该回调通知应用程序远程音视频流已添加。
            client.on('stream-added', function (evt) {
                var stream = evt.stream;
                console.log("New stream added: " + stream.getId());
                console.log("Subscribe ", stream);
                that.targetStream=stream;
                client.subscribe(stream, function (err) {
                    console.log("Subscribe stream failed", err);
                });
            });
            //通知应用程序已接收远程音视频流。
            client.on('stream-subscribed', function (evt) {
                var stream = evt.stream;
                console.log("Subscribe remote stream successfully: " + stream.getId());
                if ($(that.videoContainerId+'#agora_remote'+stream.getId()).length === 0) {
                    let containerId=that.videoContainerId;
                    if(TF.chatInit.chatType==='channel'){
                        containerId=that.videoContainerId+that.videoNumber
                        that.videoNumber++;
                    }
                    $('#'+containerId).empty().append('<div style="float:left; width:100%;height:100%;display:inline-block;" id="agora_remote'+stream.getId()+'" ></div>');
                }
                stream.play('agora_remote' + stream.getId());
                if(TF.chatInit.chatType==='channel'&&that.mediaType=='1'){
                    talkinterface_D.join(Number(stream.getId()));
                    return ;
                }
                talkinterface_D.startCounting();
            });
            //通知应用程序已删除远程音视频流，即对方调用了 unpublish stream。
            client.on('stream-removed', function (evt) {
                var stream = evt.stream;
                stream.stop();
                $('#agora_remote' + stream.getId()).remove();
                console.log("Remote stream is removed " + stream.getId());
            });
            //对方用户已离开会议室回调事件 (peer-leave)
            client.on('peer-leave', function (evt) {
                var stream = evt.stream;
                if (stream) {
                    stream.stop();
                    $('#agora_remote' + stream.getId()).remove();
                    console.log(evt.uid + " leaved from this channel");
                }
                if(TF.chatInit.chatType==='channel'){
                    that.mediaType=='1'&&talkinterface_D.exit(Number(stream.getId()));
                    return;
                }
                talkinterface_D.close();
            });
        }
        getDevices() {
            var that=this;
            AgoraRTC.getDevices(function (devices) {
                // console.log(devices);
                for (var i = 0; i !== devices.length; ++i) {
                }
            });
        }
        //让用户离开 AgoraRTC 频道
        leave() {
            $('#'+this.videoContainerLocationId).html('');
            $('#'+this.videoContainerId).html('');
            let sendContent={
                type:'99',
                send_id:TF.chatInit.account.toString(),
                channelId:TF.voiceAndVideoChat.channel,
                receive_id:TF.chatInit.targetAccount.toString()
            }
            TF.chatInit.signal.sendMessage(TF.chatInit.targetAccount.toString(),JSON.stringify(sendContent));
            // this.unsubscribe();
            this.client&&this.client.leave(function () {
                console.log("Leavel channel successfully");
            }, function (err) {
                console.log("Leave channel failed");
            });
        }
        //将本地音视频流发布至 SD-RTN
        publish() {
            this.client.publish(this.localStream, function (err) {
                console.log("Publish local stream error: " + err);
            });
        }
        //取消发布本地音视频流
        unpublish() {
            this.client.unpublish(this.localStream, function (err) {
                console.log("Unpublish local stream failed" + err);
            });
        }
        /*拒接*/
        unsubscribe(){
            this.client&&this.client.unsubscribe(this.targetStream, function(err) {
                console.log(err);
                //……
            });
        }
        enableAudio() {
            this.localStream.enableAudio();
        }
        disableAudio() {
            this.localStream.disableAudio();
        }
        enableVideo() {
            this.localStream.enableVideo();
        }
        disableVideo() {
            this.localStream.disableVideo();
        }
    }
    TF.voiceAndVideoChat=new VoiceAndVideoChat()
})(TF);
