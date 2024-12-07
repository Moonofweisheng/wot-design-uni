<template>
  <view
    :class="`wd-radio ${cellValue ? 'is-cell-radio' : ''} ${cellValue && shapeValue == 'button' ? 'is-button-radio' : ''} ${
      sizeValue ? 'is-' + sizeValue : ''
    } ${inlineValue ? 'is-inline' : ''} ${isChecked ? 'is-checked' : ''} ${shapeValue !== 'check' ? 'is-' + shapeValue : ''} ${
      disabledValue ? 'is-disabled' : ''
    } icon-placement-${iconPlacement} ${customClass}`"
    :style="customStyle"
    @click="handleClick"
  >
    <view
      class="wd-radio__label"
      :style="`${maxWidth ? 'max-width:' + maxWidth : ''};  ${
        isChecked && shapeValue === 'button' && !disabledValue ? 'color :' + checkedColorValue : ''
      }`"
    >
      <slot></slot>
    </view>
    <view class="wd-radio__shape" :style="isChecked && !disabledValue ? 'color: ' + checkedColorValue : ''">
      <wd-icon v-if="shapeValue === 'check'" :style="isChecked && !disabledValue ? 'color: ' + checkedColorValue : ''" name="check"></wd-icon>
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
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed, watch } from 'vue'
import { useParent } from '../composables/useParent'
import { RADIO_GROUP_KEY } from '../wd-radio-group/types'
import { radioProps, type RadioIconPlacement } from './types'
import { getPropByPath, isDef } from '../common/util'

const props = defineProps(radioProps)

const { parent: radioGroup } = useParent(RADIO_GROUP_KEY)

const isChecked = computed(() => {
  if (radioGroup) {
    return props.value === radioGroup.props.modelValue
  } else {
    return false
  }
})

const shapeValue = computed(() => {
  return props.shape || getPropByPath(radioGroup, 'props.shape')
})

const checkedColorValue = computed(() => {
  return props.checkedColor || getPropByPath(radioGroup, 'props.checkedColor')
})

const disabledValue = computed(() => {
  if (isDef(props.disabled)) {
    return props.disabled
  } else {
    return getPropByPath(radioGroup, 'props.disabled')
  }
})

const inlineValue = computed(() => {
  if (isDef(props.inline)) {
    return props.inline
  } else {
    return getPropByPath(radioGroup, 'props.inline')
  }
})

const sizeValue = computed(() => {
  return props.size || getPropByPath(radioGroup, 'props.size')
})

const cellValue = computed(() => {
  if (isDef(props.cell)) {
    return props.cell
  } else {
    return getPropByPath(radioGroup, 'props.cell')
  }
})

const iconPlacement = computed<RadioIconPlacement>(() => {
  if (isDef(props.iconPlacement)) {
    return props.iconPlacement
  } else {
    return getPropByPath(radioGroup, 'props.iconPlacement')
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
  if (!disabledValue.value && radioGroup && isDef(value)) {
    radioGroup.updateValue(value)
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
