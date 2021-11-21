<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="修改呢称"
      left-text="取消"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onConfirm"
    ></van-nav-bar>
    <!-- 输入框 -->
    <div style="padding:10px">
      <van-field
        border
        v-model="userName"
        rows="1"
        label="用户呢称"
        required
        maxlength="7"
        placeholder="请输入呢称"
        show-word-limit
      ></van-field>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/utils/eventBus'
import { updateUserProfile } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'UpdateName',
  props: {
    name: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      userName: this.name
    }
  },
  methods: {
    onClickLeft () {
      eventBus.emit('closeUpdateNamePopUp')
    },
    // 保存呢称修改
    async onConfirm () {
      Toast.loading({
        message: '正在操作...',
        forbidClick: true
      })
      try {
        await updateUserProfile({ name: this.userName })
        Toast.success('修改呢称成功')
        // 通知父组件修改呢称成功
        eventBus.emit('updateNameSuccess', this.userName)
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          Toast.fail('该呢称已存在')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
