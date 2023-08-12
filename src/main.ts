import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

// Toast组件是以函数形式提供的，如果项目中使用unpugin-vue-components插件来自动引入组件样式，则无法正确识别Toast组件，因此需要手动引入Toast组件的样式
import 'vant/es/toast/style'
import 'vant/es/dialog/style'

// 注册图标
import 'virtual:svg-icons-register'

// 创建vue根实例
const app = createApp(App)

// 注册pinia和router
app.use(router)
app.use(pinia)

// 挂载渲染App根组件
app.mount('#app')
