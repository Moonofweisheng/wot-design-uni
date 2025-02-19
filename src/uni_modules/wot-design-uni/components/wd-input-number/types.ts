/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2025-02-19 12:47:54
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-input-number/types.ts
 * 记得注释
 */
import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeRequiredProp, makeStringProp, numericProp } from '../common/props'

/**
 * 输入框值变化前的回调函数类型定义
 * @param value 输入框的新值
 * @returns 返回布尔值或Promise<boolean>，用于控制是否允许值的变化
 */
export type InputNumberBeforeChange = (value: number | string) => boolean | Promise<boolean>

/**
 * 输入数字组件事件类型枚举
 * Input: 用户输入事件
 * Blur: 失焦事件
 * Watch: 监听值变化事件
 * Button: 按钮点击事件
 */
export enum InputNumberEventType {
  Input = 'input',
  Blur = 'blur',
  Watch = 'watch',
  Button = 'button'
}

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
  beforeChange: Function as PropType<InputNumberBeforeChange>
}
