<template>
  <view :id="componentId" class="wd-drag-sort" :class="[{ 'is-dragging': draggedIndex > -1 }, customClass]" :style="[customStyle]">
    <!-- 占位符：仅在拖拽时显示 -->
    <view v-if="draggedIndex > -1 && currentSlotStyle" class="wd-drag-sort__placeholder" :class="placeholderClass" :style="currentSlotStyle">
      <slot name="placeholder"></slot>
    </view>
    <slot></slot>
    <!-- #ifdef H5 || APP-PLUS -->
    <!-- 逻辑层数据传递给视图层属性，用来控制APP页面是否滚动  -->
    <view :draggedIndex="draggedIndex" :change:draggedIndex="domUtils.onDragChange" class="renderjs-trigger"></view>
    <!-- #endif -->
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-drag-sort',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { ref, reactive, computed, watch, nextTick, getCurrentInstance, onBeforeUnmount, onMounted } from 'vue'
import { throttle, findClosestSlot, moveArrayItem, swapArrayItem, clamp, getScrollDirection, generateId } from './utils'
import { dragSortProps, DRAG_SORT_KEY, type DragSortProvide } from './types'
import { useChildren } from '../composables/useChildren'
import type { DragSortItemInstance } from '../wd-drag-sort-item/types'

const props = defineProps(dragSortProps)
const emit = defineEmits(['update:modelValue', 'change', 'scroll', 'drag-start', 'drag-end', 'dragging'])

const instance = getCurrentInstance()
const { linkChildren, children } = useChildren<DragSortItemInstance, DragSortProvide>(DRAG_SORT_KEY)

// 生成唯一组件 ID，解决多实例 ID 冲突问题
const componentId = generateId()

// 状态管理
const isReady = ref(false)
const containerHeight = ref<number | string>('auto')
const containerWidth = ref(0)
const items = reactive<Record<number, any>>({})

const slots = ref<any[]>([])
const itemToSlot = ref<number[]>([])
const draggedIndex = ref(-1)
const dragDelta = reactive({ x: 0, y: 0 })
const dragStartScrollTop = ref(0)
const innerScrollTop = ref(0)
const windowHeight = ref(0)

// 向子组件提供上下文
linkChildren({
  props,
  isReady,
  draggedIndex,
  componentId,
  // 使用 useChildren 不需要 register/unregister
  register: () => {},
  unregister: () => {},
  onDragStart,
  onDragMove,
  onDragEnd,
  getPosition,
  getItemStyle,
  getCurrentPosition
})

defineExpose({
  init: dragInit
})

/**
 * 计算占位符样式
 */
const currentSlotStyle = computed(() => {
  if (draggedIndex.value === -1) return null

  let slotIdx = itemToSlot.value[draggedIndex.value]

  if (slotIdx === undefined) return null
  const slot = slots.value[slotIdx]

  return {
    position: 'absolute',
    left: `${slot.left}px`,
    top: `${slot.top}px`,
    width: `${slot.width}px`,
    height: `${slot.height}px`
  }
})

let initDebounceTimer: ReturnType<typeof setTimeout> | null = null

/**
 * 初始化布局信
 * 兼容小程序无法跨组件选择的问题
 */
function dragInit() {
  // 获取屏幕高度
  try {
    const sys = uni.getWindowInfo ? uni.getWindowInfo() : uni.getSystemInfoSync()
    windowHeight.value = sys.windowHeight
  } catch (e) {}

  return new Promise<void>((resolve) => {
    // 1. 获取容器位置
    const query = uni.createSelectorQuery().in(instance)
    const selector = `#${componentId}`
    query
      .select(selector)
      .boundingClientRect((containerRect: any) => {
        if (!containerRect) {
          // 如果容器都没准备好，直接重试
          const retryQuery = uni.createSelectorQuery().in(instance)
          retryQuery
            .select('.wd-drag-sort')
            .boundingClientRect((retryRect: any) => {
              if (retryRect) {
                handleLayoutHelper(retryRect).then(resolve)
              } else {
                retryLayout()
                resolve()
              }
            })
            .exec()
          return
        }
        handleLayoutHelper(containerRect).then(resolve)
      })
      .exec()
  })
}

const retryLayout = () => {
  if (!(dragInit as any).retryCount) (dragInit as any).retryCount = 0
  if ((dragInit as any).retryCount < 3) {
    ;(dragInit as any).retryCount++
    setTimeout(() => dragInit(), 50)
  }
}

const handleLayoutHelper = (containerRect: any) => {
  return new Promise<void>((resolve) => {
    // 2. 并发收集所有子组件的 rect
    const promises: Promise<any>[] = []

    // 使用 useChildren 获取子组件
    children.forEach((child) => {
      // 访问暴露的 getRect 方法
      const c = child as any
      const getRect = c.getRect || (c.$ && c.$.exposed && c.$.exposed.getRect)
      if (getRect) {
        promises.push(getRect())
      } else {
        console.warn('wd-drag-sort: child has no getRect method', child)
      }
    })

    Promise.all(promises).then((results) => {
      // 过滤掉 null
      const validRects = results.filter((r) => r)
      handleLayout(containerRect, validRects)
      resolve()
    })
  })
}

// 内部处理函数，用于处理布局数据
const handleLayout = (containerRect: any, itemRects: any[]) => {
  if (!containerRect) {
    retryLayout()
    return
  }
  if (!itemRects || itemRects.length === 0) {
    retryLayout()
    return
  }

  ;(dragInit as any).retryCount = 0 // 成功后重置重试计数

  containerWidth.value = containerRect.width
  const newSlots: any[] = []
  let maxBottom = 0

  // 备份旧状态用于计算 offset
  const oldItems = { ...items }
  const oldSlots = [...slots.value]
  const oldItemToSlot = [...itemToSlot.value]
  const currentDraggedIndex = draggedIndex.value
  const currentInnerScrollTop = innerScrollTop.value
  const currentDragStartScrollTop = dragStartScrollTop.value

  // 重置拖拽状态，防止布局更新时状态不一致
  draggedIndex.value = -1
  dragDelta.x = 0
  dragDelta.y = 0

  // 清除旧数据
  for (const key in items) {
    delete items[key]
  }

  // 建立临时映射：dataset.index -> rect
  itemRects.forEach((rect) => {
    // 强制转换为数字，兼容不同平台的 dataset 格式
    const idx = Number(rect.dataset.index)
    if (!isNaN(idx)) {
      // 计算当前已应用的 offset
      let offsetX = 0
      let offsetY = 0

      if (!isSilentUpdate.value && oldItems[idx]) {
        // 如果是正在拖拽的元素
        if (idx === currentDraggedIndex) {
          offsetX = dragDelta.x
          offsetY = dragDelta.y + (currentInnerScrollTop - currentDragStartScrollTop)
        } else {
          // 普通元素
          const slotIdx = oldItemToSlot[idx]
          if (slotIdx !== undefined && oldSlots[slotIdx]) {
            const slot = oldSlots[slotIdx]
            const oldRect = oldItems[idx]
            if (slot && oldRect) {
              offsetX = slot.left - oldRect.left
              offsetY = slot.top - oldRect.top
            }
          }
        }
      }

      // 计算相对坐标（减去 offset 得到自然位置）
      const relativeRect = {
        left: rect.left - containerRect.left - offsetX,
        top: rect.top - containerRect.top - offsetY,
        width: rect.width,
        height: rect.height
      }

      items[idx] = relativeRect
    }
  })

  // 重新计算最大底部距离（遍历所有 items）
  for (const key in items) {
    const rect = items[key]
    if (rect.top + rect.height > maxBottom) {
      maxBottom = rect.top + rect.height
    }
  }

  // 基于 modelValue 的顺序生成 slots
  // 确保 slots 数组与 items 索引对应
  const sortedIndices = Object.keys(items)
    .map(Number)
    .sort((a, b) => a - b)

  sortedIndices.forEach((idx) => {
    newSlots.push({ ...items[idx] })
  })

  slots.value = newSlots
  containerHeight.value = maxBottom

  // 重置映射关系
  itemToSlot.value = sortedIndices.map((_, i) => i)

  isReady.value = true
}

/**
 * 重置状态，强制重新计算
 */
const reset = () => {
  isReady.value = false
  for (const key in items) {
    delete items[key]
  }
}

// 拖拽逻辑
let startX = 0
let startY = 0
let autoScrollTimer: ReturnType<typeof setTimeout> | null = null
// 记录延迟更新的定时器ID
let updateTimer: ReturnType<typeof setTimeout> | null = null
let silentTimer: ReturnType<typeof setTimeout> | null = null
const touchOffset = ref<any>(null)
const currentTouch = reactive({ x: 0, y: 0 })

// 窗口尺寸变化处理
const onWindowResize = () => {
  // 重置并重新计算布局
  isReady.value = false
  nextTick(() => {
    dragInit()
  })
}

onMounted(() => {
  uni.onWindowResize(onWindowResize)
  // 初始化
  nextTick(() => {
    dragInit()
  })
})

watch(
  () => [props.sortType, props.realtime, props.strict],
  () => {
    if (props.sortType === 'move' && props.realtime && props.strict) {
      console.error('[wd-drag-sort] sort-type="move" 暂不支持开启 realtime 模式，已自动关闭实时交换。')
    }
  },
  { immediate: true }
)

// 组件销毁前清除定时器
onBeforeUnmount(() => {
  uni.offWindowResize(onWindowResize)
  stopAutoScroll()
  if (updateTimer) {
    clearTimeout(updateTimer)
    updateTimer = null
  }
  if (silentTimer) {
    clearTimeout(silentTimer)
    silentTimer = null
  }
})

function onDragStart(index: number, touch: any, rect: any = null) {
  if (!isReady.value) return
  draggedIndex.value = index
  startX = touch.clientX
  startY = touch.clientY

  if (rect) {
    touchOffset.value = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    }
    currentTouch.x = touch.clientX
    currentTouch.y = touch.clientY
  } else {
    touchOffset.value = null
  }

  dragDelta.x = 0
  dragDelta.y = 0

  if (Math.abs(innerScrollTop.value - props.scrollTop) > 5) {
    innerScrollTop.value = props.scrollTop
  }
  dragStartScrollTop.value = innerScrollTop.value

  // 震动反馈
  // #ifndef H5
  if (props.feedback) {
    try {
      uni.vibrateShort({
        fail: () => {}
      })
    } catch (e) {}
  }
  // #endif

  emit('drag-start', index)
}

const startAutoScroll = (directionX: number, directionY: number) => {
  if (autoScrollTimer) return

  const step = () => {
    const sDx = directionX * props.scrollSpeed
    let sDy = directionY * props.scrollSpeed

    let nextScrollTop = innerScrollTop.value + sDy

    const rect = items[draggedIndex.value]
    if (rect) {
      const currentScrollDiff = nextScrollTop - dragStartScrollTop.value
      let newTop = rect.top + dragDelta.y + currentScrollDiff

      if (sDy > 0 && newTop + rect.height >= (containerHeight.value as number)) {
        sDy = 0
        nextScrollTop = innerScrollTop.value
      }

      if (sDy < 0 && newTop <= 0) {
        sDy = 0
        nextScrollTop = innerScrollTop.value
      }
    }

    if (sDy === 0 && sDx === 0) {
      autoScrollTimer = setTimeout(step, 20)
      return
    }

    let maxLead = 20
    // #ifdef MP
    maxLead = 30
    // #endif

    if (sDy > 0 && nextScrollTop > props.scrollTop + maxLead) {
      nextScrollTop = props.scrollTop + maxLead
    } else if (sDy < 0 && nextScrollTop < props.scrollTop - maxLead) {
      nextScrollTop = props.scrollTop - maxLead
    }

    innerScrollTop.value = nextScrollTop

    emit('scroll', {
      dx: sDx,
      dy: sDy
    })
    autoScrollTimer = setTimeout(step, 20)
  }
  step()
}

const stopAutoScroll = () => {
  if (autoScrollTimer) {
    clearTimeout(autoScrollTimer)
    autoScrollTimer = null
  }
}

// 监听 props.scrollTop
watch(
  () => props.scrollTop,
  (val) => {
    if (!autoScrollTimer) {
      innerScrollTop.value = val
    } else {
      if (Math.abs(val - innerScrollTop.value) > 100) {
        innerScrollTop.value = val
      }
    }
  }
)

const swapItems = (targetSlotIndex: number) => {
  const currentOrder: number[] = []
  // 还原当前的排列顺序
  for (let i = 0; i < slots.value.length; i++) {
    const itemIdx = itemToSlot.value.findIndex((s) => s === i)
    if (itemIdx !== -1) currentOrder.push(itemIdx)
  }

  const oldVisualIdx = currentOrder.indexOf(draggedIndex.value)
  const newVisualIdx = targetSlotIndex
  let newOrder
  // 使用工具函数移动元素
  if (props.sortType === 'swap') {
    newOrder = swapArrayItem(currentOrder, oldVisualIdx, newVisualIdx)
  } else {
    newOrder = moveArrayItem(currentOrder, oldVisualIdx, newVisualIdx)
  }

  // 更新 itemToSlot 映射
  newOrder.forEach((itemIdx: number, slotIdx: number) => {
    itemToSlot.value[itemIdx] = slotIdx
  })

  // #ifndef H5
  if (props.feedback) {
    try {
      uni.vibrateShort({
        fail: () => {}
      })
    } catch (e) {}
  }
  // #endif
}

const getSlotFilterFn = (originalRect: any) => {
  return (sIdx: number) => {
    const itemIdx = itemToSlot.value.findIndex((s) => s === sIdx)
    // 必须是有元素的插槽
    if (itemIdx === -1) return false

    return true
  }
}

/**
 * 检测是否需要交换位置 (节流)
 */
const checkSwap = throttle(() => {
  const originalRect = items[draggedIndex.value]
  if (!originalRect) return

  const currentScrollDiff = innerScrollTop.value - dragStartScrollTop.value
  const centerX = originalRect.left + originalRect.width / 2 + dragDelta.x
  const centerY = originalRect.top + originalRect.height / 2 + dragDelta.y + currentScrollDiff
  const currentSlotIndex = itemToSlot.value[draggedIndex.value]

  // 寻找最近的插槽，过滤掉不可排序的插槽
  const { index: targetSlotIndex, dist } = findClosestSlot({ x: centerX, y: centerY }, slots.value, getSlotFilterFn(originalRect))

  if (targetSlotIndex !== -1 && targetSlotIndex !== currentSlotIndex) {
    const targetSlot = slots.value[targetSlotIndex]
    // 阈值判断：必须进入目标插槽的一半区域
    const threshold = Math.min(targetSlot.width, targetSlot.height) * 0.5

    if (dist < threshold) {
      if (props.strict && props.sortType === 'swap') {
        const widthDiff = Math.abs(targetSlot.width - originalRect.width)
        const heightDiff = Math.abs(targetSlot.height - originalRect.height)
        if (widthDiff > 1 || heightDiff > 1) {
          return
        }
      }

      const otherItemIndex = itemToSlot.value.findIndex((s) => s === targetSlotIndex)
      if (otherItemIndex !== -1) {
        const child = children.find((c) => c.index === otherItemIndex)
        if (child && !child.sortable) return
      }

      swapItems(targetSlotIndex)
    }
  }
}, 100)

function onDragMove(touch: any) {
  if (draggedIndex.value === -1) return

  // 简单节流
  const now = Date.now()
  if (now - ((onDragMove as any).lastTime || 0) < 30) return
  ;(onDragMove as any).lastTime = now

  currentTouch.x = touch.clientX
  currentTouch.y = touch.clientY

  const dx = touch.clientX - startX
  const dy = touch.clientY - startY

  const rect = items[draggedIndex.value]
  if (rect) {
    const currentScrollDiff = innerScrollTop.value - dragStartScrollTop.value

    let newLeft = rect.left + dx
    let newTop = rect.top + dy + currentScrollDiff

    // 边界检查
    newLeft = clamp(newLeft, 0, containerWidth.value - rect.width)
    newTop = clamp(newTop, 0, (containerHeight.value as number) - rect.height)

    dragDelta.x = newLeft - rect.left
    dragDelta.y = newTop - rect.top - currentScrollDiff
  } else {
    dragDelta.x = dx
    dragDelta.y = dy
  }

  emit('dragging', {
    index: draggedIndex.value,
    delta: { ...dragDelta },
    touch: { clientX: touch.clientX, clientY: touch.clientY }
  })

  const clientY = touch.clientY

  let topEdge = 0
  let bottomEdge = windowHeight.value

  if (props.scrollArea) {
    if (props.scrollArea.top !== undefined) topEdge = props.scrollArea.top
    if (props.scrollArea.height !== undefined) {
      bottomEdge = topEdge + props.scrollArea.height
    } else if (props.scrollArea.bottom !== undefined) {
      bottomEdge = props.scrollArea.bottom
    }
  }

  // 自动滚动触发区域判断
  const scrollDy = getScrollDirection(clientY, topEdge, bottomEdge, props.edgeThreshold)

  if (scrollDy !== 0) {
    startAutoScroll(0, scrollDy)
  } else {
    stopAutoScroll()
  }

  if (!props.realtime) return
  if (props.strict && props.sortType === 'move') return

  checkSwap()
}

function onDragEnd() {
  stopAutoScroll()
  if (draggedIndex.value === -1) return

  // 如果不是实时排序，则在释放时计算最终位置
  if (!props.realtime) {
    const originalRect = items[draggedIndex.value]
    if (!originalRect) {
      draggedIndex.value = -1
      dragDelta.x = 0
      dragDelta.y = 0
      return
    }

    const centerX = originalRect.left + originalRect.width / 2 + dragDelta.x
    const centerY = originalRect.top + originalRect.height / 2 + dragDelta.y
    const currentSlotIndex = itemToSlot.value[draggedIndex.value]

    // 寻找最近的插槽
    const { index: targetSlotIndex } = findClosestSlot({ x: centerX, y: centerY }, slots.value, getSlotFilterFn(originalRect))

    if (targetSlotIndex !== -1 && targetSlotIndex !== currentSlotIndex) {
      let canSwap = true
      // 严格模式：检查目标插槽是否与拖拽项尺寸相同
      if (props.strict && !props.realtime && props.sortType === 'swap') {
        const targetSlot = slots.value[targetSlotIndex]
        if (targetSlot) {
          const widthDiff = Math.abs(targetSlot.width - originalRect.width)
          const heightDiff = Math.abs(targetSlot.height - originalRect.height)
          if (widthDiff > 2 || heightDiff > 2) {
            canSwap = false
          }
        }
      }

      if (canSwap) {
        const otherItemIndex = itemToSlot.value.findIndex((s) => s === targetSlotIndex)
        // 确保目标位置的元素也是可排序的
        if (otherItemIndex !== -1) {
          const child = children.find((c) => c.index === otherItemIndex)
          if (child && child.sortable) {
            swapItems(targetSlotIndex)
          }
        }
      }
    }
  }

  // 构造最终的新数组
  const newOrder = new Array(props.modelValue.length)
  itemToSlot.value.forEach((slotIdx, itemIdx) => {
    newOrder[slotIdx] = props.modelValue[itemIdx]
  })

  const currentDraggedIndex = draggedIndex.value
  draggedIndex.value = -1
  dragDelta.x = 0
  dragDelta.y = 0

  // 延迟更新 modelValue，给予动画时间
  updateTimer = setTimeout(() => {
    // 标记为内部更新，避免触发 watch 导致重置
    isInternalUpdate.value = true

    const oldIndex = currentDraggedIndex
    const newIndex = itemToSlot.value[oldIndex]

    emit('update:modelValue', newOrder)
    emit('change', newOrder, { oldIndex, newIndex })
    emit('drag-end')

    isSilentUpdate.value = true

    nextTick(() => {
      // 重置映射关系
      itemToSlot.value = itemToSlot.value.map((_, i) => i)

      // 重新测量布局，确保 items 与 DOM 真实尺寸一致
      dragInit().then(() => {
        silentTimer = setTimeout(() => {
          isSilentUpdate.value = false
        }, 50)
      })
    })
  }, 300)
}

// 是否处于静默更新状态
const isSilentUpdate = ref(false)
// 是否为内部更新（拖拽导致的更新）
const isInternalUpdate = ref(false)

function getItemStyle(index: number) {
  if (isSilentUpdate.value) {
    return {
      position: 'relative',
      left: '0',
      top: '0',
      zIndex: 1,
      transition: 'none'
    }
  }

  if (index === draggedIndex.value) {
    const tx = dragDelta.x
    const ty = dragDelta.y + (innerScrollTop.value - dragStartScrollTop.value)

    return {
      position: 'relative',
      left: `${tx}px`,
      top: `${ty}px`,
      zIndex: 9999,
      transition: 'none',
      willChange: 'left, top'
    }
  } else {
    const slotIdx = itemToSlot.value[index]
    if (slotIdx === undefined) return {}
    const slot = slots.value[slotIdx]
    const originalRect = items[index]

    // 增加空值判断，防止动态删除元素时报错
    if (!slot || !originalRect) return

    const tx = slot.left - originalRect.left
    const ty = slot.top - originalRect.top

    return {
      position: 'relative',
      left: `${tx}px`,
      top: `${ty}px`,
      zIndex: 1,
      transition: 'left 0.3s, top 0.3s'
    }
  }
}

function getPosition(index: number) {
  return items[index]
}

function getCurrentPosition(index: number) {
  const rect = items[index]
  if (!rect) return null

  const currentScrollDiff = innerScrollTop.value - dragStartScrollTop.value

  return {
    left: rect.left + dragDelta.x,
    top: rect.top + dragDelta.y + currentScrollDiff,
    width: rect.width,
    height: rect.height
  }
}

watch(
  () => props.modelValue,
  (newVal) => {
    // 如果是内部拖拽更新，消耗标记并跳过重置
    if (isInternalUpdate.value) {
      isInternalUpdate.value = false
      return
    }

    // 强制触发一次 init 调度
    if (!initDebounceTimer) {
      initDebounceTimer = setTimeout(() => {
        initDebounceTimer = null
        dragInit()
      }, 150)
    }
  },
  { deep: true, immediate: true }
)

// 监听子组件变化
watch(
  () => children.length,
  () => {
    if (!initDebounceTimer) {
      initDebounceTimer = setTimeout(() => {
        initDebounceTimer = null
        if (!isReady.value) dragInit()
      }, 150)
    }
  }
)
</script>

<!-- #ifdef APP-PLUS || H5 -->
<script module="domUtils" lang="renderjs">
export default {
  methods: {
    onDragChange(newValue, oldValue, ownerInstance, instance) {
      // 监听拖拽状态变化，控制页面滚动
      if (newValue > -1) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  }
}
</script>
<!-- #endif -->

<style lang="scss" scoped>
@import './index.scss';
</style>
