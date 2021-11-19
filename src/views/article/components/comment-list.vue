<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model.trim="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem v-for="(comment,index) in list" :key="index" :comment="comment"></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/article'
import CommentItem from '@/components/comment-item/index'
import { eventBus } from '@/utils/eventBus'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  mounted () {
    eventBus.on('postSuccess', comment => {
      // 评论列表监听到发布评论成功的事件
      // 把新评论对象放到评论列表的顶部
      this.list.unshift(comment)
    })
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      // 2.把数据放到列表
      // 3.关闭本次加载数据的loading状态
      // 4.查看还有没有数据，有则更新获取的下一页码，没有则设置finished为true
      const { data } = await getComments({
        type: 'a', // 评论类型
        source: this.source, // 文章ID或评论ID
        offset: this.offset, // 评论数据的偏移量，值为评论ID，表示从该ID的数据往后取
        limit: this.limit// 获取的评论个数
      })
      this.list.push(...data.data.results)
      this.loading = false
      if (!data.data.results.length) {
        this.finished = true
      } else {
        // 更新偏移量
        this.offset = data.data.last_id
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
