<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const onClickLeft = () => {
  // TODO 点击左侧返回按钮
  if (props.back) {
    // return 组织代码往后运行 + 执行传入的back函数
    return props.back()
  }
  // 返回上次访问页面可能不存在?因为使用router.replace,不能返回
  if (history.state.black) {
    // 存在回跳地址就返回
    router.back()
  } else {
    // 不存在就返回首页，使用router.place跳转，不能返回
    router.push('/user')
  }
}

// 接收父传子变量
const props = defineProps<{
  title: string
  right?: string
  back?: () => void //接收一个back函数,自定义返回逻辑
}>()

// 子传父
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
      color: #888;
    }
    &__text {
      font-size: 15px;
      color: pink;
    }
  }
}
</style>
