<template>
  <view :class="rootClass" :style="rootStyle" @click="handleClick">
    <view v-if="useIconSlot" class="wd-tag__icon">
      <slot name="icon" />
    </view>
    <wd-icon v-else-if="icon" :name="icon" custom-class="wd-tag__icon" />
    <view class="wd-tag__text" :style="textStyle">
      <slot />
    </view>
    <view class="wd-tag__close" v-if="closable && round" @click.stop="handleClose">
      <wd-icon name="error-fill" />
    </view>
    <input
      v-if="dynamicInput && dynamic"
      class="wd-tag__add-text"
      :placeholder="translate('placeholder')"
      type="text"
      :focus="true"
      v-model="dynamicValue"
      @blur="handleBlur"
      @confirm="handleConfirm"
    />
    <view v-else-if="dynamic" class="wd-tag__text" :style="textStyle" @click.stop="handleAdd">
      <slot name="add" v-if="$slots.add"></slot>
      <template v-else>
        <wd-icon name="add" custom-class="wd-tag__add wd-tag__icon" />
        <text>{{ translate('add') }}</text>
      </template>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-tag',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import { objToStyle } from '../common/util'
import { computed, ref, watch } from 'vue'
import { useTranslate } from '../composables/useTranslate'
import { tagProps } from './types'

const props = defineProps(tagProps)
const emit = defineEmits(['click', 'close', 'confirm'])

const { translate } = useTranslate('tag')

const tagClass = ref<string>('')
const dynamicValue = ref<string>('')
const dynamicInput = ref<boolean>(false)

watch(
  [() => props.useIconSlot, () => props.icon, () => props.plain, () => props.dynamic, () => props.round, () => props.mark],
  () => {
    computeTagClass()
  },
  { deep: true, immediate: true }
)

watch(
  () => props.type,
  (newValue) => {
    if (!newValue) return
    // type: 'primary', 'danger', 'warning', 'success'
    const type = ['primary', 'danger', 'warning', 'success', 'default']
    if (type.indexOf(newValue) === -1) console.error(`type must be one of ${type.toString()}`)
    computeTagClass()
  },
  { deep: true, immediate: true }
)

watch(
  () => dynamicInput.value,
  () => {
    computeTagClass()
  },
  { deep: true, immediate: true }
)

const rootClass = computed(() => {
  return `wd-tag ${props.customClass} ${tagClass.value}`
})

const rootStyle = computed(() => {
  const rootStyle: Record<string, any> = {}
  if (!props.plain && props.bgColor) {
    rootStyle['background'] = props.bgColor
  }
  if (props.bgColor) {
    rootStyle['border-color'] = props.bgColor
  }
  return `${objToStyle(rootStyle)}${props.customStyle}`
})

const textStyle = computed(() => {
  const textStyle: Record<string, any> = {}
  if (props.color) {
    textStyle['color'] = props.color
  }
  return objToStyle(textStyle)
})

function computeTagClass() {
  const { type, plain, round, mark, dynamic, icon, useIconSlot } = props
  let tagClassList: string[] = []
  type && tagClassList.push(`is-${type}`)
  plain && tagClassList.push('is-plain')
  round && tagClassList.push('is-round')
  mark && tagClassList.push('is-mark')
  dynamic && tagClassList.push('is-dynamic')
  dynamicInput.value && tagClassList.push('is-dynamic-input')
  if (icon || useIconSlot) tagClassList.push('is-icon')
  tagClass.value = tagClassList.join(' ')
}

function handleClick(event: any) {
  emit('click', event)
}
function handleClose(event: any) {
  emit('close', event)
}
function handleAdd() {
  dynamicInput.value = true
  dynamicValue.value = ''
}
function handleBlur() {
  setDynamicInput()
}
function handleConfirm(event: any) {
  setDynamicInput()
  emit('confirm', {
    value: event.detail.value
  })
}
function setDynamicInput() {
  dynamicInput.value = false
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
