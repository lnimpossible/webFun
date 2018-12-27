/**
 * Created by Administrator on 2018/4/26/026.
 */
((TF)=>{
    function LayerManage() {
        this.sceneLayers={};
        this.deviceTypeMap={
            'camera':'camera',
            'fireHydrant':'fire_hydrant',
            'waterPressure':'water_pressure',
            'pm25':'pm2.5',
        }
        return this;
    }
    LayerManage.prototype.addLayer=function (layerType) {
        var that=this;
        switch (layerType){
            case 'person':
                // updateUserLayer(layerType);
                setInterval(function(){
                    updateUserLayer(layerType);
                },10000);
                break;
            default:
                TF.requestData.getDeviceListByType({type:this.deviceTypeMap[layerType]}).then(function (response) {
                    response.map(function (val) {
                        that.executeAddBillboardImage(layerType,val);
                    });
                });
                break;
        }
        function updateUserLayer(layerType) {
            TF.requestData.getUserLocation({},true).then(function (response) {
                response.map(function (val) {
                    that.executeAddBillboardImage(layerType,val);
                });
            });
        }
    };
    LayerManage.prototype.executeAddBillboardImage=function (layerType,val){
        this.toWgs84Coordinate(val.position,val);
        val.billboardType=layerType;
        if(!val.longitude){
            // console.log(`${layerType}id:${val.id}的坐标错误！`);
            return;
        }
        if(layerType==='person'){
            var personEntity=Pangu.Data.viewer.entities.getById(val.theone);
            if(personEntity&&val.longitude){
                personEntity.position._value=Pangu.Cartesian3.fromDegrees(val.longitude,val.latitude,val.height);
                return;
            }
        }
        var billboard=TF.earthCommon.addBillboardImage(val);
        this.sceneLayers[layerType]=this.sceneLayers[layerType]||[];
        this.sceneLayers[layerType].push(billboard);
        if(layerType==='person'||layerType==='camera'){return};
        let ellipse=TF.earthExecute.addDynamicEllipse({longitude:val.longitude,latitude:val.latitude,height:val.height},'#00ffff');
        this.sceneLayers[layerType].push(ellipse);
        ConstantData.sceneData.dynamicCircleEntities.push(ellipse);

    }
    LayerManage.prototype.toWgs84Coordinate=function (coordinateString,result) {
        result=result||{};
        if(coordinateString){
          var position=coordinateString.split(',');
          // position=GPS.gcj_decrypt(Number(position[1]),Number(position[0]));
          // result.longitude=position.lon;
          // result.latitude=position.lat;
          result.longitude=Number(position[0]);
          result.latitude=Number(position[1]);
          result.height=Number(position[2])||ConstantData.constant.defaultSceneHeight;
          return result;
        }
    }
    LayerManage.prototype.addLayers=function (layerTypes) {
        var that=this;
        layerTypes.forEach(function (layerType) {
            that.addLayer(layerType);
        });
    }
    LayerManage.prototype.removeLayers=function (layerTypes) {
        var that=this;
        layerTypes.forEach(function (layerType) {
            that.removeLayer(layerType);
        });
    }
    LayerManage.prototype.removeLayer=function (layerType) {
        this.sceneLayers[layerType]&&TF.earthCommon.removeEntities(this.sceneLayers[layerType]);
        this.sceneLayers[layerType].forEach(function (entity) {
            $('#'+entity.id).hide();
        })
        this.sceneLayers[layerType]=[];

    }
    TF.layerManage=new LayerManage();
})(TF);
