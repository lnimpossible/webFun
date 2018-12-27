$(function(){
	switchModule('monitor')

	/*模块切换*/
	function switchModule(moduleName, cb){
		ControlVar.moduleName = moduleName;
		$('.module-wrap').children().remove();
//		$('.module-wrap')[0].innerHTML = '';
        $('#panguContainer').show();
		$('.geo-scene-switch').show();
		$('.menu-master-wrap').show();
//		$('.menu-master-wrap').removeClass('hign-index')
		switch(moduleName){
			case 'monitor':  // 日常监控

				$('.module-wrap').load('./src/module/monitor/index.html');
			break;
			case 'dispatch': // 指挥调度
				$('.module-wrap').load('./src/module/dispatch/index.html', function(){
					if(cb){
						var fun = new Function('return '+cb);
						fun()
					}
				});
			break;
			case 'analysis': // 数据分析
				$('.geo-scene-switch').hide();
                $('#panguContainer').hide();
				$('.module-wrap').load('./src/module/analysis/index.html');
			break;
			case 'special':  // 专题查看
				$('.geo-scene-switch').hide();
                $('#panguContainer').hide();
				$('.module-wrap').load('./src/module/special/index.html');
//				$('.menu-master-wrap').addClass('hign-index');
			break;
			case 'inside':   // 室内
				$('.geo-scene-switch').hide();
				$('.menu-master-wrap').hide();
				$('.module-wrap').load('./src/module/inside/index.html');
			break;
			case 'freefly':  // 飞行
				$('.module-wrap').load('./src/module/freeFly/index.html');
				$('.geo-scene-switch').hide();
				$('.menu-master-wrap').hide();
			break;
		}
	}

	TF.switchModule = function(moduleName,cb){
		switchModule(moduleName,cb)
	}
})
