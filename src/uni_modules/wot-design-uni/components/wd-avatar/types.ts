/*
 * @Author: weisheng
 * @Date: 2025-12-30
 * @LastEditTime: 2025-12-30
 * @LastEditors: weisheng
 * @Description: Avatar 头像组件类型定义
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-avatar/types.ts
 * 记得注释
 */
import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp, numericProp } from '../common/props'
import type { ImageMode } from '../wd-img/types'

export type AvatarSize = 'large' | 'medium' | 'normal' | 'small'
export type AvatarShape = 'square' | 'round'

export const avatarProps = {
  ...baseProps,

  /**
   * 图片地址
   * 类型: string
   * 默认值: 空字符串
   */
  src: makeStringProp(''),

  /**
   * 文本内容
   * 类型: string
   * 默认值: 空字符串
   */
  text: makeStringProp(''),

  /**
   * 头像尺寸，支持预设尺寸(large/medium/normal/small)或带单位的字符串(如 40px、100rpx)
   * 类型: string | number
   * 默认值: 'normal'
   */
  size: numericProp,

  /**
   * 头像形状，可选值: round(圆形) / square(方形)
   * 类型: string
   * 默认值: 'round'
   */
  shape: makeStringProp<AvatarShape>('round'),

  /**
   * 背景颜色
   * 类型: string
   * 默认值: 空字符串
   */
  bgColor: makeStringProp(''),

  /**
   * 文字颜色
   * 类型: string
   * 默认值: 空字符串
   */
  color: makeStringProp(''),

  /**
   * 图标名称，使用 wd-icon 组件
   * 类型: string
   * 默认值: 空字符串
   */
  icon: makeStringProp(''),

  /**
   * 图片加载失败时的占位文本
   * 类型: string
   * 默认值: 空字符串
   */
  alt: makeStringProp(''),

  /**
   * 图片填充模式，同 uni-app image 组件的 mode
   * 类型: ImageMode
   * 默认值: 'aspectFill'
   */
  mode: makeStringProp<ImageMode>('aspectFill'),

  /**
   * 内部使用，不注册到 parent
   * @private
   */
  _internal: Boolean
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
