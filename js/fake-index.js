import $ from 'jquery'
import '../src/css/reset.css'
import '../css/index.less'
import Luxy from '../src/js/luxy.js'
import 'prefixfree'
import anime from 'animejs'
// import hammer from './jquery.hammer.min'
// import from ''
// require('./prefixfree.min.js')
import 'jquery-hammerjs'
// require('./jquery.hammer.min.js')
// const hammer = require('./jquery.hammer.min.js')
import bannerImg1 from '../img/front-end/轮播图.jpg'
// import bannerImg2 from '../img/android/轮播图.jpg'
// import bannerImg2 from '../img/android/timg-(1).jpg'
import bannerImg2 from '../img/android/rain.jpeg'
import bannerImg3 from '../img/back-stage/轮播图.png'
import bannerImg4 from '../img/ios/轮播图.jpeg'
import bannerImg5 from '../img/machine-learning/轮播图.jpg'

$(function () {
    //幕布函数
    let $bar = $(".bar");
    let $bars = $(".bars");

    // 目前展示页index
    let detailIndex = 0;
    // 获取所有详情页
    const $pages = $(".page");

    // 获取左右详情页左右按钮
    const $preBtn = $("#detail-pages .pre-btn");
    const $nextBtn = $("#detail-pages .next-btn");

    // 幕布上遮
    function curtainUp() {
        var p = new Promise(function (resolve, reject) {
            setTimeout(function () {
                // 把所有幕布的index提升
                $($bars).css("z-index", 9);
                // 动画
                $($bar[0]).animate({
                    height: '100vh'
                }, 80);
                $($bar[1]).animate({
                    height: '100vh'
                }, 240);
                $($bar[2]).animate({
                    height: '100vh'
                }, 400);
                $($bar[3]).animate({
                    height: '100vh'
                }, 560);
                $($bar[4]).animate({
                    height: '100vh'
                }, 720, () => {
                    resolve("true");
                });
            }, 0);
        });
        return p;
    }
    // 幕布下拉
    function curtainDown(data) {
        if (data == "true") {
            console.log('true')
            var p = new Promise(function (resolve, reject) {
                setTimeout(function () {
                    $($bar[0]).animate({
                        height: '0vh'
                    }, 80);
                    $($bar[1]).animate({
                        height: '0vh'
                    }, 240);
                    $($bar[2]).animate({
                        height: '0vh'
                    }, 400);
                    $($bar[3]).animate({
                        height: '0vh'
                    }, 560);
                    $($bar[4]).animate({
                        height: '0vh'
                    }, 720, function () {
                        //更改按钮display
                        resolve("true");
                    });
                }, 0);
            });
            return p;
        }
    }

    // 换页函数
    function showPage(index) {
        // 更新目前展示
        detailIndex = (index === 5) ? 0 : (index === -1) ? 4 : index;
        // checkPage();
        var p = new Promise(function (resolve, reject) {
            setTimeout(function () {
                // 让某一页展示
                $($pages[detailIndex]).show().addClass("active").siblings(".page").hide().removeClass("active");
                $($pages[detailIndex]).scrollTop(0);
                resolve("true");
            }, 900);
        });
        return p;
    }

    // // 检查第一页或者最后一页的按钮显示/隐藏
    // function checkPage(){
    // 	switch(detailIndex) {
    // 		// 如果是第一张隐藏向上翻页按钮
    // 		case 0 :{
    // 			$($preBtn).css("display", "none");
    // 			$($nextBtn).css("display", "block");
    // 		};break;
    // 		// 如果是最后一张隐藏向下翻页按钮
    // 		case 4 :{
    // 			$($preBtn).css("display", "block");
    // 			$($nextBtn).css("display", "none");
    // 		};break;
    // 		// 否则都显示
    // 		default:{
    // 			$($preBtn).css("display", "block");
    // 			$($nextBtn).css("display", "block");
    // 		}
    // 	}
    // }

    /**
     * @description: 文字排版及出现效果批量处理函数，换行处用"@"分开
     * @param {
        *      obj:所要添加文字的jq对象     
        *      txt:文本内容（包含换行信息@）----string
        *      style: "center","right","left" 文字对齐方式
        * } 
        */
    function splitTxt(obj, txt, style) {
        let rows = txt.split("@");
        let html = '';
        $.each(rows, function (index, item) {
            html += '<p class="move-details-rows txtHasDown ' + (!index ? "move-rows-title" : '') + '" style="text-align:' + style + '">' + item + "</p>";
        });
        obj.addClass("hasDown");
        obj.append(html);
    }

    /**
     * @description: 文字动画退出进入
     * @param {
     *      obj: 文字段的父盒子jq对象
     *      dir: "up" 和 "down",文字将要执行的动画方向
     *           up 代表出现上升
     *           down 代表消失下降
     * } 
     * @return: 
     */
    function pMoveAnimate(obj, dir) {
        if ((obj.hasClass("hasUp") && dir === "up") || (obj.hasClass("hasDown") && dir === "down"))   // 防止多余调用
            return;

        let children = obj.children(".move-details-rows");   // 获取每行字
        children.stop(true, true);
        if (dir === "up") {
            //  文字出现
            children.each((index, item) => {
                $(item).delay(40 * index).animate({
                    opacity: 1
                }, 1, function () {
                    $(item).css({
                        transform: "translateY(0)"
                    })
                })
            })
        } else {
            children.css({
                opacity: 0,
                transform: "translateY(100px)"
            })
        }
        obj.toggleClass("hasUp hasDown");
    }

    // 切换幕布
    !(() => {
        //左右按钮切换
        const $btns = $("#detail-pages .switch-btn");
        $($btns[0]).on("click", function () {
            $("#detail-pages switch-btn").hide();
            curtainUp().then(() => {
                return showPage(detailIndex - 1);
            }).then(curtainDown).then(function () {
                setTimeout(function () {
                    $($bars).css("z-index", -1);
                }, 800);
            });
        });
        $($btns[1]).on("click", function () {
            $("#detail-pages switch-btn").hide();
            curtainUp().then(() => {
                return showPage(detailIndex + 1);
            }).then(curtainDown).then(function () {
                setTimeout(function () {
                    $($bars).css("z-index", -1);
                }, 800);
            });
        });
    })();

    // 3d按钮模块
//     !(() => {
//         let
//             $button = $("#btn"),
//             btncoords = $button[0].getBoundingClientRect(),
//             $wrap = $('#three-dimensional-btn'),
//             styles = $wrap[0].style,
//             $glare = $("#btn .glare");

//         // function rotate(e) {
//         //     let
//         //         x = e.clientX - btncoords.left,
//         //         y = e.clientY - btncoords.top,
//         //         cx = btncoords.width / 2,
//         //         cy = btncoords.height / 2,
//         //         dx = x - cx,
//         //         dy = y - cy;
//         //     styles.setProperty("--rx", `${(dy / -1.5)}deg`);
//         //     styles.setProperty("--ry", `${(dx / 10)}deg`);
//         //     $glare.css({
//         //         transform: "translate(" + (-x / 2) + "%, " + -y + "%)"
//         //     });
//         // };

//     // function restore(e) {
//     //     styles.setProperty("--rx", `${0}deg`);
//     //     styles.setProperty("--ry", `${0}deg`);
//     //     $glare.css({
//     //         transform: "translate(" + (-50) + "%, " + -50 + "%)"
//     //     });
//     // }
//     // $button.on('mousemove', rotate);
//     // $button.on('mouseleave', restore);
//     $button.on('click', function () {
//         $('#form-page').fadeIn();
//         $('#banner-container').fadeOut();
//     })
//     window.onresize = function () {
//         styles = $wrap[0].style;
//         btncoords = $button[0].getBoundingClientRect();
//     }
// })();

// 轮播图翻转报名按钮模块
    !(() => {
        let $button = $(".zl-turn-btn");
        $button.on('click', function () {
					banner.isLeaveBanner = true;
					banner.stopBanner();
        $('#banner-container').fadeOut();
        $('#detail-pages').hide();
        $('#form-page').fadeIn();
    })
})();
// android模块
!(() => {
    // 获取页面元素
    const $android = $('#android');
    const $fontBg = $('#android .font-bg');
    const $persOne = $('#android .pers-one');
    const $close = $('.rj-detail-page-close-btn');
    let zlLuxy = new Luxy()

    zlLuxy.init({
        wrapper: '#zl-luxy-wrapper',
        targets: '.zl-luxy',
        wrapperSpeed: 0.08,
        targetSpeed: 0.01,
        targetPercentage: 0.1
    });

    splitTxt($($(".zl-content-one")[0]), "TopView Android组专注于有创意、@有特色的主流App开发、@Android高新技术探索以及Android系统源代码的研究。","left");
    splitTxt($($(".zl-content-two")[0]), "Android组自成立以来，@一直有大量的师兄涌入@阿里、腾讯、网易等一线互联网公司。@每年各位毕业的优秀师兄都会回来@分享Android的前沿技术以及发展趋势。@Android组得益于大量的优秀师兄指导，@目前已经成为广东工业大学优秀的Android开发小组之一。","left");
    splitTxt($($(".zl-content-three")[0]), "除此之外，每年师兄师姐都会根据招新水平，@制定详细的培养计划帮助新一届的师弟师妹快速成长，@成为同届中技术的佼佼者.@只要你热爱Android，热爱Android开发，@就来吧！加入Android组吧！","center");
    // 出现图片
    function showImg(obj) {
        obj.removeClass("skewImg");
    }
    $android.on("scroll", function () {
        $fontBg.css("opacity", (1 - $android.scrollTop() / 350));
        console.log($android.scrollTop());
        if ($android.scrollTop() > 183) {
            showImg($(".detail-img1"));
            pMoveAnimate($($(".zl-content-one")[0]), "up");
        } else {
            pMoveAnimate($($(".zl-content-one")[0]), "down");
        }
        if ($android.scrollTop() > 468) {
            pMoveAnimate($($(".zl-content-two")[0]), "up");
            showImg($(".detail-img2"));
        } else {
            pMoveAnimate($($(".zl-content-two")[0]), "down");
        }
        if ($android.scrollTop() > 682)
            showImg($(".detail-img3"));
        if ($android.scrollTop() > 730) {
            pMoveAnimate($($(".zl-content-three")[0]), "up");
        } else {
            pMoveAnimate($($(".zl-content-three")[0]), "down");
        }
    })
    function close() {
		var p = new Promise(function (resolve, reject) {
			setTimeout(function () {
				banner.backSetFunc();
				// 让某一页展示
                $("#detail-pages").hide();
                $("#banner-container").show();
				resolve("true");
			}, 800);
		});
		return p;
	}
    $close.click(function() {

            curtainUp().then(() => {
                // 幕布完全上遮后更换内容
                setTimeout(() => {

                }, 800);
                return close();
            }).then(curtainDown).then(function () {
                setTimeout(function () {
                    $($bars).css("z-index", -1);
                }, 800);
            });
        })
    })();
    //backstage
    (() => {
        let cfLucy = new Luxy();
        cfLucy.init({
            wrapper: '#cf-luxy-wrapper',
            targets: '.cf-luxy',
            wrapperSpeed: 0.08,
            targetSpeed: 0.01,
            targetPercentage: 0.1
        });
        let $backState = $('#back-stage')
        let $svg1 = $('#back-stage svg')
        let $paths = $('#back-stage path');
        splitTxt($($(".cf-text-container1")[0]), "TopView 后台组是与数据和信息打交道的@方向，是 Android、iOS、前端的@”坚实后盾”，是每个工作室的核心方向。@TopView后台组基于Java语言，@自成立以来，一直致力于@政府级、企业级项目的实现和优化.", "left");
        splitTxt($($(".cf-text-container2")[0]), "如此大型的项目成就了@一代又一代的优秀师兄师姐。目前已有@多位师兄在腾讯、阿里、百度、美团等@一线互联网公司工作.", "right");

        let animation
        let hasAnimate = false
        let runSvg = () => {
            animation = anime.timeline({
                duration: 700,
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: false
            });
            console.log($('#back-stage svg g.outg'))
            animation.add({
                targets: ['#back-stage svg g.outg:nth-child(6)', '#back-stage svg>g:nth-child(11)', '#back-stage path.st17'],
                translateX: -50,
                // strokeDashoffset: [anime.setDashoffset, 0]
            }).add({
                targets: ['#back-stage svg g.outg:nth-child(5)', '#back-stage svg>g:nth-child(12)', '#back-stage path.st18'],
                // strokeDashoffset: [anime.setDashoffset, 0]
                translateX: -50,
            }).add({
                targets: ['#back-stage svg g.outg:nth-child(3)', '#back-stage svg>g:nth-child(13)', '#back-stage path.st19'],
                // strokeDashoffset: [anime.setDashoffset, 0]
                translateX: -50,
            }).add({
                targets: ['#back-stage svg g.outg:nth-child(4)', '#back-stage svg>g:nth-child(14)', '#back-stage path.st200'],
                // strokeDashoffset: [anime.setDashoffset, 0]
                translateX: -50,
            }).add({
                targets: ['#back-stage svg .outg:nth-child(2)', '#back-stage svg>g:nth-child(15)', '#back-stage path.st201'],
                // strokeDashoffset: [anime.setDashoffset, 0]
                translateX: -50,
            });
            // anime({
            //     targets: '#back-stage path',
            //     strokeDashoffset: [anime.setDashoffset, 0],
            //     easing: 'easeInOutSine',
            //     duration: 300,
            //     delay: function (el, i) { return i * 200 },
            //     direction: 'alternate',
            //     loop: 1
            // });
            let delayTime = 400;
            let comment = {
                easing: 'spring(1, 70, 10, 0)',
                direction: 'alternate',
                loop: false
            }
            anime({
                ...comment,
                delay: delayTime * 1,
                targets: ['#back-stage .out-g:nth-child(7)', '#back-stage .out-g:nth-child(11)', '#back-stage path.st17'],
                translateX: ['42%', '0%'],
                translateY: ['22%', '0%'],
                opacity: [0, 1]
            })
            anime({
                ...comment,
                delay: delayTime * 2,
                targets: ['#back-stage .out-g:nth-child(6)', '#back-stage .out-g:nth-child(12)', '#back-stage path.st18'],
                translateX: ['50%', '0%'],
                translateY: ['0%', '0%'],
                opacity: [0, 1]
            })
            anime({
                ...comment,
                delay: delayTime * 3,
                targets: ['#back-stage .out-g:nth-child(4)', '#back-stage .out-g:nth-child(13)', '#back-stage path.st19'],
                // strokeDashoffset: [anime.setDashoffset, 0]
                translateX: ['45%', '0%'],
                translateY: ['-28%', '0%'],
                opacity: [0, 1]
            })
            anime({
                ...comment,
                delay: delayTime * 4,
                targets: ['#back-stage .out-g:nth-child(5)', '#back-stage .out-g:nth-child(14)', '#back-stage path.st200'],
                // strokeDashoffset: [anime.setDashoffset, 0]
                translateX: ['19%', '0%'],
                translateY: ['-46%', '0%'],
                opacity: [0, 1]
            })
            anime({
                ...comment,
                delay: delayTime * 5,
                targets: ['#back-stage svg .out-g:nth-child(3)', '#back-stage .out-g:nth-child(15)', '#back-stage path.st201'],
                // strokeDashoffset: [anime.setDashoffset, 0]
                translateX: ['-11%', '0%'],
                translateY: ['-47%', '0%'],
                opacity: [0, 1]
            })

        }
        $backState.on('scroll', function () {
            let vh = $(window).height();
            if ($backState.scrollTop() / vh > 0.2) {
                $svg1.removeClass('skewImg');
                pMoveAnimate($($(".cf-text-container1")[0]), "up");
                if (!hasAnimate) {
                    runSvg();
                    hasAnimate = true;
                }
            } else {
                pMoveAnimate($($(".cf-text-container1")[0]), "down");
                animation = undefined
            }
            if ($backState.scrollTop() / vh > 0.4) {
                pMoveAnimate($($(".cf-text-container2")[0]), "up");
            } else {
                pMoveAnimate($($(".cf-text-container2")[0]), "down");
            }
        })
    })();
    let banner;
    // let bannerTimer = undefined;
    // 轮播图
    (() => {
        let $btns = $(".banner-btn span");  // 获取轮播图索引按钮
        let $bannerPages = $("#banner li");
        let $bannerUl = $("#banner");   // 获取banner UL
        let $bannerImgs = $("#banner .outer-mask img"); // 获取每一页轮播图的img
        let $bannerFontUp = $(".banner-center-up");     // 部门字体
        let $bannerFontDown = $(".banner-center-down"); // 部门标签小字体
        let $nextBannerBtn = $("#banner-container .next-btn"); // 下一页按钮
        let $preBannerBtn = $("#banner-container .pre-btn"); // 上一页按钮
        let $preLoad = $('#rj-img-pre-load img');
        // index: 			0  	1  	 2   3    4
        // 对应部门: 	    前端 安卓 后台 IOS 机器学习

        /*  
        * @desc 轮播图节流 时间戳版本
        * @param func 函数
        * @param index 跳转页面index
        * @param wait 延迟执行毫秒数
        */
        // 共享previous
        let previous = 0;
        function throttleBanner(func, index, wait) {
            // console.log(func);
            let now = Date.now();
            var p = new Promise(function (resolve, reject) {
                if (now - previous > wait) {
                    func.call(banner, index); // 间距时间超过wait则调用相应的函数
                    banner.stopBanner();			// 停止轮播
                    previous = now;						// 更新以前的值
                    resolve();
                }
            });
            return p;
        }

        // 轮播图对象
        banner = {
            playIndex: 0,   // 正在播放的页index值
            bannerTimer: undefined, // 定时器
            bannerTime: 4000, // 轮播时间
            // canChangePage: false,

            isMoving: false,        // 是否正在动画中
            moveCnt: 0,             // transition计数器
            isLeaveBanner: false,      // 是否离开了轮播图

            // 存放每一张轮播图的url的数组
            bannerImgScr: [bannerImg1, bannerImg2, bannerImg3, bannerImg4, bannerImg5],
            // 部门名字数组
            bannerFontUp: ["前端", "android", "后台", "iOS", "机器学习"],
            // 部门标签数组
            bannerFontDown: ["创意、前沿艺术", "技术探索、培养模式", "坚实后盾、严谨", "优雅极致、中流砥柱", "人工智能、大数据"],
            // 背景颜色数组
            bgColors: ["#82ece4", "#65701e", "rgb(15, 95, 142)", "rgb(115, 111, 110)", "rgba(244, 208, 177, 0.99)"],
            // 位置类名的顺序数组
            classArr: ["pre-page", "mid-page", "next-page"],
            // 初始化轮播图
            init() {
                this.setPosClass();
                this.preSetSrc("mid-page", this.playIndex); // 给中间页加载前端(第一个)板块
                this.setBackground(); // 设置第一个背景颜色
                this.setBtn();  // 设置第一个按钮颜色
                // 预先加载图片
                $.each($preLoad, function (index, item) {
                    $(item).attr('src', banner.bannerImgScr[index]);
                });
            },
            // 按钮高亮
            setBtn() {
                $btns.removeClass("btn-play").eq(this.playIndex).addClass("btn-play");
            },
            // 设置背景颜色
            setBackground() {
                $bannerUl.css("background-color", this.bgColors[this.playIndex]); // 设置第一个背景颜色
            },
            // 设置轮播图的class
            setPosClass() {
                for (let i = 0; i < $bannerPages.length; i++) {
                    $bannerPages.eq(i).removeClass("pre-page mid-page next-page").addClass(this.classArr[i]);
                }
            },
            // 清除transition类名
            clearClass() {
                for (let i = 0; i < $bannerPages.length; i++) {
                    $bannerPages.eq(i).removeClass("banner-out banner-in");
                }
            },
            // 启动录播图
            goBanner() {
                if (this.isLeaveBanner) return;     // 如果已经离开了轮播图，那就不要启动轮播图了
                this.bannerTimer = setInterval(() => {
                    banner.nextBannerPage(banner.playIndex + 1);        // 开始下翻页
                }, this.bannerTime);
            },
            // 停止轮播图
            stopBanner() {
                clearInterval(banner.bannerTimer);        // 清除定时器
                banner.isMoving = false;        
                banner.moveCnt = 0;             // transition计数器
            },
            // 预先设置函数：index 设置对应index的部门内容
            preSetSrc(str, index) {
                $bannerImgs.eq(this.classArr.indexOf(str)).attr("src", this.bannerImgScr[index]);
                $bannerFontUp.eq(this.classArr.indexOf(str)).text(this.bannerFontUp[index]);
                $bannerFontDown.eq(this.classArr.indexOf(str)).text(this.bannerFontDown[index]);
            },
            // 下翻页
            nextBannerPage(index) {
                this.playIndex = (index == this.bannerImgScr.length) ? 0 : index; // 越界判断
                this.setBackground();   // 设置背景颜色
                this.preSetSrc("next-page", this.playIndex);    // 更新下一张轮播图的信息
                this.clearClass();  // 清除transition类名
                // 更新位置数组并设置
                $($bannerPages[this.classArr.indexOf("mid-page")]).addClass("banner-out");
								$($bannerPages[this.classArr.indexOf("next-page")]).addClass("banner-in");
								banner.isMoving = true;
                this.classArr.unshift(this.classArr.pop());
                this.setPosClass();
                this.setBtn();  // 按钮高亮
            },
            // 上翻页
            preBannerPage(index) {
                this.playIndex = (index == -1) ? this.bannerImgScr.length - 1 : index; // 越界判断
                this.setBackground();
                this.preSetSrc("pre-page", this.playIndex); // 更新下一张轮播图的信息
                this.clearClass();  // 清除transition类名
                // 更新位置数组并设置
                $($bannerPages[this.classArr.indexOf("mid-page")]).addClass("banner-out");
                $($bannerPages[this.classArr.indexOf("pre-page")]).addClass("banner-in");
								banner.isMoving = true;
                this.classArr.push(this.classArr.shift());
                this.setPosClass();
                this.setBtn(); // 按钮高亮
            },
            // 节流的翻页
            throttlePage(index, actionType) {
								let actionFunc = (actionType === "next") ? banner.nextBannerPage : banner.preBannerPage;
								// 3180是动画的持续时间
                throttleBanner(actionFunc, index, 3180).then(() => {
                    setTimeout(() => {
                        banner.goBanner();
                    }, 3180)
                });
            },
            // 跳转到详情页
            toDetailPage(index) {
                this.isLeaveBanner = true;  // 离开轮播图
                banner.stopBanner();        

                curtainUp().then(() => {
                    // 幕布完全上遮后更换内容
                    setTimeout(() => {
                        $("#detail-pages").show();
                        $("#banner-container").hide();
                    }, 800);
                    return showPage(index);
                }).then(curtainDown).then(function () {
                    setTimeout(function () {
                        $($bars).css("z-index", -1);
                    }, 800);
                });
						},
						// 从其他模块回来的时候设置
						backSetFunc() {
							this.isMoving = false;
							this.moveCnt = 0;
							this.isLeaveBanner = false;
							this.goBanner();
						},
        }

				banner.init();
				
        $('.inner-mask img').on('webkitTransitionEnd', function () {
            console.log(banner.moveCnt);
            banner.moveCnt = (banner.moveCnt + 1) % 6;
            if (banner.moveCnt === 0) {
                banner.isMoving = false;
                console.log("动画完成");
            }
        })

        // 点击按钮跳转翻页
        $(".banner-btns").on("click", ".bg-span", (event) => {
            if (banner.isMoving) return;
            let e = event || window.event;
            let t = e.target;
            let index = $(t).parent(".banner-btn").index();      // 获取按钮位序
            if (index === banner.playIndex) return;
            banner.stopBanner();    // 停止轮播
            if (index > banner.playIndex) {
                banner.throttlePage(index, "next");
            } else if (index < banner.playIndex) {
                banner.throttlePage(index, "pre");
            }
        });
        // 上下翻页
        $nextBannerBtn.on("click", () => {
            if (banner.isMoving) return;
            banner.throttlePage(banner.playIndex + 1, "next");
        });
        $preBannerBtn.on("click", () => {
            if (banner.isMoving) return;
            banner.throttlePage(banner.playIndex - 1, "pre");
        });
        // 通过点击跳转至详情页
        $("#banner li").on("click", ".banner-font-container", function (e) {
            let index = banner.bannerFontUp.indexOf($(e.currentTarget).find(".banner-center-up").text()); // 获取此时要进入的详情页
            banner.toDetailPage(index);
        });
        $("#banner li").on("click", ".inner-mask img", function (e) {
            let index = banner.bannerImgScr.indexOf($(e.currentTarget).attr('src')); // 获取此时要进入的详情页
            banner.toDetailPage(index);
        });

    })();



    //front-end
    (() => {
        let wfLuxy = new Luxy()
        wfLuxy.init({
            wrapper: '#wf-luxy-wrapper',
            targets: '.wf-luxy',
            wrapperSpeed: 0.08,
            targetSpeed: 0.01,
            targetPercentage: 0.1
        });
        let $frontEnd = $("#front-end")
        // let $headerFont = $($('#front-end .per-one .header-font')[0]);
        splitTxt($($('.wf-txt-container1')[0]), "TopView 前端组主要基于@HTML，CSS，JavaScript等@基础web前端编程语言进行开发，@同时引入前端领域前沿技术进一步构建项目。", "left");
        splitTxt($($('.wf-txt-container2')[0]), "我们专注于展现视觉更好的页面，@打造用户体验更优的网站，@开发更有特色更有创意的产品。@如果你喜欢设计、热爱前端，@那你就是我们前端组想要的！", "left");
        // 出现图片
        function showImg(obj) {
            obj.removeClass("skewImg");
        }
        $frontEnd.on("scroll", function () {
            // $headerFont.css("opacity", (1 - $frontEnd.scrollTop() / 350));
            let vh = $(window).height();
            let winTop = $(window).scrollTop();
            if ($(".wfimg1").offset().top - winTop < vh) {
                showImg($(".wfimg1"));
            }
            if ($(".wf-txt-container1").eq(0).offset().top - winTop < vh) {
                pMoveAnimate($(".wf-txt-container1").eq(0), "up");
            } else {
                pMoveAnimate($(".wf-txt-container1").eq(0), "down");
            }
            if ($(".wfimg2").offset().top - winTop < vh) {
                showImg($(".wfimg2"));
            }
            if ($(".wf-txt-container2").eq(0).offset().top - winTop < vh) {
                pMoveAnimate($(".wf-txt-container2").eq(0), "up");
            } else {
                pMoveAnimate($(".wf-txt-container2").eq(0), "down");
            }
        })
    })();

    // ios
    (() => {
        let mqLuxy = new Luxy()
        mqLuxy.init({
            wrapper: '#mq-luxy-wrapper',
            targets: '.mq-luxy',
            wrapperSpeed: 0.08,
            targetSpeed: 0.01,
            targetPercentage: 0.1
        });
        let $iosDiv = $("#ios");
        let $headerFont = $($("#ios .per-one .header-font")[0]);
        splitTxt($($(".mq-txt-container1")[0]), "TopView iOS组主要基于iOS系统进行主流App开发，专注于为用户提供流畅与优雅的极致体验。@除此之外，基于目前主流大公司对跨平台开发人员的需求，我们小组成员也对跨平台开发进行学习，定期开展有关知识的讨论与交流。@作为TopView的主要开发组之一，自成立来。不断有师兄师姐在毕业后就职于阿里，腾讯，字节跳动等互联网大厂。@我们拥有不定期的分享会机制与丰富多彩的内建活动，已毕业的优秀师兄师姐在空闲之余都会回来分享iOS的底层架构与前沿技术，只要学习认真，还有机会获得师兄师姐所在互联网大厂的内推资格。", "left");
        splitTxt($($(".mq-txt-container2")[0]), "加入我们，相信你一定能得到锻炼与成长。@只要你有c语言基础，热爱学习，有责任心就加入iOS组吧!", "left");
        // 出现图片
        function showImg(obj) {
            obj.removeClass("mq-skewImg");
        }
        $iosDiv.on("scroll", function () {
            $headerFont.css("opacity", (1 - $iosDiv.scrollTop() / 350));
            let vh = $(window).height();
            let winTop = $(window).scrollTop();
            if ($(".mq-img1").offset().top - winTop < vh) {
                showImg($(".mq-img1"));
            }
            if ($(".mq-txt-container1").eq(0).offset().top - winTop < vh) {
                pMoveAnimate($(".mq-txt-container1").eq(0), "up");
            } else {
                pMoveAnimate($(".mq-txt-container1").eq(0), "down");
            }
            if ($(".mq-img2").offset().top - winTop < vh) {
                showImg($(".mq-img2"));
            }
            if ($(".mq-txt-container2").eq(0).offset().top - winTop < vh) {
                pMoveAnimate($(".mq-txt-container2").eq(0), "up");
            } else {
                pMoveAnimate($(".mq-txt-container2").eq(0), "down");
            }
        })
    })();



    // 机器学习
    (() => {
        let rjLuxy = new Luxy()
        rjLuxy.init({
            wrapper: '#rj-luxy-wrapper',
            targets: '.rj-luxy',
            wrapperSpeed: 0.08,
            targetSpeed: 0.01,
            targetPercentage: 0.1
        });
        let $machineDiv = $("#machine-learning");
        let $headerFont = $($("#machine-learning .per-one .banner-font-container")[0]);

        splitTxt($($(".txt-container1")[0]), "TopView 机器学习组是16年成立的新组,@我们关注机器学习算法模型,@在理论学习的同时,@也包含对工程项目的实践。@我们组以Python语言为主,@目前工作集中在爬虫技术、数据挖掘、@机器学习、AI研究方向，@包括金融信贷反欺诈和在线评论的情感分析等", "left");
        splitTxt($($(".txt-container2")[0]), "发展方向则有大数据、自然语言处理、@计算机视觉等多个人工智能领域方向，@并与研究生实验室有合作。", "left");
        splitTxt($($(".rj-txt3")[0]), "要求@了解使用至少一门编程语言，有自主学习能力，@能承受学习基础理论学科的枯燥性，@对学习数学相关知识，阅读外语文献不排斥@我们非常欢迎数学和英语好的同学", "center");
        // 出现图片
        function showImg(obj) {
            obj.removeClass("skewImg");
        }
        $machineDiv.on("scroll", function () {
            $headerFont.css("opacity", (1 - $machineDiv.scrollTop() / 350));
            let vh = $(window).height();
            let winTop = $(window).scrollTop();
            if ($(".img1").offset().top - winTop < vh) {
                showImg($(".img1"));
            }
            if ($(".txt-container1").eq(0).offset().top - winTop < vh) {
                pMoveAnimate($(".txt-container1").eq(0), "up");
            } else {
                pMoveAnimate($(".txt-container1").eq(0), "down");
            }
            if ($(".img2").offset().top - winTop < vh) {
                showImg($(".img2"));
            }
            if ($(".txt-container2").eq(0).offset().top - winTop < vh) {
                pMoveAnimate($(".txt-container2").eq(0), "up");
            } else {
                pMoveAnimate($(".txt-container2").eq(0), "down");
            }
            if ($(".img3").offset().top - winTop < vh)
                showImg($(".img3"));
            if ($(".rj-txt3").eq(0).offset().top - winTop < vh) {
                pMoveAnimate($(".rj-txt3").eq(0), "up");
            } else {
                pMoveAnimate($(".rj-txt3").eq(0), "down");
            }
        })
    })();

    // 开机动画
    (() => {
        let that;
        let delayTime = 500;
        class startAnimate {
            constructor() {
                that = this;
                // 获取第一行
                this.$rowOne = $("#loading-module #loading-box .row-one");
                // 获取第二行
                this.$rowTwo = $("#loading-module #loading-box .row-two");
                // 获取第三行
                this.$rowThree = $("#loading-module #loading-box .row-three");
                // 获取第四行
                this.$rowForth = $("#loading-module #loading-box .row-forth");
            }
            init() {
                console.log(this.$rowOne);
                //第一行
                this.resetStye(this.$rowOne, "row-one-first-change", "row-one-second-change", 0);
                //第二行
                this.resetStye(this.$rowTwo, "row-two-first-change", "row-two-second-change", delayTime * 1);
                //第三行
                this.resetStye(this.$rowThree, "row-three-first-change", "row-three-second-change", delayTime * 2);
                //第四行
                this.resetStye(this.$rowForth, "row-forth-first-change", "row-forth-second-change", delayTime * 3.1);
            }
            resetStye(obj, change1, change2, time) {
                console.log("类名被改了")
                setTimeout(function () {
                    obj.addClass(change1);
                    setTimeout(function () {
                        obj.addClass(change2);

                    }, 900);
                }, time)
            }
        }

        let newStartAnimate = new startAnimate();
        newStartAnimate.init();

        // 锐基添加的代码
        let loadingtransitionEnd = false;  // 动画是否结束
        let isAllLoaded = false;  // 是否全部加载完成
        // 开机动画消失
        let loadingOut = () => {
            console.log(1);
            if (isAllLoaded && loadingtransitionEnd) {
                console.log(8888)
                $('#loading-module').animate({
                    opacity: 0
                }, 1000, () => {
                    $('#loading-module').hide();
								});
                banner.moveCnt = 0;
                banner.goBanner();
                $('#rj-img-pre-load').remove();
                // rjBanner.start();
            }
        }
        // 开机动画结束
        let latestSpan = $('.row-forth .move-span').eq(0);
        let cnt = 0;
        latestSpan.on('transitionend', function () {
            cnt++;
            // if (cnt === 4) {
            //     latestSpan.off('webkitTransitionEnd');
            // }
            if (cnt === 1) {
                latestSpan.off('transitionend');
                loadingtransitionEnd = true;
                loadingOut();
            }
        })
        window.onload = function () {
            isAllLoaded = true;
            loadingOut();
            // console.log('资源加载结束!',new Date().getTime());
        }
    })();
    // 旋转菜单模块
    !(() => {
        const $detailPages = $("#detail-pages")
        const $home = $('#home');
        const $imgs = $('#menu-list img');
        const $menuList = $('#menu-list')
        let c = 130;
        let flag = true;

        // 给五个菜单小图标绑定点击事件
        $imgs.on('click', throttle(rotaImg, 500));
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
            curtainUp().then(() => {
                // 幕布完全上遮后更换内容
                setTimeout(() => {
                    $("#detail-pages").show();
                    $("#banner-container").hide();
                }, 800);
                return showPage($(this).index());
            }).then(curtainDown).then(function () {
                setTimeout(function () {
                    $($bars).css("z-index", -1);
                }, 800);
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

    // 表单模块
    !(() => {
        // 获取表单元素
        const $formPages = $('#form-page');
        const $formPageOne = $('#form-page-one');
        const $formPageTwo = $('#form-page-two');
        const $pages = $('#form-page .page')
        const $username = $('[name=username]');
        const $studentId = $('[name=student-id]');
        const $gradeProfessional = $('[name=grade-professional]');
        const $radio = $('.x-radio');
        const $nextStep = $('.next-step'); // 下一步按钮(返回封面)
        const $submit = $('.submit'); // 提交按钮
        const $preStep = $('.pre-step'); // 上一步按钮
        const $number = $('[name=number]');
        const $email = $('[name=email]');
        const $introduction = $('[name=introduction]');
        const $direction = $('[name=direction]');
        const $option = $('.x-dropdown'); // 获取下拉框
        const $options = $('.x-dropdown-item'); // 获取下拉框的值
        const $skills = $('[name=skills]');
        const $idea = $('[name=idea]');
        // const $triggerBtn = $('.fui_trigger-btn'); // 单选框按钮
        const $triggerBtn = $('.fui_combo'); // 单选框按钮
        const $button = $("#btn"); // 轮播图前往表单的按钮
        const $backBtn = $('#form-page .zl-form-page-close-btn') //返回轮播图的按钮
        const $bannerContainer = $('#banner-container') //获取轮播图界面
        const $detailToFormBtns = $('.c-btn'); //获取详情页前往表单的按钮
        const $time = $('.zl-third-book .time');// 获取倒计时的秒数
        let backBannerFlag = true // 标记此时默认是从轮播图的按钮进入表单界面的
        let flag = false;
        // 初始化表单数据
        let formData = {
            username: '',
            studentId: '',
            gradeProfessional: '',
            sex: '',
            number: '',
            email: '',
            introduction: '',
            direction: '',
            skills: '',
            idea: ''
        };
        // 给轮播图前往表单的按钮绑定单击响应函数
        $button.on('click', function (event) {
            backBannerFlag = true;
            $formPages.show();
            $formPages.css({
                "z-index": 100,
            });
            banner.isLeaveBanner = true;
            banner.stopBanner();
            event.stopPropagation()
        })
        // 给返回轮播图/详情页按钮绑定单击响应函数
        $backBtn.on('click', function () {
            $formPages.hide(1000);
            $formPages.css({
                "z-index": 0
            });
            if (backBannerFlag) {
								banner.backSetFunc();
                // banner.isLeaveBanner = false;
                // banner.goBanner();
                $bannerContainer.show();
            }

        })

        // 使用事件委托监听输入框的失去焦点事件
        $formPages.on('blur', 'input', function (ev) {
            let match = $(ev.target).attr('name');
            let value = $(ev.target).val();
            switch (match) {
                case "username":
                    formData.username = value;
                    break;
                case "student-id":
                    formData.studentId = value;
                    break;
                case "grade-professional":
                    formData.gradeProfessional = value;
                    break;
                case "username":
                    formData.sex = value;
                    break;
                case "number":
                    formData.number = value;
                    break;
                case "email":
                    formData.email = value;
                    break;
                default:
                    break;

            }

        })
        // 使用事件委托监听文本域的失去焦点事件
        $formPages.on('blur', 'textarea', function (ev) {
            let match = $(ev.target).attr('name');
            let value = $(ev.target).val();
            switch (match) {
                case "introduction":
                    formData.introduction = value;
                    break;
                case "idea":
                    formData.idea = value;
                    break;
                case "skills":
                    formData.skills = value;
                    break;
                default:
                    break;

            }
            console.log(formData)

        })

        // 给表单绑定单击函数，使下拉框消失
        $(document).on('click', function (ev) {
            $option.fadeOut(100);
        })
        // 给性别单选按钮绑定单击响应函数
        $radio.on('click', function (ev) {
            let sex = $(this).attr('value');
            $(this).children()[0].style.background = '#ae8e74';
            $(this).first().siblings().children()[0].style.background = '#fff';
            formData.sex = sex;
        })

        // 给上一步按钮按钮绑定单击响应函数
        // $preStep.on('click', function () {
        //     $formPageOne.fadeIn();
        //     $formPageTwo.hide();
        // })
        // 给单选框按钮绑定点击函数
        $triggerBtn.on('click', function (ev) {
            $option.slideToggle(100);
            ev.stopPropagation()
        })
        // 下拉框
        $option.on('click', function (ev) {
            $direction.val($(ev.target).text());
            formData.direction = $(ev.target).text();
        })
        // 给详情页前往表单的多个按钮绑定单击响应事件
        $detailToFormBtns.on('click', function () {
            backBannerFlag = false; //代表此时是从详情页进入表单的
            $formPages.show();
            $formPages.css({
                "z-index": 100,
            });
            event.stopPropagation()
        })
        // 提交按钮
        $submit.on('click', function () {
           
            if (nameCheck() && idCheck() && gradeCheck() && phoneCheck() && emailCheck() && introCheck() && skillsCheck() && cogCheck()) {
                if (!formData.sex) {
                    alert('必须选择性别')
                    return false
                }
                if (!formData.direction) {
                    alert('必须选择一个发展方向')
                    return false
                }
                if (!check()) {
                    return false
                }
                $($('#form-page-two .form-body').get(0)).css({
                    transition: 'none'
                })
                flag = true
            }
             else {
               alert("请正确输入信息");
               $($('#form-page-two .form-body').get(0)).css({
                height: $('#form-page-one .form-body').get(0).clientHeight,
                transition: '1s'
            })
               return false
            }
            flag = confirm('确定提交吗？')
            if (flag) {
               
                $('.scene').css({
                    margin: '0% 20% 5% 72%'
                }) //调整书本位置
                nextPage() //翻页
                console.log(formData) 
                $('.book').off() // 解除书本的事件监听
                $('.zl-second-book').off() 
                $('.zl-form-page-close-btn').hide() //隐藏回退按钮
                let time = $time.text()*1
                setInterval(() => {
                    $time.text(time--)
                    if (time <= 0) {
                        location.reload() //三秒后刷新页面
                    }
                },1000)
            }
        })
            $username.on("blur", nameCheck);//1.名字
            function nameCheck() {
                let reg = /^[\u4e00-\u9fa5]{2,10}$/;//2-10位中文
                let name = $username.val();
                if (!reg.test(name) || name == '') {
                    $username.css("border", "1px solid red");
                    $(".zl-name-span").html("<span class='red-form'>请输入2~10位中文</span>");
                    return false;
                }
                $username.css("border", "");
                $(".zl-name-span").html("");
                return true;
            }
            $studentId.on("blur", idCheck);//2.学号
            function idCheck() {
                let reg = /^\d{9,12}$/;//十位数字
                let id = $studentId.val();
                if (!reg.test(id) || id == '') {
                    $studentId.css("border", "1px solid red");
                    $(".zl-id-span").html("<span class='red-form'>请输入正确的学号</span>");
                    return false;
                }
                $studentId.css("border", "");
                $(".zl-id-span").html("");
                return true;
            }
            $gradeProfessional.on("blur", gradeCheck);//3.年级专业
            function gradeCheck() {
                let grade = $gradeProfessional.val();
                if (grade == '') {
                    $gradeProfessional.css("border", "1px solid red");
                    $(".zl-grade-span").html("<span class='red-form'>不能为空！</span>");
                    return false;
                }
                $gradeProfessional.css("border", "");
                $(".zl-grade-span").html("");
                return true;
            }
            $number.on("blur", phoneCheck);//4.手机
            function phoneCheck() {
                let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
                let phone = $number.val();
                if (!reg.test(phone) || phone == '') {
                    $number.css("border", "1px solid red");
                    $(".zl-phone-span").html("<span class='red-form'>请输入正确的手机号码</span>");
                    return false;
                }
                $number.css("border", "");
                $(".zl-phone-span").html("");
                return true;
            }
            
            $email.on("blur", emailCheck);//5.邮箱
            function emailCheck() {
                let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                let email = $email.val();
                if (!reg.test(email) || email == '') {
                    $email.css("border", "1px solid red");
                    $(".zl-email-span").html("<span class='red-form'>请输入正确的邮箱</span>");
                    return false;
                }
                $email.css("border", "");
                $(".zl-email-span").html("");
                return true;
            }
            $introduction.on("blur", introCheck);//6.自我介绍
            function introCheck() {
                let intro = $introduction.val();
                if (intro == '') {
                    $introduction.css("border", "1px solid red");
                    $(".zl-intro-span").html("<span class='red-form'>不能为空！</span>");
                    return false;
                }
                $introduction.css("border", "");
                $(".zl-intro-span").html("");
                return true;
            }
            $skills.on("blur", skillsCheck); // 技能
            function skillsCheck() {
                let skills = $skills.val();
                if (skills == '') {
                    $skills.css("border", "1px solid red");
                    $(".zl-skills-span").html("<span class='red-form'>不能为空！</span>");
                    return false;
                }
                $skills.css("border", "");
                $(".zl-skills-span").html("");
                return true;
            }
            $idea.on("blur", cogCheck); // 想法
            function cogCheck() {
                let cog = $idea.val();
                if (cog == '') {
                    $idea.css("border", "1px solid red");
                    $(".zl-idea-span").html("<span class='red-form'>不能为空！</span>");
                    return false;
                }
                $idea.css("border", "");
                $(".zl-idea-span").html("");
                return true;
            }
            //产生验证码  
            createCode();
            var code; //在全局定义验证码  
            function createCode() {
                code = "";
                var codeLength = 4; //验证码的长度  
                var checkCode = document.getElementById("code");
                var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
                for(var i = 0; i < codeLength; i++) { //循环操作  
                    var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
                    code += random[index]; //根据索引取得随机数加到code上  
                }
                checkCode.value = code; //把code值赋给验证码  
            }
            // 
            function check(){
            var inputCode = document.getElementById("ctl00_txtcode").value.toUpperCase();
                if(inputCode==""){
                    alert("验证码不能为空");
                    return false;
                }else if(inputCode!=code){
                    alert("验证码输入错误,请重新输入！");
                    createCode(); //刷新验证码  
                    document.getElementById("ctl00_txtcode").value = ""; //清空文本框
                    return false;
                }
                return true;
            }
        // 书本前一页
        function prevPage() {
            $('#form-page .flipped')
                .last()
                .removeClass('flipped')
                .addClass('active')
                .siblings('.page')
                .removeClass('active');
        }
        //书本下一页
        function nextPage() {
                $('#form-page .active')
                .removeClass('active')
                .addClass('flipped')
                .next('.page')
                .addClass('active')
                .siblings();
                $('.zl-second-book').removeClass('.flipped')
        }
        $('#form-page-one').click(function (ev) {
            $($('#form-page-two .form-body').get(0)).css({
                height: $('#form-page-one .form-body').get(0).clientHeight,
                transition: '1s'
            })
            $('.zl-first-book').eq(0).css({
                height: $('.zl-first-book .back').get(0).clientHeight,
            })
            $option.fadeOut(100);
            ev.preventDefault();
            ev.stopPropagation();
        })
        $('#form-page-two').click(function (ev) {
            $option.fadeOut(100);
            ev.preventDefault();
            ev.stopPropagation();

        })
        function changePage () {
            if ($('.zl-first-book').hasClass('active')) {
                $('.zl-first-book .front h1').hide()
                $('#form-page-two').show()
                $('#form-page-one').show()
                $('.scene').css({
                    margin: '0% 5% 5% 50%'
                })
                $($('#form-page-two .form-body').get(0)).css({
                    height: $('#form-page-one .form-body').get(0).clientHeight
                })
            } 
        }
     
        $('.book').one('click', '.active', nextPage) // 注册一次点击事件
        $('.zl-first-book').click(changePage)
        // 给返回封面按钮绑定单击响应函数
        $nextStep.on('click', () => {
            changePage()
            prevPage()
                //    if ($('.zl-second-book').hasClass('active') && $('.zl-first-book').hasClass('flipped')) {
                    $('.scene').css({
                        margin: '0% 20% 5% 27%'
                    })
                    setTimeout(function() {
                        $('.zl-first-book .front h1').show()
                    },1000)

                // }
                $('.book').one('click', '.active', nextPage)
        })

    })();
})

