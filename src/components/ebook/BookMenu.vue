<template>
  <div>
    <transition name="slide-up">
      <div
        class="menu-wrapper"
        :class="{ 'hide-box-shadow': !menuVisible || settingVisible >= 0 }"
        v-show="menuVisible"
      >
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <BookSetFont />
  </div>
</template>
<script>
//通过引入mixin，解决每次需要访问vuex时，都需要书写computed代码的问题，同时解耦和方便维护
import { bookMixin } from "../../utils/mixin";
import BookSetFont from "./BookSetFont";

export default {
  mixins: [bookMixin],
  methods: {
    showSetting(x) {
      this.settingVisible === 0
        ? this.setSettingVisible(-1)
        : this.setSettingVisible(x);
    },
  },
  components: {
    BookSetFont,
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
@import "../../assets/fonts/daysOne.css";
.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 102;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  font-size: px2rem(20);
  &.hide-box-shadow {
    box-shadow: none;
  }
  .icon-wrapper {
    flex: 1;
    @include center;
    .icon-progress {
      font-size: px2rem(28);
    }
    .icon-bright {
      font-size: px2rem(24);
    }
  }
}
</style>
