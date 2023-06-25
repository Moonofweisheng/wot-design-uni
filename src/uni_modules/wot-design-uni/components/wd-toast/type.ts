/*
 * @Author: weisheng
 * @Date: 2023-06-19 12:47:57
 * @LastEditTime: 2023-06-19 16:55:30
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-toast\type.ts
 * 记得注释
 */
import { LoadingType } from '../wd-loading/type'

export type ToastIconType = 'success' | 'error' | 'warning' | 'loading' | 'info' // 图标类型

export type ToastPositionType = 'top' | 'middle' | 'bottom' // 提示信息框的位置类型

export type ToastLoadingType = LoadingType // 提示信息加载状态类型

export type ToastOptions = {
  msg?: string
  duration?: number
  iconName?: ToastIconType
  iconSize?: number
  loadingType?: ToastLoadingType
  loadingColor?: string
  iconColor?: string
  loadingSize?: number
  customIcon?: boolean
  position?: ToastPositionType
  show?: boolean
  zIndex?: number
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
