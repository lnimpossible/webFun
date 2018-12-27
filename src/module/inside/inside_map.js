(function (TF) {
    if (TF.Inside_2D) {
        let mapDom = document.getElementById("inset-openlayer-container");
        TF.Inside_2D.map.setTarget(mapDom);
        TF.Inside_2D.changePlan();
    } else {
        class Inside_2D {
            constructor(a, b) {
                this.view = undefined;
                this.map = undefined;
                this.currentPlan = undefined;
                this.billbordsCollection = [];
                let scope = this;
                this.fitView = function (ele, val) {
                    $(ele).addClass('active').siblings('li').removeClass('active');
                    let view = this.view;
                    let featurs = this.currentPlan.getSource().getFeatures();
                    featurs.forEach(function (feature) {
                        if (feature.get('huhao') == val.toString()) {
                            view.fit(feature.getGeometry(), {nearest: true, duration: 1000, padding: [50, 50, 50, 50]});
                            return;
                        }
                    })
                };
                this.billbordStyles = {building: '', lift: '', exitSafe: ''};
                this.mapStyle = (feature) => {
                    return new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgb(89,228,253)',
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgb(14,33,60)'
                        }),
                        text: new ol.style.Text({
                            fill: new ol.style.Fill({
                                color: '#fff'
                            }),
                            text: feature.get("name"),
                            padding: [2, 10, 2, 10]
                        }),
                    })
                }
                this.billBordStyleFunction = (feature) => {
                    let type = feature.get('info')['sceneType'];
                    if (!type) {
                        return
                    }

                    let fontBgColor, fontOffset, imgSrc, offsetY = 0, offsetX = 0;
                    switch (type) {
                        case 'building':
                            fontBgColor = 'rgb(0,140,255)';
                            imgSrc = 'static/image/map/building.png';
                            offsetX = 58;
                            break;
                        case 'lift':
                            fontBgColor = 'rgb(10,233,255)';
                            imgSrc = 'static/image/map/lift.png';
                            offsetY = 10;
                            break;
                        case 'exitSafe':
                            fontBgColor = 'rgb(54,201,114)';
                            imgSrc = 'static/image/map/exitSafe.png';
                            offsetY = 10;
                            break;
                    }
                    scope.billbordStyles.type = new ol.style.Style({
                        image: new ol.style.Icon({
                            src: imgSrc,
                        }),
                        text: new ol.style.Text({
                            fill: new ol.style.Fill({
                                color: '#fff'
                            }),
                            backgroundFill: new ol.style.Fill({
                                color: fontBgColor,
                            }),
                            offsetX: offsetX,
                            offsetY: offsetY,
                            text: feature.get('info')["name"],
                            padding: [2, 10, 2, 10]
                        }),
                    });
                    return scope.billbordStyles.type;

                };
            }

            init(targetId) {
                let view = this.view = TF.PanguOl.View.init([119.98683260872604, 30.392343700034182], 16, 13, 20);
                let map = this.map = TF.PanguOl.Map.init(targetId, this.view);
                var displayFeatureInfo = function (pixel) {
                    var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
                        return feature;
                    });
                    view.fit(feature.getGeometry().getExtent());
                    let roomList = document.getElementsByClassName('inset-element-infolist')[0].getElementsByTagName('ul')[0];
                    let huhao = feature.get("huhao");
                    let li = $(roomList).find(`li#${huhao}`);
                    li.click();
                };
                this.map.on('click', function (evt) {
                    displayFeatureInfo(evt.pixel);
                });
            }

            changePlan() {
                this.currentPlan && this.map.removeLayer(this.currentPlan);
                try {
                    this.currentPlan = TF.PanguOl.GeoJson.add(JSON.parse(TF.currentFloorData.map_data), this.map, this.mapStyle);
                    this.view.fit(this.currentPlan.getSource().getExtent());
                    TF.Inside_2D.addBillBord();
                } catch (e) {
                    TF.Notice.message("本楼层没有平面图");
                }
            }

            addBillBord() {
                if(TF.Inside_2D.billbordsCollection.length > 0){
                    TF.Inside_2D.billbordsCollection.forEach((layer)=>{
                        this.map.removeLayer(layer);
                    })
                }
                TF.Inside_2D.currentPlan.getSource().getFeatures().forEach((feature) => {
                    var extent = ol.extent.boundingExtent(feature.getGeometry().getCoordinates()[0]); //获取一个坐标数组的边界，格式为[minx,miny,maxx,maxy]
                    var center = ol.extent.getCenter(extent);   //获取边界区域的中心位置
                    center = ol.proj.toLonLat(center);
                    TF.Inside_2D.billbordsCollection.push(TF.PanguOl.Mark.addFeatureOverlay(this.map, center, this.billBordStyleFunction, feature.getProperties()))
                });
            }
        }

        TF.Inside_2D = new Inside_2D();
        TF.Inside_2D.init('inset-openlayer-container');
        try {
            TF.Inside_2D.currentPlan = TF.PanguOl.GeoJson.add(JSON.parse(TF.currentFloorData.map_data), TF.Inside_2D.map, TF.Inside_2D.mapStyle);
            TF.Inside_2D.view.fit(TF.Inside_2D.currentPlan.getSource().getExtent());
            TF.Inside_2D.addBillBord();
        } catch (e) {
            TF.Notice.message("本楼层没有平面图");
        }
    }
})(TF);
