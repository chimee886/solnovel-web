<template>
<div>
  <BookTitle/>
  <BookReader/>
  <BookMenu/>
</div>
</template>

<script>
import BookReader from '../../components/ebook/BookReader';
import BookTitle from '../../components/ebook/BookTitle';
import BookMenu from '../../components/ebook/BookMenu'
export default {
  components: {
    BookReader,
    BookTitle,
    BookMenu
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
</style>
