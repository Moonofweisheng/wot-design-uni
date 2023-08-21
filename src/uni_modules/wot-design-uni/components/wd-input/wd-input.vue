<template>
  <view :class="rootClass" :style="customStyle" name="test">
    <view v-if="label || useLabelSlot" :class="labelClass" :style="labelStyle">
      <view v-if="prefixIcon || usePrefixSlot" class="wd-input__prefix">
        <wd-icon v-if="prefixIcon && !usePrefixSlot" custom-class="wd-input__icon" :name="prefixIcon" @click="onClickPrefixIcon" />
        <slot v-else name="prefix"></slot>
      </view>
      <view style="display: inline-flex">
        <view class="wd-input__label-inner">
          <template v-if="label">{{ label }}</template>
          <slot v-else name="label"></slot>
        </view>
      </view>
    </view>
    <!-- 文本域 -->
    <view v-if="type === 'textarea'" :class="`wd-input__textarea ${customTextareaContainerClass} ${showWordCount ? 'is-show-limit' : ''}`">
      <!-- readonly -->
      <view v-if="readonly" class="wd-input__textarea-inner">{{ inputValue }}</view>
      <template v-else>
        <textarea
          :class="`wd-input__textarea-inner ${showClear ? 'is-suffix' : ''} ${customTextareaClass}`"
          v-model="inputValue"
          :show-count="false"
          :placeholder="placeholder"
          :disabled="disabled"
          :minlength="minlength"
          :maxlength="maxlength"
          :focus="isFocus"
          :placeholder-style="placeholderStyle"
          :placeholder-class="inputPlaceholderClass"
          :auto-height="autoHeight"
          :cursor-spacing="cursorSpacing"
          :fixed="fixed"
          :cursor="cursor"
          :show-confirm-barb="showConfirmBar"
          :selection-start="selectionStart"
          :selection-end="selectionEnd"
          :adjust-position="adjustPosition"
          :hold-keyboard="holdKeyboard"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @confirm="handleConfirm"
          @linechange="handleLineChange"
          @keyboardheightchange="handleKeyboardheightchange"
        />
        <view class="wd-input__textarea-suffix">
          <wd-icon v-if="showClear" custom-class="wd-input__textarea-icon" name="error-fill" @click="clear" />
          <view v-if="showWordCount" class="wd-input__textarea-count">
            <text
              :class="[
                inputValue && String(inputValue).length > 0 ? 'wd-input__textarea-count-current' : '',
                String(inputValue).length > parseInt(String(maxlength)) ? 'is-error' : ''
              ]"
            >
              {{ String(inputValue).length }}
            </text>
            /{{ maxlength }}
          </view>
        </view>
      </template>
    </view>
    <!-- 输入域 -->
    <view v-else class="wd-input__block">
      <view v-if="(prefixIcon || usePrefixSlot) && !label" class="wd-input__prefix">
        <wd-icon v-if="prefixIcon" custom-class="wd-input__icon" :name="prefixIcon" @click="onClickPrefixIcon" />
        <slot name="prefix"></slot>
      </view>
      <!-- readonly -->
      <view v-if="readonly" class="wd-input__inner wd-input__readonly">{{ inputValue }}</view>
      <template v-else>
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
          :placeholder="placeholder"
          :readonly="readonly"
          :disabled="disabled"
          :minlength="minlength"
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
          :placeholder-class="inputPlaceholderClass"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @confirm="handleConfirm"
          @keyboardheightchange="handleKeyboardheightchange"
        />
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
      </template>
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
import { useCell } from '../mixins/useCell'

interface Props {
  customTextareaContainerClass: string
  customTextareaClass: string
  customInputClass: string
  customLabelClass: string
  customClass: string
  customStyle: string
  // 原生属性
  placeholder: string
  placeholderStyle?: string
  placeholderClass: string
  autoHeight: boolean
  fixed: boolean
  cursorSpacing: number
  cursor: number
  showConfirmBar: boolean
  selectionStart: number
  selectionEnd: number
  adjustPosition: boolean
  holdKeyboard: boolean
  confirmType: string
  confirmHold: boolean
  focus: boolean
  type: string
  maxlength: number
  disabled: boolean
  alignRight: boolean
  // 原生属性结束
  modelValue: string | number
  minlength?: number
  showPassword: boolean
  clearable: boolean
  showClear: boolean
  readonly: boolean
  useSuffixSlot: boolean
  usePrefixSlot: boolean
  prefixIcon?: string
  suffixIcon?: string
  showWordLimit: boolean
  showWordCount: boolean
  suffix?: string
  suffixCount?: number
  label?: string
  labelWidth: string
  useLabelSlot: boolean
  size?: string
  error: boolean
  center: boolean
  noBorder: boolean
  required: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customTextareaContainerClass: '',
  customTextareaClass: '',
  customInputClass: '',
  customLabelClass: '',
  customClass: '',
  customStyle: '',
  type: 'text',
  maxlength: -1,
  modelValue: '',
  placeholder: '请输入...',
  autoHeight: false,
  clearable: false,
  showPassword: false,
  disabled: false,
  showClear: false,
  alignRight: false,
  readonly: false,
  useSuffixSlot: false,
  usePrefixSlot: false,
  showWordLimit: false,
  showWordCount: false,
  confirmType: 'done',
  confirmHold: false,
  placeholderClass: 'textarea-placeholder',
  focus: false,
  cursorSpacing: 0,
  fixed: false,
  cursor: -1,
  showConfirmBar: true,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  holdKeyboard: false,
  error: false,
  center: false,
  labelWidth: '33%',
  useLabelSlot: false,
  required: false,
  noBorder: false
})

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
    // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
    if (newValue === null || newValue === undefined) {
      throw Error('value can not be null or undefined')
    }
    inputValue.value = newValue
    showClear.value = Boolean(clearable && !disabled && !readonly && newValue)
  },
  { immediate: true, deep: true }
)

const rootClass = computed(() => {
  return `wd-input ${props.type === 'textarea' ? 'is-textarea' : ''} ${props.label || props.useLabelSlot ? 'is-cell' : ''} ${
    props.center ? 'is-center' : ''
  } ${cell.border.value ? 'is-border' : ''} ${props.size ? 'is-' + props.size : ''} ${props.error ? 'is-error' : ''} ${
    props.disabled ? 'is-disabled' : ''
  } ${props.autoHeight ? 'is-auto-height' : ''} ${inputValue.value && String(inputValue.value).length > 0 ? 'is-not-empty' : ''}  ${
    props.noBorder ? 'is-no-border' : ''
  } ${props.customClass}`
})

const labelClass = computed(() => {
  return `wd-input__label ${props.customLabelClass} ${props.required ? 'is-required' : ''}`
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
  'clickprefixicon'
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
function handleKeyboardheightchange(event) {
  emit('keyboardheightchange', event.detail)
}
function handleConfirm({ detail }) {
  emit('confirm', detail)
}
function handleLineChange(event) {
  emit('linechange', event.detail)
}
function onClickSuffixIcon() {
  emit('clicksuffixicon')
}
function onClickPrefixIcon() {
  emit('clickprefixicon')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
