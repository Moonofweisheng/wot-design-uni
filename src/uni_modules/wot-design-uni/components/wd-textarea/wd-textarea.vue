<template>
  <view :class="rootClass" :style="customStyle">
    <view v-if="label || useLabelSlot" :class="labelClass" :style="labelStyle">
      <view v-if="prefixIcon || usePrefixSlot" class="wd-textarea__prefix">
        <wd-icon v-if="prefixIcon && !usePrefixSlot" custom-class="wd-textarea__icon" :name="prefixIcon" @click="onClickPrefixIcon" />
        <slot v-else name="prefix"></slot>
      </view>
      <view class="wd-textarea__label-inner">
        <text v-if="label">{{ label }}</text>
        <slot v-else name="label"></slot>
      </view>
    </view>

    <!-- 文本域 -->
    <view :class="`wd-textarea__value ${showClear ? 'is-suffix' : ''} ${customTextareaContainerClass} ${showWordCount ? 'is-show-limit' : ''}`">
      <textarea
        :class="`wd-textarea__inner ${customTextareaClass}`"
        v-model="inputValue"
        :show-count="false"
        :placeholder="placeholder || translate('placeholder')"
        :disabled="disabled"
        :maxlength="maxlength"
        :focus="isFocus"
        :auto-focus="autoFocus"
        :placeholder-style="placeholderStyle"
        :placeholder-class="inputPlaceholderClass"
        :auto-height="autoHeight"
        :cursor-spacing="cursorSpacing"
        :fixed="fixed"
        :cursor="cursor"
        :show-confirm-bar="showConfirmBar"
        :selection-start="selectionStart"
        :selection-end="selectionEnd"
        :adjust-position="adjustPosition"
        :hold-keyboard="holdKeyboard"
        :confirm-type="confirmType"
        :confirm-hold="confirmHold"
        :disable-default-padding="disableDefaultPadding"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="handleConfirm"
        @linechange="handleLineChange"
        @keyboardheightchange="handleKeyboardheightchange"
      />
      <view v-if="errorMessage" class="wd-textarea__error-message">{{ errorMessage }}</view>

      <view v-if="readonly" class="wd-textarea__readonly-mask" />
      <view class="wd-textarea__suffix">
        <wd-icon v-if="showClear" custom-class="wd-textarea__clear" name="error-fill" @click="clear" />
        <view v-if="showWordCount" class="wd-textarea__count">
          <text :class="countClass">
            {{ currentLength }}
          </text>
          /{{ maxlength }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-textarea',
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
import { textareaProps } from './types'

const { translate } = useTranslate('textarea')

const props = defineProps(textareaProps)
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
  'clickprefixicon',
  'click'
])

const showClear = ref<boolean>(false)
const showWordCount = ref<boolean>(false)
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
    if (newValue === null || newValue === undefined) {
      newValue = ''
      console.warn('[wot-design] warning(wd-textarea): value can not be null or undefined.')
    }
    inputValue.value = newValue
    showClear.value = Boolean(clearable && !disabled && !readonly && newValue)
  },
  { immediate: true, deep: true }
)

const { parent: form } = useParent(FORM_KEY)

// 表单校验错误信息
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

// 当前文本域文字长度
const currentLength = computed(() => {
  return String(props.modelValue || '').length
})

const rootClass = computed(() => {
  return `wd-textarea   ${props.label || props.useLabelSlot ? 'is-cell' : ''} ${props.center ? 'is-center' : ''} ${
    cell.border.value ? 'is-border' : ''
  } ${props.size ? 'is-' + props.size : ''} ${props.error ? 'is-error' : ''} ${props.disabled ? 'is-disabled' : ''} ${
    props.autoHeight ? 'is-auto-height' : ''
  } ${currentLength.value > 0 ? 'is-not-empty' : ''}  ${props.noBorder ? 'is-no-border' : ''} ${props.customClass}`
})

const labelClass = computed(() => {
  return `wd-textarea__label ${props.customLabelClass} ${isRequired.value ? 'is-required' : ''}`
})

const inputPlaceholderClass = computed(() => {
  return `wd-textarea__placeholder  ${props.placeholderClass}`
})

const countClass = computed(() => {
  return `${currentLength.value > 0 ? 'wd-textarea__count-current' : ''} ${currentLength.value > props.maxlength ? 'is-error' : ''}`
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
  showClear.value = Boolean(!disabled && !readonly && clearable && inputValue.value)
  showWordCount.value = Boolean(!disabled && !readonly && maxlength && showWordLimit)
  inputValue.value = formatValue(inputValue.value as string)
  emit('update:modelValue', inputValue.value)
}

function formatValue(value: string) {
  const { maxlength, showWordLimit } = props
  if (showWordLimit && maxlength !== -1 && value.length > maxlength) {
    return value.toString().substring(0, maxlength)
  }
  return value
}

function clear() {
  inputValue.value = ''
  requestAnimationFrame()
    .then(() => requestAnimationFrame())
    .then(() => requestAnimationFrame())
    .then(() => {
      emit('change', {
        value: ''
      })
      emit('update:modelValue', inputValue.value)
      emit('clear')

      requestAnimationFrame().then(() => {
        isFocus.value = true
      })
    })
}
// 失去焦点时会先后触发change、blur，未输入内容但失焦不触发 change 只触发 blur
function handleBlur({ detail }: any) {
  isFocus.value = false
  emit('change', {
    value: inputValue.value
  })
  emit('update:modelValue', inputValue.value)
  emit('blur', {
    value: inputValue.value,
    // textarea 有 cursor
    cursor: detail.cursor ? detail.cursor : null
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
  inputValue.value = formatValue(inputValue.value as string)
  emit('update:modelValue', inputValue.value)
  emit('input', inputValue.value)
}
function handleKeyboardheightchange({ detail }: any) {
  emit('keyboardheightchange', detail)
}
function handleConfirm({ detail }: any) {
  emit('confirm', detail)
}
function handleLineChange({ detail }: any) {
  emit('linechange', detail)
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
