/**
 * Created by Administrator on 2018/3/15/015.
 */
(function () {
    var viewer = Pangu.Data.viewer = new Pangu.Viewer("panguContainer", {
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        terrainExaggeration: 1.0,
        imageryProvider: false,
        selectionIndicator: false,
        timeline: false,
        animation: false,
        vrButton: false,
        fullscreenButton: false,
        // terrainProvider: Pangu.createWorldTerrain()
        //shadows :true
    });
    viewer.clock.shouldAnimate=true;
    // viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer.clock.multiplier=0.6;
    viewer.scene.screenSpaceCameraController.minimumZoomDistance =20;
    // viewer.scene.screenSpaceCameraController.maximumZoomDistance  =4000;//相机最大高度
    // viewer.scene.skyBox = new Pangu.SkyBox({
    //     sources : {
    //         positiveX : './static/image/scene/rightav9.jpg',
    //         negativeX : './static/image/scene/leftav9.jpg',
    //         positiveZ : './static/image/scene/frontav9.jpg',
    //         negativeZ : './static/image/scene/backav9.jpg',
    //         positiveY : './static/image/scene/topav9.jpg',
    //         negativeY : './static/image/scene/bottomav9.jpg'
    //     }
    // });
     Pangu.Map.addTMSMapService(ConstantData.sourceUrl.googleTms);
    // var  urlTemplateImagery1= new Pangu.createTileMapServiceImageryProvider({
    //     url:'http://skyinfor.cc:20080/geoserver/gwc/service/tms/1.0.0/skyinfor%3Askyinfor_SHblue@EPSG%3A4326@png/{z}/{x}/{y}.png',//
    //     tilingScheme: new Pangu.GeographicTilingScheme,
    //     // maximumLevel: 22,
    //     // minimumLevel:14,
    //     // rectangle:new Pangu.Rectangle.fromDegrees(121.52829468, 31.12427752, 121.53931194, 31.13314349)
    // });//正射
    // let imageryProvider=viewer.scene.imageryLayers.addImageryProvider(urlTemplateImagery1);
    let screenEventHandler=new ScreenEventHandler();
//  TF.earthCommon.getPositions();
    TF.clipModel.addBoxMaterial();
    TF.sceneController.showMonitor();
    var coffeeBeltRectangle = Pangu.Rectangle.fromDegrees(121.2171726929661,31.03771820771038,121.28072011525879,31.0795714178229);
    // viewer.scene.globe.cartographicLimitRectangle = coffeeBeltRectangle;
    // viewer.scene.skyAtmosphere.show = false;
    // TF.earthData.billboards.forEach(function (val) {
    //     TF.earthCommon.addBillboardGif(val);
    // });
    viewer.entities.add({
        position: Pangu.Cartesian3.fromDegrees(121.24215433958106,31.06000955882322,52.151359685462495),
        id: 'label',
        label: {
            horizontalOrigin : Pangu.HorizontalOrigin.CENTER,
            verticalOrigin:Pangu.VerticalOrigin.BOTTOM,
            // pixelOffset : new Pangu.Cartesian2(0,-55),
            showBackground:true,
            scaleByDistance: new Pangu.NearFarScalar(4000,0.9, 6000, 0.8),
            scale:1,
            backgroundColor:Pangu.Color.BLACK.withAlpha(0.5),//.withAlpha(0.5)
            fillColor:Pangu.Color.AQUA,//.withAlpha(0.5)
            backgroundPadding:new Pangu.Cartesian2(22,6),
            font:"bold 18px Microsoft YaHei",
            outlineColor:Pangu.Color.BLACK,
            distanceDisplayCondition : new Pangu.DistanceDisplayCondition(0,300.0),
            outlineWidth:2,
            text : '三迪华美达酒店',
            style:Pangu.LabelStyle.FILL_AND_OUTLINE
        }
    });
})();
