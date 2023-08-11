import { Tab, Tabbar } from 'vant'

const routes = [
  {
    path: '/test',
    component: () => import('@/views/test/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  // Tabbar页面
  {
    // 父路由:layout公共布局页面
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      { path: '/home', component: () => import('@/views/home/index.vue') },
      {
        path: '/article',
        component: () => import('@/views/article/index.vue')
      },
      { path: '/notify', component: () => import('@/views/notify/index.vue') },
      { path: '/user', component: () => import('@/views/user/index.vue') }
    ]
  }
]
export default routes
