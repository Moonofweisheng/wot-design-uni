<template>
  <view :class="rootClass" :style="customStyle" @click="handleClick">
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
    <view :class="`wd-textarea__value ${customTextareaContainerClass} ${showWordCount ? 'is-show-limit' : ''}`">
      <textarea
        :class="`wd-textarea__inner ${showClear ? 'is-suffix' : ''} ${customTextareaClass}`"
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
          <text
            :class="[
              inputValue && String(inputValue).length > 0 ? 'wd-textarea__count-current' : '',
              String(inputValue).length > parseInt(String(maxlength)) ? 'is-error' : ''
            ]"
          >
            {{ String(inputValue).length }}
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
type ConfirmType = 'send' | 'search' | 'next' | 'go' | 'done'

const { translate } = useTranslate('textarea')

interface Props {
  // 原生属性
  placeholder?: string
  placeholderStyle?: string
  placeholderClass?: string
  disabled?: boolean
  maxlength?: number
  focus?: boolean
  autoFocus?: boolean
  autoHeight?: boolean
  fixed?: boolean
  cursorSpacing?: number
  cursor?: number
  confirmType?: ConfirmType
  confirmHold?: boolean
  showConfirmBar?: boolean
  selectionStart?: number
  selectionEnd?: number
  adjustPosition?: boolean
  disableDefaultPadding?: boolean
  holdKeyboard?: boolean
  // 原生属性结束
  modelValue: string | number
  showPassword?: boolean
  clearable?: boolean
  readonly?: boolean
  prefixIcon?: string
  usePrefixSlot?: boolean
  showWordLimit?: boolean
  label?: string
  labelWidth?: string
  useLabelSlot?: boolean
  size?: string
  error?: boolean
  center?: boolean
  noBorder?: boolean
  required?: boolean
  prop?: string
  rules?: FormItemRule[]
  customTextareaContainerClass?: string
  customTextareaClass?: string
  customLabelClass?: string
  customClass?: string
  customStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  customTextareaContainerClass: '',
  customTextareaClass: '',
  customLabelClass: '',
  customClass: '',
  customStyle: '',
  maxlength: -1,
  modelValue: '',
  autoHeight: false,
  clearable: false,
  showPassword: false,
  disabled: false,
  readonly: false,
  usePrefixSlot: false,
  showWordLimit: false,
  placeholderClass: '',
  focus: false,
  autoFocus: false,
  cursorSpacing: 0,
  fixed: false,
  cursor: -1,
  showConfirmBar: true,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  holdKeyboard: false,
  confirmType: 'done',
  confirmHold: false,
  disableDefaultPadding: false,
  error: false,
  center: false,
  labelWidth: '33%',
  useLabelSlot: false,
  required: false,
  noBorder: false,
  rules: () => []
})

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

const rootClass = computed(() => {
  return `wd-textarea   ${props.label || props.useLabelSlot ? 'is-cell' : ''} ${props.center ? 'is-center' : ''} ${
    cell.border.value ? 'is-border' : ''
  } ${props.size ? 'is-' + props.size : ''} ${props.error ? 'is-error' : ''} ${props.disabled ? 'is-disabled' : ''} ${
    props.autoHeight ? 'is-auto-height' : ''
  } ${inputValue.value && String(inputValue.value).length > 0 ? 'is-not-empty' : ''}  ${props.noBorder ? 'is-no-border' : ''} ${props.customClass}`
})

const labelClass = computed(() => {
  return `wd-textarea__label ${props.customLabelClass} ${isRequired.value ? 'is-required' : ''}`
})

const inputPlaceholderClass = computed(() => {
  return `wd-textarea__placeholder  ${props.placeholderClass}`
})

const labelStyle = computed(() => {
  return props.labelWidth
    ? objToStyle({
        'min-width': props.labelWidth,
        'max-width': props.labelWidth
      })
    : ''
})

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

function clear() {
  inputValue.value = ''
  requestAnimationFrame()
    .then(() => requestAnimationFrame())
    .then(() => requestAnimationFrame())
    .then(() => {
      isFocus.value = true
      emit('clear')
      emit('change', {
        value: ''
      })
      emit('update:modelValue', inputValue.value)
    })
}
// 失去焦点时会先后触发change、blur，未输入内容但失焦不触发 change 只触发 blur
function handleBlur({ detail }) {
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
function handleFocus({ detail }) {
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
function handleKeyboardheightchange({ detail }) {
  emit('keyboardheightchange', detail)
}
function handleConfirm({ detail }) {
  emit('confirm', detail)
}
function handleLineChange({ detail }) {
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
