<template>
  <view :class="`wd-sidebar ${customClass}`"></view>
</template>

<script lang="ts">
export default {
  name: 'wd-sidebar',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
interface Props {
  modelValue?: number | string
  // 自定义样式
  customStyle?: string
  // 自定义样式类
  customClass?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  customStyle: '',
  customClass: ''
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
