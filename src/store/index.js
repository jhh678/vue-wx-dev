/*
 * @File: file describe 
 * @Author: jhh678 
 * @Date: 2018-11-23 16:56:57 
 * @Last Modified by:   jhh678 
 * @Last Modified time: 2018-11-23 16:56:57 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

// modules
// import activities from './modules/activities'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters,
  actions,
  mutations: mutations,
  modules: {}
})
