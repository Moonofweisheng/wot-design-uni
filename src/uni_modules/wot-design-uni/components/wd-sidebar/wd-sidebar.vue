<template>
  <view :class="`wd-sidebar ${customClass}`" :style="customStyle">
    <slot></slot>
    <view class="wd-sidebar__padding"></view>
  </view>
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
import { useChildren } from '../composables/useChildren'
import { SIDEBAR_KEY } from './types'

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

const { linkChildren } = useChildren(SIDEBAR_KEY)
linkChildren({ props, setChange })

const emit = defineEmits(['change', 'update:modelValue'])

/**
 * 子项状态变更
 * @param child 子项
 */
function setChange(value: number | string, label: string) {
  emit('update:modelValue', value)
  emit('change', { value, label })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
