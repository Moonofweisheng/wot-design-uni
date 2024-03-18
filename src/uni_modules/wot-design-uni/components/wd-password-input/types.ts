/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2024-03-15 22:53:36
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-password-input/types.ts
 * 记得注释
 */
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'

export const passwordInputProps = {
  ...baseProps,
  modelValue: makeStringProp(''),
  mask: makeBooleanProp(true),
  info: makeStringProp(''),
  errorInfo: makeStringProp(''),
  gutter: makeNumericProp(0),
  length: makeNumberProp(6),
  focused: makeBooleanProp(true)
}
