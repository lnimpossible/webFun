/**
 * Created by Administrator on 2018/9/7/007.
 */
(()=>{
	let isLogout = false;
    let requestUrl={
        getTrafficStatus:'https://restapi.amap.com/v3/traffic/status/circle?location=121.24238364618085,31.058409758032177&radius=1500&key=6cc0876b445580e4e4ed268dd1d87626', //交通态势数据
        getParkNum:'http://101.91.210.109:8082/system/external/parking/list',
        getMessageList:ROOT_IP+'',
        userList: ROOT_IP+'userList', //用户列表
        announcement: ROOT_IP+'noticeList', // 公告
        userHistoryLocation: ROOT_IP+'userHistoryLocation', // 人员轨迹
        login: ROOT_IP+'login', //登录接口
        bindUserId: WEBSOCKETCONNECT_URL, // 绑定websocket用户id
        modifyPersonInfo: ROOT_IP+'userInformationUpdate',// 修改个人信息接口
        gSearch: ROOT_IP+'search', // 全局搜索
        situation2Me: ROOT_IP+'conditionAcceptList', // 上报给我的情况列表
        situationISend: ROOT_IP+'conditionSendList', // 我上报的情况列表
        situationStatusChange: ROOT_IP+'conditionStatusChange', // 修改情况状态
        situationUpload: ROOT_IP+'conditionUpload', // 上报情况
        situationTypeList: ROOT_IP+'conditionTypeList', // 情况类型
        situationAll: ROOT_IP+'conditionAll', // 所有情况
        taskUpload: ROOT_IP+'taskUpload', // 派发任务
        taskDelete: ROOT_IP+'taskDelete', // 删除任务
        taskSendList: ROOT_IP+'taskSendList', // 我派发的任务
        taskAcceptList: ROOT_IP+'taskAcceptList', // 派发我的任务
        taskStatusChange: ROOT_IP+'taskStatusChange', // 修改任务状态
        taskAll: ROOT_IP+'taskAll', // 所有任务
        planList: ROOT_IP+'planList', // 预案列表
        planLog: ROOT_IP+'planLog', // 预案触发记录
        boxSelect: ROOT_IP+'boxSelect', // 框选
        lineSelect: ROOT_IP+'bufferSelect', // 线选
        nearby: ROOT_IP+'nearby', // 附近的人或物
        viewList: ROOT_IP+'viewList', //视角列表
        viewAdd: ROOT_IP+'viewAdd', //视角新增
        viewDelete: ROOT_IP+'viewDelete', //视角删除
        systemInformation: ROOT_IP+'systemInformation', //pve网站信息配置
        pathList: ROOT_IP+'pathList', //gis巡视路线列表
        pathAdd: ROOT_IP+'pathAdd', //gis巡视路线新增
        pathDelete: ROOT_IP+'pathDelete', //gis巡视路线删除
        talkRecordSave: ROOT_IP+'talkRecordSave', //保存聊天记录
        getTalkList: ROOT_IP+'talkList', //获取聊天记录
        getTalkUserList: ROOT_IP+'talkUserList', //获取会话列表
        talkGroupRecordSave: ROOT_IP+'talkGroupRecordSave', //保存群聊聊天记录
        talkUserListDelete: ROOT_IP+'talkUserListDelete', //删除会话列表
        createTalkGroup: ROOT_IP+'talkGroupCreate', //创建群组
        talkGroupList: ROOT_IP+'talkGroupList', //群聊聊天记录
        talkRecordStatus: ROOT_IP+'talkRecordStatus', //用户通知列表
        talkGroupInformation: ROOT_IP+'talkGroupInformation', //获取群成员信息
        userNoticeList: ROOT_IP+'userNoticeList', //用户通知列表
        noticeDetail: ROOT_IP+'noticeDetail', //用户通知详情
        uploadFile: UPLOAD_IP+'commonUpload', //图片文件上传
        getRainTunnelData: 'static/json/yushui.json', //雨水排水管线数据
        getSewageTunnelData: 'static/json/wushui.json', //污水排水管线数据
        getWaterTunnelData: 'static/json/jishui.json', //供水管线数据
        getCableTunnelData: 'static/json/youxian.json', //有限电缆管道数据
        getDeviceList: ROOT_IP+'deviceList', //设备列表
        getUserLocation: ROOT_IP+'userLocation', //人员定位
        getDeviceListByType: ROOT_IP+'deviceTypeList', //根据设备类型获取设备list
        getBuildingList: ROOT_IP+'buildingList', //获取建筑list
        getRoomList: ROOT_IP + 'roomList', // 室内建筑
        analysis: ROOT_IP + 'pveDataAnalysis', // 数据分析
    }
    class XhrRequest{
        constructor(){
        }
        get(url, parameter, sucFun){
            if (typeof arguments[1] === 'function') {
                this.ajax(url, {}, arguments[1], arguments[2], "get");
            } else {
                this.ajax(url, parameter,sucFun, "get");
            }
        }
        post (url, parameter, sucFun) {
            this.ajax(url, parameter, sucFun ,"post");
        };

        ajax(url, parameter, sucFun , type) {
        	if(isLogout){return};
        	var parameter = parameter||{};
        	parameter.user_id=TF.LoginCache.userInfo.id;
            $.ajax({
                url: url,
                type: type,
                cache: false,
                dataType:"json",
                headers:{
                    "Token": TF.LoginCache.userInfo.token_user
                },
                data: parameter,
                success: function (res) {
                	if(res.code === 0 || res.status === "success" || res.info === "OK"){
                        sucFun(res)
                	}else if(res.code===12){
                		isLogout = true;
                        TF.Notice.message("已在其他设备登录，如非自己操作，请及时更改密码，系统即将自动退出,请重新登录!!",TF.LoginCache.remove.bind(TF.LoginCache));
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })
        };
    }
    let xhrRequest=TF['xhrRequest']=new XhrRequest();
    class RequestData{
        constructor(){
            this.cache={};
        }
        /**
         * 查询商务区停车场数据
         * get
         * */
        getParkNumber(params) {
            let that=this;
            let promise=new Promise(function (resolve) {
                xhrRequest.get(requestUrl.getParkNum,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        /**
         * gis巡视路线新增
         * params   {} 接口所需参数
         * name   position_set height speed
         * */
        pathAdd(params) {
            let that=this;
            let promise=new Promise(function (resolve) {
                xhrRequest.get(requestUrl.pathAdd,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        /**
         * gis巡视路线列表
         * params   {} 接口所需参数
         * page页码  unit条数
         * */
        pathList(params) {
            let that=this;
            let promise=new Promise(function (resolve) {
            	if('pathList' in that.cache){
	                resolve(that.cache.pathList);
	                return
	            }
                xhrRequest.get(requestUrl.pathList,params,function (response) {
                	that.cache.pathList = response.data;
                    resolve(response.data);
                })
            });
            return promise;
        }
        /**
         * pve网站信息配置
         * params   {} 接口所需参数
         * page页码  unit条数
         * */
        systemInformation(params) {
            let that=this;
            let promise=new Promise(function (resolve) {
                xhrRequest.get(requestUrl.systemInformation,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        /*
         * 框选
         */
        boxSelect(parama){
        	let that=this;
            let promise=new Promise(function (resolve) {
                xhrRequest.post(requestUrl.boxSelect,parama,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        /*
         * 线选
         */
        lineSelect(parama){
        	let that=this;
            let promise=new Promise(function (resolve) {
                xhrRequest.post(requestUrl.lineSelect,parama,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        /*
         * 附近的人设备
         */
        nearby(parama){
        	let that=this;
            let promise=new Promise(function (resolve) {
                xhrRequest.post(requestUrl.nearby,parama,function (response) {
                	if(response.data.length==0){
                		switch(parama.type){
                			case 'device_camera': var notice = '摄像头'; break;
                			case 'device_fire_hydrant': var notice = '消防栓'; break;
                			case 'user_list': var notice = '人员'; break;
                		}
                		TF.notice.message('附近无'+notice);
                		return
                	}
                    resolve(response.data);
                })
            });
            return promise;
        }
        /**
         * 视角删除
         * params   {} 接口所需参数
         * id 所删除记录id
         * */
        viewDelete(params) {
            let that=this;
            let promise=new Promise(function (resolve) {
                xhrRequest.post(requestUrl.viewDelete,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        /**
         * 视角新增
         * params   {} 接口所需参数
         * name   password
         * */
        viewAdd(params) {
            let that=this;
            let promise=new Promise(function (resolve) {
                xhrRequest.post(requestUrl.viewAdd,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        /**
         * 视角列表
         * params   {} 接口所需参数
         * page页码  unit条数
         * */
        viewList(params) {
            let that=this;
            let promise=new Promise(function (resolve) {
                xhrRequest.get(requestUrl.viewList,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        /**
         * 登录接口
         * params   {} 接口所需参数
         * name   password
         * */
        login(params) {
            let that=this;
            let promise=new Promise(function (resolve) {
                $.post(requestUrl.login,params,function (response) {
                    resolve(response);
                })
            });
            return promise;
        }
        bindUserId(params){
        	let that=this;
            let promise=new Promise(function (resolve) {
                xhrRequest.post(requestUrl.bindUserId,params,function (response) {
                    resolve(response);
                })
            });
            return promise;
        }
        /*
         * 修改个人信息
         */
        modifyPersonInfo(params){
        	let that=this;
            let promise=new Promise(function (resolve) {
                xhrRequest.post(requestUrl.modifyPersonInfo,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }

        /*
         * 全局搜索
         */
        gSearch(parama){
        	let that=this;
            let promise=new Promise(function (resolve) {
                xhrRequest.get(requestUrl.gSearch,parama,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }

        /*
         * 获取人员列表
         */
        getUserList(){
        	let that = this;
        	let promise = new Promise(function(resolve){
                if('userList' in that.cache){
                    resolve(that.cache.userList);
                    return
                }
        		xhrRequest.get(requestUrl.userList, function (response){
        			if(response.code == 0){
        				that.cache.userList = response.data;
                    	resolve(response.data);
        			}
                })
        	});
        	return promise
        }
        /*
         * 公告
         */
        getAnnouncement(paramater){
        	let that = this;
        	let promise = new Promise(function(resolve){
//              if('announcement' in that.cache){
//                  resolve(that.cache.announcement);
//                  return
//              }
        		xhrRequest.get(requestUrl.announcement, paramater, function (response){
        			if(response.code == 0){
        				that.cache.announcement = response;
                    	resolve(response);
        			}
                })
        	});
        	return promise
        }
        /**
         * 人员历史轨迹
         */
        userHistoryLocation(paramater){
        	let that = this;
        	let promise = new Promise(function(resolve){
        		xhrRequest.post(requestUrl.userHistoryLocation, paramater, function (response){
        			if(response.code == 0){
                    	resolve(response.data);
        			}
                })
        	});
        	return promise
        }
        /*
         * 获取上报给我的情况列表
         */
        getSituation2Me(parama){
        	let that = this;
        	let promise = new Promise(function(resolve){
//              if('situationList' in that.cache){
//                  resolve(that.cache.situationList);
//                  return
//              }
        		xhrRequest.get(requestUrl.situation2Me,parama, function (response){
        			if(response.code == 0){
        				that.cache.situationList = response.data;
                    	resolve(response.data);
        			}
                })
        	});
        	return promise
        }
        /*
         * 获取我上报的情况列表
         */
        getSituationISend(parama){
        	let that = this;
        	let promise = new Promise(function(resolve){
                if('situationList1' in that.cache){
                    resolve(that.cache.situationList1);
                    return
                }
        		xhrRequest.get(requestUrl.situationISend,parama, function (response){
        			if(response.code == 0){
        				that.cache.situationList1 = response.data;
                    	resolve(response.data);
        			}
                })
        	});
        	return promise
        }
        situationStatusChange(parama){
        	let that = this;
        	let promise = new Promise(function(resolve){
        		xhrRequest.post(requestUrl.situationStatusChange,parama, function (response){
        			if(response.code == 0){
                    	resolve(response.data);
        			}
                })
        	});
        	return promise
        }
        situationUpload(parama){
        	let that = this;
        	let promise = new Promise(function(resolve){
        		xhrRequest.post(requestUrl.situationUpload,parama, function (response){
        			if(response.code == 0){
                    	resolve(response.data);
        			}
                })
        	});
        	return promise
        }
        situationTypeList(){
        	let that = this;
        	let promise = new Promise(function(resolve){
        		if('situationTypeList' in that.cache){
                    resolve(that.cache.situationTypeList);
                    return
                }
        		xhrRequest.get(requestUrl.situationTypeList, function (response){
        			if(response.code == 0){
                    	resolve(response.data);
        			}
                })
        	});
        	return promise
        }
        situationAll(paramater){
        	let that = this;
        	let promise = new Promise(function(resolve){
        		if('situationAll' in that.cache){
                    resolve(that.cache.situationAll);
                    return
                }
        		xhrRequest.get(requestUrl.situationAll, paramater, function (response){
        			if(response.code == 0){
                    	resolve(response.data);
        			}
                })
        	});
        	return promise
        }
        /*
         * 派发任务
         */
        taskUpload(parama){
        	let that = this;
        	let promise = new Promise(function(resolve){
        		xhrRequest.post(requestUrl.taskUpload, parama, function (response){
        			if(response.code == 0){
                    	resolve(response);
        			}
                })
        	});
        	return promise
        }
        taskDelete(parama){
        	let that = this;
        	let promise = new Promise(function(resolve){
        		xhrRequest.post(requestUrl.taskDelete, parama, function (response){
        			if(response.code == 0){
                    	resolve(response);
        			}
                })
        	});
        	return promise
        }
        /*
         * 我派发的任务
         */
        taskSendList(parama){
        	let that = this;
        	let promise = new Promise(function(resolve){
        		xhrRequest.get(requestUrl.taskSendList, parama, function (response){
        			if(response.code == 0){
                    	resolve(response.data);
        			}
                })
        	});
        	return promise
        }
        /*
         * 派发给我的任务
         */
        taskAcceptList(parama){
        	let that = this;
        	let promise = new Promise(function(resolve){
        		xhrRequest.get(requestUrl.taskAcceptList, parama, function (response){
        			if(response.code == 0){
                    	resolve(response.data);
        			}
                })
        	});
        	return promise
        }
        taskStatusChange(parama){
        	let that = this;
        	let promise = new Promise(function(resolve){
        		xhrRequest.post(requestUrl.taskStatusChange, parama, function (response){
        			if(response.code == 0){
                    	resolve(response);
        			}
                })
        	});
        	return promise
        }
        taskAll(paramater){
        	let that = this;
        	let promise = new Promise(function(resolve){
        		if('taskAll' in that.cache){
                    resolve(that.cache.taskAll);
                    return
                }
        		xhrRequest.get(requestUrl.taskAll, paramater, function (response){
        			if(response.code == 0){
                    	resolve(response.data);
        			}
                })
        	});
        	return promise
        }
        planList(paramater){
        	let that = this;
        	let promise = new Promise(function(resolve){
        		if('planList' in that.cache){
                    resolve(that.cache.planList);
                    return
                }
        		xhrRequest.get(requestUrl.planList, paramater, function (response){
        			if(response.code == 0){
                    	resolve(response.data);
        			}
                })
        	});
        	return promise
        }
        planLog(paramater){
        	let that = this;
        	let promise = new Promise(function(resolve){
//      		if('planList' in that.cache){
//                  resolve(that.cache.planList);
//                  return
//              }
        		xhrRequest.get(requestUrl.planLog, paramater, function (response){
        			if(response.code == 0){
                    	resolve(response.data);
        			}
                })
        	});
        	return promise
        }
        /*
         * 根据位置获取地址信息
         */
        getAddressByPosition(pos){
        	var geocoder = new AMap.Geocoder({city: '全国'});
        	var lon = pos.longitude;
        	var lat = pos.latitude;
        	let promise = new Promise(function(resolve){
        		geocoder.getAddress([lon, lat], function(status, result) {
				    if (status === 'complete' && result.info === 'OK') {
				        resolve(result.regeocode.formattedAddress);
				    }
	        	});
			})
        	return promise
        }
        /**
         * 获取雨水管道数据
         * */
        getRainTunnelData(realTime){
            let that=this;
            let promise = new Promise(function(resolve){
                if( !realTime&&that.cache['getRainTunnelData']){
                    resolve(that.cache['getRainTunnelData']);
                    return ;
                }
                $.getJSON(requestUrl.getRainTunnelData,function (result) {
                   let tunnelData =result.features.map(function (val) {
                        let obj={
                            id:val.properties.OBJECTID,
                            length:val.properties.SHAPE_Leng,
                            radius:val.properties.radius,
                            depth:val.properties.depth,
                            coordinates:val.geometry.coordinates
                        }
                        return obj
                    });
                    resolve(tunnelData);
                    that.cache['getRainTunnelData']=tunnelData;
                    //console.log(tunnelData);
                })
            });
            return promise
        }
        /**
         * 获取污水管道数据
         * */
        getSewageTunnelData(realTime){
            let that=this;
            let promise = new Promise(function(resolve){
                if( !realTime&&that.cache['getSewageTunnelData']){
                    resolve(that.cache['getSewageTunnelData']);
                    return ;
                }
                $.getJSON(requestUrl.getSewageTunnelData,function (result) {
                    let tunnelData =result.features.map(function (val) {
                        let obj={
                            id:val.properties.OBJECTID,
                            length:val.properties.SHAPE_Leng,
                            radius:val.properties.radius,
                            depth:val.properties.depth,
                            coordinates:val.geometry.coordinates
                        }
                        return obj
                    });
                    resolve(tunnelData);
                    that.cache['getSewageTunnelData']=tunnelData;
                    //console.log(tunnelData);
                })
            });
            return promise
        }
        /**
         * 获取供水管道数据
         * */
        getWaterTunnelData(realTime){
            let that=this;
            let promise = new Promise(function(resolve){
                if( !realTime&&that.cache['getWaterTunnelData']){
                    resolve(that.cache['getWaterTunnelData']);
                    return ;
                }
                $.getJSON(requestUrl.getWaterTunnelData,function (result) {
                    let tunnelData =result.features.map(function (val) {
                        let obj={
                            id:val.properties.OBJECTID,
                            length:val.properties.SHAPE_Leng,
                            radius:val.properties.radius,
                            depth:val.properties.depth,
                            coordinates:val.geometry.coordinates
                        }
                        return obj
                    });
                    resolve(tunnelData);
                    that.cache['getWaterTunnelData']=tunnelData;
                   // console.log(tunnelData);
                })
            });
            return promise
        }
        /**
         * 获取有限电缆管道数据
         * */
        getCableTunnelData(realTime){
            let that=this;
            let promise = new Promise(function(resolve){
                if( !realTime&&that.cache['getCableTunnelData']){
                    resolve(that.cache['getCableTunnelData']);
                    return ;
                }
                $.getJSON(requestUrl.getCableTunnelData,function (result) {
                    let tunnelData =result.features.map(function (val) {
                        let obj={
                            id:val.properties.OBJECTID,
                            length:val.properties.SHAPE_Leng,
                            radius:val.properties.radius,
                            depth:val.properties.depth,
                            coordinates:val.geometry.coordinates
                        }
                        return obj
                    });
                    resolve(tunnelData);
                    that.cache['getCableTunnelData']=tunnelData;
                    // console.log(tunnelData);
                })
            });
            return promise
        }
        /**
         * 保存聊天记录
         * */
        talkRecordSave(params) {
            let promise=new Promise(function (resolve) {
                xhrRequest.post(requestUrl.talkRecordSave,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        /**
         * 获取聊天记录列表  群聊聊天记录列表
         * */
        getTalkList(params,type){
            let url=type==='instant'?requestUrl.getTalkList:requestUrl.talkGroupList;
            let promise = new Promise(function(resolve){
                xhrRequest.post(url,params,function (response) {
                    resolve(response);
                })
            });
            return promise
        }
        /**
         * 获取会话记录列表
         * */
        getTalkUserList(params){
            let that=this;
            let promise = new Promise(function(resolve){
                xhrRequest.post(requestUrl.getTalkUserList,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        talkRecordStatus(params){
            let promise = new Promise(function(resolve){
                xhrRequest.post(requestUrl.talkRecordStatus,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        /**
         * 创建群组
         * */
        createTalkGroup(params){
            let promise = new Promise(function(resolve){
                xhrRequest.post(requestUrl.createTalkGroup,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }

        /**
         * 保存群聊天记录
         * */
        talkGroupRecordSave(params){
            let promise = new Promise(function(resolve){
                xhrRequest.post(requestUrl.talkGroupRecordSave,params,function (response) {
                    resolve(response.data);
                    console.log(response.data);
                })
            });
            return promise;
        }
        /**
         * 删除会话列表
         * */
        talkUserListDelete(params){
            let promise = new Promise(function(resolve){
                xhrRequest.post(requestUrl.talkUserListDelete,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        /**
         * 获取群成员信息
         * */
        talkGroupInformation(params){
            let promise = new Promise(function(resolve){
                xhrRequest.post(requestUrl.talkGroupInformation,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        /**
         * 获取通知列表
         * */
        userNoticeList(params){
            let promise = new Promise(function(resolve){
                xhrRequest.get(requestUrl.userNoticeList,params,function (response) {
                    resolve(response);
                })
            });
            return promise;
        }
        /**
         * 获取通知详情
         * */
        noticeDetail(params){
            let promise = new Promise(function(resolve){
                xhrRequest.post(requestUrl.noticeDetail,params,function (response) {
                    resolve(response.data);
                })
            });
            return promise;
        }
        /**
         * 文件  图片 上传
         * */
        uploadFile(params){
            let promise = new Promise(function(resolve){
                $.ajax({
                    url: requestUrl.uploadFile,
                    type: 'POST',
                    cache: false,
                    data: params,
                    processData: false,
                    contentType: false,
                }).done(function (response) {
                    resolve(response.data);
                }).fail(function (res) {
                    console.log(res);
                })
            });
            return promise;
        }
        /** 获取设备列表**/
        getDeviceList(params,realTime){
            let that=this;
            let promise = new Promise(function(resolve){
                if( !realTime&&that.cache['getDeviceList']){
                    resolve(that.cache['getDeviceList']);
                    return ;
                }
                xhrRequest.get(requestUrl.getDeviceList,params,function (response) {
                    resolve(response.data);
                    that.cache['getDeviceList']=response.data;
                })
            });
            return promise;
        }
        /** 获取人员定位**/
        getUserLocation(params,realTime){
            let that=this;
            let promise = new Promise(function(resolve){
                if( !realTime&&that.cache['getUserLocation']){
                    resolve(that.cache['getUserLocation']);
                    return ;
                }
                xhrRequest.get(requestUrl.getUserLocation,params,function (response) {
                    resolve(response.data);
                    that.cache['getUserLocation']=response.data;
                })
            });
            return promise;
        }
        /** 根据设备类型获取设备list**/
        getDeviceListByType(params,realTime){
            let that=this;
            let promise = new Promise(function(resolve){
                if( !realTime&&that.cache[params.type]){
                    resolve(that.cache[params.type]);
                    return ;
                }
                xhrRequest.get(requestUrl.getDeviceListByType,params,function (response) {
                    resolve(response.data);
                    that.cache[params.type]=response.data;
                })
            });
            return promise;
        }
        /** 根据设备类型获取设备list**/
        getBuildingList(params,realTime){
            let that=this;
            let promise = new Promise(function(resolve){
                if( !realTime&&that.cache['getBuildingList']){
                    resolve(that.cache['getBuildingList']);
                    return ;
                }
                xhrRequest.get(requestUrl.getBuildingList,params,function (response) {
                    resolve(response.data);
                    that.cache['getBuildingList']=response.data;
                })
            });
            return promise;
        }

        getRoomList (floorId) {
            let that = this;
            let promise = new Promise(function(resolve){
                if(that.cache[floorId]){
                    resolve(that.cache[floorId]);
                    return ;
                }
                xhrRequest.get(requestUrl.getRoomList,{'floor_id':floorId},function (response) {
                    resolve(response.data);
                    that.cache[floorId]=response.data;
                })
            });
            return promise;
        }
        getAnalysis(parameter){
        	let that = this;
            let promise = new Promise(function(resolve){
//              if(that.cache[floorId]){
//                  resolve(that.cache[floorId]);
//                  return ;
//              }
                xhrRequest.get(requestUrl.analysis,parameter,function (response) {
                    resolve(response.data);
//                  that.cache[floorId]=response.data;
                })
            });
            return promise;
        }
    }
	let requestData=TF['requestData']=new RequestData();
     requestData.getRainTunnelData();
     requestData.getSewageTunnelData();
     requestData.getWaterTunnelData();
     requestData.getCableTunnelData();
})();
