<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template #default v-if="!isDeleteShow">
        <van-icon name="delete-o" size="20" @click="isDeleteShow=true"/>
      </template>
      <template #default v-else>
        <div>
          <span style="margin-right: 20px" @click="onDeleteAll">全部删除</span>
          <span @click="isDeleteShow=false">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell v-for="(item,index) in searchHistories" :key="index" :title="item" @click="onDelete(index)">
      <template #default>
        <van-icon name="close" v-show="isDeleteShow"/>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { eventBus } from '@/utils/eventBus'
import { setItem } from '@/utils/storage'

export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 删除历史记录的图标的显示
    }
  },
  methods: {
    // 执行删除历史记录操作
    onDelete (index) {
      // 需要在删除状态为true的情况下执行逻辑
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
        // TODO：数据持久化
        // 更新本地存储的搜索历史
        setItem('search-histories', this.searchHistories)
      } else {
        // 非删除状态，点击则给父组件传searchText，执行搜索
        eventBus.emit('updateSearchText', this.searchHistories[index])
      }
    },
    // 执行搜索记录全部删除操作
    onDeleteAll () {
      // 注意：prop数据不能重新赋值，只能让父组件自己修改
      // 错误的写法：this.searchHistories=[]
      eventBus.emit('removeSearchHistories')
    }
  }
}
</script>

<style lang="less" scoped>
.search-history {
  height: calc(100vh - 54px);
  overflow: auto;

  /deep/ .van-icon {
    vertical-align: middle;
  }
}
</style>
