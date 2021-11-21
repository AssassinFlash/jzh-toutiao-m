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
        component: () => import('@/views/video/index')
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
  },
  {
    path: '/article/:articleId', // 动态路由，将id作为路由参数
    name: 'article',
    component: () => import('@/views/article/index'),
    props: true // 开启props传参，会将路由参数作为props传到组件
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('@/views/userProfile/index')
  },
  {
    path: '/user/chat',
    name: 'userChat',
    component: () => import('@/views/userChat/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
