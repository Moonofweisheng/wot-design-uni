/*
 * @Author: weisheng
 * @Date: 2024-11-14 21:27:00
 * @LastEditTime: 2024-11-14 22:17:54
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/hooks/useColPickerData.ts
 * 记得注释
 */
import type { ColPickerOption } from '@/uni_modules/wot-design-uni/components/wd-col-picker/types'
import { useCascaderAreaData } from '@vant/area-data'

export type CascaderOption = {
  text: string
  value: string
  children?: CascaderOption[]
}

/**
 * 使用'@vant/area-data'作为数据源，构造ColPicker组件的数据
 * @returns
 */
export function useColPickerData() {
  // '@vant/area-data' 数据源
  const colPickerData: CascaderOption[] = useCascaderAreaData()

  // 根据code查找子节点，不传code则返回所有节点
  function findChildrenByCode(data: CascaderOption[], code?: string | number): CascaderOption[] | null {
    if (!code) {
      return data
    }
    for (const item of data) {
      if (item.value === code) {
        return item.children || null
      }
      if (item.children) {
        const childrenResult = findChildrenByCode(item.children, code)
        if (childrenResult) {
          return childrenResult
        }
      }
    }
    return null
  }

  function findNodeByCodeList(codeList: string[]): ColPickerOption[] {
    const result: ColPickerOption[] = []
    let data = colPickerData

    for (const code of codeList) {
      const item = data.find((item) => item.value === code)
      if (item) {
        result.push({
          text: item.text,
          value: item.value
        })
        data = item.children || []
      } else {
        return result
      }
    }

    return result
  }

  return { colPickerData, findChildrenByCode, findNodeByCodeList }
}
