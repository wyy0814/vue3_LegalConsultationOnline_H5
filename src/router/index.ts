import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由配置
  routes
})

export default router
