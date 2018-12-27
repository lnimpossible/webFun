(function (TF) {
    class Park_2D {
        constructor(){
            this.vectorLayers= [];
            this.canvasCard= {};
        }
        init(targetId) {
            let view = this.view = TF.PanguOl.View.init([121.2426996300, 31.0640000000], 16,13, 20);
            let map = this.map = TF.PanguOl.Map.init(targetId, view);
            // map.addLayer(TF.PanguOl.Layer.tian_di_tu_satellite_layer);
            TF.PanguOl.Layer.addTile(map, 'http://skyinfor.cc:20080/geoserver/gwc/service/tms/1.0.0/skyinfor:skyinfor_SHblue@EPSG:900913@png/', null, 11);

        }
        addTraffic(){
            let parkObject = this;
            let map = parkObject.map;
            console.log(map)
            // while(parkObject.vectorLayers.length > 0){
            //     map.removeLayer(parkObject.vectorLayers.pop());
            // }
            /**
             * 查询高德态势数据
             * get
             * */
            $.ajax({
                url: "https://restapi.amap.com/v3/traffic/status/circle", //radius 单位：米，最大取值5000米。
                type: "get",
                cache: false,
                dataType:"json",
                data:{
                    location:'121.2470400000,31.0567300000',
                    extensions:'all',
                    radius:'3000',
                    level:'6',
                    key:'6cc0876b445580e4e4ed268dd1d87626'
                },
                success: function (res) {
                    console.log(res);
                    if(res.info === "OK"){
                        let roadTrafficDescription = res.trafficinfo.description.split('；'); //交通描述
                        let roadTraffic = res.trafficinfo.roads; //交通路线
                        let str = '';
                        roadTrafficDescription.forEach((description)=>{
                            str+=`<p>${description}</p>`;
                        });
                        $(".analysis-center-trafficDescription").html(str);

                        //矢量图层
                        let source = new ol.source.Vector();
                        let styls = [];
                        for(let k = 0 ; k < roadTraffic.length ; k++){
                            let data = [];
                            let polyline = roadTraffic[k]["polyline"].toString().split(";");
                            for (let j = 0; j < polyline.length; j++) {
                                //将字符串拆成数组
                                let realData_from = polyline[j].split(",");
                                let realData_to = ((polyline[j+1])?polyline[j+1]:polyline[j]).split(",");
                                let coordinate_from = TF.PanguOl.GPS.gcj_decrypt( Number(realData_from[0]),Number(realData_from[1] ));
                                let coordinate_to = TF.PanguOl.GPS.gcj_decrypt( Number(realData_to[0]),Number(realData_to[1] ));
                                data.push({
                                    from: {
                                        city: '',
                                        lnglat: coordinate_from
                                    },
                                    to: {
                                        city: '',
                                        lnglat: coordinate_to
                                    },
                                })
                            }
                            let color = '',width=0,zIndex=1;
                            switch (roadTraffic[k]['status']){
                                case '0':color = 'dark';width=4;break; /!*0：未知1：畅通2：缓行3：拥堵*!/
                                case '1':color = 'green';width=5;break;
                                case '2':color = 'yellow';width=6;zIndex=2;break;
                                case '3':color = 'red';width=6;zIndex=3;break;
                            }
                            var options =  {
                                //marker点半径
                                markerRadius: 0,
                                //marker点颜色,为空或null则默认取线条颜色
                                markerColor: null,
                                //线条类型 solid、dashed、dotted
                                lineType: 'solid',
                                //线条宽度
                                lineWidth: width,
                                //线条颜色
                                colors: '#fff',
                                strokeStyle:color,
                                globalAlpha:0.3,
                                //移动点半径
                                moveRadius:width/2 ,
                                //移动点颜色
                                fillColor: color,
                                //移动点阴影颜色
                                shadowColor: 'rgba(255,255,255,0.5)',
                                //移动点阴影大小
                                shadowBlur: width,
                                zIndex: 999,
                                data: data
                            };
                            //动态效果

                            if(parkObject.canvasCard[k]){
                                parkObject.canvasCard[k].update(map,options);
                            }else{
                                parkObject.canvasCard[k] = new MoveLine(map, options);
                            }
                        }
                        // roadTraffic.forEach((road,index)=>{
                            /*let polyline = road["polyline"].toString().split(";");
                            let polylineData = [];
                            for (let j = 0; j < polyline.length; j++) {
                                //将字符串拆成数组
                                let realData = polyline[j].split(",");
                                let coordinate = TF.PanguOl.GPS.gcj_decrypt( Number(realData[0]),Number(realData[1] ));
                                polylineData.push(ol.proj.fromLonLat(coordinate));
                            }
                            //要素属性
                            let attribute = {
                                name: road.name,
                                status: road.status,
                                direction: road.direction
                            };
                            //线此处注意一定要是坐标数组
                            let plygon = new ol.geom.LineString(polylineData)
                            //线要素类
                            let feature = new ol.Feature({
                                geometry: plygon,
                                attr: attribute
                            });
                            source.addFeature(feature);
                            let vector = new ol.layer.Vector({
                                source: source,
                                style:function(feature){
                                    if(parkObject.styles[feature.get('attr')['status']]){
                                        return parkObject.styles[feature.get('attr')['status']];
                                    }
                                    let color = '',width=0,zIndex=1;
                                    switch (feature.get('attr')['status']){
                                        case '0':color = 'dark';width=3;break; /!*0：未知1：畅通2：缓行3：拥堵*!/
                                        case '1':color = 'green';width=4;break;
                                        case '2':color = 'yellow';width=5;zIndex=2;break;
                                        case '3':color = 'red';width=5;zIndex=3;break;
                                    }
                                    parkObject.styles[feature.get('attr')['status']] = new ol.style.Style({
                                        text: new ol.style.Text({
                                            text:feature.get('attr')['name'],
                                            fill: new ol.style.Fill({
                                                color:'#fff'
                                            }),
                                        }),
                                        fill: new ol.style.Fill({
                                            color: color
                                        }),
                                        stroke: new ol.style.Stroke({
                                            color: color,
                                            width: width
                                        }),
                                        zIndex:zIndex
                                    });
                                    return parkObject.styles[feature.get('attr')['status']];
                                },
                                zIndex:3
                            });
                            map.addLayer(vector);
                            parkObject.vectorLayers.push(vector);*/

                        // });



                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })


        }

        addEventHeatMap(parkObject){
            console.log(TF.LoginCache.userInfo)
            TF.requestData.situationAll({user_id :TF.LoginCache.userInfo.id,page :1,limit:500}).then((res)=>{
                console.log(res)
                let level,weight,LonLatArray=[],valueArray=[], weightArray=[];
                res.list.forEach((condition,index)=>{
                    level = condition.level;
                    if(level === '一级'){
                        weight = 0.9;
                    }else if(level === '二级'){
                        weight = 0.7
                    }else{
                        weight = 0.4;
                    }
                    let position = condition.position.split(',');
                    LonLatArray.push([Number(position[0]),Number(position[1])]);
                    valueArray.push(10);
                    weightArray.push(weight);
                })
                TF.PanguOl.Layer.addHeatMap(parkObject.map,LonLatArray,valueArray,weightArray,3);
            })
        }
    }
    try {
        if(!TF.specialPark_2D){
            TF.specialPark_2D = new Park_2D();
            TF.specialPark_2D.styles = {'0':'','1':'','2':'','3':''};
            TF.specialPark_2D.init('analysis-center-map',TF.specialPark_2D);
            TF.specialPark_2D.addEventHeatMap(TF.specialPark_2D);
        }else{
            TF.specialPark_2D.map.setTarget($('#analysis-center-map')[0])
        }
    } catch (e) {
        TF.Notice.message("地图加载失败");
        console.log(e);
    }

})(TF);
