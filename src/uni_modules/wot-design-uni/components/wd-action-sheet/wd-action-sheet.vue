<template>
  <view>
    <wd-popup
      custom-class="wd-action-sheet__popup"
      :custom-style="`${(actions && actions.length) || (panels && panels.length) ? 'background: transparent;' : ''}`"
      v-model="showPopup"
      :duration="duration"
      position="bottom"
      :close-on-click-modal="closeOnClickModal"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :lazy-render="lazyRender"
      :root-portal="rootPortal"
      @enter="handleOpen"
      @close="close"
      @after-enter="handleOpened"
      @after-leave="handleClosed"
      @click-modal="handleClickModal"
      :z-index="zIndex"
    >
      <view
        :class="`wd-action-sheet ${customClass}`"
        :style="`${
          (actions && actions.length) || (panels && panels.length)
            ? 'margin: 0 10px calc(var(--window-bottom) + 10px) 10px; border-radius: 16px;'
            : 'margin-bottom: var(--window-bottom);'
        } ${customStyle}`"
      >
        <view v-if="title" :class="`wd-action-sheet__header ${customHeaderClass}`">
          {{ title }}
          <wd-icon custom-class="wd-action-sheet__close" name="add" @click="close" />
        </view>
        <view class="wd-action-sheet__actions" v-if="actions && actions.length">
          <button
            v-for="(action, rowIndex) in actions"
            :key="rowIndex"
            :class="`wd-action-sheet__action ${action.disabled ? 'wd-action-sheet__action--disabled' : ''}  ${
              action.loading ? 'wd-action-sheet__action--loading' : ''
            }`"
            :style="`color: ${action.color}`"
            @click="select(rowIndex, 'action')"
          >
            <wd-loading custom-class="`wd-action-sheet__action-loading" v-if="action.loading" />
            <view v-else class="wd-action-sheet__name">{{ action.name }}</view>
            <view v-if="!action.loading && action.subname" class="wd-action-sheet__subname">{{ action.subname }}</view>
          </button>
        </view>
        <view v-if="formatPanels && formatPanels.length">
          <view v-for="(panel, rowIndex) in formatPanels" :key="rowIndex" class="wd-action-sheet__panels">
            <view class="wd-action-sheet__panels-content">
              <view v-for="(col, colIndex) in panel" :key="colIndex" class="wd-action-sheet__panel" @click="select(rowIndex, 'panels', colIndex)">
                <image class="wd-action-sheet__panel-img" :src="(col as any).iconUrl" />
                <view class="wd-action-sheet__panel-title">{{ (col as any).title }}</view>
              </view>
            </view>
          </view>
        </view>
        <slot />
        <button v-if="cancelText" class="wd-action-sheet__cancel" @click="handleCancel">{{ cancelText }}</button>
      </view>
    </wd-popup>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-action-sheet',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdPopup from '../wd-popup/wd-popup.vue'
import wdIcon from '../wd-icon/wd-icon.vue'
import wdLoading from '../wd-loading/wd-loading.vue'
import { watch, ref } from 'vue'
import { actionSheetProps, type Panel } from './types'
import { isArray } from '../common/util'

const props = defineProps(actionSheetProps)
const emit = defineEmits(['select', 'click-modal', 'cancel', 'closed', 'close', 'open', 'opened', 'update:modelValue'])

const formatPanels = ref<Array<Panel> | Array<Panel[]>>([])

const showPopup = ref<boolean>(false)

watch(() => props.panels, computedValue, { deep: true, immediate: true })

watch(
  () => props.modelValue,
  (newValue) => {
    showPopup.value = newValue
  },
  { deep: true, immediate: true }
)

function isPanelArray() {
  return props.panels.length && !isArray(props.panels[0])
}
function computedValue() {
  formatPanels.value = isPanelArray() ? [props.panels as Panel[]] : (props.panels as Panel[][])
}

function select(rowIndex: number, type: 'action' | 'panels', colIndex?: number) {
  if (type === 'action') {
    if (props.actions[rowIndex].disabled || props.actions[rowIndex].loading) {
      return
    }
    emit('select', {
      item: props.actions[rowIndex],
      index: rowIndex
    })
  } else if (isPanelArray()) {
    emit('select', {
      item: props.panels[Number(colIndex)],
      index: colIndex
    })
  } else {
    emit('select', {
      item: (props.panels as Panel[][])[rowIndex][Number(colIndex)],
      rowIndex,
      colIndex
    })
  }
  if (props.closeOnClickAction) {
    close()
  }
}
function handleClickModal() {
  emit('click-modal')
}
function handleCancel() {
  emit('cancel')
  close()
}
function close() {
  emit('update:modelValue', false)
  emit('close')
}
function handleOpen() {
  emit('open')
}
function handleOpened() {
  emit('opened')
}
function handleClosed() {
  emit('closed')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
