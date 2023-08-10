<template>
  <div>
    <h1 class="test">测试页面</h1>
    <ul>
      <li>{{ store.user }}</li>
      <li @click="changeUser">修改user</li>
    </ul>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <!-- 测试精灵图 -->
    <!-- <svg aria-hidden="true">
      <use href="#icon-login-eye-off" />
    </svg> -->
    <law-icon name="consult-alipay"></law-icon>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
// import { useRoute } from '@vue-router'
// import { request } from '@/utils/request'
// import { onMounted } from 'vue'

const store = useUserStore()
const changeUser = () => {
  store.setUser({
    token: '123',
    id: '123',
    account: '123',
    mobile: '123',
    avatar: ''
  })
}

// 测试request请求
// const geterr = async () => {
//   const res = await request.get('/patient/myUser')
//   console.log(res)
// }
// const getuser = async () => {
//   const resuser = await request.post('/login/password', {
//     mobile: '13211112222',
//     password: 'abc12345000'
//   })
//   console.log('登录成功:', resuser)
// }

// onMounted(() => {
//   // geterr()
//   getuser()
// })
</script>

<style lang="scss" scoped>
.test {
  font-size: 16px;
  border: 1px solid red;
}
</style>
