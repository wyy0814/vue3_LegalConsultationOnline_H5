import { Tab, Tabbar } from 'vant'

const routes = [
  {
    path: '/test',
    component: () => import('@/views/test/index.vue'),
    meta: {
      title: '测试页'
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页'
    }
  },
  // Tabbar页面
  {
    // 父路由:layout公共布局页面
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/article',
        component: () => import('@/views/article/index.vue'),
        meta: {
          title: '法律百科'
        }
      },
      {
        path: '/notify',
        component: () => import('@/views/notify/index.vue'),
        meta: {
          title: '消息'
        }
      },
      {
        path: '/user',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '个人中心'
        }
      }
    ]
  },
  {
    path: '/user/patient',
    component: () => import('@/views/User/PatientPage.vue'),
    meta: { title: '用户管理' }
  }
]
export default routes
