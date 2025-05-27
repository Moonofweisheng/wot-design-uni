import type { PropType } from 'vue'
import type { StyleValue } from 'vue'

export const unknownProp = null as unknown as PropType<unknown>

export const numericProp = [Number, String]

export const truthProp = {
  type: Boolean,
  default: true as const
}

export const makeRequiredProp = <T>(type: T) => ({
  type,
  required: true as const
})

export const makeArrayProp = <T>() => ({
  type: Array as PropType<T[]>,
  default: () => []
})

export const makeBooleanProp = <T>(defaultVal: T) => ({
  type: Boolean,
  default: defaultVal
})

export const makeNumberProp = <T>(defaultVal: T) => ({
  type: Number,
  default: defaultVal
})

export const makeNumericProp = <T>(defaultVal: T) => ({
  type: numericProp,
  default: defaultVal
})

export const makeStringProp = <T>(defaultVal: T) => ({
  type: String as unknown as PropType<T>,
  default: defaultVal
})

export type ICustomClass = string | Array<string> | Record<string, boolean>

export const baseProps = {
  /**
   * 自定义根节点样式
   */
  customStyle: {
    type: [String, Object, Array, null] as unknown as PropType<StyleValue>,
    default: ''
  },
  /**
   * 自定义根节点样式类
   */
  customClass: {
    type: [String, Array, Object, null] as unknown as PropType<ICustomClass>,
    default: ''
  }
}
