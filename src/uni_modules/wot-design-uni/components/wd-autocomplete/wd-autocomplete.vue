<template>
  <view class="wd-autocomplete custom-class" :style="WdAutocompleteStyle">
    <view class="input-box">
      <wd-input
        v-model="keyword"
        type="text"
        :clearable="clearable"
        :placeholder="placeholder"
        :no-border="noBorder"
        :disabled="disabled"
        @input="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @clear="handleClear"
      ></wd-input>
    </view>
    <view
      class="wd-autocomplete__menu"
      :style="{
        top: dropMenuTop,
        height: dropMenuShow ? `${suggestionsHeight}px` : '0px',
        zIndex: dropMenuShow ? props.menuZIndex : 'inherit'
      }"
      :class="[dropMenuShow && 'is-active']"
    >
      <view class="wd-autocomplete__container">
        <view
          v-show="visibleArrow"
          class="wd-autocomplete__arrow custom-arrow-class"
          :style="{
            top: dropMenuArrowTop,
            transform: `rotate(${position === 'top' ? '225' : '45'}deg)`
          }"
        ></view>
        <scroll-view scroll-y class="wd-autocomplete__scroll" :style="scrollListStyle" @tap.stop>
          <slot v-if="$slots?.menuTop" name="menuTop"></slot>
          <view v-show="displaySuggestions.length" class="wd-autocomplete__suggestions custom-suggestions-class" @tap.stop>
            <view v-for="(item, index) in displaySuggestions" :key="index" @tap.stop="handleClickItem(item)">
              <slot name="menuItem" :item="item">
                <view class="wd-autocomplete__item" :class="[item.disabled && 'is-disabled']">
                  {{ item[valueKey] }}
                </view>
              </slot>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, nextTick, ref, watch, onMounted, getCurrentInstance } from 'vue'
import { addUnit, debounce, isArray, isFunction, objToStyle, getRect as queryRect } from '../common/util'

import type { AutocompleteData, InputType } from './types'
import { wdAutocompleteEmit, wdAutocompleteProps } from './types'

import wdInput from '../wd-input/wd-input.vue'

onMounted(() => {
  handleInit()
})

const props = defineProps(wdAutocompleteProps)
const emit = defineEmits(wdAutocompleteEmit)

const keyword = ref('')
const inputIsFocus = ref(false)
function handleFocus() {
  inputIsFocus.value = true
  nextTick(() => {
    queryDropMenuHeight()
  })
}
function handleBlur() {
  inputIsFocus.value = false
}

/** 输入框内容的高度，列表的顶部由此判断 */
const inputBoxHeight = ref(0)

const suggestions = ref<AutocompleteData>([])
const displaySuggestions = ref<AutocompleteData>([])
/** 计算箭头应该在的位置 */
const suggestionsHeight = ref(0)
const scrollListStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.suggestionMaxHeight) {
    style.maxHeight = addUnit(props.suggestionMaxHeight)
  }
  if (!dropMenuShow.value) {
    style.maxHeight = 0
  }
  return style
})
async function queryDropMenuHeight() {
  await nextTick()
  await queryRect('.wd-autocomplete__container', false, instance!).then((res) => {
    suggestionsHeight.value = res?.height || 0
  })
}
const searchWhenInput = computed(() => isFunction(props.fetchSuggestions))
/** 匹配文字 */
const handleMatchValue = debounce((value?: string) => {
  // 没有值或远程搜索时，直接显示全部
  if (!value || searchWhenInput.value) {
    displaySuggestions.value = [...suggestions.value]
  } else {
    displaySuggestions.value = suggestions.value.filter((item) => {
      if (props.isExactMatch) {
        return item[props.valueKey] === value
      } else {
        return item[props.valueKey].includes(value)
      }
    })
  }
  queryDropMenuHeight()
}, 200)
const dropMenuTop = computed(() => {
  const offset = Number(props.offset)
  if (props.position === 'bottom') {
    return inputBoxHeight.value + 6 + offset + 'px'
  } else {
    return 0 - suggestionsHeight.value - 10 + offset + 'px'
  }
})
const dropMenuArrowTop = computed(() => {
  if (props.position === 'bottom') {
    return 0 - 5 + 'px'
  } else {
    return suggestionsHeight.value - 5 + 'px'
  }
})
const dropMenuShow = computed(() => (inputIsFocus.value && displaySuggestions.value.length !== 0) || props.alwaysVisible)
function handleClickItem(item: AutocompleteData[number]) {
  if (item.disabled) {
    return
  }
  if (!dropMenuShow.value) return
  if (props.isAutocomplete) {
    keyword.value = item[props.valueKey]
  }
  emit('select', item)
}

const handleChange = (inputValue: InputType) => {
  const { value } = inputValue
  if (props.modelValue !== value) {
    emit('update:modelValue', value)
  }
  handleMatchValue(value)
  emit('input', inputValue)
}

function handleClear() {
  keyword.value = ''
  handleMatchValue(keyword.value)
  emit('clear')
}

watch(
  () => props.fetchSuggestions,
  () => {
    handleGetData()
  },
  {
    deep: true,
    immediate: true
  }
)
async function handleGetData() {
  if (isArray(props.fetchSuggestions)) {
    suggestions.value = props.fetchSuggestions
  }
  if (searchWhenInput.value) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    suggestions.value = await (props.fetchSuggestions as Function)()
  }
}

const WdAutocompleteStyle = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = props.zIndex || 'inherit'
  return objToStyle(style) + props.customStyle
})
async function handleFetch() {
  /** 如果需要远程搜索，则在每次输入内容时执行一次搜索再匹配 */
  if (searchWhenInput.value) {
    await handleGetData()
    await nextTick()
  }
  handleMatchValue(keyword.value)
}
watch(
  () => props.modelValue,
  debounce((val: string) => {
    keyword.value = val
    handleFetch()
  }, Number(props.fetchDebounce)),
  {
    immediate: true
  }
)
/** 默认若是空值，上面的将不会执行，需要另外写一个一次性监听 */
watch(
  () => props.modelValue,
  (val) => {
    if (!val) {
      handleMatchValue('')
    }
  },
  {
    immediate: true,
    once: true
  }
)
const instance = getCurrentInstance()
async function handleInit() {
  await nextTick()
  queryRect('.input-box', false, instance!).then((res) => {
    inputBoxHeight.value = res?.height || 34
  })
}
defineExpose({
  handleInit,
  handleFetch
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
