/*
 * @Author: 810505339
 * @Date: 2025-01-10 20:03:57
 * @LastEditors: weisheng
 * @LastEditTime: 2025-03-23 16:35:14
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-signature/types.ts
 * 记得注释
 */
import type { ComponentPublicInstance, ExtractPropTypes } from 'vue'
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
  /**
   * 是否开启历史记录
   * 类型：boolean
   * 默认值：false
   */
  enableHistory: {
    type: Boolean,
    default: false
  },
  /**
   * 撤回和恢复的步长
   * 类型：number
   * 默认值：1
   */
  step: {
    type: Number,
    default: 1
  },
  /**
   * 撤回按钮的文本
   * 类型：string
   * 默认值：撤销
   */
  undoText: String,
  /**
   * 恢复按钮的文本
   * 类型：string
   * 默认值：恢复
   */
  redoText: String,
  /**
   * 是否启用压感模式(笔锋)
   * 类型：boolean
   * 默认值：false
   */
  pressure: {
    type: Boolean,
    default: false
  },
  /**
   * 压感模式下笔画最小宽度
   * 类型：number
   * 默认值：2
   */
  minWidth: {
    type: Number,
    default: 2
  },
  /**
   * 压感模式下笔画最大宽度
   * 类型：number
   * 默认值：6
   */
  maxWidth: {
    type: Number,
    default: 6
  },
  /**
   * 最小速度阈值，影响压感模式下的笔画宽度变化
   * 类型：number
   * 默认值：1.5
   */
  minSpeed: {
    type: Number,
    default: 1.5
  }
}

/**
 * 签名结果类型
 * @property tempFilePath - 生成图片的临时路径
 * @property success - 是否成功生成图片
 * @property width - 生成图片的宽度
 * @property height - 生成图片的高度
 */
export type SignatureResult = {
  tempFilePath: string
  success: boolean
  width: number
  height: number
}

/**
 * 签名线条类型
 * @property points - 线条所包含的所有点的数组
 * @property color - 线条颜色
 * @property width - 线条宽度
 * @property backgroundColor - 线条背景色 (可选)
 * @property isPressure - 是否为笔锋模式的线条 (可选)
 */
export interface Line {
  points: Point[]
  color: string
  width: number
  backgroundColor?: string
  isPressure?: boolean
}

/**
 * 签名点位类型
 * @property x - 点的横坐标
 * @property y - 点的纵坐标
 * @property t - 点的时间戳
 * @property speed - 当前点的绘制速度 (可选)
 * @property distance - 与上一个点的距离 (可选)
 * @property lineWidth - 当前点的线宽 (可选，用于笔锋模式)
 * @property lastX1 - 贝塞尔曲线第一个控制点的x坐标 (可选)
 * @property lastY1 - 贝塞尔曲线第一个控制点的y坐标 (可选)
 * @property lastX2 - 贝塞尔曲线第二个控制点的x坐标 (可选)
 * @property lastY2 - 贝塞尔曲线第二个控制点的y坐标 (可选)
 * @property isFirstPoint - 是否为线条的第一个点 (可选)
 */
export interface Point {
  x: number
  y: number
  t: number
  speed?: number
  distance?: number
  lineWidth?: number
  lastX1?: number
  lastY1?: number
  lastX2?: number
  lastY2?: number
  isFirstPoint?: boolean
}

/**
 * 签名组件暴露的方法类型
 * @property init - 初始化签名板
 * @property clear - 清除签名
 * @property confirm - 确认签名并生成图片
 * @property restore - 恢复上一步操作
 * @property revoke - 撤销上一步操作
 */
export type SignatureExpose = {
  /** 初始化签名板
   * @param forceUpdate - 是否强制更新
   */
  init: (forceUpdate?: boolean) => void
  /** 点击清除按钮清除签名 */
  clear: () => void
  /** 点击确定按钮 */
  confirm: () => void
  /* 点击恢复 */
  restore: () => void
  /* 点击撤回 */
  revoke: () => void
}

export type SignatureProps = ExtractPropTypes<typeof signatureProps>

export type SignatureInstance = ComponentPublicInstance<SignatureExpose, SignatureProps>
