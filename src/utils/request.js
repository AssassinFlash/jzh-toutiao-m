// 请求模块
import axios from 'axios'
// 数据容器模块
import store from '@/store/index'
// import JSONbig from 'json-bigint'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 基础路径
  // transformResponse: [function (data) {
  //   // 后端返回的可能不是JSON格式字符串
  //   // 如果不是，JSONbig.parse调用就会报错
  //   // 使用try-catch捕获异常
  //   try {
  //     // 转换成功把结果返回
  //     return JSONbig.parse(data)
  //   } catch (err) {
  //     console.log('转换失败', err)
  //     return data
  //   }
  //   // axios 默认在内部使用JSON.parse来转换处理原始数据
  //   // return JSON.parse(data)
  // }]
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
