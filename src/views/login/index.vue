<script setup lang="ts">
import { ref } from 'vue'
import { mobileRules, passwordRules } from '@/utils/rules'
import { Toast } from 'vant'
import { loginByPassword } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'

const clickRight = () => {
  console.log('点了')
}

// 是否同意网站使用协议
const agree = ref(false)

// 动态切换密码框眼睛图标,控制是否显示密码
// 1.定义一个响应变量isShowPass
// 2.根据isShowPass控制是否显示密码
const isShowPass = ref(false)

// 准备账号和密码的响应变量
const mobile = ref('13230000055')
const password = ref('abc12345')

const store = useUserStore()
// 跳转页面使用
const router = useRouter()
// 获取路由参数使用
const route = useRoute()

// 按钮native-type + 表单@submit + login函数可以实现登录按钮的兜底校验
const login = async () => {
  if (!agree.value) return Toast.fail('请同意协议')
  console.log('校验通过了')
  try {
    const res = await loginByPassword(mobile.value, password.value)
    console.log('登陆成功:', res)
    // 登录成功获取token并持久化到本地
    store.setUser(res.data)
    // 进行页面跳转
    // 如果存在route.query.returnUrl回跳地址,就跳转returnUrl地址,否则默认跳转用户个人中心
    router.push((route.query.returnUrl as string) || '/user')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="login-page">
    <!-- 头部导航栏 -->
    <law-nav-bar title="" right="注册" @click-right="clickRight"></law-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>密码登录</h3>
      <a href="javascript:;">
        <span>短信验证码登录</span>
        <van-icon name="arrow" style="color: #555"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form @submit="login">
      <van-field
        autocomplete="off"
        v-model="mobile"
        :rules="mobileRules"
        placeholder="请输入手机号"
        type="tel"
      ></van-field>
      <van-field
        autocomplete="off"
        v-model="password"
        placeholder="请输入密码"
        :rules="passwordRules"
        :type="isShowPass ? 'text' : 'password'"
      >
        <template #button>
          <law-icon
            :name="`login-eye-${isShowPass ? 'on' : 'off'}`"
            @click="isShowPass = !isShowPass"
          />
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree" icon-size="16px">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button native-type="submit" block round type="primary"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell forget">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
    background-color: #f1f2f6;
  }
  &-head {
    // background: yellow;
    display: flex;
    // padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: center;
    padding: 30px 30px 10px 30px;
    line-height: 1;
    h3 {
      // background: green;
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
      // background: pink;
    }
    span {
      color: #555;
    }
  }
  &-other {
    margin-top: 50px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  // background: pink;
  padding: 0 14px;
  .forget {
    font-size: 15px;
    // color: balck;
    a {
      color: #555;
    }
  }
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: pink;
        padding: 0 5px;
        font-size: 15px;
      }
      span {
        font-size: 15px;
      }
    }
  }
  .btn-send {
    color: pink;
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
}
</style>
