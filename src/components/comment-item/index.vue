<template>
  <van-cell
    class="comment-item"
  >
    <template #icon>
      <van-image
        width="40"
        height="40"
        round
        fit="cover"
        class="avatar"
        :src="comment.aut_photo"
      >
      </van-image>
    </template>
    <template #title>
      <div>
        <div class="title">
          <div class="name">{{ comment.aut_name }}</div>
          <div class="like-wrap" @click="onCommentLike">
            <van-icon
              class="like-icon"
              :name="comment.is_liking ? 'good-job' : 'good-job-o'"
              :color="comment.is_liking ? 'red' : ''"
            ></van-icon>
            <span class="like-count">{{ comment.like_count }}</span>
          </div>
        </div>
        <div class="content">{{ comment.content }}</div>
        <div class="time-wrap">
          <span class="pubdate">{{ handleTime(comment.pubdate) }}</span>
          <van-button
            class="reply-btn"
            round
            size="small"
            @click="onReply"
          >
            {{ comment.reply_count }} 回复
          </van-button>
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { dayjs } from '@/utils/dayjs'
import { likeComment, cancelLikeComment } from '@/api/article'
import { eventBus } from '@/utils/eventBus'

export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleTime (time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    },
    async onCommentLike () {
      // 已点赞，取消点赞
      // 未点赞，添加点赞
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        await cancelLikeComment(commentId)
        --this.comment.like_count
      } else {
        await likeComment(commentId)
        ++this.comment.like_count
      }
      // 更新视图
      this.comment.is_liking = !this.comment.is_liking
    },
    // 处理点击回复评论事件
    onReply () {
      eventBus.emit('replyShow', this.comment)
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  .avatar {
    width: 40px;
    height: 40px;
    margin-right: 13px;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .name {
    font-size: 14px;
    color: #406599;
  }

  .content {
    padding-top: 10px;
    font-size: 15px;
    color: #262626;
  }

  .time-wrap {
    margin-top: 5px;
    display: flex;
    align-items: center;

    .pubdate {
      font-size: 10px;
      color: #262626;
    }

    .reply-btn {
      width: 68px;
      height: 25px;
      margin-left: 14px;
      background: #f4f5f6;
      font-size: 12px;
      color: #262626;
    }
  }

  .like-wrap {
    .like-icon {
      font-size: 15px;
      color: #262626;
      margin-right: 10px;
      vertical-align: middle;
    }

    .like-count {
      font-size: 10px;
      color: #262626;
    }
  }
}
</style>
