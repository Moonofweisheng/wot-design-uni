<!--
 * @Author: weisheng
 * @Date: 2023-06-12 18:40:58
 * @LastEditTime: 2023-07-14 11:36:50
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-steps\wd-steps.vue
 * 记得注释
-->
<template>
  <view :class="`wd-steps ${customClass} ${vertical ? 'is-vertical' : ''}`">
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-steps',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { getCurrentInstance, provide, watch } from 'vue'

interface Props {
  customClass?: string
  active: number
  vertical: boolean
  dot: boolean
  space?: string
  alignCenter: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  active: 0,
  vertical: false,
  dot: false,
  alignCenter: false
})

const children: any[] = [] // 子组件
const { proxy } = getCurrentInstance() as any

watch(
  () => props.active,
  () => {
    if (children && children.length) {
      children.forEach((child) => child.$.exposed.setIndexAndStatus())
    }
  },
  {
    deep: true,
    immediate: true
  }
)

provide('wdsteps', proxy)

/**
 * 设置子项
 * @param child
 */
function setChild(child) {
  const hasChild = children.findIndex((drop) => {
    return drop.$.uid === child.$.uid
  })
  if (hasChild <= -1) {
    children.push(child)
  } else {
    children[hasChild] = child
  }
  let timer = setTimeout(() => {
    clearTimeout(timer)
    const { vertical, dot, alignCenter } = props
    const canAlignCenter = !vertical && alignCenter
    child.$.exposed.setStyleFromParent(vertical, dot, canAlignCenter)
    children.forEach((child) => child.$.exposed.setIndexAndStatus())
  }, 30)
}

defineExpose({
  setChild,
  children
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
