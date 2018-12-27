(function(TF){
	let nodeStr = `<div class="selected-thing">
		            <div class="close-btn selected-thing-close">
		                <img class="mr8" src="static/image/layout/common/red-close.png" alt="">
		                关闭
		            </div>
		            <p class="selected-thing-name mb40">已选监控摄像头（10台）</p>
		            <div class="selected-thing-content">
		                <ul class="fl">
		                    <li class="mb10">
		                        <span class="selected-thing-item1">B湖底车库行人出入口：</span>
		                        <span class="selected-thing-item2">
                                    <span class="red-state-dot"></span>故障
                                </span>
		                    </li>
		                    <li class="mb10">
		                        <span class="selected-thing-item1">B湖底车库行人出入口：</span>
		                        <span class="selected-thing-item2">
                                    <span class="red-state-dot"></span>故障
                                </span>
		                    </li>
		                    <li class="mb10">
		                        <span class="selected-thing-item1">B湖底车库行人出入口：</span>
		                        <span class="selected-thing-item2">
                                    <span class="red-state-dot"></span>故障
                                </span>
		                    </li>
		                    <li class="mb10">
		                        <span class="selected-thing-item1">B湖底车库行人出入口：</span>
		                        <span class="selected-thing-item2">
                                    <span class="red-state-dot"></span>故障
                                </span>
		                    </li>
		                    <li class="mb10">
		                        <span class="selected-thing-item1">B湖底车库行人出入口：</span>
		                        <span class="selected-thing-item2">
                                    <span class="red-state-dot"></span>故障
                                </span>
		                    </li>
		                    <li class="mb10">
		                        <span class="selected-thing-item1">B湖底车库行人出入口：</span>
		                        <span class="selected-thing-item2">
                                    <span class="red-state-dot"></span>故障
                                </span>
	                    	</li>
		                </ul>
		                <div class="selected-thing-right fl">
		                    <div class="selected-thing-type selected-thing-type1"></div>
		                    <div class="selected-thing-type selected-thing-type2"></div>
		                </div>
		            </div>
		        </div>`;
	TF.genSelectedThing = function(selector){
		$('#'+selector).append(nodeStr);
		$('.selected-thing-close').click(function(){
			TF.closeNewFunction()
		})
	}
})(TF)
