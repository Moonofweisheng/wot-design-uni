import type { ExtractPropTypes } from 'vue'
import { baseProps, makeRequiredProp } from '../common/props'

export const indexAnchorProps = {
  ...baseProps,
  index: makeRequiredProp([String, Number])
}

export type IndexAnchorProps = ExtractPropTypes<typeof indexAnchorProps>
