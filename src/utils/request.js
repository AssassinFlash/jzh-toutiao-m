// 请求模块
import axios from 'axios'
// 数据容器模块
import store from '@/store/index'
// import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'
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
// const refreshTokenReq = axios.create({
//   baseURL: 'http://toutiao.itheima.net'
// })
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
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 响应成功进入这里
  return response
}, function (err) {
  // 响应失败进入这里（任何超过2xx的状态码都会进入这里）
  const status = err.response.status
  if (status === 401) {
    // Token过期
    // 如果容器没有user或者user.token，直接去登录
    // 如果容器有user或者refresh_token，请求获取新的token，更新到容器中，重新发布失败的请求
    const { user } = store.state
    if (!user || user.token) {
      return redirectLogin()
    }
    // } else {
    //   try {
    //     refreshTokenReq({
    //       method: 'PUT',
    //       url: '/v1_0/authorizations'
    //     }).then(data => {
    //     })
    //   } catch (err) {
    //
    //   }
    // }
  } else if (status >= 500) {
    Toast.fail('服务端异常')
  }
  return Promise.reject(err)
})

function redirectLogin () {
  router.replace('/login').then(() => {
    console.log('重新跳转成功')
  })
}

export { request }
