/*
 * @Author: weisheng
 * @Date: 2024-09-01 15:42:04
 * @LastEditTime: 2024-09-21 15:36:09
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-search\types.ts
 * 记得注释
 */
import { baseProps, makeBooleanProp, makeNumberProp, makeNumericProp, makeStringProp } from '../common/props'

export const searchProps = {
  ...baseProps,
  customInputClass: makeStringProp(''),
  /**
   * 输入框内容，双向绑定
   * 类型: string
   * 默认值: ''
   */
  modelValue: makeStringProp(''),

  /**
   * 是否使用输入框右侧插槽
   * 类型: boolean
   * 默认值: false
   * @deprecated 该属性已废弃，将在下一个minor版本被移除，直接使用插槽即可
   */
  useSuffixSlot: makeBooleanProp(false),

  /**
   * 搜索框占位文本
   * 类型: string
   */
  placeholder: String,

  /**
   * 搜索框右侧文本
   * 类型: string
   */
  cancelTxt: String,

  /**
   * 搜索框亮色（白色）
   * 类型: boolean
   * 默认值: false
   */
  light: makeBooleanProp(false),

  /**
   * 是否隐藏右侧文本
   * 类型: boolean
   * 默认值: false
   */
  hideCancel: makeBooleanProp(false),

  /**
   * 是否禁用搜索框
   * 类型: boolean
   * 默认值: false
   */
  disabled: makeBooleanProp(false),

  /**
   * 原生属性，设置最大长度。-1 表示无限制
   * 类型: string / number
   * 默认值: -1
   */
  maxlength: makeNumberProp(-1),

  /**
   * placeholder 居左边
   * 类型: boolean
   * 默认值: false
   */
  placeholderLeft: makeBooleanProp(false),

  /**
   * 是否自动聚焦
   * 类型: boolean
   * 默认值: false
   * 最低版本: 0.1.63
   */
  focus: makeBooleanProp(false),

  /**
   * 是否在点击清除按钮时聚焦输入框
   * 类型: boolean
   * 默认值: false
   * 最低版本: 0.1.63
   */
  focusWhenClear: makeBooleanProp(false),

  /**
   * 原生属性，指定 placeholder 的样式，目前仅支持color,font-size和font-weight
   */
  placeholderStyle: String,

  /**
   * 原生属性，指定 placeholder 的样式类
   */
  placeholderClass: makeStringProp('')
}
