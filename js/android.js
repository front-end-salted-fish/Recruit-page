// android模块
!(() => {
    // 获取页面元素
    const $android = $('#android');
    const $fontBg = $('.font-bg');
    const $persOne = $('.pers-one');
    // 监听滚动条事件
    $android.on('scroll', function () {
        let scale = this.scrollTop / $persOne.get(0).clientHeight - 1;
        if (scale > 0) {
            $fontBg.css({
                opacity: 1 - scale
            });
        }
        if(this.scrollTop ==  0) {
            $fontBg.css({
                opacity: 1 
            });
        }
    })
})();