<template>
  <view :class="`wd-grid ${customClass}`" :style="gutter ? 'padding-left:' + gutter + 'px;' + 'padding-bottom:' + gutter + 'px;' : ''">
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
import { getCurrentInstance, provide, ref, watch } from 'vue'
const nextTick = () => new Promise((resolve) => setTimeout(resolve, 20))

interface Props {
  customClass?: string
  clickable: boolean
  square: boolean
  column?: number
  border: boolean
  bgColor: string
  gutter?: number
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  clickable: false,
  square: false,
  border: false,
  bgColor: ''
})

const children: any[] = [] // 子组件
const { proxy } = getCurrentInstance() as any

watch(
  () => props.column,
  (val, oldVal) => {
    if (val === oldVal) return
    if (!val || val <= 0) {
      throw Error(
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

// 子元素个数
const childCount = ref<number>(0)

/**
 * 设置子项
 * @param child
 */
function setChild(child) {
  const hasChild = children.findIndex((grid) => {
    return grid.$.uid === child.$.uid
  })
  if (hasChild <= -1) {
    children.push(child)
    childCount.value = childCount.value + 1
  } else {
    children[hasChild] = child
  }
}

function init() {
  if (!children) return

  children.forEach((item, index) => {
    if (props.border) {
      const { column } = props
      if (column) {
        const isRightItem = children.length - 1 === index || (index + 1) % column === 0
        const isFirstLine = index + 1 <= column

        isFirstLine && item.$.exposed.setiIemClass('is-first')
        isRightItem && item.$.exposed.setiIemClass('is-right')
        !isFirstLine && item.$.exposed.setiIemClass('is-border')
      } else {
        item.$.exposed.setiIemClass('is-first')
      }
      children.length - 1 === index && item.$.exposed.setiIemClass(item.$.exposed.itemClass.value + ' is-last')
    }
    item.$.exposed.init()
  })
}

defineExpose({
  children,
  setChild
})

provide('wdgrid', proxy)
provide('childCount', childCount)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
