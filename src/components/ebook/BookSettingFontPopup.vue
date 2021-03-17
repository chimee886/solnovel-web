<template>
  <transition name="popup-slide-up">
    <div @click="handle" class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hideFontFamilySetting">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">选择语言</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div
          class="ebook-popup-item"
          v-for="(item, index) in fontFamily"
          :key="index"
          @click="setFontFamily(item.font)"
        >
          <div
            class="ebook-popup-item-text"
            :class="{ selected: isSelected(item.font) }"
          >
            {{ item.font }}
          </div>
          <div class="ebook-popup-item-check" v-show="isSelected(item.font)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { bookMixin } from "../../utils/mixin";
import { FONT_FAMILY } from "../../utils/book";

export default {
  name: "BookSettingFontPopup",
  mixins: [bookMixin],
  data: function () {
    return {
      fontFamily: FONT_FAMILY,
    };
  },
  methods: {
    hideFontFamilySetting() {
      this.setFontFamilyVisible(false);
    },
    setFontFamily(font) {
      this.setDefaultFontFamily(font);
      this.currentBook.rendition.themes.font(font);
    },
    isSelected(font) {
      return this.defaultFontFamily === font;
    },
    handle() {
      console.log(this.fontFamily);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.ebook-popup-list {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 300;
  background: white;
  font-size: px2rem(16);
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.1);
  .ebook-popup-title {
    position: relative;
    padding: px2rem(14) px2rem(10);
    font-size: px2rem(14);
    font-weight: bold;
    border-bottom: 1px solid #e0e0e0;
    .ebook-popup-title-icon {
      position: absolute;
      @include center;
      left: px2rem(10);
      padding: 0 px2rem(6);
      font-size: px2rem(14);
      .icon-down2{
          font-size: px2rem(16);
          font-weight: bold;
      }
    }
    .ebook-popup-title-text {
      @include center;
      text-align: center;
    }
  }
  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      display: flex;
      padding: px2rem(14) px2rem(16);
      .ebook-popup-item-text {
          align-items: center;
          font-size: px2rem(16);
        flex: 1;
        @include left;
        &.selected{
            color: #346cb9;
        }
      }
      .ebook-popup-item-check {
        flex: 1;
        text-align: right;
        .icon-check {
            font-size: px2rem(15);
            font-weight: bold;
            color: #346cb9;
          }
      }
    }
  }
}
</style>
