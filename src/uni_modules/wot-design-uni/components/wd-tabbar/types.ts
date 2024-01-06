/*
 * @Author: weisheng
 * @Date: 2024-01-05 18:03:27
 * @LastEditTime: 2024-01-05 18:17:42
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-tabbar/types.ts
 * 记得注释
 */
import { type InjectionKey } from 'vue'
import type { TabbarItem } from '../wd-tabbar-item/types'

type TabbarShape = 'default' | 'round'

export type TabbarProvide = {
  props: {
    // 选中标签的索引值或者名称
    modelValue?: number | string
    // 是否固定在底部
    fixed?: boolean
    // 是否设置底部安全距离（iphone X 类型的机型）
    safeAreaInsetBottom?: boolean
    // 是否显示顶部边框
    bordered?: boolean
    // 标签栏的形状。可选项：default/round
    shape?: TabbarShape
    // 激活标签的颜色
    activeColor?: string
    // 未激活标签的颜色
    inactiveColor?: string
    // 固定在底部时，是否在标签位置生成一个等高的占位元素
    placeholder?: boolean
    // 自定义组件的层级
    zIndex?: number
  }
  setChange: (child: TabbarItem) => void
}

export const TABBAR_KEY: InjectionKey<TabbarProvide> = Symbol('wd-tabbar')
