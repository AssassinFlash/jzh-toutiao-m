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
export { login, sendSms }
