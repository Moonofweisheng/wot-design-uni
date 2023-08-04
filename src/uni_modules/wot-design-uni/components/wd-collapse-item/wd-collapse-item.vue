<!--
 * @Author: weisheng
 * @Date: 2023-08-01 11:12:05
 * @LastEditTime: 2023-08-04 00:24:16
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-collapse-item\wd-collapse-item.vue
 * 记得注释
-->
<template>
  <view :class="`wd-collapse-item ${disabled ? 'is-disabled' : ''} ${customClass}`">
    <view :class="`wd-collapse-item__header  ${firstItem ? 'wd-collapse-item__header-first' : ''}`" @click="toggle">
      <text class="wd-collapse-item__title">{{ title }}</text>
      <wd-icon name="arrow-down" :class="`wd-collapse-item__arrow ${isExpand ? 'is-retract' : ''}`" />
    </view>
    <view
      class="wd-collapse-item__wrapper"
      :style="`height: ${height}; position: ${show ? 'relative' : 'absolute'}; visibility: ${
        show ? 'show' : 'hidden'
      }; transition-duration: ${transD}`"
      @transitionend="onTransitionend"
    >
      <view class="wd-collapse-item__body">
        <slot />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onBeforeMount, onMounted, ref, watch } from 'vue'
import { getRect } from '../common/util'

const $body = '.wd-collapse-item__body'

interface Props {
  customClass?: string
  title: string
  disabled: boolean
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  disabled: false
})

const parent = inject<any>('wdcollapse')
const children = inject<any[]>('collapseChildren')

const height = ref<string | number>('')
const show = ref<boolean>(false)
const firstItem = ref<boolean>(false)
const isExpand = ref<boolean>(false)

const transD = ref<string>('0.3s')
const { proxy } = getCurrentInstance() as any

watch(
  () => props.name,
  (newVal) => {
    const condition = parent && children && parent.$.exposed.checkRepeat(children, newVal, 'name')
    // 比较数组中是否存在重复数据
    if (condition > -1) {
      throw Error('Name attribute cannot be defined repeatedly')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

onBeforeMount(() => {
  if (parent) {
    parent.$.exposed.setChild && parent.$.exposed.setChild(proxy)
  }
})

onMounted(() => {
  initState()
})

function initState() {
  show.value = isExpand.value
  isExpand.value = parent.accordion ? parent.modelValue === props.name : parent.modelValue.indexOf(name) > -1
  scrollHeight($body, true)
}
/**
 * 控制折叠面板滚动
 * @param {String} select 选择器名称
 * @param {Boolean} firstRender 是否首次渲染
 */
function scrollHeight(select, firstRender = false) {
  getRect(select, false, proxy).then((rect: any) => {
    if (!rect) return
    const { height: rectHeight } = rect
    if (isExpand.value) {
      if (rectHeight === 0) {
        height.value = 'auto'
        show.value = true
        transD.value = firstRender ? '0s' : '0.3s'
        return
      }

      height.value = 0
      show.value = true
      transD.value = firstRender ? '0s' : '0.3s'
      setTimeout(() => {
        height.value = rectHeight + 'px'
      }, 30)
    } else {
      height.value = rectHeight + 'px'
      transD.value = firstRender ? '0s' : '0.3s'
      setTimeout(() => {
        height.value = 0
      }, 30)
    }
  })
}
// 点击触发
function toggle() {
  const { disabled, name } = props
  if (disabled) return
  // 如果是手风琴模式, 那么只展开一个，其余全部折叠
  if (parent.accordion) {
    children &&
      children.forEach((item) => {
        item.$.exposed.setExpend(item.name === name)
        item.$.exposed.scrollHeight($body)
      })
  } else {
    isExpand.value = !isExpand.value
    scrollHeight($body)
  }
  // 调用父组件方法 switchValue 当前选中的是什么，判断当前是否处于选中状态
  parent.$.exposed.switchValue(name, !isExpand.value)
}
// 动画结束时触发
function onTransitionend() {
  if (!isExpand.value) {
    show.value = false
  } else {
    height.value = ''
  }
}

function setFirstItem(first: boolean) {
  firstItem.value = first
}

function setExpend(expanded: boolean) {
  isExpand.value = expanded
}

defineExpose({
  scrollHeight,
  setFirstItem,
  setExpend,
  isExpand: isExpand
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
