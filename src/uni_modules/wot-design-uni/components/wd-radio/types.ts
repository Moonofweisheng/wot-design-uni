/*
 * @Author: weisheng
 * @Date: 2024-03-15 20:40:34
 * @LastEditTime: 2024-03-15 23:17:42
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-radio/types.ts
 * 记得注释
 */
import type { PropType } from 'vue'
import { baseProps, makeRequiredProp } from '../common/props'

export type RadioShape = 'dot' | 'button' | 'check'

export const radioProps = {
  ...baseProps,
  value: makeRequiredProp([String, Number, Boolean]),
  shape: String as PropType<RadioShape>,
  checkedColor: String,
  disabled: {
    type: [Boolean, null] as PropType<boolean | null>,
    default: null
  },
  cell: {
    type: [Boolean, null] as PropType<boolean | null>,
    default: null
  },
  size: String,
  inline: {
    type: [Boolean, null] as PropType<boolean | null>,
    default: null
  },
  maxWidth: String
}
