<template>
  <div class="home">
    {{ msg }}
    <input placeholder="单价" v-model="price" type="number" />
    <button @click="setPrice">改变单价</button><br>
    <div>当前的单价是{{$store.state._price._price}}元/斤</div>
    <input placeholder="数量" v-model="count" type="number" />
    <button @click="sum">计算总价</button>
    <div class="result">计算结果为：{{ result }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapGetters} from 'vuex'

export default {
  name: "Home",
  data: function () {
    return {
      result: 0,
      price: 0,
      count:0,
      msg: "jjjjjj",
    };
  },
  methods: {
    sum: function () {
      return (this.result = Number(this._price) * Number(this.count))
    },
    setPrice(){
      this.$store.dispatch('setPrice',Number(this.price)).then(()=>console.log('actions调用完了'))
    }
  },
  computed:{
    ...mapGetters(['_price'])
  }
};
</script>
<style lang="scss" scoped>
@import '../assets/styles/global.scss';
.result{
  font-size: px2rem(12);
}
</style>
