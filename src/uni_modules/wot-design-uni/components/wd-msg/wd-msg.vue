<template>
  <view :class="rootClass" :style="rootStyle" @click="handleClick">
    <template v-if="isDef(props.src)">
      <wd-img :width="props.width" :height="props.height" :src="props.src" />
    </template>
    <wd-icon v-else :name="iconName" :color="props.color" :size="`${props.size}px`" />
    <view v-if="props.title" class="title">{{ props.title }}</view>
    <view v-if="isDef(props.desc)" class="desc">{{ props.desc }}</view>
    <slot></slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-msg',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { isDef, objToStyle } from '../common/util'
import { msgProps, type MsgType } from './types'

// 获取组件的 props 和 emit 函数
const props = defineProps(msgProps)
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// 图标名称映射表，提高性能和可维护性
const iconMap: Record<MsgType, string> = {
  success: 'check-circle-filled',
  warn: 'info-circle-filled',
  clear: 'close-circle-filled',
  waiting: 'time-filled'
}

// 计算图标名称
const iconName = computed(() => {
  return iconMap[props.type] || iconMap.success
})

// 计算根元素的类名
const rootClass = computed(() => {
  return `wd-msg ${props.customClass}`
})

// 计算根元素的样式
const rootStyle = computed(() => {
  return props.customStyle ? `${props.customStyle}` : ''
})

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
