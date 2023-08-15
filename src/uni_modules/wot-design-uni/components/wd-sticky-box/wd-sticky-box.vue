<template>
  <view style="position: relative">
    <view :class="`wd-sticky-box ${props.customClass}`">
      <wd-resize @resize="resizeHandler">
        <slot />
      </wd-resize>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-sticky-box',
  options: {
    addGlobalClass: true,
    // virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

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

const stickyList: any[] = [] // 子元素sticky列表

const { proxy } = getCurrentInstance() as any
const instance = getCurrentInstance() as any

provide('box-height', height)
provide('box-width', width)
provide('observerForChild', observerForChild)

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
  for (const [uid] of temp) {
    const child = stickyList.find((sticky) => {
      return sticky.$.uid === uid
    })
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
  const observer = observerMap.value.get(child.$.uid)
  if (!observer) return
  observer.disconnect()
  observerMap.value.delete(child.$.uid)
}
/**
 * @description 为 wd-sticky 创建监听器
 * @param child
 */
function createObserver(child) {
  const observer = uni.createIntersectionObserver(instance)
  observerMap.value.set(child.$.uid, observer)
  return observer
}
/**
 * @description 为单个 wd-sticky 监听 viewport
 * @param child sticky
 */
function observerForChild(child) {
  const hasChild = stickyList.find((sticky) => {
    return sticky.$.uid === child.$.uid
  })
  if (!hasChild) {
    stickyList.push(child)
  }
  deleteObserver(child)
  const observer = createObserver(child)

  const exposed = child.$.exposed
  const offset = exposed.height.value + exposed.offsetTop

  // 如果 wd-sticky 比 wd-sticky-box还大，"相对吸顶"无任何意义,此时强制吸顶元素回归其占位符
  if (height.value <= exposed.height.value) {
    exposed.setPosition(false, 'absolute', 0)
  }
  observer.relativeToViewport({ top: -offset }).observe('.wd-sticky-box', (result) => {
    scrollHandler(exposed, result)
  })
  getRect('.wd-sticky-box', false, proxy).then((res: any) => {
    // 当 wd-sticky-box 位于 viewport 外部时不会触发 observe，此时根据位置手动修复位置。
    if (res.bottom <= offset) scrollHandler(exposed, { boundingClientRect: res })
  })
}
/**
 * @description 为子节点监听 viewport，处理子节点的相对吸顶逻辑
 * @param {Object} exposed wd-sticky实例暴露出的事件
 * @param {Object} boundingClientRect 目标节点各个边在viewport中的坐标
 */
function scrollHandler(exposed, { boundingClientRect }) {
  const offset = exposed.height.value + exposed.offsetTop
  if (boundingClientRect.bottom <= offset) {
    // 父元素即将被吸顶元素遮盖，将吸顶元素固定到父元素底部
    exposed.setPosition(true, 'absolute', boundingClientRect.height - exposed.height.value)
  } else if (boundingClientRect.top <= offset && boundingClientRect.bottom > offset) {
    // wd-sticky 已经完全呈现了 viewport 中了，
    // 此时没有必要再相对 wd-sticky-box 吸顶了
    if (exposed.state.value === 'normal') return
    // 顶元素开始遮盖不住父元素了，将吸顶元素恢复到吸顶模式
    exposed.setPosition(false, 'fixed', exposed.offsetTop)
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
