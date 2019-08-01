$(function() {
	console.log('Welcome to TopView!');
	// 旋转菜单模块
	!(() => {
		const $home = $('#home');
		const $imgs = $('#menu-list img');
		let c = 130;
		let flag = true;
		$imgs.on('click', function() {
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
			$(this).off("transitionend",end);
		}
		//根据第三边和角度换算出坐标
		//角度转弧度   角度*π/180 =弧度
		const getPoint = (c,deg) => {
			let a = Math.round(Math.sin(deg*Math.PI/180)*c);
			let b = Math.round(Math.cos(deg*Math.PI/180)*c);
			return {x:a,y:b};
		}
		$home.on('click', function() {
			if(flag){
				this.style.transform = "scale(1) rotate(-720deg)";
				for(let i = 0;i< $imgs.length;i++){
					$imgs.eq(i).css({
						transform: "scale(1) rotate(-720deg)",
						transition: ".5s "+(i*0.1)+"s ",
						left: -getPoint(c, i*90/($imgs.length-1)).x+"px",
						top: -getPoint(c, i*90/($imgs.length-1)).y+"px"
					});
				}
			}else{
				this.style.transform = "scale(1) rotate(0) ";	
				for(let i = 0;i< $imgs.length;i++){
					$imgs.eq(i).css({
						transform: "scale(1) rotate(0)",
						transition: ".5s "+(($imgs.length-1-i)*0.1)+"s ",
						left: 0,
						top: 0
					});
				}
			}
			flag=!flag;
		})
	})()
	// 伦哥模块
	!(() => {
		// 获取页面元素
		const $android = $('#android');
		const $fontBg = $('.font-bg');
		const $persOne = $('.pers-one');
		// 监听滚动条事件
		$android.on('scroll', function() {
			// console.log($persOne.get(0).clientHeight)
			// console.log(this.scrollTop)
			let scale = this.scrollTop/$persOne.get(0).clientHeight - 1;
			console.log(scale)
			if (scale > 0) {
				$fontBg.css({
					opacity: 1-scale
				});
			}
		})
	})()
})