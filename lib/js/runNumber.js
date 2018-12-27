(function ($) {
    $.fn.extend({
        runNum:function (val,params) {
            var valString = val || '70225800'
            var par= params || {};
            var runNumJson={
                el:$(this),
                value:valString,
                valueStr:valString.toString(10),
                width:par.width || 40,
                height:par.height || 50,
                addMin:par.addMin || 10000,
                addMax:par.addMax || 99999,
                interval:par.interval || 3000,
                speed:par.speed || 2000,
                width:par.width || 40,
                length:valString.toString(10).length
            };
            $._runNum._list(runNumJson.el,runNumJson);
//          $._runNum._interval(runNumJson.el.children("li"),runNumJson);
            this.runNumJson=runNumJson;
//          this.randomUpdate();
            return this
        },
        runNumJson:null,
        update:function(num){
        	if(this.runNumJson.length !== num.toString(10).length){
        		this.runNumJson.length = num.toString(10).length;
        		this.runNumJson.value = num;
        		$._runNum._list(this.runNumJson.el,this.runNumJson);
        	}
        	$._runNum._animate(this.runNumJson.el.children("li"), num.toString(10), this.runNumJson);
        },
        randomUpdate:function(){
        	$._runNum._interval(this.runNumJson.el.children("li"),this.runNumJson);
        }
    });
    /*jQuery对象添加  _runNum  属性*/
    $._runNum={
        /*初始化数字列表*/
        _list:function (el,json) {
            var str='';
            var elWidth = el.width();
            el.html('');
            for(var i=0; i<json.length;i++){
//              var w=json.width*i;
				var w=json.width*i+(elWidth-json.width*json.length)/2;
                var t=json.height*parseInt(json.valueStr[i]);
                var h=json.height*10;
                str +='<li style="width:'+json.width+'px;left:'+w+'px;top: '+-t+'px;height:'+h+'px;">';
                for(var j=0;j<10;j++){
                    str+='<div style="height:'+json.height+'px;line-height:'+json.height+'px;">'+j+'</div>';
                }
                str+='</li>';
            }
            el.html(str);
        },
        /*生成随即数*/
        _random:function (json) {
            var Range = json.addMax - json.addMin;
            var Rand = Math.random();
            var num=json.addMin + Math.round(Rand * Range);
            return num;
        },
        /*执行动画效果*/
        _animate:function (el,value,json) {
            for(var x=0;x<json.length;x++){
                var topPx=value[x]*json.height;
                el.eq(x).animate({top:-topPx+'px'},json.speed);
            }
        },
        /*定期刷新动画列表*/
        _interval:function (el,json) {
            var val=json.value;
            setInterval(function () {
                val+=$._runNum._random(json);
                $._runNum._animate(el,val.toString(10),json);
            },json.interval);
        }
    }
})(jQuery);