<template>
  <div class="ebook-bookmark-icon" :style="style" ref="bookmark"></div>
</template>

<script type="text/ecmascript-6">
import { px2rem } from "@/utils/utils";

export default {
  props: {
    width: Number,
    height: Number,
    color: String,
  },
  computed: {
    style() {
        console.log(8699473483939)
      return {
        borderColor: `${this.color} ${this.color} transparent ${this.color}`,
      };
    },
  },
  methods: {
    refresh() {
        console.log('refresh')
      if (this.height && this.width && this.width > 0 && this.height > 10) {
          console.log('refresh2')
        this.$refs.bookmark.style.borderWidth = `${px2rem(
          this.height - 5
        )}rem ${px2rem(this.width / 2)}rem ${px2rem(5)}rem ${px2rem(
          this.width / 2
        )}rem`;
      }
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global.scss";

.ebook-bookmark-icon {
  width: 0;
  height: 0;
  font-weight: bold;
  line-height: 0;
  border-width: px2rem(50) px2rem(10) px2rem(10) px2rem(10);
  border-style: solid;
  border-color: white white transparent white;
}
</style>
