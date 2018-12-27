(function (TF) {
    /**
     * Created by louis on 2018/1/4.
     */
    /**
     * 绘制类
     */
    function Draw() {
        this.source = new ol.source.Vector();
        this.vector = null;
        this.features = [];
        this.polygon_drawing_tool = new ol.interaction.Draw({
            source: this.source,
            type: 'Point'
        });
        this.polygon_drawing_tool_Polygon = new ol.interaction.Draw({
            source: this.source,
            type: 'Polygon'
        });
        this.polygon_drawing_tool_Polygon.on('drawend', function (e) {
            getFeature(e.feature);
        }, this);
        this.polygon_drawing_tool.on('drawend', function (e) {
            getFeature(e.feature);
        }, this);
        //绘制
        this.addVector = function () {
            var DrawC = this;
            var vector = new ol.layer.Vector({
                source: DrawC.source,
                style: new PanguOl().styles['draw'],
                zIndex: 999
            });
            DrawC.vector = vector;
            return vector;
        };
        //开始刺点
        this.addInteractions = function (map, type) {
            var DrawC = this;
            if (type) {
                map.removeInteraction(DrawC.polygon_drawing_tool);
                map.addInteraction(DrawC.polygon_drawing_tool_Polygon);
            } else {
                map.removeInteraction(DrawC.polygon_drawing_tool_Polygon);
                map.addInteraction(DrawC.polygon_drawing_tool);
            }
        };

        function getFeature(feature, fun) {
            feature.setId(Date.now()); //设置点位矢量的唯一ID
            fun && fun(feature);
            new PanguOl().Draw.features.push(feature);
        }

        //清除绘制模式
        this.quitInteractions = function (map) {
            map.removeInteraction(this.polygon_drawing_tool); //退出刺点模式
            map.removeInteraction(this.polygon_drawing_tool_Polygon); //退出刺点模式
        };
        //清除上次绘制的feature
        this.clearLastFeature = function (map) {
            if (this.features.length >= 1) {
                this.source.removeFeature(this.features.pop());
            }
            this.quitInteractions(map); //退出刺点模式
        };
        //清除绘制的所有feature
        this.clearAllFeature = function (map) {
            var DrawC = this;
            while (DrawC.features.length >= 1) {
                DrawC.source.removeFeature(DrawC.features.pop());
            }
            DrawC.quitInteractions(map); //退出绘制模式
        };
    }

    /**
     * 测量类
     */
    function Measure() {
        let scope = this;
        scope.sketchContainer = [];
        var helpTooltip, measureTooltipElement, helpTooltipElement, measureTooltip, sketch, continueLineMsg = '测量距离';
        var continuePolygonMsg = '测量面积';
        /**
         * Handle pointer move.
         * @param {ol.MapBrowserEvent} evt The event.
         */
        var pointerMoveHandler = function (evt) {
            if (evt.dragging) {
                return;
            }
            /** @type {string} */
            var helpMsg = '点击开始测量';

            if (sketch) {
                var geom = (sketch.getGeometry());
                if (geom instanceof ol.geom.Polygon) {
                    helpMsg = null;
                } else if (geom instanceof ol.geom.LineString) {
                    helpMsg = null;
                }
            }

            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);

            helpTooltipElement.classList.remove('hidden');
        };
        /**
         * Format length output.
         * @param {ol.geom.LineString} line The line.
         * @return {string} The formatted length.
         */
        var formatLength = function (line) {
            var length = ol.sphere.getLength(line);
            var output;
            if (length > 100) {
                output = (Math.round(length / 1000 * 100) / 100) +
                    ' ' + 'km';
            } else {
                output = (Math.round(length * 100) / 100) +
                    ' ' + 'm';
            }
            return output;
        };


        /**
         * Format area output.
         * @param {ol.geom.Polygon} polygon The polygon.
         * @return {string} Formatted area.
         */
        var formatArea = function (polygon) {
            var area = ol.sphere.getArea(polygon);
            var output;
            if (area > 10000) {
                output = (Math.round(area / 1000000 * 100) / 100) +
                    ' ' + 'km<sup>2</sup>';
            } else {
                output = (Math.round(area * 100) / 100) +
                    ' ' + 'm<sup>2</sup>';
            }
            return output;
        };

        /**
         * Creates a new help tooltip
         */
        function createHelpTooltip(map) {
            if (helpTooltipElement) {
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
            }
            helpTooltipElement = document.createElement('div');
            helpTooltipElement.className = 'tooltip hidden';
            helpTooltip = new ol.Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left'
            });
            map.addOverlay(helpTooltip);
        }

        /**
         * Creates a new measure tooltip
         */
        function createMeasureTooltip(map) {
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
            }
            measureTooltipElement = document.createElement('div');
            // measureTooltipElement.className = 'tooltip tooltip-measure';
            measureTooltipElement.style.cssText = "position: relative;\n" +
                "        background: rgba(0, 0, 0, 0.5);\n" +
                "        border-radius: 4px;\n" +
                "        color: white;\n" +
                "        padding: 4px 8px;\n" +
                "        opacity: 1;\n" +
                "        white-space: nowrap;border-top: 6px solid rgba(0, 0, 0, 0.5);\n" +
                "        border-right: 6px solid transparent;\n" +
                "        border-left: 6px solid transparent;\n" +
                "        content: \"\";\n" +
                "        position: absolute;\n" +
                "        bottom: -6px;\n" +
                "        margin-left: -7px;\n" +
                "        left: 50%;opacity: 1;\n" +
                "        font-weight: bold;";
            measureTooltip = new ol.Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center'
            });
            map.addOverlay(measureTooltip);
        }

        this.addInteraction = function (map, measure_type) {
            let source = new ol.source.Vector();
            let type = (measure_type === 'area' ? 'Polygon' : 'LineString');
            let vector = new ol.layer.Vector({ //绘制完成之后实线的样式
                source: source,
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffcc33',
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#ffcc33'
                        })
                    }),
                }),
                zIndex:999
            });
            let draw = new ol.interaction.Draw({ //绘制虚线的样式
                source: source,
                type: type,
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 0.7)'
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.2)'
                        })
                    })
                })
            });
            var listener;
            draw.on('drawstart',
                function (evt) {
                    // set sketch
                    sketch = evt.feature;

                    /** @type {ol.Coordinate|undefined} */
                    var tooltipCoord = evt.coordinate;

                    listener = sketch.getGeometry().on('change', function (evt) {
                        var geom = evt.target;
                        var output;
                        if (geom instanceof ol.geom.Polygon) {
                            output = formatArea(geom);
                            tooltipCoord = geom.getInteriorPoint().getCoordinates();
                        } else if (geom instanceof ol.geom.LineString) {

                            output = formatLength(geom);
                            tooltipCoord = geom.getLastCoordinate();
                        }
                        measureTooltipElement.innerHTML = output;
                        measureTooltip.setPosition(tooltipCoord);
                    });
                }, this);

            draw.on('drawend',
                function () {
                    measureTooltipElement.style.cssText = " position: relative;\n" +
                        "        background: rgba(0, 0, 0, 0.5);\n" +
                        "        border-radius: 4px;\n" +
                        "        color: white;\n" +
                        "        padding: 4px 8px;\n" +
                        "        opacity: 1;\n" +
                        "        white-space: nowrap;" +
                        "background-color: #ffcc33;\n" +
                        "        color: black;\n" +
                        "        border: 1px solid white;";
                    // measureTooltipElement.className = 'tooltip tooltip-static';
                    measureTooltip.setOffset([0, -7]);
                    // unset sketch
                    sketch = null;
                    // unset tooltip so that a new one can be created
                    measureTooltipElement = null;

                    createMeasureTooltip(map);
                    ol.Observable.unByKey(listener);
                    // measureTooltipElement.parentNode.removeChild(measureTooltipElement);
                    map.un('pointermove', pointerMoveHandler);
                    setTimeout(function () {
                        map.removeInteraction(draw);
                    }, 200);
                }, this);
            map.addInteraction(draw);
            map.addLayer(vector);
            map.on('pointermove', pointerMoveHandler);
            createMeasureTooltip(map);
            createHelpTooltip(map);
            map.getViewport().addEventListener('mouseout', function () {
                helpTooltipElement.classList.add('hidden');
            });
            scope.sketchContainer.push({vector, measureTooltip});
            return {vector, measureTooltip};
        };
        this.cacelDraw = function (map) {
            while(scope.sketchContainer.length > 0){
                let currentSketch = scope.sketchContainer.pop();
                map.removeLayer(currentSketch.vector);
                map.removeOverlay(currentSketch.measureTooltip);
            }
        }
    }

    /**
     * 视角类，控制地图视角
     */
    function View() {
        this.init = function (lonlat, zoom, minZoom, maxZomm, extent, rotationBool) {
            let obj = {};
            obj.center = lonlat ? ol.proj.fromLonLat(lonlat) : ol.proj.fromLonLat([121.4397369700, 28.4403683500]);
            obj.zoom = zoom ? zoom : 3;
            obj.minZoom = minZoom ? minZoom : 0;
            obj.maxZomm = maxZomm ? maxZomm : 21;
            if(extent) obj.extent = ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
            obj.enableRotation = rotationBool ? rotationBool : false;
            var viewer = new ol.View(obj);
            viewer.up = function () {
                this.setZoom(view.getZoom() - 0.5);
            };
            viewer.down = function () {
                this.setZoom(view.getZoom() + 0.5);
            };
            return viewer;
        };
    }

    /**
     * 地图类，最大的容器
     */
    function Map() {
        this.init = function (targetId, view, layers) {
            targetId = targetId ? targetId : "map";
            layers = layers ? [layers] : [];
            view = view ? view : new PanguOl().View.init();
            var map = new ol.Map({
                layers: layers,
                target: targetId,
                view: view
            });
            map.render_size = function () {
                map.updateSize();
                let timer = setInterval(function () {
                    map.updateSize();
                },50);
                setTimeout(function () {
                    clearInterval(timer);
                }, 500);
            };
            return map;
        };

    }

    /**
     * 图层类，地图表面的地图
     */
    function Layer() {
        this.osm = new ol.layer.Tile({ //二维
            visible: true,
            preload: Infinity,
            imagerySet: 'Aerial',
            source: new ol.source.OSM()
        });
        //通过feature获取图层
        this.getLayer = function (feature) {
            var layers = map.getLayers();
            var layersArray = layers.getArray();
            for (var i = 0; i < layers.getLength(); i++) {
                var source = layersArray[i].getSource();
                if (source instanceof ol.source.Vector) {
                    var features = source.getFeatures();
                    if (features.length > 0) {
                        for (var j = 0; j < features.length; j++) {
                            if (features[j] === feature) {
                                return layersArray[i];
                            }
                        }
                    }
                }
            }
            return null;
        };
        this.addOrtho = function (map,url,mapMinZoom,mapMaxZoom,mapExtent,zIndex) {
            let obj = {};
            if(mapExtent) obj.extent = ol.proj.transformExtent(mapExtent, 'EPSG:4326', 'EPSG:3857');
            obj.source = new ol.source.XYZ({
                url: url,
                tilePixelRatio: 1.000000,
                minZoom: mapMinZoom,
                maxZoom: mapMaxZoom
            })
            // mapExtent = ol.proj.transformExtent(mapExtent, 'EPSG:4326', 'EPSG:3857');
            obj.zIndex = zIndex ? zIndex : 2;
            let orthoLayer = new ol.layer.Tile(obj);
            map.addLayer(orthoLayer);
            return orthoLayer;
        };
        this.addGeoserverB = function (map,url, EPSG, zIndex) { //加载服务器gerover服务
            zIndex = zIndex ? zIndex : 2;
            EPSG = EPSG ? EPSG : '4326';
            var geolayer = new ol.layer.Tile({ //墨卡托坐标系
                visible: true,
                preload: Infinity,
                imagerySet: 'Aerial',
                source: new ol.source.XYZ({
                    // attributions: '<a href="http://www.skyinfor.com/">天覆信息科技</a> © 2017',
                    projection: ol.proj.get('EPSG:' + EPSG),
                    tileSize: 256,
                    url: url,
                    tileUrlFunction: function (tileCoord) {
                        var z = tileCoord[0] - 1;
                        var x = tileCoord[1];
                        var y = -tileCoord[2];
                        var tryy = Math.pow(2, z) - y; //y所在行（关键点）
                        switch (z) {
                            case 12:
                                return url.replace('{EPSG_z}', EPSG + '_' + z).replace('{X_Y}', '053_021').replace('{x}', '00' + x.toString()).replace('{y}', '00' + tryy.toString());
                                break;
                            case 13:
                                return url.replace('{EPSG_z}', EPSG + '_' + z).replace('{X_Y}', '107_043').replace('{x}', '0' + x.toString()).replace('{y}', '00' + tryy.toString());
                                break;
                            case 14:
                                return url.replace('{EPSG_z}', EPSG + '_' + z).replace('{X_Y}', '107_043').replace('{x}', '0' + x.toString()).replace('{y}', '0' + tryy.toString());
                                break;
                            case 15:
                                return url.replace('{EPSG_z}', EPSG + '_' + z).replace('{X_Y}', '214_086').replace('{x}', '0' + x.toString()).replace('{y}', '0' + tryy.toString());
                                break;
                            case 16:
                                return url.replace('{EPSG_z}', EPSG + '_' + z).replace('{X_Y}', '213_085').replace('{x}', x.toString()).replace('{y}', '0' + tryy.toString());
                                break;
                            case 17:
                                return url.replace('{EPSG_z}', EPSG + '_' + z).replace('{X_Y}', '426_171').replace('{x}', x.toString()).replace('{y}', '0' + tryy.toString());
                                break;
                            case 18:
                                return url.replace('{EPSG_z}', EPSG + '_' + z).replace('{X_Y}', '0426_0171').replace('{x}', '00' + x.toString()).replace('{y}', '00' + tryy.toString());
                                break;
                            case 19:
                                return url.replace('{EPSG_z}', EPSG + '_' + z).replace('{X_Y}', '0852_0342').replace('{x}', '00' + x.toString()).replace('{y}', '00' + tryy.toString());
                                break;
                            case 20:
                                return url.replace('{EPSG_z}', EPSG + '_' + z).replace('{X_Y}', '0852_0342').replace('{x}', '0' + x.toString()).replace('{y}', '00' + tryy.toString());
                                break;
                            case 21:
                                return url.replace('{EPSG_z}', EPSG + '_' + z).replace('{X_Y}', '1705_0684').replace('{x}', '0' + x.toString()).replace('{y}', '0' + tryy.toString());
                                break;
                        }
                    }
                }),
                zIndex: zIndex
            });
            map.addLayer(geolayer);
            return geolayer;
        };
        this.addGeoserverY = function (url, EPSG, zIndex) { //加载本地geoserver格式瓦片
            zIndex = zIndex ? zIndex : 2;
            EPSG = EPSG ? EPSG : 'EPSG:4326';
            var geolayer = new ol.layer.Tile({ //墨卡托坐标系
                visible: true,
                preload: Infinity,
                imagerySet: 'Aerial',
                source: new ol.source.XYZ({
                    attributions: '<a href="http://www.skyinfor.com/">天覆信息科技</a> © 2017',
                    projection: ol.proj.get(EPSG),
                    tileSize: 256,
                    url: url,
                    tileUrlFunction: function (tileCoord) {
                        var z = tileCoord[0] - 1;
                        var x = tileCoord[1];
                        var y = -tileCoord[2];
                        var tryy = Math.pow(2, z) - y; //y所在行（关键点）
                        var ss = url.replace('{z}', z.toString()).replace('{x}', x.toString()).replace('{y}', tryy.toString());
                        return ss;
                    }
                }),
                zIndex: zIndex
            });
            this.addLayer(geolayer);
            return geolayer;
        };
        //geoserver  gwc加载pbf或者.geojson文件服务
        this.addVectorTile = function (map, url, style, minZoom, zIndex) {
            zIndex = zIndex ? zIndex : 1;
            var geolayer = new ol.layer.VectorTile({
                declutter: true,
                source: new ol.source.VectorTile({
                    tileGrid: ol.tilegrid.createXYZ({
                        extent: ol.proj.get('EPSG:900913').getExtent(),
                        // minZoom: minZoom
                    }),
                    format: new ol.format.MVT(),
                    tileUrlFunction: function (tileCoord) {
                        return url + (tileCoord[0]) + '/' + tileCoord[1] + '/' + (Math.pow(2, tileCoord[0]) + tileCoord[2]) + '.pbf';
                    }
                }),
                maxResolution: map.getView().getResolutionForZoom(minZoom),
                // style: style,
                zIndex: zIndex,
            });
            // style && geolayer.setStyle(style);
            map.addLayer(geolayer);
            return geolayer;
        };
        //geoserver  gwc加载png
        this.addTile = function (map, url, style, minZoom, zIndex) {
            zIndex = zIndex ? zIndex : 1;
            var geolayer = new ol.layer.Tile({
                declutter: true,
                source: new ol.source.XYZ({
                    tileGrid: ol.tilegrid.createXYZ({
                        extent: ol.proj.get('EPSG:900913').getExtent(),
                        minZoom: minZoom
                    }),
                    format: new ol.format.MVT(),
                    tileUrlFunction: function (tileCoord) {
                        return url + (tileCoord[0]) + '/' + tileCoord[1] + '/' + (Math.pow(2, tileCoord[0]) + tileCoord[2]) + '.png';
                    }
                }),
                // maxResolution: map.getView().getResolutionForZoom(minZoom),
                // style: style,
                zIndex: zIndex,
            });
            // style && geolayer.setStyle(style);
            map.addLayer(geolayer);
            return geolayer;
        };
        //加载热力图
        this.addHeatMap = function (map,LonLatArray,valueArray, weightArray, zIndex) {  // Heatmap热力图
            let heatData = {
                type: "FeatureCollection",
                features: []
            };
            LonLatArray.forEach(function (coordinate,index) {
                heatData.features.push(
                    {
                        "type": "Feature",
                        "properties": {name: "name5", value: valueArray[index], weight: weightArray[index]},
                        "geometry": {type: "Point", "coordinates": coordinate},
                    }
                )
            });
            console.log(heatData.features)
            let features = (new ol.format.GeoJSON()).readFeatures(heatData, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });
            let vectorSource = new ol.source.Vector({
                features: features
            });
            let vector = new ol.layer.Heatmap({
                source: vectorSource,
                blur: parseInt(40, 10),
                radius: parseInt(50, 10),
                // maxResolution: 20,
                weight: function (feature) {
                    return feature.get('weight')  ; //must between 0-1;
                },
                zIndex: zIndex ? zIndex : 2
            });
            map.addLayer(vector);
            return vector;
        }
        //天地图卫星地图
        this.tian_di_tu_satellite_layer = new ol.layer.Tile({
            title: "天地图卫星影像",
            source: new ol.source.XYZ({
                url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
            }),
            zIndex:1
        });
        //天地图卫星标注地图
        this.tian_di_tu_text_layer = new ol.layer.Tile({
            title: "天地图卫星标注影像",
            source: new ol.source.XYZ({
                url: 'http://t{0-4}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
            }),
            zIndex:1
        });

    }

    /**
     *
     * map的鼠标事件类
     */
    function EvenetHandle() {
        var self = this;
        self.commonFun = null;
        let csa = []
        this.singleClick = function (map,featureFun, emptyFun ) {
            self.clickedPosition = null;
            map.on('singleclick',clickedEvent);
            function clickedEvent(evt){
                evt.stopPropagation();
                evt.preventDefault();
                let coordinate = ol.proj.toLonLat(evt.coordinate);
                self.clickedPosition = coordinate;
                csa.push(coordinate)
                // console.log(JSON.stringify(csa))
                if(self.commonFun){
                    self.commonFun(coordinate);
                    return;
                }
                let feature;
                if (map.hasFeatureAtPixel(evt.pixel)) {
                    feature = map.getFeaturesAtPixel(evt.pixel)[0];
                    featureFun && featureFun(coordinate, feature);
                } else {
                    emptyFun && emptyFun(coordinate);
                }
            }
        };
        // this.clickedEvent =

        this.pointermover = function (map) {
            map.on('pointermove', function (evt) {
                let map = evt.map;
                map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
            });
        }
    }

    /**
     * 标注类
     */
    function Mark() {
        this.addFeatureOverlay = function (map,coordinate, style, info) { //添加单点标注
            var pos = ol.proj.fromLonLat(coordinate);
            var lineFeature = new ol.Feature({
                geometry: new ol.geom.Point(pos),
                info: info
            });
            var featureOverlay = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [lineFeature]
                }),
                style: style,
                zIndex: 9999
            });
            map.addLayer(featureOverlay);
            return featureOverlay;
        }
        this.addDom = function (map,domElement, coordinate ) {
            var pos = ol.proj.fromLonLat(coordinate);
            var domOverlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
                element: domElement,
                positioning: 'center-center',
                // offset: [0,0],
            }));
            domOverlay.setPosition(pos);
            map.addOverlay(domOverlay);
            return domOverlay;
        }
        this.removeMark = function (featureOverlay) {
            this.removeLayer(featureOverlay);
        }
        //路径规划,绘制
        this.PathRendering = function (lonLatlinePath) {
            let linePath = [];
            lonLatlinePath.forEach(function (lonLat, key) {
                linePath[key] = ol.proj.fromLonLat(lonLat);
            });
            var startMarker = new ol.Feature({
                type: 'startPoint',
                geometry: new ol.geom.Point(linePath[0])
            });
            var endMarker = new ol.Feature({
                type: 'endPoint',
                geometry: new ol.geom.Point(linePath[linePath.length - 1])
            });
            let geometry = new ol.geom.LineString(linePath);

            var lineFeature = new ol.Feature({
                type: 'line',
                geometry: geometry
            });

            var line = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [lineFeature, startMarker, endMarker]
                }),
                zIndex: 110,
                style: function (feature, resolution) {
                    var styles = [new PanguOl().styles[feature.get('type')]];
                    if (feature.get('type') == "line") {
                        var geometry = feature.getGeometry();
                        var lineDistance = ol.Sphere.getLength(geometry);
                        var stepTotalNum = 30 / resolution;
                        for (var i = 1; i < stepTotalNum; i++) {
                            var start = geometry.getCoordinateAt(i / stepTotalNum);
                            var end = geometry.getCoordinateAt((i + 0.1) / stepTotalNum);
                            var dx = end[0] - start[0];
                            var dy = end[1] - start[1];
                            var rotation = Math.atan2(dy, dx);
                            styles.push(new ol.style.Style({
                                geometry: new ol.geom.Point(end),
                                image: new ol.style.Icon({
                                    src: './Assets/img/openlayer/arrow.png',
                                    anchor: [0.75, 0.5],
                                    rotateWithView: true,
                                    rotation: -rotation
                                }),
                                zIndex: 111
                            }));
                        }
                        return styles;
                    }
                    return styles;
                }
            });
            return line;
        };
        this.cluster = function (map,lonLatlinePath, vectorStyle , scale) {
            var billboardType = lonLatlinePath[0].billboardType;
            let count = lonLatlinePath.length;
            let features = [];
            for (let i = 0; i < count; i++) {
                if (lonLatlinePath[i].longitude && lonLatlinePath[i].latitude) {
                    let position = [Number(lonLatlinePath[i].longitude), Number(lonLatlinePath[i].latitude)];
                    let name;
                    switch (lonLatlinePath[i].billboardType) {
                        case "staff":
                            name = lonLatlinePath[i].user_name;
                            break;
                        case "camera":
                            name = lonLatlinePath[i].device_name;
                            break;
                        case "broadcast":
                            name = lonLatlinePath[i].device_name;
                            break;
                        case "event":
                            name = lonLatlinePath[i].event_name;
                            break;
                    }
                    lonLatlinePath[i].name = name;
                    let coordinates = ol.proj.fromLonLat(position);
                    let feature = new ol.Feature({
                        geometry: new ol.geom.Point(coordinates),
                        info: lonLatlinePath[i]
                    });
                    features.push(feature);
                }
            }
            let source = new ol.source.Vector({
                features: features
            });
            let clusterSource = new ol.source.Cluster({
                distance: 30, //聚合单位：米
                source: source
            });
            let styleCache = {};
            if(scale){
                map.on('postcompose', function(){
                    // 增大半径，最大20
                    scale+=.02;
                    if(scale > 1){
                        scale = .2
                    }
                    clusters.changed();
                });
            }
            let clusters = new ol.layer.Vector({
                source: clusterSource,
                style: function (feature) {
                    let features = feature.get('features');
                    let info = features[0].getProperties("")["info"];
                    let size = features.length;
                    if (!styleCache[billboardType]) {
                        styleCache[billboardType] = {};
                    }
                    let style = styleCache[billboardType][size];
                    if (!style) {
                        if(size > 1){
                            style = vectorStyle(size.toString(),scale);
                            styleCache[billboardType][size] = style;
                        }else {
                            style = vectorStyle(info.name,scale);
                        }
                    }
                    return style;
                },
                zIndex: 99
            });
            map.addLayer(clusters);
            return clusters;
        }
    }

    /**
     * GeoJson类,加载外部矢量数据
     */
    function GeoJson() {
        this.add = function (GeoJson, map , style) {
            let featurs = (new ol.format.GeoJSON()).readFeatures(GeoJson,{
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });
            console.log(featurs)
            var vectorLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features:featurs
                }),
                style: style,
                zIndex: 9999
            });
            map.addLayer(vectorLayer);
            return vectorLayer;
        };
        this.addUrl = function (url, map, width, maxResolution, style) {
            style = style ? style : function (feature, resolution) {
                // console.log(resolution)
                return ((new PanguOl().styles[feature.getGeometry().getType()])(feature, resolution, width));
            };
            var geoVector = new ol.layer.Vector({
                title: 'add Layer',
                source: new ol.source.Vector({
                    url: url,
                    format: new ol.format.GeoJSON(),
                }),
                // minResolution:minResolution,
                maxResolution: maxResolution,
                style: style,
            });
            map.addLayer(geoVector);
            return geoVector;
        }
        this.exportGeoJson = function (features) {
            var kml = new ol.format.GeoJSON(); //初始化GeoJson格式
            var jsonFeature = JSON.parse(kml.writeFeatures(features)); //获取
            return jsonFeature;
        }
    }

    /**
     * 总的承载类
     */
    function PanguOl() {
        //坐标转换
        this.GPS = {
            PI: 3.14159265358979324,
            x_pi: 3.14159265358979324 * 3000.0 / 180.0,
            delta: function (lat, lon) {
                // Krasovsky 1940
                //
                // a = 6378245.0, 1/f = 298.3
                // b = a * (1 - f)
                // ee = (a^2 - b^2) / a^2;
                var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
                var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
                var dLat = this.transformLat(lon - 105.0, lat - 35.0);
                var dLon = this.transformLon(lon - 105.0, lat - 35.0);
                var radLat = lat / 180.0 * this.PI;
                var magic = Math.sin(radLat);
                magic = 1 - ee * magic * magic;
                var sqrtMagic = Math.sqrt(magic);
                dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
                dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
                return {
                    'lat': dLat,
                    'lon': dLon
                };
            },

            //WGS-84 to GCJ-02
            gcj_encrypt: function (wgsLon,wgsLat) {
                if (this.outOfChina(wgsLat, wgsLon))
                // return { 'lat': wgsLat, 'lon': wgsLon };
                    return [wgsLat, wgsLon];

                var d = this.delta(wgsLat, wgsLon);
                // return { 'lat': wgsLat + d.lat, 'lon': wgsLon + d.lon };
                return [ wgsLon + d.lon,wgsLat + d.lat];
            },
            //GCJ-02 to WGS-84
            gcj_decrypt: function (gcjLon,gcjLat) {
                if (this.outOfChina(gcjLat, gcjLon))
                // return { 'lat': gcjLat, 'lon': gcjLon };
                    return [gcjLon,gcjLat];

                var d = this.delta(gcjLat, gcjLon);
                // return { 'lat': gcjLat - d.lat, 'lon': gcjLon - d.lon };
                return [ gcjLon - d.lon ,gcjLat - d.lat];
            },
            //GCJ-02 to WGS-84 exactly
            gcj_decrypt_exact: function (gcjLat, gcjLon) {
                var initDelta = 0.01;
                var threshold = 0.000000001;
                var dLat = initDelta,
                    dLon = initDelta;
                var mLat = gcjLat - dLat,
                    mLon = gcjLon - dLon;
                var pLat = gcjLat + dLat,
                    pLon = gcjLon + dLon;
                var wgsLat, wgsLon, i = 0;
                while (1) {
                    wgsLat = (mLat + pLat) / 2;
                    wgsLon = (mLon + pLon) / 2;
                    var tmp = this.gcj_encrypt(wgsLat, wgsLon)
                    dLat = tmp.lat - gcjLat;
                    dLon = tmp.lon - gcjLon;
                    if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold))
                        break;

                    if (dLat > 0) pLat = wgsLat;
                    else mLat = wgsLat;
                    if (dLon > 0) pLon = wgsLon;
                    else mLon = wgsLon;

                    if (++i > 10000) break;
                }
                //console.log(i);
                // return { 'lat': wgsLat, 'lon': wgsLon };
                return [wgsLat, wgsLon];
            },
            //GCJ-02 to BD-09
            bd_encrypt: function (gcjLat, gcjLon) {
                var x = gcjLon,
                    y = gcjLat;
                var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
                var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
                bdLon = z * Math.cos(theta) + 0.0065;
                bdLat = z * Math.sin(theta) + 0.006;
                return {
                    'lat': bdLat,
                    'lon': bdLon
                };
            },
            //BD-09 to GCJ-02
            bd_decrypt: function (bdLat, bdLon) {
                var x = bdLon - 0.0065,
                    y = bdLat - 0.006;
                var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
                var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
                var gcjLon = z * Math.cos(theta);
                var gcjLat = z * Math.sin(theta);
                return {
                    'lat': gcjLat,
                    'lon': gcjLon
                };
            },
            //WGS-84 to Web mercator
            //mercatorLat -> y mercatorLon -> x
            mercator_encrypt: function (wgsLat, wgsLon) {
                var x = wgsLon * 20037508.34 / 180.;
                var y = Math.log(Math.tan((90. + wgsLat) * this.PI / 360.)) / (this.PI / 180.);
                y = y * 20037508.34 / 180.;
                return {
                    'lat': y,
                    'lon': x
                };
                /*
                 if ((Math.abs(wgsLon) > 180 || Math.abs(wgsLat) > 90))
                 return null;
                 var x = 6378137.0 * wgsLon * 0.017453292519943295;
                 var a = wgsLat * 0.017453292519943295;
                 var y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
                 return {'lat' : y, 'lon' : x};
                 //*/
            },
            // Web mercator to WGS-84
            // mercatorLat -> y mercatorLon -> x
            mercator_decrypt: function (mercatorLat, mercatorLon) {
                var x = mercatorLon / 20037508.34 * 180.;
                var y = mercatorLat / 20037508.34 * 180.;
                y = 180 / this.PI * (2 * Math.atan(Math.exp(y * this.PI / 180.)) - this.PI / 2);
                return {
                    'lat': y,
                    'lon': x
                };
                /*
                 if (Math.abs(mercatorLon) < 180 && Math.abs(mercatorLat) < 90)
                 return null;
                 if ((Math.abs(mercatorLon) > 20037508.3427892) || (Math.abs(mercatorLat) > 20037508.3427892))
                 return null;
                 var a = mercatorLon / 6378137.0 * 57.295779513082323;
                 var x = a - (Math.floor(((a + 180.0) / 360.0)) * 360.0);
                 var y = (1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * mercatorLat) / 6378137.0)))) * 57.295779513082323;
                 return {'lat' : y, 'lon' : x};
                 //*/
            },
            // two point's distance
            distance: function (lonA ,latA , lonB , latB) {
                var earthR = 6371000.;
                var x = Math.cos(latA * this.PI / 180.) * Math.cos(latB * this.PI / 180.) * Math.cos((lonA - lonB) * this.PI / 180);
                var y = Math.sin(latA * this.PI / 180.) * Math.sin(latB * this.PI / 180.);
                var s = x + y;
                if (s > 1) s = 1;
                if (s < -1) s = -1;
                var alpha = Math.acos(s);
                var distance = alpha * earthR;
                return distance;
            },
            outOfChina: function (lat, lon) {
                if (lon < 72.004 || lon > 137.8347)
                    return true;

                if (lat < 0.8293 || lat > 55.8271)
                    return true;
                return false;
            },
            transformLat: function (x, y) {
                var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
                ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
                ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
                ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
                return ret;
            },
            transformLon: function (x, y) {
                var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
                ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
                ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
                ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
                return ret;
            }
        };
        this.measure_line_distance = function (lineGeometry) {
            var length = ol.Sphere.getLength(lineGeometry);
            var output;
            if (length > 100) {
                output = (Math.round(length / 1000 * 100) / 100) +
                    ' ' + 'km';
            } else {
                output = (Math.round(length * 100) / 100) +
                    ' ' + 'm';
            }
            return length;
        }
        //标注的样式
        this.styles = {
            "startPoint": new ol.style.Style({ //开始点
                image: new ol.style.Icon({
                    src: './static/img/scene/start.png',
                    anchor: [0.5, 1],
                    rotateWithView: true,
                    scale: 0.8
                })
            }),
            "endPoint": new ol.style.Style({ //结束点
                image: new ol.style.Icon({
                    src: './static/img/scene/stop.png',
                    anchor: [0.5, 1],
                    rotateWithView: true,
                    scale: 0.8
                })
            }),
            'Point': function (feature, resolution) {
                return new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 5,
                        fill: null,
                        stroke: new ol.style.Stroke({
                            color: 'red',
                            width: 1
                        })
                    })
                })
            },
            'Polygon': function (name) {
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'blue',
                        lineDash: [4],
                        width: 3
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(0, 0, 255, 0.1)'
                    }),
                    text: new ol.style.Text({
                        fill: new ol.style.Fill({
                            color: '#fff'
                        }),
                        text:  name
                    })
                })
            },
            'Circle': function (feature, resolution) {
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'red',
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255,0,0,0.2)'
                    })
                })
            },
            "buildingStyle": function (feature, resolution) {
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'blue',
                        lineDash: [4],
                        width: 3
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(0, 0, 255, 1)'
                    })
                })
            },
            'draw': new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 4 * 2,
                    fill: new ol.style.Fill({
                        color: [0, 153, 255, 1]
                    }),
                    stroke: new ol.style.Stroke({
                        color: [255, 255, 255, 1],
                        width: 4 / 2
                    })
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                zIndex: 999
            }),
            "change": new ol.style.Style({
                image: new ol.style.Icon({
                    src: './static/image/biaozhu-RED.png',
                    rotateWithView: true
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#f12',
                    width: 2
                })
            }),
            "line": new ol.style.Style({
                fill: new ol.style.Fill({
                    color: "#333",
                    width: 8
                }),
                stroke: new ol.style.Stroke({
                    color: '#58aeff',
                    width: 8
                })
            }),
            "yellowPoint": new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 8,
                    fill: new ol.style.Fill({
                        color: '#fab91f'
                    }),
                    stroke: new ol.style.Stroke({
                        color: [250, 185, 31, 0.5],
                        width: 8
                    })
                }),
                zIndex: 999
            })
        };
    }

    PanguOl.prototype.Map = new Map(); //Map类
    PanguOl.prototype.EvenetHandle = new EvenetHandle(); //Map类
    PanguOl.prototype.Measure = new Measure(); //Map类
    PanguOl.prototype.Mark = new Mark(); //Map类
    PanguOl.prototype.Layer = new Layer(); //Map类
    PanguOl.prototype.View = new View(); //View类
    PanguOl.prototype.Draw = new Draw(); //绘制类
    PanguOl.prototype.GeoJson = new GeoJson(); //GeoJson类
    TF.PanguOl = new PanguOl();
})(TF);


