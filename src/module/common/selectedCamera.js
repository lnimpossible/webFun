(function(TF){
    var nodeStr =   `<div class="selected-camera">
                        <div class="close-btn">
                            <img src="static/image/layout/common/red-close.png" alt="">
                            关闭
                        </div>
                        <p class="selected-camera-title">已选监控摄像头（10台）</p>
                        <div class="selected-camera-content">
                            <ul>
                                <li>
                                    <span>B湖底车库行人出入口：</span>
                                    <span>
                                        <img class="camera-status" src="static/image/layout/common/camera-detail-status.png" alt="">
                                        正常
                                    </span>
                                </li>
                                <li>
                                    <span>B湖底车库行人出入口：</span>
                                    <span>
                                        <img class="camera-status" src="static/image/layout/common/camera-detail-status.png" alt="">
                                        正常
                                    </span>
                                </li>
                                <li>
                                    <span>B湖底车库行人出入口：</span>
                                    <span>
                                        <img class="camera-status" src="static/image/layout/common/camera-detail-status.png" alt="">
                                        正常
                                    </span>
                                </li>
                                <li>
                                    <span>B湖底车库行人出入口：</span>
                                    <span>
                                        <img class="camera-status" src="static/image/layout/common/camera-detail-status.png" alt="">
                                        正常
                                    </span>
                                </li>
                                <li>
                                    <span>B湖底车库行人出入口：</span>
                                    <span>
                                        <img class="camera-status" src="static/image/layout/common/camera-detail-status.png" alt="">
                                        正常
                                    </span>
                                </li>
                                <li>
                                    <span>B湖底车库行人出入口：</span>
                                    <span>
                                        <img class="camera-status" src="static/image/layout/common/camera-detail-status.png" alt="">
                                        正常
                                    </span>
                                </li>
                            </ul>
                            <div class="selected-camera-right">
                                <div class="selected-camera-monitor">
                                    <img src="static/image/layout/common/selected-camera-monitor.png" alt="">
                                    <p>监控画面</p>
                                </div>
                                <div class="selected-camera-task">
                                    <img src="static/image/layout/common/selected-camera-task.png" alt="">
                                    <p>派发任务</p>
                                </div>
                            </div>
                        </div>
                    </div>`

    TF.genSelectedCamera = function(selector){
        $('#'+selector).append(nodeStr);
        $(".close-btn").click(function(){
            TF.closeNewFunction();
        })
        
        /* 调试 */
       $('.selected-camera-task').click(function(){
       	TF.openNewFunction('createTask')
       })
    }
})(TF)