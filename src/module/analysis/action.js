(function(TF){
   	var onlinePowerChart = echarts.init(document.getElementById('online-power'));

   	var peopleChart = echarts.init(document.getElementById('exactly-people'));

   	var onlineDevicechart = echarts.init(document.getElementById('device-online'));
	
	TF.requestData.getAnalysis().then(function(data){
		console.log(data);
		var situation = data.condiiton;
		var water = data.water;
		var device = data.device;
		var task = data.task;
		var onlinePower = data.power;
		var people = data.people;
		var norm = data.zhishu;
		var tax = data.business;
		
		setSituation(situation);  // 情况监控
		setWater(water);          // 水质监测
		setDevice(device);        // 设备在线统计
		setTask(task);            // 任务监控
		setOnlinePower(data);     // 实时在线力量
		setPeople(people);        // 实有人口统计
		setNorm(norm);            // 各项指数
		setTax(tax)               // 商业税务
	})
    
    function setSituation(data){
    	var normalizeData = [];
    	for(var k in data){
    		normalizeData.push( data[k] )
    	}
		var num1 = 19;
		var num2 = 23;
		var num3 = 5;
		var runNum1 = $('.js-adorn1').runNum(num1, {height:30,width:16});
		var runNum2 = $('.js-adorn2').runNum(num2, {height:30,width:16});
		var runNum3 = $('.js-adorn3').runNum(num3, {height:30,width:16});
		setInterval(function(){
			num1=(num1>=99)? 10:num1+1;
			num2=(num2>=99)? 10:num2+1;
			num3=(num3>=99)? 10:num3+1;
			runNum1.update(num1);
			runNum2.update(num2);
			runNum3.update(num3);
		},5000)
    }
    
    function setWater(data){
    	var waterDom = "";
    	data.forEach(function(val){
    		waterDom += '<li class="analysis-g2-list">'+
					'<span class="analysis-g2-item1">'+val.name+'</span>'+
					'<span class="analysis-g2-item1">'+val.value+'</span>'+
					'<span class="analysis-g2-item2">1h ago</span>'+
				'</li>';
    	})
    	waterDom += waterDom;
    	$('.analysis-g2-lists').empty().html(waterDom);
    	$('.analysis-g2-lists1').empty().html(waterDom);
    	TF.setScroll();
    	$(".analysis-g2-list-wrap").getNiceScroll().hide();
    	var loopScroll = new LoopScroll('.analysis-g2-lists', '.analysis-g2-list-wrap')
    }
    
    function setDevice(data){
    	echartsOption.onlineDevice.xAxis[0].data = ['广播', '摄像头', '消防栓'];
    	var normalizeData1 = []; // 设备总数
    	var normalizeData2 = []; // 在线数
    	var normalizeData3 = []; // 掉线数
    	data.forEach(function(val){
    		normalizeData1.push(val.all_num);
    		normalizeData2.push(val.online_num);
    		normalizeData3.push(val.offline_num);
    	})
    	echartsOption.onlineDevice.series[0].data = normalizeData1;
    	echartsOption.onlineDevice.series[1].data = normalizeData2;
    	echartsOption.onlineDevice.series[2].data = normalizeData3;
    	onlineDevicechart.setOption(echartsOption.onlineDevice);
    }
    
    function setTask(data){
    	var normalizeData = normalize(data);
		var num1 = 15;
		var num2 = 18;
		var num3 = 23;
		var runNum1 = $('.glow-text1').runNum(num1, {height:60,width:26});
		var runNum2 = $('.glow-text2').runNum(num2, {height:60,width:26});
		var runNum3 = $('.glow-text3').runNum(num3, {height:60,width:26});
		
		setInterval(function(){
			num1=(num1>=99)? 10:num1+1;
			num2=(num2>=99)? 10:num2+1;
			num3=(num3>=99)? 10:num3+1;
			runNum1.update(num1);
			runNum2.update(num2);
			runNum3.update(num3);
		},5000)
    }
    
    function setOnlinePower(data){
    	for(var i=0; i<3; i++){
    		var fakeData = [];
    		for(var j=0; j<5; j++){
    			var data = Math.ceil(Math.random()*14);
    			fakeData.push(data);
    		}
    		echartsOption.analysisOnlinePower.series[i].data[0] = fakeData;
    	}
    	onlinePowerChart.setOption(echartsOption.analysisOnlinePower);
    	
    	setTimeout(function(){
    		setOnlinePower()
    	},10000)
    }
    
    function setPeople(data){
    	peopleChart.setOption(echartsOption.exactilyPeople);
    }
    
    function setNorm(data){
    	$('.analysis-circle-num1').html(data.anju);
    	$('.analysis-circle-num2').html(data.zhili);
    	$('.analysis-circle-num3').html(data.shangye);
    }
    
    function setTax(data){
    	var normalizeData = normalize(data);
    	$('.analysis-circle-num4').html(normalizeData[0]);
    	$('.analysis-circle-num5').html(normalizeData[1]);
    	$('.analysis-circle-num6').html(normalizeData[2]);
    	$('.analysis-circle-num7').html(normalizeData[3]);
    }
    
    function normalize(data){
    	var normalizeData = [];
    	for(var k in data){
    		normalizeData.push( data[k] )
    	}
    	return normalizeData
    }
    
    function LoopScroll(dom, wrapDom){
    	var dom = $(dom)[0];
    	var wrapDom = $(wrapDom)[0];
    	$(wrapDom).getNiceScroll().hide()
    	var timer = setInterval(function () {
	        scrollUp()
	    }, 100);
	    $(dom).mouseout(function () {
	        timer = setInterval(function () {
	            scrollUp()
	        }, 100);
	        $(wrapDom).getNiceScroll().hide()
	    });
	    $(dom).mouseover(function () {
	        clearInterval(timer);
	        $(wrapDom).getNiceScroll().show()
	    })
	    var scrollUp = function(){
	    	if (wrapDom.scrollTop >= dom.scrollHeight) {
	            wrapDom.scrollTop = 0;
	        }else{
	        	wrapDom.scrollTop++;
	        }
	    }
    }
    
    $('.show-analysis-menu').click(function(){
    	$(this).hide().next().show();
    	$('.analysis-menus').css('display', 'flex');
    })
    $('.hide-analysis-menu').click(function(){
    	$(this).hide().prev().show();
    	$('.analysis-menus').hide();
    })
    $('.analysis-menu').click(function(){
    	TF.menuMasterClick( $(this).index() )
    })
    var isSlideDown = false;
    $('.analysis-g6-select').click(function(){
    	$('.analysis-g6-options').slideToggle();
    	if(isSlideDown){
    		$('.white-triangle').css('transform', 'rotateZ(0deg)')
    	}else{
    		$('.white-triangle').css('transform', 'rotateZ(180deg)')
    	}
    	isSlideDown = !isSlideDown;
    })
    $('.analysis-g6-option').click(function(){
    	$('.analysis-g6-selected').html($(this).html());
    	$('.analysis-g6-options').slideUp()
    })
})(TF)