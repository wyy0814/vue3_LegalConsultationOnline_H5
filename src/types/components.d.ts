/* 
    为项目全局组件声明类型
*/
import LawNavBar from '@/components/law-nav-bar.vue'
import LawIcon from '@/components/law-icon.vue'

declare module 'vue' {
  interface GlobalComponents {
    LawNavBar: typeof LawNavBar
    LawIcon: typeof LawIcon
  }
}
