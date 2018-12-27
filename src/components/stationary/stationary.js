(function(TF){
	let viewAngleList = "";
	let viewList;
	TF.multipleChoseType = null;

	TF.genPersonalCenter = function(selector){
		let userInfo = TF.LoginCache.userInfo;
		var avatarDom;
		if(userInfo.avatar){
			avatarDom = '<div class="avatar-img" style="background-image: url('+(userInfo.avatar)+')"></div>';
		}else{
			avatarDom = '<div class="avatar-img">'+userInfo.nickname.slice(-2)+'</div>'
		}
		var nodeStr = '<div class="personal-center">'+
						'<div class="personal-center-clsoe close-btn">'+
	                        '<img class="mr8" src="static/image/layout/common/red-close.png" alt="">关闭'+
	                    '</div>'+
						'<p>'+( (userInfo.job)? userInfo.job+':&nbsp&nbsp':'' )+userInfo.nickname+'</p>'+
						'<ul class="personal-center-info fl nice-scroll">'+
							'<li class="mb10 personal-center-kv">'+
								'<span class="personal-center-k mr10">姓名</span>'+
								'<span class="personal-center-v">'+userInfo.nickname+'</span>'+
							'</li>'+
							'<li class="mb10 personal-center-kv">'+
								'<span class="personal-center-k mr10">所属部门</span>'+
								'<span class="personal-center-v">'+userInfo.department+'</span>'+
							'</li>'+
							'<li class="mb10 personal-center-kv">'+
								'<span class="personal-center-k mr10">所在职位</span>'+
								'<span class="personal-center-v">'+userInfo.job+'</span>'+
							'</li>'+
							'<li class="mb10 personal-center-kv">'+
								'<span class="personal-center-k mr10">密码</span>'+
								'<span class="personal-center-v editable">*******</span>'+
							'</li>'+
							'<li class="mb10 personal-center-kv">'+
								'<span class="personal-center-k mr10">性别</span>'+
								'<span class="personal-center-v editable">'+(userInfo.sex||'无')+'</span>'+
							'</li>'+
							'<li class="mb10 personal-center-kv">'+
								'<span class="personal-center-k mr10">邮箱</span>'+
								'<span class="personal-center-v editable">'+(userInfo.email||'无')+'</span>'+
							'</li>'+
							'<li class="mb10 personal-center-kv">'+
								'<span class="personal-center-k mr10">手机号</span>'+
								'<span class="personal-center-v editable">'+(userInfo.phone||'无')+'</span>'+
							'</li>'+
							'<li class="mb10 personal-center-kv">'+
								'<span class="personal-center-k mr10">出生年月</span>'+
								'<span class="personal-center-v editable">'+(userInfo.birthday||'无')+'</span>'+
							'</li>'+
							'<li class="mb10 personal-center-kv">'+
								'<span class="personal-center-k mr10">QQ号</span>'+
								'<span class="personal-center-v editable">'+(userInfo.qq||'无')+'</span>'+
							'</li>'+
							'<li class="mb10 personal-center-kv">'+
								'<span class="personal-center-k mr10">微信号</span>'+
								'<span class="personal-center-v editable">'+(userInfo.wechat||'无')+'</span>'+
							'</li>'+
							'<li class="mb10 personal-center-kv">'+
								'<span class="personal-center-k mr10">通信地址</span>'+
								'<span class="personal-center-v editable">'+(userInfo.address||'无')+'</span>'+
							'</li>'+
						'</ul>'+
						'<div class="personal-center-r fr">'+
							'<label for="upload-avatar" class="personal-center-avatar mb20">'+
								avatarDom+
							'</label>'+
							'<input type="file" id="upload-avatar" accept="image/png, image/jpeg"  style="display:none;"/>'+
							'<div class="personal-center-setting mb20">'+
								'<img src="./static/image/layout/common/modify.png" />'+
								'<p>修改信息</p>'+
							'</div>'+
							'<div class="personal-center-logout">'+
								'<img src="./static/image/layout/common/logout.png" />'+
								'<p>退出登录</p>'+
							'</div>'+
						'</div>'+
					  '</div>';
		$('#'+selector).append(nodeStr);
		TF.setScroll();
		$('.personal-center-clsoe').click(function(){
			TF.closeNewFunction()
		})
		$('.personal-center-setting').click(function(){
			TF.openNewFunction('personalModify')
		})
		$('.personal-center-logout').click(function(){
			TF.LoginCache.remove()
		})
		var uploadAvatar = document.getElementById("upload-avatar");
		uploadAvatar.onchange = function(event){
			var fileObj = uploadAvatar.files[0]; // js 获取文件对象
           	var formFile = new FormData();
           	formFile.append("action", "UploadVMKImagePath");  
           	formFile.append("file", fileObj);
			TF.requestData.uploadFile(formFile).then(function(data){
				TF.notice.confirm('确定修改头像吗？', function(){
					$('.avatar-img').empty()[0].style.backgroundImage = 'url('+data.save_path+')';
					var parama = {
						id: userInfo.id,
						password: userInfo.password,
						sex: userInfo.sex,
						birthday: userInfo.birthday,
						qq: userInfo.qq,
						wechat: userInfo.wechat,
						address: userInfo.address,
						email: userInfo.email,
						phone: userInfo.phone,
						avatar: data.save_path
					}
					TF.requestData.modifyPersonInfo(parama).then(function(res){
						TF.LoginCache.userInfo.avatar = data.save_path;
						TF.LoginCache.set(TF.LoginCache.userInfo);
						$('.personal-info-avatar').html('').css('backgroundImage', 'url('+data.save_path+')')
					})
				})
			})
		}
	}
	
	TF.genModidyInfo=function(selector){
		let userInfo = TF.LoginCache.userInfo;
		if(userInfo.sex=='男'){
			sex = '男';
			var sexDom = '<span class="ml20 mr20 cursor-pointer sex" sex="man"><span class="yellow-dot mr10"></span>男</span>'+
						'<span class="ml20 mr20 cursor-pointer sex" sex="woman"><span class="blue-dot mr10"></span>女</span>';
		}else{
			sex = '女';
			var sexDom = '<span class="ml20 mr20 cursor-pointer sex" sex="man"><span class="blue-dot mr10"></span>男</span>'+
						'<span class="ml20 mr20 cursor-pointer sex" sex="woman"><span class="yellow-dot mr10"></span>女</span>';
		}
		var birthday = userInfo.birthday.split('-');
		var nodeStr = '<div class="personal-modify">'+
				'<div class="personal-modify-clsoe close-btn">'+
                    '<img class="mr8" src="static/image/layout/common/red-close.png" alt="">关闭'+
                '</div>'+
                '<p>修改个人信息</p>'+
				'<ul class="personal-modify-info nice-scroll">'+
					'<li class="mb10 personal-center-kv">'+
						'<span class="personal-center-k mr10">新密码</span>'+
						'<input type="password" class="personal-modify-v new-password" value="'+userInfo.password+'"/>'+
					'</li>'+
					'<li class="mb10 personal-center-kv">'+
						'<span class="personal-center-k mr10">性别</span>'+
						sexDom+
					'</li>'+
					'<li class="mb10 personal-center-kv">'+
						'<span class="personal-center-k mr10">出生年月</span>'+
						'<input class="personal-modify-v1 b1" value="'+birthday[0]+'" />'+
						'<input class="personal-modify-v1 b2" value="'+birthday[1]+'"/>'+
						'<input class="personal-modify-v1 b3" value="'+birthday[2]+'"/>'+
					'</li>'+
					'<li class="mb10 personal-center-kv">'+
						'<span class="personal-center-k mr10">手机号码</span>'+
						'<input class="personal-modify-v phone" value="'+userInfo.phone+'"/>'+
					'</li>'+
					'<li class="mb10 personal-center-kv">'+
						'<span class="personal-center-k mr10">微信</span>'+
						'<input class="personal-modify-v wechat" value="'+userInfo.wechat+'"/>'+
					'</li>'+
					'<li class="mb10 personal-center-kv">'+
						'<span class="personal-center-k mr10">邮箱</span>'+
						'<input class="personal-modify-v email" value="'+userInfo.email+'"/>'+
					'</li>'+
					'<li class="mb10 personal-center-kv">'+
						'<span class="personal-center-k mr10">QQ号</span>'+
						'<input class="personal-modify-v qq" value="'+userInfo.qq+'"/>'+
					'</li>'+
					'<li class="mb10 personal-center-kv">'+
						'<span class="personal-center-k mr10">通讯地址</span>'+
						'<input class="personal-modify-v address" value="'+userInfo.address+'"/>'+
					'</li>'+
				'</ul>'+
				'<p class="ensure-modify">确定修改</p>'
			  '</div>';
		$('#'+selector).append(nodeStr);
		
		$('.personal-modify-clsoe').click(function(){
			TF.closeNewFunction()
		})

		var sex;
		$('.sex').click(function(){
			$(this).find('span').addClass('yellow-dot').removeClass('blue-dot');
			$(this).siblings().find('span').removeClass('yellow-dot').addClass('blue-dot');
			sex = $(this).attr('sex')=='man'? '男':'女';
		})
//		$('.phone').blur(function(){
//			var value = $(this).val();
//			var reg=/^[1][3,4,5,7,8][0-9]{9}$/; 
//			if(!reg.test(value)){
//				TF.notice.message('请输入正确格式的手机号!')
//			}
//		})
		$('.ensure-modify').click(function(){
			var isValidDate = validateDate($('.b1').val(), $('.b2').val(), $('.b3').val());
			if(!isValidDate){
				TF.notice.message('请输入正确格式的日期!');
				return
			}
			
			var value = $('.phone').val();
			var reg=/^[1][3,4,5,7,8][0-9]{9}$/; 
			if(value && !reg.test(value)){
				TF.notice.message('请输入正确格式的手机号!');
				return
			}
			
			var emailValue = $('.email').val();
			var reg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; 
			if(emailValue && !reg.test(emailValue)){
				TF.notice.message('请输入正确格式的邮箱!');
				return
			}
			
			var newPassword = $('.new-password').val();
			var password = (newPassword==userInfo.password)? userInfo.password:hex_md5(newPassword);
			var birthday = [$('.b1').val(), $('.b2').val(), $('.b3').val()].join('-');
			var qq = $('.qq').val();
			var wechat = $('.wechat').val();
			var address = $('.address').val();
			var email = $('.email').val();
			var phone = $('.phone').val();
			var parama = {
					id: userInfo.id,
					password: password,
					sex: sex,
					birthday: birthday,
					qq: qq,
					wechat: wechat,
					address: address,
					email: email,
					phone: phone,
					avatar: userInfo.avatar
				}
			TF.notice.confirm('确定要修改个人信息吗？', function(){
				TF.requestData.modifyPersonInfo(parama).then(function(res){
					TF.closeNewFunction();
					TF.LoginCache.userInfo.password = password;
					TF.LoginCache.userInfo.sex = sex;
					TF.LoginCache.userInfo.birthday = birthday;
					TF.LoginCache.userInfo.qq = qq;
					TF.LoginCache.userInfo.wechat = wechat;
					TF.LoginCache.userInfo.address = address;
					TF.LoginCache.userInfo.email = email;
					TF.LoginCache.userInfo.phone = phone;
					TF.LoginCache.set(TF.LoginCache.userInfo)
				});
			})
		})
	}
	function validateDate(originalYear, originalMonth, originalDay) {
		 var date = new Date(originalYear, originalMonth - 1, originalDay);
		 var year = date.getFullYear();
		 var month = date.getMonth() + 1;
		 var day = date.getDate();
		 return year == originalYear && month == originalMonth && day == originalDay;
	}
	var dom1 = 	'<div class="menu-control menu-control1" c-title-b="图层管理"></div>'+
				'<div class="menu-control menu-control2" c-title-b="多选"></div>'+
				'<div class="menu-control menu-control3" c-title-b="视角"></div>'+
				'<div class="menu-control menu-control4" c-title-b="测量"></div>'+
				'<div class="menu-control menu-control5" c-title-b="公告"></div>'+
				'<div class="menu-control-extend">'+
					'<div class="menu-control-extend1">图层选择</div>'+
					'<div class="menu-control-extend2 flex flex-wrap">'+
						'<div class="menu-control-item menu-control-layer menu-control-active menu-control-camera" action="camera">摄像头</div>'+
						'<div class="menu-control-item menu-control-layer menu-control-active menu-control-hydrant" action="fireHydrant">消防栓</div>'+
						'<div class="menu-control-item menu-control-layer menu-control-active menu-control-person" action="person">人员</div>'+
					'</div>'+
					'<div class="menu-control-extend3">'+
						'<span class="menu-control-btn mr40 show-all-layer"><i class="fa fa-check-circle mr8"></i>全选</span>'+
						'<span class="menu-control-btn hide-all-layer"><i class="fa fa-minus-circle mr8"></i>清空</span>'+
					'</div>'+
				'</div>'+
				'<div class="menu-control-extend">'+
					'<div class="menu-control-extend1">框选线选</div>'+
					'<div class="menu-control-extend2 flex flex-wrap">'+
						'<div class="menu-control-item menu-control-select box-select" action="box">框选</div>'+
						'<div class="menu-control-item menu-control-select line-select" action="line">线选</div>'+
					'</div>'+
					'<div class="menu-control-extend3"><span class="menu-control-btn clean-select">清除选择</span></div>'+
				'</div>'+
				'<div class="menu-control-extend">'+
					'<div class="menu-control-extend1">视角</div>'+
					'<div class="menu-control-extend2 view-list flex flex-wrap nice-scroll">';
	var dom2 = '</div>'+
					'<div class="menu-control-extend3 add-view-angle"><span class="menu-control-btn"><i class="fa fa-plus-circle mr8"></i>添加视角</span></div>'+
				'</div>'+
				'<div class="menu-control-extend">'+
					'<div class="menu-control-extend1">测量</div>'+
					'<div class="menu-control-extend2 flex flex-wrap">'+
						'<div class="menu-control-item measure menu-control-height" action="measureHeight">高度</div>'+
						'<div class="menu-control-item measure menu-control-distance" action="measureSurfaceDistance">距离</div>'+
						'<div class="menu-control-item measure menu-control-angle" action="measureAngle">角度</div>'+
						'<div class="menu-control-item measure menu-control-area" action="measureArea">面积</div>'+
						'<div class="menu-control-item measure menu-control-coordinate" action="measurePosition">坐标</div>'+
					'</div>'+
					'<div class="menu-control-extend3"><span class="menu-control-btn clear-measure"><i class="fa fa-minus-circle mr8"></i>清除</span></div>'+
				'</div>';
	TF.genGeoSceneControl = function(selector){
		TF.requestData.viewList({page:1, unit: 10}).then(function(data){
			viewList = data;
			viewAngleList = "";
			data.forEach(function(view){
				viewAngleList += '<div class="menu-control-item1 view-angle">'+
									view.name+'<i viewid="'+view.id+'" class="fa fa-close delete-view"></i>'+
								'</div>'
			})
			var dom = dom1+viewAngleList+dom2;
			$('#'+selector).append(dom);
			
			TF.setScroll();
			
			$('.menu-control').click(function(){
				let index = $(this).index();
				if(index==4){
					TF.openNewFunction('announcement');
					return
				}
				$(this).toggleClass('menu-control-active')
				.siblings().removeClass('menu-control-active');
				$('.menu-control-extend').eq(index).slideToggle()
				.siblings('.menu-control-extend').hide();
				TF.updateScroll();
			});
			
		// 图层管理
			let layerArr = ['camera', 'fireHydrant', 'person'];
			$('.menu-control-layer').click(function(){
				var action = $(this).attr('action');
				var seat = layerArr.indexOf(action);
				if(seat == -1){
					layerArr.push(action);
					$(this).addClass('menu-control-active');
					TF.layerManage.addLayer(action);
				}else{
					layerArr.splice(seat, 1);
					$(this).removeClass('menu-control-active')
                    TF.layerManage.removeLayer(action);
				}
			})
			$('.show-all-layer').click(function(){
				layerArr = ['camera', 'fireHydrant', 'person'];
				$('.menu-control-layer').addClass('menu-control-active');
				layerArr.forEach(function(val){
					TF.layerManage.addLayer(val)
				})
			})
			$('.hide-all-layer').click(function(){
				layerArr = [];
				$('.menu-control-layer').removeClass('menu-control-active');
				TF.layerManage.removeLayer('camera');
				TF.layerManage.removeLayer('fireHydrant');
				TF.layerManage.removeLayer('person');
			})
			
		// 框选，线选
			$('.menu-control-select').click(function(){
				let action = $(this).attr('action');
				$(this).addClass('menu-control-active').siblings().removeClass('menu-control-active');
				TF.openNewFunction('choseLayer');
				TF.multipleChoseType = action;
			})
			$('.clean-select').click(function(){
				TF.earthCommon.removeEntities(TF.geometryController.selectedEntities);
        		$('.menu-control-select').removeClass('menu-control-active')
			})
			TF.cancelSelect = function(){
				$('.menu-control-select').siblings().removeClass('menu-control-active');
				TF.multipleChoseType = null;
			}
			
		// 视角
			$('.view-list').on('click', '.view-angle', function(){
				$(this).addClass('menu-control-active').siblings().removeClass('menu-control-active');
				let index = $(this).index();
				let viewData  = viewList[index];
				var coordinate=TF.layerManage.toWgs84Coordinate(viewData.position);
    			Pangu.Location.flyTo(coordinate.longitude,coordinate.latitude,Number(viewData.height),Number(viewData.heading),Number(viewData.pitch),Number(viewData.roll));
			})
			$('.add-view-angle').click(function(){
				TF.openNewFunction('angleName');
			})
			$('.view-list').on('click', '.delete-view',function(event){
				event.stopPropagation();
				var id = $(this).attr('viewid');
				TF.Notice.confirm('确定删除视角吗?',function(){
					TF.requestData.viewDelete({id: id}).then(function(){
						TF.refreshViewAngle()
					})
				})
			})
			
		// 测量
			$('.measure').click(function(){
				let action = $(this).attr('action');
				$(this).addClass('menu-control-active').siblings().removeClass('menu-control-active');
        		Pangu.Measure[action]();
			})
			$('.clear-measure').click(function(){
				Pangu.Measure.clearMeasure();
				$('.measure').siblings().removeClass('menu-control-active');
			})
		})
	}
	TF.refreshViewAngle = function(){
		TF.requestData.viewList({page: 1, unit: 10}).then(function(data){
			viewList = data;
			viewAngleList = "";
			data.forEach(function(view){
				viewAngleList += '<div class="menu-control-item1 view-angle">'+
									view.name+'<i viewid="'+view.id+'" class="fa fa-close delete-view"></i>'+
								'</div>'
			})
			$('.view-list').empty().append(viewAngleList)
		})
	}
})(TF)
