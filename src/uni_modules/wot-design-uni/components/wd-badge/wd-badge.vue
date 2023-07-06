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
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
  options: {
    virtualHost: true
  }
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

interface Props {
  modelValue: number | null
  bgColor?: string
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: string
  top?: number
  right?: number
  customClass?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: null
})
const content = ref<number | null>(null)

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
  if (value && max && !Number.isNaN(value) && !Number.isNaN(max)) {
    value = max < value ? max : value
  }
  content.value = value
}
</script>

<script></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
