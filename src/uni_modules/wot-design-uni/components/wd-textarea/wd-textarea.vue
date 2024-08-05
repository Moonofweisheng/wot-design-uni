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
        :placeholder="placeholderValue"
        :disabled="disabled"
        :maxlength="maxlength"
        :focus="focused"
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
        <wd-icon v-if="showClear" custom-class="wd-textarea__clear" name="error-fill" @click="handleClear" />
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
import { objToStyle, requestAnimationFrame, isDef, pause } from '../common/util'
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

const placeholderValue = computed(() => {
  return isDef(props.placeholder) ? props.placeholder : translate('placeholder')
})

const clearing = ref<boolean>(false)
const focused = ref<boolean>(false) // 控制聚焦
const focusing = ref<boolean>(false) // 当前是否激活状态
const inputValue = ref<string | number>('') // 输入框的值
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
  },
  { immediate: true, deep: true }
)

const { parent: form } = useParent(FORM_KEY)

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
  inputValue.value = formatValue(inputValue.value)
  emit('update:modelValue', inputValue.value)
}

function formatValue(value: string | number) {
  const { maxlength, showWordLimit } = props
  if (showWordLimit && maxlength !== -1 && String(value).length > maxlength) {
    return value.toString().substring(0, maxlength)
  }
  return value
}

function handleClear() {
  clearing.value = true
  focusing.value = false
  inputValue.value = ''
  if (props.focusWhenClear) {
    focused.value = false
  }
  requestAnimationFrame(() => {
    if (props.focusWhenClear) {
      focused.value = true
      focusing.value = true
    }
    emit('change', {
      value: ''
    })
    emit('update:modelValue', inputValue.value)
    emit('clear')
  })
}
async function handleBlur({ detail }: any) {
  // 等待150毫秒，clear执行完毕
  await pause(150)

  if (clearing.value) {
    clearing.value = false
    return
  }

  focusing.value = false
  emit('blur', {
    value: inputValue.value,
    cursor: detail.cursor ? detail.cursor : null
  })
}
function handleFocus({ detail }: any) {
  focusing.value = true
  emit('focus', detail)
}
function handleInput({ detail }: any) {
  inputValue.value = formatValue(inputValue.value as string)
  emit('update:modelValue', inputValue.value)
  emit('input', detail)
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
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
