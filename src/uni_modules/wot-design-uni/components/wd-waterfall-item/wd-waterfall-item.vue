<script lang="ts">
export default {
  name: 'wd-waterfall-item',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script setup lang="ts">
/**
 * 瀑布流项目组件 - 单个项目容器
 *
 * 功能说明：
 * 1. 作为瀑布流中的单个项目容器
 * 2. 自动获取内容高度并报告给父组件
 * 3. 根据父组件计算的位置进行定位
 * 4. 提供加载完成回调给内容组件
 */
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowReactive,
  shallowReadonly,
  watch,
  shallowRef,
  toRef,
  type Ref
} from 'vue'
import { getRect, uuid } from '../common/util'
import type { WaterfallItemExpose, WaterfallItemInfo, WaterfallItemProps, WaterfallItemSlots } from './types'
import { waterfallContextKey } from '../wd-waterfall/types'

// 组件属性定义
const props = withDefaults(defineProps<WaterfallItemProps>(), {})

// // 事件定义
// defineEmits<WaterfallItemEmits>()

// 插槽定义
defineSlots<WaterfallItemSlots>()

// 暴露给父组件的方法和属性
defineExpose<WaterfallItemExpose>({})

// ==================== 内联工具函数 ====================

/**
 * 超时函数
 * 提供延迟执行、立即执行、清除和停止计时器的功能
 */
function useTimeout<CallbackFn extends (...args: any[]) => any>(
  cb: CallbackFn,
  interval: number,
  options: { immediate?: boolean; immediateCallback?: boolean } = {}
) {
  const { immediate = false, immediateCallback = false } = options

  const isPending = shallowRef(false)
  let timer: ReturnType<typeof setTimeout> | null = null

  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function stop() {
    isPending.value = false
    clear()
  }

  function start(...args: Parameters<CallbackFn> | []) {
    if (immediateCallback) cb()
    clear()
    isPending.value = true
    timer = setTimeout(() => {
      isPending.value = false
      timer = null
      cb(...args)
    }, interval)
  }

  if (immediate) {
    start()
  }

  onBeforeUnmount(() => {
    stop()
  })

  return {
    isPending: shallowReadonly(isPending),
    start,
    stop
  }
}

// ==================== 上下文通信 ====================

/**
 * 注入父组件提供的瀑布流上下文
 * 包含添加/移除项目、加载回调、列宽等信息
 */
const context = inject(waterfallContextKey)!
if (!context) {
  throw new Error('[wd-waterfall-item] 缺少瀑布流上下文，请确保组件仅在 <wd-waterfall> 内使用。')
}
// 生成唯一的项目ID，用于DOM查询
const itemId = `wd-waterfall-item-${uuid()}`
const slotId = ref(uuid())

const currWidth = ref(props.width || 320)
const currHeight = ref(props.height || 240)

const ratio = computed(() => currHeight.value / currWidth.value)
// 图片加载重试次数
let retryCount = context?.retryCount ?? 0

const FALLBACK_HEIGHT = 120 // 异常默认高度

// 错误状态枚举
const ItemStatus = {
  SUCCESS: 'success',
  FAIL: 'fail',
  TIMEOUT: 'timeout',
  OVER: 'over'
} as const

type ItemStatusType = (typeof ItemStatus)[keyof typeof ItemStatus]

// 错误状态
const errorState = shallowReactive({
  status: ItemStatus.SUCCESS as ItemStatusType,
  message: ''
})

// 设置状态的统一方法
function setStatus(status: ItemStatusType, message = '') {
  errorState.status = status
  errorState.message = message
}
// ==================== 项目信息管理 ====================

// 获取当前组件实例，用于DOM操作
const instance = getCurrentInstance()

/**
 * 项目信息对象（响应式）
 * 包含项目的所有状态信息，会被父组件用于布局计算
 */
const item = shallowReactive<WaterfallItemInfo>({
  loaded: false, // 是否加载完成（图片等资源）
  loadSuccess: false, // 是否加载成功
  visible: false, // 是否可见（由父组件控制）
  isInserted: false, // 是否插入项目
  height: 0, // 项目高度（DOM 实际高度）
  top: 0, // 垂直位置（由父组件计算）
  left: 0, // 水平位置（由父组件计算）
  heightError: false, // 是否高度异常
  order: toRef(props, 'order') as Ref<number>, //用于插入控制项目顺序
  updateHeight,
  refreshImage
})

let overtime = false

const { start: startTimeout } = useTimeout(async () => {
  if (!item.loaded && !overtime) {
    overtime = true
    // 根据模式决定超时后的处理方式
    switch (context.errorStrategy) {
      case 'default':
        setStatus(ItemStatus.TIMEOUT, '加载超时')
        break

      case 'placeholder':
        setStatus(ItemStatus.TIMEOUT, '加载占位超时')
        break

      case 'retry':
        setStatus(ItemStatus.TIMEOUT, '重试超时')
        break

      case 'retryHard':
        setStatus(ItemStatus.TIMEOUT, '加载超时')
        break
    }
    await item.updateHeight()
    item.loaded = true
  }
}, context?.maxWait)

// 如果是已知高度
async function onLoadKnownSize() {
  await item.updateHeight()
  item.loaded = true
  // 如果高度有问题，单独处理
  // if (!item.height || item.heightError) {
  //   console.warn('已知高度-项目高度异常，但仍标记为已加载')
  // }
  // todo 如果已知高度也加载失败了呢
}
// 模式1：默认模式 - 失败就结束
async function handleFailureNone() {
  setStatus(ItemStatus.OVER, '加载失败')
  await item.updateHeight()
  item.loaded = true
}

// 模式2：占位图模式 - 失败后直接显示占位图片
async function handleFailurePlaceholder() {
  setStatus(ItemStatus.FAIL, '原始内容加载失败，显示占位图片')
  // 不设置 loaded = true，让占位图片的加载回调来处理
}

// 模式3：重试模式 - 重试指定次数
async function handleFailureRetry() {
  // #ifdef MP-WEIXIN || MP-ALIPAY
  // 微信小程序不支持重试，直接进入最终状态
  setStatus(ItemStatus.OVER, `重试${context.retryCount}次后仍然失败`)
  await item.updateHeight()
  item.loaded = true
  // #endif
  // #ifndef MP-WEIXIN || MP-ALIPAY
  if (retryCount > 0) {
    retryCount--
    // 还有重试次数，重新加载
    await item.refreshImage(false)
  } else {
    // 重试次数用完，结束处理
    setStatus(ItemStatus.OVER, `重试${context.retryCount}次后仍然失败`)
    await item.updateHeight()
    item.loaded = true
  }
  // #endif
}

// 模式4：完整模式 - 原有的三层处理机制
async function handleFailureFinal() {
  if (overtime) return // 已超时，忽略后续加载事件
  // #ifdef MP-WEIXIN || MP-ALIPAY
  // 微信小程序不支持重试，直接进入失败状态
  setStatus(ItemStatus.FAIL, '原始内容加载失败')
  await item.updateHeight()
  item.loaded = true
  console.log('handleFailureFinal', item.loaded, item)

  // #endif
  // #ifndef MP-WEIXIN || MP-ALIPAY
  if (retryCount > 0) {
    retryCount--
    await item.refreshImage(false)
  } else {
    // 进入占位图片阶段
    setStatus(ItemStatus.FAIL, '原始内容加载失败')
    await item.updateHeight()
    item.loaded = true
  }
  // #endif
}
/**
 * 第一层：原始内容加载完成回调
 * 当项目内容（如图片）加载完成或失败时调用
 * 通知父组件进行重新布局
 */
async function loaded(event?: any) {
  // console.log('event', event)
  if (props.width && props.height) return
  if (overtime) return // 已超时，忽略后续加载事件
  item.loadSuccess = event?.type === 'load' || event?.type === 'onLoad'
  if (item.loadSuccess) {
    setStatus(ItemStatus.SUCCESS)
    await item.updateHeight()
    item.loaded = true
    // if (!item.height || item.heightError) {
    //   console.warn('高度异常-b，但仍标记为已加载', item.height, item) // 如果高度有问题，单独处理
    // }
    return
  }
  // 加载失败：根据异常处理策略处理
  switch (context.errorStrategy) {
    case 'default':
      // 默认模式：失败就结束，使用默认高度
      await handleFailureNone()
      break

    case 'placeholder':
      await handleFailurePlaceholder()
      break

    case 'retry':
      // 重试模式：重试指定次数后结束
      await handleFailureRetry()
      break

    case 'retryHard':
      // 完整模式：重试 + 占位图 + 兜底
      await handleFailureFinal()
      break
  }
}

/**
 * 第二层：占位图片加载成功
 * 支付宝小程序未解决的bug: 其他项加载太快，会导致这个方法不执行
 */
async function onPlaceholderLoad() {
  if (overtime) return // 已超时，忽略后续加载事件
  // #ifdef MP-WEIXIN || MP-ALIPAY
  await new Promise((resolve) => setTimeout(resolve, 100))
  // #endif
  await item.updateHeight()
  item.loaded = true
}

/**
 * 第二层失败：占位图片也加载失败，进入第三层（文字兜底）
 */
async function onPlaceholderError() {
  if (overtime) return // 已超时，忽略后续加载事件
  setStatus(ItemStatus.OVER, '占位图片也加载失败')
  // 最后显示最终兜底方案结束处理
  await item.updateHeight()
  item.loaded = true
}

/**
 * 更新项目高度
 * 通过 DOM 查询获取项目的实际渲染高度
 */

async function updateHeight(flag = false) {
  try {
    // console.log('context.removalProcessing', context.removalProcessing)
    // if (context.isLayoutInterrupted) return
    // console.log('触发了获取dom信息')
    await nextTick() // 很重要不然会导致获取高度错误
    // #ifdef MP-WEIXIN || MP-ALIPAY || APP-PLUS
    await new Promise((resolve) => setTimeout(resolve, 200))
    // #endif
    // 查询 DOM 元素的边界信息，获取实际高度
    const rect = await getRect(`.${itemId}`, false, instance?.proxy)
    const rectHeight = rect?.height

    if (!rectHeight || rectHeight === 0) {
      item.height = FALLBACK_HEIGHT // 出错了，使用默认高度
      item.heightError = true // 设置特殊高度与默认240高度区别开，避免误伤正常240的情况
      // console.warn('高度异常-a heightError', item.heightError, item)
    } else {
      // 注意 纯图片加载加载失败，图片容器可能也是240
      item.height = rectHeight
      item.heightError = false
      // if (rectHeight === 240) {
      //   console.warn('240高度可能是异常 heightError', item)
      // }
    }
    // 移除已处理的项目
    if (flag) {
      item.loaded = true
    }
  } catch (error) {
    // 查询失败时静默处理，避免报错
    console.error('error高度获取失败', item, error)
    item.height = FALLBACK_HEIGHT // 出错了，使用默认高度
    item.heightError = true // 设置特殊高度与默认240高度区别开，避免误伤正常240的情况
    // void error
    // 移除已处理的项目
    if (flag) {
      item.loaded = true
    }
  }
}
/**
 * 重新加载图片
 * @param isReset 是否重置所有错误状态
 */
async function refreshImage(isReset = true) {
  // 重新加载图片，重置所有错误状态
  item.loaded = false
  item.loadSuccess = false
  item.heightError = false
  slotId.value = uuid()

  // 重新启动超时计时器 todo 这里应该打开吗？需要使用参数控制是否重新启动定时器吗？
  if (isReset && context?.maxWait) {
    overtime = false
    startTimeout()
  }
}

// ==================== 生命周期管理 ====================

/**
 * 组件挂载时：将自己注册到父组件的项目列表中，并启动超时计时器
 */
onMounted(async () => {
  context.addItem(item)
  // 判断是否开启固定宽度高度
  if (props.width && props.height) {
    // 解决小程序app的bug
    setTimeout(() => {
      onLoadKnownSize()
    }, 16)
  }
  if (context?.maxWait) {
    startTimeout()
  }
})

/**
 * 组件卸载前：从父组件的项目列表中移除自己
 */
onBeforeUnmount(() => {
  context.removeItem(item)
})

// ==================== 动画效果管理 ====================

const laterVisible = ref(false)

const { start } = useTimeout(() => {
  laterVisible.value = true
}, 100)

watch(
  () => item.visible,
  () => {
    if (item.visible) {
      start()
    } else {
      laterVisible.value = false
    }
  }
)

// ==================== 样式计算 ====================

/**
 * 计算项目的内联样式
 * 包含：宽度、位置变换、过渡动画
 */
const waterfallItemStyle = computed(() => {
  return {
    width: `${context.columnWidth}px`,
    transform: `translate3d(${item.left}px,${item.top}px,0px)`,
    transition: laterVisible.value
      ? 'opacity var(--wd-waterfall-duration) ease-out,transform var(--wd-waterfall-duration) ease-out' // 包含位置动画，使用缓出效果
      : 'opacity var(--wd-waterfall-duration) ease-out' // 仅包含透明度动画
  }
})
</script>

<template>
  <!-- #ifdef MP-DINGTALK -->
  <view>
    <!-- #endif -->
    <view
      :class="['wd-waterfall-item', itemId, customClass, { 'is-show': item.visible, 'is-reflowing': context.isReflowing }]"
      :style="[waterfallItemStyle, customStyle]"
    >
      <slot
        :key="slotId"
        :loaded="loaded"
        :column-width="context.columnWidth"
        :image-height="context.columnWidth * ratio"
        :status="errorState.status"
        :message="errorState.message"
        :onPlaceholderLoad="onPlaceholderLoad"
        :onPlaceholderError="onPlaceholderError"
      />
    </view>
    <!-- #ifdef MP-DINGTALK -->
  </view>
  <!-- #endif -->
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
