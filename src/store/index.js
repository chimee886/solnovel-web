import Vue from 'vue'
import Vuex from 'vuex'
import _price from './modules/price'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        _price
    },
    getters
})