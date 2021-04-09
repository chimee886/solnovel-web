<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg" v-show="loadingCardVisible">
      <book-loading></book-loading>
    </div>
    <div class="book-card" v-show="bookCardVisible">
      <div class="book-card-wrapper">
        <div class="img-wrapper">
          <img class="img" :src="data.cover" />
        </div>
        <div class="content-wrapper">
          <div class="title">{{ data.title }}</div>
          <div class="author sub-title-medium">{{ data.author }}</div>
          <div class="category">{{ categoryText() }}</div>
        </div>
        <div class="read-btn" @click.stop="showBookDetail">
          {{ $t("home.readNow") }}
        </div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close"></span>
    </div>
  </div>
</template>
<script>
import { storeHomeMixin } from "../../utils/mixin";
import BookLoading from "../../components/common/BookLoading";

export default {
  props: ["data"],
  mixins: [storeHomeMixin],
  components: {
    BookLoading,
  },
  data: function () {
    return {
    };
  },
  methods: {
    close() {
      this.setFlapCardVisible(false);
      this.setLoadingCardVisible(false)
      this.setBookCardVisible(false)
    },
    categoryText() {},
    showBookDetail() {
      console.log('立即阅读')
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";

.flap-card-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 150;
  @include center;
  .flap-card-bg {
    position: relative;
    width: px2rem(116);
    height: px2rem(116);
    background: white;
    border-radius: px2rem(20);
    margin: auto;
    .flap-card {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1500;
      margin: auto;
      width: px2rem(48);
      height: px2rem(48);
      .flap-card-semi-circle {
        width: 100%;
        height: 100%;
        display: flex;
        .flap-card-semi-circle-left {
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          background-color: #ffc666;
          background-repeat: no-repeat;
          background-position: center right;
          border-radius: px2rem(24) 0 0 px2rem(24);
          transform-origin: right;
          backface-visibility: hidden;
        }
        .flap-card-semi-circle-right {
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          background-repeat: no-repeat;
          background-position: center left;
          border-radius: 0 px2rem(24) px2rem(24) 0;
          transform-origin: left;
          backface-visibility: hidden;
        }
      }
    }
  }
  .book-card {
    position: relative;
    width: 65%;
    // height: 70%;
    box-sizing: border-box;
    border-radius: px2rem(15);
    background: white;
    animation: showAnimation 0.3s linear;

    @keyframes showAnimation {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
      }
      70% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    &.animation {
      animation: scale $bookShowTime ease-in both;
      @keyframes scale {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
    .book-card-wrapper {
      width: 100%;
      height: 100%;
      margin-bottom: px2rem(30);
      @include columnTop;
      .img-wrapper {
        width: 100%;
        margin-top: px2rem(20);
        @include center;
        .img {
          width: px2rem(90);
          height: px2rem(130);
        }
      }
      .content-wrapper {
        padding: 0 px2rem(20);
        margin-top: px2rem(20);
        .title {
          color: #333;
          font-weight: bold;
          font-size: px2rem(18);
          line-height: px2rem(20);
          max-height: px2rem(40);
          text-align: center;
          @include ellipsis2(2);
        }
        .author {
          margin-top: px2rem(10);
          text-align: center;
        }
        .category {
          color: #999;
          font-size: px2rem(14);
          margin-top: px2rem(10);
          text-align: center;
        }
      }
      .read-btn {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1100;
        width: 100%;
        border-radius: 0 0 px2rem(15) px2rem(15);
        padding: px2rem(15) 0;
        text-align: center;
        color: white;
        font-size: px2rem(14);
        background: $color-blue;
      }
    }
  }
  .close-btn-wrapper {
    position: absolute;
    left: 0;
    bottom: 5%;
    z-index: 1100;
    width: 100%;
    @include center;
    .icon-close {
      display: inline-block;
      width: px2rem(45);
      height: px2rem(45);
      font-size: px2rem(25);
      color: white;
      background: #333;
      border-radius: 50%;
      @include center;
    }
  }
}
</style>
