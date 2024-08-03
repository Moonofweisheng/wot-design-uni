import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'
import type { FormItemRule } from '../wd-form/types'

export type InputClearTrigger = 'focus' | 'always'

export const inputProps = {
  ...baseProps,
  customInputClass: makeStringProp(''),
  customLabelClass: makeStringProp(''),
  // 原生属性
  /**
   * 占位文本
   */
  placeholder: String,
  /**
   * 原生属性，指定 placeholder 的样式，目前仅支持color,font-size和font-weight
   */
  placeholderStyle: String,
  /**
   * 原生属性，指定 placeholder 的样式类
   */
  placeholderClass: makeStringProp(''),
  /**
   * 原生属性，指定光标与键盘的距离。取 input 距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离
   */
  cursorSpacing: makeNumberProp(0),
  /**
   * 原生属性，指定focus时的光标位置
   */
  cursor: makeNumberProp(-1),
  /**
   * 原生属性，光标起始位置，自动聚集时有效，需与selection-end搭配使用
   */
  selectionStart: makeNumberProp(-1),
  /**
   * 原生属性，光标结束位置，自动聚集时有效，需与selection-start搭配使用
   */
  selectionEnd: makeNumberProp(-1),
  /**
   * 原生属性，键盘弹起时，是否自动上推页面
   */
  adjustPosition: makeBooleanProp(true),
  /**
   * focus时，点击页面的时候不收起键盘
   */
  holdKeyboard: makeBooleanProp(false),
  /**
   * 设置键盘右下角按钮的文字，仅在type='text'时生效，可选值：done / go / next / search / send
   */
  confirmType: makeStringProp('done'),
  /**
   * 点击键盘右下角按钮时是否保持键盘不收起
   */
  confirmHold: makeBooleanProp(false),
  /**
   * 原生属性，获取焦点
   */
  focus: makeBooleanProp(false),
  /**
   * 类型，可选值：text / number / digit / idcard
   */
  type: makeStringProp('text'),
  /**
   * 原生属性，最大长度
   */
  maxlength: {
    type: Number,
    // #ifndef MP-ALIPAY
    default: -1
    // #endif
  },
  /**
   * 原生属性，禁用
   */
  disabled: makeBooleanProp(false),
  /**
   * 微信小程序原生属性，强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)
   */
  alwaysEmbed: makeBooleanProp(false),
  // 原生属性结束
  /**
   * 输入框的值靠右展示
   */
  alignRight: makeBooleanProp(false),
  /**
   * 绑定值
   */
  modelValue: makeNumericProp(''),
  /**
   * 显示为密码框
   */
  showPassword: makeBooleanProp(false),
  /**
   * 显示清空按钮
   */
  clearable: makeBooleanProp(false),
  /**
   * 只读
   */
  readonly: makeBooleanProp(false),
  /**
   * 使用 后置图标 插槽
   */
  useSuffixSlot: makeBooleanProp(false),
  /**
   * 使用 前置图标 插槽
   */
  usePrefixSlot: makeBooleanProp(false),
  /**
   * 前置图标，icon组件中的图标类名
   */
  prefixIcon: String,
  /**
   * 后置图标，icon组件中的图标类名
   */
  suffixIcon: String,
  /**
   * 显示字数限制，需要同时设置 maxlength
   */
  showWordLimit: makeBooleanProp(false),
  /**
   * 设置左侧标题
   */
  label: String,
  /**
   * 设置左侧标题宽度
   */
  labelWidth: makeStringProp('33%'),
  /**
   * 使用 label 插槽
   */
  useLabelSlot: makeBooleanProp(false),
  /**
   * 设置输入框大小，可选值：large
   */
  size: String,
  /**
   * 设置输入框错误状态，错误状态时为红色
   */
  error: makeBooleanProp(false),
  /**
   * 当有label属性时，设置标题和输入框垂直居中，默认为顶部居中
   */
  center: makeBooleanProp(false),
  /**
   * 非 cell 类型下是否隐藏下划线
   */
  noBorder: makeBooleanProp(false),
  /**
   * 是否必填
   */
  required: makeBooleanProp(false),
  /**
   * 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的
   */
  prop: String,
  /**
   * 表单验证规则，结合wd-form组件使用
   */
  rules: makeArrayProp<FormItemRule>(),
  /**
   * 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示
   * 类型: "focus" | "always"
   * 默认值: "always"
   * 最低版本: $LOWEST_VERSION$
   */
  clearTrigger: makeStringProp<InputClearTrigger>('always'),
  /**
   * 是否在点击清除按钮时聚焦输入框
   * 类型: boolean
   * 默认值: true
   * 最低版本: $LOWEST_VERSION$
   */
  focusWhenClear: makeBooleanProp(true)
}
