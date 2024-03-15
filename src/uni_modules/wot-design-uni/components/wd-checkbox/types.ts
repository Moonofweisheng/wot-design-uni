import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type CheckShape = 'circle' | 'square' | 'button'

export const checkboxProps = {
  ...baseProps,
  customLabelClass: makeStringProp(''),
  customShapeClass: makeStringProp(''),
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
    default: false
  },
  shape: makeStringProp<CheckShape>('circle'),
  checkedColor: String,
  disabled: makeBooleanProp(null),
  trueValue: {
    type: [String, Number, Boolean]
  },
  falseValue: {
    type: [String, Number, Boolean]
  },
  size: String,
  maxWidth: String
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
