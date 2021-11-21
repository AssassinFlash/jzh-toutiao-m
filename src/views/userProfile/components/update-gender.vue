<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="onCancel"
      @change="onChange"
      @confirm="onConfirm"
    ></van-picker>
  </div>
</template>

<script>
import { eventBus } from '@/utils/eventBus'
import { updateUserProfile } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'UpdateGender',
  props: {
    gender: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.gender,
      index: 0
    }
  },
  methods: {
    onCancel () {
      eventBus.emit('closeUpdateGenderPopup')
    },
    onChange (picker, value, index) {
      this.index = index
    },
    async onConfirm () {
      Toast.loading({
        message: '正在操作...',
        forbidClick: true
      })
      await updateUserProfile({
        gender: this.index
      })
      Toast.success('修改性别成功')
      eventBus.emit('updateGenderSuccess', this.index)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
