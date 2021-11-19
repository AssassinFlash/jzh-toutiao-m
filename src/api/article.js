// 文章相关请求模块
import { request } from '@/utils/request'

// 获取文章列表
const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
// 获取文章详情
const getArticleContent = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
// 收藏文章
const collectArticle = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
// 取消文章收藏
const cancelCollectArticle = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
// 点赞文章
const likeArticle = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}
// 取消点赞文章
const cancelLikeArticle = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
// 获取文章评论或者获取评论回复
const getComments = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
// 对文章评论或回复进行点赞
const likeComment = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消点赞
const cancelLikeComment = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}
// 对文章发布评论
const postComment = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
export {
  getArticles,
  getArticleContent,
  collectArticle,
  cancelCollectArticle,
  likeArticle,
  cancelLikeArticle,
  getComments,
  likeComment,
  cancelLikeComment,
  postComment
}
