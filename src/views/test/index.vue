<template>
  <div>
    <h1>测试页面</h1>
    <ul>
      <li>{{ store.user }}</li>
      <li @click="changeUser">修改user</li>
      <li></li>
    </ul>
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

<style lang="scss" scoped></style>
