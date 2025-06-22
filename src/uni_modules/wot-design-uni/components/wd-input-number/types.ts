/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2025-06-21 18:23:35
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-input-number/types.ts
 * 记得注释
 */
import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeRequiredProp, makeStringProp, numericProp } from '../common/props'

/**
 * 输入框值变化前的回调函数类型定义
 * @param value 输入框的新值
 * @returns 返回布尔值或Promise<boolean>，用于控制是否允许值的变化
 */
export type InputNumberBeforeChange = (value: number | string) => boolean | Promise<boolean>

export type OperationType = 'add' | 'sub'

export const inputNumberProps = {
  ...baseProps,
  /**
   * 绑定值
   */
  modelValue: makeRequiredProp(numericProp),
  /**
   * 最小值
   */
  min: makeNumberProp(1),
  /**
   * 最大值
   */
  max: makeNumberProp(Number.MAX_SAFE_INTEGER),
  /**
   * 步进值
   */
  step: makeNumberProp(1),
  /**
   * 是否严格按照步进值递增或递减
   */
  stepStrictly: makeBooleanProp(false),
  /**
   * 数值精度
   */
  precision: makeNumericProp(0),
  /**
   * 是否禁用
   */
  disabled: makeBooleanProp(false),
  /**
   * 是否禁用输入框
   */
  disableInput: makeBooleanProp(false),
  /**
   * 是否禁用减号按钮
   */
  disableMinus: makeBooleanProp(false),
  /**
   * 是否禁用加号按钮
   */
  disablePlus: makeBooleanProp(false),
  /**
   * 是否不显示输入框
   */
  withoutInput: makeBooleanProp(false),
  /**
   * 输入框宽度
   */
  inputWidth: makeNumericProp(36),
  /**
   * 是否允许为空
   */
  allowNull: makeBooleanProp(false),
  /**
   * 输入框占位符
   */
  placeholder: makeStringProp(''),
  /**
   * 原生属性，键盘弹起时，是否自动上推页面
   */
  adjustPosition: makeBooleanProp(true),
  /**
   * 输入值变化前的回调函数，返回 `false` 可阻止输入，支持返回 `Promise`
   */
  beforeChange: Function as PropType<InputNumberBeforeChange>,
  /**
   * 是否开启长按加减手势
   */
  longPress: makeBooleanProp(false),
  /**
   * 是否立即响应输入变化，false 时仅在失焦和按钮点击时更新
   */
  immediateChange: makeBooleanProp(true),
  /**
   * 是否在初始化时更新 v-model 为修正后的值
   * true: 自动修正并更新 v-model
   * false: 保持原始值不修正，但仍会进行显示格式化
   */
  updateOnInit: makeBooleanProp(true),
  /**
   * 输入框类型
   * number: 数字输入
   * digit: 整数输入
   */
  inputType: makeStringProp<'number' | 'digit'>('digit')
}

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>
