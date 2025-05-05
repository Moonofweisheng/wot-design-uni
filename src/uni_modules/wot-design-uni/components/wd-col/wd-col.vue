<template>
  <view :class="['wd-col', span && 'wd-col__' + span, offset && 'wd-col__offset-' + offset, customClass]" :style="rootStyle">
    <!-- 每一列 -->
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-col',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useParent } from '../composables/useParent'
import { ROW_KEY } from '../wd-row/types'
import { colProps } from './types'
import { isDef } from '../common/util'

const props = defineProps(colProps)
const { parent: row } = useParent(ROW_KEY)

const rootStyle = computed(() => {
  const gutter = isDef(row) ? row.props.gutter || 0 : 0
  const padding = `${gutter / 2}px`
  const style = gutter > 0 ? `padding-left: ${padding}; padding-right: ${padding};background-clip: content-box;` : ''
  return `${style}${props.customStyle}`
})

watch([() => props.span, () => props.offset], () => {
  check()
})

function check() {
  const { span, offset } = props
  if (span < 0 || offset < 0) {
    console.error('[wot-design] warning(wd-col): attribute span/offset must be greater than or equal to 0')
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
