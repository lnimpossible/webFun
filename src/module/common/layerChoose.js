(function(TF){
    var nodeStr='<div class="layer-choose">'+
                    '<span class="layer-txt">图层选择</span>'+
                    '<div class="layer-choose-content">'+
                        '<img class="layer-choose-camera" src="static/image/layout/common/layer-choose-camera2.png" alt="">'+
                        '<img class="layer-choose-personnel" src="static/image/layout/common/layer-choose-personnel2.png" alt="">'+
                    '</div>'+
                    '<div class="layer-choose-button">'+
                        '<img class="layer-choose-ensure" src="static/image/layout/common/layer-choose-button.png" alt="">'+
                        '<span class="ensure-txt">确定</span>'+
                        '<img class="layer-choose-cancel" src="static/image/layout/common/layer-choose-button.png" alt="">'+
                        '<span class="cancel-txt">取消</span>'+
                    '</div>'+
                '</div>'
    TF.genLayerChoose=function(selector){
        $(selector).append(nodeStr);
    }
})(TF)