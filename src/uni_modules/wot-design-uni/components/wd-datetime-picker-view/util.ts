import { type DateTimeType } from './types'

/**
 * @description 根据传入的值和类型，获取当前的选项数组，便于传入 pickerView
 * @param value
 * @param type picker类型
 */
export function getPickerValue(value: string | number, type: DateTimeType) {
  const values: number[] = []
  const date = new Date(value)
  if (type === 'time') {
    const pair = String(value).split(':')
    values.push(parseInt(pair[0]), parseInt(pair[1]))
    if (pair[2]) {
      values.push(parseInt(pair[2]))
    }
  } else {
    values.push(date.getFullYear(), date.getMonth() + 1)
    if (type === 'date') {
      values.push(date.getDate())
    } else if (type === 'datetime') {
      values.push(date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
    }
  }
  return values
}
