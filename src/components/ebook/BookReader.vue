<template>
  <div class="book-reader">
    <div id="reader"></div>
    <div
      class="book-marsk"
      @click="clickEvent($event)"
    ></div>
  </div>
</template>
<script>
//通过引入mixin，解决每次需要访问vuex时，都需要书写computed代码的问题，同时解耦和方便维护
import { bookMixin } from "../../utils/mixin";
import Epub from "epubjs";
import {
  getFontFamily,
  getFontSize,
  saveTheme,
  getTheme,
  getLocation,
} from "../../utils/localStorage";
import { themeList, changeGlobalTheme } from "../../utils/book";

// import {px2rem} from '../../assets/styles/global.scss'
global.ePub = Epub;

export default {
  name: "BookReader",
  mixins: [bookMixin],
  data: function () {
    return {
      startY: 0,
      endY: 0,
      firstTouchY: 0,
      moveValY: 0,
    };
  },
  computed: {
    themeList() {
      return themeList(this);
    },
  },
  methods: {
    // onMouseEnter(e) {
    //   this.mouseState = 1
    //     this.mouseStartTime = e.timeStamp
    //     e.preventDefault()
    //     e.stopPropagation()
    // },
    // onmouseMove(e) {
    //   if (this.mouseState === 1) {
    //     this.mouseState = 2;
    //   } else if (this.mouseState === 2) {
    //     let offsetY = 0;
    //     if (this.firstOffsetY) {
    //       offsetY = e.clientY - this.firstOffsetY;
    //       this.$store.commit("SET_OFFSETY", offsetY);
    //     } else {
    //       this.firstOffsetY = e.clientY;
    //     }
    //   }
    //   e.preventDefault();
    //   e.stopPropagation();
    // },
    // onMouseEnd(e) {
    //   if (this.mouseState === 2) {
    //     this.$store.dispatch("setOffsetY", 0);
    //     this.firstOffsetY = 0;
    //     this.mouseState = 3;
    //   }
    //   this.mouseEndTime = e.timeStamp;
    //   // const time = this.mouseEndTime - this.mouseStartTime;
    //   // if (time < 200) {
    //   //   this.mouseState = 1;
    //   // }
    //   e.preventDefault();
    //   e.stopPropagation();
    // },
    // moving(e) {
    //   if (!this.firstTouchY) {
    //     this.firstTouchY = e.touches[0].clientY;
    //   }
    //   this.moveValY = e.touches[0].clientY - this.firstTouchY;
    //   this.setOffsetY(this.moveValY);
    // },
    // moveEnd() {
    //   this.firstTouchY = 0;
    //   this.setOffsetY(0);
    // },
    prevPage() {
      //上一页
      this.rendition.prev().then(() => {
        this.refreshProgress();
      });
      //翻页自动隐藏菜单
      this.menuVisible ? this.hideTitleAndMenu() : "";
    },
    nextPage() {
      //下一页
      this.rendition.next().then(() => {
        this.refreshProgress();
      });
      this.menuVisible ? this.hideTitleAndMenu() : "";
      //翻页自动隐藏菜单
    },
    toggleTitleMenu() {
      //切换菜单栏的显示与隐藏
      // this.$store.dispatch("setMenuVisible", !this.menuVisible);
      this.setMenuVisible(!this.menuVisible);
      this.setSettingVisible(-1);
      this.setFontFamilyVisible(false);
    },
    hideTitleAndMenu() {
      // this.$store.dispatch("setMenuVisible", false);
      this.setMenuVisible(false);
      this.setSettingVisible(-1);
      this.setFontFamilyVisible(false);
    },
    initTheme() {
      this.themeList.forEach((theme) => {
        this.rendition.themes.register(theme.name, theme.style);
      });

      let defaultTheme = getTheme(this.fileName);
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name;
        saveTheme(this.fileName, defaultTheme);
      }
      this.setDefaultTheme(defaultTheme);
      //设置阅读器主题
      this.rendition.themes.select(defaultTheme);
      //设置阅读器主题
      changeGlobalTheme(
        process.env.VUE_APP_RES_URL +
          "/theme/theme_" +
          this.defaultTheme.toLowerCase() +
          ".css"
      );
    },
    // initGesture() {
    //   //绑定触摸开始时事件
    //   this.rendition.on("touchstart", (event) => {
    //     // event.preventDefault();
    //     event.stopPropagation();
    //     this.touchStartX = event.changedTouches[0].clientX;
    //     this.touchStartTime = event.timeStamp;
    //   });
    //   //绑定触摸结束时间
    //   this.rendition.on("touchend", (event) => {
    //     // event.preventDefault();
    //     event.stopPropagation();
    //     //获取滑动距离和滑动的时间
    //     let offsetX = this.touchStartX - event.changedTouches[0].clientX;
    //     let touchTime = event.timeStamp - this.touchStartTime;
    //     //根据滑动距离和时间判断动作
    //     if (offsetX > 40 && touchTime < 500) {
    //       this.nextPage();
    //     } else if (offsetX < -40 && touchTime < 500) {
    //       this.prevPage();
    //     } else if (touchTime >= 500) {
    //       console.log("滑动时间过长");
    //     } else if (offsetX > -40 && offsetX < 40) {
    //       this.toggleTitleMenu();
    //     }
    //   });
    // },
    clickEvent(event) {
      let screenWidth = window.innerWidth;
      if (event.offsetX < screenWidth * 0.35) {
        this.prevPage();
      } else if (event.offsetX > screenWidth * 0.65) {
        this.nextPage();
      } else {
        this.toggleTitleMenu();
      }
      event.preventDefault();
      event.stopPropagation();
    },
    initFontSize() {
      if (getFontSize(this.fileName)) {
        this.setDefaultFontSize(getFontSize(this.fileName));
        this.currentBook.rendition.themes.fontSize(
          getFontSize(this.fileName) + "px"
        );
      }
    },
    initFontFamily() {
      // 获取localstorage中缓存的字体和字号
      if (getFontFamily(this.fileName)) {
        this.setDefaultFontFamily(getFontFamily(this.fileName));
        this.currentBook.rendition.themes.font(getFontFamily(this.fileName));
      }
    },
    initRendition() {
      let readerEl = document.getElementById("reader");
      //   解析电子书，通过this.rendition储存起来
      this.rendition = this.book.renderTo(readerEl, {
        width: window.innerWidth,
        height: window.innerHeight,
        method: "default", //兼容微信,开启此选项，会造成生成的iframe宽度为0
        // flow:'scrolled',//滚动模式，不能兼容微信客户端，Safari浏览器
      });
      this.rendition.hooks.content.register((contents) => {
        Promise.all([
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
          ),
        ]).then(() => {
          console.log("字体注入完毕", process.env.VUE_APP_RES_URL);
        });
      });
    },
    parseBook() {
      // 获取封面图片
      this.book.loaded.cover.then((cover) => {
        console.log(cover);
        this.book.archive.createUrl(cover).then((url) => {
          this.setCover(url);
        });
      });
      // 获取标题，作者等信息
      this.book.loaded.metadata.then((metadata) => {
        console.log(metadata);
        this.setMetadata(metadata);
      });
      // 获取book目录
      this.book.loaded.navigation.then((nav) => {
        console.log(nav);
        const navItem = (function flatten(arr) {
          return [].concat(...arr.map((v) => [v, ...flatten(v.subitems)]));
        })(nav.toc);
        console.log(navItem);
        function find(item, v = 0) {
          const parent = navItem.filter((it) => it.id === item.parent)[0];
          return !item.parent ? v : parent ? find(parent, ++v) : v;
        }

        navItem.forEach((item) => {
          item.level = find(item);
          item.total = 0;
          item.pagelist = [];
          if (item.href.match(/^(.*)\.html$/)) {
            item.idhref = item.href.match(/^(.*)\.html$/)[1];
          } else if (item.href.match(/^(.*)\.xhtml$/)) {
            item.idhref = item.href.match(/^(.*)\.xhtml$/)[1];
          }
        });
        this.setNavigation(navItem);
      });
    },
    initePub() {
      //本地的nginx服务器地址
      const url =
        process.env.VUE_APP_RES_URL +
        "/epub/" +
        this.$store.state.book.fileName + //这里可以替换为this.fileName
        ".epub";
      console.log(this);
      this.book = new Epub(url);
      console.log(this);
      //设置当前的的电子书对象
      this.setCurrentBook(this.book);
      this.initRendition();

      const location = getLocation(this.fileName);
      // 通过display方法渲染电子书，此时会在DOM中生成iframe
      this.display(location, () => {
        this.initTheme();
        this.initFontFamily();
        this.initFontSize();
        this.refreshProgress();
      });
      // this.initGesture();
      this.parseBook();

      this.book.ready
        .then(() => {
          return this.book.locations.generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          );
        })
        .then(() => {
          this.setBookAvailable(true);
          this.refreshProgress();
        });
      //阅读器渲染毕，可以获取资源文件，contents管理资源,向iiframe注入css文件
    },
  },
  mounted() {
    console.log(this.$route);
    const fileName = this.$route.params.FileName.split("|").join("/");
    this.setFileName(fileName).then(() => {
      this.initePub();
    });
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
@import "../../assets/fonts/daysOne.css";

.book-marsk {
  width: 100%;
  height: 100%;
  background-color: red;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  opacity: 0;
}
</style>
