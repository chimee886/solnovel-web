<template>
  <div class="book" ref="book">
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
  watch: {
    offsetY(val) {
      this.move(val);
    },
  },
  methods: {
    move(val) {
      this.$refs.book.style.transition = "";
      if (val > 0) {
        this.$refs.book.style.top = val + "px";
      } else if (val === 0) {
        this.$refs.book.style.top = 0;
        this.$refs.book.style.transition = "all .2s linear";
      }
    },
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName);
      if (!readTime) {
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
.book {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
