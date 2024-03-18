import type { ExtractPropTypes } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeRequiredProp, makeStringProp } from '../common/props'
import type { FormItemRule } from '../wd-form/types'

export const formItemProps = {
  ...baseProps,
  prop: makeRequiredProp(String),
  rules: makeArrayProp<FormItemRule>(),
  required: Boolean,
  center: makeBooleanProp(false),
  label: String,
  labelWidth: makeStringProp('100px'),
  isLink: Boolean
}

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
