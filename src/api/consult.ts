import type {
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  DoctorPage,
  TopDep
} from '@/types/consult'
import { request } from '@/utils/request'

// 获取法律知识列表
export const getKnowledgePage = (params: KnowledgeParams) =>
  request.get<KnowledgePage>('/patient/home/knowledge', params)

export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', params)

// 获取推荐关注律师接口函数
export const followLawyers = (params: PageParams) =>
  request.get<DoctorPage>('/home/page/doc', params)

// 获取选择咨询方向的返回数据
export const getAllDep = () => request<TopDep[]>('/dep/all')
