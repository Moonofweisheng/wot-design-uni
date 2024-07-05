<template>
  <view v-if="showWrapper" :class="`wd-drop-item  ${customClass}`" :style="`z-index: ${zIndex}; ${positionStyle};${customStyle}`">
    <wd-popup
      v-model="showPop"
      :z-index="zIndex"
      :duration="duration"
      :position="position"
      custom-style="position: absolute; max-height: 80%;"
      modal-style="position: absolute;"
      :modal="modal"
      :close-on-click-modal="closeOnClickModal"
      @click-modal="close"
      @before-enter="handleOpen"
      @after-enter="handleOpened"
      @before-leave="handleClose"
      @after-leave="onPopupClose"
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
import { computed, getCurrentInstance, inject, onBeforeMount, onBeforeUnmount, ref, watch } from 'vue'
import { pushToQueue, removeFromQueue } from '../common/clickoutside'
import { type Queue, queueKey } from '../composables/useQueue'
import type { PopupType } from '../wd-popup/types'
import { useParent } from '../composables/useParent'
import { DROP_MENU_KEY } from '../wd-drop-menu/types'
import { isDef } from '../common/util'
import { dorpMenuItemProps, type DropMenuItemExpose } from './types'

const props = defineProps(dorpMenuItemProps)
const emit = defineEmits(['change', 'update:modelValue', 'open', 'opened', 'closed', 'close'])

const queue = inject<Queue | null>(queueKey, null)
const showWrapper = ref<boolean>(false)
const showPop = ref<boolean>(false)
const position = ref<PopupType>()
const zIndex = ref<number>(12)
const modal = ref<boolean>(true)
const closeOnClickModal = ref<boolean>(true)
const duration = ref<number>(0)

const { parent: dropMenu } = useParent(DROP_MENU_KEY)

const { proxy } = getCurrentInstance() as any

watch(
  () => props.modelValue,
  (newValue) => {
    if (isDef(newValue) && typeof newValue !== 'number' && typeof newValue !== 'string') {
      console.error('[wot-design] warning(wd-drop-menu-item): the type of value should be a number or a string.')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

onBeforeMount(() => {
  if (queue && queue.pushToQueue) {
    queue.pushToQueue(proxy)
  } else {
    pushToQueue(proxy)
  }
})

onBeforeUnmount(() => {
  if (queue && queue.removeFromQueue) {
    queue.removeFromQueue(proxy)
  } else {
    removeFromQueue(proxy)
  }
})

/**
 * 父组件更改子组件内部
 * @param show
 */
function setShowPop(show: boolean) {
  showPop.value = show
}

function getShowPop() {
  return showPop.value
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
}
// 外部关闭弹出框
function close() {
  if (showPop.value) {
    showPop.value = false
    dropMenu && dropMenu.fold()
  }
}

const positionStyle = computed(() => {
  let style: string = ''
  if (showWrapper.value && dropMenu) {
    style =
      dropMenu.props.direction === 'down'
        ? `top: calc(var(--window-top) + ${dropMenu.offset.value}px); bottom: 0;`
        : `top: 0; bottom: calc(var(--window-bottom) + ${dropMenu.offset.value}px)`
  } else {
    style = ''
  }
  return style
})

function open() {
  showWrapper.value = true
  showPop.value = true
  if (dropMenu) {
    modal.value = Boolean(dropMenu.props.modal)
    duration.value = Number(dropMenu.props.duration)
    closeOnClickModal.value = Boolean(dropMenu.props.closeOnClickModal)
    position.value = dropMenu.props.direction === 'down' ? 'top' : 'bottom'
  }

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

defineExpose<DropMenuItemExpose>({ setShowPop, getShowPop, open, close })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
