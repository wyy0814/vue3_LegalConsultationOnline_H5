import type { User } from '@/types/user'
import { request } from '@/utils/request'

// 密码登录
export const loginByPassword = (mobile: string, password: string) =>
  request<User>.post('/login/password',  { mobile, password })
