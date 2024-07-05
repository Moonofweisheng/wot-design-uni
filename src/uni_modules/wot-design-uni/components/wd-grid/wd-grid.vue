<template>
  <view :class="`wd-grid ${customClass}`" :style="rootStyle">
    <!-- 默认插入的 item -->
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-grid',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useChildren } from '../composables/useChildren'
import { GRID_KEY, gridProps } from './types'
import { debounce } from '../common/util'
const nextTick = () => new Promise((resolve) => setTimeout(resolve, 20))

const props = defineProps(gridProps)

// 子元素个数
const { linkChildren, children } = useChildren(GRID_KEY)
linkChildren({ props })

watch(
  () => props.column,
  (val, oldVal) => {
    if (val === oldVal) return
    if (!val || val <= 0) {
      console.error(
        'The number of columns attribute value is invalid. The attribute must be greater than 0 and it is not recommended to use a larger value attribute.'
      )
    }
    oldVal && init()
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.border,
  (val) => {
    val &&
      Promise.resolve()
        .then(nextTick)
        .then(() => {
          init()
        })
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => children,
  () => {
    handleChildrenChange()
  },
  {
    deep: true
  }
)

const rootStyle = computed(() => {
  return `${props.gutter ? 'padding-left:' + props.gutter + 'px;' + 'padding-bottom:' + props.gutter + 'px;' : ''}${props.customStyle}`
})

const handleChildrenChange = debounce(() => {
  init()
}, 50)

function init() {
  if (!children) return
  children.forEach((item, index) => {
    if (props.border) {
      const { column } = props
      if (column) {
        const isRightItem = children.length - 1 === index || (index + 1) % column === 0
        const isFirstLine = index + 1 <= column
        isFirstLine && item.$.exposed!.setiIemClass('is-first')
        isRightItem && item.$.exposed!.setiIemClass('is-right')
        !isFirstLine && item.$.exposed!.setiIemClass('is-border')
      } else {
        item.$.exposed!.setiIemClass('is-first')
      }
      children.length - 1 === index && item.$.exposed!.setiIemClass(item.$.exposed!.itemClass.value + ' is-last')
    }
    item.$.exposed!.init()
  })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
