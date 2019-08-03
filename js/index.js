$(function () {
	console.log('Welcome to TopView!');

	//幕布函数

	// 获取左右详情页左右按钮
	const $preBtn = $("#detail-pages .pre-btn");
	const $nextBtn = $("#detail-pages .next-btn");

	function curtainUp() {
		// 获取幕布容器
		let $bar = $(".bar");
		// 获取每个幕布
		let $bars = $(".bars");

		var p = new Promise(function (resolve, reject) {
			setTimeout(function () {
				$($bar).css("z-index", 9);
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
				}, 720);
				//更改按钮display
				resolve("true");
			}, 0);
		});
		return p;
	}


	// 目前展示页index
	let detailIndex = 0;
	// 获取所有详情页
	const $pages = $(".page");

	// 轮播图点击触发函数
	function showPage(index) {
		// 更新目前展示
		detailIndex = index;
		var p = new Promise(function (resolve, reject) {
			setTimeout(function () {
				$($pages[detailIndex]).css(display, "block").siblings(".page").css(display, "none");
				resolve("true");
			}, 720);
		});
		return p;
	}

	function prePage() {

		detailIndex--;
		//console.log(detailIndex)
		if (detailIndex == 0) {
			$($preBtn).css("display", "none");
		} else {
			$($preBtn).css("display", "block");
		}
		if (detailIndex == 4) {
			$($nextBtn).css("display", "none");
		} else {
			$($nextBtn).css("display", "block")
		}
		var p = new Promise(function (resolve, reject) {
			setTimeout(function () {
				$($pages).css("display", "none");
				$($pages[detailIndex]).css("display", "block");

				resolve("true");
			}, 1700);
		});
		return p;
	}

	function nextPage() {
		detailIndex++;
		console.log(detailIndex)
		if (detailIndex == 0) {
			$($preBtn).css("display", "none");
		} else {
			$($preBtn).css("display", "block");
		}
		if (detailIndex == 4) {
			$($nextBtn).css("display", "none");
		} else {
			$($nextBtn).css("display", "block")
		}
		var p = new Promise(function (resolve, reject) {
			setTimeout(function () {
				$($pages).css("display", "none");
				$($pages[detailIndex]).css("display", "block");
				resolve("true");
			}, 1700);
		});
		return p;
	}

	function curtainDown(data) {
		let $bar = $(".bar");
		let $bars = $(".bars");
		if (data == "true") {
			var p = new Promise(function (resolve, reject) {
				setTimeout(function () {
					$($bars).css("z-index", 9);
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
					}, 720);

					//更改按钮display
					resolve();
				}, 0);
			});
			return p;
		}
	}

	// 切换幕布
	!(() => {
		//左右按钮切换
		const $btns = $("#detail-pages svg");
		const $bars = $(".bars");
		$($btns[0]).on("click", function () {
			curtainUp().then(prePage).then(curtainDown);

		})
		$($btns[1]).on("click", function () {
			curtainUp().then(nextPage).then(curtainDown);
		})
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

	//front-end
	!(() => {
		const $frontEnd = $("#front-end");
		const $perOne = $(".per-one");
		const $perTwo = $(".per-two");
		const $article = $(".article p");
		$frontEnd.on("scroll", function () {
			//console.log($frontEnd.scrollTop())

			$perOne.css("opacity", (1 - $frontEnd.scrollTop() / 2500));
			if ($frontEnd.scrollTop() > 1850) {
				$perTwo.css("opacity", (1 - ($frontEnd.scrollTop() - 1850) / 1000));
			}
			/* if ($frontEnd.scrollTop() > 1000) {
				$article.fadeIn("4000");
			}
			if ($frontEnd.scrollTop() < 700) {
				$article.fadeOut("4000");
			} */
			//逐行显示//not a function//包装成$()
			if ($frontEnd.scrollTop() > 500) {
				$($article[0]).fadeIn("4000");
			} else {
				$($article[0]).fadeOut();
			}
			if ($frontEnd.scrollTop() > 570) {
				$($article[1]).fadeIn("4000");
			} else {
				$($article[1]).fadeOut();
			}
			if ($frontEnd.scrollTop() > 640) {
				$($article[2]).fadeIn("4000");
			} else {
				$($article[2]).fadeOut();
			}

			if ($frontEnd.scrollTop() > 706) {
				$($article[3]).fadeIn("4000");
			} else {
				$($article[3]).fadeOut();
			}

			if ($frontEnd.scrollTop() > 780) {
				$($article[4]).fadeIn("4000");
			} else {
				$($article[4]).fadeOut();
			}

			if ($frontEnd.scrollTop() > 840) {
				$($article[5]).fadeIn("4000");
			} else {
				$($article[5]).fadeOut();
			}

			if ($frontEnd.scrollTop() > 940) {
				$($article[6]).fadeIn("4000");
			} else {
				$($article[6]).fadeOut();
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
		})
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
		const $options = $('.x-dropdown-item'); // 获取下拉框
		const $skills = $('[name=skills]');
		const $idea = $('[name=idea]');
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
		$preStep.on('click', function () {
			$formPageOne.fadeIn();
			$formPageTwo.hide();
		})

	})();
	// 3d按钮模块
	!(() => {
		let
			$button = $("#btn"),
			btncoords = $button[0].getBoundingClientRect(),
			$wrap = $('#three-dimensional-btn'),
			styles = $wrap[0].style,
			$glare = $("#btn .glare");

		function rotate(e) {
			let
				x = e.clientX - btncoords.left,
				y = e.clientY - btncoords.top,
				cx = btncoords.width / 2,
				cy = btncoords.height / 2,
				dx = x - cx,
				dy = y - cy;
			styles.setProperty("--rx", `${(dy / -1.5)}deg`);
			styles.setProperty("--ry", `${(dx / 10)}deg`);
			$glare.css({
				transform: "translate(" + (-x / 2) + "%, " + -y + "%)"
			});
		};

		function restore(e) {
			styles.setProperty("--rx", `${0}deg`);
			styles.setProperty("--ry", `${0}deg`);
			$glare.css({
				transform: "translate(" + (-50) + "%, " + -50 + "%)"
			});
		}
		$button.on('mousemove', rotate);
		$button.on('mouseleave', restore);
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
					opacity: 1,
					transform: "scale(1)"
				}).parent(".banner-btn").siblings().children()
				.css({
					opacity: 0,
					transform: "scale(0)"
				});
			goBanner();
		})();

		// 启动轮播图
		var timer;

		function goBanner() {
			timer = setInterval(() => {
				nextPage(playIndex + 1);
			}, 6000);
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
					opacity: 1,
					transform: "scale(1)"
				}).parent(".banner-btn").siblings().children()
				.css({
					opacity: 0,
					transform: "scale(0)"
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
				// else if(scrollTop == 0) {
				// 	this.$content.num = 0;
				// 	for(let i = 0;i <7 ; i++) {
				// 		console.log("xiaoshi")
				// 		that.fontout($(that.$contents[i]),i);
				// 		that.$writebox.hide();
				// 	}
				// }
			}
			//使元素淡出
			fadeout(obj, scrollTop) {
				obj.style.opacity = 2.2 - (scrollTop / $(window).height());
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
						} else {
							that.$writebox.show(2000);
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
		console.log(newBackstage);
		newBackstage.init();
	})();
});