<!--
 * @Author: weisheng
 * @Date: 2023-08-01 11:12:05
 * @LastEditTime: 2023-08-15 16:30:17
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-collapse-item\wd-collapse-item.vue
 * 记得注释
-->
<template>
  <view :class="`wd-collapse-item ${disabled ? 'is-disabled' : ''} ${customClass}`">
    <view :class="`wd-collapse-item__header  ${isFirst ? 'wd-collapse-item__header-first' : ''}`" @click="handleClick">
      <text class="wd-collapse-item__title">{{ title }}</text>
      <wd-icon name="arrow-down" :class="`wd-collapse-item__arrow ${expanded ? 'is-retract' : ''}`" />
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
import { computed, getCurrentInstance, inject, onMounted, ref, watch } from 'vue'
import { getRect, isArray, isDef, isPromise, objToStyle } from '../common/util'
import { Ref } from 'vue'

const $body = '.wd-collapse-item__body'

interface Props {
  customClass?: string
  title?: string
  disabled: boolean
  name: string
  // 打开前的回调函数，返回 false 可以阻止打开，支持返回 Promise
  // eslint-disable-next-line @typescript-eslint/ban-types
  beforeExpend?: Function
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  disabled: false
})

const parent = inject<any>('wdcollapse')
// eslint-disable-next-line @typescript-eslint/ban-types
const change: Function | undefined = inject('set-change') // 设置子组件是否显示
// eslint-disable-next-line @typescript-eslint/ban-types
const setChild: Function | undefined = inject('set-child') // 将子组件上下文放到父组件children中

const height = ref<string | number>('')
const show = ref<boolean>(true)
const firstItem = inject<Ref<string>>('firstItem')

const expanded = ref<boolean>(false)

const transD = ref<string>('0.3s')
const { proxy } = getCurrentInstance() as any

/**
 * 容器样式，(动画)
 */
const isFirst = computed(() => {
  return firstItem && firstItem.value === props.name
})

/**
 * 容器样式，(动画)
 */
const contentStyle = computed(() => {
  let style: Record<string, string> = {
    height: expanded.value ? height.value + 'px' : '0px',
    // position: show.value ? 'relative' : 'absolute',
    // visibility: show.value ? 'show' : 'hidden',
    'transition-duration': transD.value
  }
  return objToStyle(style)
})

// watch(
//   () => props.name,
//   (newVal) => {
//     // const condition = parent && children && parent.$.exposed.checkRepeat(children, newVal, 'name')
//     // // 比较数组中是否存在重复数据
//     // if (condition > -1) {
//     //   throw Error('Name attribute cannot be defined repeatedly')
//     // }
//   },
//   {
//     deep: true,
//     immediate: true
//   }
// )

watch(
  () => parent.modelValue,
  (newVal: string | string[]) => {
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
  updateExpended()
  let name = props.name
  setChild && setChild({ name: name, expanded: expanded.value })
}

/**
 * 更新展开状态
 */
function updateExpended() {
  if (parent) {
    let { modelValue } = parent
    let name = props.name
    if (modelValue) {
      if (typeof modelValue === 'string' && modelValue === name) {
        expanded.value = true
      } else if (isArray(modelValue) && modelValue.indexOf(name) >= 0) {
        expanded.value = true
      }
    }
  }
}

/**
 * 控制折叠面板滚动
 * @param {String} select 选择器名称
 * @param {Boolean} firstRender 是否首次渲染
 */
function doResetHeight(select) {
  getRect(select, false, proxy).then((rect: any) => {
    if (!rect) return
    const { height: rectHeight } = rect
    height.value = rectHeight
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
          change && change({ name: name, expanded: !expanded.value })
        })
      } else {
        change && change({ name: name, expanded: !expanded.value })
      }
    } else {
      change && change({ name: name, expanded: !expanded.value })
    }
  } else {
    change && change({ name: name, expanded: !expanded.value })
  }
}
// 动画结束时触发
function onTransitionend() {
  if (!expanded.value) {
    show.value = false
  } else {
    height.value = ''
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
