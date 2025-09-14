<template>
  <wd-popup
    v-model="show"
    position="bottom"
    :z-index="zIndex"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    :modal-style="modal ? '' : 'opacity: 0;'"
    :modal="hideOnClickOutside"
    :lockScroll="lockScroll"
    :root-portal="rootPortal"
    @click-modal="handleClose"
  >
    <view :class="`wd-number-keyboard ${customClass}`" :style="customStyle">
      <view class="wd-number-keyboard__header" v-if="showHeader">
        <slot name="title" v-if="showTitle">
          <text class="wd-number-keyboard__title">{{ title }}</text>
        </slot>
        <view class="wd-number-keyboard__close" hover-class="wd-number-keyboard__close--hover" v-if="showClose" @click="handleClose">
          <text>{{ closeText }}</text>
        </view>
      </view>
      <view class="wd-number-keyboard__body">
        <view class="wd-number-keyboard__keys">
          <wd-key v-for="key in keys" :key="key.text" :text="key.text" :type="key.type" :wider="key.wider" @press="handlePress"></wd-key>
        </view>
        <view class="wd-number-keyboard__sidebar" v-if="mode === 'custom'">
          <wd-key v-if="showDeleteKey" large :text="deleteText" type="delete" @press="handlePress"></wd-key>
          <wd-key large :text="closeText" type="close" :loading="closeButtonLoading" @press="handlePress"></wd-key>
        </view>
      </view>
    </view>
  </wd-popup>
</template>
<script lang="ts">
export default {
  name: 'wd-number-keyboard',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdPopup from '../wd-popup/wd-popup.vue'
import { computed, ref, useSlots, watch } from 'vue'
import WdKey from './key/index.vue'
import { numberKeyboardProps, type Key } from './types'
import type { NumberKeyType } from './key/types'

const props = defineProps(numberKeyboardProps)
const emit = defineEmits(['update:visible', 'input', 'close', 'delete', 'update:modelValue'])
const slots = useSlots()
const show = ref(props.visible)
watch(
  () => props.visible,
  (newValue) => {
    show.value = newValue
  }
)

const keys = computed(() => (props.mode === 'custom' ? genCustomKeys() : genDefaultKeys()))

const showClose = computed(() => {
  return props.closeText && props.mode === 'default'
})

const showTitle = computed(() => {
  return !!props.title || !!slots.title
})

const showHeader = computed(() => {
  return showTitle.value || showClose.value
})

/**
 * 随机打乱数组的顺序
 * @param arr 要打乱顺序的数组
 * @returns 打乱顺序后的数组
 */
function shuffleArray<T>(arr: T[]): T[] {
  const newArr = [...arr]
  for (let i = newArr.length - 1; i > 0; i--) {
    // 生成一个随机索引 j，范围是 [0, i]
    const j = Math.floor(Math.random() * (i + 1))

    // 交换索引 i 和 j 处的元素
    ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}
function genBasicKeys(): Key[] {
  const keys = Array.from({ length: 9 }, (_, i) => ({ text: i + 1 }))

  // 如果需要随机顺序，则调用 shuffleArray 方法打乱数组顺序
  return props.randomKeyOrder ? shuffleArray(keys) : keys
}

function genDefaultKeys(): Key[] {
  return [
    ...genBasicKeys(),
    { text: props.extraKey as string, type: 'extra' },
    { text: 0 },
    {
      // 根据条件是否显示删除键的文本和类型
      text: props.showDeleteKey ? props.deleteText : '',
      type: props.showDeleteKey ? 'delete' : ''
    }
  ]
}

function genCustomKeys(): Key[] {
  const keys = genBasicKeys()
  const extraKeys = Array.isArray(props.extraKey) ? props.extraKey : [props.extraKey]
  if (extraKeys.length === 1) {
    // 如果只有一个额外按键，则添加一个宽度较大的数字0和一个额外按键
    keys.push({ text: 0, wider: true }, { text: extraKeys[0], type: 'extra' })
  } else if (extraKeys.length === 2) {
    // 如果有两个额外按键，则添加两个额外按键和一个数字0
    keys.push({ text: extraKeys[0], type: 'extra' }, { text: 0 }, { text: extraKeys[1], type: 'extra' })
  }

  return keys
}

const handleClose = () => {
  emit('close')
  emit('update:visible', false)
}

const handlePress = (text: string, type: NumberKeyType) => {
  if (text === '' && type === 'extra') {
    return handleClose()
  }
  const value = props.modelValue
  if (type === 'delete') {
    emit('delete')
    emit('update:modelValue', value.slice(0, value.length - 1))
  } else if (type === 'close') {
    handleClose()
  } else if (value.length < +props.maxlength) {
    emit('input', text)
    emit('update:modelValue', value + text)
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
