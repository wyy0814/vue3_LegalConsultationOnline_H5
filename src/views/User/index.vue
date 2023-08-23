<template>
  <div class="user-page">
    <!-- 头部展示 -->
    <div class="user-page-head">
      <div class="top">
        <van-image round fit="cover" :src="user.avatar" />
        <div class="name">
          <p>{{ user.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ user.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{ user.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ user.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{ user.couponNumber }}</p>
          <p>优惠券</p>
        </van-col>
      </van-row>
    </div>
    <!-- 咨询订单 -->
    <div class="user-page-order">
      <!-- 咨询订单-头部 -->
      <div class="head">
        <h3>药品订单</h3>
        <router-link to="/order"
          >全部订单 <van-icon name="arrow"
        /></router-link>
      </div>
      <!-- 咨询订单-列表 -->
      <!-- 看user.orderInfo是否存在,存在再渲染这个模板 -->
      <van-row v-if="user.orderInfo">
        <van-col span="6">
          <law-icon name="user-paid" />
          <p>待付款:{{ user.orderInfo.paidNumber }}</p>
        </van-col>
        <van-col span="6">
          <law-icon name="user-shipped" />
          <p>待发货:{{ user.orderInfo.receivedNumber }}</p>
        </van-col>
        <van-col span="6">
          <law-icon name="user-received" />
          <p>待收货:{{ user.orderInfo.shippedNumber }}</p>
        </van-col>
        <van-col span="6">
          <law-icon name="user-finished" />
          <p>已完成:{{ user.orderInfo.finishedNumber }}</p>
        </van-col>
      </van-row>
    </div>
    <!-- 快捷工具 -->
    <div class="user-page-group">
      <h3>快捷工具</h3>
      <!-- is-link开启链接,能够跳页面 -->
      <van-cell
        v-for="(item, i) in tools"
        :key="item.label"
        :title="item.label"
        :to="item.path"
        is-link
        :border="false"
      >
        <template #icon><law-icon :name="`user-tool-0${i + 1}`" /></template>
      </van-cell>
    </div>
    <!-- 退出登录 -->
    <a class="logout" href="javascript:;" @click="logout">退出登录</a>
  </div>
</template>

<script setup lang="ts">
import { userInfo } from '@/api/user'
import { ref, onMounted } from 'vue'
import type { UserInfo } from '@/types/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { Dialog } from 'vant'

/* 
  一、获取用户数据渲染展示
 */
// 定义响应变量存储用户数据
const user = ref({} as UserInfo)
// 获取用户数据
const getUserInfo = async () => {
  const { data } = await userInfo()
  console.log('用户数据', data)
  user.value = data
}
// 组件挂载
onMounted(() => {
  getUserInfo()
})

/* 
  二、快捷工具渲染
 */
const tools = [
  { label: '我的咨询', path: '/user/consult' },
  { label: '我的解答', path: '/' },
  { label: '咨询人管理', path: '/user/patient' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
]

/* 
  三、退出登录
 */
const store = useUserStore()
const router = useRouter() //use开头的钩子函数（自己创建的除外）只能在setup函数中使用
const logout = async () => {
  await Dialog.confirm({
    title: '温馨提示',
    message: '您确认要退出吗？'
  })
    .then(() => {
      // 确定走这个
      store.delUser()
      router.push('/login')
    })
    .catch(() => {
      // 取消走这个
    })
}
</script>

<style lang="scss" scoped>
.user-page {
  background-color: var(--cp-bg);
  min-height: calc(100vh - 50px);
  padding: 0 15px 65px;
  // 头部
  &-head {
    height: 200px;
    background: linear-gradient(
      180deg,
      rgba(44, 181, 165, 0.46),
      rgba(44, 181, 165, 0)
    );
    // background-color: yellow;
    margin: 0 -15px;
    padding: 0 15px;

    .top {
      display: flex;
      padding-top: 50px;
      align-items: center;

      .van-image {
        width: 70px;
        height: 70px;
      }

      .name {
        padding-left: 10px;

        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }

          &:last-child {
            margin-top: 10px;
            color: var(--cp-primary);
            font-size: 16px;
          }
        }
      }
    }

    .van-row {
      margin: 0 -15px;
      padding-top: 15px;

      p {
        text-align: center;

        &:first-child {
          font-size: 18px;
          font-weight: 500;
        }

        &:last-child {
          color: var(--cp-dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }
  // 订单
  &-order {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;

    .head {
      display: flex;
      justify-content: space-between;
      // height: 50px;
      line-height: 50px;
      padding: 0 15px;
      // background-color: pink;

      a {
        color: var(--cp-tip);
        // background-color: yellow;
        // line-height: 85px;
      }
    }

    .van-col {
      text-align: center;

      .cp-icon {
        font-size: 28px;
      }

      p {
        font-size: 12px;
        padding-top: 4px;
      }
    }
  }
  // 分组
  &-group {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;

    h3 {
      padding-left: 16px;
      line-height: 44px;
    }

    .van-cell {
      align-items: center;
    }

    .cp-icon {
      font-size: 17px;
      margin-right: 10px;
    }
  }
  // 退出登录
  .logout {
    display: block;
    margin: 20px auto;
    width: 200px;
    height: 30px;
    border-radius: 30px;
    font-size: 13px;
    line-height: 30px;
    text-align: center;
    background-color: #ffffff;
    color: #00a8ff;
  }
}
</style>
