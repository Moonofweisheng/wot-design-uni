import type { PropType } from 'vue'
import { baseProps, makeStringProp } from '../common/props'
import { isObj, isString } from '../common/util'
import { inputProps } from '../wd-input/types'
export const definePropType = <T>(val: any): PropType<T> => val
export type AutocompleteData = Array<{
  disabled?: boolean
  [key: string]: any
}>
export type FetchSuggestions = (() => Promise<AutocompleteData> | AutocompleteData) | AutocompleteData
export type AutocompletePosition = 'bottom' | 'top'
export const wdAutocompleteProps = {
  ...baseProps,
  modelValue: {
    type: String,
    default: ''
  },
  /** 在点击菜单后，是否自动将值回填进输入框 */
  isAutocomplete: {
    type: Boolean,
    default: true
  },
  /** 是否完全匹配 */
  isExactMatch: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: [Number, String],
    default: 'inherit'
  },
  menuZIndex: {
    type: [Number, String],
    default: 3
  },
  /**
   * 获取下拉列表的函数，可以是Promise/普通函数，也可以是数组，内容的键名默认为value
   * @example [{value:'xxx',...}]
   */
  fetchSuggestions: {
    type: definePropType<FetchSuggestions>([Function, Array]),
    default: () => []
  },
  /** 列表展示元素的键名 */
  valueKey: {
    type: String,
    default: 'value'
  },
  /** 建议列表是否常驻显示 */
  alwaysVisible: {
    type: Boolean,
    default: false
  },
  position: makeStringProp<AutocompletePosition>('bottom'),
  suggestionMaxHeight: {
    type: [String, Number],
    default: '300px'
  },
  /** 列表与输入框之间是否显示小三角 */
  visibleArrow: {
    type: Boolean,
    default: true
  },
  /** 建议列表的偏移量 */
  offset: {
    type: [Number, String],
    default: 0
  },
  /** 执行搜索时的防抖时间 */
  fetchDebounce: {
    type: [Number, String],
    default: 100
  },
  /** 执行搜索后，进行匹配的防抖时间 */
  matchDebounce: {
    type: [Number, String],
    default: 200
  },
  clearable: inputProps.clearable,
  placeholder: inputProps.placeholder,
  noBorder: inputProps.noBorder,
  disabled: inputProps.disabled
}
export interface InputType {
  cursor: number
  value: string
  keyCode: number
}
export const wdAutocompleteEmit = {
  'update:modelValue': (value: string) => isString(value),
  select: (item: Record<string, any>) => isObj(item),
  clear: () => true,
  input: (value: InputType) => isObj(value)
}

export type WdAutocompleteProps = typeof wdAutocompleteProps

export type WdAutocompleteEmits = typeof wdAutocompleteEmit

export interface WdAutocompleteContext {
  /** 初始化，如果列表的高度异常可以执行这个 */
  handleInit: () => void
  /** 执行匹配函数 */
  handleFetch: () => Promise<void>
}
