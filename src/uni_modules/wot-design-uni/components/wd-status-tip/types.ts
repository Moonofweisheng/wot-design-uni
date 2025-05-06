/*
 * @Author: weisheng
 * @Date: 2024-03-15 13:49:00
 * @LastEditTime: 2024-09-19 14:45:29
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-status-tip\types.ts
 * 记得注释
 */
import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp } from '../common/props'
import type { ImageMode } from '../wd-img/types'

export type ImageSize = {
  /**
   * 宽度
   */
  width: number | string
  /**
   * 高度
   */
  height: number | string
}

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
   * 类型: string 或 number 或 ImageSize
   * 默认值: 空字符串
   */
  imageSize: {
    type: [String, Number, Object] as PropType<string | number | ImageSize>,
    default: ''
  },
  /**
   * 提示文案。
   * 类型: string
   * 默认值: 空字符串
   */
  tip: makeStringProp(''),
  /**
   * 图片裁剪、缩放的模式
   * 类型：string
   * 默认值：'aspectFill'
   */
  imageMode: makeStringProp<ImageMode>('aspectFill'),
  /**
   * 图片路径前缀，指向图片所在目录，用于拼接图片 URL。推荐将图片放到自己的服务器上，并设置此属性。
   * 类型: string
   * 默认值: https://registry.npmmirror.com/wot-design-uni-assets/*\/files/
   */
  urlPrefix: makeStringProp('https://registry.npmmirror.com/wot-design-uni-assets/*/files/')
}

export type StatusTipProps = ExtractPropTypes<typeof statusTipProps>
