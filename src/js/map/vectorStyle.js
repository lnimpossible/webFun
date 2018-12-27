(function (TF) {
    let vectorLayer = {
        camera: function (text) {
            return new ol.style.Style({
                image: new ol.style.Icon({
                    scale: .7,
                    src: "./Assets/img/mapimg/icon-camera.png"
                }),
                text: new ol.style.Text({
                    offsetY: -35,
                    fill: new ol.style.Fill({
                        color: '#fff'
                    }),
                    text: text,
                    placement: 'point',
                    //标签的边框
                    backgroundStroke: new ol.style.Stroke({
                        color: '#00fbf8',
                        width: 1
                    }),
                    //标签的背景填充
                    backgroundFill: new ol.style.Fill({
                        color: 'rgba(20,15,86,0.5)'
                    }),
                    padding: [2, 10, 2, 10]
                }),

            })
        },
        broadcast: function (text) {
            return new ol.style.Style({
                image: new ol.style.Icon({
                    scale: .7,
                    src: "./Assets/img/mapimg/icon-radio.png"
                }),
                text: new ol.style.Text({
                    offsetY: -35,
                    fill: new ol.style.Fill({
                        color: '#fff'
                    }),
                    text: text,
                    placement: 'point',
                    //标签的边框
                    backgroundStroke: new ol.style.Stroke({
                        color: '#00fbf8',
                        width: 1
                    }),
                    //标签的背景填充
                    backgroundFill: new ol.style.Fill({
                        color: 'rgba(20,15,86,0.5)'
                    }),
                    padding: [2, 10, 2, 10]
                }),

            })
        },
        staff: function (text) {
            return new ol.style.Style({
                image: new ol.style.Icon({
                    scale: .7,
                    src: "./Assets/img/mapimg/icon-people.png"
                }),
                text: new ol.style.Text({
                    offsetY: -35,
                    fill: new ol.style.Fill({
                        color: '#fff'
                    }),
                    text: text,
                    placement: 'point',
                    //标签的边框
                    backgroundStroke: new ol.style.Stroke({
                        color: '#00fbf8',
                        width: 1
                    }),
                    //标签的背景填充
                    backgroundFill: new ol.style.Fill({
                        color: 'rgba(20,15,86,0.5)'
                    }),
                    padding: [2, 10, 2, 10]
                }),
            })
        },
        event: function (text, scale) {
            return new ol.style.Style({
                image: new ol.style.Icon({
                    scale: scale,
                    src: "./Assets/img/mapimg/icon_level2.png"
                }),
                text: new ol.style.Text({
                    offsetY: -25,
                    fill: new ol.style.Fill({
                        color: '#fff'
                    }),
                    text: text,
                    placement: 'point',
                    //标签的边框
                    backgroundStroke: new ol.style.Stroke({
                        color: '#00fbf8',
                        width: 1
                    }),
                    //标签的背景填充
                    backgroundFill: new ol.style.Fill({
                        color: 'rgba(20,15,86,0.5)'
                    }),
                    padding: [2, 10, 2, 10]
                }),
            });
        }
    };
    TF.map.vectorLayer  = vectorLayer;
})(TF);
