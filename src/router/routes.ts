const routes = [
  {
    path: '/test',
    component: () => import('@/views/test/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]
export default routes
