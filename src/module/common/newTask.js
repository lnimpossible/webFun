(function(TF){
    var nodeStr=`<div class="new-task">
                    <div class="new-task-close">
                        <img src="../../../static/image/layout/common/red-close.png" alt="">
                        关闭
                    </div>
                    <p class="new-task-title">正在创建新任务......</p>
                    <div class="new-task-content">
                        <ul>
                            <li>
                                <span>任务名称：</span>
                                <input type="text">
                            </li>
                            <li>
                                <span>执行人员：</span>
                                <input type="text">
                                <span class="new-task-add"></span>
                            </li>
                            <li>
                                <span>地理位置：</span>
                                <input type="text">
                                <span class="new-task-position"></span>
                            </li>
                            <li>
                                <span>任务备注：</span>
                                <textarea class="task-remark-txt" name="" id="" cols="30" rows="10" style="resize:none;"></textarea>
                            </li>
                        </ul>
                    </div>
                    <div class="new-task-ensure">
                        <p>确认发布任务</p>
                    </div>
                </div>`
    TF.genNewTask=function(selector){
        $('#'+selector).append(nodeStr);
        $(".new-task-close").click(function(){
            $('.monitor-center').hide();
            $('.monitor-center-box').empty();
			TF.closeNewFunction()
        })
        
        /* 调试 */
       $('.new-task-add').click(function(){
       	TF.openNewFunction('chosePerson')
       })
    }
})(TF)