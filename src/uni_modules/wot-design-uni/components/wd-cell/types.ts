import type { ExtractPropTypes } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeStringProp } from '../common/props'

import { type FormItemRule } from '../wd-form/types'

export const cellProps = {
  ...baseProps,
  /**
   * 标题
   */
  title: String,
  /**
   * 右侧内容
   */
  value: String,
  /**
   * 图标类名
   */
  icon: String,
  /**
   * 描述信息
   */
  label: String,
  /**
   * 是否为跳转链接
   */
  isLink: makeBooleanProp(false),
  /**
   * 跳转地址
   */
  to: String,
  /**
   * 跳转时是否替换栈顶页面
   */
  replace: makeBooleanProp(false),
  /**
   * 开启点击反馈，is-link 默认开启
   */
  clickable: makeBooleanProp(false),
  /**
   * 设置单元格大小，可选值：large
   */
  size: String,
  /**
   * 是否展示边框线
   */
  border: Boolean,
  /**
   * 设置左侧标题宽度
   */
  titleWidth: String,
  /**
   * 是否垂直居中，默认顶部居中
   */
  center: makeBooleanProp(false),
  /**
   * 是否必填
   */
  required: makeBooleanProp(false),
  /**
   * 表单属性，上下结构
   */
  vertical: makeBooleanProp(false),
  /**
   * 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的
   */
  prop: String,
  /**
   * 表单验证规则，结合wd-form组件使用
   */
  rules: makeArrayProp<FormItemRule>(),
  /**
   * icon 使用 slot 时的自定义样式
   */
  customIconClass: makeStringProp(''),
  /**
   * label 使用 slot 时的自定义样式
   */
  customLabelClass: makeStringProp(''),
  /**
   * value 使用 slot 时的自定义样式
   */
  customValueClass: makeStringProp(''),
  /**
   * title 使用 slot 时的自定义样式
   */
  customTitleClass: makeStringProp('')
}

export type CellProps = ExtractPropTypes<typeof cellProps>
