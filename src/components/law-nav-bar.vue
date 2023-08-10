<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const onClickLeft = () => {
  // TODO 点击左侧返回按钮
  if (history.state.black) {
    // 存在回跳地址就返回
    router.back()
  } else {
    // 不存在就返回首页，使用router.place跳转，不能返回
    router.push('/')
  }
}

defineProps<{
  title: string
  right: string
}>()

const emit = defineEmits<{
  (e: 'click-right'): void
}>()
</script>

<template>
  <van-nav-bar
    fixed
    left-arrow
    :title="title"
    :right-text="right"
    @click-left="onClickLeft"
    @click-right="emit('click-right')"
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: #111;
    }
    &__text {
      font-size: 15px;
      color: pink;
    }
  }
}
</style>
