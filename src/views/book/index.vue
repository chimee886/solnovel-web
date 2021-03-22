<template>
  <div>
    <BookTitle />
    <BookReader />
    <BookMenu />
    <BbookSettingTheme />
  </div>
</template>

<script>
import BookReader from "../../components/ebook/BookReader";
import BookTitle from "../../components/ebook/BookTitle";
import BookMenu from "../../components/ebook/BookMenu";
import BbookSettingTheme from "../../components/ebook/BbookSettingTheme";
import { getReadTime, saveReadTime } from "../../utils/localStorage";
import { bookMixin } from "../../utils/mixin";
export default {
  components: {
    BookReader,
    BookTitle,
    BookMenu,
    BbookSettingTheme,
  },
  mixins: [bookMixin],
  methods: {
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName);
      if (!readTime) {
        console.log("初次阅读");
        readTime = 0;
      }
      this.readTimeTask = setInterval(() => {
        readTime++;
        // 每隔30s储存一次
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime);
        }
      }, 1000);
    },
  },
  mounted() {
    this.startLoopReadTime();
  },
  beforeDestroy() {
    clearInterval(this.readTimeTask);
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
</style>
