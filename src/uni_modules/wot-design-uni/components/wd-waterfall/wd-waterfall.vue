<script lang="ts">
export default {
  name: 'wd-waterfall',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script setup lang="ts">
/**
 * 瀑布流组件 - 主容器组件
 *
 * 功能说明：
 * 1. 管理多列瀑布流布局
 * 2. 计算每个项目的位置（top, left）
 * 3. 监听项目加载状态，动态调整布局
 * 4. 提供上下文给子组件使用
 */
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { onHide, onShow } from '@dcloudio/uni-app'
import { debounce, getRect, uuid } from '../common/util'
import { useChildren } from '../composables/useChildren'

import {
  type WaterfallEmits,
  type WaterfallExpose,
  type WaterfallProps,
  type WaterfallSlots,
  defaultWaterfallProps,
  waterfallContextKey
} from './types'
import type { WaterfallItemInfo } from '../wd-waterfall-item/types'
// 组件属性定义
const props = withDefaults(defineProps<WaterfallProps>(), defaultWaterfallProps)
// 事件定义
const emit = defineEmits<WaterfallEmits>()

// 插槽定义
defineSlots<WaterfallSlots>()

// const isActive = defineModel<boolean>() //语法较新
const isShow = ref<boolean>(props?.show ?? true)
// 容器是否活跃
const isActive = computed(() => {
  if (props?.show !== undefined) {
    return props?.show
  }
  return isShow.value
})

function setActive(value: boolean) {
  if (props?.show === undefined) {
    isShow.value = value
  }
  emit('update:show', value)
}
// ==================== 容器尺寸管理 ====================

// 生成唯一的容器ID，用于DOM查询
const containerId = `wd-waterfall-${uuid()}`
// 获取当前组件实例，用于DOM操作
const instance = getCurrentInstance()

// 容器宽度（响应式）
const containerWidth = ref(0)
// 容器高度（响应式，根据最高列计算）
const containerHeight = ref(0)

/**
 * 计算每列的宽度
 * 公式：(总宽度 - (列数-1) * 列间距) / 列数
 */
const columnWidth = computed(() => {
  return (containerWidth.value - (props.columns - 1) * props.columnGap) / props.columns
})

/**
 * 组件挂载后获取容器实际宽度
 */
onMounted(async () => {
  const rect = await getRect(`.${containerId}`, false, instance?.proxy)
  containerWidth.value = rect?.width || 0
  // 初始化列高度状态
  initColumns()
})

// ==================== 加载状态管理 ====================

/**
 * 加载状态：
 * - 'idle': 空闲状态，所有项目都已加载完成
 * - 'busy': 忙碌状态，有项目正在加载中
 */
const loadStatus = ref<'idle' | 'busy'>('idle')

/**
 * 重排状态：用于控制重排时的动画效果
 */
const isReflowing = ref(false)

/**
 * 布局中断状态：用于通知子组件停止不必要的dom信息获取
 */
const isLayoutInterrupted = ref(false)

// 队列处理状态通过 queueProcessing 变量管理，删除操作等待队列完成

/**
 * 空闲状态回调函数队列
 * 当所有项目加载完成（进入空闲状态）时，会依次执行这些回调
 */
let idleCallbacks: (() => void)[] = []

/**
 * 注册加载完成回调
 * @param handler 回调函数
 */
function loadDone(handler: () => void) {
  nextTick(() => {
    if (loadStatus.value === 'idle') {
      // 如果当前是空闲状态，立即执行回调
      handler()
    } else {
      // 如果正在加载中，将回调加入队列
      if (!idleCallbacks.includes(handler)) {
        idleCallbacks.push(handler)
      }
    }
  })
}

// ==================== 瀑布流项目管理 ====================

/**
 * 瀑布流项目列表
 * 存储所有子组件的信息，包括位置、尺寸、加载状态等
 */
const items: WaterfallItemInfo[] = []

/**
 * 布局队列
 * 存储需要排版的项目，按顺序排版
 */
const layoutQueue: WaterfallItemInfo[] = []

/**
 * 删除队列
 * 存储需要删除的项目，在排版队列为空时执行删除
 */
const removalQueue: WaterfallItemInfo[] = []

/**
 * 列高度状态管理
 * 直接维护每列的当前高度，避免重复计算
 */
const columns = reactive<{ colIndex: number; height: number }[]>([])

/**
 * 更新加载状态
 * 检查所有项目的加载状态，更新整体加载状态并触发相应事件
 */
function updateLoadStatus() {
  if (layoutQueue.length === 0) {
    // 执行所有等待的回调函数
    idleCallbacks.forEach((handler) => handler())
    idleCallbacks = []
    loadStatus.value = 'idle'
    emit('loadEnd') // 触发加载完成事件
  } else {
    loadStatus.value = 'busy'
    emit('loadStart') // 触发加载开始事件
  }
}
/**
 * 初始化列高度状态
 */
function initColumns() {
  columns.length = 0 // 清空数组
  columns.push(
    ...Array(props.columns)
      .fill(0)
      .map((_, index) => ({ colIndex: index, height: 0 }))
  )
}

/**
 * 获取当前最短的列（实时计算，避免异步问题）
 * 不使用计算属性，确保每次都能获取到最新的列状态
 */
function getMinColumn() {
  let min = columns[0]
  for (let i = 1; i < columns.length; i++) {
    if (columns[i].height < min.height) {
      min = columns[i]
    }
  }
  return min
}

/**
 * 添加瀑布流项目
 * 当子组件挂载时调用，将项目信息添加到列表中
 * @param item 项目信息对象
 */
function addItem(item: WaterfallItemInfo) {
  // 直接加入待排版队列
  layoutQueue.push(item)

  // 检查是否为插入项目（而非末尾追加）
  const isInsertItem = item.order?.value !== undefined && item.order.value < items.length
  if (isInsertItem) {
    item.isInserted = true
    items.splice(item.order!.value, 0, item)
  } else {
    // 末尾追加项目
    item.isInserted = false
    items.push(item)
  }

  // 触发首次开始排版 todo 会不会和isactive冲突并发？
  if (loadStatus.value === 'idle') {
    processQueue()
  }
}

/**
 * 移除瀑布流项目
 * 当子组件卸载时调用，将项目加入删除队列
 * @param item 项目信息对象
 */
async function removeItem(item: WaterfallItemInfo) {
  // 将项目加入删除队列，等待排版队列为空时执行
  removalQueue.push(item)

  // 如果当前没有待排版项目，立即处理删除队列
  if (layoutQueue.length === 0) {
    processRemovalQueue()
  }
}

/**
 * 处理删除队列
 * 批量执行删除操作并重新计算布局
 */
function processRemovalQueue() {
  if (removalQueue.length === 0 || isProcessingRemoval.value) return

  isProcessingRemoval.value = true

  // 批量删除所有待删除项目
  removalQueue.forEach((item) => {
    const arrayIndex = items.indexOf(item)
    if (arrayIndex !== -1) {
      items.splice(arrayIndex, 1)
    }
  })

  // 清空删除队列
  removalQueue.length = 0
  // 重新计算布局
  recalculateItemsAfterRemoval()
}

/**
 * 删除项目后重新计算剩余项目位置的待优化，增量重排
 */
function recalculateItemsAfterRemoval() {
  if (items.length === 0) {
    // 如果没有剩余项目，重置容器高度和列高度
    containerHeight.value = 0
    initColumns()
    // 释放删除锁
    isProcessingRemoval.value = false
    // 🔥 删除完成后检查是否需要加载更多
    nextTick(() => {
      checkAndTriggerLoadMore()
    })
    return
  }

  // 重置列高度状态
  initColumns()

  // 按照当前的index顺序排序所有剩余项目
  const sortedItems = [...items].sort((a, b) => {
    const aIndex = a.order?.value ?? 0
    const bIndex = b.order?.value ?? 0
    return aIndex - bIndex
  })

  // 重新排版所有项目
  for (let i = 0; i < sortedItems.length; i++) {
    const item = sortedItems[i]
    // 获取当前最短的列
    const minColumn = getMinColumn()

    // 计算新位置
    const newTop = minColumn.height + props.rowGap
    const newLeft = (props.columnGap + columnWidth.value) * minColumn.colIndex

    // 更新项目位置
    item.top = newTop
    item.left = newLeft

    // 更新对应列的高度
    columns[minColumn.colIndex].height = newTop + item.height
  }

  // 更新容器总高度
  const newContainerHeight = Math.max(...columns.map((col) => col.height), 0)
  containerHeight.value = newContainerHeight

  // 释放删除锁
  isProcessingRemoval.value = false

  // 🔥 删除完成后检查是否需要加载更多
  nextTick(() => {
    checkAndTriggerLoadMore()
  })

  // 检查是否有待处理的排版队列
  if (layoutQueue.length > 0) {
    processQueue()
  }
}

/**
 * 项目加载完成回调
 * 当子组件的内容（如图片）加载完成或失败时调用
 */
function onItemLoad(item: WaterfallItemInfo) {
  void item.height
}

const pendingWatchers = new Map<
  WaterfallItemInfo /* item.id */,
  {
    resolve: () => void
    reject: (err: any) => void
    stop: () => void
  }
>()

async function waitItemLoaded(item: WaterfallItemInfo) {
  const key = item
  if (pendingWatchers.has(key)) {
    // 复用旧 Promise
    return new Promise<void>((resolve, reject) => {
      const old = pendingWatchers.get(key)!
      old.resolve = resolve // 覆盖，防止旧的回调被调用
      old.reject = reject
    })
  }

  return new Promise<void>((resolve, reject) => {
    const stop = watch(
      () => item.finished,
      (v) => {
        if (v) {
          stop()
          pendingWatchers.delete(key)
          resolve()
        }
      },
      { immediate: true }
    )

    pendingWatchers.set(key, { resolve, reject, stop })
  })
}

/**
 * 插入后进行全重排（类似删除后的处理）
 */
function fullReflowAfterInsert() {
  // 重置列高度状态
  initColumns()

  // 按照当前的index顺序排序所有项目
  const sortedItems = [...items].sort((a, b) => {
    const aIndex = a.order!.value
    const bIndex = b.order!.value
    return aIndex - bIndex
  })

  // 重新排版所有项目
  for (let i = 0; i < sortedItems.length; i++) {
    const item = sortedItems[i]
    // 获取当前最短的列
    const minColumn = getMinColumn()

    // 计算新位置
    const newTop = minColumn.height + props.rowGap
    const newLeft = (props.columnGap + columnWidth.value) * minColumn.colIndex

    // 更新项目位置
    item.top = newTop
    item.left = newLeft

    // 更新对应列的高度
    columns[minColumn.colIndex].height = newTop + item.height
  }

  // 更新容器总高度
  const newContainerHeight = Math.max(...columns.map((col) => col.height), 0)
  containerHeight.value = newContainerHeight
}
/**
 * 布局处理状态
 */
let isProcessingLayout = false

/**
 * 删除处理状态
 */
const isProcessingRemoval = ref(false)

/**
 * 处理排版队列
 * 从 layoutQueue 队列中取出项目进行排版
 */

async function processQueue() {
  try {
    if (isProcessingLayout || isProcessingRemoval.value) return
    isProcessingLayout = true
    updateLoadStatus()
    if (layoutQueue.length === 0) return

    // 处理队列中的项目
    while (layoutQueue.length > 0) {
      const item = layoutQueue[0] // 取队列第一个项目
      // 检查项目是否已加载
      if (!item.finished) {
        await waitItemLoaded(item)
      }

      if (!isActive.value) {
        setTimeout(() => {
          layoutQueue.forEach((item) => {
            item.finished = false
            item.heightError = false
          })
          // 页面失活，兜底清理
          pendingWatchers.forEach(({ reject, stop }) => {
            reject(new Error('页面失活，排版中断，错误码1001'))
            stop()
          })
          pendingWatchers.clear()
        }, 0)
        return
      }

      if (item.heightError) {
        setTimeout(() => {
          // 页面不可见，统一清理 watch 和 拒绝 promise 兜底清理：全部 reject + stop
          pendingWatchers.forEach(({ reject, stop }) => {
            reject(new Error('高度异常，排版中断，错误码1002'))
            stop()
          })
          pendingWatchers.clear()
        }, 0)
        return
      }

      // 检查是否为插入项目（使用addItem中设置的标记）
      if (item.isInserted) {
        fullReflowAfterInsert()
      } else {
        // 正常追加项目的处理逻辑
        const currentMinColumn = getMinColumn()
        // 计算项目位置
        item.top = currentMinColumn.height + props.rowGap
        item.left = (props.columnGap + columnWidth.value) * currentMinColumn.colIndex
        const targetColumnIndex = currentMinColumn.colIndex
        const newHeight = item.top + item.height
        columns[targetColumnIndex].height = newHeight
      }
      // 设置可见状态
      item.visible = true
      containerHeight.value = Math.max(...columns.map((col) => col.height), 0)
      layoutQueue.shift()
    }
    // 全部排完后，兜底清理残余 watch
    pendingWatchers.forEach(({ reject, stop }) => {
      reject(new Error('未知错误，排版中断，错误码1003'))
      stop()
    })
    pendingWatchers.clear()
    // 所有项目处理完成后，清除全局重排状态
    if (layoutQueue.length === 0) {
      isReflowing.value = false
    }
    // 更新加载状态
    updateLoadStatus()

    // 🔥 排版完成后检查是否需要加载更多
    if (layoutQueue.length === 0) {
      nextTick(() => {
        checkAndTriggerLoadMore()
      })
    }

    setTimeout(() => {
      // 处理待删除项目队列
      if (removalQueue.length > 0) {
        processRemovalQueue()
      }
    }, 0)
  } catch (error) {
    isLayoutInterrupted.value = true
    // console.error('error', error)
  } finally {
    isProcessingLayout = false
  }
}

function resetItemsForReflow() {
  // 设置全局重排状态
  isReflowing.value = true

  // 重置项目状态
  items.forEach((item) => {
    item.finished = false
    item.updateHeight(true)
  })
}
/**
 * 重新布局（保留现有数据）
 * 重新计算并排版所有现有项目的位置
 * 使用场景：列数、列间距、行间距等布局参数变化时
 */
const reflow = debounce(async () => {
  // 重置列
  initColumns()

  // 重新构建待排版队列
  layoutQueue.length = 0

  // 重置所有项目状态
  resetItemsForReflow()

  // 将所有项目加入待排版队列
  layoutQueue.push(...items)

  // 开始处理队列
  processQueue()
}, 16)

/**
 * 清空并重置（清除所有数据）
 * 清空所有项目数据和队列，准备接收全新数据
 * 使用场景：下拉刷新、切换数据源等需要完全重新加载的情况
 */
async function reset() {
  // 重置列
  initColumns()

  // 重新构建待排版队列
  layoutQueue.length = 0
  // 清空删除队列
  removalQueue.length = 0
  // 清空所有项目数据
  items.length = 0
}

// ==================== 响应式监听 ====================

/**
 * 监听布局相关属性变化
 * 当列数、列间距、行间距发生变化时，重新计算布局
 */
watch([() => props.columns, () => props.columnGap, () => props.rowGap], () => {
  setTimeout(() => {
    reflow()
  }, 16)
})

/**
 * 监听页面活跃状态变化
 * 当页面从不活跃变为活跃时，继续处理待排版的项目
 */
watch(
  () => isActive.value,
  (newActive, oldActive) => {
    if (newActive && !oldActive && layoutQueue.length > 0) {
      isLayoutInterrupted.value = false // 重置中断信号
      // 必须要用 nextTick
      nextTick(() => {
        // layoutQueue.forEach((item) => {})
        // #ifdef MP-ALIPAY
        const promise = []
        // #endif
        for (let i = 0; i < layoutQueue.length; i++) {
          // #ifdef MP-ALIPAY
          // 注意：这里好像不应该执行updateHeight(true)，待检测
          promise.push(layoutQueue[i].updateHeight(true))
          // #endif
          // #ifndef WEB || MP-ALIPAY
          layoutQueue[i].updateHeight(true)
          // #endif
          // #ifdef WEB
          layoutQueue[i].refreshImage()
          // #endif
        }
        // #ifdef MP-ALIPAY
        Promise.all(promise).then(() => {
          setTimeout(() => {
            processQueue()
          }, 0)
        })
        // #endif
        // #ifndef MP-ALIPAY
        setTimeout(() => {
          processQueue()
        }, 0)
        // #endif
      }) // 延迟执行，确保页面完全激活
    }
    // 🔥 关键：页面失活时兜底清理
    if (!newActive && oldActive) {
      isLayoutInterrupted.value = true
      setTimeout(() => {
        layoutQueue.forEach((item) => {
          item.finished = false
          item.heightError = false
        })
        // 页面失活，兜底清理
        pendingWatchers.forEach(({ reject, stop }) => {
          reject(new Error('页面失活，排版中断，错误码1000'))
          stop()
        })
        pendingWatchers.clear()
      }, 0)
    }
  },
  {
    immediate: false
  }
)

onShow(() => {
  if (props.show === undefined) {
    setActive(true)
  }
})

onHide(() => {
  if (props.show === undefined) {
    setActive(false)
  }
})

// ==================== 上下文提供 ====================

/**
 * 使用 useChildren 向子组件提供瀑布流上下文
 * 子组件通过 useParent 获取这些方法和数据
 * 使用 { sort: false } 跳过 DOM 排序，因为瀑布流项目顺序由 item.order 控制
 */
const { linkChildren } = useChildren(waterfallContextKey, { sort: false })

linkChildren({
  addItem, // 添加项目方法
  removeItem, // 移除项目方法
  onItemLoad, // 项目加载完成回调
  columnWidth, // 列宽度（响应式）
  isReflowing, // 全局重排状态（响应式）
  errorStrategy: props.errorStrategy, // 错误处理模式
  retryCount: props.retryCount, // 重试次数
  maxWait: props.maxWait, // 最大等待时间
  isProcessingRemoval // 删除处理中状态（响应式）
})

// ==================== 自动加载更多机制 ====================

/**
 * 检查是否需要加载更多内容
 * @param buffer 缓冲距离（px），默认 100
 * @returns 是否需要加载更多
 */
function shouldLoadMore(buffer = 100): boolean {
  const currentHeight = containerHeight.value
  let viewportHeight
  // 获取可视区域高度
  // #ifdef H5
  viewportHeight = window.innerHeight
  // #endif
  // #ifndef H5
  const systemInfo = uni.getSystemInfoSync()
  viewportHeight = systemInfo.windowHeight
  // #endif

  // 容器高度 + 缓冲 < 可视区域高度 = 内容不足
  return currentHeight + buffer < viewportHeight
}

/**
 * 检查并通知父组件加载更多
 * 带防抖，避免频繁触发
 * @param immediate 是否立即执行
 */
let notifyTimer: ReturnType<typeof setTimeout> | null = null
function checkAndTriggerLoadMore(immediate = false) {
  // 只在空闲状态下检查
  if (loadStatus.value !== 'idle') {
    return
  }

  // 清除之前的定时器
  if (notifyTimer) {
    clearTimeout(notifyTimer)
    notifyTimer = null
  }

  const check = () => {
    if (shouldLoadMore()) {
      emit('needLoadMore')
    }
  }

  // 立即执行 or 延迟执行
  if (immediate) {
    check()
  } else {
    notifyTimer = setTimeout(check, 300) // 300ms 防抖
  }
}

// 监听容器高度变化
watch(
  () => containerHeight.value,
  (newHeight, oldHeight) => {
    // 高度减少时（可能是删除导致）
    if (newHeight < oldHeight && newHeight > 0) {
      nextTick(() => {
        checkAndTriggerLoadMore()
      })
    }
  }
)

// ==================== 组件暴露接口 ====================

/**
 * 暴露给父组件的方法
 * 父组件可以通过 ref 调用这些方法
 */
defineExpose<WaterfallExpose>({
  reflow, // 重新布局（保留现有数据，重新计算位置）
  reset, // 清空并重置（清除所有数据，准备接收新数据）
  loadDone, // 注册加载完成回调
  checkAndLoadMore: checkAndTriggerLoadMore, // 检查并触发加载更多
  get loadStatus() {
    return loadStatus.value
  }
})

// ==================== 样式计算 ====================
</script>

<template>
  <!-- #ifdef MP-DINGTALK -->
  <view>
    <!-- #endif -->
    <!-- 瀑布流容器：动态高度，包含所有瀑布流项目 -->
    <view :class="[containerId, customClass]" :style="[customStyle, { height: containerHeight + 'px' }]">
      <slot />
    </view>
    <!-- #ifdef MP-DINGTALK -->
  </view>
  <!-- #endif -->
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
