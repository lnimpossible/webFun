(function(TF){
    var nodeStr =   `<div class="broadcast-details">
                        <div class="broadcast-close">
                            <img src="static/image/layout/common/red-close.png" alt="">
                            关闭
                        </div>
                        <div>
                            <span class="broadcast-name">广播：34号箱</span>
                            <img class="broadcast-status" src="static/image/layout/common/camera-detail-status.png" alt="">
                        </div>
                        <div class="broadcast-txt">
                            <ul>
                                <li>
                                    <span>设备名称：</span>
                                    <span>34号箱智能广播</span>
                                </li>
                                <li>
                                    <span>广播区域：</span>
                                    <span>富林台广场</span>
                                </li>
                                <li>
                                    <span>IP地址：</span>
                                    <span>10.1.17.19</span>
                                </li>
                                <li>
                                    <span>设备类型：</span>
                                    <span>频道终端</span>
                                </li>
                                <li>
                                    <span>当前状态：</span>
                                    <span>正常</span>
                                </li>
                                <li>
                                    <span>所在频道：</span>
                                    <span>34</span>
                                </li>
                                <li>
                                    <span>广播音量：</span>
                                    <span>45</span>
                                </li>
                            </ul>
                            <div class="radio-broadcast">
                                <div>
                                    <img class="radio-broadcast-left" src="static/image/layout/common/radio-broadcast-left.png" alt="">
                                    <img class="radio-broadcast-right" src="static/image/layout/common/radio-broadcast-right.png" alt="">
                                </div>
                                <div class="radio-broadcast-voice">
                                    <span>语音播报</span>
                                </div>
                                <div class="radio-broadcast-text">
                                        <span>文本播报</span>
                                </div>
                            </div>
                        </div>
                        <div class="broadcast-bottom">
                            <ul>
                                <li class="camera-detail-camera">
                                    <img src="static/image/layout/common/camera-detail-monitor.png" alt="">
                                    <span>周边监控</span>
                                </li>
                                <li class="camera-detail-broadcast">
                                    <img src="static/image/layout/common/camera-detail-broadcast.png" alt="">
                                    <span>周边广播</span>
                                </li>
                                <li class="camera-detail-person">
                                    <img src="static/image/layout/common/camera-detail-person.png" alt="">
                                    <span>周边人员</span>
                                </li>
                            </ul>
                        </div>
                    </div>`


    TF.genBroadcastDetails = function(selector){
        $('#'+selector).append(nodeStr);
        $(".broadcast-close").click(function(){
            TF.closeNewFunction();
        });
        $(".camera-detail-camera").click(function(){
            TF.openNewFunction('nearbyThing',{position:'111',nearbyType: 'camera'})
        });
        $(".camera-detail-broadcast").click(function(){
            TF.openNewFunction('nearbyThing',{position:'111',nearbyType: 'broadcast'})
        });
        $(".camera-detail-person").click(function(){
            TF.openNewFunction('nearbyThing',{position:'111',nearbyType: 'person'})
        })
    }
})(TF)