<template>
  <div class="patient-page">
    <cp-nav-bar :title="isChange ? '选择患者' : '家庭档案'" />
    <!-- 头部选择提示 -->
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient-list">
      <div class="patient-item" v-for="item in patientList" :key="item.id" @click="selectedPatient(item)"
        :class="{ selected: patientId === item.id }">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2') }}</span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div @click="showPopup(item)" class="icon">
          <cp-icon name="user-edit" />
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <div class="patient-add" v-if="patientList.length < 6" @click="showPopup()">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!-- 患者选择下一步 -->
    <div class="patient-next" v-if="patientId">
      <van-button type="primary" round block v-if="isChange" @click="next">下一步</van-button>
    </div>
    <!-- 侧边栏 -->
    <van-popup v-model:show="show" position="right">
      <cp-nav-bar :title="patient.id ? '编辑患者' : '添加患者'" right-text="保存" @click-right="submit" :back="closeDialog">
      </cp-nav-bar>
      <!-- 表单 -->
      <van-form autocomplete="off">
        <van-field v-model="patient.name" label="真实姓名" placeholder="请输入真实姓名" />
        <van-field v-model="patient.idCard" label="身份证号" placeholder="请输入身份证号" />
        <van-field label="性别">
          <!-- 单选按钮组件 -->
          <template #input>
            <cp-radio-btn :options="options" v-model="gender"></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox round v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="patient.id">
        <van-action-bar-button type="danger" text="删除" @click="remove"></van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>
</template>

<script setup lang='ts'>
import { getPatientList, addPatient, editPatient, delPatient } from '@/api/user'
import type { PatientList, Patient } from '@/types/user'
import { Dialog, Toast } from 'vant';
import { computed, onMounted, ref } from 'vue'
import Validator from 'id-validator'
import { useRoute, useRouter } from 'vue-router'
import { useConsultStore } from '@/stores'

const router = useRouter()
const store = useConsultStore()

// 医患列表
const patientList = ref<PatientList>([])
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]
const gender = ref(1)
// 准备默认值
const initPatient: Patient = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
}
const patient = ref<Patient>({ ...initPatient })

// 是否是选择患者
const route = useRoute()
const isChange = computed(() => route.query.isChange === '1')

// 默认值需要转换
const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0
  }
})

const loadList = async () => {
  const res = await getPatientList()
  patientList.value = res.data
  if (isChange.value && patientList.value.length) {
    const defaultPatient = patientList.value.find(item => item.defaultFlag === 1)
    if (defaultPatient) {
      patientId.value = defaultPatient.id
    } else {
      patientId.value = patientList.value[0].id
    }
  }
}

const closeDialog = () => {
  show.value = false
}

// 打开侧滑栏
const show = ref(false)
const showPopup = (item?: Patient) => {
  // 如果存在，则是编辑
  if (item) {
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
  } else {
    patient.value = { ...initPatient }
  }
  show.value = true
}

// 保存
const submit = async () => {
  if (!patient.value.name) return Toast({
    message: '请输入真实姓名',
    position: 'top'
  })
  if (!patient.value.idCard) return Toast({
    message: '请输入身份证号',
    position: 'top'
  })
  const validate = new Validator()
  if (!validate.isValid(patient.value.idCard)) return Toast(
    {
      message: '身份证格式错误',
      position: 'top'
    })
  const { sex } = validate.getInfo(patient.value.idCard)
  if (patient.value.gender !== sex) return Toast({
    message: '性别和身份证不符',
    position: 'top'
  })
  // 添加/编辑
  patient.value.id ? await editPatient(patient.value) : await addPatient(patient.value)
  show.value = false
  loadList()
  Toast.success(patient.value.id ? '编辑成功' : '添加成功')
}

// 删除患者信息
const remove = async () => {
  if (patient.value.id) {
    await Dialog.confirm({
      title: '温馨提示',
      message: `您确认要删除 ${patient.value.name} 患者信息吗 ？`,
      cancelButtonText: '取消',
      confirmButtonText: '确认'
    })
    await delPatient(patient.value.id)
    show.value = false
    loadList()
    Toast.success('删除成功')
  }
}

// 存储点击选择的患者id作为标识
const patientId = ref<string>()
const selectedPatient = (item: Patient) => {
  if (isChange.value) {
    patientId.value = item.id
  }
}

const next = async () => {
  if (!patientId.value) return Toast('请选问诊择患者')
  store.setPatient(patientId.value)
  router.push('/consult/pay')
}

// 加载列表数据
onMounted(() => {
  loadList()
})
</script>

<style lang='scss' scoped>
.patient-page {
  padding: 46px 0 80px;
}

.patient-change {
  padding: 15px;

  >h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }

  >p {
    color: var(--cp-text3);
  }
}

.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}

.patient-list {
  padding: 15px;
}

.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;

  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;

    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;

      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }

      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }

  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }

  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);

    .icon {
      color: var(--cp-primary);
    }
  }
}

.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;

  .cp-icon {
    font-size: 24px;
  }
}

.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}

.patient-page {
  padding: 46px 0 80px;

  ::v-deep() {
    .van-popup {
      width: 100%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }
  }
}
</style>
