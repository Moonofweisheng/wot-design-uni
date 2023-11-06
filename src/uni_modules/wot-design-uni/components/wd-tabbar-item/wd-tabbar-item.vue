<template>
  <view class="wd-tabbar-item" :style="customStyle" @click="handleClick">
    <wd-badge :modelValue="value" v-bind="badgeProps" :is-dot="isDot" :max="max">
      <view class="wd-tabbar-item__body">
        <slot name="icon" :active="active"></slot>
        <template v-if="!$slots.icon && icon">
          <wd-icon :name="icon" size="20px" :custom-style="textStyle" :custom-class="active ? 'is-active' : 'is-inactive'"></wd-icon>
        </template>
        <text v-if="title" :style="textStyle" :class="`wd-tabbar-item__body-title ${active ? 'is-active' : 'is-inactive'}`">
          {{ title }}
        </text>
      </view>
    </wd-badge>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-tabbar-item',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { type CSSProperties, computed, inject, onMounted, ref, watch, getCurrentInstance } from 'vue'
import { isDef, objToStyle } from '../common/util'

type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
interface BadgeProps {
  modelValue?: number | string | null
  bgColor?: string
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: BadgeType
  top?: number
  right?: number
  customClass?: string
  customStyle?: string
}

interface Props {
  // 自定义样式类
  customClass?: string
  // 自定义样式
  customStyle?: string
  // 标签页的标题
  title?: string
  // 唯一标识符
  name?: string | number
  // 图标
  icon?: string
  // 徽标显示值
  value?: number | string | null
  // 是否点状徽标
  isDot?: boolean
  // 徽标最大值
  max?: number
  // 徽标属性，透传给 Badge 组件
  badgeProps?: BadgeProps
}

const props = withDefaults(defineProps<Props>(), {
  max: 99,
  customClass: '',
  customStyle: ''
})
const { proxy } = getCurrentInstance() as any

const parent = inject<any>('wdtabbar', { value: '' }) // 父组件
const active = ref<boolean>(false) // 是否激活
const index = ref<number>(0) // 当前tabbar 下标

const textStyle = computed(() => {
  const style: CSSProperties = {}
  if (active.value && parent.activeColor) {
    style['color'] = parent.activeColor
  }
  if (!active.value && parent.inactiveColor) {
    style['color'] = parent.inactiveColor
  }
  return `${objToStyle(style)}`
})

watch(
  () => parent.modelValue,
  (newVal: string | number) => {
    const name = isDef(props.name) ? props.name : index.value
    if (isDef(newVal)) {
      if (newVal === name) {
        active.value = true
      } else {
        active.value = false
      }
    } else {
      active.value = false
    }
  },
  { deep: true }
)

onMounted(() => {
  init()
})

/**
 * 初始化将组件信息注入父组件
 */
function init() {
  if (parent.children && isDef(props.name)) {
    const repeat = checkRepeat(parent.children, props.name, 'name')
    if (repeat > -1) {
      throw Error('[wot-design] warning(wd-tabbar-item): name attribute cannot be defined repeatedly')
    }
  }
  parent.setChild && parent.setChild(proxy)
  index.value = parent.children.indexOf(proxy)
  updateActive()
}

/**
 * 更新展开状态
 */
function updateActive() {
  if (parent && isDef(parent.modelValue)) {
    const name = isDef(props.name) ? props.name : index.value
    if (parent.modelValue === name) {
      active.value = true
    } else {
      active.value = false
    }
  }
}

/**
 * 检查是否存在重复name属性
 * @param {Array} currentList
 * @param {String} checkValue 比较的重复值
 * @param {String} key 键名
 */
function checkRepeat(currentList: any[], checkValue: string | number, key: string): number {
  return currentList.findIndex((item) => item[key] === checkValue)
}

/**
 * 点击tabbar选项
 */
function handleClick() {
  active.value = true
  const name = isDef(props.name) ? props.name : index.value
  parent.setChange && parent.setChange({ name })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
