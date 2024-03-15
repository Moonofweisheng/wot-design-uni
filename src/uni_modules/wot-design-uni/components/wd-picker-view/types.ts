import type { ExtractPropTypes, Prop, PropType } from 'vue'
import { baseProps, makeArrayProp, makeNumberProp, makeStringProp } from '../common/props'
import { getType } from '../common/util'

export type ColumnItem = {
  [key: string]: any
  value?: string | number | boolean
  label?: string
  disabled?: boolean
}

export type PickerViewColumnChange = (
  pickerView: any,
  selects: Record<string, any> | Record<string, any>[],
  index: number,
  reslove?: () => void
) => void

export const pickerViewProps = {
  ...baseProps,
  loading: { type: Boolean, default: false },
  loadingColor: makeStringProp('#4D80F0'),
  columnsHeight: makeNumberProp(217),
  valueKey: makeStringProp('value'),
  labelKey: makeStringProp('label'),
  modelValue: {
    type: [String, Number, Boolean, Array<number>, Array<string>, Array<boolean>] as PropType<
      string | number | boolean | Array<number> | Array<string> | Array<boolean>
    >,
    default: '',
    required: true
  },
  columns: makeArrayProp<string | number | ColumnItem | Array<number> | Array<string> | Array<ColumnItem>>(),
  columnChange: Function as PropType<PickerViewColumnChange>
}

export type PickerViewProps = ExtractPropTypes<typeof pickerViewProps>

/**
 * @description 为props的value为array类型时提供format
 * @param {Array<String|Number|Object>} array 列数组
 * @param {string} valueKey valueKey
 * @param {string} labelKey labelKey
 */
export function formatArray(array: Array<string | number | ColumnItem | Array<string | number | ColumnItem>>, valueKey: string, labelKey: string) {
  let tempArray: Array<string | number | ColumnItem | Array<string | number | ColumnItem>> = array instanceof Array ? array : [array]
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
  if (!(array[0] instanceof Array)) {
    tempArray = [tempArray as Array<string | number | ColumnItem>]
  }
  // 经过上述处理，都已经变成了二维数组，再把每一项二维元素包装成object
  const result: Array<Array<ColumnItem>> = (tempArray as Array<Array<string | number | ColumnItem>>).map((col) => {
    return col.map((row) => {
      const isObj = getType(row)
      /* 针对原始值，包装成{valueKey,labelKey} */
      if (isObj !== 'object') {
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
