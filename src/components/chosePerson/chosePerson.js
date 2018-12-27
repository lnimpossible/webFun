(function (TF) {
    let personData;
    let userInfo = TF.LoginCache.userInfo;
    let indexs=[],crumbs=[], chosedPerson={};
    TF.genChoicePerson = function (selector) {
        if (personData) {
            genChoicePerson(selector);
        } else {
            TF.requestData.getUserList().then(function (data) {
                personData = data;
                genChoicePerson(selector)
            });
        }
    };

    function genChoicePerson(selector) {
    	chosedPerson[userInfo.id] = userInfo;
//  	chosedPerson = {};
		indexs=[];
		crumbs=[];
        var nodeStr = '<div class="chose-person">'+
//  					'<div class="back-btn">'+
//                          '<img class="mr8" src="static/image/layout/common/back-btn.png" alt="">'+
//                          '返回'+
//                      '</div>'+
                        '<div class="close-btn">'+
                            '<img class="mr8" src="static/image/layout/common/red-close.png" alt="">'+
                            '关闭'+
                        '</div>'+
                        '<p class="chose-person-title">选择人员......</p>'+
                        '<div class="chose-person-main">'+
                        	'<p class="choice-person-crumb"></p>'+
                        	'<ul class="choice-person-list"></ul>'+
                        '</div>'+
                        '<ul class="choice-person-bottom">'+
                            '<li class="choice-person-voice chose-person-voice">语音</li>'+
                            '<li class="chose-person-groupchat">创建群聊</li>'+
                            '<li class="choice-person-video chose-person-video">视频</li>'+
                        '</ul>'+
                    '</div>';
        $('#' + selector).append(nodeStr);
        indexs.push(0);
        genNewLevel(personData[0]);
        genCrumb(personData[0].name);
        $(".close-btn").click(function () {
            TF.closeNewFunction();
        });
        $('.chose-person-groupchat').click(function(){
        	if(Object.keys(chosedPerson).length == 0){
        		TF.notice.message('未选择任何人员!')
        	}else{
//      		console.log(chosedPerson)
//      		TF.openNewFunction('chat');
				TF.openNewFunction('groupName', chosedPerson);
				chosedPerson = {}
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
            if(personData.id==userInfo.id){ return };  // 点击的是自己
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
