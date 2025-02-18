/*
 * @Author: 810505339
 * @Date: 2025-01-10 20:03:57
 * @LastEditors: 810505339
 * @LastEditTime: 2025-02-18 13:04:45
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-signature\types.ts
 * 记得注释
 */
import { baseProps, numericProp } from '../common/props'

export const signatureProps = {
  ...baseProps,
  /**
   * 签名笔颜色
   * 类型：string
   * 默认值：#000
   */
  penColor: {
    type: String,
    default: '#000'
  },
  /**
   * 签名笔宽度
   * 类型：number
   * 默认值：3
   */
  lineWidth: {
    type: Number,
    default: 3
  },
  /**
   * 清空按钮的文本
   * 类型：string
   */
  clearText: String,
  /**
   * 撤回按钮的文本
   * 类型：string
   */
  revokeText: String,
  /**
   * 恢复按钮的文本
   * 类型：string
   */
  restoreText: String,
  /**
   * 确认按钮的文本
   * 类型：string
   */
  confirmText: String,
  /**
   * 目标文件的类型
   * 类型：string
   * 默认值：png
   */
  fileType: {
    type: String,
    default: 'png'
  },
  /**
   * 目标文件的质量
   * 类型：number
   * 默认值：1
   */
  quality: {
    type: Number,
    default: 1
  },
  /**
   * 导出图片的缩放比例
   * 类型：number
   * 默认值：1
   */
  exportScale: {
    type: Number,
    default: 1
  },
  /**
   * 是否禁用签名板
   * 类型：boolean
   * 默认值：false
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 画布的高度
   * 类型：number
   */
  height: numericProp,
  /**
   * 画布的宽度
   * 类型：number
   */
  width: numericProp,
  /**
   * 画板的背景色
   * 类型：string
   */
  backgroundColor: String,
  /**
   * 是否禁用画布滚动
   * 类型：boolean
   * 默认值：true
   */
  disableScroll: {
    type: Boolean,
    default: true
  },
  /* 是否开始历史记录 */
  history: {
    type: Boolean,
    default: false
  },
  step: {
    type: Number,
    default: 1
  },
  undoText: String,
  redoText: String
}
export type SignatureResult = {
  tempFilePath: string
  success: boolean
  width: number
  height: number
}
export type SignatureExpose = {
  /** 点击清除按钮清除签名 */
  clear: () => void
  /** 点击确定按钮 */
  confirm: (result: SignatureResult) => void
  /* 点击恢复 */
  restore: () => void
  /* 点击撤回 */
  revoke: () => void
}
