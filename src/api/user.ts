import type { User, UserInfo } from '@/types/user'
import { request } from '@/utils/request'

// 密码登录
export const loginByPassword = (mobile: string, password: string) =>
  request.post<User>('/login/password', { mobile, password })

// 获取个人信息
export const userInfo = () => request.get<UserInfo>('/patient/myUser')
