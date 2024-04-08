<template>
  <view :class="rootClass" :style="customStyle" @click="handleClick">
    <view v-if="label || useLabelSlot" :class="labelClass" :style="labelStyle">
      <view v-if="prefixIcon || usePrefixSlot" class="wd-input__prefix">
        <wd-icon v-if="prefixIcon && !usePrefixSlot" custom-class="wd-input__icon" :name="prefixIcon" @click="onClickPrefixIcon" />
        <slot v-else name="prefix"></slot>
      </view>
      <view class="wd-input__label-inner">
        <template v-if="label">{{ label }}</template>
        <slot v-else name="label"></slot>
      </view>
    </view>
    <!-- 输入域 -->
    <view class="wd-input__body">
      <view class="wd-input__value">
        <view v-if="(prefixIcon || usePrefixSlot) && !label" class="wd-input__prefix">
          <wd-icon v-if="prefixIcon" custom-class="wd-input__icon" :name="prefixIcon" @click="onClickPrefixIcon" />
          <slot name="prefix"></slot>
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
          :placeholder="placeholder || translate('placeholder')"
          :disabled="disabled"
          :maxlength="maxlength"
          :focus="isFocus"
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
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @confirm="handleConfirm"
          @keyboardheightchange="handleKeyboardheightchange"
        />
        <view v-if="readonly" class="wd-input__readonly-mask" />
        <view v-if="showClear || showPassword || suffixIcon || showWordCount || useSuffixSlot" class="wd-input__suffix">
          <wd-icon v-if="showClear" custom-class="wd-input__clear" name="error-fill" @click="clear" />
          <wd-icon v-if="showPassword" custom-class="wd-input__icon" :name="isPwdVisible ? 'view' : 'eye-close'" @click="togglePwdVisible" />
          <view v-if="showWordCount" class="wd-input__count">
            <text
              :class="[
                inputValue && String(inputValue).length > 0 ? 'wd-input__count-current' : '',
                String(inputValue).length > maxlength ? 'is-error' : ''
              ]"
            >
              {{ String(inputValue).length }}
            </text>
            /{{ maxlength }}
          </view>
          <wd-icon v-if="suffixIcon" custom-class="wd-input__icon" :name="suffixIcon" @click="onClickSuffixIcon" />
          <slot name="suffix"></slot>
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
import { computed, onBeforeMount, ref, watch } from 'vue'
import { objToStyle, requestAnimationFrame } from '../common/util'
import { useCell } from '../composables/useCell'
import { FORM_KEY, type FormItemRule } from '../wd-form/types'
import { useParent } from '../composables/useParent'
import { useTranslate } from '../composables/useTranslate'
import { inputProps } from './types'

const props = defineProps(inputProps)
const emit = defineEmits([
  'update:modelValue',
  'clear',
  'change',
  'blur',
  'focus',
  'input',
  'keyboardheightchange',
  'confirm',
  'linechange',
  'clicksuffixicon',
  'clickprefixicon',
  'click'
])
const { translate } = useTranslate('input')

const showClear = ref<boolean>(false)
const showWordCount = ref<boolean>(false)
const isPwdVisible = ref<boolean>(false)
const clearing = ref<boolean>(false)
const isFocus = ref<boolean>(false) // 是否聚焦
const inputValue = ref<string | number>('') // 输入框的值
const cell = useCell()

watch(
  () => props.focus,
  (newValue) => {
    isFocus.value = newValue
  },
  { immediate: true, deep: true }
)

watch(
  () => props.modelValue,
  (newValue) => {
    const { disabled, readonly, clearable } = props
    if (newValue === undefined) {
      newValue = ''
      console.warn('[wot-design] warning(wd-input): value can not be undefined.')
    }
    inputValue.value = newValue
    showClear.value = Boolean(clearable && !disabled && !readonly && newValue)
  },
  { immediate: true, deep: true }
)

const { parent: form } = useParent(FORM_KEY)

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
  return `wd-input  ${props.label || props.useLabelSlot ? 'is-cell' : ''} ${props.center ? 'is-center' : ''} ${
    cell.border.value ? 'is-border' : ''
  } ${props.size ? 'is-' + props.size : ''} ${props.error ? 'is-error' : ''} ${props.disabled ? 'is-disabled' : ''}  ${
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

onBeforeMount(() => {
  initState()
})

// 状态初始化
function initState() {
  const { disabled, readonly, clearable, maxlength, showWordLimit } = props
  let newVal = ''
  if (showWordLimit && maxlength && inputValue.value.toString().length > maxlength) {
    newVal = inputValue.value.toString().substring(0, maxlength)
  }
  showClear.value = Boolean(!disabled && !readonly && clearable && inputValue.value)
  showWordCount.value = Boolean(!disabled && !readonly && maxlength && showWordLimit)
  inputValue.value = newVal || inputValue.value
  emit('update:modelValue', inputValue.value)
}
function togglePwdVisible() {
  // password属性设置false不生效，置空生效
  isPwdVisible.value = !isPwdVisible.value
}
function clear() {
  inputValue.value = ''
  requestAnimationFrame()
    .then(() => requestAnimationFrame())
    .then(() => requestAnimationFrame())
    .then(() => {
      isFocus.value = true
      emit('change', {
        value: ''
      })
      emit('update:modelValue', inputValue.value)
      emit('clear')
    })
}
// 失去焦点时会先后触发change、blur，未输入内容但失焦不触发 change 只触发 blur
function handleBlur() {
  isFocus.value = false
  emit('change', {
    value: inputValue.value
  })
  emit('update:modelValue', inputValue.value)
  emit('blur', {
    value: inputValue.value
  })
}
function handleFocus({ detail }: any) {
  if (clearing.value) {
    clearing.value = false
    return
  }
  isFocus.value = true
  emit('focus', detail)
}
// input事件需要传入
function handleInput() {
  emit('update:modelValue', inputValue.value)
  emit('input', inputValue.value)
}
function handleKeyboardheightchange(event: any) {
  emit('keyboardheightchange', event.detail)
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
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
