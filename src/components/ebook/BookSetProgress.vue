<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible == 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{ getReadTimeText() }}</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper">
            <span class="icon-back" @click="prevSection()"></span>
          </div>
          <input
            class="progress"
            type="range"
            max="100"
            min="0"
            step="1"
            @change="onProgressChange($event.target.value)"
            @input="onProgressInput($event.target.value)"
            :value="progress"
            :disabled="!bookAvailable"
            :style="{ 'background-size': `${progress}% 100% !important` }"
            ref="progress"
          />
          <div class="progress-icon-wrapper" @click="nextSection()">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{ getSectionName }}</span>
          <span>({{ bookAvailable ? progress + "%" : "加载中..." }})</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { bookMixin } from "../../utils/mixin";
import { getReadTime } from "../../utils/localStorage";

export default {
  name: "BookSetProgress",
  mixins: [bookMixin],
  computed: {
    getSectionName() {
      //   if (this.section) {
      //     const sectionInfo = this.currentBook.section(this.section);
      //     if (
      //       sectionInfo &&
      //       sectionInfo.href &&
      //       this.currentBook &&
      //       this.currentBook.navigation
      //     ) {
      //       console.log(this.currentBook.navigation.get(sectionInfo.href).label);
      //       return this.currentBook.navigation.get(sectionInfo.href).label;
      //     }
      //   }
      //   return "";
      return this.section ? this.navigation[this.section].label : "";
    },
  },
  methods: {
    getReadTime() {},
    onProgressChange(progress) {
      console.log(progress);
      this.setProgress(progress).then(() => {
        this.displayProgress();
      });
    },
    displayProgress() {
      //通过epbjs的cfi分页
      const cfi = this.currentBook.locations.cfiFromPercentage(
        this.progress / 100
      );
      this.display(cfi);
    },
    onProgressInput(progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress();
      });
    },
    nextSection() {
      // 下一章
      if (
        this.section < this.currentBook.spine.length - 1 &&
        this.bookAvailable
      ) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection();
        });
      }
    },
    prevSection() {
      // 上一章
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection();
        });
      }
    },
    displaySection() {
      let sectionInfo = this.currentBook.section(this.section);
      if (sectionInfo && sectionInfo.href) {
        this.display(sectionInfo.href);
      }
    },
    getReadTimeText() {
      return this.$t("book.haveRead").replace(
        "$1",
        this.getReadTimeByMinutes()
      );
    },
    getReadTimeByMinutes() {
      let time = getReadTime(this.fileName) / 60;
      if (!time) {
        return 0;
      } else {
        return Math.ceil(time);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 101;
  width: 100%;
  height: px2rem(90);
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);

  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(30);
      box-sizing: border-box;
      .progress {
        width: 100%;
        -webkit-appearance: none;
        height: px2rem(2);
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: white;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
          border: px2rem(1) solid #ddd;
        }
      }
      .progress-icon-wrapper {
        flex: 0 0 px2rem(22);
        font-size: px2rem(22);
        @include center;
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(10);
      width: 100%;
      color: #333;
      font-size: px2rem(12);
      text-align: center;
      padding: 0 px2rem(20);
      box-sizing: border-box;
      @include center;
      .progress-section-text {
        @include ellipsis;
      }
    }
    .read-time-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: px2rem(40);
      @include center;
      font-size: px2rem(12);
    }
  }
}
</style>
