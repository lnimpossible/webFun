(function (TF) {
	let userInfo = TF.LoginCache.userInfo;
    let personData;
    let indexs=[],crumbs=[], chosedPerson={};
    TF.chosedPerson = null;
    let passedInInfo = null;
    TF.genChoseTaskPerson = function (selector, info) {
    	passedInInfo = info;
        if (personData) {
            genChoseTaskPerson(selector,info);
        } else {
            TF.requestData.getUserList().then(function (data) {
                personData = data;
                genChoseTaskPerson(selector,info)
            });
        }
    };

    function genChoseTaskPerson(selector,info) {
		indexs=[];
		crumbs=[];
        var nodeStr = '<div class="chose-person">'+
    					'<div class="back-btn task-person-back">'+
                            '<img class="mr8" src="static/image/layout/common/back-btn.png" alt="">'+
                            '返回'+
                        '</div>'+
                        '<div class="close-btn">'+
                            '<img class="mr8" src="static/image/layout/common/red-close.png" alt="">'+
                            '关闭'+
                        '</div>'+
                        '<p class="chose-person-title">区域范围内已选择人员......</p>'+
                        '<div class="chose-person-main">'+
                        	'<p class="choice-person-crumb"></p>'+
                        	'<ul class="choice-person-list"></ul>'+
                        '</div>'+
                        '<ul class="choice-task-person-bottom">'+
//                          '<li class="choice-person-btn chose-person-all" action="all">全选</li>'+
                            '<li class="choice-person-btn chose-person-sure" action="sure">确认选择</li>'+
//                          '<li class="choice-person-btn chose-person-reverse" action="reverse">反选</li>'+
                        '</ul>'+
                    '</div>';
        $('#' + selector).append(nodeStr);
        indexs.push(0);
        genNewLevel(personData[0]);
        genCrumb(personData[0].name);
        $(".close-btn").click(function () {
            TF.closeNewFunction();
            chosedPerson = {};
            passedInInfo = null;
        });
        $('.task-person-back').click(function(){
        	info.crumb&&TF.openNewFunction(info.crumb)
        	chosedPerson = {};
        	passedInInfo = null;
        })
        $('.choice-person-btn').click(function(){
        	var action = $(this).attr('action');
        	if(action=='sure'){
         		TF.chosedPerson = chosedPerson;
        		if(!info.crumb){return};
        		var taskPersonArr = [];
	        	var taskPersonIdArr = [];
	        	for(var key in chosedPerson){
	        		taskPersonArr.push(chosedPerson[key].nickname);
	        		taskPersonIdArr.push(key);
	        	}
	        	var taskData = {
	        		person: {
	        			name: taskPersonArr,
	        			id: taskPersonIdArr
	        		}
	        	}
        		TF.openNewFunction(info.crumb,taskData);
        		chosedPerson = {};
        		passedInInfo = null;
        	}
        })
    }
    
    function genNewLevel(data){
		$('.choice-person-list').empty();
		data.person_list.forEach(function(person,index){
			if(chosedPerson.hasOwnProperty(person.id)){
				var personDom='<li class="choice-person-person choice-person-chosed" itemindex="'+index+'">'+person.nickname+'</li>';
			}else{
				var personDom='<li class="choice-person-person" itemindex="'+index+'">'+person.nickname+'</li>';
			}
			$('.choice-person-list').append(personDom)
		})
		data.children.forEach(function(group, index){
			var groupDom='<li class="choice-person-group" groupindex="'+index+'">'+group.name+'</li>';
			$('.choice-person-list').append(groupDom)
		});
		$('.choice-person-person').click(function () {
            var personIndex = $(this).attr('itemindex');
            var personData = getItemData(personIndex);
            if(passedInInfo.crumb=='createTask'&&personData.id==userInfo.id){return};
            var hasClass = $(this).hasClass('choice-person-chosed');
            if(hasClass){
            	$(this).removeClass('choice-person-chosed');
            	delete chosedPerson[personData.id]
            }else{
            	$(this).addClass('choice-person-chosed');
            	chosedPerson[personData.id] = personData
            }
        })
		$('.choice-person-group').click(function () {
            var groupIndex = $(this).attr('groupindex');
            var groupData = getGroupData(groupIndex);
            genNewLevel(groupData);
            genCrumb(groupData.name)
        })
	}
	function getGroupData(gIndex){
		(gIndex!==undefined)&&indexs.push(gIndex);
		var data = personData;
		indexs.forEach(function(i, index){
			data = (index==0)? data[i]:data.children[i];
		})
		return data
	}
	function getItemData(iIndex){
		var data = personData;
		indexs.forEach(function(i, index){
			data = (index==0)? data[i]:data.children[i];
		})
		return data.person_list[iIndex];
	}
	function genCrumb(crumb){
		(crumb!==undefined)&&crumbs.push(crumb);
		var crumbDom = "";
		crumbs.forEach(function(val,index){
			if(index==crumbs.length-1){
				crumbDom += '<div class="swiper-slide"><div class="crumb" style="color: #fcb90e;" index="'+index+'">'+val+'</div></div>';
			}else{
				crumbDom +='<div class="swiper-slide">'+
				'<div class="crumb" index="'+index+'">'+val+'<img class="mr8 ml8" src="./static/image/layout/common/crumb-arrow.png" /></div>'+
				'</div>'
			}
		})
		var dom = '<div class="swiper-container crumb-container">'+
					'<div class="swiper-wrapper">'+
					    crumbDom+
					'</div>'+
				'</div>';
		$('.choice-person-crumb').empty().append(dom);
		  var mySwiper = new Swiper ('.crumb-container', {
		    direction: 'horizontal',
			slidesPerView : 'auto'
		}) 
		
		$('.crumb').click(function(){
			var index = $(this).attr('index');
			indexs.splice(Number(index)+1);
			crumbs.splice(Number(index)+1);
			var data = getGroupData();
			genNewLevel(data);
			genCrumb()
		})
	}
})(TF);
