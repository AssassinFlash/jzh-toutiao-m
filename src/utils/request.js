// 请求模块
import axios from 'axios'
// 数据容器模块
import store from '@/store/index'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 基础路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // 如果用户已登录，统一给接口设置token信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 处理完之后要把config返回
  return config
}, function (err) {
  return Promise.reject(err)
})
export { request }
