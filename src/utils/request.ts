import { useUserStore } from '@/stores'
import axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'

// 新axios实例,基础配置
const baseURL = 'http://consult-api.itheima.net'
const request = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器:携带token
request.interceptors.request.use(
  // 第一个回调函数:统一添加token
  (config) => {
    // 获取store,用来从pinia拿到token
    const store = useUserStore()
    // 如果pinia中的token和headers都存在
    if (store.user?.token && config.headers) {
      // 往header中添加token
      config.headers['Authorization'] = `Bearer ${store.user?.token}`
    }
    return config
  },
  //   第二个回调函数:出错执行
  (err) => Promise.reject(err)
)

// 响应拦截器:剥离无效token,401拦截
request.interceptors.response.use(
  // 第一个回调函数:发请求成功(这里后台约定不管成功失败,除了401,都用200状态码表示成功)走这个函数
  (res) => {
    //后台约定,响应成功,但是code不是10000,是业务逻辑失败
    if (res.data?.code !== 10000) {
      Toast(res.data?.message) //消息提示
      return Promise.reject(res.data) //抛出一个Promise错误
    }
    // 业务逻辑成功,返回响应数据,作为axios成功的结果
    return res.data
  },
  // 第二个回调函数,401了,需要返回登录页
  (err) => {
    if (err.response.status === 401) {
      // 拿到store,删除用户信息
      const store = useUserStore()
      store.delUser()
      // 跳转到登录页,同时带上接口失效所在页面的地址,登录后完成回跳
      // router.currentRoute.value.fullPath当前访问页的path地址
      // fullpath和path的区别:fullpath会带上参数
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
  }
)

export { baseURL, request }
