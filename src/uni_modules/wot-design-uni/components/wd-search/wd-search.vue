<template>
  <view :class="rootClass">
    <!--自定义label插槽-->
    <!--搜索框主体-->
    <view class="wd-search__block">
      <slot name="prefix"></slot>
      <view class="wd-search__field">
        <view
          v-if="!placeholderLeft"
          :style="{ display: str === '' && showPlaceHolder ? 'flex' : 'none' }"
          class="wd-search__cover"
          @click="closeCover"
        >
          <wd-icon name="search" size="18px" custom-class="wd-search__search-icon"></wd-icon>
          <text class="wd-search__placeholder-txt">{{ placeholder || '搜索' }}</text>
        </view>
        <!--icon:search-->
        <wd-icon name="search" size="18px" custom-class="wd-search__search-left-icon"></wd-icon>
        <!--搜索框-->
        <input
          :placeholder="placeholder || '搜索'"
          placeholder-class="wd-search__placeholder-txt"
          confirm-type="search"
          v-model="str"
          class="wd-search__input"
          @focus="searchFocus"
          @input="inputValue"
          @blur="searchBlur"
          @confirm="search"
          :disabled="disabled"
          :maxlength="maxlength"
          :focus="focus"
        />
        <!--icon:clear-->
        <wd-icon v-if="str" custom-class="wd-search__clear wd-search__clear-icon" name="error-fill" size="16px" @click="clearSearch" />
      </view>
    </view>
    <!--the button behind input,care for hideCancel without displaying-->
    <block v-if="!hideCancel">
      <!--有插槽就不用默认的按钮了-->
      <slot v-if="userSuffixSlot" name="suffix"></slot>
      <!--默认button-->
      <view v-else class="wd-search__cancel" @click="handleCancel">
        {{ cancelTxt || '取消' }}
      </view>
    </block>
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
import { computed, ref, watch } from 'vue'
import { requestAnimationFrame } from '../common/util'

interface Props {
  useActionSlot: boolean
  useLabelSlot: boolean
  userSuffixSlot: boolean
  placeholder: string
  cancelTxt: string
  light: boolean
  hideCancel: boolean
  disabled: boolean
  maxlength: number | string
  modelValue: string
  placeholderLeft: boolean
  customClass: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  customClass: '',
  useActionSlot: false,
  useLabelSlot: false,
  userSuffixSlot: false,
  placeholder: '搜索',
  cancelTxt: '取消',
  light: false,
  hideCancel: false,
  disabled: false,
  maxlength: -1,
  placeholderLeft: false
})

const focus = ref<boolean>(false)
const str = ref('')
const showPlaceHolder = ref<boolean>(true)
const clearing = ref<boolean>(false)

watch(
  () => props.modelValue,
  (newValue) => {
    str.value = newValue
  }
)

const rootClass = computed(() => {
  return `wd-search  ${props.light ? 'is-light' : ''}  ${props.hideCancel ? 'is-without-cancel' : ''} ${props.customClass}`
})

const emit = defineEmits(['update:modelValue', 'change', 'clear', 'search', 'focus', 'blur', 'cancel'])

function closeCover() {
  if (props.disabled) return
  requestAnimationFrame()
    .then(() => requestAnimationFrame())
    .then(() => requestAnimationFrame())
    .then(() => {
      showPlaceHolder.value = false
      focus.value = true
    })
}
/**
 * @description input的input事件handle
 * @param value
 */
function inputValue(event: any) {
  str.value = event.detail.value
  emit('update:modelValue', event.detail.value)
  emit('change', {
    value: event.detail.value
  })
}
/**
 * @description 点击清空icon的handle
 */
function clearSearch() {
  clearing.value = true
  str.value = ''
  requestAnimationFrame()
    .then(() => requestAnimationFrame())
    .then(() => {
      showPlaceHolder.value = false
      return requestAnimationFrame()
    })
    .then(() => {
      focus.value = true
      emit('clear')
      emit('change', {
        value: ''
      })
      emit('update:modelValue', '')
    })
}
/**
 * @description 点击搜索按钮时的handle
 * @param value
 */
function search({ detail: { value } }) {
  // 组件触发search事件
  emit('search', {
    value
  })
}
/**
 * @description 输入框聚焦时的handle
 */
function searchFocus() {
  if (clearing.value) {
    clearing.value = false
    return
  }
  showPlaceHolder.value = false
  focus.value = true
  emit('focus', {
    value: str.value
  })
}
/**
 * @description 输入框失焦的handle
 */
function searchBlur() {
  if (clearing.value) return
  // 组件触发blur事件
  showPlaceHolder.value = !str.value
  emit('blur', {
    value: str.value
  })
}
/**
 * @description 点击取消搜索按钮的handle
 */
function handleCancel() {
  // 组件触发cancel事件
  emit('cancel', {
    value: str.value
  })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
