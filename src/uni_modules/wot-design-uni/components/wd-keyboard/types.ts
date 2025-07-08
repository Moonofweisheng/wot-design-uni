import type { PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type KeyboardMode = 'default' | 'custom' | 'car'
export type KeyType = '' | 'delete' | 'extra' | 'close'

export interface Key {
  text?: number | string // key文本
  type?: KeyType // key的类型
  wider?: boolean // 是否占2个key的宽度
}

export const keyboardProps = {
  ...baseProps,
  /**
   * 是否可见
   */
  visible: makeBooleanProp(false),
  /**
   * 绑定的值
   */
  modelValue: makeStringProp(''),
  /**
   * 标题
   */
  title: String,
  /**
   * 键盘模式
   */
  mode: makeStringProp<KeyboardMode>('default'),
  /**
   * 层级
   */
  zIndex: makeNumberProp(100),
  /**
   * 最大长度
   */
  maxlength: makeNumberProp(Infinity),
  /**
   * 是否显示删除键
   */
  showDeleteKey: makeBooleanProp(true),
  /**
   * 是否随机键盘按键顺序
   */
  randomKeyOrder: makeBooleanProp(false),
  /**
   * 确认按钮文本
   */
  closeText: String,
  /**
   * 删除按钮文本
   */
  deleteText: String,
  /**
   * 关闭按钮是否显示加载状态
   */
  closeButtonLoading: makeBooleanProp(false),
  /**
   * 是否显示蒙层
   */
  modal: makeBooleanProp(false),
  /**
   * 是否在点击外部时收起键盘
   */
  hideOnClickOutside: makeBooleanProp(true),
  /**
   * 是否锁定滚动
   */
  lockScroll: makeBooleanProp(true),
  /**
   * 是否在底部安全区域内
   */
  safeAreaInsetBottom: makeBooleanProp(true),
  /**
   * 额外按键
   */
  extraKey: [String, Array] as PropType<string | Array<string>>,
  /**
   * 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal)
   */
  rootPortal: makeBooleanProp(false)
}
