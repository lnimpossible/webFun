(function(TF){
    let userCenter = document.getElementsByClassName('js-inset-header-usercenter')[0];//个人中心按钮
    let backBtn = document.getElementsByClassName('js-inset-header-back')[0]; //返回按钮
    let featureWrap = document.getElementsByClassName('js-inset-header-feature')[0];//工具栏按钮
    console.log(userCenter);
    userCenter.addEventListener('click',function () {
        console.log('个人中心');
    });
    backBtn.addEventListener('click',function () {
        console.log('退出');
        TF.switchModule('monitor')
    });
    featureWrap.addEventListener('click', function (e) {
        let currentElement = e.target;
        let feature = currentElement.getAttribute('feature');
        console.log(feature);
    });
})(TF)
