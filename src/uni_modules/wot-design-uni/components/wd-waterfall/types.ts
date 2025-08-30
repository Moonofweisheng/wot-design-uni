import type { InjectionKey } from 'vue'
import type { WaterfallItemInfo } from '../wd-waterfall-item/types'
import { baseProps } from '../common/props'

/**
 * 错误处理模式
 */
export type ErrorMode = 'none' | 'placeholder' | 'retry' | 'fallback' | 'ignore'
/**
 * 瀑布流组件属性
 */
export const waterfallProps = {
  /**
   * 列数
   */
  columns: {
    type: Number,
    default: 2
  },
  /**
   * 列间距（px）
   */
  columnGap: {
    type: Number,
    default: 8
  },
  /**
   * 行间距（px）
   */
  rowGap: {
    type: Number,
    default: 8
  },
  /**
   * 是否显示
   */
  show: {
    type: Boolean,
    default: undefined
  },
  /**
   * 错误处理模式
   */
  errorMode: {
    type: String as () => ErrorMode,
    default: 'none'
  },
  /**
   * 重试次数
   */
  retryCount: {
    type: Number,
    default: 1
  },
  /**
   * 最大等待时间（毫秒）
   */
  maxWait: {
    type: Number,
    default: 3000
  },
  ...baseProps
}

/**
 * 瀑布流组件属性类型
 */
export interface WaterfallProps {
  columns?: number
  columnGap?: number
  rowGap?: number
  show?: boolean
  errorMode?: ErrorMode
  retryCount?: number
  maxWait?: number
  customClass?: string
  customStyle?: string
}

/**
 * 瀑布流组件默认属性
 */
export const defaultWaterfallProps: Partial<WaterfallProps> = {
  columns: 2,
  columnGap: 8,
  rowGap: 8,
  show: undefined,
  errorMode: 'none',
  retryCount: 1
}

/**
 * 瀑布流组件插槽
 */
export interface WaterfallSlots {
  /**
   * 默认插槽
   */
  default(): any
}

/**
 * 瀑布流组件事件
 */
export interface WaterfallEmits {
  /**
   * 加载开始事件
   */
  (e: 'loadStart'): void
  /**
   * 加载结束事件
   */
  (e: 'loadEnd'): void
  /**
   * 显示状态更新事件
   */
  (e: 'update:show', value: boolean): void
}

/**
 * 瀑布流组件暴露的方法
 */
export interface WaterfallExpose {
  /**
   * 完整重排（重置所有状态）
   */
  reflow: () => void
  /**
   * 刷新重排（重置所有状态，包括数据）
   */
  refreshReflow: () => void
  /**
   * 注册加载完成回调
   */
  loadDone: (handler: () => void) => void
}

/**
 * 瀑布流上下文
 */
export interface WaterfallContext {
  /**
   * 添加项目到瀑布流
   */
  addItem: (item: WaterfallItemInfo) => void
  /**
   * 从瀑布流中移除项目
   */
  removeItem: (item: WaterfallItemInfo) => void
  /**
   * 项目加载完成回调
   */
  onItemLoad: (item: WaterfallItemInfo) => void
  /**
   * 列宽度（响应式）
   */
  columnWidth: number
  /**
   * 全局重排状态（响应式）
   */
  isReflowing: boolean
  /**
   * 排版中断状态（响应式）
   */
  isLayoutInterrupted: boolean
  /**
   * 错误处理模式
   */
  errorMode: ErrorMode
  /**
   * 重试次数
   */
  retryCount: number
  /**
   * 最大等待时间（毫秒）
   */
  maxWait: number
}

/**
 * 瀑布流上下文注入键
 */
export const waterfallContextKey: InjectionKey<WaterfallContext> = Symbol('waterfallContext')
