const scriptSrc = [
	'./src/components/stationary/stationary.js',
	'./src/components/ejection/layerChose.js',
	'./src/components/ejection/angleName.js',
	'./src/components/ejection/groupName.js',
	'./src/components/ejection/situationHandleChose.js',
	'./src/components/ejection/situationVerify.js',
	'./src/components/ejection/taskHandle.js',
	'./src/components/ejection/taskVerify.js',
	'./src/components/ejection/taskRefuseVerify.js',
	'./src/components/newestChat/newestChat.js',
	'./src/components/newestSituation/newestSituation.js',
	'./src/components/thingDetail/cameraDetails.js',
	'./src/components/thingDetail/broadcastDetails.js',
	'./src/components/thingDetail/personDetails.js',
	'./src/components/thingDetail/fireHydrantDetails.js',
	'./src/components/thingDetail/waterPressureDetails.js',
	'./src/components/thingDetail/pm25Details.js',
	'./src/components/thingDetail/situationDetails.js',
	'./src/components/thingDetail/buildingDetails.js',
	'./src/components/thingDetail/taskDetails.js',
	'./src/components/thingDetail/planDetails.js',
	'./src/components/selectedThing/selectedCamera.js',
	'./src/components/selectedThing/selectedHydrant.js',
	'./src/components/selectedThing/selectedPerson.js',
	'./src/components/selectedThing/selectedThing.js',
	'./src/components/chosePerson/chosePerson.js',
	'./src/components/chosePerson/choseTaskPerson.js',
	'./src/components/newTask/newTask.js',
	'./src/components/newSituation/newSituation.js',
	'src/components/notice/notice.js',
	'src/components/trackerDate/trackerDate.js',
	'src/components/announcement/announcement.js',

	'src/js/action.js',
	'src/route.js',

	'src/js/earth/earthData.js',
	'src/js/earth/viewerCesiumNavigationMixin.js',
	'src/js/earth/layerManage.js',
	'src/js/earth/CesiumGeometry.js',
	'src/js/earth/earthCommon.js',
	'src/js/earth/earthExecute.js',
	'src/js/earth/clipModel.js',
	'src/js/earth/geometryController.js',
	'src/js/earth/screenEventHandler.js',
	'src/js/earth/sceneController.js',
	'src/js/earth/earthInit.js',
	'lib/js/echarts.min.js',
	'lib/js/md5.js',
	'lib/js/swiper.min.js',
	'lib/js/niceScroll.js',
	'lib/js/runNumber.js',
	'src/components/chart/echarts_option.js',
	'src/components/chart/index.js',

	'lib/plugin/map/ol_v5.0.3.js',
	'src/js/map/PanguOl.js',
	'src/js/map/Tdve.js',
	'src/js/map/execute.js',
	'src/js/map/move-line.js'
]
scriptSrc.forEach(function(src){
	document.write('<script src="'+src+'"></script>');
})
