import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp } from '../common/props'

export type CardType = 'rectangle'

export const cardProps = {
  ...baseProps,
  type: String as PropType<CardType>,
  title: String,
  customTitleClass: makeStringProp(''),
  customContentClass: makeStringProp(''),
  customFooterClass: makeStringProp('')
}

export type CardProps = ExtractPropTypes<typeof cardProps>
