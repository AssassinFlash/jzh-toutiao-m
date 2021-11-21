<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { eventBus } from '@/utils/eventBus'
import { updateUserProfile } from '@/api/user'
import { Toast } from 'vant'
import { dayjs } from '@/utils/dayjs'

export default {
  name: 'UpdateBirthday',
  props: {
    birthday: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.birthday)
    }
  },
  methods: {
    onCancel () {
      eventBus.emit('closeUpdateBirthdayPopup')
    },
    async onConfirm (currentDate) {
      Toast.loading({
        message: '正在处理中',
        forbidClick: true
      })
      // const birthday = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getDate()}`
      const birthday = dayjs(currentDate).format('YYYY-MM-DD')
      await updateUserProfile({
        birthday
      })
      Toast.success('修改生日成功')
      eventBus.emit('updateBirthdaySuccess', birthday)
    }
  }
}
</script>

<style scoped>

</style>
