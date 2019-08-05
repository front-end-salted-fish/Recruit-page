//backstage
(() => {
    let that;
    class backstage {
      constructor() {
        that = this;
        this.$backstage = $("#back-stage");
        this.$content = $(".bcak-stage-content");
        this.$sections = $("#back-stage section");
        this.$pageName = $(".page-name");
        this.$contents = $(".bcak-stage-content p");
        this.$writebox = $("#detail-pages #back-stage .per-two .write-box");
        console.log(this.$pageName);
      }
      //初始化
      init() {
        //给backstage注册事件
        this.$backstage.on("scroll", this.scroll);
      }
      //监听滚动距离
      scroll() {
        let scrollTop = that.$backstage.scrollTop();
        that.fadeout(that.$sections[0], scrollTop);
        that.fadeout(that.$pageName[0], scrollTop);
        console.log(scrollTop);
        if (scrollTop >= 240) {
          that.objmove();
        }
      }
      //使元素淡出
      fadeout(obj,scrollTop) {
        obj.style.opacity = 1.6 - (scrollTop / $(window).height());
      }
      //元素移动
      objmove() {
        this.$content.num = 0;
        that.$content.timer = null;
        that.$content.timer = () => {
          setTimeout(() => {
            console.log("num" + that.$content.num);
            console.log($(that.$contents[that.$content.num]));
            that.fontin($(that.$contents[that.$content.num]), that.$content.num);
            if (that.$content.num <= 7) {
              that.$content.num++;
              that.$content.timer();		
            }else {
              that.$writebox.show(1000);	
              return false;
            }
          }, 800)
        }
        that.$content.timer();
      }
      //显示
      fontin(obj, num) {
        if (((num) % 2) == 0) {
          obj.animate({
            left: (750 - obj.width()) / 2,
            top: num * 55
          }, 1000);
        } else if (num > 0) {
          obj.animate({
            right: (750 - obj.width()) / 2,
            top: num * 55
          }, 1000);
        }
      }
      //隐藏
      fontout(obj, num) {
        if (((num) % 2) == 0) {
          obj.animate({
            left: -750,
            top: -55
          }, 1000);
        } else {
          obj.animate({
            right: -750,
            top: -55
          }, 1000);
        }
      }
    }
    let newBackstage = new backstage();
    newBackstage.init();
  })();