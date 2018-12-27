(function () {
    class LoginCache{
        constructor(){
            this.pathname = "TF_";
            this.key_info = this.pathname + 'SecurityInfo';
            this.userInfo = null;
        }

        remove(){
            $.cookie(this.key_info, null);
            location.href='login.html';
        }

        set(data){
            $.cookie(this.key_info, JSON.stringify(data),{expires:7});
        }

        check(){
            if ($.cookie(this.key_info) === "null" || $.cookie(this.key_info) === undefined) {
                location.href = "login.html";
            }else{
                this.userInfo = JSON.parse($.cookie(this.key_info));
            }
        }

    }

    TF.LoginCache = new LoginCache();
})();
