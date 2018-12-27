
(function(TF){
    var dataList=[
        {grade:1,event:"001号摄像头掉线",device:"设备报警"},
        {grade:1,event:"001号摄像头移动侦测报警",device:"设备报警"},
        {grade:2,event:"002号摄像头无信号",device:"APP"},
        {grade:2,event:"火灾紧急报警",device:"APP"},
        {grade:2,event:"火灾紧急报警",device:"APP"},
    ];
    var dataListStr1='';
    var dataListStr2='';
    dataList.forEach(function(val){
        var starColor;
        if(val.grade===1){
            starColor='red';
            dataListStr1+='<div class="device-event-info">'+
                            '<i class="fa fa-star '+starColor+'"></i>'+
                            '<span class="no-select">'+val.event+' —— </span>'+
                            '<span class="no-select">'+val.device+'</span>'+
                        '</div>'
        }else{
            starColor='yellow';
            dataListStr2+='<div class="device-event-info">'+
                            '<i class="fa fa-star '+starColor+'"></i>'+
                            '<span class="no-select">'+val.event+' —— </span>'+
                            '<span class="no-select">'+val.device+'</span>'+
                        '</div>'
        }
        
    })
    var nodeStr='<div class="device-event-list">'+
                    '<hr style="border:1px dashed #2059a8;width: 160px;margin-left:10px"/>'+
                    dataListStr1+
                    '<hr style="border:1px dashed #2059a8;width: 160px;margin-left:10px"/>'+
                    dataListStr2+
                    '<div class="device-event-more">'+
                        '<hr class="device-event-line no-select">'+
                        '<span class="device-event-txt no-select">更多 >></span>'+
                    '<div>'
                '</div>';
    TF.genDeviceEvent=function(selector){
        $(selector).append(nodeStr);
        $('.device-event-info').click(function(){
            if(ControlVar.moduleName == 'dispatch'){
                $(this).toggleClass('event-current').siblings().removeClass('event-current');
                if($('.device-event-info').hasClass('event-current')){
                    TF.handleSituation();
                }else{
                    TF.cancelHandleSituation();
                }
            }
        });
        $('.device-event-txt').click(function(){
        	if(ControlVar.moduleName == 'monitor'){
        		TF.switchModule('dispatch');
        	}else if(ControlVar.moduleName == 'dispatch'){
        		TF.dispatchMenuClick(2)
        	}
        })
    }
})(TF)