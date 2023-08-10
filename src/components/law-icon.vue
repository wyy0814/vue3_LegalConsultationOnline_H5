<template>
  <svg aria-hidden="true">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<style lang="scss" scoped></style>
