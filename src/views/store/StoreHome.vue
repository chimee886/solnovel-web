<template>
  <div class="store-home">
    <search-bar @showFlapCard="showFlapCard"></search-bar>
    <flap-card :data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <div
          class="banner-img"
          :style="{ backgroundImage: `url(${banner})` }"
        ></div>
      </div>
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <recommend :data="recommend"></recommend>
      <featured
        :data="featured"
        :titleText="$t('home.featured')"
        :btnText="$t('home.seeAll')"
      ></featured>
      <div
        class="category-list-wrapper"
        v-for="(item, index) in categoryList"
        :key="index"
      >
        <category-book :data="item"></category-book>
      </div>
      <category :data="categories"></category>
    </scroll>
  </div>
</template>
<script>
import SearchBar from "../../components/home/SearchBar";
import Scroll from "../../components/common/Scroll";
import { storeHomeMixin } from "../../utils/mixin";
import FlapCard from "../../components/home/FlapCard";
import { home } from "../../api/index";
import GuessYouLike from "../../components/home/GuessYouLike";
import Recommend from "../../components/home/Recommend";
import Featured from "../../components/home/Featured";
import CategoryBook from "../../components/home/CategoryBook";
import Category from "../../components/home/Category";

export default {
  mixins: [storeHomeMixin],
  components: {
    SearchBar,
    Scroll,
    FlapCard,
    GuessYouLike,
    Recommend,
    Featured,
    CategoryBook,
    Category,
  },
  data: function () {
    return {
      scrollTop: 94,
      random: [1, 2, 3, 4],
      banner: null,
      guessYouLike: null,
      recommend: undefined,
      featured: undefined,
      categoryList: undefined,
      categories: undefined,
    };
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
    },
    showFlapCard() {
      //   获取随机推荐的图书数据
      home().then((res) => {
        if (res.status === 200 && res.data) {
          let randomIndex = Math.floor(Math.random() * res.data.random.length);
          this.random = res.data.random[randomIndex];
          this.setLoadingCardVisible(false);
          this.setBookCardVisible(true);
        }
      });
    },
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.scrollTop = 52;
      } else {
        this.scrollTop = 94;
      }
      this.$refs.scroll.refresh();
    },
  },
  mounted() {
    //   获取首页的图书数据
    home().then((res) => {
      console.log(res);
      if (res.status === 200 && res.data) {
        this.banner = res.data.banner;
        this.guessYouLike = res.data.guessYouLike;
        this.recommend = res.data.recommend;
        this.featured = res.data.featured;
        this.categoryList = res.data.categoryList;
        this.categories = res.data.categories;
      }
    });
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";

.store-home {
  width: 100%;
  height: 100%;
  background-color: white;
  .banner-wrapper {
    .banner-img {
      width: 100%;
      height: px2rem(150);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
}
.test {
  font-size: px2rem(24);
}
</style>
