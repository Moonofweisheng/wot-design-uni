<template>
  <view :class="['wd-badge', customClass]" :style="customStyle">
    <slot></slot>
    <view
      v-if="isBadgeShow"
      :class="['wd-badge__content', 'is-fixed', type ? 'wd-badge__content--' + type : '', isDot ? 'is-dot' : '']"
      :style="contentStyle"
    >
      {{ content }}
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-badge',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { badgeProps } from './types'

const props = defineProps(badgeProps)
const content = ref<number | string | null>(null)

watch(
  [() => props.modelValue, () => props.max, () => props.isDot],
  () => {
    notice()
  },
  { immediate: true, deep: true }
)

const contentStyle = computed(() => {
  return `background-color: ${props.bgColor};top:${props.top || 0}px;right:${props.right || 0}px`
})

// 是否展示徽标数字
const isBadgeShow = computed(() => {
  let isBadgeShow: boolean = false
  if (!props.hidden && (content.value || (content.value === 0 && props.showZero) || props.isDot)) {
    isBadgeShow = true
  }
  return isBadgeShow
})

function notice() {
  if (props.isDot) return
  let value = props.modelValue
  const max = props.max
  if (value && max && typeof value === 'number' && !Number.isNaN(value) && !Number.isNaN(max)) {
    value = max < value ? `${max}+` : value
  }
  content.value = value
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
