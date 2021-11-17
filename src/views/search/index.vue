<template>
  <div class="search-container">
    <!-- 搜索栏，当获取焦点时要关闭搜索结果，展示联想建议 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow=false"
        background="#5babfb"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>
    <!-- 联想建议，当搜索框内有内容 -->
    <SearchSuggestion v-else-if="searchText" :searchText="searchText" @changeSearchText="onSearch"></SearchSuggestion>
    <!-- 历史记录，当搜索框无内容 -->
    <SearchHistory v-else :searchHistories="searchHistories"></SearchHistory>
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem, getItem, removeItem } from '@/utils/storage'
import { eventBus } from '@/utils/eventBus'

export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的显示状态
      searchHistories: getItem('search-histories') || [] // 搜索历史数据
    }
  },
  mounted () {
    // 从搜索历史中接收更新搜索框关键字的事件响应
    eventBus.on('updateSearchText', searchText => {
      this.onSearch(searchText)
    })
    // 从搜索历史中接收删除全部历史记录的事件响应
    eventBus.on('removeSearchHistories', () => {
      this.searchHistories = []
      // TODO：数据持久化
      // 去除本地存储的搜索记录
      removeItem('search-histories')
    })
  },
  methods: {
    onSearch (searchText) {
      // 接收到联想建议子组件传来的searchText，更新搜索框关键字
      this.searchText = searchText
      // 展示搜索结果
      this.isResultShow = true
      // 记录搜索历史记录
      // 利用set的不重复特性给数组去重，使历史记录不会重复
      this.searchHistories.unshift(this.searchText)
      this.searchHistories = [...new Set(this.searchHistories)]
      // TODO：数据持久化
      // 存储搜索历史记录到本地
      setItem('search-histories', this.searchHistories)
    }
  }
}
</script>

<style scoped>

</style>
