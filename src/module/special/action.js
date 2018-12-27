(function(TF){
	$('.show-special-menu').click(function(){
    	$(this).hide().next().show();
    	$('.special-menus').css('display', 'flex');
    })
    $('.hide-special-menu').click(function(){
    	$(this).hide().prev().show();
    	$('.special-menus').hide();
    })
    $('.special-menu').click(function(){
    	TF.menuMasterClick( $(this).index() )
    })
    
    $('.special-module-tag').click(function(){
    	$(this).addClass('special-module-selected')
    	.siblings('.special-module-tag').removeClass('special-module-selected');
        // $('.dimension3').show();
        // $('.dimension2').hide();
        // TF.sceneController.showSpecializedAnalysis();
    })
    setParkLot();
    setParkChart();
    function setParkLot(){
    	var num1 = 70;
		var num2 = 30;
		var num3 = 100;
		var runNum1 = $('.park-used').runNum(num1, {height:60,width:26});
		var runNum2 = $('.park-unused').runNum(num2, {height:60,width:26});
		var runNum3 = $('.park-all').runNum(num3, {height:60,width:26});
		
		setInterval(function(){
			num1=(num1>=90)? 10:num1+1;
			num2=(num2<=10)? 90:num2-1;
//			num3=(num3>=99)? 10:num3+1;
			runNum1.update(num1);
			runNum2.update(num2);
//			runNum3.update(num3);
		},5000)
    }
    
    function setParkChart(){
    	var parkContrast = echarts.init(document.getElementById("park-contrast"));
    	parkContrast.setOption(echartsOption.specialParkContrast);
    	
    	var parkTrend = echarts.init(document.getElementById("park-trend"));
    	parkTrend.setOption(echartsOption.specialParkTrend);
    	
    	var parkPeak = echarts.init(document.getElementById("park-peak"));
    	parkPeak.setOption(echartsOption.specialParkPeak);
    }
})(TF)
