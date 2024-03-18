import { type InjectionKey } from 'vue'
import type { RadioShape } from '../wd-radio/types'
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
  }
  updateValue: (value: string | number | boolean) => void
}

export const RADIO_GROUP_KEY: InjectionKey<RadioGroupProvide> = Symbol('wd-radio-group')

export const radioGroupProps = {
  ...baseProps,
  modelValue: [String, Number, Boolean],
  shape: makeStringProp<RadioShape>('check'),
  checkedColor: String,
  disabled: makeBooleanProp(false),
  cell: makeBooleanProp(false),
  size: makeStringProp(''),
  inline: makeBooleanProp(false)
}
