import type { ExtractPropTypes } from 'vue'
import { baseProps, makeStringProp } from '../common/props'

export const statusTipProps = {
  ...baseProps,
  image: makeStringProp('network'),
  imageSize: makeStringProp(''),
  tip: makeStringProp('')
}

export type StatusTipProps = ExtractPropTypes<typeof statusTipProps>
