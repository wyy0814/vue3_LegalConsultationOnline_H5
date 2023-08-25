/* 
    极速咨询store
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PartialConsult } from '@/types/consult'
import type { ConsultType } from '@/enums'

export const useConsultStore = defineStore(
  'law-consult',
  () => {
    // 定义全局共享数据
    const consult = ref<PartialConsult>({})
    // 1. 首页使用:记录咨询类型
    const setType = (type: ConsultType) => {
      consult.value.type = type
    }
    // 2. 咨询级别页面（专家律师/资深律师）：记录问诊级别
    const setIllnessType = (type: 0 | 1) => {
      consult.value.illnessType = type
    }
    // 3. 选择咨询方向页面:记录咨询方向
    const setDepId = (id: string) => {
      consult.value.DepId = id
    }
    // 4. 问题描述页面:记录咨询问题
    const setIllness = (
      illness: Pick<
        PartialConsult,
        'illnessDesc' | 'illnessTime' | 'pictures' | 'consultFlag'
      >
    ) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.pictures = illness.pictures
      consult.value.consultFlag = illness.consultFlag
    }
    // 5. 咨询者管理界面:记录选择咨询者ID
    const setConsultUser = (id: string) => {
      consult.value.patientId = id
    }

    // 6. 记录优惠卷ID
    const setCunpon = (id: string) => {
      consult.value.couponID = id
    }
    // 7. 咨询订单创建成功后,清空咨询记录
    const clear = () => {
      consult.value = {}
    }
    return {
      consult,
      setType,
      setIllnessType,
      setDepId,
      setIllness,
      setConsultUser,
      setCunpon,
      clear
    }
  },
  {
    persist: true
  }
)
