import { computed } from 'vue'
import { useParent } from './useParent'
import { CELL_GROUP_KEY } from '../wd-cell-group/types'

export function useCell() {
  const { parent, index } = useParent(CELL_GROUP_KEY)

  const border = computed(() => {
    return parent.value && parent.value.props.border && index.value
  })

  return { border }
}
