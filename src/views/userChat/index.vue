<template>
  <div class="user-chat">
    <van-nav-bar
      title="小智同学"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- 消息列表 -->
    <van-cell-group class="message-list" ref="messageList">
      <van-cell
        v-for="(message,index) in messages"
        :key="index"
        :title="message.msg"
      >
      </van-cell>
    </van-cell-group>
    <!-- 发送消息 -->
    <van-cell-group class="send-message-wrap">
      <van-field
        v-model="message"
        :border="false"
        placeholder='输入消息'
      ></van-field>
      <van-button class="send-btn" size="small" type="primary" @click="onSend">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { setItem, getItem } from '@/utils/storage'
import io from 'socket.io-client'
// 发送消息：
// socket.emit('消息类型',消息内容)
// socket.on('消息类型',function(data){data消息})
export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      socket: null, // WebSocket通信对象
      messages: getItem('toutiao-messages') || [] // 消息列表（我发的和对方发给我的）
    }
  },
  created () {
    // 建立连接
    const socket = io('http://toutiao.itheima.net', {
      query: {
        token: getItem('toutiao-user')
      },
      transports: ['websocket']
    })
    this.socket = socket
    socket.on('connect', function () {
      console.log('连接已建立')
    })
    // 监听message事件，接收服务端消息
    socket.on('message', (data) => {
      console.log(data)
      // 加入消息列表
      this.messages.push(data)
    })
    socket.on('disconnect', function () {
      console.log('连接已断开')
    })
  },
  mounted () {
    this.scrollToBottom()
  },
  methods: {
    onSend () {
      // 请求发送消息，发送的消息被websocket包装成一个数组，['message',{msg:xxx,time:xxx}]
      const data = {
        msg: this.message,
        time: Date.now()
      }
      this.socket.emit('message', data)
      this.message = ''
      // 加入消息列表
      this.messages.push(data)
    },
    scrollToBottom () {
      // 每次发送消息都让可视区域滚动到最底部
      // .scrollTop给它赋值让它滚动
      // .scrollHeight是可滚动距离
      const list = this.$refs.messageList
      list.scrollTop = list.scrollHeight
    }
  },
  watch: {
    // 监听消息列表，有更新就写入本地存储
    messages () {
      console.log(this.messages)
      setItem('toutiao-messages', this.messages)
      // 数据改变影响视图更新并不是立即的
      // 如果要在操作数据之后立即操作被数据影响的视图DOM，就把代码放到nextTick函数中
      // 在nextTick函数中，DOM是一定已经更新了
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-chat {
  .message-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 54px;
    overflow-y: auto;
  }

  .send-message-wrap {
    padding: 5px 14px;
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    .send-btn {
      width: 80px;
    }
  }
}
</style>
