// 搜索请求相关模块
import { request } from '@/utils/request'

// 获取搜索联想建议
const getSearchSuggestions = (q) => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
const getSearchResults = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}

export { getSearchSuggestions, getSearchResults }
