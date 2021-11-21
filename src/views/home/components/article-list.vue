<!--思路分析：
    根据不同的频道加载不同的文章列表，想要的效果是加载过的数据列表不要重新加载
    实现思路：准备多个list数组，每个频道对应一个，查看哪个频道就把数据往哪个频道的列表数组中存放
            有多少频道就准备多少个频道文章数组，这个过程的做法是：
              封装一个文章列表组件，由这个组件来遍历文章列表，
              在频道列表中将频道ID作为props参数传递给文章列表组件，
              这个过程相当于第一次查看该频道时就生成了一个新的组件，这个组件并不会消失，
              且由于传递的ID不同，相当于每个组件都是隶属于ID对应的频道的，组件之间的数据list都是相互独立的，
              重新查看该频道就相当于重新查看该组件。
 -->
<template>
  <!-- load事件：list初始化后会触发一次load，用于加载第一屏的数据
       如果一次请求加载的数据条数较少，导致列表内容无法铺满屏幕，list会继续触发load
       直到内容铺满屏幕或者数据加载完成
       loading属性：控制加载中的Loading状态，
       非加载中，loading为false，此时会根据列表滚动位置判断是否触发load事件（列表内容不能铺满屏幕就会自动触发）
       加载中，loading为true，表示正在发送异步请求，向数据接口请求数据
       finished属性：控制加载结束的状态，
       在每次请求完毕后，需要手动将loading设置为false，表示本次加载结束，
       所有数据加载结束时，finished为true，之后不会触发load事件
       逻辑整理：
       首次进入->触发load事件，设置loading=true，表示正在加载数据，本次事件加载的数据完成，设置loading=false，
        判断数据是否已加载完成，是则finished=true，不会再触发load事件
       判断若屏幕未被数据铺满且数据未加载完成->触发load事件，完成load事件的逻辑，若数据已加载完成则无事发生
       若屏幕下滑到最底部且数据未加载完成->触发load事件，完成load事件的逻辑
   -->
  <div class="article-list" ref="articleList">
    <van-pull-refresh v-model="pulldownLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        loading-text="加载中"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item v-for="(article,index) in list" :key="index" :article="article"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import { Toast } from 'vant'
// 引入封装的文章item模块
import ArticleItem from '@/components/article-item/index'
// 给记录滚动距离函数做防抖处理，否则触发太频繁
import { debounce } from 'lodash'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 文章列表
      loading: false, // 在load事件中数据处于加载状态
      finished: false, // 是否数据已加载完成
      pre_timestamp: null, // 上一次请求的时间戳
      pulldownLoading: false, // 下拉刷新的loading状态
      scrollTop: 0 // 列表滚动到顶部的距离
    }
  },
  methods: {
    // 加载更多事件
    async onLoad () {
      console.log('自动触发，请求数据')
      const res = await getArticles({
        channel_id: this.channel.id,
        // 类似于页码，访问下一页数据就使用上一页数据返回的时间戳
        timestamp: this.pre_timestamp === null ? Date.now() : this.pre_timestamp
      })
      this.list.push(...res.data.data.results)
      // 设置本次调用load事件的加载状态loading结束
      // 然后，list组件才会自行判断是否需要加载下一次
      // 否则就永远等待加载状态
      this.loading = false
      // 如果还有数据，更新下一页数据的时间戳
      if (res.data.data.results.length) {
        this.pre_timestamp = res.data.data.pre_timestamp
      } else {
        // 数据全部加载完毕
        this.finished = true
      }
    },
    // 下拉刷新事件
    async onRefresh () {
      console.log('下拉刷新事件')
      const res = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now()
      })
      // 下拉刷新事件要往顶部追加数据
      this.list.unshift(...res.data.data.results)
      // 关闭加载状态
      this.pulldownLoading = false
      Toast({
        message: `刷新成功，更新了${res.data.data.results.length}条数据`
      })
      this.pre_timestamp = res.data.data.pre_timestamp
    }
  },
  mounted () {
    const articleList = this.$refs.articleList
    // 监听滚动事件，获得文章列表滚动的位置
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop
    }, 100)
  },
  // 当组件被keepAlive缓存，组件切换的时候它的activated和deactivated钩子函数会执行
  activated () {
    // 重新设置文章列表的滚动位置
    this.$refs.articleList.scrollTop = this.scrollTop
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: calc(100vh - 90px - 50px);
  overflow: auto;
}
</style>
