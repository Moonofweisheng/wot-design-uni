<template>
  <view :class="`wd-sticky-box ${props.customClass}`">
    <wd-resize @resize="resizeHandler">
      <slot />
    </wd-resize>
  </view>
</template>
<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, provide, ref } from 'vue'
import { getRect } from '../common/util'

interface Props {
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: ''
})

const observerMap = ref<Map<any, any>>(new Map())
const height = ref<number>(0)
const width = ref<number>(0)

const { proxy } = getCurrentInstance() as any
const instance = getCurrentInstance() as any

provide('sticky-box', { height, width, observerForChild })

onBeforeMount(() => {
  observerMap.value = new Map()
})

/**
 * @description wd-sticky-box 尺寸发生变化时，重新监听所有的viewport
 */
function resizeHandler(detail) {
  // 相对的容器大小改变后，同步设置 wd-sticky-box 的大小
  width.value = detail.width
  height.value = detail.height
  // wd-sticky-box 大小变化时，重新监听所有吸顶元素
  const temp = observerMap.value
  observerMap.value = new Map()
  for (const [child] of temp) {
    observerForChild(child)
  }
  temp.forEach((observer) => {
    observer.disconnect()
  })
  temp.clear()
}
/**
 * @description 删除 wd-sticky 废弃的监听器
 * @param child
 */
function deleteObserver(child) {
  const observer = observerMap.value.get(child)
  if (!observer) return
  observer.disconnect()
  observerMap.value.delete(child)
}
/**
 * @description 为 wd-sticky 创建监听器
 * @param child
 */
function createObserver(child) {
  const observer = uni.createIntersectionObserver(instance)
  observerMap.value.set(child, observer)
  return observer
}
/**
 * @description 为单个 wd-sticky 监听 viewport
 * @param child sticky
 */
function observerForChild(child) {
  const offset = child.height.value + child.offsetTop
  deleteObserver(child)
  const observer = createObserver(child)
  // 如果 wd-sticky 比 wd-sticky-box还大，"相对吸顶"无任何意义,此时强制吸顶元素回归其占位符
  if (height.value <= child.height.value) {
    child.openBox.value = false
    child.position.value = 'absolute'
    child.top.value = 0
  }
  observer.relativeToViewport({ top: -offset }).observe('.wd-sticky-box', (result) => scrollHandler(child, result))
  getRect('.wd-sticky-box', false, proxy).then((res: any) => {
    // 当 wd-sticky-box 位于 viewport 外部时不会触发 observe，此时根据位置手动修复位置。
    if (res.bottom <= offset) scrollHandler(child, { boundingClientRect: res })
  })
}
/**
 * @description 为子节点监听 viewport，处理子节点的相对吸顶逻辑
 * @param {Object} child wd-sticky实例
 * @param {Object} boundingClientRect 目标节点各个边在viewport中的坐标
 */
function scrollHandler(child, { boundingClientRect }) {
  const offset = child.height.value + child.offsetTop
  if (boundingClientRect.bottom <= offset) {
    // 父元素即将被吸顶元素遮盖，将吸顶元素固定到父元素底部
    child.openBox.value = true
    child.position.value = 'absolute'
    child.top.value = boundingClientRect.height - child.height.value
  } else if (boundingClientRect.top <= offset && boundingClientRect.bottom > offset) {
    // wd-sticky 已经完全呈现了 viewport 中了，
    // 此时没有必要再相对 wd-sticky-box 吸顶了
    if (child.state.value === 'normal') return
    // 顶元素开始遮盖不住父元素了，将吸顶元素恢复到吸顶模式
    child.openBox.value = false
    child.position.value = 'fixed'
    child.top.value = child.offsetTop
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
