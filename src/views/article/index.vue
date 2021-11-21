<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar" title="文章详情" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 内容 -->
    <div class="article-wrap">
      <h1>{{ article.title }}</h1>
      <van-cell center class="user-info">
        <template #icon>
          <van-image class="avatar" fit="cover" round :src="article.aut_photo"></van-image>
        </template>
        <template #title>
          <div class="name">{{ article.aut_name }}</div>
        </template>
        <template #label>
          <div class="pubdate">{{ handleTime(article.pubdate) }}</div>
        </template>
        <template #default>
          <van-button
            :icon="article.is_followed ? '' : 'plus' "
            class="follow-btn"
            round
            :loading="isFollowLoading"
            size="small"
            :type="article.is_followed? 'default' : 'info'"
            @click="onFollow"
          >
            {{ article.is_followed ? '已关注' : '关注' }}
          </van-button>
        </template>
      </van-cell>
      <!-- 文章正文 -->
      <div class="markdown-body" v-html="article.content">
      </div>
      <!-- 评论区域 -->
      <CommentList :source="articleId"></CommentList>
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow=true"
      >
        写评论
      </van-button>
      <van-icon name="comment-o" :badge="totalCommentCount" color="#777"></van-icon>
      <van-icon
        :name="article.is_collected ? 'star' : 'star-o'"
        :color="article.is_collected? 'orange' : '#777'"
        @click="onCollect"
      >
      </van-icon>
      <van-icon
        :name="article.attitude === 1 ? 'good-job' :'good-job-o'"
        :color="article.attitude === 1 ? 'red' : '#777'"
        @click="onLike"
      >
      </van-icon>
      <van-icon name="share" color="#777"></van-icon>
    </div>
    <!-- 发布评论弹出层 -->
    <van-popup v-model="isPostShow" position="bottom" round>
      <PostComment :target="articleId"/>
    </van-popup>
    <!-- 评论回复弹出层 -->
    <van-popup v-model="isReplyShow" position="bottom" round>
      <CommentReply :comment="replyComment" :articleId="articleId"/>
    </van-popup>
  </div>
</template>
<script>
import './github-markdown.css'
import {
  getArticleContent,
  collectArticle,
  cancelCollectArticle,
  likeArticle,
  cancelLikeArticle
} from '@/api/article'
import { dayjs } from '@/utils/dayjs'
import { addFollow, cancelFollow } from '@/api/user'
import { Toast } from 'vant'
import CommentList from './components/comment-list'
import PostComment from './components/post-comment'
import CommentReply from './components/comment-reply'
import { eventBus } from '@/utils/eventBus'
// 在组件中获取动态路由参数
// 方式1：this.$route.params
// 方式2：路由开启props，在组件中声明props接收
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {
    CommentList,
    PostComment,
    CommentReply
  },
  data () {
    return {
      article: {}, // 文章数据对象
      isFollowLoading: false, // 关注按钮的loading状态
      isCollectLoading: false, // 收藏图标的loading状态
      isLikeLoading: false, // 点赞图标的loading状态
      isPostShow: false, // 发布评论弹出层的显示
      totalCommentCount: 0, // 评论总数
      isReplyShow: false, // 对评论进行回复的弹出层的显示
      replyComment: {} // 评论回复对象
    }
  },
  methods: {
    async loadContent () {
      const { data } = await getArticleContent(this.articleId)
      this.article = data.data
      this.totalCommentCount = this.article.comm_count
    },
    // 处理相对时间
    handleTime (time) {
      return dayjs(time).from(dayjs())
    },
    // 处理关注
    async onFollow () {
      // 已关注，取消关注
      // 未关注，添加关注
      this.isFollowLoading = true
      // const userId = this.article.aut_id.toString()
      if (!this.article.is_followed) {
        await addFollow(this.article.aut_id)
      } else {
        await cancelFollow(this.article.aut_id)
      }
      // 更新视图
      this.isFollowLoading = false
      this.article.is_followed = !this.article.is_followed
    },
    // 处理收藏
    async onCollect () {
      // 已收藏，取消收藏
      // 未收藏，添加收藏
      this.isCollectLoading = true
      Toast.loading({
        message: '正在操作...',
        forbidClick: true // 禁止背景点击
      })
      if (!this.article.is_collected) {
        await collectArticle(this.articleId)
        Toast.success('收藏成功')
      } else {
        await cancelCollectArticle(this.articleId)
        Toast({
          message: '取消收藏'
        })
      }
      // 更新视图
      this.isCollectLoading = false
      this.article.is_collected = !this.article.is_collected
    },
    // 处理点赞
    async onLike () {
      // 已点赞，取消点赞
      // 未点赞，点赞文章
      this.isLikeLoading = true
      Toast.loading({
        message: '正在操作...',
        forbidClick: true
      })
      if (this.article.attitude === 1) {
        await cancelLikeArticle(this.articleId)
        this.article.attitude = -1
        Toast({
          message: '取消点赞'
        })
      } else {
        await likeArticle(this.articleId)
        this.article.attitude = 1
        Toast.success('点赞成功')
      }
    }
  },
  mounted () {
    this.loadContent()
    eventBus.on('postSuccess', () => {
      // 文章监听到发布评论成功的事件
      // 关闭评论弹出层
      this.isPostShow = false
      ++this.totalCommentCount
    })
    eventBus.on('replyShow', (comment) => {
      // 监听到回复按钮被点击的事件
      this.isReplyShow = true
      // 拿到被点击的那个评论
      this.replyComment = comment
    })
    eventBus.on('closeReply', () => {
      this.isReplyShow = false
    })
  }
}
</script>

<style lang="less" scoped>
.article-container {
  h1 {
    font-size: 20px;
    color: #3a3a3a;
    padding: 10px 14px;
    margin: 0;
    background: #fff;
  }

  .user-info {
    .name {
      font-size: 12px;
      color: #333333;
    }

    .pubdate {
      font-size: 11px;
      color: #b4b4b4;
    }

    .avatar {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }

    .follow-btn {
      width: 85px;
      height: 30px;
    }
  }

  .article-wrap {
    background: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;

    .markdown-body {
      padding: 14px;
    }
  }

  .article-bottom {
    padding: 0 14px;
    height: 45px;
    background: #fff;
    border-top: 1px solid #ccc;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .comment-btn {
      width: 150px;
      font-size: 16px;
      color: #3a3a3a;
    }
  }
}

ul {
  list-style: unset;
}
</style>
