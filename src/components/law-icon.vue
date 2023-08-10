<template>
  <svg aria-hidden="true" class="icon">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
}
</style>
