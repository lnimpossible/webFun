(function (TF) {
    class Utils{}
    const REPLACE_TABLE = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    }
    Utils._replaceTag = (tag) => {
        return REPLACE_TABLE[tag] || tag
    }
    Utils.safe_tags_replace = (str) => {
        return str.replace(/[&<>]/g, Utils._replaceTag)
    }
    Utils.imageCompress=function (fileObj, callback) {
        if ( typeof (FileReader) === 'undefined') {
            console.log("当前浏览器内核不支持base64图标压缩");
            //调用上传方式不压缩
            this.toBase64(fileObj,callback);
        } else {
            try {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var image = new Image();
                    image.onload=function(){
                        var square = 30,   //定义画布的大小，也就是图片压缩之后的像素
                            canvas = document.createElement('canvas'),
                            context = canvas.getContext('2d'),
                            imageWidth = 0,    //压缩图片的大小
                            imageHeight = 0,
                            offsetX = 0,
                            offsetY = 0,
                            data = '';
                        canvas.width = square;
                        canvas.height = square;
                        context.clearRect(0, 0, square, square);
                        if (this.width > this.height) {
                            imageWidth = Math.round(square * this.width / this.height);
                            imageHeight = square;
                            offsetX = - Math.round((imageWidth - square) / 2);
                        } else {
                            imageHeight = Math.round(square * this.height / this.width);
                            imageWidth = square;
                            offsetY = - Math.round((imageHeight - square) / 2);
                        }
                        context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
                        var data = canvas.toDataURL('image/jpg');
                        //压缩完成执行回调
                        callback(data);
                    };
                    image.src= e.target.result;
                };
                reader.readAsDataURL(fileObj);
            }catch(e){
                console.log("压缩失败!");
                //调用直接上传方式  不压缩
                this.toBase64(fileObj,callback);
            }
        }
    }
    Utils.toBase64=function (fileObj,callback) {
        var r = new FileReader();
        // 转成base64
        r.onload = function(e){
            //变成字符串
            var imgBase64 = r.result;
            console.log(imgBase64);
            // console.log(e.target.result);
            // console.log(this.result);
            callback(imgBase64);
        }
        r.readAsDataURL(fileObj);
    }
    Utils.guid=function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    Utils.dateFtt=function(fmt,date)
    {
        var o = {
            "M+" : date.getMonth()+1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : date.getSeconds(),                 //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S"  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    }
    Utils.createTimeFormat=function(createTime){
        return Utils.dateFtt("yyyy-MM-dd hh:mm:ss",createTime);//直接调用公共JS里面的时间类处理的办法
    }
    function Base64() {

        // private property
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        // public method for encoding
        this.encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        }

        // public method for decoding
        this.decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        }

        // private method for UTF-8 encoding
        _utf8_encode = function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        }

        // private method for UTF-8 decoding
        _utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }
    window.base64=new Base64();
    TF['Utils']=Utils;
})(TF)
