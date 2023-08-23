<script setup lang="ts">
defineProps<{
  // 单选列表
  options: { label: string; value: string | number }[]
  //接收父组件中传来的gender，固定写法modelValue
  modelValue?: number | string
}>()

// 自定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', data: string | number): void
}>()
</script>

<template>
  <div class="law-radio-btn">
    <!-- 单选列表 -->
    <!-- 
      点击事件：子改父，修改父组件中gender的值
      emit(事件名，要更改的值)
     -->
    <a
      class="item"
      :class="{ active: modelValue === item.value }"
      href="javascript:;"
      v-for="(item, i) in options"
      :key="i"
      @click="emit('update:modelValue', item.value)"
      >{{ item.label }}</a
    >
  </div>
</template>

<style lang="scss" scoped>
.law-radio-btn {
  display: flex;
  flex-wrap: wrap;
  .item {
    height: 32px;
    min-width: 60px;
    line-height: 30px;
    padding: 0 14px;
    text-align: center;
    border: 1px solid var(--cp-bg);
    background-color: var(--cp-bg);
    margin-right: 10px;
    box-sizing: border-box;
    color: var(--cp-text2);
    margin-bottom: 10px;
    border-radius: 4px;
    transition: all 0.3s;

    // 选项选中添加的类名
    &.active {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
    }
  }
}
</style>
