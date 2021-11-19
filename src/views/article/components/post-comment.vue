<template>
  <div class="post-comment">
    <van-field
      v-model="content"
      rows="2"
      border
      autosize
      type="textarea"
      maxlength="100"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button
      class="post-btn"
      type="info"
      size="small"
      round
      :disabled="!content"
      @click="onPost"
    >
      发布
    </van-button>
  </div>
</template>

<script>
import { postComment } from '@/api/article'
import { eventBus } from '@/utils/eventBus'
import { Toast } from 'vant'

export default {
  name: 'PostComment',
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      default: null
    }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    async onPost () {
      // 提交评论内容
      Toast.loading({
        message: '正在操作...',
        forbidClick: true
      })
      const { data } = await postComment({
        target: this.target.toString(), // 评论的目标ID，评论文章即文章ID，回复评论即评论ID
        content: this.content, // 评论的内容
        // 文章ID，对评论内容发表回复就需传这个参数，对文章进行评论就不需要传
        art_id: this.articleId ? this.articleId.toString() : null
      })
      console.log(data)
      // 向父组件发送消息，表示发送成功，让父组件更新视图
      eventBus.emit('postSuccess', data.data.new_obj)
      Toast.success('发布成功')
    }
  }
}
</script>

<style lang="less" scoped>
.post-comment {
  display: flex;
  align-items: flex-end;

  .post-btn {
    margin-bottom: 10px;
    margin-right: 10px;
    width: 80px;
  }
}
</style>
