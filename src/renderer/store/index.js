import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import admin from './modules/admin'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: { admin },
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  //strict: process.env.NODE_ENV !== 'production'
})
