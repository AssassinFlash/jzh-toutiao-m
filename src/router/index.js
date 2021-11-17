import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    // 访问该路由时，先把layout渲染出来，然后把子路由home渲染到layout上边的路由出口
    path: '/',
    component: () => import('@/views/layout/index'),
    children: [
      {
        path: '', // 默认子路由，留空会默认渲染
        name: 'home',
        component: () => import('@/views/home/index')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/index')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/my/index')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/index')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
