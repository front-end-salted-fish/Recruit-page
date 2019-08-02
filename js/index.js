$(function () {
	console.log('Welcome to TopView!');
	// 旋转菜单模块
	!(() => {
		const $home = $('#home');
		const $imgs = $('#menu-list img');
		let c = 130;
		let flag = true;
		$imgs.on('click', function () {
			$(this).css({
				transition: ".5s linear",
				transform: "scale(2) rotate(-720deg)",
				opacity: 0.1
			});
			$(this).on("transitionend", end);
		})

		function end() {
			$(this).css({
				transition: ".1s",
				transform: "scale(1) rotate(-720deg)",
				opacity: 1
			});
			$(this).off("transitionend", end);
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
		$home.on('click', function () {
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
		})
	})()
	//front-end
	!(() => {
		const $frontEnd = $("#front-end");
		const $perOne = $(".per-one");
		const $perTwo = $(".per-two");
		$frontEnd.on("scroll", function () {
			$perOne.css("opacity", (1 - $frontEnd.scrollTop() / 2500));
			if ($frontEnd.scrollTop() > 1850) {
				$perTwo.css("opacity", (1 - ($frontEnd.scrollTop() - 1850) / 1000));
			}
		})
	})();


	// ios
	(() => {
		const $ios = $("#ios");
		const $img1 = $(".pre-one>img");
		const $img2 = $(".pre-two>img");
		$ios.on("scroll", function () {
			console.log($ios.scrollTop());
			$img1.css("opacity", (1 - $ios.scrollTop() / 2500));
			if ($ios.scrollTop() > 1850) {
				$img2.css("opacity", (1 - ($ios.scrollTop() - 1850) / 1000));
			}
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

		function showSpan(obj) {
			obj.css({
				opacity: 1,
				transform: "translateY(0)"
			});
		}

		function showImg(obj) {
			obj.css({
				opacity: 0.85,
				transform: "scale(1)",
				filter: "blur(0)"
			});
		}

		function showSpan2(obj) {
			obj.css({
				opacity: 1,
				transform: "translateY(0) scale(1)"
			});
		}
		var div = document.getElementById("machine-learning");
		var $bottomSpans = $(".bottom-span");
		$machineDiv.on("scroll", function () {
			$headerFont.css("opacity", (1 - $machineDiv.scrollTop() / 850));
			// console.log($machineDiv.scrollTop());
			if (div.scrollHeight == div.scrollTop + div.clientHeight) {
				$bottomSpans.animate({
					transform: "translateY(-300%)",
					top: 400
				});
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
			if ($machineDiv.scrollTop() > 1625) {
				$(".bottom-bg").css("height", (42 + $machineDiv.scrollTop() - 1625));
			}


		})
	})();

	// 伦哥模块
	!(() => {
		// 获取页面元素
		const $android = $('#android');
		const $fontBg = $('.font-bg');
		const $persOne = $('.pers-one');
		// 监听滚动条事件
		$android.on('scroll', function () {
			// console.log($persOne.get(0).clientHeight)
			// console.log(this.scrollTop)
			let scale = this.scrollTop / $persOne.get(0).clientHeight - 1;
			console.log(scale)
			if (scale > 0) {
				$fontBg.css({
					opacity: 1 - scale
				});
			}
		})
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
		let bannerImgScr = ["img/machine-learning/轮播1.jpg", "img/machine-learning/轮播2.jpg", "img/machine-learning/轮播3.jpg", "img/machine-learning/轮播1.jpg", "img/machine-learning/轮播2.jpg"];
		// 存放每一张部门文字的url
		let bannnerFontScr = ["img/front-end/banner-frontend-font.png", "img/android/banner-android-font.png", "img/back-stage/banner-backstage-font.png", "img/ios/banner-ios-font.png", "img/machine-learning/banner-machine-font.png"];
		// 存放每一张部门文字边框的url
		let fontBorderScr = ["img/front-end/banner-frontend-font-border.png", "img/android/banner-android-font-border.png", "img/back-stage/banner-backstage-font-border.png", "img/ios/banner-ios-font-border.png", "img/machine-learning/banner-machine-font-border.png"];
		// 存放切换颜色
		let bgColors = ["#5a94b0", "#6390ef", "#b6c5fe", "#5a94b0", "#6390ef"];

		let classArr = ["pre-page", "mid-page", "next-page"];

		let $nextBtn = $("#banner-container .next-btn"); // 下一页按钮
		let $preBtn = $("#banner-container .pre-btn"); // 上一页按钮

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
				opacity:1,
				transform:"scale(1)"
			}).parent(".banner-btn").siblings().children()
			.css({
				opacity:0,
				transform:"scale(0)"
			});
			goBanner();
		})();

		// 启动轮播图
		var timer;
		function goBanner(){
			timer = setInterval(()=>{
				nextPage(playIndex + 1);
			},6000);
		}


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
		function nextPage(index) {
			// 越界判断
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
				opacity:1,
				transform:"scale(1)"
			}).parent(".banner-btn").siblings().children()
			.css({
				opacity:0,
				transform:"scale(0)"
			});
		}
		// 向上翻页函数
		// index为跳转的部门index
		function prePage(index) {
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
				opacity:1,
				transform:"scale(1)"
			}).parent(".banner-btn").siblings().children()
			.css({
				opacity:0,
				transform:"scale(0)"
			});
		}
		// 跳转翻页
		$(".banner-btns").on("click", (event) => {
			let e = event || window.event;
			let t = e.target;
			if ($(t).hasClass("bg-span")) {
				let index = $(t).parent(".banner-btn").index();
				if (index > playIndex) {
					nextPage(index);
				} else if (index < playIndex) {
					prePage(index);
				}
			}
		});
		// 下翻页
		$nextBtn.on("click", function () {
			nextPage(playIndex + 1)
		});
		// 上翻页
		$preBtn.on("click", function () {
			prePage(playIndex - 1)
		});

	})();
});