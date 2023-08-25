<script setup lang="ts">
import { useConsultStore } from '@/stores/modules/consult'

const store = useConsultStore()
</script>

<template>
  <div class="consult-fast-page">
    <law-nav-bar title="极速咨询" right-text="咨询记录"></law-nav-bar>
    <div class="fast-logo">
      <img class="img" src="@/assets/consult-fast.png" alt="" />
      <p class="text"><span>20s</span> 快速匹配专业律师</p>
    </div>
    <div class="fast-type">
      <router-link
        @click="store.setIllnessType(1)"
        to="/consult/dep"
        class="item"
      >
        <law-icon class="pic" name="consult-doctor"></law-icon>
        <div class="info">
          <p>高级图文问诊</p>
          <p>专家级资深律师</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </router-link>
      <router-link
        @click="store.setIllnessType(0)"
        to="/consult/dep"
        class="item"
      >
        <law-icon class="pic" name="consult-message"></law-icon>
        <div class="info">
          <p>普通图文问诊</p>
          <p>普通资深律师</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-fast-page {
  padding-top: 46px;
  .fast-logo {
    padding: 30px 0;
    text-align: center;
    .img {
      width: 240px;
    }
    .text {
      font-size: 16px;
      margin-top: 10px;
      > span {
        color: var(--cp-primary);
      }
    }
  }
  .fast-type {
    padding: 15px;
    .item {
      display: flex;
      padding: 16px;
      border-radius: 4px;
      align-items: center;
      margin-bottom: 16px;
      border: 0.5px solid var(--cp-line);
    }
    .pic {
      width: 40px;
      height: 40px;
    }
    .info {
      margin-left: 12px;
      flex: 1;
      > p:first-child {
        font-size: 16px;
        color: var(--cp-text1);
        margin-bottom: 4px;
      }
      > p:last-child {
        font-size: 13px;
        color: var(--cp-tag);
      }
    }
    .van-icon {
      color: var(--cp-tip);
    }
  }
}
</style>
