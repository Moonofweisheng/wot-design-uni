import { getCurrentInstance, inject, nextTick, onBeforeMount, onMounted, ref, watch } from 'vue'

export function useCell() {
  const border = ref<boolean>(false) // 是否展示边框
  const cellGroup: any = inject('cell-group') || {}
  const cellList: any = inject('cell-list') || ref<any[]>([])
  const { proxy } = getCurrentInstance() as any

  watch(
    () => cellGroup.border,
    (newVal) => {
      setIndexAndStatus(Boolean(newVal), proxy.$.uid)
    },
    {
      deep: true,
      immediate: true
    }
  )

  onBeforeMount(() => {
    cellList.value = [...cellList.value.concat([{ uid: proxy.$.uid }])]
    setIndexAndStatus(cellGroup.border, proxy.$.uid)
  })

  /**
   * @description 从cellGroup获取此组件的索引
   * @return {Number} 此组件的索引
   */
  function getIndex(uuid: string) {
    if (!cellList || !cellList.value) return
    return cellList.value.findIndex((cell) => {
      return cell.uid === uuid
    })
  }

  /**
   * @description 为所有索引非0的组件设置刘海线，此方法由cellGroup调用
   */
  function setIndexAndStatus(isBorder: boolean, uuid: string) {
    const index = getIndex(uuid)
    border.value = isBorder && index
  }

  return { border, cellGroup, cellList, setIndexAndStatus, getIndex }
}
