// 请求模块
import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 基础路径
})
export { request }
