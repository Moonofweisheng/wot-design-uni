import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp } from '../common/props'

export type SwitchBeforeChangeOption = {
  value: number | string | boolean
  resolve: (pass: boolean) => void
}

export type SwitchBeforeChange = (option: SwitchBeforeChangeOption) => void

export const switchProps = {
  ...baseProps,
  modelValue: {
    type: [Boolean, String, Number],
    required: true,
    default: false
  }, // 模型值
  disabled: makeBooleanProp(false), // 是否禁用
  activeValue: {
    type: [Boolean, String, Number],
    default: true
  }, // 激活值
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false
  }, // 非激活值
  activeColor: String, // 激活颜色
  inactiveColor: String, // 非激活颜色
  size: makeNumberProp(28), // 大小
  beforeChange: Function as PropType<SwitchBeforeChange> // 在改变前执行的函数
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>
