(function(TF){
	var layerType;
    var nodeStr='<div class="ejection">'+
                    '<p class="ejection-top">图层选择</p>'+
                    '<div class="ejection-content">'+
                        '<div class="ejection-item layer-chose-item layer-chose-item1" layer-type="device_camera">摄像头</div>'+
                        '<div class="ejection-item layer-chose-item layer-chose-item2" layer-type="device_fire_hydrant">消防栓</div>'+
                        '<div class="ejection-item layer-chose-item layer-chose-item3" layer-type="user_list">人员</div>'+
                    '</div>'+
                    '<div class="ejection-buttons">'+
                    	'<div class="ejection-button layer-choose-button " action="cancel">取消</div>'+
                    	'<div class="ejection-button layer-choose-button" action="ok">确定</div>'+
                    '</div>'+
                '</div>'
    TF.genLayerChoose=function(selector){
        $('#'+selector).append(nodeStr);
        
        $('.layer-chose-item').click(function(){
        	$(this).addClass('ejection-item-active')
        	.siblings().removeClass('ejection-item-active');
        	layerType = $(this).attr('layer-type');
        })
        
        $('.layer-choose-button').click(function(){
          	let action = $(this).attr('action');
          	
          	if(action == 'cancel'){
          		TF.cancelSelect();
        		TF.closeNewFunction();
        		return
          	}
          	if(!layerType){
    			TF.notice.message('请选择图层!');
    			return 
    		}
        	if(TF.multipleChoseType == 'box'){
    			TF.geometryController.drawPloygon(function(result){
    				console.log(result)
    				var parama = {
    					polygon: result.pointsString,
    					type: layerType
    				}
    				TF.requestData.boxSelect(parama).then(function(data){
    					showSelectedThing(layerType, data);
    					TF.earthCommon.removeEntities(TF.geometryController.selectedEntities);
    					TF.cancelSelect()
    				})
    			})
    		}else{
    			TF.geometryController.drawPolyline(function(result){
    				var parama = {
    					polygon: result.pointsString,
    					type: layerType
    				}
    				TF.requestData.lineSelect(parama).then(function(data){
    					showSelectedThing(layerType, data);
    					TF.earthCommon.removeEntities(TF.geometryController.selectedEntities);
    					TF.cancelSelect()
    				})
    			})
    		}
    		TF.closeNewFunction();
        })
    }
    
    function showSelectedThing(type, data){
    	switch(type){
    		case 'device_camera': 
    			TF.openNewFunction('multipleThing', {thingType: 'camera', data: data})
    		break;
    		case 'device_fire_hydrant': 
    		TF.openNewFunction('multipleThing', {thingType: 'hydrant', data: data})
    		break;
    		case 'user_list': 
    		TF.openNewFunction('choseTaskPerson', data)
    		break;
    	}
    }
})(TF)