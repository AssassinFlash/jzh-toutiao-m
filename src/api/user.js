// 用户相关的请求模块
import { request } from '@/utils/request'

// 登录注册
const login = (user) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: user
  })
}
// 发送短信验证码
const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户个人信息
const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}
// 获取用户频道列表
const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
export { login, sendSms, getCurrentUser, getUserChannels }
