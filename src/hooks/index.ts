/* 
    这里放全局可复用的钩子函数
    抽离技巧：
        1.相同部分直接拷贝
        2.不同部分以函数参数形式传入
 */
import type { Doctor, FollowType } from '@/types/consult'
import { followLawyers } from '@/api/consult'
import { Toast } from 'vant'
import { ref } from 'vue'

const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  //   点击执行follow
  const follow = async (doc: { id: string; likeFlag: 0 | 1 }) => {
    // 防止重复点击
    loading.value = true
    try {
      await followLawyers(doc.id, type)
      doc.likeFlag = doc.likeFlag === 1 ? 0 : 1
      Toast.success(doc.likeFlag === 1 ? '关注成功' : '取关成功')
    } finally {
      // catch是在try代码块出现错误才会执行,否则不执行
      //finally是try/catch结果如何或者tyr代码块执行成功或失败都会执行的代码块
      loading.value = false //关注成功或者都要关闭
    }
  }
  //   返回页面中需要使用的数据和函数
  return { loading, follow }
}

export { useFollow }
