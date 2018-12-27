(function(TF){
    var nodeStr =   `<div class="selected-person">
                        <div class="close-btn">
                            <img src="static/image/layout/common/red-close.png" alt="">
                            关闭
                        </div>
                        <p class="selected-person-title">区域范围内已选择人员......</p>
                        <div class="selected-person-main">
                            <div class="selected-person-content">
                                <span class="selected-person-department">董事会</span>
                                <i class="fa fa-chevron-down arrows-blue"></i>
                                <ul>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                </ul>
                            </div>
                            <div class="selected-person-content">
                                <span class="selected-person-department">维修部</span>
                                <i class="fa fa-chevron-down arrows-blue"></i>
                                <ul>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                </ul>
                            </div>
                            <div class="selected-person-content">
                                <span class="selected-person-department">保安部</span>
                                <i class="fa fa-chevron-down arrows-blue"></i>
                                <ul>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                    <li>张建中</li>
                                </ul>
                            </div>
                        </div>
                        <div class="selected-person-bottom">
                            <ul>
                                <li class="selected-person-voice">语音</li>
                                <li class="selected-person-group">创建群聊</li>
                                <li class="selected-person-video">视频</li>
                            </ul>
                        </div>
                    </div>`
    TF.genChoicePerson = function(selector){
        $('#'+selector).append(nodeStr);
        $(".close-btn").click(function(){
            TF.closeNewFunction();
        });
        $('.selected-person-content i').click(function(){
            $(this).next().slideToggle();
            if($(this).hasClass('fa-chevron-down')){
                $(this).removeClass('fa-chevron-down arrows-blue').addClass('fa-chevron-up arrows-yellow');
            }else{
                $(this).removeClass('fa-chevron-up arrows-yellow').addClass('fa-chevron-down arrows-blue');
            }
        });
        $('.selected-person-bottom li').click(function(){
            $(this).toggleClass('active').siblings().removeClass('active');
        });
        $('.selected-person-content li').click(function(){
            $(this).toggleClass('active');
        });
        
        /* 调试 */
       $('.selected-person-group').click(function(){
       	TF.openNewFunction('chat')
       })
    }
})(TF)