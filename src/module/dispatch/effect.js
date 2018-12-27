(function(TF){
	let userInfo = TF.LoginCache.userInfo;
	let currentHandingSituation;
//	$('.personal-info-avatar')[0].style.backgroundImage = 'url('+userInfo.avatar+')';
	if(userInfo.avatar){
		$('.personal-info-avatar')[0].style.backgroundImage = 'url('+userInfo.avatar+')';
	}else{
		$('.personal-info-avatar').html(userInfo.nickname.slice(-2));
	}
/* 页面初始化 */
	// 情况预览
	TF.genDeviceEvent('.dispatch-situation-preview');

	// 地理信息场景控制
	TF.genGeoSceneControl('menu-control-wrap2');
	// 左下角任务完成率
//	TF.genWireframeBGWaveBar('#dispatch-lb');
	// 右下角情况统计
//	TF.genAreaStyleLine('.dispatch-rb');
	
	TF.showGeoThingInfo = function(info){
		TF.openNewFunction('thingDetail', info);
	}
	TF.openNewFunction = function(functionType, info){
		$('.dispatch-center').show();
		$('.dispatch-center-box').empty();
		$('.chat-box').hide();
		switch(functionType){
			case 'personalCenter': // 个人中心
				TF.genPersonalCenter('dispatch-center-box');
			break;
			case 'personalModify': // 个人信息修改
				TF.genModidyInfo('dispatch-center-box');
			break;
			case 'chat':           // 聊天
				$('.dispatch-center').hide();
				$('.chat-box').show();
				if(info!==undefined){
					var itemData = info;
					itemData.content='';
			      	TF.chatEffect.insertChatItem(itemData);
				}
			break;
			case 'thingDetail':            // 三维场景图表详细信息
				filterGeoThing(info)
			break;
			case 'multipleThing':  // 多个设备,人员列表
				filterMultipleThing(info)
			break;
			case 'createTask':     // 创建任务
				TF.genNewTask('dispatch-center-box',info)
			break;
			case 'createSituation':     // 创建情况
				TF.genNewSituation('dispatch-center-box',info)
			break;
			case 'choseTaskPerson':    // 选择任务人员
				TF.genChoseTaskPerson('dispatch-center-box',info)
			break;
			case 'chosePerson':    // 选择人员
				TF.genChoseTaskPerson('dispatch-center-box')
			break;
			case 'choseLayer':     // 选择图层
				TF.genLayerChoose('dispatch-center-box')
			break;
			case 'angleName':      // 选择图层
				TF.genAngleName('dispatch-center-box')
			break;
			case 'groupName':      // 群名称
				TF.genGroupName('dispatch-center-box',info)
			break;
			case 'handleSituation':      // 管理员处理情况
				filterHandleSituation(info)
			break;
			case 'situationHandle':  // 选择情况处理方式
				TF.genSituationHandle('dispatch-center-box',info)
			break;
			case 'situationVerify':  // 审核情况
				TF.genSituationVerify('dispatch-center-box',info)
			break;
			case 'taskHandle':  // 接受和拒绝任务
				TF.genTaskHandle('dispatch-center-box',info)
			break;
			case 'taskVerify':  // 审核任务
				TF.genTaskVerify('dispatch-center-box',info)
			break;
			case 'taskRefuseVerify':  // 审核任务拒绝
				TF.genTaskRefuseVerify('dispatch-center-box',info)
			break;
			case 'trackerDate':  // 人员轨迹时间选择
				TF.genTrackerDate('dispatch-center-box',info)
			break;
			case 'announcement':  // 公告
				TF.genAnnouncement('dispatch-center-box')
			break;
		}
	}
	TF.closeNewFunction = function(){
		$('#module-center').hide();
		$('.dispatch-center-box').innerHTML = '';
		$('.handle-situation-btn').removeClass('handle-situation-btn-active');
	}

	function filterGeoThing(info){
		let type = (typeof info == 'string')? info:info.billboardType||info.type;
		if(type == 'building'){
			TF.switchModule('inside')
			return
		}
		let camelType = toCamel(type);
		let funName = 'gen'+camelType+'Details';
		TF[funName]('dispatch-center-box', info)
	}
	
	function filterHandleSituation(info){
		switch(info){
			case 'communicate':
				TF.genChoicePerson('dispatch-center-box')
			break;
			case 'deviceControl':
				TF.genSelectedThing('dispatch-center-box')
			break;
			case 'dispatchTask':
				TF.genNewTask('dispatch-center-box', {situation: currentHandingSituation})
			break;
		}
	}
	function filterMultipleThing(info){
		let type = info.thingType||info;
		let camelType = toCamel(type)
		let funName = 'genSelected'+camelType;
		TF[funName]('dispatch-center-box', info)
	}
	TF.handleSituation = function(data){
		currentHandingSituation = data;
		$('.global-search').hide();
		$('.handle-situation').css('display', 'flex');
		$('.situation-range-wrap').css('display', 'flex');
	}
	TF.cancelHandleSituation = function(){
		$('.global-search').show();
		$('.handle-situation').hide();
		$('.situation-range-wrap').hide();
	}
	
	function toCamel(str){
		let initial = str.slice(0,1).toUpperCase();
		let afterBody = str.slice(1)
		return initial+afterBody
	}

})(TF)
