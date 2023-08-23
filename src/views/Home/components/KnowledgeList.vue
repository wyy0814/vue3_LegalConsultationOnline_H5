<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 知识列表数据 -->
      <knowledge-card
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></knowledge-card>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
import { ref } from 'vue'
import type {
  KnowledgeType,
  KnowledgeList,
  KnowledgePage,
  KnowledgeParams
} from '@/types/consult'
import { getKnowledgePage } from '@/api/consult'

// 接收父组件穿过来的文章列表的类型
const props = defineProps<{ type: KnowledgeType }>()

// 列表数据
const list = ref<KnowledgeList>([])
// 列表加载状态：true 加载中 | false 加载完成（多次触发）
const loading = ref(false)
// 全部数据是否已经全部加载： false 还有数据 | true 全部加载完成
const finished = ref(false)

// 发送请求所要携带的分页参数
const params = {
  type: props.type, //频道类型
  current: 1, //请求的页码
  pageSize: 10 //每页多少条数据
}
// 加载数据的函数:1.页面打开后默认执行一次 2. 用户每次滚动到底部会再次执行
const onLoad = async () => {
  // 加载更多
  const { data } = await getKnowledgePage(params)
  // 把当前页数据追加到list列表中
  list.value.push(...data.rows)
  // 加载状态结束
  loading.value = false

  // 数据全部加载完成
  if (list.value.length >= 30) {
    finished.value = true
  } else {
    //数据没有加载完
    params.current++
  }
}
</script>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
