// 开机动画
(() => {
  let that;
  class startAnimate {
    constructor() {
      that = this;
      // 获取第一行
      this.$rowOne = $("#loading-module #loading-box .row-one");
      // 获取第二行
      this.$rowTwo = $("#loading-module #loading-box .row-two");
      // 获取第三行
      this.$rowThree = $("#loading-module #loading-box .row-three");
      // 获取第四行
      this.$rowForth = $("#loading-module #loading-box .row-forth");
    }
    init() {
      console.log(this.$rowOne);
      //第一行
      this.resetStye(this.$rowOne,"row-one-first-change","row-one-second-change",0);
      //第二行
      this.resetStye(this.$rowTwo,"row-two-first-change","row-two-second-change",400);
      //第三行
      this.resetStye(this.$rowThree,"row-three-first-change","row-three-second-change",800);
      //第四行
      this.resetStye(this.$rowForth,"row-forth-first-change","row-forth-second-change",1200);	
    }
    resetStye(obj,change1,change2,time) {
      console.log("类名被改了")
      setTimeout(function() {
        obj.addClass(change1);
        setTimeout(function() {
          obj.addClass(change2);
          
        },800);
      },time)
    }
  }
  let newStartAnimate = new startAnimate();
  newStartAnimate.init();
})();