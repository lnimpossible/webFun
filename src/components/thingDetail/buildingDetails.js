(function(TF){
	let cacheData, floorIndex = 0, unitIndex = 0;
    TF.buildingData=null, TF.currentFloorData=null;
    TF.genBuildingDetails = function(selector, buildingData){
    	var data;
    	data = (typeof buildingData == 'string')? cacheData:cacheData=buildingData;
    	TF.buildingData = data;
    	var floorBoxDom = "";
    	var unitArr = data.unit_list;
    	console.log(unitArr)
    	unitArr.forEach(function(unit, unitIndex){
    		var floorDom = "";
    		unit.floor_list.forEach(function(floor,index){
    			floorDom+='<li class="floor" unit-index="'+unitIndex+'" floor-index="'+index+'">'+floor.floor+'层</li>';
    		})
    		var unitDom = '<li>'+
                			'<p class="floor-unit-tag">'+unit.unit+'单元</p>'+
                			'<ul class="floor-wrap">'+
	                        	floorDom+
                        	'</ul>'+
                		'</li>';
            floorBoxDom+=unitDom
    	})
	    var nodeStr =   `<div class="building-details thing-detail">
                    <div class="building-detail-close close-btn">
                        <img class="mr8" src="static/image/layout/common/red-close.png" alt="">
                        关闭
                    </div>
                    <p class="thing-detail-name mb40">建筑：${data.name}</p>
                    <div class="building-detail-body thing-detail-body">
                        <ul class="fl nice-scroll">
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">建筑名称：</span>
                                <span class="thing-detail-v">${data.name}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">建筑用途：</span>
                                <span class="thing-detail-v">${data.purpose}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">建筑负责人：</span>
                                <span class="thing-detail-v">${data.administrator}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">实有人口:</span>
                                <span class="thing-detail-v">${data.population_num||0}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">实有单位:</span>
                                <span class="thing-detail-v">${data.company_num||0}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">实有安防:</span>
                                <span class="thing-detail-v">${data.security_num||0}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">实有房屋:</span>
                                <span class="thing-detail-v">${data.room_num}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">实有警情:</span>
                                <span class="thing-detail-v">${data.police_situation_num||0}</span>
                            </li>
                            <li class="thing-detail-kv mb10">
                                <span class="thing-detail-k">实有群房群治力量:</span>
                                <span class="thing-detail-v">${data.group_defense_num||0}</span>
                            </li>
                        </ul>
                        <div class="fr building-details-r mr40">
                        	<ul class="floor-box nice-scroll">
                        		${floorBoxDom}
                        	</ul>
                        	<div class="building-details-btns">
                        		<p class="building-details-btn panorama fl">浏览全景图</p>
                        		<p class="building-details-btn build-module fr">查看平面图</p>
                        	</div>
                        </div>
                    </div>
                </div>`;
    	
        $('#'+selector).append(nodeStr);
        TF.setScroll();
        $(".building-detail-close").click(function(){
            TF.closeNewFunction();
            cacheData = null;
        });
        $('.floor').click(function(){
        	unitIndex = $(this).attr('unit-index');
        	floorIndex = $(this).attr('floor-index');
        })
        $('.panorama').click(function(){
        	window.open(buildingData.panorama||'http://vr-720.com/tour/5a211f62f578b523')
        })
		//查看建筑平面图
        $('.build-module').click(function(){
        	TF.switchModule('inside');
        	TF.currentFloorData = unitArr[unitIndex].floor_list[floorIndex];
        	TF.currentFloorData.unitIndex = unitIndex;
        	// console.log(TF.currentFloorData)
        })
        $('.floor').click(function(){
        	$(this).addClass('floor-active')
        	.siblings().removeClass('floor-active');
        })
    }
})(TF)
