<template>
  <view :class="`wd-collapse-item ${disabled ? 'is-disabled' : ''} is-border ${customClass}`" :style="customStyle">
    <view
      :class="`wd-collapse-item__header ${expanded ? 'is-expanded' : ''} ${isFirst ? 'wd-collapse-item__header-first' : ''} ${
        $slots.title ? 'is-custom' : ''
      }`"
      @click="handleClick"
    >
      <slot name="title" :expanded="expanded" :disabled="disabled" :isFirst="isFirst">
        <text class="wd-collapse-item__title">{{ title }}</text>
        <wd-icon name="arrow-down" :custom-class="`wd-collapse-item__arrow ${expanded ? 'is-retract' : ''}`" />
      </slot>
    </view>
    <view class="wd-collapse-item__wrapper" :style="contentStyle" @transitionend="handleTransitionEnd">
      <view class="wd-collapse-item__body" :class="customBodyClass" :style="customBodyStyle" :id="collapseId">
        <slot />
      </view>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-collapse-item',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed, getCurrentInstance, onMounted, ref, watch, type CSSProperties } from 'vue'
import { addUnit, getRect, isArray, isDef, isPromise, isString, objToStyle, pause, uuid } from '../common/util'
import { useParent } from '../composables/useParent'
import { COLLAPSE_KEY } from '../wd-collapse/types'
import { collapseItemProps, type CollapseItemExpose } from './types'

const collapseId = ref<string>(`collapseId${uuid()}`)

const props = defineProps(collapseItemProps)

const { parent: collapse, index } = useParent(COLLAPSE_KEY)

const height = ref<string | number>('')
const inited = ref<boolean>(false)
const expanded = ref<boolean>(false)
const { proxy } = getCurrentInstance() as any

/**
 * 容器样式，(动画)
 */
const isFirst = computed(() => {
  return index.value === 0
})

/**
 * 容器样式，(动画)
 */
const contentStyle = computed(() => {
  const style: CSSProperties = {}
  if (inited.value) {
    style.transition = 'height 0.3s ease-in-out'
  }
  if (!expanded.value) {
    style.height = '0px'
  } else if (height.value) {
    style.height = addUnit(height.value)
  }
  return objToStyle(style)
})

/**
 * 是否选中
 */
const isSelected = computed(() => {
  const modelValue = collapse ? collapse?.props.modelValue || [] : []
  const { name } = props
  return (isString(modelValue) && modelValue === name) || (isArray(modelValue) && modelValue.indexOf(name as string) >= 0)
})

watch(
  () => isSelected.value,
  (newVal) => {
    updateExpand(newVal)
  }
)

onMounted(() => {
  updateExpand(isSelected.value)
})

async function updateExpand(useBeforeExpand: boolean = true) {
  try {
    if (useBeforeExpand) {
      await handleBeforeExpand()
    }
    initRect()
  } catch (error) {
    /* empty */
  }
}

function initRect() {
  getRect(`#${collapseId.value}`, false, proxy).then(async (rect) => {
    const { height: rectHeight } = rect
    height.value = isDef(rectHeight) ? Number(rectHeight) : ''
    await pause()
    if (isSelected.value) {
      expanded.value = true
    } else {
      expanded.value = false
    }
    if (!inited.value) {
      inited.value = true
    }
  })
}

function handleTransitionEnd() {
  if (expanded.value) {
    height.value = ''
  }
}

// 点击子项
async function handleClick() {
  if (props.disabled) return
  try {
    await updateExpand()
    const { name } = props
    collapse && collapse.toggle(name, !expanded.value)
  } catch (error) {
    /* empty */
  }
}

/**
 * 展开前钩子
 */
function handleBeforeExpand() {
  return new Promise<void>((resolve, reject) => {
    const { name } = props
    const nextexpanded = !expanded.value
    if (nextexpanded && props.beforeExpend) {
      const response = props.beforeExpend(name)
      if (!response) {
        reject()
      }
      if (isPromise(response)) {
        response.then(() => resolve()).catch(reject)
      } else {
        resolve()
      }
    } else {
      resolve()
    }
  })
}

function getExpanded() {
  return expanded.value
}

defineExpose<CollapseItemExpose>({ getExpanded, updateExpand })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
