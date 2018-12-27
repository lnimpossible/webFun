/**
 * Created by Administrator on 2018/3/13/013.
 */
function ScreenEventHandler() {
    var viewer = Pangu.Data.viewer;
    var handler = new Pangu.ScreenSpaceEventHandler(viewer.scene.canvas);
    this.clickObject=null;
    this.clickObjectId=null;
    this.mouseMoveObjectId=null;
    this.mouseMoveObject=null;
    this.pickedObject=null;
    ScreenEventHandler.prototype.init=function () {
        viewer.screenSpaceEventHandler.removeInputAction(Pangu.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);//移除自带双击事件
        var that=this;
        handler.setInputAction(function (movement) {
            if($('#panguContainer').parent('div').hasClass('m1-small_item')){
                return;
            }
            var pickedObject = viewer.scene.pick(movement.position);
            console.log(pickedObject);
            if(pickedObject&&pickedObject.id){
                if(that.clickObject&&that.clickObject.recovery){
                    that.clickObject.recovery(that,'click');
                    that.clickObject.clicked=false;
                }//清除上一个点击的状态
                pickedObject.id.click&&pickedObject.id.click(pickedObject,that);//当前点击执行
                that.clickObject=pickedObject.id;
                that.clickObjectId=pickedObject.id.id;//点击自己引出自己的情况
                that.clickObject.pickedObject=pickedObject;
            }

            that.recovery(pickedObject,'click');
        }, Pangu.ScreenSpaceEventType.LEFT_CLICK);
         handler.setInputAction(function (movement) {
             var pickedObject = viewer.scene.pick(movement.endPosition);
             if(pickedObject&&pickedObject.id){
                 if(pickedObject.id.id&&(pickedObject.id.id===that.mouseMoveObjectId)){ return;}
                 // if(pickedObject.id.id&&(pickedObject.id.id===that.mouseMoveObjectId||pickedObject.id.id===that.clickObjectId)){ return;}
                 pickedObject.id.mouseMove&&pickedObject.id.mouseMove(pickedObject,that);
                 that.mouseMoveObject=pickedObject.id;
                 that.mouseMoveObjectId=pickedObject.id.id;
                 that.mouseMoveObject.pickedObject=pickedObject;
             }
             //滑过空白时候恢复上一个滑过 实体状态
             that.recovery(pickedObject,'mouseMove');
         }, Pangu.ScreenSpaceEventType.MOUSE_MOVE);
    };
    /*空白位置恢复*/
    ScreenEventHandler.prototype.recovery=function (pickedObject,eventType) {
        //|| (!Pangu.defined(pickedObject.id.isGeometry))
        //操作空白模型时操作
        if (!Pangu.defined(pickedObject) || (!Pangu.defined(pickedObject.id))) {
            if(eventType==='click'){
                this.clickObject&&this.clickObject.recovery&&this.clickObject.recovery(this,'click');
                this.clickObjectId=null;
                this.clickObject=null;
                // exposeFromJQ.clearCesiumPick();
                // constantData.state.isOpenCamera&&CSharpControler.hideCameraScreen();
                // constantData.state.isOpenCamera=false;
                return;
            }
            if(eventType==='mouseMove'&&this.mouseMoveObjectId&&this.mouseMoveObject.mouseMove&&this.mouseMoveObject.recovery){
                if(this.mouseMoveObjectId!=this.clickObjectId){
                    this.mouseMoveObject.recovery(this,'mouseMove');
                    this.mouseMoveObjectId=null;
                    this.mouseMoveObject=null;
                }
            }
        }
    }
    this.init();
    return this;
};
