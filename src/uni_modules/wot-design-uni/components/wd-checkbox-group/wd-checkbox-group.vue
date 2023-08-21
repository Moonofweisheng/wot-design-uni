<template>
  <view :class="`wd-checkbox-group ${shape === 'button' && cell ? 'is-button' : ''} ${customClass}`">
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-checkbox-group',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { getCurrentInstance, provide, watch } from 'vue'
import { checkNumRange, debounce, deepClone } from '../common/util'

type checkShape = 'circle' | 'square' | 'button'
interface Props {
  customClass?: string
  modelValue: Array<string | number | boolean>
  cell: boolean
  shape: checkShape
  checkedColor: string
  disabled: boolean
  min: number
  max: number
  inline: boolean
  size?: string
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  modelValue: () => [],
  cell: false,
  shape: 'circle',
  checkedColor: '#4D80F0',
  disabled: false,
  min: 0,
  max: 0,
  inline: false
})

const children: any[] = [] // 子组件
const { proxy } = getCurrentInstance() as any

/**
 * @description 修正子组件的 isChecked 和 finalDisabled
 * @param {array} values
 */
const resetChildren = debounce(function (values) {
  values = values || props.modelValue
  children &&
    children.forEach((child) => {
      // value 对应的节点直接选中
      const isChecked = values.indexOf(child.modelValue) > -1
      child.$.exposed.setChecked(isChecked)
    })
}, 50)

watch(
  () => props.modelValue,
  (newValue) => {
    // 传入的value数组中包括重复的元素，这种情况非法。
    if (new Set(newValue).size !== newValue.length) {
      // eslint-disable-next-line quotes
      throw Error("checkboxGroup's bound value includes same value")
    }
    if (newValue.length < props.min) {
      // eslint-disable-next-line quotes
      throw Error("checkboxGroup's bound value's length can't be less than min")
    }
    if (props.max !== 0 && newValue.length > props.max) {
      // eslint-disable-next-line quotes
      throw Error("checkboxGroup's bound value's length can't be large than max")
    }
    // 每次value变化都会触发重新匹配选中项
    children && children.length > 0 && resetChildren()
  },
  { deep: true, immediate: true }
)

watch(
  () => props.shape,
  (newValue) => {
    const type = ['circle', 'square', 'button']
    if (type.indexOf(newValue) === -1) throw Error(`shape must be one of ${type.toString()}`)
  },
  { deep: true, immediate: true }
)

watch(
  [() => props.disabled, () => props.inline, () => props.size],
  () => {
    resetChildren()
  },
  { deep: true, immediate: true }
)

watch(
  () => props.min,
  (newValue) => {
    checkNumRange(newValue, 'min')
    resetChildren()
  },
  { deep: true, immediate: true }
)

watch(
  () => props.max,
  (newValue) => {
    checkNumRange(newValue, 'max')
    resetChildren()
  },
  { deep: true, immediate: true }
)

const emit = defineEmits(['change', 'update:modelValue'])

/**
 * 设置子项
 * @param child
 */
function setChild(child) {
  const hasChild = children.findIndex((check) => {
    return check.$.uid === child.$.uid
  })
  if (hasChild <= -1) {
    children.push(child)
  } else {
    children[hasChild] = child
  }

  const index = children.findIndex((check) => {
    return check.$.uid === child.$.uid
  })
  // 如果当前子节点为第一个组件，将其isFirst设置为true
  if (index === 0) {
    child.$.exposed.setFirst(true)
  }
  // 如果当前子节点为最后一个组件，将其isLast设置为true，删掉倒数第二个子节点的isLast
  if (index === children.length - 1) {
    child.$.exposed.setLast(true)
    const [prevChild] = children.slice(-2, -1)
    prevChild && prevChild.$.exposed.setLast(false)
  }
  resetChildren()
}

/**
 * @description 子节点通知父节点修改子节点选中状态
 * @param {any} value 子组件的标识符
 */
function changeSelectState(value) {
  const temp: (string | number | boolean)[] = deepClone(props.modelValue)
  const index = temp.indexOf(value)
  if (index > -1) {
    // 已经选中，则从 value 列表中删除子节点的标识符。
    temp.splice(index, 1)
  } else {
    // 之前未选中，则现在把加子节点的标识符加到 value 列表中。
    temp.push(value)
  }
  emit('update:modelValue', temp)
  // 操作完之后更新一下 所有节点的 disabled 状态
  resetChildren(temp)
  emit('change', {
    value: temp
  })
}

provide('checkGroup', proxy)

defineExpose({
  setChild,
  changeSelectState,
  children
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
