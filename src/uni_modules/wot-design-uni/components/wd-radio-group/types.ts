import { type InjectionKey } from 'vue'

type RadioShape = 'dot' | 'button' | 'check'

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
