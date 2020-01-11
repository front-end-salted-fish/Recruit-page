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