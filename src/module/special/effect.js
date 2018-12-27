(function (TF) {
    class Park_2D {
        constructor(a, b) {
            this.view = undefined;
            this.map = undefined;
            this.currentPlan = undefined;
            this.canvasCard = {};
            this.widths = {};
            this.OverlayCollection = {};
            this.isInitFlag = false;
        }

        init(targetId) {
            let view = this.view = TF.PanguOl.View.init([121.23098364618085, 31.045009758032177], 14, 13, 20);
            let map = this.map = TF.PanguOl.Map.init(targetId, view);
            let scope = this;
            // map.addLayer(TF.PanguOl.Layer.tian_di_tu_satellite_layer);
            TF.PanguOl.Layer.addTile(map, 'http://skyinfor.cc:20080/geoserver/gwc/service/tms/1.0.0/skyinfor:skyinfor_SHblue@EPSG:900913@png/', null, 10);
            /*  TF.requestData.getParkNumber().then(function (data) {
                  alert(33333)
                  // let ZTCW = 0, //全部总车位,
                  //     JRTCLL = 0, //今日停车流量
                  //     TCYL = 0; //停车压力百分比
                  // let parkListDepart = $(".parkListDepart");
                  // let liStr = '';
                  let coordArray = [],
                      valueArray = [],
                      weightArray = [];
                  data.forEach((element, index) => {
                      /!* $('.ZTCW').html(ZTCW += element.zcw);
                       $('.JRTCLL').html(JRTCLL += (element.zcw - element.sycw));
                       $('.TCYL').html(TCYL = (JRTCLL / ZTCW * 100).toFixed(2));
                       liStr += `<li class="park-list-item flex justify-between">
                       <span class="text-l"><i class="fa fa-star red"></i>${element.name}</span>
                       <span class="text-c">${element.sycw}</span>
                       <span class="text-c">${element.zcw}</span></li>`;*!/
                      coordArray.push([Number(element.jd), Number(element.wd)]);
                      valueArray.push(Number(element.zcw - element.sycw));
                      weightArray.push(Number(element.zcw - element.sycw) / Number(element.zcw));
                  });
                  // parkListDepart.html(liStr);
                  let HeatMapVector = TF.PanguOl.Layer.addHeatMap(map, coordArray, valueArray, weightArray)
              });*/

            this.addDom();
            setInterval(()=>{
                scope.addDom();
            },5000);
            TF.PanguOl.EvenetHandle.commonFun = (coordinate) => {
                console.log(coordinate)
            };
            TF.PanguOl.EvenetHandle.singleClick(map, () => {
            }, () => {
            });
        }

        addTraffic() {
            let parkObject = this;
            let map = parkObject.map;
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
                dataType: "json",
                data: {
                    location: '121.2470400000,31.0567300000',
                    extensions: 'all',
                    radius: '2000',
                    level: '6',
                    key: '6cc0876b445580e4e4ed268dd1d87626'
                },
                success: function (res) {
                    if (res.info === "OK") {
                        let roadTraffic = res.trafficinfo.roads; //交通路线
                        //矢量图层
                        for (let k = 0; k < roadTraffic.length; k++) {
                            let data = [];
                            let polyline = roadTraffic[k]["polyline"].toString().split(";");
                            for (let j = 0; j < polyline.length; j++) {
                                if (!polyline[j + 1] || !polyline[j - 1]) {
                                    continue;
                                }
                                //将字符串拆成数组
                                let realData_from = polyline[j].split(",");
                                let realData_to = polyline[j + 1].split(",");
                                let coordinate_from = TF.PanguOl.GPS.gcj_decrypt(Number(realData_from[0]), Number(realData_from[1]));
                                let coordinate_to = TF.PanguOl.GPS.gcj_decrypt(Number(realData_to[0]), Number(realData_to[1]));
                                // if(TF.PanguOl.GPS.distance(coordinate_from[0],coordinate_from[1],coordinate_to[0],coordinate_to[1]) < 100){continue;}
                                data.push({
                                    from: {city: '', lnglat: coordinate_from},
                                    to: {city: '', lnglat: coordinate_to},
                                })
                            }
                            let color = '', width = 0, zIndex = 1;
                            let status = roadTraffic[k]['status'];
                            if (parkObject.widths[status]) {
                                width = parkObject.widths[status]['width'];
                                color = parkObject.widths[status]['color'];
                            } else {
                                parkObject.widths[status] = {};
                                switch (status) {
                                    case '0':
                                        color = 'dark';
                                        width = 4;
                                        break;
                                        /!*0：未知1：畅通2：缓行3：拥堵*!/
                                    case '1':
                                        color = 'green';
                                        width = 5;
                                        break;
                                    case '2':
                                        color = 'yellow';
                                        width = 6;
                                        zIndex = 2;
                                        break;
                                    case '3':
                                        color = 'red';
                                        width = 6;
                                        zIndex = 3;
                                        break;
                                }
                                parkObject.widths[status]['width'] = width;
                                parkObject.widths[status]['color'] = color;
                            }
                            var options = {
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
                                strokeStyle: color,
                                globalAlpha: 0.3,
                                //移动点半径
                                moveRadius: width / 2,
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

                            if (parkObject.canvasCard[k]) {
                                parkObject.canvasCard[k].update(map, options);
                            } else {
                                parkObject.canvasCard[k] = new MoveLine(map, options);
                            }
                            map.render();
                        }
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }

        addDom() {
            let scope = this;
            let map =scope.map;

            let data = [{
                name: "万达广场",
                type: "red",
                number:(Math.random()*10 +10).toFixed(0), //10-20
                position: [121.23865135425376, 31.059737623479478]

            },{
                name: "方松街道办",
                type: "yellow",
                number:(Math.random()*10 +50).toFixed(0), //50-60
                position: [121.19254243257602, 31.03573214737824]

            },{
                name: "永翔大厦",
                type: "green",
                number:(Math.random()*10 +100).toFixed(0), //100-110
                position:  [121.23168119552425, 31.03610446208016]

            }];
            data.forEach((park,index) => {
                let parkClass = '';
                if (park.type === 'red') {
                    parkClass = 'redParkPoint';
                } else if (park.type === 'green') {
                    parkClass = 'greenParkPoint';
                }
                else if (park.type === 'yellow') {
                    parkClass = 'yellowParkPoint';
                }
                let redParkPoint = document.createElement('div');
                redParkPoint.classList += parkClass;
                let parkPoint = `<div class="parkDetailContainer">
				<p>${park.name}</p>
				<span class="restNum">剩余车位：</span>
				<span class="restNumText">${park.number}</span>
				<div class="triangle"></div>
			</div>
			<div class="animationContainer">
				<span class="point_inner"></span>
				<span class="point_middle"></span>
				<span class="point_outer"></span>
			</div>`;

                redParkPoint.innerHTML = parkPoint;
                if(scope.OverlayCollection[index]){
                    scope.OverlayCollection[index].setElement(redParkPoint);
                }else{
                    scope.OverlayCollection[index] = TF.PanguOl.Mark.addDom(this.map, redParkPoint, park.position);
                }
            })

        }
    }

    try {
        if(!TF.effectPark_2D){
            TF.effectPark_2D = new Park_2D();
            TF.effectPark_2D.init('tdMapPark');
            TF.effectPark_2D.addTraffic(TF.effectPark_2D);
            setInterval(() => {
                TF.effectPark_2D.addTraffic()
            }, 60000);
        }else{
            TF.effectPark_2D.map.setTarget($('#tdMapPark')[0])
        }
    } catch (e) {
        TF.Notice.message("地图加载失败");
        console.log(e);
    }

})(TF);
