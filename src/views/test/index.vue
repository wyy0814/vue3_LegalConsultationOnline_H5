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
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
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
</script>

<style lang="scss" scoped>
.test {
  font-size: 16px;
  border: 1px solid red;
}
</style>
