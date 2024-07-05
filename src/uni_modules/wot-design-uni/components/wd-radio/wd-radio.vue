<template>
  <view
    :class="`wd-radio ${innerCell ? 'is-cell-radio' : ''} ${innerCell && innerShape == 'button' ? 'is-button-radio' : ''} ${
      innerSize ? 'is-' + innerSize : ''
    } ${innerInline ? 'is-inline' : ''} ${isChecked ? 'is-checked' : ''} ${innerShape !== 'check' ? 'is-' + innerShape : ''} ${
      innerDisabled ? 'is-disabled' : ''
    } ${customClass}`"
    :style="customStyle"
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
import { computed, watch } from 'vue'
import { useParent } from '../composables/useParent'
import { RADIO_GROUP_KEY } from '../wd-radio-group/types'
import { radioProps } from './types'

const props = defineProps(radioProps)

const { parent: radioGroup } = useParent(RADIO_GROUP_KEY)

const isChecked = computed(() => {
  if (radioGroup) {
    return props.value === radioGroup.props.modelValue
  } else {
    return false
  }
})

const innerShape = computed(() => {
  if (!props.shape && radioGroup && radioGroup.props.shape) {
    return radioGroup.props.shape
  } else {
    return props.shape
  }
})

const innerCheckedColor = computed(() => {
  if (!props.checkedColor && radioGroup && radioGroup.props.checkedColor) {
    return radioGroup.props.checkedColor
  } else {
    return props.checkedColor
  }
})

const innerDisabled = computed(() => {
  if ((props.disabled === null || props.disabled === undefined) && radioGroup && radioGroup.props.disabled) {
    return radioGroup.props.disabled
  } else {
    return props.disabled
  }
})

const innerInline = computed(() => {
  if ((props.inline === null || props.inline === undefined) && radioGroup && radioGroup.props.inline) {
    return radioGroup.props.inline
  } else {
    return props.inline
  }
})

const innerSize = computed(() => {
  if (!props.size && radioGroup && radioGroup.props.size) {
    return radioGroup.props.size
  } else {
    return props.size
  }
})

const innerCell = computed(() => {
  if ((props.cell === null || props.cell === undefined) && radioGroup && radioGroup.props.cell) {
    return radioGroup.props.cell
  } else {
    return props.cell
  }
})

watch(
  () => props.shape,
  (newValue) => {
    const type = ['check', 'dot', 'button']
    if (!newValue || type.indexOf(newValue) === -1) console.error(`shape must be one of ${type.toString()}`)
  }
)

/**
 * 点击子元素，通知父元素触发change事件
 */
function handleClick() {
  const { value } = props
  if (!innerDisabled.value && radioGroup && value !== null && value !== undefined) {
    radioGroup.updateValue(value)
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
