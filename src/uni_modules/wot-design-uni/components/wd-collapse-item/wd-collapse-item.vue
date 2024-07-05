<template>
  <view :class="`wd-collapse-item ${disabled ? 'is-disabled' : ''} is-border ${customClass}`" :style="customStyle">
    <view :class="`wd-collapse-item__header  ${isFirst ? 'wd-collapse-item__header-first' : ''}`" @click="handleClick">
      <slot name="title" :expanded="expanded" :disabled="disabled" :isFirst="isFirst">
        <text class="wd-collapse-item__title">{{ title }}</text>
        <wd-icon name="arrow-down" :custom-class="`wd-collapse-item__arrow ${expanded ? 'is-retract' : ''}`" />
      </slot>
    </view>
    <view class="wd-collapse-item__wrapper" :style="contentStyle">
      <view class="wd-collapse-item__body">
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
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { getRect, isArray, isDef, isPromise, objToStyle } from '../common/util'
import { useParent } from '../composables/useParent'
import { COLLAPSE_KEY } from '../wd-collapse/types'
import { collapseItemProps, type CollapseItemExpose } from './types'

const $body = '.wd-collapse-item__body'

const props = defineProps(collapseItemProps)

const { parent: collapse, index } = useParent(COLLAPSE_KEY)

const height = ref<string | number>('')

const expanded = ref<boolean>(false)

const transD = ref<string>('0.3s')
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
  let style: Record<string, string> = {
    height: expanded.value ? height.value + 'px' : '0px',
    'transition-duration': transD.value
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
  (newVal) => {
    const name = props.name
    if (isDef(newVal)) {
      if (typeof newVal === 'string' && newVal === name) {
        doResetHeight($body)
        expanded.value = true
      } else if (isArray(newVal) && newVal.indexOf(name as string) >= 0) {
        doResetHeight($body)
        expanded.value = true
      } else {
        expanded.value = false
      }
    } else {
      expanded.value = false
    }
  },
  {
    deep: true,
    immediate: true
  }
)

onMounted(() => {
  init()
})

/**
 * 初始化将组件信息注入父组件
 */
function init() {
  doResetHeight($body)
}

/**
 * 控制折叠面板滚动
 * @param {String} select 选择器名称
 * @param {Boolean} firstRender 是否首次渲染
 */
function doResetHeight(select: string) {
  getRect(select, false, proxy).then((rect) => {
    if (!rect) return
    const { height: rectHeight } = rect
    height.value = Number(rectHeight)
  })
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
