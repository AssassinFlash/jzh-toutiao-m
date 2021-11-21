<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell class="base-info" :border="false" center>
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo">
        </van-image>
        <template #title>
          <div class="name">{{ currentUser.name }}</div>
        </template>
        <van-button size="small" round class="update-btn" :to="{name:'userProfile'}">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <template #text>
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </template>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login" @click="$router.push('/login')">
      <div>
        <img class="mobile" src="./shouji.png" alt="">
        <div class="text">登录 / 注册</div>
      </div>
    </div>
    <van-grid :column-num="2" class="nav-grid mb-10">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏"/>
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史"/>
    </van-grid>
    <van-cell title="消息通知" is-link to="/vant/mobile.html"/>
    <van-cell class="mb-10" title="小智同学" is-link :to="{name:'userChat'}"/>
    <van-button type="default" block class="logout" v-if="user" @click="onLogout">退出登录</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Dialog } from 'vant'
import { getCurrentUser } from '@/api/user'

export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {}
    }
  },
  computed: {
    // 自动执行，时刻监听user属性的变化
    ...mapState(['user'])
  },
  created () {
    this.loadCurrentUser()
  },
  methods: {
    onLogout () {
      // 提示用户确认退出
      Dialog.confirm({
        title: '确认退出吗？',
        message: '退出后将无法点赞文章，关注博主'
      }).then(() => {
        // 确认退出
        this.$store.commit('removeUser')
      }).catch(() => {
      })
    },
    async loadCurrentUser () {
      const res = await getCurrentUser()
      this.currentUser = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
  }

  .base-info {
    box-sizing: border-box;
    height: 115px;
    padding-top: 38px;
    padding-bottom: 11px;
    background-color: unset;

    .avatar {
      box-sizing: border-box;
      width: 66px;
      height: 66px;
      border: 1px solid white;
      margin-right: 11px;
    }

    .name {
      color: #fff;
      font-size: 15px;
    }

    .update-btn {
      height: 30px;
      font-size: 12px;
      color: #666;
    }
  }

  .data-info {
    .data-info-item {
      height: 65px;
      color: #fff;

      .count {
        font-size: 18px;
      }

      .text {
        font-size: 12px;
      }
    }
  }

  .nav-grid {
    background: white;

    .nav-grid-item {
      height: 70px;

      /deep/ .toutiao {
        font-size: 23px;
      }

      /deep/ .toutiao-shoucang {
        color: #eb5253;
      }

      /deep/ .toutiao-lishi {
        color: #ff9d1d;
      }

      /deep/ .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }

  .logout {
    color: #d86262;
  }

  .not-login {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .mobile {
      width: 66px;
      height: 66px;
      margin-bottom: 10px;
    }

    .text {
      color: #fff;
      font-size: 14px;
    }
  }

  .mb-10 {
    margin-bottom: 10px;
  }

  // 样式穿透
  // 这是因为在组件的样式作用域中，给子组件设置样式，默认只能作用到子组件的根节点
  // 而使用样式穿透就可以作用得更深层次，找到子组件对应的类名并应用样式
  /deep/ .van-grid-item__content {
    background-color: unset;
  }
}
</style>
