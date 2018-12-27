/**
 * Created by lijia on 2018/7/13.
 */

var talkinterface_D = {
    voice_one: {
        dom: document.getElementsByClassName('talkinterface-voice-1-d')[0],
        feature: ['静音','视频'],
        name: 'cell',
        portrait_src: 'http://b.hiphotos.baidu.com/zhidao/pic/item/d52a2834349b033b0a25373c13ce36d3d439bda3.jpg',
        render: function (data) {
            let portrait_wrap = this.dom.getElementsByClassName('talkinterface-user-bigportraits-d')[0];
            this.portrait_src = data;
            // 更新用户头像
            portrait_wrap.innerHTML = '<img class="img100" src="' + this.portrait_src + '"/>'
        }
    },
    voice_multi: {
        dom: document.getElementsByClassName('talkinterface-voice-multi-d')[0],
        feature: ['静音'],
        name: '天覆科技（3人）',
        userInfo:[
            {
                id: 1,
                name: 'lily',
                portrait_src: 'http://img5.duitang.com/uploads/item/201508/09/20150809005334_rxVJH.jpeg',
                status: 2
            },
            {
                id:2,
                name: 'ann',
                portrait_src: 'http://img3.duitang.com/uploads/item/201512/08/20151208153046_xcPHk.thumb.700_0.png',
                status: 1
            },
            {
                id:3,
                name:'jack',
                portrait_src: 'http://pic.qqtn.com/up/2015-11/2015112415452744215.png',
                status: 1
            },
        ],
        render: function (data) {
            let str = '';
            this.userInfo = data;
            this.userInfo.forEach(function (val,i) {
                let status = '';
                if (val.status == 1) {
                    status = '正在连接 <dot>...</dot>'
                } else {
                    status = '已加入'
                }
                str += `<div class="talkinterface-voicemulti-user-d" user-id="${val.id}" >
							<div class="talkinterface-user-smallportraits-d">
								<img class="img100" src="${val.portrait_src}" alt="" />
							</div>
							<div>${val.name}</div>
							<span>${status}</span>
						</div>`
            })
            this.dom.innerHTML = str;
            this.statusList = {};
            let userElements = document.getElementsByClassName('talkinterface-voicemulti-user-d'),
                length = userElements.length;
            for (let i = 0; i < length; i++) { // 键名为id  值为对应dom
                let key = userElements[i].getAttribute('user-id'),
                    value = userElements[i].getElementsByTagName('span')[0];
                this.statusList[key] = value
            }
            console.log(this.statusList)
        },
        update: function (userId, status) { // 更新当前成员连接状态
            this.statusList[userId].innerHTML = status;
        }
    },
    video_one: {
        dom: document.getElementsByClassName('talkinterface-video-1-d')[0],
        feature: ['静音','语音'],
        name: '单人视频',
        render: function () {

        }
    },
    video_multi: {
        dom: document.getElementsByClassName('talkinterface-video-multi-d')[0],
        feature: ['静音'],
        name: '多人视频',
        render: function () {

        }
    },
    chatwindow: document.getElementsByClassName('talkinterface-wrap-d')[0],
    minimizewindow: document.getElementsByClassName('talkinterface-minimize-wrap-d')[0],
    dragdom: document.getElementsByClassName('talkinterface-header-d')[0],
    drag_flag: false,
    disX: 0,
    disY: 0,
    lastshow: null,
    option:null,
    /**
     * option:{
	 *  type:'',
	 *  name:'',
	 *  data:
	 * }
     */
    showChatwindow: function (option) {
        // 展示聊天窗口
        TF.openNewFunction('chat');
        this.option = option;
        this.chatwindow.style.display = 'flex';
        this.chatwindow.style.transform = 'scale(0.5)';
        this.chatwindow.style.opacity = 0;

        setTimeout(()=>{
            this.chatwindow.style.transition = "all .2s linear";
            this.chatwindow.style.transform = 'scale(1)';
            this.chatwindow.style.opacity = 1;
            setTimeout(()=>{
                this.chatwindow.style.transition = "none";
            },1000)
        },200)

        // 聊天窗口名称
        this.title(option.name)

        // 聊天类型
        this.type(option);
    },
    title: function (text) {
        let name = document.getElementsByClassName('talkinterface-targetname-d')[0];
        name.innerHTML = text
    },
    type : function (option) {
        let currentObj = this[option.type], // currentObj 当前聊天对象
            showElement = currentObj.dom,
            featureList = currentObj.feature; // 功能列表

        if (this.lastshow) this.lastshow.style.display = 'none'

        showElement.style.display = 'flex'
        this.lastshow = showElement


        let status = document.getElementsByClassName('talkinterface-status-d')[0],
            create = status.getElementsByTagName('div')[0],
            duration = status.getElementsByTagName('div')[1],
            callinBtn = document.getElementsByClassName('talkinterface-callin-d')[0];
        if(this.option.status == 0){ // 呼入
            create.innerHTML = "等待接听 <dot>...</dot>";
            status.style.display = 'block';
            callinBtn.style.display = 'block';
            // footer功能 全隐藏
            let featureDom = document.getElementsByClassName('talkinterface-footer-function-item'),
                length = featureDom.length;
            for (let i = 0; i < length; i++) {
                featureDom[i].style.display = 'none'
            }
        } else { // 呼出
            // 还原通话状态
            create.innerHTML = "正在连接 <dot>...</dot>";
            create.style.display = 'block';
            duration.style.display = 'none';
            callinBtn.style.display = 'none';

            // footer功能
            let featureDom = document.getElementsByClassName('talkinterface-footer-function-item'),
                length = featureDom.length;
            for (let i = 0; i < length; i++) {
                let featureName = featureDom[i].getAttribute('type')
                if (featureList.includes(featureName) ) {
                    featureDom[i].style.display = 'flex'
                } else {
                    featureDom[i].style.display = 'none'
                }
            }
        }

        currentObj.render(option.data)
    },
    answer: function () {
        console.log("接听电话");
        let status = document.getElementsByClassName('talkinterface-status-d')[0],
            create = status.getElementsByTagName('div')[0],
            duration = status.getElementsByTagName('div')[1],
            callinBtn = document.getElementsByClassName('talkinterface-callin-d')[0];

        callinBtn.style.display = 'none';
        this.startCounting();
        console.log(this.option.type);

        let type = this.option.type,
            currentObj = this[type],
            featureList = currentObj.feature;
        // footer功能
        let featureDom = document.getElementsByClassName('talkinterface-footer-function-item'),
            length = featureDom.length;
        for (let i = 0; i < length; i++) {
            let featureName = featureDom[i].getAttribute('type')
            if (featureList.includes(featureName) ) {
                featureDom[i].style.display = 'flex'
            } else {
                featureDom[i].style.display = 'none'
            }
        }
        /*接听视屏*/
        TF.voiceAndVideoChat.join(TF.voiceAndVideoChat.channel,TF.voiceAndVideoChat.mediaType);
        /*发送接收信令*/
        let sendContent={
            type:'88',
            send_id:TF.chatInit.account.toString(),
            channelId:TF.voiceAndVideoChat.channel,
            receive_id:TF.chatInit.targetAccount.toString()
        }
        TF.chatInit.signal.sendMessage(TF.chatInit.targetAccount.toString(),JSON.stringify(sendContent));
        // TF.voiceAndVideoChat =new VoiceAndVideoChat(TF.chatInit.appId,TF.chatInit.channel,'2');
    },
    join: function (userId) {
        let type = this.option.type,  // voice_multi
            currentObj = this[type];
        currentObj.update(userId, '已加入');
        if (this.option.status == 0) return;
        if (currentObj.start) return;
        this.startCounting();
        currentObj.start = true;
    },
    exit: function (userId) {
        let type = this.option.type,  // voice_multi
            currentObj = this[type];

        currentObj.update(userId, '已离开');
    },
    changeType: function () {
        let currentObj = this[this.option.type], // currentObj 当前聊天对象
            showElement = currentObj.dom,
            featureList = currentObj.feature; // 功能列表

        if (this.lastshow) this.lastshow.style.display = 'none';

        showElement.style.display = 'flex'
        this.lastshow = showElement

        // footer功能
        let featureDom = document.getElementsByClassName('talkinterface-footer-function-item'),
            length = featureDom.length;
        for (let i = 0; i < length; i++) {
            let featureName = featureDom[i].getAttribute('type')
            if (featureList.includes(featureName) ) {
                featureDom[i].style.display = 'flex'
            } else {
                featureDom[i].style.display = 'none'
            }
        }

        currentObj.render(this.option.data)
    },
    close: function () {
        console.log('关闭窗口')
        //  结束计时
        this.endCounting()
        this.chatwindow.style.transition = "all .5s";
        this.chatwindow.style.transform = 'scale(0)';
        this.chatwindow.style.opacity = 0;
        setTimeout(()=>{
            this.chatwindow.style.display = 'none'
            this.chatwindow.style.transition = "none";
        },1000);
        /*接听视屏*/
        TF.voiceAndVideoChat.leave();
    },
    recover: function () {
        this.chatwindow.style.top = this.lastTop;
        this.chatwindow.style.left = this.lastLeft;
        this.chatwindow.style.transform = 'scale(1)';
        // this.chatwindow.style.opacity = 1;
        this.minimizewindow.style.display = 'none';
        //
        // setTimeout(()=>{
        //     this.chatwindow.style.transition = "none";
        // },1400)
    },
    lastTop: 0,
    lastLeft: 0,
    minimize: function () {
        console.log('最小化')
        let chatwindow = this.chatwindow,
            minimizewindow = this.minimizewindow;

        // 保存当前窗口位置
        this.lastTop = chatwindow.style.top;
        this.lastLeft = chatwindow.style.left;
        // 元素先显示才能获取bottom、right
        minimizewindow.style.display = 'block';

        let from = chatwindow.getBoundingClientRect();
        to = minimizewindow.getBoundingClientRect();

        chatwindow.style.top = to.top + (to.height - from.height) * 1/2 + 'px';
        chatwindow.style.left = to.left + (to.width - from.width) * 1/2 + 'px';
        chatwindow.style.transform = 'scale(0)';
        // chatwindow.style.transition = "all 1s";
        // chatwindow.style.opacity = 0;
    },
    invite: function () {
        console.log('邀请')
    },
    hangup: function () {
        // 结束计时
        this.close();
        // this.endCounting()
        // console.log('挂断')
        console.log('挂断');
    },
    soundoffDOM:document.getElementsByClassName('soundoff-icon-d')[0],
    soundoff: function () {
        let wrap = this.soundoffDOM.parentNode,
            className = wrap.className;

        if (className.includes('sel')) {
            // 去掉
            let newClass = className.replace('sel','')
            wrap.className = newClass
            console.log('取消静音');
            TF.voiceAndVideoChat.enableAudio();
        } else {
            // 加上
            className += ' sel'
            wrap.className = className
            console.log('静音');
            TF.voiceAndVideoChat.disableAudio();
        }

    },
    tabvoice: function () {
        this.option.type = 'voice_one'
        console.log('切换语音')
        this.changeType();
        TF.voiceAndVideoChat.disableVideo();
    },
    tabvideo: function () {
        console.log('切换视频')
        this.option.type = 'video_one'
        this.changeType()
        TF.voiceAndVideoChat.enableVideo();
    },
    tabFrame: function () {
        console.log('窗口对调')
    },
    // 开始计时
    startCounting: function () {
        let status = document.getElementsByClassName('talkinterface-status-d')[0],
            create = status.getElementsByTagName('div')[0],
            duration = status.getElementsByTagName('div')[1];
        create.style.display = 'none';
        duration.style.display = 'block';
        this.timer.init()
    },
    endCounting: function () {
        this.timer.kill()
    },
    timer: {
        startTime: null, // 开始时间
        element: document.getElementById('talkinterface-timer'),
        timer: null, // 计时器
        init: function () {
            this.element.innerHTML = '00:00';
            if (this.timer) this.kill();

            let time = new Date();
            this.startTime = time.getTime();

            this.timer = setInterval(()=> {
                let time = new Date(),
                    seconds = ~~((time.getTime() - this.startTime) / 1000); // 当前秒数
                this.element.innerHTML = this.timeFormat(seconds);
            },800)
        },
        timeFormat: function (time) {
            let minutes = ~~(time / 60),
                timeFormat = ''
            if (minutes < 1) {  // 不足一分  原样输出
                timeFormat = time.toString();
            } else { // 大于一分钟
                let seconds = (time - minutes * 60).toString();
                seconds = seconds.padStart(2,'00')
                timeFormat = `${minutes}:${seconds}`
            }
            return timeFormat.padStart(5,'00:00');
        },
        kill: function () { // 清除定时器
            clearInterval(this.timer)
            this.timer = null
        }
    }
};


talkinterface_D.dragdom.onmousedown = function (event) {
    var event = event || window.event;

    talkinterface_D.drag_flag = true;
    talkinterface_D.disX = event.clientX - talkinterface_D.chatwindow.offsetLeft;
    talkinterface_D.disY = event.clientY - talkinterface_D.chatwindow.offsetTop;

    this.setCapture && this.setCapture();

    return false
};
document.onmousemove = function (event) {
    if (!talkinterface_D.drag_flag) return;
    var event = event || window.event;
    var iL = event.clientX - talkinterface_D.disX;
    var iT = event.clientY - talkinterface_D.disY;
    var maxL = document.documentElement.clientWidth - talkinterface_D.chatwindow.offsetWidth;
    var maxT = document.documentElement.clientHeight - talkinterface_D.chatwindow.offsetHeight;

    iL = iL < 0 ? 0 : iL;
    iL = iL > maxL ? maxL : iL;

    iT = iT < 0 ? 0 : iT;
    iT = iT > maxT ? maxT : iT;

    talkinterface_D.chatwindow.style.marginTop = talkinterface_D.chatwindow.style.marginLeft = 0;
    talkinterface_D.chatwindow.style.left = iL + "px";
    talkinterface_D.chatwindow.style.top = iT + "px";

    return false
};
document.onmouseup = window.onblur = talkinterface_D.dragdom.onlosecapture = function () {
    talkinterface_D.drag_flag = false;
    talkinterface_D.drag_flag.releaseCapture && talkinterface_D.drag_flag.releaseCapture();
};


// document.getElementsByClassName("talkinterface-video-multi-d")[0].addEventListener("dblclick",function(e){
//     console.log('当前点击窗口')
//     console.log(e.target)
//     let target = e.target;
//     console.log(this);
//     // footer功能
// 		let videowindows = document.getElementsByClassName('talkinterface-videomulti-user-d'),
// 			length = videowindows.length;
// 		for (let i = 0; i < length; i++) {
// 			videowindows[i].style.display = 'none'
// 		}
// 	target.style.display = 'flex';
//     target.style.width = '98%';
//     target.style.height = '98%'
// })