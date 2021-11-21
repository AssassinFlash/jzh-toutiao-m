<template>
  <!--  也就是说，layout页的上面是一个路由出口，或者说是二级路由，是layout的子路由，用来显示下边导航栏点击时访问的路由-->
  <div class="layout-container">
    <!--    子路由出口-->
    <!--    keepAlive作用了二级路由，现在layout的子路由也可以缓存了-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--    底部导航栏-->
    <van-tabbar route>
      <van-tabbar-item
        v-for="(item,index) in tabbar"
        :key="index" :to="item.path"
        :icon="item.icon">
        {{ item.name }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      tabbar: [
        {
          path: '/',
          name: '首页',
          icon: 'wap-home-o'
        },
        {
          path: '/qa',
          name: '问答',
          icon: 'comment-o'
        },
        {
          path: '/video',
          name: '视频',
          icon: 'video-o'
        },
        {
          path: '/my',
          name: '我的',
          icon: 'manager-o'
        }
      ]
    }
  },
  mounted () {
    // 登录成功了，组件渲染完了，这时候再给组件添加缓存
    this.$store.commit('addCachePage', 'LayoutIndex')
  }
}
</script>

<style scoped>

</style>
