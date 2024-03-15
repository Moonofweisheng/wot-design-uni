import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type ButtonType = 'primary' | 'success' | 'info' | 'warning' | 'error' | 'default' | 'text' | 'icon'
export type ButtonSize = 'small' | 'medium' | 'large'

export const buttonProps = {
  ...baseProps,
  plain: makeBooleanProp(false),
  round: makeBooleanProp(true),
  disabled: makeBooleanProp(false),
  hairline: makeBooleanProp(false),
  block: makeBooleanProp(false),
  type: makeStringProp<ButtonType>('primary'),
  size: makeStringProp<ButtonSize>('medium'),
  icon: String,
  loading: makeBooleanProp(false),
  loadingColor: String,
  openType: String,
  formType: String,
  hoverStopPropagation: Boolean,
  lang: String,
  sessionFrom: String,
  sendMessageTitle: String,
  sendMessagePath: String,
  sendMessageImg: String,
  appParameter: String,
  showMessageCard: Boolean
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
