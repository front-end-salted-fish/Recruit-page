import $ from 'jquery'
import '../src/css/reset.css'
import '../css/index.less'
import Luxy from '../src/js/luxy.js'
import 'prefixfree'
import anime from 'animejs'
import '../css/modal.css'
import filterXSS, { FilterXSS } from 'xss'
import Slider from './Slider'
import './gt'
// 如果是谷歌浏览器才用Luxy插件
if(navigator.userAgent.toLowerCase().indexOf("chrome") !== -1 && navigator.userAgent.indexOf('MicroMessenger') === -1&& navigator.userAgent.indexOf("Safari") > -1&& window.chrome && navigator.userAgent.toLowerCase().indexOf("edge") === -1) {
  let zlLuxy = new Luxy();
  let cfLucy = new Luxy();
  let wfLuxy = new Luxy();
  let mqLuxy = new Luxy();
  let rjLuxy = new Luxy();
  rjLuxy.init({
    wrapper: '#rj-luxy-wrapper',
    targets: '.rj-luxy',
    wrapperSpeed: 0.08,
    targetSpeed: 0.01,
    targetPercentage: 0.1
  });
  mqLuxy.init({
    wrapper: '#mq-luxy-wrapper',
    targets: '.mq-luxy',
    wrapperSpeed: 0.08,
    targetSpeed: 0.01,
    targetPercentage: 0.1
  });
  wfLuxy.init({
    wrapper: '#wf-luxy-wrapper',
    targets: '.wf-luxy',
    wrapperSpeed: 0.08,
    targetSpeed: 0.01,
    targetPercentage: 0.1
  });
  cfLucy.init({
    wrapper: '#cf-luxy-wrapper',
    targets: '.cf-luxy',
    wrapperSpeed: 0.08,
    targetSpeed: 0.01,
    targetPercentage: 0.1
  });
  zlLuxy.init({
    wrapper: '#zl-luxy-wrapper',
    targets: '.zl-luxy',
    wrapperSpeed: 0.08,
    targetSpeed: 0.01,
    targetPercentage: 0.1
  });
}
// 轮播图模块
var slider = new Slider();
slider.initialize();

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
      // 
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
  let detialHeadImgs = document.querySelectorAll('.detail-header-img');
  function resizeDetailImgs() {
    $.each(detialHeadImgs, (index, headImg) => {
      let $headImg = $(headImg);
      let imgAspectRatio = $headImg.context.naturalWidth / $headImg.context.naturalHeight;  // 宽高比
      let windowAspectRatio = window.innerWidth / window.innerHeight; // 窗口宽高比
      if (imgAspectRatio < windowAspectRatio) {
        $headImg.css({
          width: '100%',
          height: 'auto'
        })
      } else {
        $headImg.css({
          height: '100%',
          width: 'auto'
        })
      }
    })
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

  // 轮播图翻转报名按钮模块
  !(() => {
    let $button = $(".zl-turn-btn");
    $button.on('click', function () {
      // banner.isLeaveBanner = true;
      // banner.stopBanner();
      slider.stopSlider();
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
    let vh = $(window).height();
    let winTop = $(window).scrollTop();

    splitTxt($($(".zl-content-one")[0]), "TopView Android组专注于有创意、@有特色的主流App开发、@Android高新技术探索以及Android系统源代码的研究。", "left");
    splitTxt($($(".zl-content-two")[0]), "Android组自成立以来，@一直有大量的师兄涌入@阿里、腾讯、网易等一线互联网公司。@每年各位毕业的优秀师兄都会回来@分享Android的前沿技术以及发展趋势。@Android组得益于大量的优秀师兄指导，@目前已经成为广东工业大学优秀的Android开发小组之一。", "left");
    splitTxt($($(".zl-content-three")[0]), "除此之外，每年师兄师姐都会根据招新水平，@制定详细的培养计划帮助新一届的师弟师妹快速成长，@成为同届中技术的佼佼者.@只要你热爱Android，热爱Android开发，@就来吧！加入Android组吧！", "center");
    // 出现图片
    function showImg(obj) {
      obj.removeClass("skewImg");
    }
    $android.on("scroll", function () {
      $fontBg.css("opacity", (1 - $android.scrollTop() / 350));
      // 
      if ($android.scrollTop() > 183) {
        showImg($(".detail-img1"));
        pMoveAnimate($($(".zl-content-one")[0]), "up");
      } else {
        pMoveAnimate($($(".zl-content-one")[0]), "down");
      }
      if ($($(".zl-content-two")[0]).offset().top - winTop < vh) {
        pMoveAnimate($($(".zl-content-two")[0]), "up");
        showImg($(".detail-img2"));
      } else {
        pMoveAnimate($($(".zl-content-two")[0]), "down");
      }
      if ($(".detail-img3").offset().top - winTop < vh)
        showImg($(".detail-img3"));
      if ($($(".zl-content-three")[0]).offset().top - winTop < vh) {
        pMoveAnimate($($(".zl-content-three")[0]), "up");
      } else {
        pMoveAnimate($($(".zl-content-three")[0]), "down");
      }
    })
    function close() {
      var p = new Promise(function (resolve, reject) {
        setTimeout(function () {
          // banner.backSetFunc();
          slider.startSlider();
          // 让某一页展示
          $("#detail-pages").hide();
          $("#banner-container").show();
          resolve("true");
        }, 800);
      });
      return p;
    }
    $close.click(function () {

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

    let $backState = $('#back-stage')
    let $svg1 = $('#back-stage svg')
    let $paths = $('#back-stage path');
    splitTxt($($(".cf-text-container1")[0]), 'TopView 后台组是与数据和信息打交道的方向，@是 Android、iOS、前端的“坚实后盾”是每@个工作室的核心方向。TopView后台组基于@Java语言，自成立以来，一直致力于政府级@ 、企业级项目的实现和优化，如此大型的项目@成就了一代又一代的优秀师兄师姐。@目前已有多位师兄在腾讯、阿里、@百度、美团等一线互联网公司工作。', "left");


    splitTxt($($(".cf-text-container2")[0]), "现在后台组开发了众多优秀的事务管理系统以及 P2P@服务平台，如海口应急指挥调度系统，优校云等等。这些@大型的项目使我们得到历练，快速成长。优秀@而又热情的你可以用扎实的C语言@编程基础武装自己，加入后台组吧！", "right");

    let animation
    let hasAnimate = false
    let runSvg = () => {
      animation = anime.timeline({
        duration: 700,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: false
      });
      // )
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
      $(".cf-header-font").css("opacity", (1 - $backState.scrollTop() / 350));
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
        $('#back-stage .cf-flexbox2 img').removeClass('translate-img');

      } else {
        pMoveAnimate($($(".cf-text-container2")[0]), "down");
        $('#back-stage .cf-flexbox2 img').addClass('translate-img');
      }
    })
  })();
  // let banner;
  // 轮播图
  (() => {
    $('#detail-pages').hide();
    // 跳转到详情页
    slider.toDetailPage = function () {
      slider.stopSlider();
      curtainUp().then(() => {
        // 幕布完全上遮后更换内容
        setTimeout(() => {
          $("#detail-pages").show();
          $("#banner-container").hide();
        }, 800);
        return showPage(slider.currentSlide);
      }).then(curtainDown).then(function () {
        setTimeout(function () {
          $($bars).css("z-index", -1);
        }, 800);
      });
    }
    $('#slider').on('click', 'canvas', slider.toDetailPage);


    let scrollPromot = `
      <div class="rj-scroll-promot">
        <span></span>
      </div>
    `;
    $('.per-one').append($(scrollPromot));
    $('.pers-one').append($(scrollPromot));
    // $('.rj-scroll-promot').on('click',function() {
    //   
    //   
    //   let parent = $(this).parent();

    //   $(this).parents('.page').scrollTop((parent.siblings('.per-two') || parent.siblings('.pers-two')).offset().top);
    // });

    // let $btns = $(".banner-btn span");  // 获取轮播图索引按钮
    // let $bannerPages = $("#banner li");
    // let $bannerUl = $("#banner");   // 获取banner UL
    // let $bannerImgs = $("#banner .outer-mask img"); // 获取每一页轮播图的img
    // let $bannerFontUp = $(".banner-center-up");     // 部门字体
    // let $bannerFontDown = $(".banner-center-down"); // 部门标签小字体
    // let $nextBannerBtn = $("#banner-container .next-btn"); // 下一页按钮
    // let $preBannerBtn = $("#banner-container .pre-btn"); // 上一页按钮
    // let $preLoad = $('#rj-img-pre-load img');
    // index: 			0  	1  	 2   3    4
    // 对应部门: 	    前端 安卓 后台 IOS 机器学习

    /*  
    * @desc 轮播图节流 时间戳版本
    * @param func 函数
    * @param index 跳转页面index
    * @param wait 延迟执行毫秒数
    */
    // 共享previous
    // let previous = 0;
    // function throttleBanner(func, index, wait) {
    //   // 
    //   let now = Date.now();
    //   var p = new Promise(function (resolve, reject) {
    //     if (now - previous > wait) {
    //       func.call(banner, index); // 间距时间超过wait则调用相应的函数
    //       banner.stopBanner();			// 停止轮播
    //       previous = now;						// 更新以前的值
    //       resolve();
    //     }
    //   });
    //   return p;
    // }

    // 轮播图对象
    // banner = {
    //   playIndex: 0,   // 正在播放的页index值
    //   bannerTimer: undefined, // 定时器
    //   bannerTime: 4000, // 轮播时间
    //   // canChangePage: false,

    //   isMoving: false,        // 是否正在动画中
    //   moveCnt: 0,             // transition计数器
    //   isLeaveBanner: false,      // 是否离开了轮播图

    //   // 存放每一张轮播图的url的数组
    //   bannerImgScr: [bannerImg1, bannerImg2, bannerImg3, bannerImg4, bannerImg5],
    //   // 部门名字数组
    //   bannerFontUp: ["前端", "android", "后台", "iOS", "机器学习"],
    //   // 部门标签数组
    //   bannerFontDown: ["创意、前沿艺术", "技术探索、培养模式", "坚实后盾、严谨", "优雅极致、中流砥柱", "人工智能、大数据"],
    //   // 背景颜色数组
    //   bgColors: ["#97e0da", "#a5ae6c", "rgb(76, 137, 172)", "rgb(115, 111, 110)", "rgba(244, 208, 177, 0.99)"],
    //   // 位置类名的顺序数组
    //   classArr: ["pre-page", "mid-page", "next-page"],
    //   // 初始化轮播图
    //   init() {
    //     this.setPosClass();
    //     this.preSetSrc("mid-page", this.playIndex); // 给中间页加载前端(第一个)板块
    //     this.setBackground(); // 设置第一个背景颜色
    //     this.setBtn();  // 设置第一个按钮颜色
    //     // 预先加载图片
    //     $.each($preLoad, function (index, item) {
    //       $(item).attr('src', banner.bannerImgScr[index]);
    //     });
    //   },
    //   // 按钮高亮
    //   setBtn() {
    //     $btns.removeClass("btn-play").eq(this.playIndex).addClass("btn-play");
    //   },
    //   // 设置背景颜色
    //   setBackground() {
    //     $bannerUl.css("background-color", this.bgColors[this.playIndex]); // 设置第一个背景颜色
    //   },
    //   // 设置轮播图的class
    //   setPosClass() {
    //     for (let i = 0; i < $bannerPages.length; i++) {
    //       $bannerPages.eq(i).removeClass("pre-page mid-page next-page").addClass(this.classArr[i]);
    //     }
    //   },
    //   // 清除transition类名
    //   clearClass() {
    //     for (let i = 0; i < $bannerPages.length; i++) {
    //       $bannerPages.eq(i).removeClass("banner-out banner-in");
    //     }
    //   },
    //   // 启动录播图
    //   goBanner() {
    //     if (this.isLeaveBanner) return;     // 如果已经离开了轮播图，那就不要启动轮播图了
    //     this.bannerTimer = setInterval(() => {
    //       banner.nextBannerPage(banner.playIndex + 1);        // 开始下翻页
    //     }, this.bannerTime);
    //   },
    //   // 停止轮播图
    //   stopBanner() {
    //     clearInterval(banner.bannerTimer);        // 清除定时器
    //     banner.isMoving = false;
    //     banner.moveCnt = 0;             // transition计数器
    //   },
    //   // 预先设置函数：index 设置对应index的部门内容
    //   preSetSrc(str, index) {
    //     $bannerImgs.eq(this.classArr.indexOf(str)).attr("src", this.bannerImgScr[index]);
    //     $bannerFontUp.eq(this.classArr.indexOf(str)).text(this.bannerFontUp[index]);
    //     $bannerFontDown.eq(this.classArr.indexOf(str)).text(this.bannerFontDown[index]);
    //   },
    //   // 下翻页
    //   nextBannerPage(index) {
    //     this.playIndex = (index == this.bannerImgScr.length) ? 0 : index; // 越界判断
    //     this.setBackground();   // 设置背景颜色
    //     this.preSetSrc("next-page", this.playIndex);    // 更新下一张轮播图的信息
    //     this.clearClass();  // 清除transition类名
    //     // 更新位置数组并设置
    //     $($bannerPages[this.classArr.indexOf("mid-page")]).addClass("banner-out");
    //     $($bannerPages[this.classArr.indexOf("next-page")]).addClass("banner-in");
    //     banner.isMoving = true;
    //     this.classArr.unshift(this.classArr.pop());
    //     this.setPosClass();
    //     this.setBtn();  // 按钮高亮
    //   },
    //   // 上翻页
    //   preBannerPage(index) {
    //     this.playIndex = (index == -1) ? this.bannerImgScr.length - 1 : index; // 越界判断
    //     this.setBackground();
    //     this.preSetSrc("pre-page", this.playIndex); // 更新下一张轮播图的信息
    //     this.clearClass();  // 清除transition类名
    //     // 更新位置数组并设置
    //     $($bannerPages[this.classArr.indexOf("mid-page")]).addClass("banner-out");
    //     $($bannerPages[this.classArr.indexOf("pre-page")]).addClass("banner-in");
    //     banner.isMoving = true;
    //     this.classArr.push(this.classArr.shift());
    //     this.setPosClass();
    //     this.setBtn(); // 按钮高亮
    //   },
    //   // 节流的翻页
    //   throttlePage(index, actionType) {
    //     let actionFunc = (actionType === "next") ? banner.nextBannerPage : banner.preBannerPage;
    //     // 3180是动画的持续时间
    //     throttleBanner(actionFunc, index, 3180).then(() => {
    //       setTimeout(() => {
    //         banner.goBanner();
    //       }, 3180)
    //     });
    //   },
    //   // 跳转到详情页
    //   toDetailPage(index) {
    //     this.isLeaveBanner = true;  // 离开轮播图
    //     banner.stopBanner();

    //     curtainUp().then(() => {
    //       // 幕布完全上遮后更换内容
    //       setTimeout(() => {
    //         $("#detail-pages").show();
    //         $("#banner-container").hide();
    //       }, 800);
    //       return showPage(index);
    //     }).then(curtainDown).then(function () {
    //       setTimeout(function () {
    //         $($bars).css("z-index", -1);
    //       }, 800);
    //     });
    //   },
    //   // 从其他模块回来的时候设置
    //   backSetFunc() {
    //     this.isMoving = false;
    //     this.moveCnt = 0;
    //     this.isLeaveBanner = false;
    //     this.goBanner();
    //   },
    // }

    // banner.init();

    // $('.inner-mask img').on('webkitTransitionEnd', function () {
    //   
    //   banner.moveCnt = (banner.moveCnt + 1) % 6;
    //   if (banner.moveCnt === 0) {
    //     banner.isMoving = false;
    //     
    //   }
    // })

    // 点击按钮跳转翻页
    // $(".banner-btns").on("click", ".bg-span", (event) => {
    //   if (banner.isMoving) return;
    //   let e = event || window.event;
    //   let t = e.target;
    //   let index = $(t).parent(".banner-btn").index();      // 获取按钮位序
    //   if (index === banner.playIndex) return;
    //   banner.stopBanner();    // 停止轮播
    //   if (index > banner.playIndex) {
    //     banner.throttlePage(index, "next");
    //   } else if (index < banner.playIndex) {
    //     banner.throttlePage(index, "pre");
    //   }
    // });
    // 上下翻页
    // $nextBannerBtn.on("click", () => {
    //   if (banner.isMoving) return;
    //   banner.throttlePage(banner.playIndex + 1, "next");
    // });
    // $preBannerBtn.on("click", () => {
    //   if (banner.isMoving) return;
    //   banner.throttlePage(banner.playIndex - 1, "pre");
    // });
    // 通过点击跳转至详情页
    // $("#banner li").on("click", ".banner-font-container", function (e) {
    //   let index = banner.bannerFontUp.indexOf($(e.currentTarget).find(".banner-center-up").text()); // 获取此时要进入的详情页
    //   banner.toDetailPage(index);
    // });
    // $("#banner li").on("click", ".inner-mask img", function (e) {
    //   let index = banner.bannerImgScr.indexOf($(e.currentTarget).attr('src')); // 获取此时要进入的详情页
    //   banner.toDetailPage(index);
    // });

  })();



  //front-end
  (() => {

    let $frontEnd = $("#front-end")
    let $headerFont = $($('#front-end .per-one .header-font')[0]);
    splitTxt($($('.wf-txt-container1')[0]), "TopView 前端组主要基于@HTML，CSS，JavaScript等@基础web前端编程语言进行开发，@同时引入前端领域前沿技术进一步构建项目。", "left");
    splitTxt($($('.wf-txt-container2')[0]), "我们专注于展现视觉更好的页面，@打造用户体验更优的网站，@开发更有特色更有创意的产品。@如果你喜欢设计、热爱前端，@那你就是我们前端组想要的！", "left");
    // 出现图片
    function showImg(obj) {
      obj.removeClass("skewImg");
    }
    $frontEnd.on("scroll", function () {
      $headerFont.css("opacity", (1 - $frontEnd.scrollTop() / 350));
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

    let $iosDiv = $("#ios");
    let $headerFont = $($("#ios .per-one .header-font")[0]);
    splitTxt($($(".mq-txt-container1")[0]), "TopView iOS组主要基于iOS系统进行主流App开发，专注于为用户提供流畅与优雅的极致体验。@除此之外，基于目前主流大公司对跨平台开发人员的需求，我们小组成员也对跨平台开发进行学习，定期开展有关知识的讨论与交流。@作为TopView的主要开发组之一，自成立来。不断有师兄师姐在毕业后就职于阿里，腾讯，字节跳动等互联网大厂。", "left");
    splitTxt($($(".mq-txt-container2")[0]), "@我们拥有不定期的分享会机制与丰富多彩的内建活动，已毕业的优秀师兄师姐在空闲之余都会回来分享iOS的底层架构与前沿技术，只要学习认真，还有机会获得师兄师姐所在互联网大厂的内推资格。@加入我们，相信你一定能得到锻炼与成长。@只要你有c语言基础，热爱学习，有责任心就加入iOS组吧!", "left");
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

    let $machineDiv = $("#machine-learning");
    let $headerFont = $($("#machine-learning .per-one .banner-font-container")[0]);
    let $machineP1 = $($("#machine-learning .per-one")[0]);
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
        // 
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
        // 
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
      // 
      if (isAllLoaded && loadingtransitionEnd) {
        // 
        $('#loading-module').animate({
          opacity: 0
        }, 1000, () => {
          $('#loading-module').hide();
        });
        // banner.moveCnt = 0;
        // banner.goBanner();
        slider.init();
        // $('#rj-img-pre-load').remove();
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
      resizeDetailImgs();
      // 
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

      // 
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
    const $formPages = $('#form-page');// 整个表单页面
    const $formPageOne = $('#form-page-one'); // 表单第一页
    const $formPageTwo = $('#form-page-two');// 表单第二页
    const $username = $('[name=username]'); // 姓名
    const $studentId = $('[name=student-id]'); // 学号
    const $gradeProfessional = $('[name=grade-professional]'); // 年级专业
    const $radio = $('.x-radio'); // 性别
    const $nextStep = $('.next-step'); // 下一步按钮(返回封面)
    const $submit = $('.submit'); // 提交按钮
    const $number = $('[name=number]'); // 手机号
    const $email = $('[name=email]'); // 邮箱
    const $introduction = $('[name=introduction]');
    const $direction = $('[name=direction]'); // 方向
    const $academy = $('[name=academy]'); // 学院
    const $option = $('.direction-dropdown'); // 获取方向下拉框
    const $academyOption = $('.academy-dropdown'); // 获取学院下拉框
    const $skills = $('[name=skills]'); // 技能
    const $idea = $('[name=idea]'); // 想法
    const $triggerBtn = $('.direction-combo'); // 方向单选框按钮
    const $academyBtn = $('.academy-combo'); // 学院单选框按钮
    const $button = $(".zl-turn-btn"); // 轮播图前往表单的按钮
    const $backBtn = $('#form-page .zl-form-page-close-btn') //返回轮播图的按钮
    const $bannerContainer = $('#banner-container') //获取轮播图界面
    const $detailToFormBtns = $('.c-btn'); //获取详情页前往表单的按钮
    const $time = $('.zl-third-book .time');// 获取倒计时的秒数
    const $ewmImg = $('#ewm-img'); // 获取存放小程序二维码的元素
    const $detailPages = $('#detail-pages .page')
    let backBannerFlag = true // 标记此时默认是从轮播图的按钮进入表单界面的
    let flag = false; // 是否提交的标识
    let directionText = '前端'
    // 初始化表单数据,用于发给后台的表单数据
    // let formData = {
    //   username: '', // 姓名
    //   studentId: '', // 学号
    //   academy: '', // 学院
    //   gradeProfessional: '', // 年级班级
    //   sex: '', // 性别
    //   phone: '', // 手机号码
    //   email: '', // 邮箱
    //   introduction: '', // 自我介绍
    //   direction: '', // 选择的方向
    //   skills: '', // 你所掌握的技能
    //   idea: '', // 你对我们工作室的想法
    //   // checkFront: '', // 前端动态生成的验证码
    //   // checkBack: '' // 用户填写的验证码
    // };
    let formData = {
      name: '', // 姓名
      schoolId: '', // 学号
      institute: '', // 学院
      major: '', // 年级班级
      sex: 0, // 性别(默认男（ 0-男，1-女）)
      phone: '', // 手机号码
      mail: '', // 邮箱
      introduction: '', // 自我介绍
      direction: 0, // 选择的方向（默认前端，（0-前端、1-后台、2-安卓、3-iOS、4-机器学习））
      skill: '', // 你所掌握的技能
      know: '', // 你对我们工作室的想法
    };

    // 给轮播图前往表单的按钮绑定单击响应函数
    $button.on('click', function (event) {
      backBannerFlag = true;
      $formPages.removeClass('zl-form-out')
      $formPages.addClass('zl-form-in')
      directionText = matchDirection(slider.currentSlide)
      $direction.val(directionText);
      slider.stopSlider();
      event.stopPropagation()
    })
    function matchDirection (num) {
      switch (num) {
        case 0:
          return '前端';
          break;
          case 1:
          return 'android';
          break;
          case 2:
          return '后台';
          break;
          case 3:
          return 'iOS';
          break;
          case 4:
          return '机器学习';
          break;
      }
    }
    // 给返回轮播图/详情页按钮绑定单击响应函数
    $backBtn.on('click', function () {
      $formPages.removeClass('zl-form-in')
      $formPages.addClass('zl-form-out')
      if (backBannerFlag) {
        slider.startSlider();
        // banner.backSetFunc();
        $bannerContainer.show();
        $bannerContainer.css({
          'z-index': 0
        })
        $bannerContainer.animate({
          'z-index': 9
        }, 1000, function () {
        })
      }
    })
     // 给详情页前往表单的多个按钮绑定单击响应事件
     $detailToFormBtns.on('click', function () {
      backBannerFlag = false; //代表此时是从详情页进入表单的
      $detailPages.each((i, value) => {
        if ($(value).hasClass('active')) {
          let index = $(value).attr('data-index')*1
          directionText = matchDirection(index)
          $direction.val(directionText);

          
        }
      })

      $formPages.removeClass('zl-form-out')
      $formPages.addClass('zl-form-in')
      event.stopPropagation()
    })
    function myTrim(x) {
      return x.replace(/^\s+|\s+$/gm, '');
    }

    // 使用事件委托监听输入框的失去焦点事件
    $formPages.on('blur', 'input', function (ev) {
      let match = $(ev.target).attr('name');
      let value = $(ev.target).val().trim();
      // 
      value = filterXSS(value)
      switch (match) {
        case "username":
          formData.name = value;
          break;
        case "student-id":
          formData.schoolId = value;
          break;
        case "grade-professional":
          formData.major = value;
          break;
        case "number":
          formData.phone = value;
          break;
        case "email":
          formData.mail = value;
          break;
        default:
          break;

      }

    })
    // 使用事件委托监听文本域的失去焦点事件
    $formPages.on('blur', 'textarea', function (ev) {
      let match = $(ev.target).attr('name');
      let value = $(ev.target).val().trim();
      // 
      value = filterXSS(value)
      switch (match) {
        case "introduction":
          formData.introduction = value;
          break;
        case "idea":
          formData.know = value;
          break;
        case "skills":
          formData.skill = value;
          break;
        default:
          break;

      }
      // 
    })

    // 关闭弹窗动画效果
    function modalHide() {
      $('.modal').delay(300).hide(1); // 隐藏整个对话框和模板
      $('.modal article').css({
        '-webkit-transform': 'translateX(0) translateY(0) scale(0,0)',
        'transform': 'translateX(0) translateY(0) scale(0, 0)',
      });
      $('.modal .overlay').css({
        background: ''
      });
    }

    // 给表单绑定单击函数，使下拉框消失
    $(document).on('click', function (ev) {
      $option.fadeOut(100);
      $academyOption.fadeOut(100);
      modalHide();
    })
    // 设置性别默认为男性
    // let sex = $radio.attr('value');
    $radio.children()[0].style.background = '#ae8e74';
    // formData.sex = sex;
    // 给性别单选按钮绑定单击响应函数
    $radio.on('click', function (ev) {
      let sex = $(this).attr('value');
      $(this).children()[0].style.background = '#ae8e74';
      $(this).first().siblings().children()[0].style.background = '#fff';
      formData.sex = (sex === '男') ? 0 : 1;

    })
    // 给方向下选框按钮绑定点击函数
    $triggerBtn.on('click', function (ev) {
      $option.slideToggle(100);
      ev.stopPropagation()
    })
    // 给学院下选框按钮绑定点击函数
    $academyBtn.on('click', function (ev) {
      $academyOption.slideToggle(100);
      ev.stopPropagation()
    })
    // 方向下拉框
    $option.on('click', function (ev) {
      $direction.val($(ev.target).text());
      directionText = $(ev.target).text()
      // formData.direction = $(ev.target).text();
      formData.direction = $(ev.target).attr('data-index');
    })
    // 学院下拉框
    $academyOption.on('click', function (ev) {
      $academy.val($(ev.target).text());
      formData.institute = $(ev.target).text();
    })
   
    // 对话框的'x'按钮
    $('.modal .close').click(function () {
      flag = false;
      modalHide();
    })
    // 这段代码给我搬过去等二次验证完再执行翻页等操作
    // 对话框确定提交
    // $('.modal .zl-confirm').click(function() {
    //   if (formData.sex == '男') {
    //     formData.sex = 0
    //   } else {
    //     formData.sex = 1
    //   }
    //   flag = true;
    //   $('.modal').hide() // 隐藏整个对话框和模板
    //   if (flag) {
    //     $('.scene').css({
    //       margin: '0% 20% 5% 72%'
    //     }) //调整书本位置
    //     nextPage() //翻页
    //     // 
    //     $('.book').off() // 解除书本的事件监听
    //     $('.zl-second-book').off()
    //     $('.zl-form-page-close-btn').hide() //隐藏回退按钮
    //     // let time = $time.text() * 1
    //     // setInterval(() => {
    //     //   $time.text(time--)
    //     //   if (time <= 0) {
    //     //     location.reload() //三秒后刷新页面
    //     //   }
    //     // }, 1000)
    //   }

    // })
    // 对话框取消提交
    $('.modal .zl-thinking').click(function () {
      flag = false;
      modalHide();
    })
    // 对话框
    $('.modal article').click(function (ev) {
      ev.stopPropagation()
    })
    // 返回首页的刷新按钮
    $('#zl-reload-btn').click(function () {
      let flag = confirm('注：返回首页将会刷新页面，请确保已经扫码二维码或者保存图片！')
      if (flag) {
        setTimeout(function () {
          location.reload() //刷新页面
        }, 1000)
      }

    })
    // 提交按钮
    $submit.on('click', function () {
      switch (directionText) {
        case '前端':
          formData.direction = 0;
          break;
          case '后台':
          formData.direction = 1;
          break;
          case 'android':
          formData.direction = 2;
          break;
          case 'iOS':
          formData.direction = 3;
          break;
          case '机器学习':
          formData.direction = 4;
          break;
      }
      console.log(formData)
      /* 
      flag = true;
      // $('.modal').hide() // 隐藏整个对话框和模板
      if (flag) {
        $('.scene').css({
          margin: '0% 20% 5% 72%'
        }) //调整书本位置
        $formPageOne.fadeOut()
        $formPageTwo.fadeOut()
        nextPage() //翻页
        setTimeout(() => {
          $('.zl-second-book .front').remove();
          $('.zl-first-book').remove();
        }, 1500);
        // 
        $('.book').off() // 解除书本的事件监听
        $('.zl-second-book').off()
        $('.zl-form-page-close-btn').hide() //隐藏回退按钮
      }
      return false
      此处用于简化调试表单
      */
      formData.institute = $academy.val()

      if (nameCheck() && idCheck() && gradeCheck() && phoneCheck() && emailCheck() && introCheck() && skillsCheck() && cogCheck()) {
        // if (!check()) {
        //   return false
        // }
        $($('#form-page-two .form-body').get(0)).css({
          transition: 'none'
        })
        // flag = true
      }
      else {
        alert("请正确输入信息");
        return false
      }
      $('.modal_1 .check-phone').text(formData.phone)
      $('.modal_1 .check-id').text(formData.schoolId)
      $('.modal_1 .check-name').text(formData.name)
      $('.modal_1 .check-direction').text(directionText)
      $('.modal_1').show(0, () => {
        $('.modal_1 article').css({
          '-webkit-transform': 'translateX(0) translateY(0) scale(1, 1)',
          'transform': 'translateX(0) translateY(0) scale(1, 1)',
        })
        $('.modal_1 .overlay').css({
          background: 'rgba(17,17,17,0.6)'
        })
      }) // 显示整个对话框和模板
      // 对话框
      // $('.modal_1 article').css({
      //   '-webkit-transform': 'translateX(0) translateY(0) scale(1, 1)',
      //   'transform': 'translateX(0) translateY(0) scale(1, 1)',
      //   'display': 'block'
      // })
    })
    $username.on("blur", nameCheck);//1.名字
    function nameCheck() {
      let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
      let name = $username.val();
      if (!reg.test(name) || name == '') {
        $username.css("border", "1px solid red");
        $(".zl-name-span").html("<span class='red-form'>请输入2~20位中文(可包含·)</span>");
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
        $(".zl-id-span").html("<span class='red-form'>你确定这是广工学子的学号？</span><img class='wangchai' src='https://education.topviewclub.cn/file/assert/wangchai.png'>");
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
        $(".zl-grade-span").html("<span class='red-form'>你究竟是何方神圣？</span>");
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
        $(".zl-phone-span").html("<span class='red-form'>这号码好像不太对劲</span>");
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
      // email = filterXSS(email)
      if (!reg.test(email) || email == '') {
        $email.css("border", "1px solid red");
        $(".zl-email-span").html("<span class='red-form'>这可能是个假邮箱</span>");
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
        $(".zl-intro-span").html("<span class='red-form'>填点什么吧，我们好想认识你呀！</span>");
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
        $(".zl-skills-span").html("<span class='red-form'>啥都不会？好歹会吹水吧？</span>");
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
        $(".zl-idea-span").html("<span class='red-form'>总得吹点水吧</span><img class='wangchai' src='https://education.topviewclub.cn/homework-file/2020-2-16/aa48207b0d0d4865b60d7b725e5615ad1581857853142/wangchai.png'>");
        return false;
      }
      $idea.css("border", "");
      $(".zl-idea-span").html("");
      return true;
    }
    // 用于保存图片到本地的函数（解决跨域）
    function downloadIamge(selector, name) {
      var image = new Image() // 解决跨域 Canvas 污染问题 
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function () {
        var canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        var url = canvas.toDataURL('image/png')
        // 生成一个a元素 
        var a = document.createElement('a')
        // 创建一个单击事件 
        var event = new MouseEvent('click')
        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称 
        a.download = name || '下载图片名称'
        // 将生成的URL设置为a.href属性
        a.href = url
        // 触发a的单击事件 
        a.dispatchEvent(event)
      }
      image.src = document.querySelector(selector).src
    }
    // 调用方式 
    // 参数一： 选择器，代表img标签 
    // 参数二： 图片名称，可选 downloadIamge('canvas', '图片名称')
    // 图片保存
    $('#zl-save-img').click(function () {
      downloadIamge('#ewm-img', 'topview_mini.png')

    })

    // API1 调用初始化函数进行初始化
    $.ajax({
      url: '/api/captcha/generate',
      type: "get",
      dataType: "json",
      success: function (data) {
          // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
          initGeetest({
            product: 'bind',
            lang: 'zh-cn',
            // 以下配置参数来自服务端 SDK
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: true,
          }, function (captchaObj) {
            document.getElementById('rj-jy-btn').addEventListener('click', function () {
              // if (check()) { // 检查是否可以进行提交
              captchaObj.verify();
              modalHide(); // 隐藏整个对话框和模板
              // }
            });
            captchaObj.onSuccess(function () {
                // 用户验证成功后，进行实际的提交行为
                var result = captchaObj.getValidate();
                $('#rj-loading').fadeIn();
                $.ajax({
                  url: '/api/captcha/verify',
                  type: 'post',
                  data: {
                    geetest_challenge: result.geetest_challenge,
                    geetest_validate: result.geetest_validate,
                    geetest_seccode: result.geetest_seccode,
                  },
                  dataType: "text",
                  success: function(data) {
                      if(data === '') {     // 空字符串则验证失败
                        captchaObj.reset(); // 调用该接口进行重置
                      } else {
                        formData.captchaToken = data;  // 获取到token
                        }
                        // TODO: 在此发送ajax请求之类的
                        $.ajax({
                          method: "post",
                          url:'/api/student/submitSignUp',
                          data: JSON.stringify(formData),
                          dataType: "json",
                          contentType: "application/json",
                          success: function (data) {
                            $('#rj-loading').fadeOut();
                            if (data.success == true && data.code == 200) {
                              flag = true;
                              // $('.modal').hide() // 隐藏整个对话框和模板
                              if (flag) {
                                $('.scene').css({
                                  margin: '0% 20% 5% 72%'
                                }) //调整书本位置
                                $('.book').css({
                                  'box-shadow': 'none'
                                })
                                $formPageOne.fadeOut()
                                $formPageTwo.fadeOut()
                                nextPage() //翻页
                                setTimeout(()=>{
                                  $('.zl-second-book .front').remove();
                                  $('.zl-first-book').remove();
                                },1500);
                                // 
                                $('.book').off() // 解除书本的事件监听
                                $('.zl-second-book').off()
                                $('.zl-form-page-close-btn').hide() //隐藏回退按钮
                                // 设置二维码
                                $ewmImg.get(0).src = data.message
                    
                      }
                    } else {
                      $('.modal_2').show(0, () => {
                        $('.modal_2 article').css({
                          '-webkit-transform': 'translateX(0) translateY(0) scale(1, 1)',
                          'transform': 'translateX(0) translateY(0) scale(1, 1)',
                        })
                        $('.modal_2 .overlay').css({
                          background: 'rgba(17,17,17,0.6)'
                        })
                      }) // 显示整个对话框和模板
                      // $('.modal_2').show() // 隐藏整个对话框和模板
                      // $('.modal_2 article').css({
                      //   '-webkit-transform': 'translateX(-50%) translateY(-50%) scale(1, 1)',
                      //   'transform': 'translateX(-50%) translateY(-50%) scale(1, 1)',
                      //   'display': 'block'
                      // })
                      $('.modal_2 .message').text(data.message)

                      // alert(data.message)
                    }
                  }
                })
              }
            })
          })
        })
        // })
      }
    })
    // //产生验证码  
    // createCode();
    // var code; //在全局定义验证码  
    // function createCode() {
    //   code = "";
    //   var codeLength = 4; //验证码的长度  
    //   var checkCode = document.getElementById("code");
    //   var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    //     'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
    //   for (var i = 0; i < codeLength; i++) { //循环操作  
    //     var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
    //     code += random[index]; //根据索引取得随机数加到code上  
    //   }
    //   formData.checkFront = code;
    //   checkCode.value = code; //把code值赋给验证码  
    // }
    // // 
    // function check() {
    //   var inputCode = document.getElementById("ctl00_txtcode").value.toUpperCase();
    //   inputCode = filterXSS(inputCode)
    //   formData.checkBack = inputCode
    //   if (inputCode == "") {
    //     alert("验证码不能为空");
    //     return false;
    //   } else if (inputCode != code) {
    //     alert("看清楚点噢！");
    //     createCode(); //刷新验证码  
    //     document.getElementById("ctl00_txtcode").value = ""; //清空文本框
    //     return false;
    //   }
    //   return true;
    // }
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
    $formPageOne.click(function (ev) {
      $option.fadeOut(100);
      $academyOption.fadeOut(100);
      ev.preventDefault();
      ev.stopPropagation();
    })
    $formPageTwo.click(function (ev) {
      $option.fadeOut(100);
      $academyOption.fadeOut(100);
      ev.preventDefault();
      ev.stopPropagation();
    })
    function changePage() {
      if ($('.zl-first-book').hasClass('active')) {
        $('.zl-first-book .front h1').hide()
        $formPageTwo.show()
        $formPageOne.show()
        $('.scene').css({
          margin: '0% 5% 5% 50%'
        })
      }
    }

    $('.book').one('click', '.active', nextPage) // 注册一次点击事件
    $('.zl-first-book').click(changePage)
    // 给返回封面按钮绑定单击响应函数
    $nextStep.on('click', () => {
      changePage()
      prevPage()
      $('.scene').css({
        margin: '0% 20% 5% 27%'
      })
      setTimeout(function () {
        $('.zl-first-book .front h1').show()
      }, 1000)
      $('.book').one('click', '.active', nextPage)
    })
  })();
})

console.log('\n\n\n\n  ████████╗ ██████╗ ██████╗ ██╗   ██╗██╗███████╗██╗    ██╗\n  ╚══██╔══╝██╔═══██╗██╔══██╗██║   ██║██║██╔════╝██║    ██║\n     ██║   ██║   ██║██████╔╝██║   ██║██║█████╗  ██║ █╗ ██║\n     ██║   ██║   ██║██╔═══╝ ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║\n     ██║   ╚██████╔╝██║      ╚████╔╝ ██║███████╗╚███╔███╔╝\n     ╚═╝    ╚═════╝ ╚═╝       ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝ \n\n\nTopView欢迎各位小伙伴 ^_^ !!!');