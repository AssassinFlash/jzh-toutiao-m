// 频道相关请求模块
import { request } from '@/utils/request'

// 获取所有频道列表
const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
// 设置频道列表
// 对收到的用户频道新增的保存，原有的覆盖顺序序号
const addUserChannels = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data
  })
}
// 删除指定频道
const deleteUserChannels = (channelId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
export { getAllChannels, addUserChannels, deleteUserChannels }
