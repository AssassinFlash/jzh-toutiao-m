<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      loading-text="加载中"
      finished-text="没有更多了"
      @load="onLoad">
      <ArticleItem v-for="(article,index) in list" :key="index" :article="article"></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
import ArticleItem from '@/components/article-item/index'

export default {
  name: 'SearchResult',
  components: {
    ArticleItem
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页码
      per_page: 10 // 每页数据条目
    }
  },
  methods: {
    async onLoad () {
      // 请求获取数据，将数据放到列表中
      // 关闭本次loading
      // 判断是否还有数据，有则更新获取下一页数据的页码，没有则设finished为true
      const { data } = await getSearchResults({
        page: this.page, // 页码
        per_page: this.per_page, // 每页返回的数据条目
        q: this.searchText // 查询的关键字
      })
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
  height: calc(100vh - 54px);
  overflow: auto;
}
</style>
