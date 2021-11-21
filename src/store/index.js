import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem, removeItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'
export default new Vuex.Store({
  state: {
    // 当前登录用户的登录状态（Token）
    user: getItem(USER_KEY),
    // 缓存页面
    cachePages: ['LayoutIndex']
  },
  // 修改容器中的state（使用mutation）
  mutations: {
    // 参数1默认是state对象，参数2是自定义参数payload
    setUser (state, payload) {
      state.user = payload
      // 为了防止页面刷新数据消失，还需要把数据放到本地存储中
      // 注意对象不能存进本地存储中，要字符串
      setItem(USER_KEY, state.user)
    },
    removeUser (state) {
      state.user = null
      removeItem(USER_KEY)
    },
    // 添加缓存页
    addCachePage (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 移除缓存页
    removeCachePage (state, pageName) {
      if (state.cachePages.includes(pageName)) {
        state.cachePages.splice(state.cachePages.indexOf(pageName), 1)
      }
    }
  },
  actions: {},
  modules: {}
})
