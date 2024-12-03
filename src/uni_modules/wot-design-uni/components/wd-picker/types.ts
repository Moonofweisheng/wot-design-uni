import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'
import type { ColumnItem, PickerViewColumnChange } from '../wd-picker-view/types'

export const pickerProps = {
  ...baseProps,
  /**
   * pickerView 外部自定义样式
   */
  customViewClass: makeStringProp(''),
  /**
   * 加载中
   */
  loading: makeBooleanProp(false),
  /**
   * 加载中颜色
   */
  loadingColor: makeStringProp('#4D80F0'),
  /* popup */
  /**
   * 弹出层标题
   */
  title: String,
  /**
   * 取消按钮文案
   */
  cancelButtonText: String,
  /**
   * 确认按钮文案
   */
  confirmButtonText: String,
  /**
   * 确定前校验函数，接收 (value, resolve, picker) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数
   */
  beforeConfirm: Function as PropType<PickerBeforeConfirm>,
  /**
   * 点击蒙层关闭
   */
  closeOnClickModal: makeBooleanProp(true),
  /**
   * 底部安全区域内
   */
  safeAreaInsetBottom: makeBooleanProp(true),
  /**
   * 选项总高度
   */
  columnsHeight: makeNumberProp(217),
  /**
   * 选项值对应的键名
   */
  valueKey: makeStringProp('value'),
  /**
   * 选项文本对应的键名
   */
  labelKey: makeStringProp('label'),
  /**
   * 选中项，如果为多列选择器，则其类型应为数组
   */
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | Array<string> | Array<number>>,
    default: ''
  },
  /**
   * 选择器数据，可以为字符串数组，也可以为对象数组，如果为二维数组，则为多列选择器
   */
  columns: {
    type: Array as PropType<Array<string | number | ColumnItem | Array<string | number | ColumnItem>>>,
    default: () => []
  },
  /**
   * 接收 pickerView 实例、选中项、当前修改列的下标、resolve 作为入参，根据选中项和列下标进行判断，通过 pickerView 实例暴露出来的 setColumnData 方法修改其他列的数据源。
   */
  columnChange: Function as PropType<PickerViewColumnChange>,
  /**
   * 自定义层级
   */
  zIndex: makeNumberProp(15),
  /**
   * 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   */
  immediateChange: makeBooleanProp(false),
  /**
   * 是否显示
   */
  visible: makeBooleanProp(false)
}

export type PickerProps = ExtractPropTypes<typeof pickerProps>

export type PickerBeforeConfirm = (
  value: string | number | boolean | string[] | number[] | boolean[],
  resolve: (isPass: boolean) => void,
  picker: any
) => void

export type PickerExpose = {
  // 打开picker弹框
  open: () => void
  // 关闭picker弹框
  close: () => void
  /**
   * 设置加载状态
   * @param loading 加载状态
   */
  setLoading: (loading: boolean) => void
}

export type PickerInstance = ComponentPublicInstance<PickerExpose, PickerProps>
