import type { PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export type TId = number | string

export type TListItem = Record<string, any>

export const waterfallOptions = {
  ...baseProps,
  /**
   * 瀑布流数据
   */
  modelValue: makeArrayProp<any>(),
  /**
   * 自定义参数配置项
   */
  options: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  /**
   * 列间距
   */
  gap: makeNumberProp(12),
  /**
   * 延迟添加时间
   */
  addTime: makeNumberProp(50),
  /**
   * 唯一标识
   */
  idKey: makeStringProp('id'),
  /**
   * 是否开启重新排序
   */
  isReorder: makeBooleanProp(false)
}
