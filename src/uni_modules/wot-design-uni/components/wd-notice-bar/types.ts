import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type NoticeBarType = 'warning' | 'info' | 'danger' | ''
export type NoticeBarScrollDirection = 'horizontal' | 'vertical'

export const noticeBarProps = {
  ...baseProps,
  /**
   * 设置通知栏文案
   */
  text: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  /**
   * 设置通知栏类型，可选值为：'warning' | 'info' | 'danger'
   */
  type: makeStringProp<NoticeBarType>('warning'),
  /**
   * 是否可滚动
   */
  scrollable: makeBooleanProp(true),
  /**
   * 滚动延迟时间（秒）
   */
  delay: makeNumberProp(1),
  /**
   * 滚动速度（px/s）
   */
  speed: makeNumberProp(50),
  /**
   * 是否可关闭
   */
  closable: makeBooleanProp(false),
  /**
   * 是否换行显示
   */
  wrapable: makeBooleanProp(false),
  /**
   * 设置左侧图标，使用 icon 章节中的图标名
   */
  prefix: String,
  /**
   * 文字、图标颜色
   */
  color: String,
  /**
   * 背景颜色
   */
  backgroundColor: String,
  /**
   * 滚动方向
   */
  direction: makeStringProp<NoticeBarScrollDirection>('horizontal')
}

export type NoticeBarProps = ExtractPropTypes<typeof noticeBarProps>

export type NoticeBarExpose = {
  /**
   * 重置NoticeBar动画
   */
  reset: () => void
}

export type NoticeBarInstance = ComponentPublicInstance<NoticeBarProps, NoticeBarExpose>
