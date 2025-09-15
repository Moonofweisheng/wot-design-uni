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
import { computed, getCurrentInstance, nextTick, onMounted, provide, reactive, ref, watch } from 'vue'
import { onHide, onShow } from '@dcloudio/uni-app'
import { debounce, getRect, uuid } from '../common/util'

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
 * 加载完成后的回调函数队列
 * 当所有项目加载完成时，会依次执行这些回调
 */
let loadedHandlers: (() => void)[] = []

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
      if (!loadedHandlers.includes(handler)) {
        loadedHandlers.push(handler)
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
 * 待排版项目队列
 * 存储需要排版的项目，按顺序排版
 */
const pendingItems: WaterfallItemInfo[] = []

/**
 * 待删除项目队列
 * 存储需要删除的项目，在排版队列为空时执行删除
 */
const pendingRemovalItems: WaterfallItemInfo[] = []

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
  if (pendingItems.length === 0) {
    // 执行所有等待的回调函数
    loadedHandlers.forEach((handler) => handler())
    loadedHandlers = []
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
  pendingItems.push(item)

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
  pendingRemovalItems.push(item)

  // 如果当前没有待排版项目，立即处理删除队列
  if (pendingItems.length === 0) {
    processPendingRemovals()
  }
}

/**
 * 处理待删除项目队列
 * 批量执行删除操作并重新计算布局
 */
function processPendingRemovals() {
  if (pendingRemovalItems.length === 0 || removalProcessing.value) return

  removalProcessing.value = true

  // 批量删除所有待删除项目
  pendingRemovalItems.forEach((item) => {
    const arrayIndex = items.indexOf(item)
    if (arrayIndex !== -1) {
      items.splice(arrayIndex, 1)
    }
  })

  // 清空删除队列
  pendingRemovalItems.length = 0
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
    removalProcessing.value = false
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
  removalProcessing.value = false

  // 检查是否有待处理的排版队列
  if (pendingItems.length > 0) {
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

const liveTasks = new Map<
  WaterfallItemInfo /* item.id */,
  {
    resolve: () => void
    reject: (err: any) => void
    stop: () => void
  }
>()

async function waitItemLoaded(item: WaterfallItemInfo) {
  const key = item
  if (liveTasks.has(key)) {
    // 复用旧 Promise
    return new Promise<void>((resolve, reject) => {
      const old = liveTasks.get(key)!
      old.resolve = resolve // 覆盖，防止旧的回调被调用
      old.reject = reject
    })
  }

  return new Promise<void>((resolve, reject) => {
    const stop = watch(
      () => item.loaded,
      (v) => {
        if (v) {
          stop()
          liveTasks.delete(key)
          resolve()
        }
      },
      { immediate: true }
    )

    liveTasks.set(key, { resolve, reject, stop })
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
 * 队列状态
 */
let queueProcessing = false

/**
 * 删除处理状态
 */
const removalProcessing = ref(false)

/**
 * 处理排版队列
 * 从 pendingItems 队列中取出项目进行排版
 */

async function processQueue() {
  try {
    if (queueProcessing || removalProcessing.value) return
    queueProcessing = true
    updateLoadStatus()
    if (pendingItems.length === 0) return

    // 处理队列中的项目
    while (pendingItems.length > 0) {
      const item = pendingItems[0] // 取队列第一个项目
      // 检查项目是否已加载
      if (!item.loaded) {
        console.log('pendingItems', pendingItems)
        await waitItemLoaded(item)
      }

      if (!isActive.value) {
        setTimeout(() => {
          pendingItems.forEach((item) => {
            item.loaded = false
            item.heightError = false
          })
          // 页面失活，兜底清理
          liveTasks.forEach(({ reject, stop }) => {
            reject(new Error('页面失活，排版中断，错误码1001'))
            stop()
          })
          liveTasks.clear()
        }, 0)
        return
      }

      if (item.heightError) {
        setTimeout(() => {
          // 页面不可见，统一清理 watch 和 拒绝 promise 兜底清理：全部 reject + stop
          liveTasks.forEach(({ reject, stop }) => {
            reject(new Error('高度异常，排版中断，错误码1002'))
            stop()
          })
          liveTasks.clear()
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
      pendingItems.shift()
    }
    // 全部排完后，兜底清理残余 watch
    liveTasks.forEach(({ reject, stop }) => {
      reject(new Error('未知错误，排版中断，错误码1003'))
      stop()
    })
    liveTasks.clear()
    // 所有项目处理完成后，清除全局重排状态
    if (pendingItems.length === 0) {
      isReflowing.value = false
    }
    // 更新加载状态
    updateLoadStatus()
    setTimeout(() => {
      // 处理待删除项目队列
      if (pendingRemovalItems.length > 0) {
        processPendingRemovals()
      }
    }, 0)
  } catch (error) {
    isLayoutInterrupted.value = true
    // console.error('error', error)
  } finally {
    queueProcessing = false
  }
}

function resetItemsForReflow() {
  // 设置全局重排状态
  isReflowing.value = true

  // 重置项目状态
  items.forEach((item) => {
    item.loaded = false
    item.updateHeight(true)
  })
}
/**
 * 完整重排函数
 * 重置所有状态，重新排版所有项目
 * 主要用于: 当列数、列间距、行间距发生变化时，需要完整重新排版
 */
const reflow = debounce(async () => {
  // 重置列
  initColumns()

  // 重新构建待排版队列
  pendingItems.length = 0

  // 重置所有项目状态
  resetItemsForReflow()

  // 将所有项目加入待排版队列
  pendingItems.push(...items)

  // 开始处理队列
  processQueue()
}, 16)

/**
 * 刷新重排
 * 主要用于下拉刷新，基础容器参数没变化的情况
 */
async function refreshReflow() {
  // 重置列
  initColumns()

  // 重新构建待排版队列
  pendingItems.length = 0
  // 清空删除队列
  pendingRemovalItems.length = 0
  // 如果是刷新数据，items要重置
  items.length = 0
}

// ==================== 响应式监听 ====================

/**
 * 监听布局相关属性变化
 * 当列数、列间距、行间距发生变化时，需要完整重新排版
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
    if (newActive && !oldActive && pendingItems.length > 0) {
      isLayoutInterrupted.value = false // 重置中断信号
      // 必须要用 nextTick
      nextTick(() => {
        // pendingItems.forEach((item) => {})
        // #ifdef MP-ALIPAY
        const promise = []
        // #endif
        for (let i = 0; i < pendingItems.length; i++) {
          // #ifdef MP-ALIPAY
          // 这里不应该执行updateHeight(true)才对呀,为什么可以？
          promise.push(pendingItems[i].updateHeight(true))
          // #endif
          // #ifndef WEB || MP-ALIPAY
          pendingItems[i].updateHeight(true)
          // #endif
          // #ifdef WEB || APP-PLUS
          pendingItems[i].refreshImage()
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
        pendingItems.forEach((item) => {
          item.loaded = false
          item.heightError = false
        })
        // 页面失活，兜底清理
        liveTasks.forEach(({ reject, stop }) => {
          reject(new Error('页面失活，排版中断，错误码1000'))
          stop()
        })
        liveTasks.clear()
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
 * 向子组件提供瀑布流上下文
 * 子组件可以通过 inject 获取这些方法和数据
 */
provide(
  waterfallContextKey,
  reactive({
    addItem, // 添加项目方法
    removeItem, // 移除项目方法
    onItemLoad, // 项目加载完成回调
    columnWidth, // 列宽度（响应式）
    isReflowing, // 全局重排状态（响应式）
    errorStrategy: props.errorStrategy, // 错误处理模式
    retryCount: props.retryCount, // 重试次数
    maxWait: props.maxWait, // 最大等待时间
    removalProcessing // 删除处理中状态（响应式）
  })
)

// ==================== 组件暴露接口 ====================

/**
 * 暴露给父组件的方法
 * 父组件可以通过 ref 调用这些方法
 */
defineExpose<WaterfallExpose>({
  reflow, // 完整重排（重置所有状态）
  refreshReflow, // 刷新重排（重置所有状态，包括数据）
  loadDone, // 注册加载完成回调
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
