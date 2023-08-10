/* 
  创建pinia实例并导出
*/
import { createPinia } from 'pinia'
// 导入数据持久化插件
import persist from 'pinia-plugin-persistedstate'

// 创建pinia实例
const pinia = createPinia()

// 注册持久化插件
pinia.use(persist)

// 导出pinia实例
export default pinia

// 统一导出modules中的所有store仓库
// 这样以后引用时只用写‘@/store'而不用后面跟更具体地路径
export * from './modules/user'
