<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAllDep } from '../../api/consult'
import type { TopDep } from '../../types/consult'
import { useConsultStore } from '../../stores/modules/consult'

// 当前选中的一级方向
const active = ref(0)

// 1. 获取所有方向的数据(包含一级和二级)
const allDep = ref<TopDep[]>([])
const getAllDepApi = async () => {
  const { data } = await getAllDep()
  console.log(data)
  allDep.value = data
}
onMounted(() => {
  getAllDepApi()
})

// 2. 点击切换一级科室,动态渲染二级科室
const sunDep = computed(() => {
  return allDep.value[active.value]?.child
})

// 3. 点击二级方向记录选择科室的ID
const store = useConsultStore()
</script>

<template>
  <div class="consult-dep-page">
    <lar-nav-bar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item
          v-for="top in allDep"
          :key="top.id"
          :title="top.name"
        />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          @click="store.setDepId(sub.id)"
          v-for="sub in sunDep"
          :key="sub.id"
          to="/consult/illness"
          >{{ sub.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
  .wrapper {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;
    .sub-dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      > a {
        display: block;
        padding: 14px 30px;
        color: var(--cp-dark);
      }
    }
  }
}
</style>
