import { baseProps, makeRequiredProp, makeStringProp } from '../common/props'

export const iconProps = {
  ...baseProps,
  name: makeRequiredProp(String),
  color: String,
  size: String,
  classPrefix: makeStringProp('wd-icon')
}
