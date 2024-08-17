import { makeBooleanProp, makeNumericProp, makeStringProp } from '../../common/props'

export type NumberKeyType = '' | 'delete' | 'extra' | 'close'

export const keyProps = {
  type: makeStringProp<NumberKeyType>(''),
  text: makeNumericProp(''),
  wider: makeBooleanProp(false),
  large: makeBooleanProp(false),
  loading: makeBooleanProp(false)
}
