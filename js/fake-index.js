$(function() {
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
				}, 720, ()=>{
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
					}, 720, function(){
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
		detailIndex = index;
		checkPage();
		var p = new Promise(function (resolve, reject) {
			setTimeout(function () {
				// 让某一页展示
				$($pages[detailIndex]).show().siblings(".page").hide();
				$($pages[detailIndex]).scrollTop(0);
				resolve("true");
			}, 800);
		});
		return p;
	}

	// 检查第一页或者最后一页的按钮显示/隐藏
	function checkPage(){
		switch(detailIndex) {
			// 如果是第一张隐藏向上翻页按钮
			case 0 :{
				$($preBtn).css("display", "none");
				$($nextBtn).css("display", "block");
			};break;
			// 如果是最后一张隐藏向下翻页按钮
			case 4 :{
				$($preBtn).css("display", "block");
				$($nextBtn).css("display", "none");
			};break;
			// 否则都显示
			default:{
				$($preBtn).css("display", "block");
				$($nextBtn).css("display", "block");
			}
		}
	}
	// 切换幕布
	!(() => {
		//左右按钮切换
		const $btns = $("#detail-pages .switch-btn");
		$($btns[0]).on("click", function () {
			$("#detail-pages switch-btn").hide();
			curtainUp().then(()=>{
				return showPage(detailIndex - 1);
			}).then(curtainDown).then(function() {
				setTimeout(function(){
					$($bars).css("z-index", -1);
				},800);
			});
		});
		$($btns[1]).on("click", function () {
			$("#detail-pages switch-btn").hide();
			curtainUp().then(()=>{
				return showPage(detailIndex + 1);
			}).then(curtainDown).then(function() {
				setTimeout(function(){
					$($bars).css("z-index", -1);
				},800);
			});
		});
  })();

// 3d按钮模块
!(() => {
    let
        $button = $("#btn"),
        btncoords = $button[0].getBoundingClientRect(),
        $wrap = $('#three-dimensional-btn'),
        styles = $wrap[0].style,
        $glare = $("#btn .glare");

    // function rotate(e) {
    //     let
    //         x = e.clientX - btncoords.left,
    //         y = e.clientY - btncoords.top,
    //         cx = btncoords.width / 2,
    //         cy = btncoords.height / 2,
    //         dx = x - cx,
    //         dy = y - cy;
    //     styles.setProperty("--rx", `${(dy / -1.5)}deg`);
    //     styles.setProperty("--ry", `${(dx / 10)}deg`);
    //     $glare.css({
    //         transform: "translate(" + (-x / 2) + "%, " + -y + "%)"
    //     });
    // };

    // function restore(e) {
    //     styles.setProperty("--rx", `${0}deg`);
    //     styles.setProperty("--ry", `${0}deg`);
    //     $glare.css({
    //         transform: "translate(" + (-50) + "%, " + -50 + "%)"
    //     });
    // }
    // $button.on('mousemove', rotate);
    // $button.on('mouseleave', restore);
    $button.on('click', function () {
        $('#form-page').fadeIn();
        $('#banner-container').fadeOut();
    })
    window.onresize = function () {
        styles = $wrap[0].style;
        btncoords = $button[0].getBoundingClientRect();
    }
})();
// android模块
!(() => {
    // 获取页面元素
    const $android = $('#android');
    const $fontBg = $('.font-bg');
    const $persOne = $('.pers-one');
    const $close = $('.zl-close');
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
    function close() {
		var p = new Promise(function (resolve, reject) {
			setTimeout(function () {
				// 让某一页展示
                $("#detail-pages").hide();
                $("#banner-container").show();
				resolve("true");
			}, 800);
		});
		return p;
	}
    $close.click(function() {

        curtainUp().then(()=>{
            // 幕布完全上遮后更换内容
            setTimeout(()=>{
               
            },800);
            return close();
        }).then(curtainDown).then(function() {
            setTimeout(function(){
                $($bars).css("z-index", -1);
            },800);
        });

        // curtainUp().then(()=>{
        //     $('#detail-pages').hide();
        //     return 'true';
        // }).then(curtainDown).then(function() {
        //     $("#banner-container").show();
        //     setTimeout(function(){
        //         $($bars).css("z-index", -1);
        //     },800);
        // });
    })
})();
//backstage
(() => {
    let that;
    class backstage {
      constructor() {
        that = this;
        this.$backstage = $("#back-stage");
        this.$content = $(".bcak-stage-content");
        this.$sections = $("#back-stage section");
        this.$pageName = $(".page-name");
        this.$contents = $(".bcak-stage-content p");
        this.$writebox = $("#detail-pages #back-stage .per-two .write-box");
        console.log(this.$pageName);
      }
      //初始化
      init() {
        //给backstage注册事件
        this.$backstage.on("scroll", this.scroll);
      }
      //监听滚动距离
      scroll() {
        let scrollTop = that.$backstage.scrollTop();
        that.fadeout(that.$sections[0], scrollTop);
        that.fadeout(that.$pageName[0], scrollTop);
        console.log(scrollTop);
        if (scrollTop >= 240) {
          that.objmove();
        }
      }
      //使元素淡出
      fadeout(obj,scrollTop) {
        obj.style.opacity = 1.6 - (scrollTop / $(window).height());
      }
      //元素移动
      objmove() {
        this.$content.num = 0;
        that.$content.timer = null;
        that.$content.timer = () => {
          setTimeout(() => {
            console.log("num" + that.$content.num);
            console.log($(that.$contents[that.$content.num]));
            that.fontin($(that.$contents[that.$content.num]), that.$content.num);
            if (that.$content.num <= 7) {
              that.$content.num++;
              that.$content.timer();		
            }else {
              that.$writebox.show(1000);	
              return false;
            }
          }, 800)
        }
        that.$content.timer();
      }
      //显示
      fontin(obj, num) {
        if (((num) % 2) == 0) {
          obj.animate({
            left: (750 - obj.width()) / 2,
            top: num * 55
          }, 1000);
        } else if (num > 0) {
          obj.animate({
            right: (750 - obj.width()) / 2,
            top: num * 55
          }, 1000);
        }
      }
      //隐藏
      fontout(obj, num) {
        if (((num) % 2) == 0) {
          obj.animate({
            left: -750,
            top: -55
          }, 1000);
        } else {
          obj.animate({
            right: -750,
            top: -55
          }, 1000);
        }
      }
    }
    let newBackstage = new backstage();
    newBackstage.init();
  })();

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

// 表单模块
!(() => {
    // 获取表单元素
    const $formPages = $('#form-page');
    const $formPageOne = $('#form-page-one');
    const $formPageTwo = $('#form-page-two');
    const $username = $('[name=username]');
    const $studentId = $('[name=student-id]');
    const $gradeProfessional = $('[name=grade-professional]');
    const $radio = $('.x-radio');
    const $nextStep = $('.next-step'); // 下一步按钮
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
    const $button = $("#btn");
    $button.on('click', function(event) {
        $formPages.show();
        $formPages.css({
            "z-index": 100
        });
        event.stopPropagation()
    })
    
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
    $formPages.on('click', function (ev) {
        $option.fadeOut(100);
    })
    // 给性别单选按钮绑定单击响应函数
    $radio.on('click', function (ev) {
        let sex = $(this).attr('value');
        $(this).children()[0].style.background = '#07190e80';
        $(this).first().siblings().children()[0].style.background = '#fff';
        formData.sex = sex;
    })
    // 给下一步按钮按钮绑定单击响应函数
    $nextStep.on('click', function () {
        $formPageOne.hide();
        $formPageTwo.fadeIn();
    })
    // 给上一步按钮按钮绑定单击响应函数
    $preStep.on('click', function () {
        $formPageOne.fadeIn();
        $formPageTwo.hide();
    })
    // 给单选框按钮绑定点击函数
    $triggerBtn.on('click', function (ev) {
        // $option.toggle(100);
        $option.slideToggle(100);
        ev.stopPropagation()
    })
    $option.on('click', function (ev) {
        $direction.val($(ev.target).text());
        formData.direction = $(ev.target).text();
    })
    // $submit.on('click', function () {
    //     console.log(formData)
    // })


})();

//front-end
!(() => {
    const $frontEnd = $("#front-end");
    const $perOne = $(".per-one");
    const $perTwo = $(".per-two");
    const $article1 = $(".article1 p");
    const $article2 = $(".article2 p");
    $frontEnd.on("scroll", function () {
        //console.log($frontEnd.scrollTop())

        $perOne.css("opacity", (1 - $frontEnd.scrollTop() / 2500));
        if ($frontEnd.scrollTop() > 500) {
            $($article1[0]).fadeIn("4000");
        } else {
            $($article1[0]).fadeOut();
        }
        if ($frontEnd.scrollTop() > 570) {
            $($article1[1]).fadeIn("4000");
        } else {
            $($article1[1]).fadeOut();
        }
        if ($frontEnd.scrollTop() > 640) {
            $($article1[2]).fadeIn("4000");
        } else {
            $($article1[2]).fadeOut();
        }

        if ($frontEnd.scrollTop() > 706) {
            $($article1[3]).fadeIn("4000");
        } else {
            $($article1[3]).fadeOut();
        }
        //第二个article
        if ($frontEnd.scrollTop() > 1000) {
            $($article2[0]).fadeIn("4000");
        } else {
            $($article2[0]).fadeOut();
        }
        if ($frontEnd.scrollTop() > 1060) {
            $($article2[1]).fadeIn("4000");
        } else {
            $($article2[1]).fadeOut();
        }

        if ($frontEnd.scrollTop() > 1120) {
            $($article2[2]).fadeIn("4000");
        } else {
            $($article2[2]).fadeOut();
        }
        if ($frontEnd.scrollTop() > 1180) {
            $($article2[3]).fadeIn("4000");
        } else {
            $($article2[3]).fadeOut();
        }
        if ($frontEnd.scrollTop() > 1260) {
            $($article2[4]).fadeIn("4000");
        } else {
            $($article2[4]).fadeOut();
        }
    })
   
})();

// ios
(() => {
    const $ios = $("#ios");
    const $img1 = $(".pre-one");
    const $img2 = $(".pre-two");
    const $iosword = $("#ios-pretwo");
    const $iosThree = $("#ios-prethree");
    $ios.on("scroll", function () {
        console.log($ios.scrollTop());
        $img1.css("opacity", (1 - $ios.scrollTop() / 2000));

        // $iosPretwo.fadeIn("slow");
        if ($ios.scrollTop() > 2400) {
            $img2.css("opacity", (1 - ($ios.scrollTop() - 2400) / 900));
            console.log($img2);
            
            // $iosword.css("opacity", (1 - ($ios.scrollTop() - 2400) / 900));

            // console.log($iosThree);

        }
        // if ($ios.scrollTop() > 2200) {
            
        //  // $iosThree.stop(true, false).slideDown("slow");
        //  $iosThree.stop(true, false).slideUp(4000,()=>{
        //      $iosThree.css({display:'block'});
        //  });
        // }
        // if ($ios.scrollTop() > 2000) {
        //  $iosThree.stop(true, false).slideDown("slow");
        // }
    });
})();

// 机器学习
(() => {
    let $machineDiv = $("#machine-learning");
    let $headerFont = $($("#machine-learning .per-one .header-font")[0]);
    let $spans = $("#machine-learning span");
    let $circle = $("#detail-pages circle");
    let $paths = $("#detail-pages path");
    let $lines = $("#detail-pages line");
    let $svg = $($("#detail-pages svg")[0]);
    let height = $svg.position().top + window.outerHeight - window.innerHeight + 30;
    // 出现文字
    function showSpan(obj) {
        obj.css({
            opacity: 1,
            transform: "translateY(0)"
        });
    }
    // 出现图片
    function showImg(obj) {
        obj.css({
            opacity: 0.85,
            transform: "scale(1)",
            filter: "blur(0)"
        });
    }
    // 出现文字2
    function showSpan2(obj) {
        obj.css({
            opacity: 1,
            transform: "translateY(0) scale(1)"
        });
    }
    var div = document.getElementById("machine-learning");
    $machineDiv.on("scroll", function () {
        $headerFont.css("opacity", (1 - $machineDiv.scrollTop() / 850));
        if (Math.ceil(div.scrollHeight) == Math.ceil(div.scrollTop) + Math.ceil(div.clientHeight)) {
            $(".bottom-bg").css({"height":"50vh"});
        }  else {
            $(".bottom-bg").css({"height":"0vh"});
        }
        if ($machineDiv.scrollTop() > height) {
            $circle.css("stroke", "#000");
            $paths.css("stroke", "#000");
            $lines.css("stroke", "#000");
        } else {
            $circle.css("stroke", "");
            $paths.css("stroke", "");
            $lines.css("stroke", "");
        }
        if ($machineDiv.scrollTop() > 360) {
            showImg($(".img1"));
            let i = 0;
            let timer1 = setInterval(function () {
                showSpan($($spans[i++]));
                if (i == 8) {
                    clearInterval(timer1);
                }
            }, 100);
        }
        if ($machineDiv.scrollTop() > 860) {
            showImg($(".img2"));
        }
        if ($machineDiv.scrollTop() > 970) {
            let i = 8;
            let timer2 = setInterval(function () {
                showSpan($($spans[i++]));
                if (i == 11) {
                    clearInterval(timer2);
                }
            }, 100);
        }
        if ($machineDiv.scrollTop() > 1200) {
            let i = 11;
            let timer3 = setInterval(function () {
                showSpan2($($spans[i++]));
                if (i == 14) {
                    clearInterval(timer3);
                }
            }, 100);
        }
    })
})();

// 开机动画
(() => {
    let that;
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
        this.resetStye(this.$rowOne,"row-one-first-change","row-one-second-change",0);
        //第二行
        this.resetStye(this.$rowTwo,"row-two-first-change","row-two-second-change",400);
        //第三行
        this.resetStye(this.$rowThree,"row-three-first-change","row-three-second-change",800);
        //第四行
        this.resetStye(this.$rowForth,"row-forth-first-change","row-forth-second-change",1200);	
      }
      resetStye(obj,change1,change2,time) {
        console.log("类名被改了")
        setTimeout(function() {
          obj.addClass(change1);
          setTimeout(function() {
            obj.addClass(change2);
            
          },800);
        },time)
      }
    }

    let newStartAnimate = new startAnimate();
    newStartAnimate.init();
    
    // 锐基添加的代码
    let loadingtransitionEnd = false;  // 动画是否结束
    let isAllLoaded = false;  // 是否全部加载完成
    // 开机动画消失
    let loadingOut = () => {
        if(isAllLoaded && loadingtransitionEnd) {
            console.log(1);
            $('#loading-module').animate({
                opacity: 0
            },1000,()=>{
                $('#loading-module').hide();
            });
            // rjBanner.start();
            // $('#rj-img-pre-load').remove();
        }
    }
    // 开机动画结束
    $($('.row-forth .move-span')[0]).on('webkitTransitionEnd', function(){
        $($('.row-forth .move-span')[0]).off('webkitTransitionEnd');   
        loadingtransitionEnd = true; 
        loadingOut();     
        // console.log('开机动画结束!',new Date().getTime());
    })
    window.onload = function() {
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

})