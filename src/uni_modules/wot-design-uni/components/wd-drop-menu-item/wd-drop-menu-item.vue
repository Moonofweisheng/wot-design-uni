<template>
  <view v-if="showWrapper" :class="`wd-drop-item  ${customClass}`" :style="`z-index: ${zIndex}; ${positionStyle}`">
    <wd-popup
      v-model="showPop"
      :z-index="zIndex"
      :duration="duration"
      :position="position"
      custom-style="position: absolute; max-height: 80%;"
      modal-style="position: absolute;"
      :modal="modal"
      :close-on-click-modal="closeOnClickModal"
      @clickmodal="close"
      @beforeenter="handleOpen"
      @afterenter="handleOpened"
      @beforeleave="handleClose"
      @afterleave="onPopupClose"
    >
      <view v-if="options.length">
        <view
          v-for="(item, index) in options"
          :key="index"
          @click="choose(index)"
          :class="`wd-drop-item__option ${(item[valueKey] !== '' ? item[valueKey] : item) === modelValue ? 'is-active' : ''}`"
        >
          <view :class="`wd-drop-item__title ${customTitle}`">
            <text>{{ item[labelKey] ? item[labelKey] : item }}</text>
            <text v-if="item[tipKey]" class="wd-drop-item__tip">{{ item[tipKey] }}</text>
          </view>
          <wd-icon
            v-if="(item[valueKey] !== '' ? item[valueKey] : item) === modelValue"
            :name="iconName"
            size="20px"
            :class="`wd-drop-item__icon ${customIcon}`"
          />
        </view>
      </view>
      <slot v-else />
    </wd-popup>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-drop-menu-item',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { pushToQueue, removeFromQueue } from '../common/clickoutside'
import { debounce } from '../common/util'

interface Props {
  customClass?: string
  customTitle?: string
  customIcon?: string
  // 当前选中的value
  modelValue?: string | number
  // 可能是 array || String
  options: Array<Record<string, any>>
  useDropItemSlot: boolean
  disabled: boolean
  iconName: string
  title?: string
  valueKey: string
  labelKey: string
  tipKey: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customTitle: '',
  customIcon: '',
  options: () => [],
  useDropItemSlot: false,
  disabled: false,
  iconName: 'check',
  valueKey: 'value',
  labelKey: 'label',
  tipKey: 'tip'
})

const showWrapper = ref<boolean>(false)
const showPop = ref<boolean>(false)
const position = ref<string>('')
const transName = ref<string>('')
const zIndex = ref<number>(12)
const displayTitle = ref<string>('')
const modal = ref<boolean>(true)
const closeOnClickModal = ref<boolean>(true)
const duration = ref<number>(0)

const parent = inject<any>('dropMenu')
const { proxy } = getCurrentInstance() as any

const updateTitle = debounce(function () {
  setDisplayTitle()
  parent && parent.$.exposed.updateTitle && parent.$.exposed.updateTitle()
}, 50)

watch(
  () => props.modelValue,
  (newValue) => {
    if (typeof newValue !== 'number' && typeof newValue !== 'string') {
      console.warn('[wot-design] warning(wd-drop-menu-item): the type of value should be a number or a string.')
      return
    }
    updateTitle()
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  [() => props.options, () => props.title],
  () => {
    updateTitle()
  },
  {
    deep: true,
    immediate: true
  }
)

onBeforeMount(() => {
  pushToQueue(proxy)
  if (parent) {
    parent.$.exposed.setChild && parent.$.exposed.setChild(proxy)
    updateTitle()
  }
})

onBeforeUnmount(() => {
  removeFromQueue(proxy)
})

onMounted(() => {
  setDisplayTitle()
})

const emit = defineEmits(['change', 'update:modelValue', 'open', 'opened', 'closed', 'close'])

function setDisplayTitle() {
  const { title, modelValue, options, valueKey, labelKey } = props

  if (title) {
    displayTitle.value = title
    return
  }
  for (let i = 0, len = options.length; i < len; i++) {
    if (modelValue === options[i][valueKey]) {
      displayTitle.value = options[i][labelKey]
      return
    }
  }
  console.warn('[wot-design] warning(wd-drop-menu-item): no value is matched in the options option.')
}

/**
 * 父组件更改子组件内部
 * @param show
 */
function setShowPop(show: boolean) {
  showPop.value = show
}

// 模拟单选操作 默认根据 value 选中操作
function choose(index: number) {
  if (props.disabled) return
  const { valueKey } = props
  const item = props.options[index]
  emit('update:modelValue', item[valueKey] !== '' && item[valueKey] !== undefined ? item[valueKey] : item)
  close()
  emit('change', {
    value: item[valueKey] !== '' && item[valueKey] !== undefined ? item[valueKey] : item,
    selectedItem: item
  })
  parent.$.exposed.updateTitle()
}
// 外部关闭弹出框
function close() {
  showPop.value = false
  parent.$.exposed.fold()
}

const positionStyle = computed(() => {
  let style: string = ''
  if (showPop.value) {
    style = parent.direction === 'down' ? `top: ${parent.$.exposed.offset.value}px; bottom: 0;` : `top: 0; bottom: ${parent.$.exposed.offset.value}px`
  } else {
    style = ''
  }
  return style
})

function open() {
  showWrapper.value = true
  showPop.value = true
  modal.value = parent.modal
  duration.value = parent.duration
  closeOnClickModal.value = parent.closeOnClickModal
  position.value = parent.direction === 'down' ? 'top' : 'bottom'
  emit('open')
}
function onPopupClose() {
  showWrapper.value = false
  emit('closed')
}
function handleOpen() {
  emit('open')
}
function handleOpened() {
  emit('opened')
}
function handleClose() {
  emit('close')
}

defineExpose({ setShowPop, open, close, displayTitle })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
