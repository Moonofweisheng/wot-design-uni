<template>
  <view
    ref="elRef"
    class="wd-drag-sort-item"
    :class="[{ 'is-dragging-active': isDraggingActive }, customClass]"
    :style="[itemStyle, customStyle]"
    :data-index="index"
    :data-width="myRect.width"
    :data-height="myRect.height"
    :data-duration="duration"
    :id="elementId"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @touchmove="handleTouchMove"
  >
    <slot></slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-drag-sort-item',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, getCurrentInstance, onBeforeUnmount, useSlots } from 'vue'
import { getDistance, getTouch } from '../wd-drag-sort/utils'
import { dragSortItemProps, DRAG_SORT_ITEM_KEY } from './types'
import { DRAG_SORT_KEY } from '../wd-drag-sort/types'
import { useParent } from '../composables/useParent'
import { useChildren } from '../composables/useChildren'

const props = defineProps(dragSortItemProps)

const { parent } = useParent(DRAG_SORT_KEY)
const { linkChildren } = useChildren(DRAG_SORT_ITEM_KEY)

if (!parent) {
  console.error('<wd-drag-sort-item> 必须要在 <wd-drag-sort> 组件中使用')
}

const slots = useSlots()

const instance = getCurrentInstance()

// 自身位置信息
const myRect = ref({ left: 0, top: 0, width: 0, height: 0 })
const elRef = ref(null)
// 是否处于拖拽激活状态
const isDraggingActive = ref(false)
// 同步的样式
const syncedStyle = ref({})
// 是否由 handle 触发拖拽
let isHandleTriggered = false

/**
 * 生成唯一的元素 ID
 */
const elementId = computed(() => {
  if (parent && parent.componentId) {
    return `${parent.componentId}-item-${props.index}`
  }
  return `wd-drag-sort-item-${props.index}`
})

/**
 * 长按触发时间
 */
const duration = computed(() => {
  return parent ? parent.props.longPressDuration : 200
})

/**
 * 监听目标位置变化，用于动画过渡
 */
const targetRect = computed(() => {
  if (!parent || !parent.isReady.value) return null
  return parent.getPosition(props.index)
})

watch(
  () => targetRect.value,
  (pos) => {
    if (pos) {
      myRect.value = { ...myRect.value, ...pos }
    }
  },
  { deep: true, immediate: true }
)

/**
 * 监听 manager 状态，如果重置了（isReady=false），则重新注册
 */
watch(
  () => parent && parent.isReady.value,
  (ready) => {
    if (!ready) {
      // 必须延迟，等待 DOM 恢复文档流后再测量
      setTimeout(() => {
        init()
      }, 100)
    }
  }
)

/**
 * 监听 manager 提供的样式更新
 */
watch(
  () => parent && parent.getItemStyle(props.index),
  (newStyle) => {
    if (newStyle) {
      syncedStyle.value = newStyle
    } else {
      syncedStyle.value = {}
    }
  },
  { deep: true, immediate: true }
)

/**
 * 计算最终样式
 */
const itemStyle = computed(() => {
  const style: any = {
    boxSizing: 'border-box'
  }

  // 如果测量过，可以固定宽高防止变形，或者直接由 CSS 控制
  // if (myRect.value.width) {
  //   style.width = `${myRect.value.width}px`
  //   style.height = `${myRect.value.height}px`
  // }

  Object.assign(style, syncedStyle.value)

  return style
})

/**
 * 获取自身 DOM 信息的辅助函数（供父组件调用）
 * 解决小程序无法跨组件选择的问题
 */
const getRect = () => {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery().in(instance?.proxy as any)
    query
      .select(`#${elementId.value}`)
      .boundingClientRect((data: any) => {
        if (data) {
          // 补充 index，方便父组件识别
          data.dataset = data.dataset || {}
          data.dataset.index = props.index
          resolve(data)
        } else {
          resolve(null)
        }
      })
      .exec()
  })
}

// 向父组件暴露 getRect
defineExpose({
  getRect
})

/**
 * 初始化，注册到 manager
 */
const init = () => {
  if (!parent) return
  // 将 getRect 方法传递给 manager - 使用 useChildren/defineExpose 后不再需要手动传递
  // 但是父组件依赖于监听 children 或手动初始化
  // 父组件在 dragInit 中调用 child.getRect()
}

let initTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  // 延时确保 DOM 渲染完成
  initTimer = setTimeout(() => {
    init()
    initTimer = null
  }, 100)
})

onBeforeUnmount(() => {
  if (initTimer) {
    clearTimeout(initTimer)
    initTimer = null
  }
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
  // 注销逻辑由 useChildren 处理
})

let longPressTimer: ReturnType<typeof setTimeout> | null = null
let touchStartPosition = { x: 0, y: 0 }
// let touchStartTime = 0

/**
 * 拖拽开始逻辑（核心）
 */
const startDragLogic = (e: any) => {
  if (!parent || !parent.isReady.value) return
  if (parent.props.disabled || props.disabled || !props.sortable) return

  const touch = getTouch(e)
  touchStartPosition = { x: touch.clientX, y: touch.clientY }
  // touchStartTime = Date.now()

  const durationVal = parent.props.longPressDuration
  if (durationVal > 0) {
    longPressTimer = setTimeout(() => {
      isDraggingActive.value = true
      parent.onDragStart(props.index, touch)
      longPressTimer = null
    }, durationVal)
  } else {
    // 没有长按延迟，立即开始拖拽
    isDraggingActive.value = true
    parent.onDragStart(props.index, touch)
  }
}

/**
 * 触摸开始处理 (Root)
 */
const onTouchStart = (e: any) => {
  // 如果事件已经被 handle 处理过，则忽略
  if (e.__handledByHandle) return

  // 如果开启了 useDragHandle，但不是由 handle 触发的，则忽略
  if (parent && parent.props.useDragHandle && !isHandleTriggered) {
    return
  }

  // 重置标志位
  isHandleTriggered = false

  startDragLogic(e)
}

/**
 * 供 Slot 使用的 Handle TouchStart
 */
const onHandleTouch = (e: any) => {
  if (parent && parent.props.useDragHandle) {
    isHandleTriggered = true
    startDragLogic(e)

    // 阻止 Root 再次响应（如果冒泡的话）
    // 给 event 对象加个标记
    e.__handledByHandle = true
  }
}

/**
 * 触摸移动处理
 */
const handleTouchMove = (e: any) => {
  if (!parent) return
  // 阻止冒泡，避免嵌套问题
  if (e.stopPropagation) {
    e.stopPropagation()
  }
  // 如果正在拖拽，阻止默认行为（滚动）
  if (isDraggingActive.value && e.preventDefault) {
    e.preventDefault()
  }

  const touch = getTouch(e)

  // 检查是否已经开始拖拽
  if (isDraggingActive.value && parent.draggedIndex.value === props.index) {
    // 已经在拖拽中，处理拖拽移动
    parent.onDragMove(touch)
    return
  }

  // 如果没有开始拖拽，检查是否需要取消长按定时器
  const movedDistance = getDistance(touch.clientX, touch.clientY, touchStartPosition.x, touchStartPosition.y)

  // 如果设置了长按延迟
  if (parent.props.longPressDuration > 0) {
    if (longPressTimer) {
      // 还没到长按时间，移动超过阈值就取消长按
      if (movedDistance > 15) {
        clearTimeout(longPressTimer)
        longPressTimer = null
        // 这里返回，允许页面滚动
        return
      }
    }
  }
}

/**
 * 触摸结束/取消处理
 */
const onTouchEnd = () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }

  if (isDraggingActive.value) {
    isDraggingActive.value = false
    if (parent) parent.onDragEnd()

    const current = parent && parent.getItemStyle(props.index)
    if (current) {
      syncedStyle.value = current
    }
  }
}

linkChildren({ onHandleTouch })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
