import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger'

export const tagProps = {
  ...baseProps,
  useIconSlot: makeBooleanProp(false),
  type: makeStringProp<TagType>('default'),
  icon: makeStringProp(''),
  closable: makeBooleanProp(false),
  plain: makeBooleanProp(false),
  dynamic: makeBooleanProp(false),
  color: makeStringProp(''),
  bgColor: makeStringProp(''),
  round: makeBooleanProp(false),
  mark: makeBooleanProp(false)
}

export type TagProps = ExtractPropTypes<typeof tagProps>
