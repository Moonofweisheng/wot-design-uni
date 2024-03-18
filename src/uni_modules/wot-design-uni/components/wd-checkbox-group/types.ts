import { type ExtractPropTypes, type InjectionKey, type PropType } from 'vue'
import type { CheckShape } from '../wd-checkbox/types'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type RequiredModelValue = {
  modelValue: Array<string | number | boolean>
}

export type checkboxGroupProvide = {
  props: Partial<Omit<CheckboxGroupProps, 'modelValue'>> & RequiredModelValue
  changeSelectState: (value: string | number | boolean) => void
}

export const CHECKBOX_GROUP_KEY: InjectionKey<checkboxGroupProvide> = Symbol('wd-checkbox-group')

export const checkboxGroupProps = {
  ...baseProps,
  /**
   * 绑定值
   */
  modelValue: {
    type: Array as PropType<Array<string | number | boolean>>,
    default: () => []
  },
  /**
   * 表单模式
   */
  cell: makeBooleanProp(false),
  /**
   * 单选框形状，可选值：circle / square / button
   */
  shape: makeStringProp<CheckShape>('circle'),
  /**
   * 选中的颜色
   */
  checkedColor: String,
  /**
   * 禁用
   */
  disabled: makeBooleanProp(false),
  /**
   * 最小选中的数量
   */
  min: makeNumberProp(0),
  /**
   * 最大选中的数量，0 为无限数量，默认为 0
   */
  max: makeNumberProp(0),
  /**
   * 同行展示
   */
  inline: makeBooleanProp(false),
  /**
   * 设置大小，可选值：large
   */
  size: String
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
