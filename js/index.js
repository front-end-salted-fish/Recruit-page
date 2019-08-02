$(function () {
	console.log('Welcome to TopView!');
	//幕布函数
	const $preBtn = $(".pre-btn");
	const $nextBtn = $(".next-btn");
	function curtainUp() {
		let $bar = $(".bar");
		let $bars = $(".bars");
		var p = new Promise(function(resolve, reject) {
			setTimeout(function() {
				$($bars).css("z-index", 9);
		        $($bar[0]).animate({ height: '100vh' }, 80);
		        $($bar[1]).animate({ height: '100vh' }, 240);
		        $($bar[2]).animate({ height: '100vh' }, 400);
		        $($bar[3]).animate({ height: '100vh' }, 560);
				$($bar[4]).animate({ height: '100vh' }, 720);
				//更改按钮display
				resolve("true");
			}, 0);
		});
		return p;
	}
	// 轮播图点击触发函数
	let detailIndex = 0;
	const $pages = $(".page");
	function showPage(index){
		detailIndex = index;
		var p = new Promise(function(resolve, reject) {
			setTimeout(function() {
				$($pages[detailIndex]).css(display, "block").siblings().css(display, "none");
				resolve("true");
			}, 720);
		});
		return p;
	}
	function prePage() {
		detailIndex--;
		//console.log(detailIndex)
		if(detailIndex == 0) {
			$($preBtn).css("display", "none");
		}
		else {$($preBtn).css("display", "block");}
		if (detailIndex == 4) {
			$($nextBtn).css("display", "none");
		}
		else {$($nextBtn).css("display", "block")}
		var p = new Promise(function(resolve, reject) {
			setTimeout(function() {
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
		if(detailIndex == 0) {
			$($preBtn).css("display", "none");
		}
		else {$($preBtn).css("display", "block");}
		if(detailIndex == 4) {
			$($nextBtn).css("display", "none");
		}
		else {$($nextBtn).css("display", "block")}
		var p = new Promise(function(resolve, reject) {
			setTimeout(function() {
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
		if(data == "true") {
		var p = new Promise(function(resolve, reject) {
			setTimeout(function() {
				$($bars).css("z-index", 9);
		        $($bar[0]).animate({ height: '0vh' }, 80);
		        $($bar[1]).animate({ height: '0vh' }, 240);
		        $($bar[2]).animate({ height: '0vh' }, 400);
		        $($bar[3]).animate({ height: '0vh' }, 560);
				$($bar[4]).animate({ height: '0vh' }, 720);
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
		$($btns[0]).on("click", function() {
			curtainUp().then(prePage).then(curtainDown);
		})
		$($btns[1]).on("click", function() {
			curtainUp().then(nextPage).then(curtainDown);
		})
	})()
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
			return function() {
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
				},500)
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
			}
			else { $($article[0]).fadeOut(); }
			if ($frontEnd.scrollTop() > 570) {
				$($article[1]).fadeIn("4000");
			}
			else { $($article[1]).fadeOut(); }
			if ($frontEnd.scrollTop() > 640) {
				$($article[2]).fadeIn("4000");
			}
			else { $($article[2]).fadeOut(); }

			if ($frontEnd.scrollTop() > 706) {
				$($article[3]).fadeIn("4000");
			}
			else { $($article[3]).fadeOut(); }

			if ($frontEnd.scrollTop() > 780) {
				$($article[4]).fadeIn("4000");
			}
			else { $($article[4]).fadeOut(); }

			if ($frontEnd.scrollTop() > 840) {
				$($article[5]).fadeIn("4000");
			}
			else { $($article[5]).fadeOut(); }

			if ($frontEnd.scrollTop() > 940) {
				$($article[6]).fadeIn("4000");
			}
			else { $($article[6]).fadeOut(); }


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
		let viewportHeight = $(".per-one .bg").height();
		let $circle = $("#detail-pages circle");
		let $paths = $("#detail-pages path");
		let $lines = $("#detail-pages line");
		let $svg = $($("#detail-pages svg")[0]);
		let height = $svg.position().top + window.outerHeight - window.innerHeight + 50;

		function showSpan(obj) {
			obj.css({
				opacity: 1,
				top: "0",
			});
		}

		function hideSpan(obj) {
			obj.css({
				opacity: 0,
				top: "30px",
			});
		}

		$machineDiv.on("scroll", function () {
			$headerFont.css("opacity", (1 - $machineDiv.scrollTop() / 850));
			// console.log($machineDiv.scrollTop());
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
				showSpan($($spans[0]));
			} else {
				hideSpan($($spans[0]));
			}
			if ($machineDiv.scrollTop() > 410) {
				showSpan($($spans[1]));
			} else {
				hideSpan($($spans[1]));
			}
			if ($machineDiv.scrollTop() > 460) {
				showSpan($($spans[2]));
			} else {
				hideSpan($($spans[2]));
			}
			if ($machineDiv.scrollTop() > 510) {
				showSpan($($spans[3]));
			} else {
				hideSpan($($spans[3]));
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
		

});