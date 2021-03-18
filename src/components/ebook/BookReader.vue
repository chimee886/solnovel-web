<template>
  <div class="book-reader">
    <div id="reader"></div>
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
} from "../../utils/localStorage";
import { themeList, changeGlobalTheme } from "../../utils/book";

// import {px2rem} from '../../assets/styles/global.scss'
global.ePub = Epub;

export default {
  name: "BookReader",
  mixins: [bookMixin],
  computed: {
    themeList() {
      return themeList(this);
    },
  },
  methods: {
    prevPage() {
      //上一页
      this.rendition.prev();
      //翻页自动隐藏菜单
      this.hideTitleAndMenu();
    },
    nextPage() {
      //下一页
      this.rendition.next();
      //翻页自动隐藏菜单
      this.hideTitleAndMenu();
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
    initePub() {
      //本地的nginx服务器地址
      const url =
        "http://localhost:8010/epub/" +
        this.$store.state.book.fileName + //这里可以替换为this.fileName
        ".epub";

      this.book = new Epub(url);
      //设置当前的的电子书对象
      this.setCurrentBook(this.book);
      let readerEl = document.getElementById("reader");
      //   解析电子书，通过this.rendition储存起来
      this.rendition = this.book.renderTo(readerEl, {
        width: window.innerWidth,
        height: window.innerHeight,
        // method: "default", //兼容微信,开启此选项，会造成生成的iframe宽度为0
      });
      // 通过display方法渲染电子书，此时会在DOM中生成iframe
      this.rendition.display().then(() => {
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

        // 获取localstorage中缓存的字体和字号
        if (getFontFamily(this.fileName)) {
          this.setDefaultFontFamily(getFontFamily(this.fileName));
          this.currentBook.rendition.themes.font(getFontFamily(this.fileName));
        }
        if (getFontSize(this.fileName)) {
          this.setDefaultFontSize(getFontSize(this.fileName));
          this.currentBook.rendition.themes.fontSize(
            getFontSize(this.fileName) + "px"
          );
        }
        // console.log(getFontSize(this.fileName));
      });
      console.log(this.rendition);
      //绑定触摸开始时事件
      this.rendition.on("touchstart", (event) => {
        // event.preventDefault();
        event.stopPropagation();
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
      });
      //绑定触摸结束时间
      this.rendition.on("touchend", (event) => {
        // event.preventDefault();
        event.stopPropagation();
        //获取滑动距离和滑动的时间
        let offsetX = this.touchStartX - event.changedTouches[0].clientX;
        let touchTime = event.timeStamp - this.touchStartTime;

        //根据滑动距离和时间判断动作
        if (offsetX > 40 && touchTime < 500) {
          this.nextPage();
        } else if (offsetX < -40 && touchTime < 500) {
          this.prevPage();
        } else if (touchTime >= 500) {
          console.log("滑动时间过长");
        } else if (offsetX > -40 && offsetX < 40) {
          this.toggleTitleMenu();
        }
      });
      //阅读器渲染毕，可以获取资源文件，contents管理资源,向iiframe注入css文件
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
.test {
  font-family: "Days One";
  font-size: px2rem(30);
}
</style>
