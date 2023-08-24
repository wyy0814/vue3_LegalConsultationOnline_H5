<script setup lang="ts">
import LawyersCard from './LawyersCard.vue'
import { ref, onMounted } from 'vue'
import { getDoctorPage } from '@/api/consult'
import type { DoctorList } from '@/types/consult'

// // 一、卡片根据不同屏幕大小自适应宽度(原生js方式)
// const width = ref(375)
// // 组件挂载之后监听一个事件
// onMounted(() => {
//   //获取手机宽度
//   width.value = window.innerWidth
//   // 设置一个监听手机屏幕宽度变化的监听事件
//   window.addEventListener('resize', () => {
//     width.value = window.innerWidth
//   })
// })

// 二、卡片根据不同屏幕大小自适应宽度(插件方式)
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

// 获取推荐律师列表请求的返回数据
const list = ref<DoctorList>([])
const getList = async () => {
  const { data } = await getDoctorPage({ current: 1, pageSize: 5 })
  console.log('律师列表:', data)
  // 默认展示5个律师
  list.value = data.rows
}
onMounted(() => {
  getList()
})
</script>

<template>
  <div class="follow-doctor">
    <!-- 头部 -->
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <!-- 医生列表 -->
    <div class="body">
      <!-- swipe 组件：单个医生的信息介绍 -->
      <van-swipe
        :width="(150 / 375) * width"
        :show-indicators="false"
        :loop="false"
      >
        <van-swipe-item v-for="item in list" :key="item.id">
          <!-- 单个律师介绍 -->
          <lawyers-card :item="item"> </lawyers-card>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
