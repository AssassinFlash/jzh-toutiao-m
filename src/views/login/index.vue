<template>
  <div class="login-container">
    <!--    导航栏-->
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()">
    </van-nav-bar>
    <!--    输入框-->
    <!--    基于vant的表单验证：
            1.使用van-form包裹表单项van-field
            2.给van-form绑定submit事件，当表单提交时会触发submit事件
              只有表单验证通过，才会调用submit事件
              注意：表单中只要有按钮，点击按钮都会触发submit事件
            3.使用Field的rules属性定义校验规则
            validate-first为在第一项验证不通过就没必要继续验证下去了
    -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="loginForm"
      @submit="onLogin()"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        placeholder="请输入手机号"
        icon-prefix="toutiao"
        left-icon="shouji"
        name="mobile"
        :rules="formRules.mobile"
      ></van-field>
      <van-field
        v-model="user.code"
        placeholder="请输入验证码"
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        name="code"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            class="countdown"
            v-if="isCountDownShow"
            :time="1000*60"
            format="ss 秒"
            @finish="isCountDownShow=false"/>
          <van-button
            class="code-btn"
            size="small"
            round
            v-if="!isCountDownShow"
            :loading="isSendSmsLoading"
            loading-text="发送中..."
            ref="codeBtn"
            @click.prevent="onSendSms"
          >
            获取验证码
          </van-button>
        </template>
      </van-field>
      <!--    登录按钮-->
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          type="info"
          block
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      // 验证规则
      formRules: {
        mobile: [
          {
            required: true, // 不能为空
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/, // 正则校验
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false, // 控制倒计时的显示
      isSendSmsLoading: false // 控制发送验证码按钮的加载状态
    }
  },
  methods: {
    // 处理登录方法
    async onLogin () {
      Toast.loading({
        message: '正在登录...',
        forbidClick: true,
        duration: 0 // 值为0，toast不会消失
      })
      // 处理异常
      try {
        const res = await login(this.user)
        Toast.success('登录成功')
        // 将后端返回的用户登录状态(token)放到Vuex容器中
        this.$store.commit('setUser', res.data.data)
        // 登录成功，跳转回原来页面
        this.$router.back()
      } catch (err) {
        console.log(err)
        console.log('登录失败')
        Toast.fail('登录失败，手机号或验证码错误')
      }
    },
    // 表单验证失败时触发方法
    onFailed (err) {
      if (err.errors[0]) {
        this.error = err.errors
        Toast({
          message: err.errors[0].message,
          position: 'top'
        })
      }
    },
    // 点击验证码按钮触发的事件
    async onSendSms () {
      // 校验手机号，验证成功才发送验证码
      // 取消默认的校验行为，通过click.prevent来实现（也就是取消事件冒泡）
      // 手动触发校验：通过ref指定form获取到form表单，然后执行form的validate方法
      // 传入field的name值，告知form表单校验这个field，返回的是Promise
      try {
        // await可以使用catch捕获异常
        await this.$refs.loginForm.validate('mobile')
        // 验证通过，发送验证码
        this.isSendSmsLoading = true
        await sendSms(this.user.mobile)
        this.isCountDownShow = true
        Toast.success({
          message: '发送验证码成功，注意查看手机',
          position: 'top'
        })
      } catch (err) {
        // try中任何代码错误都会进入catch
        // 不同的错误要有不同的提示
        // 验证错误，提示错误
        this.isCountDownShow = false
        this.isSendSmsLoading = false
        let message = ''
        if (err.name === 'mobile') {
          message = err.message
        } else if (err.isAxiosError) {
          message = '发送太频繁了，请稍后再试'
        }
        Toast({
          message,
          position: 'top'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.countdown {
  display: block;
  height: 25px;
  width: 100px;
  line-height: 25px;
  border-radius: 12px;
  text-align: center;
  font-size: 12px;
  color: #666;
  background: #ededed;
}

.code-btn {
  width: 100px;
  background: #ededed;
  text-align: center;
  color: #666;
  font-size: 12px;
}

.login-btn-wrap {
  padding: 26px 16px;

  .login-btn {
    background: #6db4fb;
    border-radius: 15px;
    border: none;
    font-size: 16px;
  }
}
</style>
