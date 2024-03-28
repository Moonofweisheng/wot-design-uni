import { baseProps, makeStringProp } from '../common/props'

export const safeareaProps = {
  ...baseProps,
  /**
   * @description 安全区的位置
   * @type {string} top | bottom
   * @default ''
   */
  position: makeStringProp('')
}
