import type { ComponentPublicInstance, ExtractPropTypes, PropType, Ref } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'
import { getType, isArray, isObj } from '../common/util'

export type ColumnItem = {
  [key: string]: any
  value?: string | number | boolean
  label?: string
  disabled?: boolean
}

export type PickerViewColumnChange = (
  pickerView: PickerViewInstance,
  selects: Record<string, any> | Record<string, any>[],
  index: number,
  reslove: () => void
) => void

export const pickerViewProps = {
  ...baseProps,
  /**
   * 加载状态
   */
  loading: makeBooleanProp(false),
  /**
   * 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写
   */
  loadingColor: makeStringProp('#4D80F0'),
  /**
   * picker内部滚筒高
   */
  columnsHeight: makeNumberProp(217),
  /**
   * 选项对象中，value对应的 key
   */
  valueKey: makeStringProp('value'),
  /**
   * 选项对象中，展示的文本对应的 key
   */
  labelKey: makeStringProp('label'),
  /**
   * 选中项，如果为多列选择器，则其类型应为数组
   */
  modelValue: {
    type: [String, Number, Boolean, Array<number>, Array<string>, Array<boolean>] as PropType<
      string | number | boolean | Array<number> | Array<string> | Array<boolean>
    >,
    default: '',
    required: true
  },
  /**
   * 选择器数据，可以为字符串数组，也可以为对象数组，如果为二维数组，则为多列选择器
   */
  columns: makeArrayProp<string | number | ColumnItem | Array<number> | Array<string> | Array<ColumnItem>>(),
  /**
   * 接收 pickerView 实例、选中项、当前修改列的下标、resolve 作为入参，根据选中项和列下标进行判断，通过 pickerView 实例暴露出来的 setColumnData 方法修改其他列的数据源。
   */
  columnChange: Function as PropType<PickerViewColumnChange>
}

export type PickerViewExpose = {
  getSelects: () => Record<string, any> | Record<string, any>[]
  getValues: () => string | string[]
  setColumnData: (columnIndex: any, data: Array<any>, jumpTo?: number) => void
  getColumnsData: () => Record<string, string>[][]
  getColumnData: (columnIndex: number) => Record<string, string>[]
  getColumnIndex: (columnIndex: number) => number
  getLabels: () => string[]
  getSelectedIndex: () => number[]
}

export type PickerViewProps = ExtractPropTypes<typeof pickerViewProps>

export type PickerViewInstance = ComponentPublicInstance<PickerViewProps, PickerViewExpose>

/**
 * @description 为props的value为array类型时提供format
 * @param {Array<String|Number|Object>} array 列数组
 * @param {string} valueKey valueKey
 * @param {string} labelKey labelKey
 */
export function formatArray(array: Array<string | number | ColumnItem | Array<string | number | ColumnItem>>, valueKey: string, labelKey: string) {
  let tempArray: Array<string | number | ColumnItem | Array<string | number | ColumnItem>> = isArray(array) ? array : [array]
  // 检测第一层的type
  const firstLevelTypeList = new Set(array.map(getType))
  /**
   * 存在三种类型的合法数据
   * 1.数组是一维元素，所有元素都是原始值
   * 2.数组是一维元素，所有元素都是object
   * 3.数组是二维元素，二维元素可以是任意内容
   */
  if (firstLevelTypeList.size !== 1 && firstLevelTypeList.has('object')) {
    // 原始值和引用类型不用混用
    throw Error('The columns are correct')
  }
  /**
   * 数组的所有一维子元素都不是array，说明是它是一个一维数组
   * 所以需要把一维的转成二维，这样方便统一处理
   */
  if (!isArray(array[0])) {
    tempArray = [tempArray as Array<string | number | ColumnItem>]
  }
  // 经过上述处理，都已经变成了二维数组，再把每一项二维元素包装成object
  const result: Array<Array<ColumnItem>> = (tempArray as Array<Array<string | number | ColumnItem>>).map((col) => {
    return col.map((row) => {
      /* 针对原始值，包装成{valueKey,labelKey} */
      if (!isObj(row)) {
        return {
          [valueKey]: row,
          [labelKey]: row
        }
      }
      /**
       * 针对已经是object的，修补成{valueKey,labelKey}
       * 如果没有labelKey，用valueKey代替
       * 如果没有valueKey，用labelKey代替
       * valueKey,labelKey都没有，直接抛错
       */
      // eslint-disable-next-line no-prototype-builtins
      if (!row.hasOwnProperty(valueKey) && !row.hasOwnProperty(labelKey)) {
        // eslint-disable-next-line prettier/prettier
      throw Error('Can\'t find valueKey and labelKey in columns')
      }
      // eslint-disable-next-line no-prototype-builtins
      if (!row.hasOwnProperty(labelKey)) {
        ;(row as ColumnItem)[labelKey] = (row as ColumnItem)[valueKey]
      }
      // eslint-disable-next-line no-prototype-builtins
      if (!row.hasOwnProperty(valueKey)) {
        ;(row as ColumnItem)[valueKey] = (row as ColumnItem)[labelKey]
      }
      return row as ColumnItem
    })
  })

  return result
}
