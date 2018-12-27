
(function(TF){
    var dataList=[
        {image:"static/image/layout/common/bg-chat-photo.png",content:"广富林路与光星路交口发生拥堵啦。广富林路与光星路交口发生拥堵啦。"},
        {image:"static/image/layout/common/bg-chat-photo.png",content:"广富林路与光星路交口发生拥堵。"}
    ];
    var dataListStr='';
    dataList.forEach(function(val){
        var starColor;
        if(val.grade===1){
            starColor='red';
        }else{
            starColor='yellow';
        }
        dataListStr+='<div class="person-event-info">'+
                        '<p class="no-select over-ellipsis">'+val.content+'</p>'+
                        '<img class="person-event-photo" src='+val.image+' alt="">'+
                    '</div>'
    })
    var nodeStr='<div class="person-event-list">'+
                    dataListStr+
                '</div>'
    TF.genPersonEvent=function(selector){
        $(selector).append(nodeStr);
    }
})(TF)