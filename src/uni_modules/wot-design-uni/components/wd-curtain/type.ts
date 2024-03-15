import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type ClosePosition = 'inset' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
interface Props {
  customClass?: string
  value: boolean
  closePosition?: ClosePosition
  src?: string
  to?: string
  width?: number
  closeOnClickModal?: boolean
  hideWhenClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  value: false,
  closePosition: 'inset',
  closeOnClickModal: false,
  hideWhenClose: true
})

export const curtainProps = {
  ...baseProps,
  value: makeBooleanProp(false),
  closePosition: makeStringProp<ClosePosition>('inset'),
  src: String,
  to: String,
  width: Number,
  closeOnClickModal: makeBooleanProp(false),
  hideWhenClose: makeBooleanProp(true)
}
