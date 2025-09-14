<template>
  <view
    v-if="showWrapper"
    :class="`wd-drop-item  ${customClass}`"
    :style="`pointer-events: none; z-index: ${zIndex}; ${positionStyle};${customStyle}`"
  >
    <wd-popup
      v-model="showPop"
      :z-index="zIndex"
      :duration="duration"
      :position="position"
      :custom-style="`position: absolute; pointer-events: auto; max-height: 80%;${customPopupStyle}`"
      :custom-class="customPopupClass"
      :modal="false"
      :close-on-click-modal="false"
      :root-portal="rootPortal"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @after-leave="afterLeave"
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
            :custom-class="`wd-drop-item__icon ${customIcon}`"
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
import wdPopup from '../wd-popup/wd-popup.vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed, getCurrentInstance, inject, onBeforeMount, onBeforeUnmount, ref, watch } from 'vue'
import { pushToQueue, removeFromQueue } from '../common/clickoutside'
import { type Queue, queueKey } from '../composables/useQueue'
import type { PopupType } from '../wd-popup/types'
import { useParent } from '../composables/useParent'
import { DROP_MENU_KEY } from '../wd-drop-menu/types'
import { isDef, isFunction } from '../common/util'
import { dorpMenuItemProps, type DropMenuItemExpose } from './types'

const props = defineProps(dorpMenuItemProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', event: { value: string | number; selectedItem: Record<string, any> }): void
  (e: 'open'): void
  (e: 'opened'): void
  (e: 'close'): void
  (e: 'closed'): void
}>()

const queue = inject<Queue | null>(queueKey, null)
const showWrapper = ref<boolean>(false)
const showPop = ref<boolean>(false)
const position = ref<PopupType>()
const zIndex = ref<number>(12)
const duration = ref<number>(0)

const { parent: dropMenu } = useParent(DROP_MENU_KEY)

const { proxy } = getCurrentInstance() as any

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

function getShowPop() {
  return showPop.value
}
// 模拟单选操作 默认根据 value 选中操作
function choose(index: number) {
  if (props.disabled) return
  const { valueKey } = props
  const item = props.options[index]
  const newValue = item[valueKey] !== undefined ? item[valueKey] : item
  emit('update:modelValue', newValue)
  emit('change', {
    value: newValue,
    selectedItem: item
  })
  close()
}
// 外部关闭弹出框
function close() {
  if (!showPop.value) {
    return
  }
  if (isFunction(props.beforeToggle)) {
    props.beforeToggle({
      status: false,
      resolve: (isPass: boolean) => {
        isPass && handleClose()
      }
    })
  } else {
    handleClose()
  }
}

function handleClose() {
  if (showPop.value) {
    showPop.value = false
  }
}

function open() {
  if (showPop.value) {
    return
  }
  if (isFunction(props.beforeToggle)) {
    props.beforeToggle({
      status: true,
      resolve: (isPass) => {
        isPass && handleOpen()
      }
    })
  } else {
    handleOpen()
  }
}

function handleOpen() {
  showWrapper.value = true
  showPop.value = true
  if (dropMenu) {
    duration.value = Number(dropMenu.props.duration)
    position.value = dropMenu.props.direction === 'down' ? 'top' : 'bottom'
  }
}

function toggle() {
  if (showPop.value) {
    close()
  } else {
    open()
  }
}

function afterLeave() {
  showWrapper.value = false
  emit('closed')
}
function beforeEnter() {
  emit('open')
}
function afterEnter() {
  emit('opened')
}
function beforeLeave() {
  emit('close')
}

defineExpose<DropMenuItemExpose>({ getShowPop, open, close, toggle })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
