
/**
 * 获取当前相机的视角参数
 **/
(function (TF) {
    var earthCommon={}
    earthCommon.getCameraView=function () {
        let viewer = Pangu.Data.viewer;
        let positionCartographic = viewer.camera.positionCartographic;
        let longitude = Pangu.Math.toDegrees(positionCartographic.longitude);
        let latitude = Pangu.Math.toDegrees(positionCartographic.latitude);
        let height = positionCartographic.height;
        let heading = Pangu.Math.toDegrees(viewer.camera.heading);
        let pitch = Pangu.Math.toDegrees(viewer.camera.pitch);
        let roll = Pangu.Math.toDegrees(viewer.camera.roll);
        let param = {
            longitude: longitude, latitude: latitude, height: height,
            heading: heading, pitch: pitch, roll: roll
        };
        // console.log(param);
        return param;
    };
    /**
     * 通过在场景中连续点击获取点击的坐标数组
     * 右键结束 打开页面得到坐标数组数据
     **/
    earthCommon.getPositions=function(){
        let viewer = Pangu.Data.viewer;
        let handler = new Pangu.ScreenSpaceEventHandler(viewer.scene.canvas);
        let pointPosition = null;
        handler.setInputAction(getPosition, Pangu.ScreenSpaceEventType.LEFT_CLICK);
        let cartographicArr = [];
        let cartesianArr = [];
        let positions = [];
        let heightPositions = [];
        let heatmapPositions = [];
        function getPosition(movement) {
            let cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
            if (Pangu.defined(viewer.scene.terrainProvider._availability)) {
                let pickRay = viewer.camera.getPickRay(movement.position);
                cartesian = viewer.scene.globe.pick(pickRay, viewer.scene);
                pointPosition = viewer.scene.pickPosition(movement.position);
            }
            if ((Pangu.defined(viewer.scene.pick(movement.position)) && (Pangu.defined(viewer.scene.pick(movement.position).content) || Pangu.defined(viewer.scene.pick(movement.position).mesh))) || handler.pickPosition) {
                cartesian = viewer.scene.pickPosition(movement.position);
            }
            if (cartesian) {
                let cartographic = Pangu.Cartographic.fromCartesian(cartesian);
                var entity = viewer.entities.add({
                    position: cartesian,
                    point: {
                        color: Pangu.Color.WHITE,
                        outlineColor: Pangu.Color.DARKORANGE,
                        outlineWidth: 2,
                        pixelSize: 5
                    }
                });
                //let cartographic1 = Cartographic.fromCartesian(pointPosition);
                //console.log(CesiumMath.toDegrees(cartographic.longitude)+","+CesiumMath.toDegrees(cartographic.latitude)+","+cartographic.height);
                //console.log(CesiumMath.toDegrees(cartographic1.longitude)+","+CesiumMath.toDegrees(cartographic1.latitude)+","+cartographic1.height);
                let lon = Pangu.Math.toDegrees(cartographic.longitude);
                let lat = Pangu.Math.toDegrees(cartographic.latitude);
                let height = cartographic.height;
                cartographicArr.push({ longitude: lon, latitude: lat, height: height });
                cartesianArr.push(cartesian);
                positions.push(lon);
                positions.push(lat);
                heightPositions.push(lon);
                heightPositions.push(lat);
                heightPositions.push(height);
                heatmapPositions.push({ x: lon, y: lat, value: 1 });
                console.log("经纬度坐标");
                console.log("{longitude:" + lon + ",latitude:" + lat + ",height:" + cartographic.height + "}");
            }
        }
        handler.setInputAction(function() {
            //handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
            let OpenWindow = window.open("", "NewWindow", "height=500, width=800,toolbar=no,menubar=no");
            OpenWindow.document.write("<title>导出</title>");
            OpenWindow.document.write("<body BGCOLOR=#ffffff>");
            OpenWindow.document.write("<h1></h1>");
            OpenWindow.document.write("<div></div>");
            OpenWindow.document.write(
                "<div>" + JSON.stringify(cartographicArr) + "</div>" +
                "<div>" + JSON.stringify(cartesianArr) + "</div>" +
                "<div>" + JSON.stringify(positions) + "</div>" +
                "<div>" + JSON.stringify(heatmapPositions) + "</div>" +
                "<div>" + JSON.stringify(heightPositions) + "</div>");
            OpenWindow.document.write("</body>");
            OpenWindow.document.write("</HTML>");
            OpenWindow.document.close();
            cartographicArr = [];
            cartesianArr = [];
            positions = [];
            heightPositions = [];
        }, Pangu.ScreenSpaceEventType.RIGHT_CLICK);
        return handler;
    };
    /*移除场景中的entity分类数组*/
    earthCommon.removeEntities=function (entities) {
        entities.forEach(function (val) {
            Pangu.Data.viewer.entities.remove(val);
        })
    };
    /*移除场景中的entity分类数组*/
    earthCommon.removeEntities=function (entities) {
        entities.forEach(function (val) {
            Pangu.Data.viewer.entities.remove(val);
        })
    };
    earthCommon.toggleShowEntities=function (entities,isShow=true) {
        entities.forEach(function (val) {
            val&&(val.show=isShow);
        })
    }
    /*笛卡尔坐标转为wgs84*/
    earthCommon.cartesianToWgs84=function (cartesian) {
        var cartographic=Pangu.Cartographic.fromCartesian(cartesian);
        let longitude = Pangu.Math.toDegrees(cartographic.longitude);
        let latitude = Pangu.Math.toDegrees(cartographic.latitude);
        let height = cartographic.height;
        return {longitude:longitude,latitude:latitude,height:height}
    };
    /*设置笛卡尔坐标的高度*/
    earthCommon.setCartesianHeight=function (cartesian,height) {
        var cartographic = Pangu.Cartographic.fromCartesian(cartesian);
        var lon = Pangu.Math.toDegrees(cartographic.longitude);
        var lat = Pangu.Math.toDegrees(cartographic.latitude);
        var Cartesian3 = Pangu.Cartesian3.fromDegrees(lon, lat, height);
        return Cartesian3;
    },
    /*设置笛卡尔坐标的高度*/
    earthCommon.addCartesiansHeight=function (cartesians,height) {
        let cartesian3Arr=[];
        cartesians.map(function (cartesian) {
            var cartographic = Pangu.Cartographic.fromCartesian(cartesian);
            var lon = Pangu.Math.toDegrees(cartographic.longitude);
            var lat = Pangu.Math.toDegrees(cartographic.latitude);
            var cartesian3 = Pangu.Cartesian3.fromDegrees(lon, lat, cartographic.height+height);
            cartesian3Arr.push(cartesian3);
        })
        return cartesian3Arr;
    },
    /*给笛卡尔坐标添加高度*/
    earthCommon.addCartesianHeight=function (p,h){
        var x1,y1,z1;
        y1=Math.sqrt((Math.sqrt(p.x*p.x+p.y*p.y+p.z*p.z)+h)*(Math.sqrt(p.x*p.x+p.y*p.y+p.z*p.z)+h)/(p.x*p.x/(p.y*p.y)+1+p.z*p.z/(p.y*p.y)));
        if(p.y<0){
            y1=-y1;
        }
        x1=p.x/p.y*y1;
        z1=p.z/p.y*y1;
        return {x:x1,y:y1,z:z1};
    };
    /**一个点位置进行偏移或者绕某个轴旋转得到新的点坐标
     *建立一个以原位置点为原点的eastNorthUp坐标系
     *originPosition  原位置点
     *offset  偏移值 x y z 轴偏移值
     *rotationAxis 旋转轴  rotationDegree 旋转角度
     */
    earthCommon.coordinateSystemTransform=function(originPosition,offset,rotationAxis,rotationDegree){
        var rotate = Pangu.Math.toRadians(-rotationDegree);//转成弧度
        rotationAxis="UNIT_"+rotationAxis.toUpperCase();//旋转轴常量
        var quaternion = Pangu.Quaternion.fromAxisAngle(Pangu.Cartesian3[rotationAxis], rotate); //quaternion为围绕这个z轴旋转d度的四元数
        var rotateMatrix3= Pangu.Matrix3.fromQuaternion(quaternion);//rotateMatrix3为根据四元数求得的旋转矩阵
        var pointCartesian3= new Pangu.Cartesian3(offset.x,offset.y,offset.z);//point的局部坐标
        var rotateTranslationMatrix4= Pangu.Matrix4.fromRotationTranslation(rotateMatrix3, Pangu.Cartesian3.ZERO);//rotateTranslationMatrix4为旋转加平移的4x4变换矩阵，这里平移为(0,0,0)，故填个Cesium.Cartesian3.ZERO
        Pangu.Matrix4.multiplyByTranslation(rotateTranslationMatrix4,pointCartesian3,rotateTranslationMatrix4);//rotateTranslationMatrix4 = rotateTranslationMatrix4  X  pointCartesian3
        // var originPositionCartesian3 = Ellipsoid.WGS84.cartographicToCartesian(Cartographic.fromDegrees(originPosition.longitude,originPosition.latitude,originPosition.height)); //得到局部坐标原点的全局坐标
        var originPositionTransform= Pangu.Transforms.eastNorthUpToFixedFrame(originPosition);//m1为局部坐标的z轴垂直于地表，局部坐标的y轴指向正北的4x4变换矩阵
        Pangu.Matrix4.multiplyTransformation(originPositionTransform,rotateTranslationMatrix4,rotateTranslationMatrix4);//rotateTranslationMatrix4 = rotateTranslationMatrix4 X originPositionTransform
        var pointCartesian=new Pangu.Cartesian3();
        Pangu.Matrix4.getTranslation(rotateTranslationMatrix4,pointCartesian);//根据最终变换矩阵m得到p2
        return pointCartesian;
    }
    earthCommon.showHtmlBillboard = function (position,domId,offsetTop=0,offsetLeft=0) {
        var viewer=Pangu.Data.viewer;
        var htmlOverlay = document.getElementById(domId);
        var top=htmlOverlay.offsetHeight/2;
        var left=htmlOverlay.offsetWidth/2;
        var scratch = new Pangu.Cartesian2();
        viewer.scene.preRender.addEventListener(function() {
            // let clampPosition=viewer.scene.clampToHeight(position);
            var cameraHeight = Pangu.Data.viewer.camera.positionCartographic.height;
            // var cartesian = Pangu.Cartesian3.fromDegrees(position.longitude, position.latitude,position.height+30);
            var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position, scratch);
            if (Pangu.defined(canvasPosition)) {
                htmlOverlay.style.top = (canvasPosition.y-top+offsetTop)+ 'px';
                htmlOverlay.style.left = (canvasPosition.x-left+offsetLeft)+ 'px';
            }
        });
    }
    earthCommon.getMidPosition=function(cartesians){
        if(cartesians.length>0){
            var cartographic1=Pangu.Cartographic.fromCartesian(cartesians[0])
            var maxLongitude=Pangu.Math.toDegrees(cartographic1.longitude);
            var minLongitude=maxLongitude;
            var maxLatitude=Pangu.Math.toDegrees(cartographic1.latitude);
            var minLatitude=maxLatitude;
            cartesians.forEach(function(val,i,arr) {
                var cartographic=Pangu.Cartographic.fromCartesian(val);
                var lon=Pangu.Math.toDegrees(cartographic.longitude);
                var lat=Pangu.Math.toDegrees(cartographic.latitude);
                maxLongitude=lon>maxLongitude?lon:maxLongitude;
                minLongitude=lon>minLongitude?minLongitude:lon;
                maxLatitude=lat>maxLatitude?lat:maxLatitude;
                minLatitude=lat>minLatitude?minLatitude:lat;
            });
            return  {longitude:(maxLongitude+minLongitude)/2,latitude:(maxLatitude+minLatitude)/2};
        }
    }
    earthCommon.catmullRomSpline=function(point1,point2,insertPoint){
        var startTime=0;
        var endTime=3;
        var spline = new Pangu.CatmullRomSpline({
            times : [ 0.0,1.5,3.0],
            points : [
                point1,
                insertPoint,
                point2
            ]
        });
        var positions = [];
        for (var i = startTime;i<=endTime; i += 0.005) {
            positions.push(spline.evaluate(i));
        }
        return positions;
    }
    /*创建收集器canvas图标*/
    earthCommon.createCanvasCluster=function(text,fillColor,outlineColor,interFillColor,fontColor){
        fillColor=fillColor?fillColor:"#05FDFE";//填充色
        outlineColor=outlineColor?outlineColor:"#65ABAF";//圆边框颜色
        interFillColor=interFillColor?interFillColor:'rgba(101,171,175,0.5)';//内部圆填充色
        fontColor=fontColor?fontColor:'#ffffff';//字体颜色
        text=text?text:10;//字体颜色
        var canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 130;
        var context = canvas.getContext('2d');
        context.fillStyle = 'transparent';//矩形颜色透明
        context.fillRect(0, 0, 100, 130);
        context.beginPath();
        context.arc(50,50,50,Math.PI,2*Math.PI,false);
        context.moveTo(0,50);
        context.bezierCurveTo(1,60,3.8,70,10,80);
        context.bezierCurveTo(10,80,16.5,90,23.5,100);
        context.bezierCurveTo(23.5,100,31.5,110,40,120);
        context.bezierCurveTo(40,120,45,126,50,128);
        context.bezierCurveTo(50,128,55,126,60,120);
        context.bezierCurveTo(60,120,68.5,110,76.5,100);
        context.bezierCurveTo(76.5,100,83.5,90,90,80);
        context.bezierCurveTo(90,80,94.5,70,98.5,60);
        context.bezierCurveTo(98.5,60,99.7,55,100,50);
        context.strokeStyle = fillColor;
        context.fillStyle = fillColor;
        context.stroke();
        context.fill();
        context.beginPath();
        context.arc(50,50,40,0,2*Math.PI, false);
        context.strokeStyle = outlineColor;
        context.stroke();
        context.fillStyle =interFillColor;
        context.fill();
        context.font = "bold 40px SourceHanSansCN-Light";
        context.textAlign = "center";
        // ctx.textAlign = "left";
        context.fillStyle = fontColor;//字体颜色
        context.fillText(text, 50, 65);
        return canvas;
    }
    /*创建标注canvas图标*/
    earthCommon.createCanvasLabel=function (text,outlineColor,fontColor,fillColor) {
        fillColor=fillColor?fillColor:"rgba(23, 25, 103, 0.8)";//填充色
        outlineColor=outlineColor?outlineColor:"#05FDFE";//椭圆边框颜色 #05FDFE
        fontColor=fontColor?fontColor:'#05FDFE';//字体颜色
        CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
            var min_size = Math.min(w, h);
            if (r > min_size / 2) r = min_size / 2;
            this.beginPath();// 开始绘制
            this.moveTo(x + r, y);
            this.arcTo(x + w, y, x + w, y + h, r);
            this.arcTo(x + w, y + h, x, y + h, r);
            this.arcTo(x, y + h, x, y, r);
            this.arcTo(x, y, x + w, y, r);
            this.closePath();
            return this;
        }

        var canvas = document.createElement("canvas");
        canvas.width = 260;
        canvas.height = 70;
        var context = canvas.getContext('2d');
        context.fillStyle = 'transparent';//矩形颜色透明
        context.fillRect(0, 0, 260, 70);
        context.font = "14px SourceHanSansCN-Light";
        var textWidth=context.measureText(text).width;
        context.fillText("width:" + textWidth, 10, 50);
        context.fillStyle=fillColor;//填充色
        var gradient=context.createLinearGradient(0,0,170,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
        // 用渐变进行填充
        context.strokeStyle=outlineColor;//椭圆边框颜色
        context.lineWidth=1.5;//边框线宽
        context.roundRect(15, 25, textWidth+ 20, 22, 10);
        context.fill();
        context.stroke();
        context.beginPath();
        context.textAlign = "center";
        context.textAlign = "left";
        context.fillStyle = fontColor;//字体颜色
        context.fillText(text, 25, 41);
        context.stroke();
        return canvas;
    }
    /*添加Billboard收集器*/
    earthCommon.addBillboardCluster=function (options) {
        var that=this;
        var viewer = Pangu.Data.viewer;
        var position = Pangu.Cartesian3.fromDegrees(Number(options.longitude), Number(options.latitude), Number(options.height));
        var initColor=options.type==='license'?'#fab91f':null;
        var billboard = viewer.entities.add({
            position:position,
            id: "billboardCluster" +options.type+options.id,
            name: options.name,
            billboard: {
                horizontalOrigin: Pangu.HorizontalOrigin.LEFT,
                image:this.createCanvasCluster(options.name,initColor,initColor), //this.createCanvasLabel(options.name),
                verticalOrigin: Pangu.VerticalOrigin.BOTTOM,
                scaleByDistance: new Pangu.NearFarScalar(1000, 0.8, 2600, 0.6),
                distanceDisplayCondition: new Pangu.DistanceDisplayCondition(0, 3800),
                // eyeOffset:this.eyeOffset,
                pixelOffset: new Pangu.Cartesian2(-10,13),
                width: 100,//260,
                height: 130,//70
                scale: 0.42,
                disableDepthTestDistance:Number.POSITIVE_INFINITY
            },
            options: options,
            click:click,
            recovery: recovery
        });
        function click() {
            // console.log(this.options);
            if(this.options.type==='license'){return};
            this.billboard.image=that.createCanvasCluster(this.name,'#fab91f','#fab91f');
            $.showInfo(this.options)
        }
        function recovery() {
            if(this.options.type==='license'){return};
            this.billboard.image=that.createCanvasCluster(this.name,'#05FDFE','#05FDFE');
        }
        return billboard;
    }
    /*添加canvasBillboard*/
    earthCommon.addBillboardCanvas=function(options) {
        var that=this;
        var viewer = Pangu.Data.viewer;
        var position = Pangu.Cartesian3.fromDegrees(Number(options.longitude), Number(options.latitude), Number(options.height));
        var initColor=options.type==='license'?'#fab91f':null;
        var billboard = viewer.entities.add({
            position:position,
            id: "billboardCanvas" +options.type+options.id,
            name: options.name,
            billboard: {
                horizontalOrigin: Pangu.HorizontalOrigin.LEFT,
                image: this.createCanvasLabel(options.name,initColor,initColor),
                verticalOrigin: Pangu.VerticalOrigin.BOTTOM,
                // scaleByDistance: new Pangu.NearFarScalar(5000, 0.8, 10000, 0.8),
                distanceDisplayCondition: new Pangu.DistanceDisplayCondition(0, 500),
                // eyeOffset:this.eyeOffset,
                pixelOffset: new Pangu.Cartesian2(-10,11),
                width: 260,
                height: 70,
                scale: 1,
                disableDepthTestDistance:Number.POSITIVE_INFINITY
            },
            options: options,
            click:click,
            recovery: recovery
        });
        function click() {
            // console.log(this.options);
            if(this.options.type==='license'){return};
            this.billboard.image=that.createCanvasLabel(this.name,'#fab91f','#fab91f');
            var linkEntity = Pangu.Data.viewer.entities.getById("billboard" +this.options.type+this.options.id);
            linkEntity.billboard.image=data.images[this.options.type+1];
        }
        function recovery() {
            if(this.options.type==='license'){return};
            this.billboard.image=that.createCanvasLabel(this.name,'#05FDFE','#05FDFE');
            var linkEntity = Pangu.Data.viewer.entities.getById("billboard" +this.options.type+this.options.id);
            linkEntity.billboard.image=data.images[this.options.type];
        }
        return billboard;
    };
    /**
     添加image Billboard收集器
     options   longitude  latitude  billboardType  id    ---必须
     height  name   ---非必须
     * */
    earthCommon.addBillboardImage=function(options) {
        var viewer = Pangu.Data.viewer;
        options.height=options.height||0;
        var position = Pangu.Cartesian3.fromDegrees(Number(options.longitude), Number(options.latitude), Number(options.height));
        // position=viewer.scene.clampToHeight(position);
        // var image=options.status=='offline'?earthData.imageUrl[options.billboardType+2]:earthData.imageUrl[options.billboardType];
        var billboard = viewer.entities.add({
            position:position,
            id:options.theone,
            billboard: {
                horizontalOrigin: Pangu.HorizontalOrigin.CENTER,
                image: ConstantData.imageUrl[options.billboardType],
                verticalOrigin: Pangu.VerticalOrigin.BOTTOM,
                scaleByDistance: new Pangu.NearFarScalar(800, 0.6, 1800, 0.4),
                // translucencyByDistance:new Pangu.NearFarScalar(1800, 0.9, 2200, 0.7),
                distanceDisplayCondition: new Pangu.DistanceDisplayCondition(0, 3800),
                // eyeOffset:this.eyeOffset,
                // width: 89,
                // height: 190,
                pixelOffset: new Pangu.Cartesian2(0,0),
                scale:1,
                disableDepthTestDistance:Number.POSITIVE_INFINITY
            },
            options: options,
            click:click,
            recovery: recovery,
        });
        function click() {
            this.billboard.scale=1.1;
            this.billboard.image=ConstantData.imageUrl[this.options.billboardType+'_p']
            // var linkEntity = Pangu.Data.viewer.entities.getById("billboard"+this.options.type+this.options.id);
            // linkEntity.billboard.image=common.createCanvasLabel(this.name,'#fab91f','#fab91f');
            TF.showGeoThingInfo(this.options);
            console.log(this.options);
        }
        function recovery() {
            this.billboard.scale=1;
            this.billboard.image=ConstantData.imageUrl[this.options.billboardType]
            // var linkEntity = Pangu.Data.viewer.entities.getById("billboardCanvas"+this.options.type+this.options.id);
            // linkEntity&&(linkEntity.billboard.image=common.createCanvasLabel(this.name,'#05FDFE','#05FDFE'));
        }
        // TF.earthExecute.addHtmlBillboard(billboard);
        return billboard;
    };
    earthCommon.addBillboardGif=function(options) {
        var viewer = Pangu.Data.viewer;
        options.height=options.height||0;
        var position = Pangu.Cartesian3.fromDegrees(Number(options.longitude), Number(options.latitude), Number(options.height));
        var name=options.name?options.name:'billboardImage';
        var animator= Pangu.BillboardAnimator.fromGif({url: 'static/image/scene/test.gif',frameRate:10});
        let promise=new Promise(function (resolve) {
            animator.then(function(result) {
              let billboard=viewer.entities.add({
                    id:options.id,
                    name:name,
                    position:position,
                    billboard: {
                        verticalOrigin: Pangu.VerticalOrigin.BOTTOM,
                        horizontalOrigin: Pangu.HorizontalOrigin.RIGHT,
                        scaleByDistance: new Pangu.NearFarScalar(1000, 0.8, 2600, 0.6),
                        distanceDisplayCondition: new Pangu.DistanceDisplayCondition(0, 3800),
                        image : result.image,
                        imageSubRegion:result.imageSubRegion,
                        pixelOffset: new Pangu.Cartesian2(0,0),
                        scale:1,
                        // disableDepthTestDistance:Number.POSITIVE_INFINITY,
                        width: 100,//260,
                        height: 100//70
                    },
                    options: options,
                    click:click,
                    recovery: recovery,
                });
                resolve(billboard);
            });
        })

        function click() {
        }
        function recovery() {
        }
        return promise;
    };
    earthCommon.clone=function(from, to) {
        if (from ===null || typeof from !== "object") {return from;}
        if (from.constructor !==Object && from.constructor !== Array) {return from;}
        if (from.constructor ===Date || from.constructor ===RegExp || from.constructor === Function ||
            from.constructor ===String || from.constructor ===Number || from.constructor ===Boolean)
        {return new from.constructor(from);}
        to = to || new from.constructor();
        for (var name in from) {
            if (from.hasOwnProperty(name)) {
                to[name] = typeof to[name] ==="undefined" ? this.clone(from[name], null) : to[name];
            }
        }
        return to;
    };
    earthCommon.playHls=function(videoDom, hlsAdress) {
        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(hlsAdress);
            hls.attachMedia(videoDom);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                videoDom.play();
            });
        }
        else if (videoDom.canPlayType('application/vnd.apple.mpegurl')) {
            videoDom.src = hlsAdress;
            videoDom.addEventListener('canplay', function () {
                videoDom.play();
            });
        }
    };
    earthCommon.addLabel=function(options){
        var viewer=Pangu.Data.viewer;
        var position = Pangu.Cartesian3.fromDegrees(Number(options.longitude), Number(options.latitude), Number(options.height));
        var billboard = viewer.entities.add({
            position:position,
            id:options.id,
            name: options.name,
            billboard: {
                horizontalOrigin: Pangu.HorizontalOrigin.LEFT,
                image: earthData.imageUrl.led,
                verticalOrigin: Pangu.VerticalOrigin.BOTTOM,
                // scaleByDistance: new Pangu.NearFarScalar(5000, 0.8, 10000, 0.8),
                distanceDisplayCondition: new Pangu.DistanceDisplayCondition(0, 5000),
                // eyeOffset:this.eyeOffset,
                pixelOffset: new Pangu.Cartesian2(0,0),
                width: 42,
                height: 100,
                scale: 1,
                // disableDepthTestDistance:Number.POSITIVE_INFINITY
            },
            label: {
                text: '广富林景区',
                fillColor: Pangu.Color.WHITE,
                verticalOrigin: Pangu.VerticalOrigin.BOTTOM,
                showBackground:true,
                backgroundColor:new Pangu.Color(20,15,86,0.5),
                pixelOffset: new Pangu.Cartesian2(0.0,-110.0)
            },
            options: options,
            click:click,
            recovery: recovery
        });
        function click() {
        }
        function recovery() {
        }
        return billboard;
    };
    TF['earthCommon']=earthCommon;
})(TF)


