// 旋转菜单模块
!(() => {
    const $detailPages = $("#detail-pages")
    const $home = $('#home');
    const $imgs = $('#menu-list img');
    const $menuList = $('#menu-list')
    let c = 130;
    let flag = true;

    // 给五个菜单小图标绑定点击事件
    $imgs.on('click',throttle(rotaImg, 500));
    // 给菜单图标绑定点击事件
    $home.on('click', throttle(rota, 1000));
    // 给详情页绑定点击事件
    $detailPages.on('click', function (ev) {
        if (ev.target.id !== 'home' && !$(ev.target).hasClass('menu-item') && flag == false) {
            $home.get(0).style.transform = "scale(1) rotate(0) ";
            for (let i = 0; i < $imgs.length; i++) {
                $imgs.eq(i).css({
                    transform: "scale(1) rotate(0)",
                    transition: ".5s " + (($imgs.length - 1 - i) * 0.1) + "s ",
                    left: 0,
                    top: 0
                });
            }
            flag = true;
        }
    })

    /*
     * @desc 函数节流 时间戳版
     * @param func 函数
     * @param wait 延迟执行毫秒数
     */
    function throttle(func, wait) {
        let previous = 0;
        return function () {
            let now = Date.now();
            let context = this;
            let args = arguments;
            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }
    }
    // 延迟停止时调用此函数
    function end() {
        $home.get(0).style.transform = "scale(1) rotate(0) ";
        for (let i = 0; i < $imgs.length; i++) {
            $imgs.eq(i).css({
                transform: "scale(1) rotate(0)",
                transition: ".3s " + (($imgs.length - 1 - i) * 0.1) + "s ",
                left: 0,
                top: 0
            });
        }
        flag = true;
        setTimeout(() => {
            $(this).css({
                transition: "0",
                transform: "scale(1) rotate(-720deg)",
                opacity: 1
            })
        }, 500)
        $(this).off('transitionend', end);
    }
    //根据第三边和角度换算出坐标
    //角度转弧度   角度*π/180 =弧度
    const getPoint = (c, deg) => {
        let a = Math.round(Math.sin(deg * Math.PI / 180) * c);
        let b = Math.round(Math.cos(deg * Math.PI / 180) * c);
        return {
            x: a,
            y: b
        };
    }
    // 用于点击图片时调用的旋转函数
    function rotaImg(ev) {
        $(this).css({
            transition: ".3s linear",
            transform: "scale(2) rotate(-720deg)",
            opacity: 0
        });
        $(this).on("transitionend", end);

        // console.log($(this).index());
        curtainUp().then(()=>{
                // 幕布完全上遮后更换内容
                setTimeout(()=>{
                    $("#detail-pages").show();
                    $("#banner-container").hide();
                },800);
                return showPage($(this).index());
            }).then(curtainDown).then(function() {
                setTimeout(function(){
                    $($bars).css("z-index", -1);
                },800);
            });
        ev.stopPropagation();
        // return false;
    }
    // 用于点击home时调用的旋转函数
    function rota(ev) {
        if (flag) {
            this.style.transform = "scale(1) rotate(-720deg)";
            for (let i = 0; i < $imgs.length; i++) {
                $imgs.eq(i).css({
                    transform: "scale(1) rotate(-720deg)",
                    transition: ".5s " + (i * 0.1) + "s ",
                    left: -getPoint(c, i * 90 / ($imgs.length - 1)).x + "px",
                    top: -getPoint(c, i * 90 / ($imgs.length - 1)).y + "px"
                });
            }
        } else {
            this.style.transform = "scale(1) rotate(0) ";
            for (let i = 0; i < $imgs.length; i++) {
                $imgs.eq(i).css({
                    transform: "scale(1) rotate(0)",
                    transition: ".5s " + (($imgs.length - 1 - i) * 0.1) + "s ",
                    left: 0,
                    top: 0
                });
            }
        }
        flag = !flag;
        ev.stopPropagation();
    }


})();