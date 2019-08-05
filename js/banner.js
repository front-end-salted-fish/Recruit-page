// 轮播图
(() => {
    // 获取轮播图索引按钮
    let $btns = $(".banner-btn span");
    let $bannerPages = $("#banner li");
    // 获取banner UL
    let $bannerUl = $("#banner");
    // 获取每一页轮播图的img、部门图片、部门边框
    let $bannerImgs = $("#banner .outer-mask img");
    let $bannerFont = $(".banner-font");
    let $bannerBorder = $(".banner-border");

    // index: 			0  	1  	 2   3  	 4
    // 对应部门: 	 前端 安卓 后台 IOS 机器学习

    // 存放每一张轮播图的url
    let bannerImgScr = ["img/front-end/轮播图.jpg", "img/android/轮播图.jpg", "img/back-stage/轮播图.png", "img/ios/轮播图.jpeg", "img/machine-learning/轮播图.jpg"];
    // 存放每一张部门文字的url
    let bannnerFontScr = ["img/front-end/banner-frontend-font.png", "img/android/banner-android-font.png", "img/back-stage/banner-backstage-font.png", "img/ios/banner-ios-font.png", "img/machine-learning/banner-machine-font.png"];
    // 存放每一张部门文字边框的url
    let fontBorderScr = ["img/front-end/banner-frontend-font-border.png", "img/android/banner-android-font-border.png", "img/back-stage/banner-backstage-font-border.png", "img/ios/banner-ios-font-border.png", "img/machine-learning/banner-machine-font-border.png"];
    // 存放切换颜色
    let bgColors = ["#82ece4", "#113f2ef5", "rgb(15, 95, 142)", "rgb(115, 111, 110)", "rgba(244, 208, 177, 0.99)"];

    let classArr = ["pre-page", "mid-page", "next-page"];

    let $nextBannerBtn = $("#banner-container .next-btn"); // 下一页按钮
    let $preBannerBtn = $("#banner-container .pre-btn"); // 上一页按钮

    // 正在播放的页index值
    let playIndex = 0;
    // 设置轮播图的class
    function resetClass1() {
        for (let i = 0; i < $bannerPages.length; i++) {
            $($bannerPages[i]).removeClass("pre-page mid-page next-page").addClass(classArr[i]);
        }
    }
    // 清楚transition类名
    function resetClass2() {
        for (let i = 0; i < $bannerPages.length; i++) {
            $($bannerPages[i]).removeClass("banner-out banner-in");
        }
    }

    // 初始化轮播图
    (function startBanner() {
        resetClass1();
        // 给中间页加载前端(第一个)板块
        preSetSrc("mid-page", 0);
        // 设置第一个背景颜色
        $bannerUl.css("background-color", bgColors[0]);
        // 设置第一个按钮颜色
        $($btns[playIndex]).css({
                opacity: 1,
                transform: "scale(1)"
            }).parent(".banner-btn").siblings().children()
            .css({
                opacity: 0,
                transform: "scale(0)"
            });
        // bindClick();
        goBanner();
    })();



    // 启动轮播图
    var bannerTimer;
    function goBanner() {
        bannerTimer = setInterval(() => {
            nextBannerPage(playIndex + 1);
        }, 6000);
    }
    // 停止轮播图
    function stopBanner(){
        clearInterval(bannerTimer);
    }

    // // 是否可以切换下一页 
    // let canClick = true;
    // // 每次动画结束重新绑定事件和重启轮播图


    // 根据按钮设置给obj设置轮播图、部门字体、部门字体边框的src
    // obj 为 $prePage,$midPage,$nextPage 
    // index 设置对应index的部门内容
    function preSetSrc(str, index) {
        $($bannerImgs[classArr.indexOf(str)]).attr("src", bannerImgScr[index]);
        $($bannerFont[classArr.indexOf(str)]).attr("src", bannnerFontScr[index]);
        $($bannerBorder[classArr.indexOf(str)]).attr("src", fontBorderScr[index]);
    }
    // 向下翻页函数
    // index为跳转的部门index
    function nextBannerPage(index) {
        // 越界判断
        // index = index || (playIndex + 1);
        playIndex = (index == bannerImgScr.length) ? 0 : index;
        $bannerUl.css("background-color", bgColors[playIndex]);
        // 更新下一张轮播图的信息
        preSetSrc("next-page", playIndex);
        // 清楚transition类名
        resetClass2();
        // 数组操作
        $($bannerPages[classArr.indexOf("mid-page")]).addClass("banner-out");
        $($bannerPages[classArr.indexOf("next-page")]).addClass("banner-in");
        classArr.unshift(classArr.pop());
        resetClass1();
        $($btns[playIndex]).css({
                opacity: 1,
                transform: "scale(1)"
            }).parent(".banner-btn").siblings().children()
            .css({
                opacity: 0,
                transform: "scale(0)"
            });
    }
    // 向上翻页函数
    // index为跳转的部门index
    function preBannerPage(index) {
        // 越界判断
        playIndex = (index == -1) ? bannerImgScr.length - 1 : index;
        $bannerUl.css("background-color", bgColors[playIndex]);
        // 更新下一张轮播图的信息
        preSetSrc("pre-page", playIndex);
        // 清楚transition类名
        resetClass2();
        // 数组操作
        $($bannerPages[classArr.indexOf("mid-page")]).addClass("banner-out");
        $($bannerPages[classArr.indexOf("pre-page")]).addClass("banner-in");
        classArr.push(classArr.shift());
        resetClass1();
        $($btns[playIndex]).css({
            opacity: 1,
            transform: "scale(1)"
            }).parent(".banner-btn").siblings().children()
            .css({
            opacity: 0,
            transform: "scale(0)"
            });
    }


    /*
     * @desc 轮播图节流 时间戳版本
     * @param func 函数
     * @param index 跳转页面index
      * @param wait 延迟执行毫秒数
     */
    // 共享previous
    let previous = 0;
    function throttleBanner(func, index, wait) {
            let now = Date.now();
            let context = this;
            var p = new Promise(function (resolve, reject) {
                if (now - previous > wait) {
                    func.call(context, index); // 调用换页函数
                    stopBanner();	// 停止轮播
                    previous = now;	
                    resolve();
                }
            });
            return p;
    }


    // 跳转翻页
    $(".banner-btns").on("click", (event) => {
        let e = event || window.event;
        let t = e.target;
        if ($(t).hasClass("bg-span")) {
            // stopBanner(); // 停止轮播
            let index = $(t).parent(".banner-btn").index();
            if (index > playIndex) {
                throttleBanner(nextBannerPage, index, 3180).then(()=>{
                    setTimeout(()=>{
                        goBanner();
                    }, 3180)
                },() => alert(1));
            } else if (index < playIndex) {
                throttleBanner(preBannerPage, index, 3180).then(()=>{
                    setTimeout(()=>{
                        goBanner();
                    }, 3180)
                });
            }
        }
    });

    // 下翻页节流
    function throttleNextBanner() {
        throttleBanner(nextBannerPage, (playIndex + 1), 3180).then(()=>{
            setTimeout(()=>{
                goBanner();
            }, 3180)
        });
    }
    $nextBannerBtn.on("click",throttleNextBanner);

    // 上翻页节流
    function throttlePreBanner(){
        throttleBanner(preBannerPage, (playIndex - 1), 3180).then(()=>{
            setTimeout(()=>{
                goBanner();
            }, 3180)
        });
    }
    $preBannerBtn.on("click", throttlePreBanner);
    
    // 跳转至详情页
    $("#banner li").on("click",function(event){
        let e = event || window.event;
        let t = e.target;
        let index;
        // 如果是背景图或者是字体
        if(t.tagName === "IMG"){
            // 获取部门index
            if($(t).hasClass("banner-border")){
                index = fontBorderScr.indexOf($(t).attr("src"));
            } else {
                index = bannerImgScr.indexOf($(t).attr("src"));
            }
            curtainUp().then(()=>{
                // 幕布完全上遮后更换内容
                setTimeout(()=>{
                    $("#detail-pages").show();
                    $("#banner-container").hide();
                },800);
                return showPage(index);
            }).then(curtainDown).then(function() {
                setTimeout(function(){
                    $($bars).css("z-index", -1);
                },800);
            });
        }
    });
})();