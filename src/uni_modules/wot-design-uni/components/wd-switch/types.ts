import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, numericProp } from '../common/props'

export type SwitchBeforeChangeOption = {
  value: number | string | boolean
  resolve: (pass: boolean) => void
}

export type SwitchBeforeChange = (option: SwitchBeforeChangeOption) => void

export const switchProps = {
  ...baseProps,
  /**
   * 绑定值
   */
  modelValue: {
    type: [Boolean, String, Number],
    required: true,
    default: false
  },
  /**
   * 是否禁用
   */
  disabled: makeBooleanProp(false),
  /**
   * 激活值
   */
  activeValue: {
    type: [Boolean, String, Number],
    default: true
  },
  /**
   * 非激活值
   */
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false
  },
  /**
   * 激活颜色
   */
  activeColor: String,
  /**
   * 非激活颜色
   */
  inactiveColor: String,
  /**
   * 大小
   */
  size: {
    type: numericProp
  },
  /**
   * 在改变前执行的函数
   */
  beforeChange: Function as PropType<SwitchBeforeChange>
}
export type SwitchProps = ExtractPropTypes<typeof switchProps>
