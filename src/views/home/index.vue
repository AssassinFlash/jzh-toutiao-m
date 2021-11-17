<template>
  <div class="home-container">
    <!--    导航栏-->
    <van-nav-bar class="app-nav-bar">
      <template #left>
        <van-button
          class="search-btn"
          icon="search"
          type="info"
          round
          size="small"
          :to="{name:'search'}"
        >搜索
        </van-button>
      </template>
      <template #right>
        <van-button class="channel-edit-btn" icon="apps-o" @click="isChannelEditShow=true"></van-button>
      </template>
    </van-nav-bar>
    <!--    标签页-->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>
    </van-tabs>
    <!--    编辑频道的弹出层，挂载到body节点下，就不属于任何一个div节点了-->
    <van-popup
      v-model="isChannelEditShow"
      class="channel-edit-popup"
      position="bottom"
      closeable
      get-container="body"
      close-icon-position="top-left"
      :style="{height:'100%'}"
    >
      <channel-edit :my-channels="channels" :channelActiveIndex="active"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { eventBus } from '@/utils/eventBus'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0, // 控制被激活的标签
      channels: [], // 频道列表
      isChannelEditShow: false // 控制编辑频道的弹出层的显示状态
    }
  },
  created () {
    this.loadChannels()
  },
  mounted () {
    // 从子组件接收频道索引来更换频道
    // 关闭弹出层
    eventBus.on('changeChannel', (index) => {
      this.active = index
      this.isChannelEditShow = false
    })
    eventBus.on('updateActive', index => {
      this.active = index
    })
  },
  methods: {
    // 请求获取频道数据
    async loadChannels () {
      let channels = []
      // 已登录，从接口获取频道列表
      // 未登录，查看本地存储是否有频道列表，有则取出，无则从接口获取
      if (this.user) {
        const res = await getUserChannels()
        channels = res.data.data.channels
      } else {
        const localChannels = getItem('user-channels')
        if (localChannels) {
          channels = localChannels
        } else {
          const res = await getUserChannels()
          channels = res.data.data.channels
        }
      }
      this.channels = channels
      // const res = await getUserChannels()
      // this.channels = res.data.data.channels
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.home-container {

  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;

    .van-icon {
      font-size: 16px;
    }

    .van-button__text {
      font-size: 14px;
    }
  }

  .channel-tabs {

    /deep/ .van-tabs__line {
      background: #5babfb;
    }
  }

  .channel-edit-btn {
    background: unset;
    border: none;
    font-size: 24px;
  }

  /deep/ .van-nav-bar__right {
    padding-right: 0;
  }
}
</style>
