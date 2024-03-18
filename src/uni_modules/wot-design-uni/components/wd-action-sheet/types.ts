/*
 * @Author: weisheng
 * @Date: 2024-03-18 11:22:03
 * @LastEditTime: 2024-03-18 13:17:22
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-action-sheet\types.ts
 * 记得注释
 */
import type { ExtractPropTypes } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeRequiredProp, makeStringProp } from '../common/props'

export type Action = {
  /**
   * 选项名称
   */
  name: string
  /**
   * 描述信息
   */
  subname: string
  /**
   * 颜色
   */
  color: string
  /**
   * 禁用
   */
  disabled: boolean
  /**
   * 加载中状态
   */
  loading: boolean
}

export type Panel = {
  /**
   * 图片地址
   */
  iconUrl: string
  /**
   * 标题内容
   */
  title: string
}

export const actionSheetProps = {
  ...baseProps,
  /**
   * header 头部样式
   */
  customHeaderClass: makeStringProp(''),
  /**
   * 设置菜单显示隐藏
   */
  modelValue: { ...makeBooleanProp(false), ...makeRequiredProp(Boolean) },
  /**
   * 菜单选项
   */
  actions: makeArrayProp<Action>(),
  /**
   * 自定义面板项,可以为字符串数组，也可以为对象数组，如果为二维数组，则为多行展示
   */
  panels: makeArrayProp<Panel | Panel[]>(),
  /**
   * 标题
   */
  title: String,
  /**
   * 取消按钮文案
   */
  cancelText: String,
  /**
   * 点击选项后是否关闭菜单
   */
  closeOnClickAction: Boolean,
  /**
   * 点击遮罩是否关闭
   */
  closeOnClickModal: Boolean,
  /**
   * 弹框动画持续时间
   */
  duration: Number,
  /**
   * 菜单层级
   */
  zIndex: Number,
  /**
   * 弹层内容懒渲染，触发展示时才渲染内容
   */
  lazyRender: Boolean,
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   */
  safeAreaInsetBottom: Boolean
}

export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>

// export type SelectPanelOption = {
//   item: Panel | Action
//   index?: number
//   rowIndex?: number
//   colIndex?: number
// }

// export const actionSheetEmits = {
//   [UPDATE_MODEL_EVENT]: (newValue: boolean) => isBoolean(newValue),
//   select: (option: SelectPanelOption) => option !== undefined
// }
// export type ActionSheetEmits = typeof actionSheetEmits
