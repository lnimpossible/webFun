(function(TF){
    var nodeStr='<div class="radio-broadcast">'+
                    '<div>'+
                        '<img class="radio-broadcast-left" src="static/image/layout/common/radio-broadcast-left.png" alt="">'+
                        '<img class="radio-broadcast-right" src="static/image/layout/common/radio-broadcast-right.png" alt="">'+
                    '</div>'+
                    '<div class="radio-broadcast-voice">'+
                        '<span>语音播报</span>'+
                    '</div>'+
                    '<div class="radio-broadcast-text">'+
                            '<span>语音播报</span>'+
                    '</div>'+
                '</div>'
    TF.genRadioBroadcast=function(selector){
        $(selector).append(nodeStr);
    }
})(TF)