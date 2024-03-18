/*
 * @Author: weisheng
 * @Date: 2024-03-15 13:49:00
 * @LastEditTime: 2024-03-18 17:19:32
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-status-tip\types.ts
 * 记得注释
 */
import type { ExtractPropTypes } from 'vue'
import { baseProps, makeStringProp } from '../common/props'

export const statusTipProps = {
  ...baseProps,

  /**
   * 缺省图片类型，支持传入图片 URL。
   * 类型: string
   * 可选值: search, network, content, collect, comment, halo, message
   * 默认值: network
   */
  image: makeStringProp('network'),

  /**
   * 图片大小，默认单位为 `px`。
   * 类型: string 或 number
   * 默认值: 空字符串
   */
  imageSize: makeStringProp(''),

  /**
   * 提示文案。
   * 类型: string
   * 默认值: 空字符串
   */
  tip: makeStringProp('')
}

export type StatusTipProps = ExtractPropTypes<typeof statusTipProps>
