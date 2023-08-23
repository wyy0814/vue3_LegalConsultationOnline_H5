/* 
    为项目全局组件声明类型，以在项目中使用该组件时提供类型检查和补全支持
*/
import LawNavBar from '@/components/law-nav-bar.vue'
import LawIcon from '@/components/law-icon.vue'
import lawRadioBtn from '@/components/law-radio-btn.vue'

// 扩展全局模块的类型定义
declare module 'vue' {
  // 通过定义一个新的接口'GlobalComponents'来添加全局组件的类型信息
  interface GlobalComponents {
    /* 
      以下语句：告诉TypeScript，在全局模块中添加了一个名为“LawNavBar”，其类型与导入的“LawNavBar”组件的类型相同
      这样，当我们在项目中使用<LawNavBar>时，TypeScript将能够识别该组件，知道他是一个全局注册的组件，并提供正确的类型推断和补全
    */
    LawNavBar: typeof LawNavBar
    LawIcon: typeof LawIcon
    lawRadioBtn: typeof lawRadioBtn
  }
}
