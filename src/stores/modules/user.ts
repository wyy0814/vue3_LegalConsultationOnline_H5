/* 
    用户store：存储登录用户有关数据
*/

import type { User } from '@/types/user'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'consult-user',
  () => {
    //该全局变量用于存储用户信息，给予默认值空对象{}，并用as断言为User类型，避免报错
    const user = ref({} as User)

    //方法1：存储登录信息 => 用于登录
    const setUser = (userData: User) => {
      user.value = userData
    }
    //方法2:删除登录信息 => 用于退出登录
    const delUser = () => {
      user.value = {} as User
    }
    return { user, setUser, delUser }
  },
  {
    persist: true //第三个参数，开启数据持久化到本地
  }
)
