(function(){
    var nodeStr =   `<div class="check-camera">
                        <div class="close-btn">
                            <img src="../../../static/image/layout/common/red-close.png" alt="">
                            关闭
                        </div>
                        <p class="check-camera-title">已选择监控摄像头（10台）</p>
                        <div class="check-camera-content">
                            <ul>
                                <li>
                                    <span>B湖底车库行人出入口：</span>
                                    <span class="normal">
                                        <div class="check-camera-status"></div>
                                        正常
                                    </span>
                                </li>
                                <li>
                                    <span>Q皇甫路禅茶馆西02：</span>
                                    <span class="normal">
                                        <div class="check-camera-status"></div>
                                        正常
                                    </span>
                                </li>
                                <li>
                                    <span>Q皇甫路禅茶馆西03：</span>
                                    <span class="normal">
                                        <div class="check-camera-status"></div>
                                        正常
                                    </span>
                                </li>
                                <li>
                                    <span>Q平和亭北02：</span>
                                    <span class="malfunction">
                                        <div class="check-camera-status"></div>
                                        正常
                                    </span>
                                </li>
                                <li>
                                    <span>Q平和亭北02：</span>
                                    <span class="normal">
                                        <div class="check-camera-status"></div>
                                        正常
                                    </span>
                                </li>
                                <li>
                                    <span>Q平和亭北02：</span>
                                    <span class="normal">
                                        <div class="check-camera-status"></div>
                                        正常
                                    </span>
                                </li>
                            </ul>
                            <div class="check-camera-right">
                                <div class="check-camera-camera">
                                </div>
                                <div class="check-camera-task">
                                </div>
                            </div>
                        </div>
                        <p class="check-camera-bottom">查看监控画面 >></p>
                    </div>`

    TF.genCheckCamera = function(selector){
        $('#'+selector).append(nodeStr);
        $(".close-btn").click(function(){
            TF.closeNewFunction();
        });
        $('.check-camera-camera').click(function(){
            $(this).toggleClass('current');
        })
    }
})(TF)