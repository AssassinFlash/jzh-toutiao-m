<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar class="reply-navbar">
      <template #title>
        <div>{{ comment.reply_count }} 条回复</div>
      </template>
      <template #left>
        <van-icon name="cross" @click="onClick"></van-icon>
      </template>
    </van-nav-bar>
    <!-- 当前评论项 -->
    <CommentItem :comment="comment"/>
    <van-cell title="所有回复"></van-cell>
    <!-- 追加回复评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多评论"
      @load="onLoad"
    >
      <CommentItem v-for="(comment,index) in list" :key="index" :comment="comment"/>
    </van-list>
    <!-- 回复评论按钮 -->
    <van-cell style="border-top: 1px solid #ccc">
      <van-button
        class="reply-btn"
        type="default"
        round
        size="small"
        block
        @click="isReplyShow=true"
      >
        追加评论
      </van-button>
    </van-cell>
    <!-- 追加评论弹出层 -->
    <van-popup v-model="isReplyShow" position="bottom">
      <PostComment :target="comment.com_id" :articleId="articleId"></PostComment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/components/comment-item/index'
import PostComment from './post-comment'
import { getComments } from '@/api/article'
import { eventBus } from '@/utils/eventBus'

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      offset: null,
      limit: 10,
      isReplyShow: false // 追加评论弹出层显示
    }
  },
  mounted () {
    eventBus.on('postSuccess', comment => {
      // 监听到追加评论成功事件
      this.list.unshift(comment)
      this.isReplyShow = false
      ++this.comment.reply_count
    })
  },
  methods: {
    async onLoad () {
      // 1.请求加载数据
      // 2.将数据放入列表
      // 3.关闭本次loading状态
      // 4.查看还有无数据，有则更新下一页，无则设置finished
      const { data } = await getComments({
        type: 'c',
        source: this.comment.com_id,
        offset: this.offset,
        limit: this.limit
      })
      this.list.push(...data.data.results)
      this.loading = false
      if (data.data.results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    },
    onClick () {
      eventBus.emit('closeReply')
    }
  }
}
</script>

<style lang="less" scoped>
.comment-reply {
  .reply-navbar {
    position: sticky;
    top: 0;
    left: 0;
  }

  .reply-btn {
    background: rgba(#ccc, .2);
  }
}
</style>
