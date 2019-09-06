import Vue from 'vue'
import Vuex from 'vuex'
import Products from './modules/products.js'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        Products
    },
    strict: debug
})
