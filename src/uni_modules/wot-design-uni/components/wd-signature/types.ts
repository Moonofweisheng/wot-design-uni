import type { ExtractPropTypes, Prop, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp } from '../common/props'

export const signatureProps = {
  ...baseProps,
  text: {
    type: String,
    default: ''
  }
}
