<template>
  <view :class="rootClass">
    <view id="wd-waterfall-left" class="wd-waterfall__item" :style="{ width: `calc(50% - ${gap / 2}px)` }">
      <slot name="left" :leftList="leftList" :options="options"></slot>
    </view>
    <view id="wd-waterfall-right" class="wd-waterfall__item" :style="{ width: `calc(50% - ${gap / 2}px)` }">
      <slot name="right" :rightList="rightList" :options="options"></slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-waterfall',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { getCurrentInstance, ref, onMounted, computed, watch } from 'vue'
import { getRect, deepClone } from '../common/util'
import { waterfallOptions, type TId, type TListItem } from './types'
const instance = getCurrentInstance()

const props = defineProps(waterfallOptions)
const emit = defineEmits(['update:modelValue'])

const leftList = ref<TListItem[]>([])
const rightList = ref<TListItem[]>([])
const tempList = ref<TListItem[]>([])

const rootClass = computed(() => {
  return `wd-waterfall ${props.customClass}`
})
const copyFlowList = computed(() => {
  return cloneData(props.modelValue)
})

watch(
  () => copyFlowList.value,
  (nVal, oVal) => {
    const startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0
    tempList.value = tempList.value.concat(cloneData(nVal.slice(startIndex)))
    handleSplitData()
  }
)

onMounted(() => {
  tempList.value = cloneData(copyFlowList.value)
  handleSplitData()
})

/**
 * 分配数据
 */
async function handleSplitData() {
  if (!tempList.value.length) return
  const _leftRect = await getRect('#wd-waterfall-left', false, instance)
  const _rightRect = await getRect('#wd-waterfall-right', false, instance)

  if (!_leftRect.height) {
    _leftRect.height = 0
  }
  if (!_rightRect.height) {
    _rightRect.height = 0
  }

  const item = tempList.value[0]

  if (!item) return

  const addToSide = (list: TListItem[]) => {
    list.push(item)
    tempList.value.splice(0, 1)
  }

  // 检查高度差异并分配项目
  if (_leftRect.height < _rightRect.height) {
    addToSide(leftList.value)
  } else if (_leftRect.height > _rightRect.height) {
    addToSide(rightList.value)
  } else {
    // 当高度相等时，根据列表长度来决定放置在哪一边
    if (leftList.value.length <= rightList.value.length) {
      addToSide(leftList.value)
    } else {
      addToSide(rightList.value)
    }
  }

  if (tempList.value.length) {
    await new Promise((resolve) => setTimeout(resolve, props.addTime))
    await handleSplitData()
  } else {
    // 处理单边删除剩余一个的情况
    if (leftList.value.length === 0 && rightList.value.length === 1) {
      leftList.value = rightList.value
      rightList.value = []
    }
  }
}

function cloneData(data: TListItem[]) {
  return deepClone(data)
}
/**
 * 重新排序
 */
function reorder() {
  leftList.value = []
  rightList.value = []
  tempList.value = cloneData(props.modelValue)
  handleSplitData()
}
/**
 * 清空数据列表
 */
function clear() {
  leftList.value = []
  rightList.value = []
  tempList.value = []
  emit('update:modelValue', [])
}
/**
 * 删除数据项
 * @param id
 */
function remove(id: TId) {
  const removeItemById = (list: TListItem[], idKey: string, id: TId) => {
    const index = list.findIndex((val) => val[idKey] === id)
    if (index !== -1) {
      list.splice(index, 1)
      return true
    }
    return false
  }

  // 尝试从 leftList.value 和 rightList.value 中删除元素
  const removedInLeft = removeItemById(leftList.value, props.idKey, id)
  const removedInRight = !removedInLeft && removeItemById(rightList.value, props.idKey, id)

  // 如果删除成功，则更新一下 modelValue
  if (removedInLeft || removedInRight) {
    const data = cloneData(props.modelValue)
    const index = data.findIndex((val) => val[props.idKey] === id)
    if (index !== -1) {
      data.splice(index, 1)
      emit('update:modelValue', data)
    }
  }

  setTimeout(() => {
    // 是否重新排序
    props.isReorder && reorder()
  })
}
/**
 * 更新数据项
 * @param id
 * @param key
 * @param value
 */
function update(id: TId, key: string, value: any) {
  const updateItemById = (array: TListItem[], id: TId, key: string, value: any, idKey: string) => {
    const index = array.findIndex((val) => val[idKey] === id)
    if (index !== -1) {
      array[index][key] = value
      return true
    }
    return false
  }

  const updatedInLeft = updateItemById(leftList.value, id, key, value, props.idKey)
  const updatedInRight = !updatedInLeft && updateItemById(rightList.value, id, key, value, props.idKey)

  // 如果修改成功，则更新一下 modelValue
  if (updatedInLeft || updatedInRight) {
    const data = cloneData(props.modelValue)
    const index = data.findIndex((val) => val[props.idKey] === id)
    if (index !== -1) {
      data[index][key] = value
      emit('update:modelValue', data)
    } else {
      console.error(`没有找到对应数据：${id}`)
    }
  }
}

defineExpose<IMethods>({
  reorder,
  clear,
  remove,
  update
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
