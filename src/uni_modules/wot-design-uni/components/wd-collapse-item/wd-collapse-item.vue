<template>
  <view :class="`wd-collapse-item ${disabled ? 'is-disabled' : ''} is-border ${customClass}`" :style="customStyle">
    <view :class="`wd-collapse-item__header  ${isFirst ? 'wd-collapse-item__header-first' : ''}`" @click="handleClick">
      <slot name="title" :expanded="expanded" :disabled="disabled" :isFirst="isFirst">
        <text class="wd-collapse-item__title">{{ title }}</text>
        <wd-icon name="arrow-down" :custom-class="`wd-collapse-item__arrow ${expanded ? 'is-retract' : ''}`" />
      </slot>
    </view>
    <view class="wd-collapse-item__wrapper" :style="contentStyle" @transitionend="handleTransitionEnd">
      <view class="wd-collapse-item__body" :id="collapseId">
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
import { addUnit, getRect, isArray, isDef, isPromise, objToStyle, requestAnimationFrame, uuid } from '../common/util'
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

const selected = computed(() => {
  if (collapse) {
    return collapse.props.modelValue
  } else {
    return []
  }
})

watch(
  () => selected.value,
  () => {
    if (!inited.value) {
      return
    }
    updateExpend()
  },
  {
    deep: true,
    immediate: true
  }
)

onMounted(() => {
  updateExpend()
})

function updateExpend() {
  return getRect(`#${collapseId.value}`, false, proxy).then((rect) => {
    const { height: rectHeight } = rect
    height.value = isDef(rectHeight) ? Number(rectHeight) : ''
    const name = props.name
    requestAnimationFrame(() => {
      if (isDef(selected.value)) {
        if (
          (typeof selected.value === 'string' && selected.value === name) ||
          (isArray(selected.value) && selected.value.indexOf(name as string) >= 0)
        ) {
          expanded.value = true
        } else {
          expanded.value = false
        }
      } else {
        expanded.value = false
      }
      if (!inited.value) {
        inited.value = true
      }
    })
  })
}

function handleTransitionEnd() {
  if (expanded.value) {
    height.value = ''
  }
}

// 点击子项
function handleClick() {
  if (props.disabled) return
  let name = props.name
  const nexexpanded = !expanded.value // 执行后展开状态
  if (nexexpanded) {
    if (props.beforeExpend) {
      const response: any = props.beforeExpend(name)
      if (!response) {
        return
      }
      if (isPromise(response)) {
        response.then(() => {
          collapse && collapse.toggle(name, !expanded.value)
        })
      } else {
        collapse && collapse.toggle(name, !expanded.value)
      }
    } else {
      collapse && collapse.toggle(name, !expanded.value)
    }
  } else {
    collapse && collapse.toggle(name, !expanded.value)
  }
}

function getExpanded() {
  return expanded.value
}

defineExpose<CollapseItemExpose>({ getExpanded })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
