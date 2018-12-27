/*
 * 日常管控模块
 */

$(function(){
	let monitorCenterBox = document.getElementById("monitor-center-box");
	let userInfo = TF.LoginCache.userInfo;
/* 页面初始化内容 */
	if(userInfo.avatar){
		$('.personal-info-avatar')[0].style.backgroundImage = 'url('+userInfo.avatar+')';
	}else{
		$('.personal-info-avatar').html(userInfo.nickname.slice(-2));
	}

	// 情况预览
	TF.genDeviceEvent('.situation-preview');
	// 地理信息场景控制
	TF.genGeoSceneControl('menu-control-wrap1')

	// 商务区实有人口
	TF.genTotalPeopleChart('#monitor-lb');
    // 商务区安全态势
    TF.gensecurityState('#monitor-rb2');
    
    // 商务区安居,商业,治理指数
    TF.genLiveNorm('#monitor-r1');
	TF.genBusinessNorm('#monitor-r2');
	TF.genManageNorm('#monitor-r3')
	
// 地理信息场景图标点击事件	
	TF.showGeoThingInfo = function(info){
		console.log(info)
		TF.openNewFunction('thingDetail', info);
	}
	
/*
 * 打开和关闭新功能的浮窗面板
 * functionType： 功能类型
 * 				personalCenter 个人中心
 * 				chat 聊天功能
 * 				geo  点击三维场景图标，显示设备信息
 * 				nearbyThing 周边设备
 * 				createTask  创建任务
 */
	TF.openNewFunction = function(functionType, info){
		$('.monitor-center').show();
		$('.chat-box').hide();
		monitorCenterBox.innerHTML = '';
		switch(functionType){
			case 'personalCenter': // 个人中心
				TF.genPersonalCenter('monitor-center-box');
			break;
			case 'personalModify': // 个人信息修改
				TF.genModidyInfo('monitor-center-box');
			break;
			case 'chat':           // 聊天
				$('.monitor-center').hide();
				$('.chat-box').show();
				TF.updateScroll()
				if(info!==undefined){
					var itemData = info;
					itemData.content='';
			      	TF.chatEffect.insertChatItem(itemData);
				}
			break;
			case 'thingDetail':            // 三维场景图标详细信息
				filterThing(info)
			break;
			case 'multipleThing':  // 多个设备,人员列表
				filterMultipleThing(info)
			break;
			case 'createTask':     // 创建任务
				TF.genNewTask('monitor-center-box',info)
			break;
			case 'choseTaskPerson':    // 选择任务人员
				TF.genChoseTaskPerson('monitor-center-box', info)
			break;
			case 'chosePerson':    // 选择人员
				TF.genChoicePerson('monitor-center-box')
			break;
			case 'choseLayer':     // 选择图层
				TF.genLayerChoose('monitor-center-box')
			break;
			case 'angleName':      // 视角名称
				TF.genAngleName('monitor-center-box')
			break;
			case 'groupName':      // 群名称
				TF.genGroupName('monitor-center-box', info)
			break;
			case 'situationHandle':  // 选择情况处理方式
				TF.genSituationHandle('monitor-center-box',info)
			break;
			case 'situationVerify':  // 选择情况处理方式
				TF.genSituationVerify('monitor-center-box',info)
			break;
			case 'taskHandle':  // 接受和拒绝任务
				TF.genTaskHandle('monitor-center-box',info)
			break;
			case 'taskVerify':  // 审核任务
				TF.genTaskVerify('monitor-center-box',info)
			break;
			case 'taskRefuseVerify':  // 审核任务拒绝
				TF.genTaskRefuseVerify('monitor-center-box',info)
			break;
			case 'trackerDate':  // 人员轨迹时间选择
				TF.genTrackerDate('monitor-center-box',info)
			break;
			case 'announcement':  // 公告
				TF.genAnnouncement('monitor-center-box')
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
})
