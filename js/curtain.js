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