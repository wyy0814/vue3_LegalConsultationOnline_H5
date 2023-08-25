<script setup lang="ts">
import type { ConsultIllness } from '../../types/consult'
import { ref, computed, onMounted } from 'vue'
import { useConsultStore } from '../../stores/modules/consult'
import { useRouter } from 'vue-router'
import { Dialog } from 'vant'
// import { IllnessTime } from '../../enums'

const timeOptions = [
  { label: '一周内', value: 0 },
  { label: '一月内', value: 1 },
  { label: '半年内', value: 2 },
  { label: '大于半年', value: 3 }
]
const flagOptions = [
  { label: '就诊过', value: 1 },
  { label: '没就诊过', value: 0 }
]

// 记录问题描述:基本情况,发生时间,是否咨询过
const form = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})

// 保存问题描述到pinia并跳转到用户选择页面
const disabled = computed(
  () =>
    !form.value.illnessDesc ||
    form.value.illnessTime === undefined ||
    form.value.consultFlag === undefined
)
const store = useConsultStore()
const router = useRouter()
const next = () => {
  // 保存问题描述到pinia
  store.setIllness(form.value)
  // 跳转到用户选择页面
  router.push('/user/patient?isSel=1') //isSel=1代表用户档案作为选择患者使用
}

// 用户填完问题描述后把页面关了或者从下一个页面返回,可以快速基于之前地数据进行修改
onMounted(() => {
  /* 
    每次进入到问题描述页面:
        1. 判断store中是否存储地是否有问题描述信息
        2. 如果有就给用户提示,是否恢复之前地填写
  */
  if (store.consult.illnessDesc) {
    Dialog.confirm({
      title: '温馨提示',
      message: '是否恢复之前填写地病情数据',
      closeOnPopstate: false //是否在页面回退时自动关闭,默认值时true
    })
      .then(() => {
        // 点击确定--帮我恢复
        const { illnessDesc, illnessTime, consultFlag } = store.consult
        form.value = { illnessDesc, illnessTime, consultFlag }
      })
      .catch(() => {
        console.log('取消恢复')
      })
  }
})
</script>

<template>
  <div class="consult-illness-page">
    <law-nav-bar title="图文咨询" />
    <!-- 律师提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线律师</p>
        <p class="tip">
          请尽可能地详细描述你的所要咨询的问题，需要我提供什么样的帮助
        </p>
        <p class="safe">
          <law-icon name="consult-safe" /><span>内容仅律师可见</span>
        </p>
      </div>
    </div>
    <!-- 收集信息 -->
    <div class="illness-form">
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="form.illnessDesc"
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <law-radio-btn :options="timeOptions" v-model="form.illnessTime" />
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <law-radio-btn :options="flagOptions" v-model="form.consultFlag" />
      </div>
    </div>

    <!-- 下一步按钮:保存问题描述到pinia并跳转到用户选择页面 -->
    <van-button :disabled="disabled" block round type="primary" @click="next"
      >下一步</van-button
    >
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;
}
.illness-tip {
  display: flex;
  padding: 15px;
  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}
.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}
</style>
