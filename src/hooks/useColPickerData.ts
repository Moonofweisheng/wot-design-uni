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
  function findChildrenByCode(data: CascaderOption[], code?: string): CascaderOption[] | null {
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

  return { colPickerData, findChildrenByCode }
}
