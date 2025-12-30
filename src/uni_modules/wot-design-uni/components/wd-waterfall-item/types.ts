import { type Ref } from 'vue'
import { baseProps } from '../common/props'

/**
 * 错误状态
 */
export type Status = 'success' | 'fail' | 'timeout' | 'over'
/**
 * 瀑布流项目组件属性
 */
export const waterfallItemProps = {
  /**
   * 项目索引
   */
  order: {
    type: Number,
    default: undefined
  },
  /**
   * 固定宽度（可选）
   */
  width: {
    type: Number,
    default: undefined
  },
  /**
   * 固定高度（可选）
   */
  height: {
    type: Number,
    default: undefined
  },

  ...baseProps
}

/**
 * 瀑布流项目组件属性类型
 */
export interface WaterfallItemProps {
  order?: number
  width?: number
  height?: number
  customClass?: string
  customStyle?: string
}

/**
 * 瀑布流项目组件插槽
 */
export interface WaterfallItemSlots {
  /**
   * 默认插槽
   * @param loaded 加载完成回调
   * @param columnWidth 列宽度
   * @param imageHeight 图片高度
   * @param status 错误状态
   * @param message 错误信息
   * @param onFallbackLoad 降级图片加载回调
   * @param onFallbackError 降级图片错误回调
   */
  default(props: {
    key: string
    loaded: (event?: any) => void
    columnWidth: number
    imageHeight: number
    status: Status
    message: string
    onFallbackLoad: () => void
    onFallbackError: () => void
  }): any
}

/**
 * 瀑布流项目组件事件
 */
// export interface WaterfallItemEmits {}

/**
 * 瀑布流项目组件暴露的方法
 */
export interface WaterfallItemExpose {
  // 暂无暴露方法
}

/**
 * 瀑布流项目信息
 */
export interface WaterfallItemInfo {
  /**
   * 是否处理完成（包括成功、失败、超时等所有终态）
   */
  finished: boolean
  /**
   * 是否加载成功
   */
  loadSuccess: boolean
  /**
   * 是否可见（由父组件控制）
   */
  visible: boolean
  /**
   * 是否插入项目
   */
  isInserted: boolean
  /**
   * 是否高度异常
   */
  heightError: boolean
  /**
   * 项目高度（DOM 实际高度）
   */
  height: number
  /**
   * 垂直位置（由父组件计算）
   */
  top: number
  /**
   * 水平位置（由父组件计算）
   */
  left: number
  /**
   * 项目索引
   */
  order?: Ref<number>
  /**
   * 更新高度方法
   */
  updateHeight: (flag?: boolean) => Promise<void>
  /**
   * 重新加载图片方法
   */
  refreshImage: (isReset?: boolean) => Promise<void>
}
