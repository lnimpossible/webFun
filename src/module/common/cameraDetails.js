(function(TF){
    var nodeStr =   `<div class="camera-details">
                        <div class="camera-close">
                            <img src="static/image/layout/common/red-close.png" alt="">
                            关闭
                        </div>
                        <div>
                            <span class="camera-name">监控：Y富林台南01</span>
                            <img class="camera-status" src="static/image/layout/common/camera-detail-status.png" alt="">
                        </div>
                        <div class="camera-txt">
                            <ul>
                                <li>
                                    <span>设备名称：</span>
                                    <span>Q糜公路北01</span>
                                </li>
                                <li>
                                    <span>拍摄区域：</span>
                                    <span>富林台广场全景</span>
                                </li>
                                <li>
                                    <span>IP地址：</span>
                                    <span>10.1.15.221</span>
                                </li>
                                <li>
                                    <span>设备类型：</span>
                                    <span>1080P高清云台摄像机</span>
                                </li>
                                <li>
                                    <span>当前状态：</span>
                                    <span>正常</span>
                                </li>
                                <li>
                                    <span>所属nvrip:</span>
                                    <span>10.1.12.58</span>
                                </li>
                            </ul>
                            <div class="camera-video">
                                <img class="full-screen" src="static/image/layout/common/camera-detail-fullscreen.png" alt="">
                            </div>
                        </div>
                        <div class="camera-bottom">
                            <ul>
                                <li class="camera-detail-nearby camera-detail-camera">
                                    <img src="static/image/layout/common/camera-detail-monitor.png" alt="">
                                    <span>周边监控</span>
                                </li>
                                <li class="camera-detail-nearby camera-detail-broadcast">
                                    <img src="static/image/layout/common/camera-detail-broadcast.png" alt="">
                                    <span>周边广播</span>
                                </li>
                                <li class="camera-detail-nearby camera-detail-person">
                                    <img src="static/image/layout/common/camera-detail-person.png" alt="">
                                    <span>周边人员</span>
                                </li>
                            </ul>
                        </div>
                    </div>`
    
    TF.genCameraDetails = function(selector){
        $('#'+selector).append(nodeStr);
        $(".camera-close").click(function(){
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