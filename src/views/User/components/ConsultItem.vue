<script setup lang="ts">
import type { ConsultOrderItem } from '@/types/consult'
import { OrderType } from '@/enums'
import { computed, ref } from 'vue'
import { cancelOrder, deleteOrder } from '@/api/consult'
import { Toast } from 'vant'
import { useShowPrescription } from '@/composable'
const { showPrescription } = useShowPrescription()

const props = defineProps<{ item: ConsultOrderItem }>()

// 控制更多操作显示
const showPopover = ref(false)
// 操作项
const actions = computed(() => [
  { text: '查看处方', disabled: !props.item.prescriptionId }, // 没有开处方不能查看
  { text: '删除订单' }
])
// 操作项的点击回调
const onSelect = (action: { text: string }, i: number) => {
  if (i === 0) {
    showPrescription(props.item.prescriptionId)
  }
  if (i === 1) {
    // 删除
    deleteConsultOrder(props.item)
  }
}

// 取消订单
const loading = ref(false)
const cancelConsultOrder = async (item: ConsultOrderItem) => {
  loading.value = true
  try {
    await cancelOrder(item.id)
    // 修改订单的状态
    item.status = OrderType.ConsultCancel
    item.statusValue = '已取消'
    Toast.success('取消成功')
  } catch (e) {
    Toast.fail('取消失败')
  } finally {
    loading.value = false
  }
}

// 删除订单
const emit = defineEmits<{
  (e: 'on-delete', id: string): void
}>()
const deleteLoading = ref(false)
const deleteConsultOrder = (item: ConsultOrderItem) => {
  deleteLoading.value = true
  deleteOrder(item.id)
    .then(() => {
      // 通知父组件更新列表
      emit('on-delete', item.id)
      Toast.success('删除成功')
      deleteLoading.value = false
    })
    .catch(() => {
      Toast.fail('删除失败')
      deleteLoading.value = false
    })
}

// 4. 支付
const show = ref(false)

</script>

<template>
  <div class="consult-item">
    <div class="head van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p>{{ item.docInfo?.name || '暂未分配医生' }}</p>
      <span :class="{
        orange: item.status === OrderType.ConsultPay,
        green: item.status === OrderType.ConsultChat
      }">{{ item.statusValue }}</span>
    </div>
    <div class="body" @click="$router.push(`/user/consult/${item.id}`)">
      <div class="body-row">
        <div class="body-label">病情描述</div>
        <div class="body-value">{{ item.illnessDesc }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">价格</div>
        <div class="body-value">¥ {{ item.payment }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">创建时间</div>
        <div class="body-value tip">{{ item.createTime }}</div>
      </div>
    </div>
    <!-- 1. 待支付：取消问诊+去支付 -->
    <div class="foot" v-if="item.status === OrderType.ConsultPay">
      <van-button class="gray" plain size="small" :loading="loading" @click="cancelConsultOrder(item)"
        round>取消问诊</van-button>
      <van-button type="primary" plain size="small" round :to="`/user/consult/${item.id}`">
        去支付
      </van-button>
    </div>
    <!-- 2. 待接诊：取消问诊+继续沟通 -->
    <div class="foot" v-if="item.status === OrderType.ConsultWait">
      <van-button class="gray" plain size="small" :loading="loading" @click="cancelConsultOrder(item)"
        round>取消问诊</van-button>
      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <!-- 3. 咨询中：查看处方（如果开了）+继续沟通 -->
    <div class="foot" v-if="item.status === OrderType.ConsultChat">
      <van-button v-if="item.prescriptionId" class="gray" plain size="small" round>
        查看处方
      </van-button>
      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>
    <!-- 4. 已完成：更多（查看处方，如果开了，删除订单）+问诊记录+（未评价?写评价:查看评价） -->
    <div class="foot" v-if="item.status === OrderType.ConsultComplete">
      <div class="more">
        <van-popover placement="top-start" v-model:show="showPopover" :actions="actions" @select="onSelect">
          <template #reference> 更多 </template>
        </van-popover>
      </div>
      <van-button class="gray" plain size="small" round :to="`/room?orderId=${item.id}`">
        问诊记录
      </van-button>
      <van-button v-if="!item.evaluateId" type="primary" plain size="small" round>
        去评价
      </van-button>
      <van-button v-else class="gray" plain size="small" round> 查看评价 </van-button>
    </div>
    <!-- 5. 已取消：删除订单+咨询其他医生 -->
    <div class="foot" v-if="item.status === OrderType.ConsultCancel">
      <van-button class="gray" plain size="small" :loading="deleteLoading" @click="deleteConsultOrder(item)"
        round>删除订单</van-button>
      <van-button type="primary" plain size="small" round to="/">咨询其他医生</van-button>
    </div>
  </div>
  <cp-pay-sheet v-model:show="show" :orderId="item.id" :actualPayment="item.payment" />
</template>
<style lang="scss" scoped>
.consult-item {
  border-radius: 4px;
  box-shadow: 0px 0px 22px 0px rgba(245, 245, 245, 0.1);
  background-color: #fff;
  margin-bottom: 10px;

  .head {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;

    .img {
      width: 20px;
      height: 20px;
    }

    >p {
      flex: 1;
      font-size: 15px;
      padding-left: 10px;
    }

    >span {
      color: var(--cp-tag);

      &.orange {
        color: #f2994a;
      }

      &.green {
        color: var(--cp-primary);
      }
    }
  }

  .body {
    padding: 15px 15px 8px 15px;

    .body-row {
      display: flex;
      margin-bottom: 7px;
    }

    .body-label {
      width: 62px;
      font-size: 13px;
      color: var(--cp-tip);
    }

    .body-value {
      width: 250px;

      &.tip {
        color: var(--cp-tip);
      }
    }
  }

  .foot {
    padding: 0 15px 15px 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .van-button {
      margin-left: 10px;
      padding: 0 16px;

      &.gray {
        color: var(--cp-text3);
        background-color: var(--cp-bg);
      }
    }

    .more {
      color: var(--cp-tag);
      flex: 1;
      font-size: 13px;
    }
  }
}
</style>
