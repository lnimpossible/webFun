/**
 * Created by Administrator on 2018/3/16/016.
 */
(function (TF) {
    var earthExecute={
        sceneEvent:[],
        personRouteEntities:[]
    }
    /*添加倾斜摄影模型*/
    earthExecute.add3dtiles=function (url,height) {
        var viewer=Pangu.Data.viewer;
        var tile=new Pangu.Cesium3DTileset({
            url:url,
            maximumScreenSpaceError:1,
            maximumMemoryUsage:1024,
            baseScreenSpaceError:1536
        });
        this.sceneModel=viewer.scene.primitives.add(tile);
        this.sceneModel.readyPromise.then(function(tileset) {
            var boundingSphere = tileset.boundingSphere;
            var modelMatrix=Pangu.Common.adjustModelMatrixHeight(boundingSphere.center,height);
            tileset.modelMatrix=modelMatrix;
            tileset._root.transform = modelMatrix;
            // execute.setWaterAppearance();
            // tileset.allTilesLoaded.addEventListener(function() {
            //   setTimeout(function() {
            //     execute.setWaterAppearance();
            //   }, 2000);
            // });
            viewer.camera.setView({
              destination:Pangu.Common.addHeightCartesian(boundingSphere.center,2000)
            });
        });
        return tile;
    }
    /*添加白膜3dtiles*/
    earthExecute.addBox3dtiles=function (url) {
        var viewer=Pangu.Data.viewer;
        var tile=new Pangu.Cesium3DTileset({
            url:url,
            maximumScreenSpaceError:1,
            maximumMemoryUsage:1024,
            baseScreenSpaceError:1536
        });
        tile.style = new Pangu.Cesium3DTileStyle({
            // color: {
            //     conditions: [
            //         ['${Number(floor)} >= 5', 'rgba(45, 0, 75, 0.5)'],
            //         ['${Number(floor)} >= 20', 'rgb(102, 71, 151)'],
            //         ['${Number(floor)} >= 30', 'rgb(170, 0, 0)'],
            //
            //     ]
            // }
            // color:new Pangu.CallbackProperty(function(time, result) {
            //     console.log(time);
            //     console.log(result);
            //     return 'rgba(0, 255, 255, 0.8)';
            // }, false)
        });
        //console.log(tile.style);
        tile.style.color='rgba(0, 255, 255, 0.8)';
        var flag=true;

        this.sceneModel=viewer.scene.primitives.add(tile);
        this.sceneModel.readyPromise.then(function(tileset) {
            var boundingSphere = tileset.boundingSphere;
            setInterval(function () {
                if(flag){
                    tileset.style.color='rgba(0, 255, 0, 0.6)';
                    flag=false;
                }else{
                    tileset.style.color='rgba(0, 255, 255, 0.8)';
                    flag=true;
                }
            },3000);
            viewer.camera.setView({
                destination:Pangu.Common.addHeightCartesian(boundingSphere.center,1000)
            });
        });
        return tile;
    }
    /*添加点闪烁效果*/
    earthExecute.setTwinkleEffect=function (positions,color) {
        var viewer=Pangu.Data.viewer;
        let duration=50,
            start=0,
            range=50;
        // position=Pangu.Cartesian3.fromDegrees(position.longitude,position.latitude,position.height);
       // var positions=[{"x":-2836327.1169667444,"y":4675480.649980658,"z":3271662.0028073117},{"x":-2836311.997835875,"y":4675477.146630618,"z":3271657.295977164},{"x":-2836327.7527189516,"y":4675477.257608173,"z":3271664.0510830088},{"x":-2836311.9658128354,"y":4675477.120372727,"z":3271657.3608267456},{"x":-2836311.9658128354,"y":4675477.120372727,"z":3271657.3608267456},{"x":-2836261.078622789,"y":4675513.456788382,"z":3271649.600536691},{"x":-2836243.3019878324,"y":4675519.708376386,"z":3271656.0339103653},{"x":-2836567.659310273,"y":4675340.179465477,"z":3271631.5525635732},{"x":-2836352.1055064932,"y":4675423.59181201,"z":3271717.7821380445},{"x":-2834867.354054968,"y":4677730.343742878,"z":3269701.196098097},{"x":-2834759.9132254873,"y":4677585.073204339,"z":3270000.143278911},{"x":-2834675.2002028967,"y":4677456.947275705,"z":3270255.1270950036},{"x":-2834605.4687056034,"y":4677344.412171851,"z":3270475.037869262},{"x":-2834466.1509349975,"y":4677096.513770642,"z":3270947.0976337725},{"x":-2834395.823096226,"y":4676955.169393294,"z":3271208.372621359},{"x":-2834215.253706335,"y":4677039.908258175,"z":3271243.433602701},{"x":-2834044.372727811,"y":4677134.666396246,"z":3271255.9155629217},{"x":-2833868.5110085867,"y":4677250.8679454345,"z":3271242.217250267},{"x":-2833718.553462329,"y":4677345.215473811,"z":3271237.2547951983},{"x":-2833649.9763104175,"y":4677388.867694659,"z":3271234.263413936},{"x":-2833504.314464635,"y":4677485.342922359,"z":3271222.5690566846},{"x":-2833432.1370819174,"y":4677529.246286891,"z":3271222.3121729163},{"x":-2833555.629767362,"y":4677603.531767593,"z":3271010.5427506603},{"x":-2833616.3826261796,"y":4677664.437904915,"z":3270871.7492307583}];
        positions.map(function (val,i) {
            let billboard = viewer.entities.add({
                position : val,
                billboard :{
                    image : 'static/image/scene/c2.png',
                    width:7,
                    height:7,
                    color :Pangu.Color.fromCssColorString(color)//new Pangu.Color(255/255, 255/255, 0/255, 1)
                }
            });
            var isAvailable = function(currentTime){
                var nMS = Pangu.JulianDate.toDate(currentTime).getTime()/duration;
                var time = (nMS%range + start);
                var trails = trails || 10;
                if (time && i> time - trails && i < time) {
                    billboard.billboard.color._value.alpha = 0.8*(i- time + trails)/trails;
                    return true;
                } else {
                    return false;
                }
            }
            billboard.isAvailable = isAvailable;
        });
        // viewer.entities.add({
        //     polyline : {
        //         positions :positions, //Cesium.Cartesian3.fromDegreesArrayHeights(lineResult[i].geometry.coordinates),
        //         width : 1.5,
        //         material : new Pangu.PolylineOutlineMaterialProperty({
        //             color : new Pangu.Color(32/255,228/255,243/255,0.8),
        //             outlineWidth : 2,
        //             outlineColor : new Pangu.Color(65/255,105/255,225/255, 1)
        //         }),
        //         depthFailMaterial: new Pangu.PolylineOutlineMaterialProperty({
        //             color : new Pangu.Color(32/255,228/255,243/255,0.8),
        //             outlineWidth : 2,
        //             outlineColor : new Pangu.Color(65/255,105/255,225/255, 1)
        //         })
        //     }
        // });


    }
    /*添加移动车辆*/
    earthExecute.addRunningTrack=function (options) {
        let entity={
            // billboard:{
            //     image:'static/image/scene/c2.png',
            //     width:10,
            //     height:10
            // }
            model : {
                uri : options.model,
                minimumPixelSize : 28,
                scale : 1.0
            },
            orientation:new Pangu.HeadingPitchRoll.fromDegrees(-90, 0, 0)
        }
        Pangu.entityMoveByPath.roam({
            paths:options.positions,   //路线点数组  必须
            entity:entity,
            isTracked:false,
            loop:true,
            startTime:new Date(2015, 2, 25, 16),
            speed:5000, //50 速度 km/h   必须

        })
    }
    /*显示交通情况*/
    earthExecute.showTrafficSituation=function (options) {
        let viewer=Pangu.Data.viewer;
        let colorMap={
            1:new Pangu.Color(0, 201 / 255,0, 1),
            2:new Pangu.Color(222/ 255, 201 / 255, 1/255, 1),
            3:new Pangu.Color(255 / 255, 0, 0, 1)
        }
        viewer.entities.add({
            polyline: {
                positions: options.positions,
                width: 10,
                material: new Pangu.PolylinePulseLinkMaterialProperty({
                    color:colorMap[options.type],
                    duration: 3000
                })
            }
        })
    }
    /*添加动态圆*/
    earthExecute.addDynamicEllipse=function(position,color){
        var viewer=Pangu.Data.viewer;
        var height=Number(position.height)+1||4;
        position = Pangu.Cartesian3.fromDegrees(Number(position.longitude), Number(position.latitude), Number(position.height));
        let ellipse=viewer.entities.add({
            position: position,
            ellipse: {
                height:height,
                semiMinorAxis:15,
                semiMajorAxis: 15,
                material: new Pangu.ElliposidFadeMaterialProperty({
                    color:Pangu.Color.fromCssColorString(color),
                    duration: 3000
                }),
                classificationType:Pangu.ClassificationType.CESIUM_3D_TILE
            }
        });
        return ellipse;
    }
    /*添加水流效果  箭头  或三点效果*/
    earthExecute.showWaterFlow=function (options) {
        let viewer=Pangu.Data.viewer;
        let colorMap={
            1:new Pangu.Color(0, 201 / 255,0, 1),
            2:new Pangu.Color(222/ 255, 201 / 255, 1/255, 1),
            3:new Pangu.Color(255 / 255, 0, 0, 1)
        }
        viewer.entities.add({
            polyline: {
                positions: options.positions,
                width: 10,
                material: new Pangu.PolylineArrowLinkMaterialProperty({
                    color:colorMap[options.type],
                    duration: 3000
                })
            }
        })
    }
    //添加管线 polylineVolume
    earthExecute.addTunelLine=function(positions,radius,color,alpha) {
        let viewer=Pangu.Data.viewer;
        // this.showWaterFlow({
        //         positions:Pangu.Cartesian3.fromDegreesArrayHeights(positions),
        //         type:1
        //     }
        // )
        earthExecute.setTwinkleEffect(Pangu.Cartesian3.fromDegreesArrayHeights(positions),color);
        var entity = viewer.entities.add({
            // id:'polylineVolume',
            // name:'polylineVolume',
            polylineVolume : {
                positions :Pangu.Cartesian3.fromDegreesArrayHeights(positions),
                shape : computeCircle(radius),
                material : Pangu.Color.fromCssColorString(color).withAlpha(alpha),
                distanceDisplayCondition:new Pangu.DistanceDisplayCondition(0,8000.0)
            },
            nameID:Math.random() * 10
        });
        function computeCircle(radius) {
            var positions = [];
            for (var i = 0; i < 360; i+=20) {
                var radians = Pangu.Math.toRadians(i);
                positions.push(new Pangu.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
            }
            return positions;
        }
        return entity;
    }
    /*添加广告牌*/
    earthExecute.addBillboard=function (position) {
        position instanceof Array &&(position=Pangu.Cartesian3.fromDegrees(position[0],position[1],position[3]));
        var viewer=Pangu.Data.viewer;
        this.billboardEntity = viewer.entities.add({
            position: position,
            billboard: {
                image: ConstantData.imageUrl.locationIcon,
                scale:0.6,
                disableDepthTestDistance:Number.POSITIVE_INFINITY
            }
        });
    };
    /*获取坐标点位  给添加任务 发布情况取点*/
    earthExecute.getPosition=function (callback) {
        var viewer=Pangu.Data.viewer;
        var that=this;
        this.handler = new Pangu.ScreenSpaceEventHandler(viewer.scene.canvas);
        this.handler.setInputAction(leftClick, Pangu.ScreenSpaceEventType.LEFT_CLICK);
        function leftClick(movement) {
            let cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
            if (Pangu.defined(viewer.scene.terrainProvider._availability)) {
                let pickRay = viewer.camera.getPickRay(movement.position);
                cartesian = viewer.scene.globe.pick(pickRay, viewer.scene);
            }
            if ((Pangu.defined(viewer.scene.pick(movement.position)) && (Pangu.defined(viewer.scene.pick(movement.position).content) || Pangu.defined(viewer.scene.pick(movement.position).mesh)))) {
                cartesian = viewer.scene.pickPosition(movement.position);
            }
            if (cartesian) {
                that.wgs84Position=TF.earthCommon.cartesianToWgs84(cartesian);
                callback(that.wgs84Position);
                if(!that.billboardEntity){
                    that.addBillboard(cartesian);
                    // handler.removeInputAction(Pangu.ScreenSpaceEventType.LEFT_CLICK);
                    // handler.destroy();
                    that.pickedPosition=cartesian;
                    return;
                }
                that.billboardEntity.position._value=cartesian;
                that.pickedPosition=cartesian;
            }
        }
    };
    /*关闭坐标取点 */
    earthExecute.closeGetPoint=function () {
        if(this.handler){
            this.handler.removeInputAction(Pangu.ScreenSpaceEventType.LEFT_CLICK);
            this.handler.destroy();
            this.billboardEntity&&TF.earthCommon.removeEntities([this.billboardEntity ]);
        }
    };
    /*巡视漫游*/
    earthExecute.tourByPath=function(flyPath,speed,height,callback){
        var viewer=Pangu.Data.viewer;
        viewer.clock.multiplier=1;
        let cartesians=[];
        this.speed=speed;
        this.multiplier=viewer.clock.multiplier;
        if(this.isTouring){
            Pangu.RoamByPath.removeRoam();
            viewer.clock.onTick.removeEventListener(this.onTick);
        }
        this.isTouring=true;
        flyPath.forEach(function (val) {
            var cartesian=Pangu.Cartesian3.fromDegrees(val[0],val[1],val[2]+height);
            cartesians.push(cartesian);
        })
        var roam=Pangu.RoamByPath.roam({
            paths:cartesians,   //路线点数组  必须
            speed:speed,  //50 速度 km/h   必须
            positionOffset:false, //坐标偏移 default false
            // offset:this.offset,
            pathLineShow:false,  //路线是否显示  default true
            pathLineColor:"#FFFF00", //路线颜色  default "#FFFF00"
            pathLineWidth:8,        //路线线宽  default 10
            modelShow:false,         //模型是否显示  default true
            modelUrl:Pangu.Data.MODEL.Air,//Pangu.Data.MODEL.Air, //模型地址  default Pangu.Data.MODEL.Air
            modelScale:0.1,
            setInterpolation:true,
        });
        this.onTick=function() {
            // let moveEntityHeight=Pangu.Cartographic.fromCartesian3(roam.moveEntity.position._value).height;
            let moveEntityHeight=Pangu.Cartographic.fromCartesian(roam.moveEntity.position.getValue(viewer.clock.currentTime)).height;
            callback(moveEntityHeight);
            getModelMatrix(roam.moveEntity, viewer.clock.currentTime, scratch);
            Pangu.Matrix4.multiplyByTranslation(scratch, new Pangu.Cartesian3(0,0,0), scratch);
            viewer.camera.lookAtTransform(scratch, new Pangu.HeadingPitchRange(Pangu.Math.toRadians(90),Pangu.Math.toRadians(-30),80));
        }
        function getModelMatrix(entity, time, result) {
            var position = Pangu.Property.getValueOrUndefined(entity.position, time, new Pangu.Cartesian3());
            if (!Pangu.defined(position)) {return undefined;}
            var orientation = Pangu.Property.getValueOrUndefined(entity.orientation,time,new Pangu.Quaternion());
            if (!Pangu.defined(orientation)) {
                result = Pangu.Transforms.eastNorthUpToFixedFrame(position, undefined, result);
            } else {
                result = Pangu.Matrix4.fromRotationTranslation(Pangu.Matrix3.fromQuaternion(orientation, new Pangu.Matrix3()), position, result);
            }
            return result;
        }
        var scratch = new Pangu.Matrix4();
        viewer.clock.onTick.addEventListener(this.onTick);
        TF.earthCommon.toggleShowEntities(ConstantData.sceneData.dynamicCircleEntities,false);
    };
    /*漫游速度控制*/
    earthExecute.speedControl=function (option) {
        var viewer = Pangu.Data.viewer;
        switch (option) {
            case 'speedCut'://减速
                viewer.clock.multiplier -=this.speed*0.5;
                break;
            case'start'://开始
                viewer.clock.shouldAnimate=true;
                break;
            case 'pause'://暂停
                viewer.clock.shouldAnimate=false;
                break;
            case 'speedUp'://加速
                viewer.clock.multiplier+= this.speed*0.5;
                break;
            case 'stop'://结束
                if(this.isTouring){
                    Pangu.RoamByPath.removeRoam();
                    viewer.clock.onTick.removeEventListener(this.onTick);
                    viewer.clock.multiplier=0.5;
                    TF.earthCommon.toggleShowEntities(ConstantData.sceneData.dynamicCircleEntities,true);
                    viewer.clock.shouldAnimate=true;
                    this.isTouring=false;
                }
                break;
            default:viewer.clock.multiplier =this.multiplier*Number(option);break;
        }
    };
    /*添加html广告牌*/
    earthExecute.addHtmlBillboard=function (billboardEntity) {
        let viewer=Pangu.Data.viewer;
        var isAvailable = function(){
            let distance=Pangu.Cartesian3.distance(billboardEntity.position._value,viewer.scene.camera.position);
            let domId=billboardEntity.id;
            // switch (true){
            //     case (distance<=300):
            //         billboardEntity.billboard.scale=0.8;break;
            //     case (distance>300&&distance<=600):
            //         billboardEntity.billboard.scale=0.7;break;
            //     case (distance>600&&distance<=800):
            //         billboardEntity.billboard.scale=0.6;break;
            //     case (distance>800):
            //         billboardEntity.billboard.scale=0.5;break;
            // }
            if(distance>300){
                if($('#'+domId).length>0){$('#'+domId).hide();}
                return true;
            }
            let properties= getPropertiesByType(domId,billboardEntity.options);
            if($('#'+domId).length>0){
                $('#'+domId).show();
            }else{
                $('#scenePopup').append(properties.htmlString);
                $('#'+domId).show();
            }
            TF.earthCommon.showHtmlBillboard(billboardEntity.position._value,domId,-properties.height);
            return true;
        }
        function getPropertiesByType(domId,options) {
            let [htmlString,height]=['',0];
            switch (options.billboardType){
                case 'camera':
                case 'fireHydrant':
                    height=130;
                    htmlString=`<div id=${domId} class="device-name">${options.name}</div>`;break;
                case 'person':
                    height=75;
                    htmlString=`<div id=${domId} class="device-name">${options.nickname}</div>`;break;
            }
            return {htmlString:htmlString,height:height};
        }
        billboardEntity.isAvailable = isAvailable;
    }
    /*添加建筑物矢量*/
    earthExecute.addBuildingVector=function () {
        TF.requestData.getBuildingList().then(function (response) {
            response.map(function (val) {
                val.billboardType='building';
                // console.log(val);
                if(!val.point_set){
                    throw new Error(`id:${val.id},name:${val.name}楼宇point_set为空！`);
                }
                val.positions=convertPositions(val.point_set);
                let fitModelEntity=TF.geometryController.addFitModelPolygon(val);
                ConstantData.sceneData.fitModelEntities.push(fitModelEntity);
            })
            // console.log(response);
        })
        function convertPositions(positionsString) {
            let pointsArr=positionsString.split(';');
            let cartesians=pointsArr.map(function (val) {
                let cartographic=val.split(',');
                return Pangu.Cartesian3.fromDegrees(Number(cartographic[0]),Number(cartographic[1]),Number(cartographic[2]));
            });
            return cartesians;
        }
    }
    /*添加事件标注*/
    earthExecute.addEvent=function () {
        let that=this;
        TF.requestData.getSituation2Me({user_id: TF.LoginCache.userInfo.id}).then(function (response) {
            TF.earthCommon.removeEntities(that.sceneEvent);
            response.forEach(function (val) {
                TF.layerManage.toWgs84Coordinate(val.position,val);
                val.billboardType='situation';
                let eventEllipse=addEventBillBoard(val,'#ff0000')
                that.sceneEvent.push(eventEllipse);
                ConstantData.sceneData.dynamicCircleEntities.push(eventEllipse);
            })
        });
        function addEventBillBoard(options,color) {
            // console.log(options.status_code);
            if(options.status_code==4){return};
            var viewer=Pangu.Data.viewer;
            var height=Number(options.height)+1;
            let position = Pangu.Cartesian3.fromDegrees(Number(options.longitude), Number(options.latitude), Number(options.height));
            let ellipse=viewer.entities.add({
                position: position,
                id:'event'+options.id,
                ellipse: {
                    height:height,
                    semiMinorAxis:20,
                    semiMajorAxis: 20,
                    material: new Pangu.ElliposidFadeMaterialProperty({
                        color:Pangu.Color.fromCssColorString(color),
                        duration: 3000
                    }),
                    classificationType:Pangu.ClassificationType.CESIUM_3D_TILE
                },
                options:options,
                click:click
            });
            function click() {
                console.log(this.options);
                TF.showGeoThingInfo(this.options)
            }
            return ellipse;
        }
    }
    /*移除事件标注*/
    earthExecute.removeEvent=function (eventId) {
        var eventEntity=Pangu.Data.viewer.entities.getById('event'+eventId);
        TF.earthCommon.removeEntities([eventEntity]);
    }
    /*展示人员轨迹*/
    earthExecute.showPersonRoute=function (routes) {
        let [points,that]=[[],this]
        routes.forEach(function (val) {
            let point=TF.layerManage.toWgs84Coordinate(val.position);
            point=Pangu.Cartesian3.fromDegrees(point.longitude,point.latitude,ConstantData.constant.defaultSceneHeight)
            points.push(point);
            let pointEntity=TF.geometryController.addPoint(point);
            that.personRouteEntities.push(pointEntity);
        });
        let deleteBtn='<div id="removePersonRoute" style="width: 24px;height: 24px;position: absolute;z-index: 20;"><img src="./static/image/scene/icon_delete.png"></div>';
        $('#scenePopup').append(deleteBtn);
        TF.earthCommon.showHtmlBillboard(points[0],'removePersonRoute');
        let polyline=TF.geometryController.addPolyline(points);
        this.personRouteEntities.push(polyline);
        $('#removePersonRoute').click(()=>{
            that.removePersonRoute();
            $('#removePersonRoute').remove();
        })
    }
    /*移除人员轨迹*/
    earthExecute.removePersonRoute=function () {
        TF.earthCommon.removeEntities(this.personRouteEntities);
        this.personRouteEntities=[];
    }
    //添加贴模型的视屏
    earthExecute.add3DVideo=function(options){
        var viewer=Pangu.Data.viewer;
        var videoElement = document.getElementById(options.id);
        // var videoElement = document.createElement("video");
        // videoElement.src=options.videoUrl;
        // // videoElement.setAttribute('autoplay',"autoplay");
        // videoElement.setAttribute('muted','muted');
        // videoElement.setAttribute('loop',"loop");
        // videoElement.setAttribute('id',options.id);
        // document.getElementById('scenePopup').appendChild(videoElement);
        videoElement.play()
        var entity=viewer.entities.add({
            name:'cameraPolygon',
            // polygon:{
            //     hierarchy: Pangu.Cartesian3.fromDegreesArray(options.positions),
            //     material: videoElement,
            //     fill:true,
            //     // perPositionHeight:true,
            //     stRotation:Pangu.Math.toRadians(options.degree),
            //     height:options.height
            //     // disableDepthTestDistance:Number.POSITIVE_INFINITY
            // }
            rectangle:{
                coordinates:Pangu.Rectangle.fromDegrees(options.positions[0],options.positions[1],options.positions[2],options.positions[3]),
                height:options.height,
                material : videoElement,
                stRotation: Pangu.Math.toRadians(options.degree)
            }
        });
        return entity;
    };
    TF['earthExecute']=earthExecute;
})(TF);


