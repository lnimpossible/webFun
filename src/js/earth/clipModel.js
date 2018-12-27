/**
 * Created by Administrator on 2018/9/18/018.
 */
(function (TF) {
    class ClipModel{
        constructor(){
            this.modelEntityClippingPlanes=null;
            this.viewer=null;
            this.cylinderRadius = -0.0;//圆柱半径
            this.radiusMultiplier = 1;//半径倍数
            this.steps = 4;//步骤 步数
            this.clippingPlanesCenter=new Pangu.Cartesian3( -2858231.329671597,4657706.356391657,3277891.5916261403);//剪切平面中心点
            this.heading=73;//挖地盒子heading
        }
        //模型挖洞时加载3dtiles
        load3dtiles(url,height){
            let that=this;
            let viewer=Pangu.Data.viewer;
            this.viewer=viewer;
            let modelEntityClippingPlanes=this.getModelEntityClippingPlanes();
            let tile=new Pangu.Cesium3DTileset({
                url:url,
                maximumScreenSpaceError:1,
                dynamicScreenSpaceError:true,
                maximumMemoryUsage:1024,
                baseScreenSpaceError:1536,
                clippingPlanes : modelEntityClippingPlanes
            });
            this.sceneModel=viewer.scene.primitives.add(tile);
            console.log(tile);
            this.sceneModel.readyPromise.then(function(tileset) {
                var boundingSphere = tileset.boundingSphere;
                execute.tileset=tileset;
                var modelMatrix=Pangu.Common.adjustModelMatrixHeight(boundingSphere.center,height);
                tileset.modelMatrix=modelMatrix;
                tileset._root.transform = modelMatrix;
                var hpr=Pangu.HeadingPitchRoll.fromDegrees(that.heading, 0, 0);
                tileset.clippingPlanes.modelMatrix = Pangu.Transforms.headingPitchRollToFixedFrame (that.clippingPlanesCenter,hpr);
                // viewer.camera.flyTo({
                //     destination:Pangu.Common.addHeightCartesian(boundingSphere.center,1000)
                // });
            });
            return tile;
        }
        /*获取切割模型剪裁面*/
        getModelEntityClippingPlanes() {
            let cylinderRadius =this.cylinderRadius;//圆柱半径
            let radiusMultiplier =this.radiusMultiplier;//半径倍数
            let steps = this.steps;//步骤 步数
            let clippingPlanes = [];//裁剪平面
            let modelEntityClippingPlanes;//模型实体裁剪平面
            //穿件切割平面
            createClippingPlanes();
            function createClippingPlanes(modelMatrix) {
                modelEntityClippingPlanes = new Pangu.ClippingPlaneCollection({
                    modelMatrix : Pangu.defined(modelMatrix) ? modelMatrix : Pangu.Matrix4.IDENTITY,
                    edgeWidth: 2.0,
                    edgeColor: Pangu.Color.WHITE,
                    unionClippingRegions : false,
                    enabled : true
                });
                computePlanes();
            }
            /*计算面*/
            function computePlanes() {
                var stepDegrees = 6.28319 / steps;
                clippingPlanes = [];
                for (var i = 0; i < steps; i++) {
                    var angle = i * stepDegrees;
                    var dir = new Pangu.Cartesian3();
                    dir.x = 1.0;
                    dir.y = Math.tan(angle);
                    if (angle > 1.57079632679) {
                        dir.x = -1.0;
                        dir.y *= -1.0;
                    }
                    if (angle > 3.14159265359) {
                        dir.x = -1.0;
                        dir.y = dir.y;
                    }
                    if (angle > 4.71238898038) {
                        dir.x = 1.0;
                        dir.y = -dir.y;
                    }
                    Pangu.Cartesian3.normalize(dir, dir);
                    var newPlane = new Pangu.ClippingPlane(dir, cylinderRadius * radiusMultiplier);
                    modelEntityClippingPlanes.add(newPlane);
                    clippingPlanes.push(newPlane);
                }
            }
            return modelEntityClippingPlanes;
        }
        //地形开挖
        topographicExcavation(position) {
            var viewer=Pangu.Data.viewer;
            position = Pangu.Cartesian3.fromDegrees(121.24425051144249,31.05996520887437,0);
            var hpr = new Pangu.HeadingPitchRoll.fromDegrees(90, 0, 0);
            var orientation=Pangu.Transforms.headingPitchRollQuaternion(position, hpr);
            var boxEntity = viewer.entities.add({
                position : position,
                orientation:orientation,
                box : {
                    dimensions : new Pangu.Cartesian3(200.0, 200.0, 200.0),
                    material : Pangu.Color.WHITE.withAlpha(0),
                    outline : false,
                    outlineColor : Pangu.Color.WHITE
                }
            });
            var globe = viewer.scene.globe;
            globe.clippingPlanes = new Pangu.ClippingPlaneCollection({
                modelMatrix : boxEntity.computeModelMatrix(Pangu.JulianDate.now()),
                planes : [
                    new Pangu.Plane(new Pangu.Cartesian3( 1.0,  0.0, 0.0), -200.0),
                    new Pangu.Plane(new Pangu.Cartesian3(-1.0,  0.0, 0.0), -200.0),
                    new Pangu.Plane(new Pangu.Cartesian3( 0.0,  1.0, 0.0), -200.0),
                    new Pangu.Plane(new Pangu.Cartesian3( 0.0, -1.0, 0.0), -200.0),
                ],
                edgeWidth: 2.0,
                edgeColor: Pangu.Color.WHITE
            });
            this.addBoxMaterial();

        };
        //添加无盖盒子 材质不一样的情况下
        addBoxMaterial() {
            let viewer=Pangu.Data.viewer;
            var boxWall = viewer.entities.add({
                name : '地质层',
                wall : {
                    positions : Pangu.Cartesian3.fromDegreesArrayHeights([121.24215384071142,31.05815981610575,0.01,
                        121.24634817522846,31.05815934734552,0.01,
                        121.24634574030452,31.06177254376685,0.01,
                        121.24217785234384,31.061770551911085,0.01,
                        121.24215384071142,31.05815981610575,0.01]),
                    minimumHeights : [-50, -50, -50, -50,-50],
                    material : ConstantData.imageUrl.boxMaterial//Pangu.Color.RED//
                }
            });
            var polygon = viewer.entities.add({
                name:'地质层',
                polygon : {
                    hierarchy:Pangu.Cartesian3.fromDegreesArray([121.24215384071142,31.05815981610575,
                        121.24634817522846,31.05815934734552,
                        121.24634574030452,31.06177254376685,
                        121.24217785234384,31.061770551911085]),
                    material :ConstantData.imageUrl.groundMaterial,//Pangu.Color.RED.withAlpha(0.5),
                    outline : true,
                    height:-50,
                    outlineColor :Pangu.Color.BLACK,
                    stRotation:Pangu.Math.toRadians(59),
                    outlineWidth:2
                }
            });
        }
    }
    TF['clipModel']=new ClipModel();
})(TF);