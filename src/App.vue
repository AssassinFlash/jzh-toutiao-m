<template>
  <div id="app">
    <h1>黑马头条</h1>
    <van-button icon="star-o" type="primary">主要按钮</van-button>
    <van-button icon-prefix="toutiao" icon="shoucang" type="info">默认按钮</van-button>
    <i class="toutiao toutiao-pinglun"></i>
    <i class="toutiao toutiao-shanchu"></i>
    <!--    路由的出口 匹配到的路径会渲染到这个地方-->
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
</style>
