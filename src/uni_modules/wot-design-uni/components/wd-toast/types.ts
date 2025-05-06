/*
 * @Author: weisheng
 * @Date: 2023-06-19 12:47:57
 * @LastEditTime: 2025-02-16 15:52:17
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-toast/types.ts
 * 记得注释
 */
import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp } from '../common/props'
import type { LoadingType } from '../wd-loading/types'

export type ToastIconType = 'success' | 'error' | 'warning' | 'loading' | 'info' // 图标类型

export type ToastPositionType = 'top' | 'middle-top' | 'middle' | 'bottom' // 提示信息框的位置类型

export type ToastDirection = 'vertical' | 'horizontal' // 提示信息框的排列方向

export type ToastLoadingType = LoadingType // 提示信息加载状态类型

export type ToastOptions = {
  msg?: string
  duration?: number
  direction?: ToastDirection
  iconName?: ToastIconType
  iconSize?: number
  loadingType?: ToastLoadingType
  loadingColor?: string
  loadingSize?: number
  iconColor?: string
  position?: ToastPositionType
  show?: boolean
  zIndex?: number
  /**
   * 是否存在遮罩层
   */
  cover?: boolean
  /**
   * 图标类名
   */
  iconClass?: string
  /**
   * 类名前缀，用于使用自定义图标
   */
  classPrefix?: string
  /**
   * 完全展示后的回调函数
   */
  opened?: () => void
  /**
   * 完全关闭时的回调函数
   */
  closed?: () => void
}

export interface Toast {
  // 打开Toast
  show(toastOptions: ToastOptions | string): void
  // 成功提示
  success(toastOptions: ToastOptions | string): void
  // 关闭提示
  error(toastOptions: ToastOptions | string): void
  // 常规提示
  info(toastOptions: ToastOptions | string): void
  // 警告提示
  warning(toastOptions: ToastOptions | string): void
  // 加载提示
  loading(toastOptions: ToastOptions | string): void
  // 关闭Toast
  close(): void
}

export const toastProps = {
  ...baseProps,
  /**
   * 选择器
   * @type {string}
   * @default ''
   */
  selector: makeStringProp(''),
  /**
   * 提示信息
   * @type {string}
   * @default ''
   */
  msg: {
    type: String,
    default: ''
  },
  /**
   * 排列方向
   * @type {'vertical' | 'horizontal'}
   * @default 'horizontal'
   */
  direction: makeStringProp<ToastDirection>('horizontal'),
  /**
   * 图标名称
   * @type {'success' | 'error' | 'warning' | 'loading' | 'info'}
   * @default ''
   */
  iconName: {
    type: String as PropType<ToastIconType>,
    default: ''
  },
  /**
   * 图标大小
   * @type {number}
   */
  iconSize: Number,
  /**
   * 加载类型
   * @type {'outline' | 'ring'}
   * @default 'outline'
   */
  loadingType: makeStringProp<ToastLoadingType>('outline'),
  /**
   * 加载颜色
   * @type {string}
   * @default '#4D80F0'
   */
  loadingColor: {
    type: String,
    default: '#4D80F0'
  },
  /**
   * 加载大小
   * @type {number}
   */
  loadingSize: Number,
  /**
   * 图标颜色
   * @type {string}
   */
  iconColor: String,
  /**
   * 位置
   * @type {'top' | 'middle-top' | 'middle' | 'bottom'}
   * @default 'middle-top'
   */
  position: makeStringProp<ToastPositionType>('middle-top'),
  /**
   * 层级
   * @type {number}
   * @default 100
   */
  zIndex: {
    type: Number,
    default: 100
  },
  /**
   * 是否存在遮罩层
   * @type {boolean}
   * @default false
   */
  cover: {
    type: Boolean,
    default: false
  },
  /**
   * 图标类名
   * @type {string}
   * @default ''
   */
  iconClass: {
    type: String,
    default: ''
  },
  /**
   * 类名前缀
   * @type {string}
   * @default 'wd-icon'
   */
  classPrefix: {
    type: String,
    default: 'wd-icon'
  },
  /**
   * 完全展示后的回调函数
   * @type {Function}
   */
  opened: Function as PropType<() => void>,
  /**
   * 完全关闭时的回调函数
   * @type {Function}
   */
  closed: Function as PropType<() => void>
}

export type ToastProps = ExtractPropTypes<typeof toastProps>
