import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp } from '../common/props'

export const mediaPreviewProps = {
  ...baseProps,
  /**
   * 图片/视频列表
   */
  list: makeArrayProp<string>(),
  /**
   * 当前预览图片的索引
   */
  current: makeNumberProp(0),
  /**
   * 是否展示遮罩层
   */
  show: makeBooleanProp(false),
  /**
   * 是否锁定滚动
   */
  lockScroll: makeBooleanProp(true),
  /**
   * 层级
   */
  zIndex: makeNumberProp(10),
  /**
   * 选择器
   */
  selector: String
}

export type MediaPreviewProps = Partial<ExtractPropTypes<typeof mediaPreviewProps>>

export interface MediaPreview {
  // 打开MediaPreview
  show(option: MediaPreviewProps | string): void
  // 关闭MediaPreview
  close(): void
}
