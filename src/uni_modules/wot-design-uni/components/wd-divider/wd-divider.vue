<template>
  <view :class="rootClass" :style="rootStyle">
    <slot v-if="!vertical"></slot>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-divider',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, useSlots, type CSSProperties } from 'vue'
import { dividerProps } from './types'
import { objToStyle } from '../common/util'

const props = defineProps(dividerProps)
const slots = useSlots()

const rootStyle = computed(() => {
  const { color, customStyle } = props
  const style: CSSProperties = {}
  if (color) {
    style.color = color
  }
  return `${objToStyle(style)}${customStyle}`
})

const rootClass = computed(() => {
  const prefixCls = 'wd-divider'
  const classes: Record<string, boolean> = {
    [prefixCls]: true,
    ['is-dashed']: props.dashed,
    ['is-hairline']: props.hairline,
    [`${prefixCls}--vertical`]: props.vertical,
    [`${prefixCls}--center`]: !props.vertical && props.contentPosition === 'center' && !!slots.default,
    [`${prefixCls}--left`]: !props.vertical && props.contentPosition === 'left',
    [`${prefixCls}--right`]: !props.vertical && props.contentPosition === 'right',
    [props.customClass]: !!props.customClass
  }
  return classes
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
