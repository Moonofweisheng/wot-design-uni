<template>
  <view :class="rootClass" :style="customStyle" @click="handleClick">
    <view v-if="label || $slots.label" :class="labelClass" :style="labelStyle">
      <view v-if="prefixIcon || $slots.prefix" class="wd-input__prefix">
        <wd-icon v-if="prefixIcon && !$slots.prefix" custom-class="wd-input__icon" :name="prefixIcon" @click="onClickPrefixIcon" />
        <slot v-else name="prefix"></slot>
      </view>
      <view class="wd-input__label-inner">
        <template v-if="label && !$slots.label">{{ label }}</template>
        <slot v-else name="label"></slot>
      </view>
    </view>
    <view class="wd-input__body">
      <view class="wd-input__value">
        <view v-if="(prefixIcon || $slots.prefix) && !label" class="wd-input__prefix">
          <wd-icon v-if="prefixIcon && !$slots.prefix" custom-class="wd-input__icon" :name="prefixIcon" @click="onClickPrefixIcon" />
          <slot v-else name="prefix"></slot>
        </view>
        <input
          :class="[
            'wd-input__inner',
            prefixIcon ? 'wd-input__inner--prefix' : '',
            showWordCount ? 'wd-input__inner--count' : '',
            alignRight ? 'is-align-right' : '',
            customInputClass
          ]"
          :type="type"
          :password="showPassword && !isPwdVisible"
          v-model="inputValue"
          :placeholder="placeholderValue"
          :disabled="disabled || readonly"
          :maxlength="maxlength"
          :focus="focused"
          :confirm-type="confirmType"
          :confirm-hold="confirmHold"
          :cursor="cursor"
          :cursor-spacing="cursorSpacing"
          :placeholder-style="placeholderStyle"
          :selection-start="selectionStart"
          :selection-end="selectionEnd"
          :adjust-position="adjustPosition"
          :hold-keyboard="holdKeyboard"
          :always-embed="alwaysEmbed"
          :placeholder-class="inputPlaceholderClass"
          :ignoreCompositionEvent="ignoreCompositionEvent"
          :inputmode="inputmode"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @confirm="handleConfirm"
          @keyboardheightchange="handleKeyboardheightchange"
        />
        <view v-if="props.readonly" class="wd-input__readonly-mask" />
        <view v-if="showClear || showPassword || suffixIcon || showWordCount || $slots.suffix" class="wd-input__suffix">
          <wd-icon v-if="showClear" custom-class="wd-input__clear" name="error-fill" @click="handleClear" />
          <wd-icon v-if="showPassword" custom-class="wd-input__icon" :name="isPwdVisible ? 'view' : 'eye-close'" @click="togglePwdVisible" />
          <view v-if="showWordCount" class="wd-input__count">
            <text
              :class="[
              inputValue && String(inputValue).length > 0 ? 'wd-input__count-current' : '',
              String(inputValue).length > maxlength! ? 'is-error' : ''
            ]"
            >
              {{ String(inputValue).length }}
            </text>
            /{{ maxlength }}
          </view>
          <wd-icon v-if="suffixIcon && !$slots.suffix" custom-class="wd-input__icon" :name="suffixIcon" @click="onClickSuffixIcon" />
          <slot v-else name="suffix"></slot>
        </view>
      </view>
      <view v-if="errorMessage" class="wd-input__error-message">{{ errorMessage }}</view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-input',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref, watch, useSlots, type Slots } from 'vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import { isDef, objToStyle, pause, isEqual } from '../common/util'
import { useCell } from '../composables/useCell'
import { FORM_KEY, type FormItemRule } from '../wd-form/types'
import { useParent } from '../composables/useParent'
import { useTranslate } from '../composables/useTranslate'
import { inputProps } from './types'

interface InputSlots extends Slots {
  prefix?: () => any
  suffix?: () => any
  label?: () => any
}

const props = defineProps(inputProps)
const emit = defineEmits([
  'update:modelValue',
  'clear',
  'blur',
  'focus',
  'input',
  'keyboardheightchange',
  'confirm',
  'clicksuffixicon',
  'clickprefixicon',
  'click'
])
const slots = useSlots() as InputSlots
const { translate } = useTranslate('input')

const isPwdVisible = ref<boolean>(false)
const clearing = ref<boolean>(false) // 是否正在清空操作，避免重复触发失焦
const focused = ref<boolean>(false) // 控制聚焦
const focusing = ref<boolean>(false) // 当前是否激活状态
const inputValue = ref<string | number>(getInitValue()) // 输入框的值
const cell = useCell()

watch(
  () => props.focus,
  (newValue) => {
    focused.value = newValue
  },
  { immediate: true, deep: true }
)

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = isDef(newValue) ? String(newValue) : ''
  }
)

const { parent: form } = useParent(FORM_KEY)

const placeholderValue = computed(() => {
  return isDef(props.placeholder) ? props.placeholder : translate('placeholder')
})

/**
 * 展示清空按钮
 */
const showClear = computed(() => {
  const { disabled, readonly, clearable, clearTrigger } = props
  if (clearable && !readonly && !disabled && inputValue.value && (clearTrigger === 'always' || (props.clearTrigger === 'focus' && focusing.value))) {
    return true
  } else {
    return false
  }
})

/**
 * 展示字数统计
 */
const showWordCount = computed(() => {
  const { disabled, readonly, maxlength, showWordLimit } = props
  return Boolean(!disabled && !readonly && isDef(maxlength) && maxlength > -1 && showWordLimit)
})

/**
 * 表单错误提示信息
 */
const errorMessage = computed(() => {
  if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
    return form.errorMessages[props.prop]
  } else {
    return ''
  }
})

// 是否展示必填
const isRequired = computed(() => {
  let formRequired = false
  if (form && form.props.rules) {
    const rules = form.props.rules
    for (const key in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, key) && key === props.prop && Array.isArray(rules[key])) {
        formRequired = rules[key].some((rule: FormItemRule) => rule.required)
      }
    }
  }
  return props.required || props.rules.some((rule) => rule.required) || formRequired
})

const rootClass = computed(() => {
  return `wd-input  ${props.label || slots.label ? 'is-cell' : ''} ${props.center ? 'is-center' : ''} ${cell.border.value ? 'is-border' : ''} ${
    props.size ? 'is-' + props.size : ''
  } ${props.error ? 'is-error' : ''} ${props.disabled ? 'is-disabled' : ''}  ${
    inputValue.value && String(inputValue.value).length > 0 ? 'is-not-empty' : ''
  }  ${props.noBorder ? 'is-no-border' : ''} ${props.customClass}`
})

const labelClass = computed(() => {
  return `wd-input__label ${props.customLabelClass} ${isRequired.value ? 'is-required' : ''}`
})

const inputPlaceholderClass = computed(() => {
  return `wd-input__placeholder  ${props.placeholderClass}`
})

const labelStyle = computed(() => {
  return props.labelWidth
    ? objToStyle({
        'min-width': props.labelWidth,
        'max-width': props.labelWidth
      })
    : ''
})

// 状态初始化
function getInitValue() {
  const formatted = formatValue(props.modelValue)
  if (!isValueEqual(formatted, props.modelValue)) {
    emit('update:modelValue', formatted)
  }
  return formatted
}

function formatValue(value: string | number) {
  const { maxlength } = props
  if (isDef(maxlength) && maxlength !== -1 && String(value).length > maxlength) {
    return value.toString().slice(0, maxlength)
  }
  return value
}

function togglePwdVisible() {
  isPwdVisible.value = !isPwdVisible.value
}
async function handleClear() {
  focusing.value = false
  inputValue.value = ''
  if (props.focusWhenClear) {
    clearing.value = true
    focused.value = false
  }
  await pause()
  if (props.focusWhenClear) {
    focused.value = true
    focusing.value = true
  }
  emit('update:modelValue', inputValue.value)
  emit('clear')
}
async function handleBlur() {
  // 等待150毫秒，clear执行完毕
  await pause(150)
  if (clearing.value) {
    clearing.value = false
    return
  }
  focusing.value = false
  emit('blur', {
    value: inputValue.value
  })
}
function handleFocus({ detail }: any) {
  focusing.value = true
  emit('focus', detail)
}
function handleInput({ detail }: any) {
  emit('update:modelValue', inputValue.value)
  emit('input', detail)
}
function handleKeyboardheightchange({ detail }: any) {
  emit('keyboardheightchange', detail)
}
function handleConfirm({ detail }: any) {
  emit('confirm', detail)
}
function onClickSuffixIcon() {
  emit('clicksuffixicon')
}
function onClickPrefixIcon() {
  emit('clickprefixicon')
}
function handleClick(event: MouseEvent) {
  emit('click', event)
}
function isValueEqual(value1: number | string, value2: number | string) {
  return isEqual(String(value1), String(value2))
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
<style lang="scss">
@import './placeholder.scss';
</style>
