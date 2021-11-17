<template>
  <!-- 封装频道编辑组件，让首页代码没那么臃肿 -->
  <div class="channel-edit">
    <van-cell center :border="false">
      <template #title>
        <div class="channel-title">
          我的频道
        </div>
      </template>
      <template #default>
        <van-button
          class="edit-btn"
          @click="isEdit=!isEdit"
          type="danger"
          round
          size="small">
          {{ isEdit ? '完成' : '编辑' }}
        </van-button>
      </template>
    </van-cell>
    <van-grid :gutter="10" clickable>
      <!-- 条件判断：
            对于文本：三元表达式 条件？结果1 : 结果2
            对于class：{ 结果 : 条件 }
       -->
      <van-grid-item
        :icon="isEdit && index!==0 ? 'close' : ''"
        @click="onUserChannelClick(index)"
        class="grid-item"
        :class="{active : index === channelActiveIndex}"
        v-for="(channel,index) in myChannels"
        :key="index"
        :text="channel.name">
      </van-grid-item>
    </van-grid>
    <van-cell center :border="false" style="margin-top: 20px">
      <template #title>
        <div class="channel-title">频道推荐</div>
      </template>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in recommendChannels"
        :key="index"
        @click="onAddChannel(channel)"
        :text="channel.name">
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteUserChannels } from '@/api/channel'
import { eventBus } from '@/utils/eventBus'
import { Toast } from 'vant'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    channelActiveIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道数据列表
      isEdit: false // 控制频道编辑状态
    }
  },
  methods: {
    async loadAllChannels () {
      const res = await getAllChannels()
      this.allChannels = res.data.data.channels
    },
    // 点击频道推荐中的某一项，添加频道
    async onAddChannel (channel) {
      this.myChannels.push(channel)
      // TODO：数据持久化
      // 分登录和未登录的情况
      if (this.user) {
        // 添加频道到后端
        await addUserChannels({
          channels: [
            {
              id: channel.id,
              seq: this.myChannels.length
            }
          ]
        })
      } else {
        // 添加频道到本地
        setItem('user-channels', this.myChannels)
      }
    },
    // 点击我的频道中的某一项，进行处理
    async onUserChannelClick (index) {
      // 编辑状态，删除频道
      // 非编辑状态，切换频道
      if (this.isEdit && index !== 0) {
        // 如果删除的是当前激活频道之前的频道
        if (index <= this.channelActiveIndex) {
          // 更新激活频道的索引
          eventBus.emit('updateActive', this.channelActiveIndex - 1)
        }
        const deleteElement = this.myChannels.splice(index, 1)
        // TODO：数据持久化
        // 登录了，通过接口删除
        // 没有登录，将频道保存到本地
        if (this.user) {
          await deleteUserChannels(deleteElement[0].id)
        } else {
          setItem('user-channels', this.myChannels)
        }
      } else if (this.isEdit && index === 0) {
        Toast({
          message: '推荐频道无法删除',
          position: 'top'
        })
      } else {
        eventBus.emit('changeChannel', index)
      }
    }
  },
  // 基于现有数据衍生出的数据逻辑，就使用计算属性
  // 计算属性会时刻监听依赖数据的变化而调用函数
  // 在此例中，allChannels和myChannels只要发生变化都会重新计算recommendChannels
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(channel => {
        // 找到所有频道和我的频道共有的元素，然后剔除这个元素
        return !this.myChannels.find(x => {
          return x.id === channel.id
        })
      })
    }
  },
  async created () {
    await this.loadAllChannels()
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 50px;

  .edit-btn {
    width: 58px;
  }

  .channel-title {
    font-size: 16px;
    color: #333;
  }

  .grid-item {
    width: 80px;
    height: 43px;

    /deep/ .van-grid-item__content {
      background: #f4f5f6;

      .van-grid-item__text {
        font-size: 12px;
        color: #222;
        margin: 0;
      }
    }

    // 关闭按钮
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 14px;
      color: red;
    }
  }

  // 高亮频道
  .active {
    /deep/ .van-grid-item__content {
      background: rgba(255, 0, 0, .1);

      .van-grid-item__text {
        color: red !important;
      }
    }
  }
}
</style>
