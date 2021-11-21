<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- 用户信息展示 -->
    <!-- accept属性表示只接收image图片 -->
    <input type="file" hidden ref="file" accept="image/*" @change="onFileChange"/>
    <van-cell center title="头像" is-link @click="$refs.file.click()">
      <template #default>
        <van-image
          style="vertical-align:middle"
          width="40"
          height="40"
          round
          fit="cover"
          :src="user.photo"
        ></van-image>
      </template>
    </van-cell>
    <van-cell title="呢称" is-link :value="user.name" @click="isEditNameShow=true"></van-cell>
    <van-cell title="性别" is-link :value="user.gender===0 ? '男' : '女'" @click="isEditGenderShow=true"></van-cell>
    <van-cell title="生日" is-link :value="user.birthday" @click="isEditBirthdayShow=true"></van-cell>
    <!-- 呢称弹出层 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{height:'100%'}"
    >
      <!--
        使用v-if条件渲染，保证每次保存或取消修改呢称都会销毁弹出层
        正常来说，组件创建了就会一直存在，不会被销毁，所以如果修改了呢称并且取消了操作，再次打开会发现内容是修改了的呢称
        这显然不符合要求，要求是要取消了操作就是呢称没有被修改，那么再次打开弹出层还是要原来的那个呢称
      -->
      <UpdateName :name="user.name" v-if="isEditNameShow"></UpdateName>
    </van-popup>
    <!-- 性别弹出层 -->
    <van-popup
      v-model="isEditGenderShow"
      position="bottom"
    >
      <UpdateGender :gender="user.gender" v-if="isEditGenderShow"/>
    </van-popup>
    <!-- 生日弹出层 -->
    <van-popup
      v-model="isEditBirthdayShow"
      position="bottom"
    >
      <UpdateBirthday :birthday="user.birthday" v-if="isEditBirthdayShow"/>
    </van-popup>
    <!-- 头像弹出层 -->
    <van-popup
      v-model="isEditPhotoShow"
      position="bottom"
      :style="{height: '100%'}"
      style="background:#000;"
    >
      <UpdatePhoto :file="previewImage" v-if="isEditPhotoShow"/>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
import { eventBus } from '@/utils/eventBus'

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {}, // 用户数据
      isEditNameShow: false, // 控制呢称弹出层的显示
      isEditGenderShow: false, // 控制性别弹出层的显示
      isEditBirthdayShow: false, // 控制生日弹出层的显示
      isEditPhotoShow: false, // 控制头像弹出层的显示
      previewImage: null // 上传预览图片
    }
  },
  mounted () {
    this.loadUserProfile()
    eventBus.on('closeUpdateNamePopUp', () => {
      // 监听到关闭修改呢称的事件
      this.isEditNameShow = false
    })
    eventBus.on('updateNameSuccess', (name) => {
      // 监听到修改呢称成功的事件
      this.user.name = name
      this.isEditNameShow = false
    })
    eventBus.on('closeUpdateGenderPopup', () => {
      // 监听到关闭修改性别的事件
      this.isEditGenderShow = false
    })
    eventBus.on('updateGenderSuccess', gender => {
      // 监听到修改性别成功事件
      this.user.gender = gender
      this.isEditGenderShow = false
    })
    eventBus.on('closeUpdateBirthdayPopup', () => {
      // 监听到关闭修改生日的事件
      this.isEditBirthdayShow = false
    })
    eventBus.on('updateBirthdaySuccess', birthday => {
      // 监听到修改生日成功的事件
      this.user.birthday = birthday
      this.isEditBirthdayShow = false
    })
    eventBus.on('closeUpdatePhotoPopup', () => {
      // 监听到关闭修改头像的事件
      this.isEditPhotoShow = false
    })
    eventBus.on('updateUserPhotoSuccess', photo => {
      // 监听到修改头像成功事件
      this.user.photo = photo
      this.isEditPhotoShow = false
    })
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    },
    // 图片被选中，展示弹出层，在弹出层中预览图片
    onFileChange () {
      const fileIpt = this.$refs.file
      this.previewImage = fileIpt.files[0]
      this.isEditPhotoShow = true
      // 清空value，不清会导致选择相同图片不会触发change事件
      fileIpt.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
</style>
