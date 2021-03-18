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
export default {
  components: {
    BookReader,
    BookTitle,
    BookMenu,
    BbookSettingTheme,
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
</style>
