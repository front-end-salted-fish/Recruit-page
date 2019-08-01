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
			return { x: a, y: b };
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
		const $article = $(".article p");
		$frontEnd.on("scroll", function () {
			//console.log($frontEnd.scrollTop())

			$perOne.css("opacity", (1 - $frontEnd.scrollTop() / 2500));
			if ($frontEnd.scrollTop() > 1850) {
				$perTwo.css("opacity", (1 - ($frontEnd.scrollTop() - 1850) / 1000));
			}
			if ($frontEnd.scrollTop() > 1000) {
				$article.fadeIn("4000");
			}
			if ($frontEnd.scrollTop() < 700) {
				$article.fadeOut("4000");
			}
			//逐行显示//not a function
			/* if ($frontEnd.scrollTop() > 446) {
				$article[0].fadeIn("4000");
			} */
			//else {$article[0].fadeOut("slow");}

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
		console.log($svg.position().top);

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

});
