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
   * 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。
   */
  immediateChange: makeBooleanProp(false),
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
  setColumnData: (columnIndex: number, data: Array<string | number | ColumnItem | Array<string | number | ColumnItem>>, rowIndex?: number) => void
  getColumnsData: () => Record<string, string>[][]
  getColumnData: (columnIndex: number) => Record<string, string>[]
  getColumnIndex: (columnIndex: number) => number
  getLabels: () => string[]
  getSelectedIndex: () => number[]
}

export type PickerViewProps = ExtractPropTypes<typeof pickerViewProps>

export type PickerViewInstance = ComponentPublicInstance<PickerViewProps, PickerViewExpose>

/**
 * 格式化传入的列数据
 * 列数据统一格式化为二维数组
 * @param array 列数据
 * @param valueKey
 * @param labelKey
 * @returns
 */
export function formatArray(
  array: Array<string | number | ColumnItem | Array<string | number | ColumnItem>>,
  valueKey: string,
  labelKey: string
): ColumnItem[][] {
  let tempArray: Array<string | number | ColumnItem | Array<string | number | ColumnItem>> = isArray(array) ? array : [array]
  // 判断数组第一层的数据类型，如果存在多种类型，则抛错
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
   * 简单处理，如果数组第一项不是数组则认为它是一个一维数组
   * 所以需要把一维的转成二维，这样方便统一处理
   */
  if (!isArray(array[0])) {
    tempArray = [tempArray as Array<string | number | ColumnItem>]
  }
  // 转化为二维数组后需要将每一项包装成ColumnItem
  const result: Array<Array<ColumnItem>> = (tempArray as Array<Array<string | number | ColumnItem>>).map((col) => {
    return col.map((row) => {
      // 非对象类型直接将值作为label和value
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
        row[labelKey] = row[valueKey]
      }
      // eslint-disable-next-line no-prototype-builtins
      if (!row.hasOwnProperty(valueKey)) {
        row[valueKey] = row[labelKey]
      }
      return row
    })
  })

  return result
}
