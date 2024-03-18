import type { PropType } from 'vue'
import { baseProps, makeStringProp } from '../common/props'

export type LoadMoreState = 'loading' | 'error' | 'finished'

export const loadmoreProps = {
  ...baseProps,
  state: String as PropType<LoadMoreState>,
  loadingText: String,
  finishedText: String,
  errorText: makeStringProp('')
}
