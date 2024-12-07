import { type InjectionKey } from 'vue'
import type { RadioShape, RadioIconPlacement } from '../wd-radio/types'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type RadioGroupProvide = {
  props: {
    modelValue?: string | number | boolean
    shape?: RadioShape
    checkedColor?: string
    disabled?: boolean
    cell?: boolean
    size?: string
    inline?: boolean
    iconPlacement?: RadioIconPlacement
  }
  updateValue: (value: string | number | boolean) => void
}

export const RADIO_GROUP_KEY: InjectionKey<RadioGroupProvide> = Symbol('wd-radio-group')

export const radioGroupProps = {
  ...baseProps,
  /** 会自动选中value对应的单选框 */
  modelValue: [String, Number, Boolean],
  /** 单选框形状，可选值为 dot / button / check，默认为 check */
  shape: makeStringProp<RadioShape>('check'),
  /** 选中的颜色，默认为 #4D80F0 */
  checkedColor: String,
  /** 是否禁用，默认为 false */
  disabled: makeBooleanProp(false),
  /** 表单模式，默认为 false */
  cell: makeBooleanProp(false),
  /** 设置大小，默认为空 */
  size: makeStringProp(''),
  /** 同行展示，默认为 false */
  inline: makeBooleanProp(false),
  /** 图标位置，默认为 left */
  iconPlacement: makeStringProp<RadioIconPlacement>('auto')
}
