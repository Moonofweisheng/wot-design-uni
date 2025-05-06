import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'
import type { FormItemRule } from '../wd-form/types'
import type { InputClearTrigger, InputMode } from '../wd-input/types'

export type ConfirmType = 'send' | 'search' | 'next' | 'go' | 'done'

export const textareaProps = {
  ...baseProps,
  /**
   * * 自定义文本域容器class名称。
   * 类型：string
   */
  customTextareaContainerClass: makeStringProp(''),

  /**
   * * 自定义文本域class名称。
   * 类型：string
   */
  customTextareaClass: makeStringProp(''),

  /**
   * * 自定义标签class名称。
   * 类型：string
   */
  customLabelClass: makeStringProp(''),
  // 原生属性
  /**
   * * 绑定值。
   * 类型：string | number
   */
  modelValue: makeNumericProp(''),

  /**
   * * 占位文本。
   * 类型：string
   * 默认值：'请输入...'
   */
  placeholder: String,

  /**
   * 指定placeholder的样式。
   * 类型：string
   */
  placeholderStyle: String,

  /**
   * * 指定placeholder的样式类。
   * 类型：string
   * 默认值：空字符串
   */
  placeholderClass: makeStringProp(''),

  /**
   * * 禁用输入框。
   * 类型：boolean
   * 默认值：false
   */
  disabled: makeBooleanProp(false),

  /**
   * * 最大输入长度，设置为-1表示不限制最大长度。
   * 类型：number
   * 默认值：-1
   */
  maxlength: makeNumberProp(-1),

  /**
   * * 自动聚焦并拉起键盘。
   * 类型：boolean
   * 默认值：false
   */
  autoFocus: makeBooleanProp(false),

  /**
   * * 获取焦点。
   * 类型：boolean
   * 默认值：false
   */
  focus: makeBooleanProp(false),

  /**
   * * 是否自动增高输入框高度，style.height属性在auto-height生效时不生效。
   * 类型：boolean
   * 默认值：false
   */
  autoHeight: makeBooleanProp(false),

  /**
   * * 如果textarea处于position:fixed区域，需要设置此属性为true。
   * 类型：boolean
   * 默认值：false
   */
  fixed: makeBooleanProp(false),

  /**
   * * 指定光标与键盘的距离，取textarea距离底部的距离和cursor-spacing指定的距离的最小值作为实际距离。
   * 类型：number
   * 默认值：0
   */
  cursorSpacing: makeNumberProp(0),

  /**
   * * 指定focus时的光标位置。
   * 类型：number
   * 默认值：-1
   */
  cursor: makeNumberProp(-1),

  /**
   * * 设置键盘右下角按钮的文字。
   * 类型：string
   * 默认值：'done'
   * 可选值有'done', 'go', 'next', 'search', 'send'
   */
  confirmType: String as PropType<ConfirmType>,

  /**
   * * 点击键盘右下角按钮时是否保持键盘不收起。
   * 类型：boolean
   * 默认值：false
   */
  confirmHold: makeBooleanProp(false),

  /**
   * * 是否显示键盘上方带有“完成”按钮那一栏。
   * 类型：boolean
   * 默认值：true
   */
  showConfirmBar: makeBooleanProp(true),

  /**
   * * 光标起始位置，自动聚集时有效，需与selection-end搭配使用。
   * 类型：number
   * 默认值：-1
   */
  selectionStart: makeNumberProp(-1),

  /**
   * * 光标结束位置，自动聚集时有效，需与selection-start搭配使用。
   * 类型：number
   * 默认值：-1
   */
  selectionEnd: makeNumberProp(-1),

  /**
   * * 键盘弹起时是否自动上推页面。
   * 类型：boolean
   * 默认值：true
   */
  adjustPosition: makeBooleanProp(true),

  /**
   * * 是否去掉iOS下的默认内边距。
   * 类型：boolean
   * 默认值：false
   */
  disableDefaultPadding: makeBooleanProp(false),

  /**
   * * focus状态下点击页面时是否不收起键盘。
   * 类型：boolean
   * 默认值：false
   */
  holdKeyboard: makeBooleanProp(false),

  // 非原生属性
  /**
   * * 显示为密码框。
   * 类型：boolean
   * 默认值：false
   */
  showPassword: makeBooleanProp(false),

  /**
   * * 是否显示清空按钮。
   * 类型：boolean
   * 默认值：false
   */
  clearable: makeBooleanProp(false),

  /**
   * * 输入框只读状态。
   * 类型：boolean
   * 默认值：false
   */
  readonly: makeBooleanProp(false),

  /**
   * * 前置图标，icon组件中的图标类名。
   * 类型：string
   */
  prefixIcon: String,
  /**
   * * 是否显示字数限制，需要同时设置maxlength。
   * 类型：boolean
   * 默认值：false
   */
  showWordLimit: makeBooleanProp(false),
  /**
   * 设置左侧标题。
   * 类型：string
   */
  label: String,

  /**
   * 设置左侧标题宽度。
   * 类型：string
   */
  labelWidth: makeStringProp(''),
  /**
   * * 设置输入框大小。
   * 类型：string
   */
  size: String,

  /**
   * * 设置输入框错误状态（红色）。
   * 类型：boolean
   * 默认值：false
   */
  error: makeBooleanProp(false),

  /**
   * * 当存在label属性时，设置标题和输入框垂直居中，默认为顶部居中。
   * 类型：boolean
   * 默认值：false
   */
  center: makeBooleanProp(false),

  /**
   * * 非cell类型下是否隐藏下划线。
   * 类型：boolean
   * 默认值：false
   */
  noBorder: makeBooleanProp(false),

  /**
   * * cell类型下必填样式。
   * 类型：boolean
   * 默认值：false
   */
  required: makeBooleanProp(false),

  /**
   * * 表单域model字段名，在使用表单校验功能的情况下，该属性是必填的。
   * 类型：string
   */
  prop: makeStringProp(''),

  /**
   * * 表单验证规则。
   * 类型：FormItemRule[]
   * 默认值：[]
   */
  rules: makeArrayProp<FormItemRule>(),
  /**
   * 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示
   * 类型: "focus" | "always"
   * 默认值: "always"
   */
  clearTrigger: makeStringProp<InputClearTrigger>('always'),
  /**
   * 是否在点击清除按钮时聚焦输入框
   * 类型: boolean
   * 默认值: true
   */
  focusWhenClear: makeBooleanProp(true),
  /**
   * 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件
   * 类型: boolean
   * 默认值: true
   */
  ignoreCompositionEvent: makeBooleanProp(true),
  /**
   * 它提供了用户在编辑元素或其内容时可能输入的数据类型的提示。在符合条件的高版本webview里，uni-app的web和app-vue平台中可使用本属性。
   * 类型: InputMode
   * 可选值: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | "password"
   * 默认值: "text"
   */
  inputmode: makeStringProp<InputMode>('text')
}

export type TextareaProps = ExtractPropTypes<typeof textareaProps>
