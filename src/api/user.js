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
// 获取用户资料
const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
// 编辑用户资料
const updateUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
// 修改用户头像
const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
// 获取用户频道列表
const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
// 关注用户
const addFollow = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 取消关注用户
const cancelFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
export {
  login,
  sendSms,
  getCurrentUser,
  getUserChannels,
  addFollow,
  cancelFollow,
  getUserProfile,
  updateUserProfile,
  updateUserPhoto
}
