/**
 * @description wrapper for Agora Signaling SDK
 * @description transfer some action to Promise and use Event instead of Callback
 */
(function (TF) {
    class SignalingClient {
        constructor(appId, appcertificate) {
            this._appId = appId
            this._appcert = appcertificate
            // init signal using signal sdk
            this.signal = Signal(appId) // eslint-disable-line
            // init event emitter for channel/session/call
            this.channelEmitter = new EventEmitter()
            this.sessionEmitter = new EventEmitter()
            this.callEmitter = new EventEmitter();

        }

        /**
         * @description login agora signaling server and init 'session'
         * @description use sessionEmitter to resolve session's callback
         * @param {String} account
         * @param {*} token default to be omitted
         * @returns {Promise}
         */
        login(account, token = '_no_need_token') {
            this._account = account
            return new Promise((resolve, reject) => {
                this.session = this.signal.login(account, token);
                // proxy callback on session to sessionEmitter
                [
                    'onLoginSuccess', 'onError', 'onLoginFailed', 'onLogout',
                    'onMessageInstantReceive', 'onInviteReceived'
                ].map(event => {
                    return this.session[event] = (...args) => {
                        this.sessionEmitter.emit(event, ...args)
                    }
                });
                // Promise.then
                this.sessionEmitter.on('onLoginSuccess', (uid) => {
                    this._uid = uid
                    resolve(uid)
                })
                // Promise.catch
                this.sessionEmitter.on('onLoginFailed', (...args) => {
                    reject(...args)
                })
                this.sessionEmitter.on('onLogout',(reason)=>{
                    console.log(reason);
                })
            })
        }

        /**
         * @description logout agora signaling server
         * @returns {Promise}
         */
        logout() {
            return new Promise((resolve, reject) => {
                this.session.logout()
                this.sessionEmitter.on('onLogout', (...args) => {
                    resolve(...args)
                })
            })
        }

        /**
         * @description join channel
         * @description use channelEmitter to resolve channel's callback
         * @param {String} channel
         * @returns {Promise}
         */
        join(channel) {
            this._channel = channel
            return new Promise((resolve, reject) => {
                if (!this.session) {
                    throw {
                        Message: '"session" must be initialized before joining channel'
                    }
                }
                this.channel = this.session.channelJoin(channel);
                // proxy callback on channel to channelEmitter
                [
                    'onChannelJoined',
                    'onChannelJoinFailed',
                    'onChannelLeaved',
                    'onChannelUserJoined',
                    'onChannelUserLeaved',
                    'onChannelUserList',
                    'onChannelAttrUpdated',
                    'onMessageChannelReceive'
                ].map(event => {
                    return this.channel[event] = (...args) => {
                        this.channelEmitter.emit(event, ...args)
                    }
                });
                // Promise.then
                this.channelEmitter.on('onChannelJoined', (...args) => {
                    resolve(...args)
                })
                // Promise.catch
                this.channelEmitter.on('onChannelJoinFailed', (...args) => {
                    reject(...args)
                })
            })
        }

        /**
         * @description leave channel
         * @returns {Promise}
         */
        leave() {
            return new Promise((resolve, reject) => {
                if (this.channel) {
                    this.channel.channelLeave()
                    this.channelEmitter.on('onChannelLeaved', (...args) => {
                        resolve(...args)
                    })
                } else {
                    resolve()
                }
            })
        }

        /**
         * @description send p2p message
         * @description if you want to send an object, use JSON.stringify
         * @param {String} peerAccount
         * @param {String} text
         */
        sendMessage(peerAccount, text) {
            this.session && this.session.messageInstantSend(peerAccount, text,function (e,t,n) {
                console.log(e);
            });
        }

        /**
         * @description broadcast message in the channel
         * @description if you want to send an object, use JSON.stringify
         * @param {String} text
         */
        broadcastMessage(text) {
            this.channel && this.channel.messageChannelSend(text);
        }
    }
    TF['SignalingClient']=SignalingClient;
})(TF);
