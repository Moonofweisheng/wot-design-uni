/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2024-03-15 22:08:43
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-input-number/types.ts
 * 记得注释
 */
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeRequiredProp, makeStringProp, numericProp } from '../common/props'

export const inputNumberProps = {
  ...baseProps,
  modelValue: makeRequiredProp(numericProp),
  min: makeNumberProp(1),
  max: makeNumberProp(Number.MAX_SAFE_INTEGER),
  step: makeNumberProp(1),
  stepStrictly: makeBooleanProp(false),
  precision: makeNumberProp(0),
  disabled: makeBooleanProp(false),
  disableInput: makeBooleanProp(false),
  disableMinus: makeBooleanProp(false),
  disablePlus: makeBooleanProp(false),
  withoutInput: makeBooleanProp(false),
  inputWidth: makeNumericProp(36),
  allowNull: makeBooleanProp(false),
  placeholder: makeStringProp('')
}
