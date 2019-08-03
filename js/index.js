$(function () {
	console.log('Welcome to TopView!');
	//开局动画
	(() => {
		const $loadingModule = $("#loading-module");
		const $loadingSpan = $(".span-one");
		const $innerspan = $(".inner-span");
		const $rightSpan = $("#right-span");
		const $spanBox = $("#span-box");
		const $moveSdiv = $(".move-span");
		// const $innerSpan = $('.move-span');
		$loadingSpan.eq(0).animate({
			left: '800px'
		}, 2000);
		$loadingSpan.eq(0).animate({
			width: '150px',
			left: "950px"
		}, 1000, () => {
			$innerspan.eq(0).css({
				right: '180px'
			});
			// $innerSpan.eq(0).animate({
			// 	right: '80px'
			// }, 1000);
			// $innerSpan.eq(1).animate({
			// 	right: '50px'
			// }, 1200);
			// $innerSpan.eq(2).animate({
			// 	right: '20px'
			// }, 1400)
			// $innerSpan.eq(3).animate({
			// 	right: ''
			// }, 1400)
		});

		$loadingSpan.eq(1).animate({
			left: '800px'
		}, 2000);
		$loadingSpan.eq(1).animate({
			width: '150px',
		}, 1000, () => {
			$innerspan.eq(1).css({
				left: '150px'
			});
			// $innerSpan.eq(7).animate({
			// 	left: '130px'
			// }, 1000);
			// $innerSpan.eq(6).animate({
			// 	left: '80px'
			// }, 1200);
			// $innerSpan.eq(5).animate({
			// 	left: '40px'
			// }, 1400);
		});
		$loadingSpan.eq(2).animate({
			width: '60px',
			left: '900px'
		}, 2000, () => {
			$innerspan.eq(2).css({
				right: '80px'
			});
			// $innerSpan.eq(8).animate({
			// 	right: '50px'
			// }, 1000);
			// $innerSpan.eq(9).animate({
			// 	right: ''
			// }, 1400);
			// $innerSpan.eq(13).animate({
			// 	left: '110px'
			// }, 1200);
			// $innerSpan.eq(12).animate({
			// 	left: '80px'
			// }, 1400);
			// $innerSpan.eq(11).animate({
			// 	left: '35px'
			// }, 1600);
			// $innerSpan.eq(10).animate({
			// 	left: ''
			// }, 1800);
			$innerspan.eq(3).animate({
				width: '80px'
			}, 1000);

			$rightSpan.animate({
				width: '80px',
				left: '230px'

			}, 1000, () => {
				console.log($rightSpan);

				$moveSdiv.each(
					function (i) {
						$(this).css({
							transform: "translateX(0px)",
							transition: "1.5s"
						})
					}
				);
			});


		});
		$spanBox.animate({
			left: '600px',

		}, 2000);




		// $innerSpan.eq(14).animate({
		// 	left: ''
		// }, 1000);
		// $innerSpan.eq(15).animate({
		// 	left: '35px'
		// }, 1000);
		// $innerSpan.eq(16).animate({
		// 	left: '50px'
		// }, 1000);
		// $innerSpan.eq(17).animate({
		// 	left: '80px'
		// }, 1000);
		// $innerspan.eq(4).css({
		// 	left: '90px'
		// });





	})();
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
	})();

	// ios
	(() => {
		const $ios = $("#ios");
		const $img1 = $(".pre-one>img");
		const $img2 = $(".pre-two>img");
		const $iosword = $("#ios-pretwo");
		const $iosThree = $("#ios-prethree");
		$ios.on("scroll", function () {
			console.log($ios.scrollTop());
			$img1.css("opacity", (1 - $ios.scrollTop() / 2000));

			// $iosPretwo.fadeIn("slow");
			if ($ios.scrollTop() > 1000) {
				$img2.css("opacity", (1 - ($ios.scrollTop() - 1000) / 1333));
				$iosword.css("opacity", (1 - ($ios.scrollTop() - 1800) / 1333));

				// console.log($iosThree);

			}
			if ($ios.scrollTop() > 2200) {
				
				// $iosThree.stop(true, false).slideDown("slow");
				$iosThree.stop(true, false).slideUp(4000,()=>{
					$iosThree.css({display:'block'});
				});
			}
			// if ($ios.scrollTop() > 2000) {
			// 	$iosThree.stop(true, false).slideDown("slow");
			// }
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