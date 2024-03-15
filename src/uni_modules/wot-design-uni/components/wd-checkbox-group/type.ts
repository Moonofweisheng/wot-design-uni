import { type ExtractPropTypes, type InjectionKey, type PropType } from 'vue'
import type { CheckShape } from '../wd-checkbox/type'
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
  modelValue: {
    type: Array as PropType<Array<string | number | boolean>>,
    default: () => []
  },
  cell: makeBooleanProp(false),
  shape: makeStringProp<CheckShape>('circle'),
  checkedColor: String,
  disabled: makeBooleanProp(false),
  min: makeNumberProp(0),
  max: makeNumberProp(0),
  inline: makeBooleanProp(false),
  size: String,
  name: String
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
