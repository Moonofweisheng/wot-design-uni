import type { ExtractPropTypes } from 'vue'
import { baseProps, makeNumericProp, makeStringProp } from '../common/props'

/**
 * 消息提示类型
 */
export type MsgType = 'success' | 'warn' | 'clear' | 'waiting'

/**
 * 消息提示组件属性
 */
export const msgProps = {
  ...baseProps,
  /**
   * 主题类型
   * 类型：string
   * 可选值：'success' /'warn' / 'clear' / 'waiting'
   * 默认值：'success'
   */
  type: makeStringProp<MsgType>('success'),
  /**
   * 标题文字
   * 类型：string
   * 默认值：'空字符串'
   */
  title: makeStringProp(''),
  /**
   * 图标url，优先级高于type
   * 类型：string
   * 默认值：null
   */
  src: makeStringProp<string | null>(null),
  /**
   * 图标宽度
   * 类型：Number | String
   * 默认值：90
   */
  width: makeNumericProp(90),
  /**
   * 图标高度
   * 类型：Number | String
   * 默认值：90
   */
  height: makeNumericProp(90),
  /**
   * 描述文字
   * 类型：string
   * 默认值：null
   */
  desc: makeStringProp<string | null>(null),
  /**
   * 图标颜色
   * 类型：string
   * 默认值：''
   */
  color: makeStringProp(''),
  /**
   * 图标大小
   * 类型：Number | String
   * 默认值：64
   */
  size: makeNumericProp(64),
  /**
   * 自定义根节点样式
   * 类型：string
   * 默认值：''
   */
  customStyle: makeStringProp(''),
  /**
   * 自定义根节点样式类
   * 类型：string
   * 默认值：''
   */
  customClass: makeStringProp('')
}

/**
 * 消息提示组件属性类型
 */
export type MsgProps = ExtractPropTypes<typeof msgProps>
