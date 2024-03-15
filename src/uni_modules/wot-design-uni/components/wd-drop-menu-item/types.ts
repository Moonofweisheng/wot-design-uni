import type { ExtractPropTypes } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeStringProp } from '../common/props'

export const dorpMenuItemProps = {
  ...baseProps,
  customTitle: makeStringProp(''),
  customIcon: makeStringProp(''),
  // 当前选中的value
  modelValue: [String, Number],
  options: makeArrayProp<Record<string, any>>(),
  useDropItemSlot: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  iconName: makeStringProp('check'),
  title: String,
  valueKey: makeStringProp('value'),
  labelKey: makeStringProp('label'),
  tipKey: makeStringProp('tip')
}

export type DropMenuItemProps = ExtractPropTypes<typeof dorpMenuItemProps>
