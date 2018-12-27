(function(TF){
	let userInfo = TF.LoginCache.userInfo;
	let situationData,cacheSelector;
    TF.genDeviceEvent=function(selector){
    	cacheSelector = selector;
    	TF.requestData.getSituation2Me({user_id: userInfo.id}).then(function(data){
			situationData = data;
			genDeviceEvent(selector)
		})
    }
    
    function genDeviceEvent(selector){
    	var important=normal="";
    	var importantData = [];
    	var normalData = [];
//  	situationData.forEach(function(item){
//  		(item.level=='一级')? importantData.push(item):normalData.push(item);
//  	})
		situationData.forEach(function(item){
			if(item.status_code == 1){
				(item.level=='一级')? importantData.push(item):normalData.push(item);
			}else{
				if(item.level=='一级'&&importantData.length<2){
					importantData.push(item)
				}
				if(item.level=='二级'&&normalData.length<3){
					normalData.push(item)
				}
			}
		})
	    importantData.forEach(function(val, index){
	    	var situationType = (val.origin_type)=='user'? 'APP':'设备报警';
	    	var newTag = (val.status_code=='1')? '<sup class="new-tag">new</sup>':"";
            important+='<div class="device-event-info" index="'+index+'">'+
                            '<i class="fa fa-star red"></i>'+
                            '<span class="no-select">'+val.name+' —— </span>'+
                            '<span class="no-select" style="color: #27aae1;">'+situationType+'</span>'+
                            newTag+
                        '</div>'
	    })
	    normalData.forEach(function(val,index){
	    	var situationType = (val.origin_type)=='user'? 'APP':'设备报警';
	    	var newTag = (val.status_code=='1')? '<sup class="new-tag">new</sup>':"";
            normal+='<div class="device-event-info" index="'+(index+2)+'">'+
                            '<i class="fa fa-star yellow"></i>'+
                            '<span class="no-select">'+val.name+' —— </span>'+
                            '<span class="no-select" style="color: #27aae1;">'+situationType+'</span>'+
                            newTag+
                        '</div>'
	    })

	    var nodeStr='<div class="newest-situation">'+
	                    '<hr class="newest-situation-hr1"/>'+
	                    '<div class="level1 nice-scroll">'+
	                    	important+
	                    '</div>'+
	                    '<hr class="newest-situation-hr1"/>'+
	                    '<div class="level2 nice-scroll">'+
	                    	normal+
	                    '</div>'+
	                    '<div class="newest-situation-more">'+
	                        '<hr class="device-event-line no-select"/>'+
	                        '<span class="device-event-txt no-select">更多 >></span>'+
	                    '<div>'
	                '</div>';
	    $(selector).empty().append(nodeStr);
	    TF.setScroll();
        $('.device-event-info').click(function(){
        	var index = $(this).attr('index');
        	var data = situationData[index];
        	data.billboardType = 'situation';
        	TF.openNewFunction('thingDetail', data);
        	var coordinate=TF.layerManage.toWgs84Coordinate(data.position);
			Pangu.Location.flyTo(coordinate.longitude,coordinate.latitude,300);
        });
        $('.device-event-txt').click(function(){
			if(ControlVar.moduleName=='monitor'){
				TF.menuMasterClick(1);
				setTimeout(function(){
					TF.dispatchMenuClick(2)
				},500)
			}else{
				TF.dispatchMenuClick(2)
			}
        })
    }
    TF.refreshNewestSituation = function(){
    	$(cacheSelector).empty();
    	TF.requestData.getSituation2Me({user_id: userInfo.id}).then(function(data){
			situationData = data;
			genDeviceEvent(cacheSelector)
		})
    }
})(TF)