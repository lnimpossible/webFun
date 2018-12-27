(function(TF){
	console.log(TF.LoginCache)
	let userId = TF.LoginCache.userInfo.id;
	let ws = new WebSocket(WEBSOCKET_URL);
	
	ws.onopen=function(event){
		console.log('webSocket连接成功!');
	}
	
	ws.onmessage=function(event){
		var objData = JSON.parse(event.data);
		console.log(objData)
		if(objData.type=='connect_socket'){
			var bindUserIDParama = {
				user_id: userId,
				client_id: objData.data.client_id
			}
			TF.requestData.bindUserId(bindUserIDParama).then(function(res){
				console.log('webSocket绑定用户成功!')
			})
		}
		if(objData.type=='condition'){
			var exp = objData.data.status_code.toString();
			switch(exp){
				case '1': var msg = '收到新情况!'; break;
				case '2': var msg = '情况开始处置!'; break;
				case '3': var msg = '已处置完成，请审核!'; break;
				case '4': 
				var msg = '已完成!';
				TF.earthExecute.removeEvent(objData.data.id);
				break;
			}
			var message = '<span style="color: #fcb90e;">'+objData.data.name+'</span>'+msg;
			TF.notice.message(message);
			TF.refreshNewestSituation();
			TF.refreshSituation&&TF.refreshSituation();
			TF.chatEffect.constructChatList();
		}
		if(objData.type=='task'){
			var exp = objData.data.status_code.toString();
			switch(exp){
				case '1': var msg = '收到新任务!'; break;
				case '2': var msg = '已接受，并开始执行!'; break;
				case '3': var msg = '已完成，请审核!'; break;
				case '4': 
				var msg = '已完成!';
				TF.earthExecute.removeEvent(objData.data.id);
				break;
				case '5': var msg = '已被拒绝!'; break;
			}
			var message = '<span style="color: #fcb90e;">'+objData.data.name+'</span>任务'+msg;
			TF.notice.message(message);
			TF.refreshNewestSituation();
            TF.chatEffect.constructChatList();
		}
		if(objData.type=='plan_view'){
			console.log('触发了预案');
			if(objData.data.position){
        		var coordinate=TF.layerManage.toWgs84Coordinate(objData.data.position);
				Pangu.Location.flyTo(coordinate.longitude,coordinate.latitude,300);
        	}
		}
		if(objData.type=="plan_task"){
			TF.notice.message('收到新任务!');
		}
	}
	
	ws.onclose=function(){
		console.log('关闭')
	}
})(TF)
		