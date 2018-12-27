(()=>{
    class InsideEffect{
        constructor(){
            this.init();
        }
        init(){
            let that=this;
            let unitIndex=TF.currentFloorData.unitIndex;//单元下标
            let floor=TF.currentFloorData.floor;//当前选中楼层
            console.log(TF.currentFloorData);
            let buildname = document.getElementsByClassName('inset-header-name')[0];// building名称dom
            let list = document.getElementsByClassName('inset-element-floorlist-ul')[0];  // 楼层列表dom
            let myCharts = echarts.init(document.getElementById('inset-chart')); // 图表dom
            buildname.innerHTML = TF.buildingData.name;// 更改building名称
            // 更改楼层层数
            console.log(unitIndex);
            let floor_list =  TF.buildingData.unit_list[Number(unitIndex)].floor_list;//楼层列表信息
            let ulInnerHTML = '';
            floor_list.forEach( (val, index)=>{
                let selectedClass=val.floor==floor?'inset-element-floor-click':'';
                ulInnerHTML += `<li class="inset-element-flooritem ${selectedClass}" index="${index}" floor_id= "${val.floor_id}">${val.floor}</li>`;
            })
            list.innerHTML = ulInnerHTML;
            this.updateRoomList(TF.currentFloorData.floor_id);//更新房间信息
            myCharts.setOption(echartsOption.insidePagePie());//图表
            //楼层点击
            $('.inset-element-flooritem').bind('click',function (e) {
                // $(this)
                let currentLi = e.target,
                    index = currentLi.getAttribute('index'),
                    floor_id = currentLi.getAttribute('floor_id');
                // 点击到ul  index = null
                if (index == null) {
                    return;
                } else {
                    // 展示该楼层平面图
                    TF.currentFloorData = floor_list[index];
                    $(this).addClass('inset-element-floor-click').siblings().removeClass('inset-element-floor-click');
                    TF.Inside_2D.changePlan();
                    that.updateRoomList(floor_id);   // 更新楼层房间信息
                }
            });
        }
        updateRoomList(floor_id) {
            let roomList = document.getElementsByClassName('inset-element-infolist')[0].getElementsByTagName('ul')[0];
            let roomListInfo = '';
            let name = TF.buildingData.name;
            // 更新当前楼层房间信息
            TF.requestData.getRoomList(floor_id).then(function(res){
                res.forEach( (val, index)=> {
                    var peosonList = ``;
                    if(val.live_person_list.length > 0){
                        val.live_person_list.forEach(function (person) {
                            var name = person.split(',')[0];
                            var card = person.split(',')[1];
                            var tel = person.split(',')[2];
                            if(name) peosonList+= `<div class="inset-element-infoitem-bottom">居住人：${name} ${card}</div>`;
                        });
                    }
                    roomListInfo +=  `<li id=${val.room_number} class="inset-element-infoitem" onclick='TF.Inside_2D.fitView(this,${val.room_number})'>
                                        <div class="inset-element-infoitem-top">
                                            <span class="inset-element-infoitem-topleft">${name}${val.room_number}</span>
                                            <span class="inset-element-infoitem-topright">${val.room_number}室</span>
                                        </div>
                                        <div class="inset-element-infoitem-bottom">性质：${val.type}</div>
                                        ${peosonList}
                                    </li>`;
                });
                roomList.innerHTML = roomListInfo;
            });
        }
    }
    TF.insideEffect=new InsideEffect();
    
    let insideCenterBox = document.getElementById("inside-center-box");
    TF.openNewFunction = function(functionType, info){
		$('.inside-center').show();
		insideCenterBox.innerHTML = '';
		switch(functionType){
			case 'personalCenter': // 个人中心
				TF.genPersonalCenter('monitor-center-box');
			break;
			case 'personalModify': // 个人信息修改
				TF.genModidyInfo('monitor-center-box');
			break;
			case 'thingDetail':            // 三维场景图标详细信息
				filterThing(info)
			break;
		}
	}
	TF.closeNewFunction = function(){
		$('.monitor-center').hide();
		monitorCenterBox.innerHTML = '';
	}
	TF.hideNewFunction = function(){
		$('#module-center').hide()
	}
	TF.showNewFunction = function(){
		$('#module-center').show()
	}
	
	function filterThing(info){
		let type = (typeof info == 'string')? info:info.billboardType||info.type;
		let camelType = toCamel(type)
		let funName = 'gen'+camelType+'Details';
		TF[funName]('monitor-center-box', info)
	}
	
	function filterMultipleThing(info){
		let type = (typeof info == 'string')? info:info.thingType;
		let camelType = toCamel(type)
		let funName = 'genSelected'+camelType;
		TF[funName]('monitor-center-box', info)
	}
	function toCamel(str){
		let initial = str.slice(0,1).toUpperCase();
		let afterBody = str.slice(1)
		return initial+afterBody
	}
})()