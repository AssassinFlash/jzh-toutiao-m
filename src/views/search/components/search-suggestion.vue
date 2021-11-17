<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item,index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('changeSearchText',item)"
    >
      <template #title>
        <div v-html="highlight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash' // 函数防抖
// 函数防抖：在规定的时间间隔内如果多次调用了函数，只执行最后一次函数，这样可以节省开销
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  // watch监听指定数据的变化，一旦变化即可执行响应逻辑
  watch: {
    // 这才是监视的完整写法
    // 如果不加immediate属性，监视会等到组件渲染完毕才开始监视，因此第一个字符无法被监视到
    searchText: {
      // 当监视到数据发生变化时执行handler回调
      // 防抖处理，设置时间间隔为200毫秒
      handler: debounce(async function (newValue) {
        const res = await getSearchSuggestions(newValue)
        this.suggestions = res.data.data.options
      }, 200),
      immediate: true // 表示handler回调会在初始化的时候就立即调用
    }
  },
  methods: {
    // 让联想建议和搜索关键字匹配高亮
    // 正则表达式 /中间的内容/，会被当做正则匹配模式字符来对待
    // 错误的写法：/this.searchText/
    // RegExp 正则表达式的构造函数，参数1：字符串，参数2：匹配模式，返回值：正则对象
    highlight (str) {
      return str.replace(new RegExp(this.searchText, 'ig'), `<span style="color:red">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  height: calc(100vh - 54px);
  overflow: auto;

  /deep/ .van-cell__title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
}
</style>
