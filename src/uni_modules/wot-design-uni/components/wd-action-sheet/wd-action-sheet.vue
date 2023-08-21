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
      @enter="handleOpen"
      @close="close"
      @after-enter="handleOpened"
      @after-leave="handleClosed"
      @clickmodal="handleClickModal"
      :z-index="zIndex"
    >
      <view
        class="wd-action-sheet"
        :style="`${(actions && actions.length) || (panels && panels.length) ? 'margin: 0 10px 10px; border-radius: 16px;' : ''}`"
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
            <wd-loading v-if="action.loading" size="20px" />
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
import { watch } from 'vue'
import { ref } from 'vue'

interface Action {
  // 选项名称
  name: string
  // 描述信息
  subname: string
  // 颜色
  color: string
  // 禁用
  disabled: boolean
  // 加载中状态
  loading: boolean
}

interface Panel {
  // 图片地址
  iconUrl: string
  // 标题内容
  title: string
}

interface Props {
  customClass?: string
  customHeaderClass?: string
  show: boolean
  actions: Array<Action>
  panels: Array<Panel>
  title?: string
  cancelText?: string
  closeOnClickAction: boolean
  closeOnClickModal: boolean
  duration: number
  zIndex: number
  lazyRender: boolean
  safeAreaInsetBottom: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customHeaderClass: '',
  show: false,
  actions: () => [] as Array<Action>,
  panels: () => [] as Array<Panel>,
  closeOnClickAction: true,
  closeOnClickModal: true,
  duration: 200,
  zIndex: 10,
  lazyRender: true,
  safeAreaInsetBottom: true
})
const formatPanels = ref<Array<Panel> | Array<Array<Panel>>>([])

const showPopup = ref<boolean>(false)

watch(
  () => props.panels,
  () => {
    computedValue()
  },
  { deep: true, immediate: true }
)

watch(
  () => props.show,
  (newValue) => {
    showPopup.value = newValue
  },
  { deep: true, immediate: true }
)

const emit = defineEmits(['select', 'clickmodal', 'cancel', 'closed', 'close', 'open', 'opened'])

function isArray() {
  return props.panels.length && !(props.panels[0] instanceof Array)
}
function computedValue() {
  formatPanels.value = isArray() ? [props.panels] : props.panels
}

function select(rowIndex: number, type: string, colIndex?: number) {
  if (type === 'action') {
    emit('select', {
      item: props.actions[rowIndex],
      index: rowIndex
    })
  } else if (isArray()) {
    emit('select', {
      item: props.panels[Number(colIndex)],
      index: colIndex
    })
  } else {
    emit('select', {
      item: props.panels[rowIndex][Number(colIndex)],
      rowIndex,
      colIndex
    })
  }
  close()
}
function handleClickModal() {
  emit('clickmodal')
  if (props.closeOnClickModal) {
    close()
  }
}
function handleCancel() {
  emit('cancel')
  close()
}
function close() {
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
