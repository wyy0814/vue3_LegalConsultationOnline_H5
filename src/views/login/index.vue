<script setup lang="ts">
const clickRight = () => {
  console.log('点了')
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
    <van-form autocomplete="off">
      <van-field placeholder="请输入手机号" type="tel"></van-field>
      <van-field placeholder="请输入密码" type="password"></van-field>
      <div class="cp-cell">
        <van-checkbox>
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary">登 录</van-button>
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
