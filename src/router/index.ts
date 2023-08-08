import { createRouter, createWebHistory } from 'vue-router'
import Test from '@/views/test/index.vue'

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由配置
  routes: [
    {
      path: '/test',
      component: Test
    }
  ]
})

export default router
