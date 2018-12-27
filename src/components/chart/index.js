/**
 * Created by lijia on 2018/8/23.
 */
(function (TF) {
	let chartDom = {
        // 首页图表
        monitor: {
            norm1:  `
                <div class="echarts_monitor2_wrap">
                    <div class="norm" id="norm1"></div>
                    <div class="monitor-chart-title1">
                        <div>商务区安居指数</div>
                    </div>
                </div>`,
            norm2:  `
                <div class="echarts_monitor2_wrap">
                    <div class="norm" id="norm2"></div>
                    <div class="monitor-chart-title1">
                        <div>商务区商业指数</div>
                    </div>
                </div>`,
            norm3:  `
                <div class="echarts_monitor2_wrap">
                    <div class="norm" id="norm3"></div>
                    <div class="monitor-chart-title1">
                        <div>商务区治理指数</div>
                    </div>
                </div>`,
            outsideTitleSaffronYellowmonitor: `
                <div class="echarts_monitor1_wrap">
                    <div class="echarts_monitor1_title">景区票务统计（单位：万元）</div>
                    <div id="echarts_monitor1"></div>
                </div>`,
            insideTitleSaffronYellowmonitor: `
                <div class="echarts_monitor1_wrap">
                    <div id="echarts_monitor1"></div>
                </div>`,
            totalPeople: `
                <div class="monitor-chart-wrap monitor-total-people-wrap">
                	<div class="monitor-chart-title">
                		<span style="color: #ffb70a;margin-right:5px;">商务区</span>
                		实有人口数量（单位：万）
                	</div>
                    <div class="monitor-chart-body" id="monitor-total-people"></div>
                    <div class="echarts_monitor3_select_wrap js-chart-monitor3-btn">
                        <span class="echarts_monitor3_select_current">2017</span>
                        
                        <i class="fa fa-angle-down fa-lg js-arrow" style="color:#0ae9ff;font-size:24px;"></i>
                        <div class="echarts_monitor3_select">
                            <ul>
                                <li class="echarts_monitor3_select_item">2015</li>
                                <li class="echarts_monitor3_select_item">2016</li>
                                <li class="echarts_monitor3_select_item">2017</li>
                                <li class="echarts_monitor3_select_item">2018</li>
                            </ul>
                        </div>
                    </div>
                </div>`,
            securityState:`
                <div class="echarts_dashboard_wrap">
					<div class="monitor-chart-title">
                		<span style="color: #ffb70a;margin-right:5px;">商务区</span>
                		安全态势统计
                	</div>
                	<div class="echarts_dashboard_item">
                		<div>
                			情况统计:
                			<span>0</span>
                			<span>1</span>
                			<span>2</span>
                			<span>3</span>
                		</div>
                		<div>
                			任务统计:
                			<span>0</span>
                			<span>3</span>
                			<span>2</span>
                			<span>1</span>
                		</div>
                	</div>
                	<div class="echarts_dashboard" id="echarts_dashboard"></div>
                </div>`
        },
        // 综合管控图表
        dispatch: {
        	specialPerson: `
        		<div class="dispatch-special-person dispatch-chart">
        			<div class="dispatch-chart-title">商务区特殊人群统计(单位: 人)</div>
        			<div class="dispatch-chart-body" id="special-person"></div>
        		</div>`,
        	onlinePower: `
        		<div class="dispatch-online-power dispatch-chart">
        			<div class="dispatch-chart-title">商务区在线力量统计(单位: 人)</div>
        			<div class="dispatch-chart-body" id="online-power"></div>
        		</div>`,
        	onlineDevice: `
        		<div class="dispatch-online-device dispatch-chart">
        			<div class="dispatch-chart-title">设备在线统计</div>
        			<div class="dispatch-chart-body" id="online-device"></div>
        		</div>`,
        	importSituation: `
        		<div class="dispatch-import-situation dispatch-chart1">
        			<div class="dispatch-chart-title">商务区重要情况类型统计</div>
					<div class="fl ml30 mt20 tac">
						<p class="monitor-situation1">30</p>
						<p class="monitor-situation-unit">单位/起</p>
						<p class="monitor-situation-name">消防类情况</p>
					</div>
					<div class="fr mr30 mt20 tac">
						<p class="monitor-situation2">24</p>
						<p class="monitor-situation-unit">单位/起</p>
						<p class="monitor-situation-name">治安类情况</p>
					</div>
        		</div>`,
        	situation:`
                <div class="dispatch-chart1">
					<div class="dispatch-chart-title">
                		商务区情况统计
                	</div>
                	<div class="echarts_dashboard_item">
                		<div>
                			情况总数:
                			<span>0</span>
                			<span>1</span>
                			<span>2</span>
                			<span>3</span>
                		</div>
                		<div>
                			已处理:
                			<span>0</span>
                			<span>3</span>
                			<span>2</span>
                			<span>1</span>
                		</div>
                	</div>
                	<div class="echarts_dashboard" id="situation"></div>
                </div>`,
            importTask: `
        		<div class="dispatch-import-situation dispatch-chart1">
        			<div class="dispatch-chart-title">商务区重要任务类型统计</div>
					<div class="fl ml30 mt20 tac">
						<p class="monitor-situation1">30</p>
						<p class="monitor-situation-unit">单位/起</p>
						<p class="monitor-situation-name">突发任务</p>
					</div>
					<div class="fr mr30 mt20 tac">
						<p class="monitor-situation2">24</p>
						<p class="monitor-situation-unit">单位/起</p>
						<p class="monitor-situation-name">日常任务</p>
					</div>
        		</div>`,
        	task:`
                <div class="dispatch-chart1">
					<div class="dispatch-chart-title">
                		商务区任务统计
                	</div>
                	<div class="dispatch-chart-body" id="task-chart"></div>
                </div>`,
            planSource: `
        		<div class="dispatch-import-situation dispatch-chart1">
        			<div class="dispatch-chart-title">触发预案来源统计</div>
					<div class="fl ml30 mt20 tac">
						<p class="monitor-situation1">30</p>
						<p class="monitor-situation-unit">单位/起</p>
						<p class="monitor-situation-name">设备触发</p>
					</div>
					<div class="fr mr30 mt20 tac">
						<p class="monitor-situation2">24</p>
						<p class="monitor-situation-unit">单位/起</p>
						<p class="monitor-situation-name">人员上报</p>
					</div>
        		</div>`,
        	planExecute:`
                <div class="dispatch-chart1">
					<div class="dispatch-chart-title">
                		已执行预案统计
                	</div>
                	<div class="dispatch-chart-body" id="plan-execute"></div>
                </div>`,
        }

    };
	
	// 商务区安居指数
    TF.genLiveNorm = function (container) {
        $(container).append(chartDom.monitor.norm1);
        let myChart = echarts.init(document.getElementById('norm1'));
        myChart.setOption(echartsOption.norm1);
    }
	// 商务区商业指数
    TF.genBusinessNorm = function (container) {
        $(container).append(chartDom.monitor.norm2);
        let myChart = echarts.init(document.getElementById('norm2'));

        myChart.setOption(echartsOption.norm1);
	}
    // 商务区治理指数
    TF.genManageNorm= function (container) {
        $(container).append(chartDom.monitor.norm3);
        let myChart = echarts.init(document.getElementById('norm3'));

        myChart.setOption(echartsOption.norm1);
	}
    // 商务区实有人口数量
	TF.genTotalPeopleChart = function (container) {
        $(container).append(chartDom.monitor.totalPeople);

        let selectWrap = document.getElementsByClassName('echarts_monitor3_select')[0],
        btn = document.getElementsByClassName('js-chart-monitor3-btn')[0],
        myChart = echarts.init( document.getElementById('monitor-total-people') );
        myChart.setOption(echartsOption.totalPeople);
        selectWrap.style.display = 'none';
        btn.addEventListener('click',function () {
            let flag = '';

            // 获取 select框 display值
            if(selectWrap.getComputedStyle){ // 兼容IE 6 7 8
                flag = selectWrap.currentStyle['display'];
            } else {
                flag = document.defaultView.getComputedStyle(selectWrap,false)['display'];
            }
            $('.js-arrow').toggleClass('fa-rotate-180');
            flag === 'block' ? selectWrap.style.display = 'none' : selectWrap.style.display = 'block';  // 切换 select框 display值
        })

        // option点击事件
        selectWrap.addEventListener('click',function (e) {
            let currentElement = e.target,  // 当前点击li
                //  ~ : 按位取反运算符
                year = ~~ currentElement.innerHTML, // 年份
                yearElement = btn.getElementsByTagName('span')[0]; // 年份span

            yearElement.innerHTML = year;
            myChart.clear()
            myChart.setOption(echartsOption.bar.totalPeople);

        })
    }
	
	// 商务区安全指数
    TF.gensecurityState = function(container){
        $(container).append(chartDom.monitor.securityState);
        let myChart = echarts.init( document.getElementById('echarts_dashboard') );
        myChart.setOption(echartsOption.securityState);
    }
    
/* 综合管控图表 */    
    // 特殊人群
    TF.genSpecialPerson = function(container){
    	$(container).append(chartDom.dispatch.specialPerson);
        let myChart = echarts.init( document.getElementById('special-person') );
        myChart.setOption(echartsOption.specialPeople);
    }
	
	// 在线力量
    TF.genOnlinePower = function(container){
    	$(container).append(chartDom.dispatch.onlinePower);
        let myChart = echarts.init( document.getElementById('online-power') );
        myChart.setOption(echartsOption.onlinePower);
    }
    // 设备在线数
    TF.onlineDevice = function(container){
    	$(container).append(chartDom.dispatch.onlineDevice);
        let myChart = echarts.init( document.getElementById('online-device') );
        myChart.setOption(echartsOption.dispatchOnlineDevice);
    }
    // 重要类型情况统计
    TF.importSituation = function(container){
    	$(container).append(chartDom.dispatch.importSituation);
//      let myChart = echarts.init( document.getElementById('online-device') );
//      myChart.setOption(echartsOption.dispatchOnlineDevice);
    }
    TF.situation = function(container){
    	$(container).append(chartDom.dispatch.situation);
        let myChart = echarts.init( document.getElementById('situation') );
        myChart.setOption(echartsOption.securityState);
    }
    // 重要类型任务统计
    TF.importTask= function(container){
    	$(container).append(chartDom.dispatch.importTask);
    }
    TF.task = function(container){
    	$(container).append(chartDom.dispatch.task);
        let myChart = echarts.init( document.getElementById('task-chart') );
        myChart.setOption(echartsOption.securityState);
    }
    // 预案统计
    TF.planSource= function(container){
    	$(container).append(chartDom.dispatch.planSource);
    }
    TF.planExecute = function(container){
    	$(container).append(chartDom.dispatch.planExecute);
        let myChart = echarts.init( document.getElementById('plan-execute') );
        myChart.setOption(echartsOption.securityState);
    }

    // 指挥调度 620 * 240
    // 停车场 458 * 193
    TF.genAreaStyleLine = function (container, size, option) {

        $(container).append(chartDom.line.areaStyleLine);

        let wrap = document.getElementsByClassName('echarts_line2_wrap')[0];

        if (size) {
            wrap.style.width = size.width + 'px';
            wrap.style.height = size.height + 'px';
        }

        let myChartContainer = document.getElementById('echarts_line2'),
            myChart = echarts.init(myChartContainer);

        myChart.setOption(echartsOption.line.areaStyleLine());
    }

    TF.genFlaAtngleBGWavemonitor = function (container) {
        $(container).append(chartDom.monitor.flatAngleBGmonitor);
        let myChartContainer = document.getElementById('echarts_line1_1'),
            myChart = echarts.init(myChartContainer);

        myChart.setOption(echartsOption.monitor.verticalGradientmonitor());
    }
    TF.genWireframeBGWavemonitor = function (container) {
        $(container).append(chartDom.monitor.wireframeBGmonitor);
        let myChartContainer = document.getElementById('echarts_line1'),
            myChart = echarts.init(myChartContainer);

        myChart.setOption(echartsOption.monitor.verticalGradientmonitor());
    }

    TF.genRealtimePercentageChart = function (container) {
        $(container).append(chartDom.other.realtimePercentageChart);

        // realTime
        let timer = setInterval(function () {
            let timeElement = document.getElementsByClassName('echarts_realtime_percentage_time')[0];
            // 如果没有找到该元素 清除定时器
            if (!timeElement) {
                console.log('没有元素，清除定时器')
                clearInterval(timer)
                return
            }
            timeElement.innerHTML = getTime()
        },900)

        function getTime () {
            // 年 月 日 时 分 秒
            var Time = new Date();
            let year = Time.getFullYear(),
                month = Time.getMonth() + 1,
                day = Time.getDate(),
                hour = Time.getHours(),
                minute = Time.getMinutes(),
                second = Time.getSeconds();

            month = timeFormat(month)
            day = timeFormat(day)
            hour = timeFormat(hour)
            minute = timeFormat(minute)
            second = timeFormat(second)
            return year + ' - ' + month + ' - ' + day + '&nbsp;&nbsp;' + hour + ' : ' + minute + ' : ' + second;
        }

        function timeFormat (time) {
            if(time < 10) {
                time = "0" + time
            }
            return time
        }
    }

    TF.genThreeHorizontalPie = function (container) {
        $(container).append(chartDom.pie.threeHorizontalPie);
        let myChartContainer = document.getElementById('echarts_three_pie'),
            myChart = echarts.init(myChartContainer);

        myChart.setOption(echartsOption.pie.threeHorizontalPie());
    }

})(TF)