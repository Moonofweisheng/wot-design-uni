<template>
  <view :class="rootClass" :style="rootStyle" @click="handleClick">
    <view v-if="useIconSlot" class="wd-tag__icon">
      <slot name="icon" />
    </view>
    <wd-icon v-else-if="icon" :name="icon" custom-class="wd-tag__icon" />
    <view class="wd-tag__text" :style="textStyle">
      <slot />
    </view>
    <wd-icon v-if="closable && round" class="wd-tag__close" name="error-fill" @click="handleClose" />
    <input
      v-if="dynamicInput && dynamic"
      class="wd-tag__add-text"
      placeholder="请输入"
      type="text"
      focus="true"
      v-model="dynamicValue"
      @blur="handleBlur"
      @confirm="handleConfirm"
    />
    <view v-else-if="dynamic" class="wd-tag__text" :style="textStyle" @click="handleAdd">
      <wd-icon class="wd-tag__add" size="12px" name="add" custom-class="wd-tag__icon" />
      新增标签
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
import { objToStyle } from '../common/util'
import { computed, ref, watch } from 'vue'

interface Props {
  useIconSlot: boolean
  type?: string
  icon?: string
  closable: boolean
  plain: boolean
  dynamic: boolean
  color?: string
  bgColor?: string
  round: boolean
  mark: boolean
  customClass: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  useIconSlot: false,
  closable: false,
  plain: false,
  dynamic: false,
  round: false,
  mark: false
})

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
    const type = ['primary', 'danger', 'warning', 'success']
    if (type.indexOf(newValue) === -1) throw Error(`type must be one of ${type.toString()}`)
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
  return objToStyle(rootStyle)
})

const textStyle = computed(() => {
  const textStyle: Record<string, any> = {}
  if (props.color) {
    textStyle['color'] = props.color
  }
  return objToStyle(textStyle)
})

const emit = defineEmits(['click', 'close', 'confirm'])

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

function handleClick() {
  emit('click')
}
function handleClose() {
  emit('close')
}
function handleAdd() {
  dynamicInput.value = true
  dynamicValue.value = ''
}
function handleBlur() {
  setDynamicInput()
}
function handleConfirm(event) {
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
@import '../common/abstracts/variable';
@import '../common/abstracts/mixin';

@mixin tag-type-style($normalColor, $normalBg) {
  background: $normalBg;

  @include when(plain) {
    background: transparent;
    color: $normalColor;
    border: 1px solid $normalColor;
    padding: 0 4px;
  }
  @include when(round) {
    line-height: 1.2;
    font-size: $-tag-fs;
    padding: 4px 11px;
    background: transparent;
    color: if($normalColor != $-tag-info-color, $normalColor, $-tag-round-color);
    border: 1px solid if($normalColor != $-tag-info-color, $normalColor, $-tag-round-border-color);
    border-radius: $-tag-round-radius;
  }
  @include when(mark) {
    padding: 1px 6px;
    border-radius: $-tag-mark-radius;

    @include when(plain) {
      padding: 0 6px;
    }
  }
  @include when(active) {
    color: $-tag-primary-color;
    border-color: $-tag-primary-color;
  }
}
@include b(tag) {
  font-size: $-tag-small-fs;
  display: inline-block;
  color: $-tag-color;
  padding: 0 3px;
  border-radius: 2px;
  transition: opacity 0.3s;
  vertical-align: middle;
  @include tag-type-style($-tag-info-color, $-tag-info-bg);

  @include when(primary) {
    @include tag-type-style($-tag-primary-color, $-tag-primary-bg);
  }
  @include when(danger) {
    @include tag-type-style($-tag-danger-color, $-tag-danger-bg);
  }
  @include when(warning) {
    @include tag-type-style($-tag-warning-color, $-tag-warning-bg);
  }
  @include when(success) {
    @include tag-type-style($-tag-success-color, $-tag-success-bg);
  }
  @include when(icon) {
    font-size: $-tag-fs;
    line-height: 1.2;
    padding: 2px 5px;
  }
  @include when(dynamic) {
    box-sizing: border-box;
    width: 88px;
    transition: 0.3s;

    &:active {
      color: $-tag-primary-color;
      border-color: $-tag-primary-color;
    }
  }
  @include when(dynamic-input) {
    border-color: $-tag-primary-color;
  }
  @include e(icon) {
    display: inline-block;
    margin-right: 4px;
    font-size: $-tag-small-fs;
    line-height: $-tag-small-fs;
    vertical-align: baseline;
  }
  @include e(text) {
    display: inline-block;
    vertical-align: text-top;
  }
  @include e(add-text) {
    width: 60px;
    height: 14px;
    min-height: 14px;
    display: inline-block;
    font-size: $-tag-fs;
    vertical-align: middle;
    padding: 0;
  }
  @include e(close) {
    display: inline-block;
    margin-left: 24px;
    margin-right: -4px;
    font-size: $-tag-close-size;
    height: 14px;
    line-height: 1.1;
    vertical-align: text-bottom;
    color: $-tag-close-color;

    &:active {
      color: $-tag-close-active-color;
    }
  }
  @include e(add) {
    vertical-align: bottom;
  }
}
</style>
