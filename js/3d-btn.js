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
    $button.on('click', function () {
        $('#form-page').fadeIn();
        $('#banner-container').fadeOut();


    })
    window.onresize = function () {
        styles = $wrap[0].style;
        btncoords = $button[0].getBoundingClientRect();
    }
})();