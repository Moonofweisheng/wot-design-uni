<template>
  <view
    :class="`wd-radio ${innerCell ? 'is-cell-radio' : ''} ${innerCell && innerShape == 'button' ? 'is-button-radio' : ''} ${
      innerSize ? 'is-' + innerSize : ''
    } ${innerInline ? 'is-inline' : ''} ${isChecked ? 'is-checked' : ''} ${innerShape !== 'check' ? 'is-' + innerShape : ''} ${
      innerDisabled ? 'is-disabled' : ''
    } ${customClass}`"
    @click="handleClick"
  >
    <view
      class="wd-radio__label"
      :style="`${maxWidth ? 'max-width:' + maxWidth : ''};  ${
        isChecked && innerShape === 'button' && !innerDisabled ? 'color :' + innerCheckedColor : ''
      }`"
    >
      <slot></slot>
    </view>
    <view class="wd-radio__shape" :style="isChecked && !disabled ? 'color: ' + innerCheckedColor : ''">
      <wd-icon v-if="innerShape === 'check'" :style="isChecked && !disabled ? 'color: ' + innerCheckedColor : ''" name="check"></wd-icon>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-radio',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onBeforeMount, ref, watch } from 'vue'

type RadioShape = 'dot' | 'button' | 'check'
interface Props {
  customClass?: string
  value?: string | number | boolean
  shape?: RadioShape
  checkedColor?: string
  disabled: boolean | null
  cell: boolean | null
  size?: string
  inline: boolean | null
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  disabled: null,
  cell: null,
  inline: null
})

const isChecked = ref<boolean>(false) // 是否被选中
const parent = inject<any>('radioGroup')
const { proxy } = getCurrentInstance() as any

const innerShape = computed(() => {
  if (!props.shape && parent && parent.shape) {
    return parent.shape
  } else {
    return props.shape
  }
})

const innerCheckedColor = computed(() => {
  if (!props.checkedColor && parent && parent.checkedColor) {
    return parent.checkedColor
  } else {
    return props.checkedColor
  }
})

const innerDisabled = computed(() => {
  if ((props.disabled === null || props.disabled === undefined) && parent && parent.disabled) {
    return parent.disabled
  } else {
    return props.disabled
  }
})

const innerInline = computed(() => {
  if ((props.inline === null || props.inline === undefined) && parent && parent.inline) {
    return parent.inline
  } else {
    return props.inline
  }
})

const innerSize = computed(() => {
  if (!props.size && parent && parent.size) {
    return parent.size
  } else {
    return props.size
  }
})

const innerCell = computed(() => {
  if ((props.cell === null || props.cell === undefined) && parent && parent.cell) {
    return parent.cell
  } else {
    return props.cell
  }
})

watch(
  () => props.value,
  (newValue) => {
    // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
    if (newValue === null || newValue === undefined) {
      // eslint-disable-next-line quotes
      throw Error("value can't be null or undefined")
    }
    // 当建立relations关系之后，radio的value改变,以下内容才能执行
    if (!parent || newValue === null) return
    // 检查自己绑定的值是否和其它radio冲突
    parent.$.exposed.checkValue(proxy)
    // 会判断新value是否和radioGroup的value一致，一致就会调用radio的方法选中此节点。
    // 如果之前本节点被选中，匹配不上还要主动关闭自己
    if (newValue === parent.modelValue) {
      parent.$.exposed.changeSelect(newValue)
    } else {
      isChecked.value = false
    }
  }
)

watch(
  () => props.shape,
  (newValue) => {
    // type: 'dot', 'button', 'check'
    const type = ['check', 'dot', 'button']
    if (!newValue || type.indexOf(newValue) === -1) throw Error(`shape must be one of ${type.toString()}`)
  }
)

onBeforeMount(() => {
  if (parent) {
    parent.$.exposed.setChild && parent.$.exposed.setChild(proxy)
    isChecked.value = props.value === parent.modelValue
  }
})

/**
 * 点击子元素，通知父元素触发change事件
 */
function handleClick() {
  const { value } = props
  if (!innerDisabled.value && parent && value !== null && value !== undefined) {
    parent.$.exposed.handleClick(value)
    // this.parent.setData({ value })
  }
}

/**
 * 设置选中状态
 * @param checked 选中状态
 */
function setChecked(checked: boolean) {
  isChecked.value = checked
}

defineExpose({
  setChecked
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
