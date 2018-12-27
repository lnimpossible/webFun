/**
 * Created by Administrator on 2018/7/2/002.
 */
(function (TF) {
  var geometryController=TF['geometryController']={};
  geometryController['addPolyline']=addPolyline;//添加高亮的线（外围框线）
  geometryController['addModelVector']=addModelVector;//添加贴模型矢量
  geometryController['drawPloygon']=drawPloygon;//框选 绘制面
  geometryController['drawPolyline']=drawPolyline;//线选 绘制线
  geometryController['loadGeoJson']=loadGeoJson;//线选 绘制线
  geometryController['addPoint']=addPoint;//线选 绘制线
  geometryController['addFitModelPolygon']=addFitModelPolygon;//添加贴合模型矢量
  geometryController.selectedEntities=[];//线选、框选收集起来的实体
  function addPolyline (positions) {
      var viewer=Pangu.Data.viewer;
      var polyline=viewer.entities.add({
        polyline: {
          positions:positions,//Pangu.Cartesian3.fromDegreesArrayHeights(val),
          width:10,
          // material:'',
          material : new Pangu.PolylineGlowMaterialProperty({
            glowPower : 0.2,
            color : Pangu.Color.fromCssColorString('#00ff00')
          }),
          distanceDisplayCondition:Number.POSITIVE_INFINITY,
        }
      });
      return polyline;
    }
    function loadGeoJson (options) {
      var geoJson=JSON.parse(options.device_area)
      var viewer=Pangu.Data.viewer;
      var broadcastJson = Pangu.GeoJsonDataSource.load(geoJson);
      broadcastJson.then(function(dataSource) {
        viewer.dataSources.add(dataSource);
        earthData.sceneLayers.broadcast.push(dataSource);
        var entities = dataSource.entities.values;
        var that=this;
        entities.forEach(function(entity,i) {
          // var material=Pangu.Color.fromCssColorString(colors[i%6][1]);
          // var outlineColor=Pangu.Color.fromCssColorString(colors[i%6][0]);
          // debugger;
          // entity.polygon.disableDepthTestDistance=Number.POSITIVE_INFINITY;
          entity.polygon.height=45;
          that.color=entity.polygon.material.color._value;
          entity.options=options;
          entity.click=function () {
            entity.polygon.material.color.setValue(Pangu.Color.fromCssColorString("#00ffff").withAlpha(0.3));
            exposeFromJQ.dealCesiumPick(this.options);
            CSharpControler.hideCameraScreen();
            constantData.state.isOpenCamera=false;
          }

          entity.recovery=function () {
            entity.polygon.material.color.setValue(that.color);
            exposeFromJQ.clearCesiumPick();
            CSharpControler.hideCameraScreen();
            constantData.state.isOpenCamera=false;
          }
          // console.log(entity);
        });
        function recovery() {

        }
      });
    }
    /**
     * options
     * options.cartographic, []   wgs84 制图坐标
     * options.dimensions, []  盒子的长、宽、高
     * options.heading,  int  矢量水平方向  度数
    * */
  function addModelVector(options) {
    var viewer=Pangu.Data.viewer;
    var cartographic=options.cartographic;
    var dimensions=options.dimensions;
    var heading=options.heading||0;
    if(!cartographic||!dimensions){
      throw new Error('缺少参数！')
      return false;
    }
    var center = Pangu.Cartesian3.fromDegrees(cartographic[0],cartographic[1],cartographic[2]);
    var modelMatrix = Pangu.Transforms.eastNorthUpToFixedFrame(center);
    var hprRotation = Pangu.Matrix3.fromHeadingPitchRoll(new Pangu.HeadingPitchRoll(Pangu.Math.toRadians(heading), 0,0));
    var hpr = Pangu.Matrix4.fromRotationTranslation(hprRotation, new Pangu.Cartesian3(0.0, 0.0, 0));
    Pangu.Matrix4.multiply(modelMatrix, hpr, modelMatrix);
    options.click=function (pickedObject,handler) {
      var attributes = pickedObject.primitive.getGeometryInstanceAttributes(this);
      attributes.color = [34,255,255,128];
      exposeFromJQ.toThreeScene();
    }
    options.mouseMove=function (pickedObject,handler) {
      var attributes = pickedObject.primitive.getGeometryInstanceAttributes(this);
      attributes.color = [34,255,255,128];
    }
    options.recovery=function (handler,eventType) {
      if(eventType=='click'){
        var attributes = handler.clickObject.pickedObject.primitive.getGeometryInstanceAttributes(this);
        attributes.color = [255,255,255,4];
        return;
      }
      var attributes = handler.mouseMoveObject.pickedObject.primitive.getGeometryInstanceAttributes(this);
      attributes.color = [255,255,255,4];
      return;

    }
    var buildingHighlight = viewer.scene.primitives.add(new Pangu.ClassificationPrimitive({
      geometryInstances : new Pangu.GeometryInstance({
        geometry : Pangu.BoxGeometry.fromDimensions({
          vertexFormat : Pangu.PerInstanceColorAppearance.VERTEX_FORMAT,
          dimensions : new Pangu.Cartesian3(dimensions[0],dimensions[1],dimensions[2])
        }),
        modelMatrix : modelMatrix,
        attributes : {
          color : Pangu.ColorGeometryInstanceAttribute.fromColor(Pangu.Color.WHITE.withAlpha(0.004))
        },
        id : options,
      })
    }));
    return buildingHighlight;
  };
  function drawPloygon(callback) {
    var that=this;
    var viewer=Pangu.Data.viewer;
    var points=[];
    var pickPositionHeight=0.5;
    var polygonEntity = viewer.entities.add({
      name :'polygon',
      polygon : {
        hierarchy: new Pangu.DynamicProperty([]),
        material : Pangu.Color.fromCssColorString('#dd291b').withAlpha(0.2),
        outline : false,
        outlineColor :Pangu.Color.fromCssColorString('#dd291b'),
        outlineWidth:1,
        classificationType:Pangu.ClassificationType.CESIUM_3D_TILE
        // height:40,
        // distanceDisplayCondition:Number.POSITIVE_INFINITY,
        // perPositionHeight : true
      }
    });
    var polylineEntity=viewer.entities.add({
      polyline: {
        positions:new Pangu.DynamicProperty([]),
        width: 2,
        // material : new Pangu.PolylineDashMaterialProperty({
        //   color: Pangu.Color.RED
        // }),
        material : Pangu.Color.RED,
        // depthFailMaterial: new Pangu.PolylineOutlineMaterialProperty({
        //     color: Pangu.Color.RED
        // })
        zIndex:2
      },
      disableDepthTestDistance:Number.POSITIVE_INFINITY,

    });
    geometryController.selectedEntities.push(polylineEntity,polygonEntity);
    var handler=new Pangu.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.pickPoint=false;                        //地形pick标记
    handler.pickPosition=false;                     //模型pick标记
    handler.setInputAction(leftClick, Pangu.ScreenSpaceEventType.LEFT_CLICK);
    function drawMove(movement){
      var cartesian = viewer.camera.pickEllipsoid(movement.endPosition,viewer.scene.globe.ellipsoid);
      //添加地形或者模型
      if(handler.pickPoint){
        var pickRay= viewer.camera.getPickRay(movement.endPosition);
        cartesian= viewer.scene.globe.pick(pickRay, viewer.scene);
      }
      if(handler.pickPosition){
        cartesian=viewer.scene.pickPosition(movement.endPosition);
        cartesian=Pangu.Common.addHeightCartesian(cartesian,pickPositionHeight);
      }
      points.pop();
      points.push(cartesian);
      polylineEntity.polyline.positions._value=points;
      if(points.length===3){
        polygonEntity.polygon.hierarchy._value=points;
      }
    }
    function leftClick(movement) {
      var cartesian= viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
      if(Pangu.defined(viewer.scene.terrainProvider._availability)){
        var pickRay= viewer.camera.getPickRay(movement.position);
        cartesian = viewer.scene.globe.pick(pickRay, viewer.scene);
        handler.pickPoint=true;
      }
      if((Pangu.defined(viewer.scene.pick(movement.position))&&(Pangu.defined(viewer.scene.pick(movement.position).content)||Pangu.defined(viewer.scene.pick(movement.position).mesh)))||handler.pickPosition){
        cartesian=viewer.scene.pickPosition(movement.position);
        cartesian=Pangu.Common.addHeightCartesian(cartesian,pickPositionHeight);
        handler.pickPosition=true;
      }
      var pointEntity=addPoint(cartesian);
      geometryController.selectedEntities.push(pointEntity);
      if(points.length==0){
        points.push(cartesian);
      }
      points.push(cartesian);
      handler.setInputAction(drawMove,Pangu.ScreenSpaceEventType.MOUSE_MOVE);
      handler.setInputAction(rightClick,Pangu.ScreenSpaceEventType.RIGHT_CLICK);
    }
    function rightClick(movement) {
      var pointEntity=addPoint(points[points.length-1]);
      geometryController.selectedEntities.push(pointEntity);
      points.push(points[0]);
      polylineEntity.polyline.positions._value=points;
      handler.removeInputAction(Pangu.ScreenSpaceEventType.MOUSE_MOVE);
      handler.removeInputAction(Pangu.ScreenSpaceEventType.LEFT_CLICK);
      handler.removeInputAction(Pangu.ScreenSpaceEventType.RIGHT_CLICK);
      handler.destroy();
      var positions=Pangu.Ellipsoid.WGS84.cartesianArrayToCartographicArray(points);
      var wgs84Arr=[];
      var pointsString='';
      positions.forEach(function (val,i) {
        var longitude=Pangu.Math.toDegrees(val.longitude);
        var latitude=Pangu.Math.toDegrees(val.latitude);
        wgs84Arr.push({longitude:longitude,latitude:latitude});
        if(i==positions.length-1){
          pointsString+=longitude+' '+latitude+','+wgs84Arr[0].longitude+' '+wgs84Arr[0].latitude;return;
        }
        pointsString+=longitude+' '+latitude+','
      })
      var result={
        wgs84Arr:wgs84Arr,
        pointsString:pointsString,
        name:'线选',
      }
      callback&&callback(result);
    }
  };
  function addPoint(cartesian,color,scale){
    var viewer=Pangu.Data.viewer;
    var pointEntity=viewer.entities.add({
      position: cartesian,
      point:{
        color:color||Pangu.Color.RED,
        outlineColor:Pangu.Color.DARKORANGE ,
        pixelSize: scale||8,
        distanceDisplayCondition:Number.POSITIVE_INFINITY,
      }
    });
    return pointEntity;
  }
  function drawPolyline(callback) {
    var that=this;
    var viewer=Pangu.Data.viewer;
    var points=[];
    var pickPositionHeight=0.5;
    var polylineEntity=viewer.entities.add({
      polyline: {
        positions:new Pangu.DynamicProperty([]),
        width: 2,
        material : new Pangu.PolylineDashMaterialProperty({
          color: Pangu.Color.RED
        }),
        followSurface:true,
      }
    });
    geometryController.selectedEntities.push(polylineEntity);
    var handler=new Pangu.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.pickPoint=false;                        //地形pick标记
    handler.pickPosition=false;                     //模型pick标记
    handler.setInputAction(leftClick, Pangu.ScreenSpaceEventType.LEFT_CLICK);
    function drawMove(movement){
      var cartesian = viewer.camera.pickEllipsoid(movement.endPosition,viewer.scene.globe.ellipsoid);
      //添加地形或者模型
      if(handler.pickPoint){
        var pickRay= viewer.camera.getPickRay(movement.endPosition);
        cartesian= viewer.scene.globe.pick(pickRay, viewer.scene);
      }
      if(handler.pickPosition){
        cartesian=viewer.scene.pickPosition(movement.endPosition);
        cartesian=Pangu.Common.addHeightCartesian(cartesian,pickPositionHeight);
      }
      points.pop();
      points.push(cartesian);
      polylineEntity.polyline.positions._value=points;
    }
    function leftClick(movement) {
      var cartesian= viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
      if(Pangu.defined(viewer.scene.terrainProvider._availability)){
        var pickRay= viewer.camera.getPickRay(movement.position);
        cartesian = viewer.scene.globe.pick(pickRay, viewer.scene);
        handler.pickPoint=true;
      }
      if((Pangu.defined(viewer.scene.pick(movement.position))&&(Pangu.defined(viewer.scene.pick(movement.position).content)||Pangu.defined(viewer.scene.pick(movement.position).mesh)))||handler.pickPosition){
        cartesian=viewer.scene.pickPosition(movement.position);
        console.log(movement.position);
        cartesian=Pangu.Common.addHeightCartesian(cartesian,pickPositionHeight);
        handler.pickPosition=true;
      }
      var pointEntity=addPoint(cartesian);
      geometryController.selectedEntities.push(pointEntity);
      if(points.length==0){
        points.push(cartesian);
      }
      points.push(cartesian);
      handler.setInputAction(drawMove,Pangu.ScreenSpaceEventType.MOUSE_MOVE);
      handler.setInputAction(rightClick,Pangu.ScreenSpaceEventType.RIGHT_CLICK);
    }
    function rightClick(movement) {
      var pointEntity=addPoint(points[points.length-1]);
      geometryController.selectedEntities.push(pointEntity);
      handler.removeInputAction(Pangu.ScreenSpaceEventType.MOUSE_MOVE);
      handler.removeInputAction(Pangu.ScreenSpaceEventType.LEFT_CLICK);
      handler.removeInputAction(Pangu.ScreenSpaceEventType.RIGHT_CLICK);
      handler.destroy();
      var positions=Pangu.Ellipsoid.WGS84.cartesianArrayToCartographicArray(points);
      var wgs84Arr=[];
      var pointsString='';
      positions.forEach(function (val,i) {
        var longitude=Pangu.Math.toDegrees(val.longitude);
        var latitude=Pangu.Math.toDegrees(val.latitude);
        wgs84Arr.push({longitude:longitude,latitude:latitude});
        if(i==positions.length-1){
          pointsString+=longitude+' '+latitude;return;
        }
        pointsString+=longitude+' '+latitude+','
      })
      var result={
        wgs84Arr:wgs84Arr,
        name:'线选',
        pointsString:pointsString
      }
      callback&&callback(result);
    }
  }
  function addFitModelPolygon(options){
        var viewer=Pangu.Data.viewer;
        var videoElement = document.getElementById("trailer");
        let fitModelEntity=viewer.entities.add({
            id:'building'+options.id,
            name:options.name,
            polygon:{
                hierarchy: options.positions,//Pangu.Cartesian3.fromDegreesArrayHeights(val),
                material:Pangu.Color.fromCssColorString("#ffffff").withAlpha(0.004),
                // material: videoElement,
                // material: './images/FuLinYinJi.png',
                fill:true,
                // extrudedHeight:50,
                classificationType:Pangu.ClassificationType.BOTH
            },
            options:options,
            click:function () {
                // console.log('building');
                this.polygon.material.color.setValue(Pangu.Color.fromCssColorString("#00ffff").withAlpha(0.5));
            	TF.showGeoThingInfo(this.options);
            },
            mouseMove:function () {
                recoveryFitModelPolygon(ConstantData.sceneData.fitModelEntities);
                this.polygon.material.color.setValue(Pangu.Color.fromCssColorString("#00ffff").withAlpha(0.5));
            },
            recovery:function () {
                this.polygon.material.color.setValue(Pangu.Color.fromCssColorString("#ffffff").withAlpha(0.004));
            }
        });
        return fitModelEntity;
    }
    function recoveryFitModelPolygon(entities) {
        entities&&entities.forEach((entity)=>{
            entity.polygon.material.color.setValue(Pangu.Color.fromCssColorString("#ffffff").withAlpha(0.004));
        })
    }

})(TF);