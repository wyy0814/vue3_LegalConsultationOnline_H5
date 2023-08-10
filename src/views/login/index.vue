<script setup lang="ts">
const clickRight = () => {
  console.log('点了')
}
</script>

<template>
  <div class="login-page">
    <law-nav-bar
      title="登录"
      right="注册"
      @click-right="clickRight"
    ></law-nav-bar>
    login
  </div>
</template>

<style lang="scss" scoped></style>
