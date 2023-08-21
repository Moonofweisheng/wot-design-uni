/*
 * @Author: weisheng
 * @Date: 2023-08-21 13:03:42
 * @LastEditTime: 2023-08-21 17:24:57
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-picker-view\type.ts
 * 记得注释
 */

import { getType } from '../common/util'

export type ColumnItem = {
  value?: string | number | boolean
  label?: string
  disabled?: boolean
}

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
        row[labelKey] = row[valueKey]
      }
      // eslint-disable-next-line no-prototype-builtins
      if (!row.hasOwnProperty(valueKey)) {
        row[valueKey] = row[labelKey]
      }
      return row as ColumnItem
    })
  })

  return result
}
