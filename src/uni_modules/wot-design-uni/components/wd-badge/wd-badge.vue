<!--
 * @Author: weisheng
 * @Date: 2023-06-12 18:40:59
 * @LastEditTime: 2023-08-15 15:47:51
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-badge\wd-badge.vue
 * 记得注释
-->
<template>
  <view :class="['wd-badge', customClass]">
    <slot></slot>
    <view
      v-if="!hidden && (content || content === 0 || isDot)"
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
type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
interface Props {
  modelValue: number | string | null
  bgColor?: string
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: BadgeType
  top?: number
  right?: number
  customClass: string
}
const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  modelValue: null
})
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

function notice() {
  if (props.isDot) return
  let value = props.modelValue
  const max = props.max
  if (value && max && typeof value === 'number' && !Number.isNaN(value) && !Number.isNaN(max)) {
    value = max < value ? max : value
  }
  content.value = value
}
</script>

<script></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
