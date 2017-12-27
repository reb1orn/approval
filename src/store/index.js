/**
 * Created by LangK on 2016/12/20.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './state'


Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions
})



export default store
