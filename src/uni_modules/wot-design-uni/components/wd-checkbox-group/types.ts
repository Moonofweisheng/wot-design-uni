/*
 * @Author: weisheng
 * @Date: 2023-12-14 11:21:58
 * @LastEditTime: 2024-01-03 22:47:50
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-checkbox-group/types.ts
 * 记得注释
 */
import { type InjectionKey } from 'vue'

type checkShape = 'circle' | 'square' | 'button'

export type checkboxGroupProvide = {
  props: {
    modelValue: Array<string | number | boolean>
    cell?: boolean
    shape?: checkShape
    checkedColor?: string
    disabled?: boolean
    min?: number
    max?: number
    inline?: boolean
    size?: string
    name?: string
  }
  changeSelectState: (value: string | number | boolean) => void
}

export const CHECKBOX_GROUP_KEY: InjectionKey<checkboxGroupProvide> = Symbol('wd-checkbox-group')
