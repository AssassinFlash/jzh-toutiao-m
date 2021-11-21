<template>
  <div class="update-photo">
    <img :src="image" alt="" ref="image">
    <van-nav-bar
      left-text="取消"
      right-text="保存"
      @click-left="onCancel"
      @click-right="onConfirm"
    ></van-nav-bar>
  </div>
</template>

<script>
import { eventBus } from '@/utils/eventBus'
import { updateUserPhoto } from '@/api/user'
import { Toast } from 'vant'
// 头像裁切第三方包
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      type: File,
      required: true
    }
  },
  data () {
    return {
      // 创建图片URL，图片源在files属性中，files属性是一个数组，索引0为图片源，但图片源本身不是一个URL
      image: window.URL.createObjectURL(this.file),
      // 裁剪器对象
      cropper: null
    }
  },
  methods: {
    onCancel () {
      eventBus.emit('closeUpdatePhotoPopup')
    },
    async onConfirm () {
      Toast.loading({
        message: '正在处理中',
        forbidClick: true,
        duration: 0
      })
      // 接口要求multipart/form-data，那就需要提交FormData数据对象
      // FormData 专门用于文件上传的
      const formData = new FormData()
      const file = await this.getCroppedCanvas()
      // formData需要文件对象
      formData.append('photo', file)
      await updateUserPhoto(formData)
      Toast.success('修改头像成功')
      eventBus.emit('updateUserPhotoSuccess', window.URL.createObjectURL(file))
    },
    // 获得裁剪器包括的图像
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(blob => {
          resolve(blob)
        })
      })
    }
  },
  mounted () {
    // 获取需要裁切的图片DOM
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: true,
      cropBoxResizable: false,
      background: false,
      movable: false
    })
  }
}
</script>

<style lang="less" scoped>
img {
  display: block;
  max-width: 100%;
  height: 100%;
}

.update-photo {
  /deep/ .van-nav-bar {
    background: #000;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
