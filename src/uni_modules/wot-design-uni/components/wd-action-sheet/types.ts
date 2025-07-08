import type { ExtractPropTypes } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

export type Action = {
  /**
   * 选项名称
   */
  name: string
  /**
   * 描述信息
   */
  subname?: string
  /**
   * 颜色
   */
  color?: string
  /**
   * 禁用
   */
  disabled?: boolean
  /**
   * 加载中状态
   */
  loading?: boolean
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
   * @default ''
   * @type {string}
   */
  customHeaderClass: makeStringProp(''),
  /**
   * 设置菜单显示隐藏
   * @default false
   * @type {boolean}
   */
  modelValue: { ...makeBooleanProp(false), ...makeRequiredProp(Boolean) },
  /**
   * 菜单选项
   * @default []
   * @type {Action[]}
   */
  actions: makeArrayProp<Action>(),
  /**
   * 自定义面板项,可以为字符串数组，也可以为对象数组，如果为二维数组，则为多行展示
   * @default []
   * @type {Array<Panel | Panel[]>}
   */
  panels: makeArrayProp<Panel | Panel[]>(),
  /**
   * 标题
   * @type {string}
   */
  title: String,
  /**
   * 取消按钮文案
   * @type {string}
   */
  cancelText: String,
  /**
   * 点击选项后是否关闭菜单
   * @default true
   * @type {boolean}
   */
  closeOnClickAction: makeBooleanProp(true),
  /**
   * 点击遮罩是否关闭
   * @default true
   * @type {boolean}
   */
  closeOnClickModal: makeBooleanProp(true),
  /**
   * 弹框动画持续时间
   * @default 200
   * @type {number}
   */
  duration: makeNumberProp(200),
  /**
   * 菜单层级
   * @default 10
   * @type {number}
   */
  zIndex: makeNumberProp(10),
  /**
   * 弹层内容懒渲染，触发展示时才渲染内容
   * @default true
   * @type {boolean}
   */
  lazyRender: makeBooleanProp(true),
  /**
   * 弹出面板是否设置底部安全距离（iphone X 类型的机型）
   * @default true
   * @type {boolean}
   */
  safeAreaInsetBottom: makeBooleanProp(true),
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   * 类型：boolean
   * 默认值：false
   */
  rootPortal: makeBooleanProp(false)
}

export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>
