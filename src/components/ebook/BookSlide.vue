<template>
  <transition name="fade">
    <div
      class="slide-content-wrapper"
      v-show="settingVisible === 3 || settingVisible === 4"
    >
      <transition name="slide-right">
        <div
          class="content"
          v-if="settingVisible === 3 || settingVisible === 4"
        >
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
              <component :is="tab === 1 ? content : bookmark"></component>
            </div>
            <div class="content-page-tab">
              <div
                class="content-page-tab-item"
                :class="{ selected: tab === 1 }"
                @click="selectTab(1)"
              >
                {{ $t("book.navigation") }}
              </div>
              <div
                class="content-page-tab-item"
                :class="{ selected: tab === 2 }"
                @click="selectTab(2)"
              >
                {{ $t("book.bookmark") }}
              </div>
            </div>
          </div>
          <div v-else class="content-empty">
            <BookLoading />
          </div>
        </div>
      </transition>
      <div
        class="content-bg"
        v-if="settingVisible === 3 || settingVisible === 4"
        @click="hideMenuVisible()"
      ></div>
    </div>
  </transition>
</template>
<script>
import { bookMixin } from "../../utils/mixin";
import BookSlideContent from "./BookSlideContent";
import BookSlideBookmark from "./BookSlideBookmark";
import BookLoading from "../common/BookLoading";

export default {
  name: "bookSlide",
  mixins: [bookMixin],
  components: {
    BookLoading,
  },
  data: function () {
    return {
      tab: 1,
      content: BookSlideContent,
      bookmark: BookSlideBookmark,
    };
  },
  methods: {
    selectTab(x) {
      this.tab = x;
    },
    hideMenuVisible() {
      //   this.setMenuVisible(false);
      this.setSettingVisible(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";

.slide-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 350;
  display: flex;
  width: 100%;
  height: 100%;
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        display: flex;
        flex: 0 0 px2rem(48);
        .content-page-tab-item {
          flex: 1;
          font-size: px2rem(12);
          @include center;
        }
      }
    }
    .content-empty {
        width: 100%;
        height: 100%;
    }
  }
  .content-bg {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
}
</style>
