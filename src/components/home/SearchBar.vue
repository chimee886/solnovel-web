<template>
  <div>
    <div class="search-bar-wrapper" :class="{ 'hide-title': !titleVisible }">
      <div
        class="title-search-wrapper"
        :class="{ 'hide-title': !titleVisible }"
      >
        <transition name="title">
          <div class="title-search-page-wrapper" v-show="titleVisible">
            <span class="title-text">{{ $t("home.title") }}</span>
            <div class="icon-shake-wrapper" @click="showFlapCard">
              <span class="icon-shake icon"></span>
            </div>
          </div>
        </transition>
        <div
          class="icon-back-wrapper"
          :class="{ 'show-search': !titleVisible }"
        >
          <span class="icon-back icon" @click="hideHotSearchList"></span>
        </div>
        <div
          class="search-wrapper"
          ref="searchWrapper"
          :style="{ top: px2rem(top) }"
        >
          <div class="search-back-wrapper">
            <span class="icon-back icon"></span>
          </div>
          <div class="search-bg" :class="{ 'title-hide': !titleVisible }">
            <span class="icon-search icon"></span>
            <input
              type="text"
              class="search"
              :placeholder="$t('home.hint')"
              v-model="searchText"
              v-on:click="showHotSearchList"
              @keyup.enter="search"
            />
          </div>
        </div>
      </div>
    </div>
    <hot-search-list v-if="hotSearchListVisible"></hot-search-list>
  </div>
</template>
<script>
import { storeHomeMixin } from "../../utils/mixin";
import { px2rem } from "../../utils/utils";
import HotSearchList from "./HotSearchList";
export default {
  mixins: [storeHomeMixin],
  components: { HotSearchList },
  data: function () {
    return {
      searchText: "",
      titleVisible: true,
      top: 42,
      hotSearchListVisible: false,
    };
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.hideTitle();
      } else {
        this.showTitle();
      }
    },
  },
  methods: {
    showFlapCard() {
      this.setFlapCardVisible(true);
      this.setLoadingCardVisible(true);
      this.setBookCardVisible(false);
      this.$emit("showFlapCard");
    },
    hideHotSearchList() {
      if (this.hotSearchListVisible) {
        this.hotSearchListVisible = false;
        this.titleVisible = true;
        this.top = 42;
      } else {
        // 返回书架页面
        this.$router.push("/store/shelf");
      }
    },
    showHotSearchList() {
      this.hotSearchListVisible = true;
      this.titleVisible = false;
      this.top = 0;
    },
    hideTitle() {
      this.titleVisible = false;
      this.top = 0;
    },
    showTitle() {
      this.titleVisible = true;
      this.top = 42;
    },
    px2rem(x) {
      return px2rem(x);
    },
    search() {
      console.log(this.searchText);
      this.$router.push({
        path: "/store/list",
        query: {
          keyword: this.searchText,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";
.search-bar-wrapper {
  .title-search-wrapper {
    position: relative;
    z-index: 110;
    width: 100%;
    height: px2rem(94);
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.1);
    &.hide-title {
      height: px2rem(52);
    }
    &.show-search {
      height: px2rem(52);
    }
    &.hide-shadow {
      box-shadow: none;
    }
    .title-search-page-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 105;
      width: 100%;
      height: px2rem(42);
      @include center;
      .title-text {
        font-weight: bold;
      }
      .icon-shake-wrapper {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 110;
        padding-right: px2rem(15);
        height: 100%;
        @include center;
      }
    }
    .icon-back-wrapper {
      position: absolute;
      left: px2rem(15);
      top: 0;
      z-index: 110;
      height: px2rem(42);
      @include center;
      transition: all $homeAnimationTime linear;
      &.show-search {
        height: px2rem(52);
      }
    }
    .search-wrapper {
      position: absolute;
      top: px2rem(42);
      left: 0;
      z-index: 100;
      display: flex;
      padding: px2rem(10);
      width: 100%;
      box-sizing: border-box;
      transition: all $homeAnimationTime linear;
      &.show-search {
        top: 0;
      }
      .search-back-wrapper {
        flex: 0;
        width: 0;
        @include center;
        transition: all $homeAnimationTime linear;
        visibility: hidden;
        &.show-search {
          margin-right: px2rem(10);
          flex: 0 0 px2rem(20);
          width: px2rem(20);
        }
        .icon-back {
          font-size: 0;
          &.show-search {
            font-size: px2rem(20);
          }
        }
      }
      .search-bg {
        flex: 1;
        background: #f4f4f4;
        border-radius: px2rem(20);
        border: px2rem(1) solid #eee;
        box-sizing: border-box;
        padding: px2rem(5) px2rem(15);
        transition: all $homeAnimationTime linear;
        @include left;
        &.title-hide {
          margin-left: px2rem(30);
        }
        .icon-search {
          font-size: px2rem(16);
          color: #999;
        }
        .search {
          color: #666;
          width: 100%;
          height: px2rem(22);
          background: transparent;
          font-size: px2rem(12);
          margin-left: px2rem(10);
          border: none;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
      }
    }
  }
  &.hide-title {
    height: px2rem(52);
  }
}
</style>
