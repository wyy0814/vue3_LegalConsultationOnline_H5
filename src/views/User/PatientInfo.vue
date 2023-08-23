<template>
  <div class="patient-page">
    <!-- 之前自己封装的通用导航栏 -->
    <law-nav-bar :title="isChange ? '选择患者' : '家庭档案'"></law-nav-bar>
    <!-- 头部选择提示 -->
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <!-- 用户列表 -->
    <div class="patient-list">
      <!-- 已添加的用户列表 -->
      <div
        class="patient-item"
        v-for="item in patientList"
        :key="item.id"
        @click="selectedPatient(item)"
        :class="{ selected: patientId === item.id }"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{
            item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2')
          }}</span>
          <span>{{ item.gender === 0 ? '女' : '男' }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <!-- 点击修改的图标 -->
        <div @click="showPopup(item)" class="icon">
          <law-icon name="user-edit" />
        </div>
        <!-- 默认患者显示div.tag元素 -->
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>

      <!-- 点击新增患者击 -->
      <div
        class="patient-add"
        v-if="patientList.length < 6"
        @click="showPopup()"
      >
        <law-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <!-- 小提示 -->
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!-- 患者选择下一步 -->
    <div class="patient-next" v-if="patientId">
      <van-button type="primary" round block v-if="isChange" @click="next"
        >下一步</van-button
      >
    </div>

    <!-- 新增患者弹层 -->
    <van-popup v-model:show="show" position="right">
      <!-- 放置弹层内容 -->
      <!-- 导航栏 -->
      <law-nav-bar
        :title="patient.id ? '编辑用户' : '添加用户'"
        right-text="保存"
        @click-right="submit"
        :back="closeDialog"
      >
      </law-nav-bar>
      <!-- 新增用户表单 -->
      <van-form autocomplete="off">
        <van-field
          v-model="patient.name"
          label="真实姓名"
          placeholder="请输入真实姓名"
        />
        <van-field
          v-model="patient.idCard"
          label="身份证号"
          placeholder="请输入身份证号"
        />
        <van-field label="性别">
          <!-- 不是输入框的话，通过自定义插槽自定义表单项 -->
          <!-- 单选按钮组件 -->
          <template #input>
            <law-radio-btn
              :options="options"
              v-model="patient.gender"
            ></law-radio-btn>
          </template>
        </van-field>
        <van-field label="默认咨询人">
          <template #input>
            <!-- 需要单独绑定一个布尔值变量 -->
            <van-checkbox round v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="patient.id">
        <van-action-bar-button
          type="danger"
          text="删除"
          @click="remove"
        ></van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>

  <!-- 测试单选列表组件 -->
  <!-- <law-radio-btn v-model="patient.gender" :options="options"></law-radio-btn> -->
</template>

<script setup lang="ts">
import { getPatientList, addPatient, delPatient } from '@/api/user'
import type { PatientList, Patient } from '@/types/user'
import { Dialog, Toast } from 'vant'
import { computed, onMounted, ref } from 'vue'
import Validator from 'id-validator'
import { useRoute, useRouter } from 'vue-router'
// import { useConsultStore } from '@/stores'

const router = useRouter()
// const store = useConsultStore()

/* 
  一、咨询人列表的数据渲染
 */
// 定义响应变量用于接收请求返回来的用户列表
const patientList = ref<PatientList>([])
// 1. 定义获取用户列表方法
const loadList = async () => {
  const res = await getPatientList()
  patientList.value = res.data
  // if (isChange.value && patientList.value.length) {
  //   const defaultPatient = patientList.value.find(
  //     (item) => item.defaultFlag === 1
  //   )
  //   if (defaultPatient) {
  //     patientId.value = defaultPatient.id
  //   } else {
  //     patientId.value = patientList.value[0].id
  //   }
  // }
}
// 2. 组件挂载后加载列表数据
onMounted(() => {
  loadList()
})

/* 
  二、新增患者
 */
// 定义响应变量控制新增用户弹层显隐
const show = ref(false)
// 定义打开新增用户弹层函数
const showPopup = (item?: Patient) => {
  //   // 如果存在，则是编辑
  //   if (item) {
  //     const { id, gender, name, idCard, defaultFlag } = item
  //     patient.value = { id, gender, name, idCard, defaultFlag }
  //   } else {
  // 重置新增用户表单数据为默认值
  patient.value = { ...initPatient }
  //   }
  show.value = true
}
// 关闭弹层
const closeDialog = () => {
  show.value = false
}

// 点击导航栏按钮保存=》提交
/* 
  流程：
    1.校验患者名字和身份证是否存在以及格式是否正确
    2.校验通过调用api函数新增患者
*/
// 放外面,不然每次都要new一下实例化
const validate = new Validator()
const submit = async () => {
  if (!patient.value.name)
    return Toast({
      message: '请输入真实姓名',
      position: 'top'
    })
  if (!patient.value.idCard)
    return Toast({
      message: '请输入身份证号',
      position: 'top'
    })
  // 通过id-validator插件校验身份证格式
  if (!validate.isValid(patient.value.idCard))
    return Toast({
      message: '身份证格式错误',
      position: 'top'
    })
  const { sex } = validate.getInfo(patient.value.idCard)
  if (patient.value.gender !== sex)
    return Toast({
      message: '性别和身份证不符',
      position: 'top'
    })
  try {
    await addPatient(patient.value)
    closeDialog()
    loadList()
    Toast.success('保存成功')
  } catch (error) {
    console.log(error)
  }
  // 添加/编辑
  // patient.value.id
  //   ? await editPatient(patient.value)
  //   : await addPatient(patient.value)
  // show.value = false
  // loadList()
  // Toast.success(patient.value.id ? '编辑成功' : '添加成功')
}

const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]
// const gender = ref(1)
// 准备一个患者表单数据默认值
const initPatient: Patient = {
  name: '', //咨询人名字
  idCard: '', //咨询人身份证
  gender: 1, //咨询人性别
  defaultFlag: 0 //是否是默认咨询人 0不是，1是
}
// 新增咨询者表单数据
const patient = ref<Patient>({ ...initPatient })

// 是否是选择患者
const route = useRoute()
const isChange = computed(() => route.query.isChange === '1')

// 默认值需要转换：监控defaultFlag变化，把它选中的布尔值转换成0或1
const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0
  }
})

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
  // store.setPatient(patientId.value)
  router.push('/consult/pay')
}

/* 
  测试单选列表组件 
*/
// 性别选项
// const options = [
//   { label: '男', value: 1 },
//   { label: '女', value: 0 }
// ]
// // 存储选中的性别，用于单选高亮
// const gender = ref(1)
</script>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
}

.patient-change {
  padding: 15px;

  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }

  > p {
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
