(function(TF){
	class Notice{
		constructor(){
			this.messageNum = 1;
			var messageBox = document.createElement('div');
			messageBox.className = 'message-box';
			document.body.appendChild(messageBox);
			this.messageBox = messageBox;
			this.messageArr = [];
		}

		message(msg, cb){
			var animationTime = 1;
			var msgDom = document.createElement('div');
			msgDom.className = 'g-message g-message-down';
			msgDom.innerHTML = '<p class="message-text">'+msg+'</p>';
			document.body.appendChild(msgDom);
			msgDom.addEventListener('animationend', function(){
				if(animationTime == 1){
					setTimeout(function(){
						msgDom.className = 'g-message g-message-up';
						if(cb && typeof cb == 'function'){
							cb()
						}
					},2500)
				}else{
					document.body.removeChild(msgDom);
				}
				animationTime++
			})
		}

		confirm(msg, okFn, cancelFn){
			var confirmDom = document.createElement('div');
			confirmDom.className = 'g-confirm-box';
			var str='<div class="g-confirm position-center">'+
						'<p class="confirm-text">'+msg+'</p>'+
						'<div class="confirm-btns flex justify-between">'+
							'<span class="confirm-calcel confirm-btn">取消</span>'+
							'<span class="confirm-ok confirm-btn">确认</span>'+
						'</div>'+
					'</div>';
			confirmDom.innerHTML = str;
			document.body.appendChild(confirmDom);
			$('.confirm-calcel').click(function(){
				document.body.removeChild(confirmDom);
				cancelFn&&cancelFn()
			})
			$('.confirm-ok').click(function(){
				document.body.removeChild(confirmDom);
				okFn()
			})
		}
		
		geoParkBoard(parkName, remaining, pressure){
			
		}
	}

	TF.Notice = TF.notice = new Notice();
})(TF)
