import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type NoticeBarType = 'warning' | 'info' | 'danger' | ''

export const noticeBarProps = {
  ...baseProps,
  text: String,
  type: makeStringProp<NoticeBarType>('warning'),
  scrollable: makeBooleanProp(true),
  delay: makeNumberProp(1),
  speed: makeNumberProp(50),
  closable: makeBooleanProp(false),
  wrapable: makeBooleanProp(false),
  prefix: String,
  color: String,
  backgroundColor: String
}
