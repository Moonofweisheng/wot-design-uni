import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export const rateProps = {
  ...baseProps,

  /**
   * 评分最大值
   * 类型: number
   * 默认值: 5
   */
  num: makeNumberProp(5),

  /**
   * 当前分数，使用v-model进行双向绑定
   * 类型: string | number | null
   * 默认值: null
   */
  modelValue: {
    type: [String, Number, null] as PropType<string | number | null>,
    default: null
  },

  /**
   * 是否只读
   * 类型: boolean
   * 默认值: false
   */
  readonly: makeBooleanProp(false),

  /**
   * 图标大小
   * 类型: string
   * 默认值: '16px'
   */
  size: makeStringProp('16px'),

  /**
   * 图标间距
   * 类型: string
   * 默认值: '4px'
   */
  space: makeStringProp('4px'),

  /**
   * 未选中的图标颜色
   * 类型: string
   * 默认值: '#E8E8E8'
   */
  color: makeStringProp('#E8E8E8'),

  /**
   * 选中的图标颜色，支持传颜色数组（用于分段颜色）
   * 类型: string | Array<string>
   * 默认值: 'linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)'
   */
  activeColor: {
    type: [String, Array] as PropType<string | Array<string>>,
    default: 'linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)'
  },

  /**
   * 未选中的图标类名
   * 类型: string
   * 默认值: 'star-on'
   */
  icon: makeStringProp('star-on'),

  /**
   * 选中的图标类名
   * 类型: string
   * 默认值: 'star-on'
   */
  activeIcon: makeStringProp('star-on'),

  /**
   * 是否禁用
   * 类型: boolean
   * 默认值: false
   */
  disabled: makeBooleanProp(false),

  /**
   * 禁用的图标颜色
   * 类型: string
   * 默认值: 'linear-gradient(315deg, rgba(177,177,177,1) 0%,rgba(199,199,199,1) 100%)'
   */
  disabledColor: makeStringProp('linear-gradient(315deg, rgba(177,177,177,1) 0%,rgba(199,199,199,1) 100%)'),

  /**
   * 是否允许半选
   * 类型: boolean
   * 默认值: false
   */
  allowHalf: makeBooleanProp(false)
}
