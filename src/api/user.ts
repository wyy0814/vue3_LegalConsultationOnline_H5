import type { User, UserInfo, PatientList, Patient } from '@/types/user'
import { request } from '@/utils/request'

// 密码登录
export const loginByPassword = (mobile: string, password: string) =>
  request.post<User>('/login/password', { mobile, password })

// 获取个人详情信息
export const userInfo = () => request.get<UserInfo>('/patient/myUser')

// 获取用户信息列表
export const getPatientList = () => request<PatientList>('/patient/mylist')

// 添加用户信息
export const addPatient = (patient: Patient) =>
  request.post('patient/add', patient)

// 删除用户信息
export const delPatient = (patient: Patient.value.id) =>
  request.del('patient/del', patient)
