(function (TF) {
    class Tdve  {
        constructor(a, b) {
            this.view = undefined;
            this.map = undefined;
            return this;
        }
        init(targetId){
            this.view = TF.PanguOl.View.init([119.98683260872604, 30.392343700034182], 16, 13, 20);
            this.map = TF.PanguOl.Map.init(targetId, this.view);
            this.map.addLayer(TF.PanguOl.Layer.tian_di_tu_satellite_layer); //添加天地图影像
            this.map.addLayer(TF.PanguOl.Layer.tian_di_tu_text_layer); //添加天地图标注影像
        }

    }
    TF.Tdve = new Tdve();
})(TF);



