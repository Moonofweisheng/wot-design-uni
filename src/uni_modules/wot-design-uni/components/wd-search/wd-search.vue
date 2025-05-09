<template>
  <view :class="rootClass" :style="customStyle">
    <view class="wd-search__block">
      <slot name="prefix"></slot>
      <view class="wd-search__field">
        <view v-if="!placeholderLeft" :style="coverStyle" class="wd-search__cover" @click="closeCover">
          <wd-icon name="search" custom-class="wd-search__search-icon"></wd-icon>
          <text :class="`wd-search__placeholder-txt ${placeholderClass}`">{{ placeholder || translate('search') }}</text>
        </view>
        <wd-icon v-if="showInput || inputValue || placeholderLeft" name="search" custom-class="wd-search__search-left-icon"></wd-icon>
        <input
          v-if="showInput || inputValue || placeholderLeft"
          :placeholder="placeholder || translate('search')"
          :placeholder-class="`wd-search__placeholder-txt ${placeholderClass}`"
          :placeholder-style="placeholderStyle"
          confirm-type="search"
          v-model="inputValue"
          :class="['wd-search__input', customInputClass]"
          @focus="handleFocus"
          @input="handleInput"
          @blur="handleBlur"
          @confirm="handleConfirm"
          :disabled="disabled"
          :maxlength="maxlength"
          :focus="isFocused"
        />
        <wd-icon v-if="inputValue" custom-class="wd-search__clear wd-search__clear-icon" name="error-fill" @click="handleClear" />
      </view>
    </view>

    <slot v-if="!hideCancel" name="suffix">
      <view class="wd-search__cancel" @click="handleCancel">
        {{ cancelTxt || translate('cancel') }}
      </view>
    </slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-search',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import { type CSSProperties, computed, onMounted, ref, watch } from 'vue'
import { objToStyle, pause } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import { searchProps } from './types'

const props = defineProps(searchProps)
const emit = defineEmits(['update:modelValue', 'change', 'clear', 'search', 'focus', 'blur', 'cancel'])

const { translate } = useTranslate('search')

const isFocused = ref<boolean>(false) // 是否聚焦中
const showInput = ref<boolean>(false) // 是否显示输入框 用于实现聚焦的hack
const inputValue = ref<string>('') // 输入框的值
const showPlaceHolder = ref<boolean>(true)
const clearing = ref<boolean>(false)

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue
    if (newValue) {
      showInput.value = true
    }
  },
  { immediate: true }
)

watch(
  () => props.focus,
  (newValue) => {
    if (newValue) {
      if (props.disabled) return
      closeCover()
    }
  }
)

onMounted(() => {
  if (props.focus) {
    closeCover()
  }
})

const rootClass = computed(() => {
  return `wd-search  ${props.light ? 'is-light' : ''}  ${props.hideCancel ? 'is-without-cancel' : ''} ${props.customClass}`
})

const coverStyle = computed(() => {
  const coverStyle: CSSProperties = {
    display: inputValue.value === '' && showPlaceHolder.value ? 'flex' : 'none'
  }

  return objToStyle(coverStyle)
})

async function hackFocus(focus: boolean) {
  showInput.value = focus
  await pause()
  isFocused.value = focus
}

async function closeCover() {
  if (props.disabled) return
  await pause(100)
  showPlaceHolder.value = false
  hackFocus(true)
}

function handleInput(event: any) {
  inputValue.value = event.detail.value
  emit('update:modelValue', event.detail.value)
  emit('change', {
    value: event.detail.value
  })
}

async function handleClear() {
  inputValue.value = ''
  if (props.focusWhenClear) {
    clearing.value = true
    isFocused.value = false
  }
  await pause()
  if (props.focusWhenClear) {
    showPlaceHolder.value = false
    hackFocus(true)
  } else {
    showPlaceHolder.value = true
    hackFocus(false)
  }
  emit('change', {
    value: ''
  })
  emit('update:modelValue', '')
  emit('clear')
}

function handleConfirm({ detail: { value } }: any) {
  // 组件触发search事件
  emit('search', {
    value
  })
}

function handleFocus() {
  showPlaceHolder.value = false
  emit('focus', {
    value: inputValue.value
  })
}

async function handleBlur() {
  // 等待150毫秒，clear执行完毕
  await pause(150)
  if (clearing.value) {
    clearing.value = false
    return
  }
  // 组件触发blur事件
  showPlaceHolder.value = !inputValue.value
  showInput.value = !showPlaceHolder.value
  isFocused.value = false
  emit('blur', {
    value: inputValue.value
  })
}

function handleCancel() {
  emit('cancel', {
    value: inputValue.value
  })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
