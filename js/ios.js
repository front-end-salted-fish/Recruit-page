// ios
(() => {
    const $ios = $("#ios");
    const $img1 = $(".pre-one");
    const $img2 = $(".pre-two");
    const $iosword = $("#ios-pretwo");
    const $iosThree = $("#ios-prethree");
    $ios.on("scroll", function () {
        console.log($ios.scrollTop());
        $img1.css("opacity", (1 - $ios.scrollTop() / 2000));

        // $iosPretwo.fadeIn("slow");
        if ($ios.scrollTop() > 2400) {
            $img2.css("opacity", (1 - ($ios.scrollTop() - 2400) / 900));
            console.log($img2);
            
            // $iosword.css("opacity", (1 - ($ios.scrollTop() - 2400) / 900));

            // console.log($iosThree);

        }
        // if ($ios.scrollTop() > 2200) {
            
        //  // $iosThree.stop(true, false).slideDown("slow");
        //  $iosThree.stop(true, false).slideUp(4000,()=>{
        //      $iosThree.css({display:'block'});
        //  });
        // }
        // if ($ios.scrollTop() > 2000) {
        //  $iosThree.stop(true, false).slideDown("slow");
        // }
    });
})();