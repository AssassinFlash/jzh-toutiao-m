import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'

// 自动设置REM基准值
import 'amfe-flexible'

// 引入全局样式(放到最后，覆盖第三方样式)
import '@/style/index.less'

// 全局注册vant中的组件
Vue.use(Vant)

Vue.config.productionTip = false

// 创建vue根实例，将router、store配置到根实例中
// 把APP根组件渲染到#app节点中
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
