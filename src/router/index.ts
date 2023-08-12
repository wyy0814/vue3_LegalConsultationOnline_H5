import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from '@/stores'

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由配置
  routes
})

// 前置路由守卫 => 实现页面访问拦截
router.beforeEach((to) => {
  const store = useUserStore()
  if (!store.user.token && !['/login', '/401'].includes(to.path))
    return '/login'
})
export default router
