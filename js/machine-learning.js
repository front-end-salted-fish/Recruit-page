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



