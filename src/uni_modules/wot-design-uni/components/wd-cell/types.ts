import type { ExtractPropTypes } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeStringProp } from '../common/props'

import { type FormItemRule } from '../wd-form/types'

export const cellProps = {
  ...baseProps,
  title: String,
  value: String,
  icon: String,
  label: String,
  isLink: makeBooleanProp(false),
  to: String,
  replace: makeBooleanProp(false),
  clickable: makeBooleanProp(false),
  size: String,
  border: Boolean,
  titleWidth: String,
  center: makeBooleanProp(false),
  required: makeBooleanProp(false),
  vertical: makeBooleanProp(false),
  prop: String,
  rules: makeArrayProp<FormItemRule>(),
  customIconClass: makeStringProp(''),
  customLabelClass: makeStringProp(''),
  customValueClass: makeStringProp(''),
  customTitleClass: makeStringProp('')
}

export type CellProps = ExtractPropTypes<typeof cellProps>
