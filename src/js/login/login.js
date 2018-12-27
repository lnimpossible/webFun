/**
 * Created by louis on 2017/10/30.
 */
(function() {
    document.onkeydown = function(e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            $(".login").click()
        }
    };
    function showError(title, data) {
        $(".loadingError").show();
        $('.loadingErrorImg').empty();
        let div = $("<span>" + title + "</span><span>" + data + "</span>")
        $(".loadingErrorImg").append(div);
        setTimeout(function() {
            $(".loadingError").hide()
        }, 1200)
    }
    $(".login").click(function() {
        if ($(".username").val() == "" && $(".password").val() == "") {
            showError("登陆错误", "用户名和密码不为空!")
            return
        } else if ($(".username").val() == "" && $(".password").val() != "") {
            showError("登陆错误", "用户名不为空!")
            return
        } else if ($(".username").val() != "" && $(".password").val() == "") {
            showError("登陆错误", "密码不为空!")
            return
        } else {
            TF['requestData'].login({ name: $(".username").val(), password: hex_md5($(".password").val()) }).then(function (data) {
                if(data.code==0){
                	TF.LoginCache.set(data.data);
                	location.href='index.html';
                }else{
                	TF.notice.message(data.msg)
                }
            });
        }
    });

    $(".push_down").click(function(e) {
        console.log(e);
        $(".loginForm").slideUp();
        $(".operatorText").animate({ "opacity": "0" }, 1000, "linear", function() {
            $(".operatorText").text("Sign Up").animate({ "opacity": "1" });
        });
        $(".centerDiv").animate({ "left": "33%" }, 1000, "linear", function() {
            $(".registerForm").slideDown();
        });
    });
    $(".push_up").click(function(e) {
        console.log(e);
        $(".operatorText").animate({ "opacity": "0" }, 1000, "linear", function() {
            $(".operatorText").text("Login").animate({ "opacity": "1" });
        });
        $(".registerForm").slideUp(function() {
            $(".loginForm").slideDown();
            $(".centerDiv").animate({ "left": "50%" }, 1000);
        });
    });
})();
