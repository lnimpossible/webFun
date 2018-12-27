/**
 * Created by Administrator on 2018/9/21/021.
 */
(function (TF) {
    class SceneController{
        //展示专题分析
        constructor(){
            this.sceneMode=0;//场景模式   1：日常监控实景模型模式  2. 专题分析模式
            this.mainSceneData=ConstantData.sceneData.mainScene;
            this.carFlowSceneData=ConstantData.sceneData.carFlowScene;
        }
        /*展示专题分析*/
        showSpecializedAnalysis(){

            if(this.sceneMode==2){return false;}
            let viewer=Pangu.Data.viewer;
            this.remove3dtiles(this.mainSceneData.model);
            Pangu.Data.viewer.entities.removeAll();
            viewer.scene.globe.imageryLayers.get(0).alpha = 0.4;//影像透明度调节
            viewer.scene.globe.baseColor = new Pangu.Color(0,1,1, 0.1);
            viewer.imageryLayers.get(0).brightness = 0.6;
            let model=TF.earthExecute.addBox3dtiles(ConstantData.sourceUrl.box3dtiles);
            this.carFlowSceneData['model']=model;
            TF.layerManage.addLayers(['camera','person','fireHydrant']);//添加图层
            TF.earthData.runningTracks.map(function (val) {
                TF.earthExecute.addRunningTrack(val)
            })
            // TF.earthData.testPositions.map(function (val) {
            //     TF.earthExecute.setTwinkleEffect(val);
            // })
            TF.earthData.trafficSituations.map(function (val) {
                TF.earthExecute.showTrafficSituation(val)
            })

            TF.earthData.eventPositions.map(function (val) {
                TF.earthExecute.addDynamicEllipse(val.position,val.color)
            })
            TF.requestData.getRainTunnelData().then(function (result) {
                result.map(function (val) {
                    let positions=[];
                    let radius=val.radius.substring(2,val.radius.length);
                    val.coordinates.map(function (item) {
                        positions.push(item[0],item[1],-Number(val.depth));
                    })
                    TF.earthExecute.addTunelLine(positions,Number(radius)/1000,'#00ff00',1)
                })
            })
            TF.requestData.getSewageTunnelData().then(function (result) {
                result.map(function (val) {
                    let positions=[];
                    let radius=val.radius.substring(2,val.radius.length);
                    val.coordinates.map(function (item) {
                        positions.push(item[0],item[1],-Number(val.depth));
                    })
                    TF.earthExecute.addTunelLine(positions,Number(radius)/1000,'#00FFFF',1)
                })
            });
            TF.requestData.getWaterTunnelData().then(function (result) {
                result.map(function (val) {
                    let positions=[];
                    let radius=val.radius.substring(2,val.radius.length);
                    val.coordinates.map(function (item) {
                        positions.push(item[0],item[1],-Number(val.depth));
                    })
                    TF.earthExecute.addTunelLine(positions,Number(radius)/1000,'#FFFF00',1)
                })
            })
            TF.requestData.getCableTunnelData().then(function (result) {
                result.map(function (val) {
                    let positions=[];
                    let radius=val.radius.substring(2,val.radius.length);
                    val.coordinates.map(function (item) {
                        positions.push(item[0],item[1],-Number(val.depth));
                    })
                    TF.earthExecute.addTunelLine(positions,Number(radius)/1000,'#FF8000',1)
                })

            });
            this.sceneMode=2;
            TF.clipModel.topographicExcavation();
        }
        /*展示日常监控*/
        showMonitor(){
            if(this.sceneMode==1){return false;}
            let viewer=Pangu.Data.viewer;
            this.remove3dtiles(this.carFlowSceneData.model);
            Pangu.Data.viewer.entities.removeAll();
            // TF.layerManage.addLayers(['camera','person']);
            viewer.scene.globe.imageryLayers.get(0).alpha =1;//影像透明度调节
            viewer.imageryLayers.get(0).brightness = 1;
            let model=TF.earthExecute.add3dtiles(ConstantData.sourceUrl.model3dtiles,ConstantData.constant.defaultModelHeight);
            this.mainSceneData['model']=model;
            this.sceneMode=1;
            TF.earthExecute.addBuildingVector();//添加贴合模型的矢量面
            TF.layerManage.addLayers(['camera','person','fireHydrant','pm25','waterPressure']);//添加图层
            TF.earthExecute.addEvent();
            // TF.earthData.video3DData.forEach(function (val) {
            //     TF.earthExecute.add3DVideo(val);
            // })
        }
        remove3dtiles(tile){
            Pangu.Data.viewer.scene.primitives.remove(tile);
        }
    }
    TF['sceneController']=new SceneController();
})(TF);