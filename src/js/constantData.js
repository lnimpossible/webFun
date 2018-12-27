/*
 * 请求配置
 */
var TF={},//对外开放全局对象
    ConstantData={},//常量、资源配置对象
	ControlVar={};// 控制变量
	Crumb = [];   // 弹出框的面包屑
ConstantData.sourceUrl={
    model3dtiles:SOURCE_IP+"3dmodels/3dtiles/shangwuquProject/0901/shangwuqu0901_pangu.json",//倾斜摄影地址
    // model3dtiles:SOURCE_IP+"3dmodels/3dtiles/tianchengProject/dayi_pangu/Scene/dayi_pangu.json",//倾斜摄影地址
    box3dtiles:SOURCE_IP+"3dmodels/3dtiles/shangwuquProject/baimo/tileset.json",//倾斜摄影地址
    googleTms:SOURCE_IP+"domTMS/googleSatGeoTMS",
    blueMercatorTMS:SOURCE_IP+"domTMS/arcgisBlueMercatorTMS"
}
ControlVar.moduleName = 'monitor';
ConstantData.imageUrl= {
    camera: 'static/image/scene/camera.png',
    camera_p: 'static/image/scene/camera_p.png',
    fireHydrant: 'static/image/scene/fireHydrant.png',
    fireHydrant_p: 'static/image/scene/fireHydrant_p.png',
    broadcast: 'static/image/scene/icon_broadcast.png',
    person: 'static/image/scene/person.png',
    person_p: 'static/image/scene/person_p.png',
    pm25: 'static/image/scene/pm25.png',
    pm25_p: 'static/image/scene/pm25_p.png',
    waterPressure: 'static/image/scene/waterPressure.png',
    waterPressure_p: 'static/image/scene/waterPressure_p.png',
    boxMaterial: 'static/image/scene/boxMaterial.jpg',
    groundMaterial: 'static/image/scene/ground.jpg',
    pulseLink:'static/image/scene/LinkPulse.png',
    pulseLink1:'static/image/scene/LinkPulse1.png',
    locationIcon:'static/image/scene/icon_location.png'//定位图标
}
ConstantData.sceneData={
    mainScene:{},
    carFlowScene:{},
    fitModelEntities:[], //贴合模型矢量面
    dynamicCircleEntities:[]//动态圆形底部
}
ConstantData.constant={
    defaultModelHeight:-15,
    defaultSceneHeight:12,
    // defaultModelHeight:-195,
}
