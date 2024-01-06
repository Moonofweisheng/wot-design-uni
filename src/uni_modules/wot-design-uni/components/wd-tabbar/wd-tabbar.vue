<template>
  <view :style="{ height: addUnit(height) }">
    <view
      :class="`wd-tabbar wd-tabbar--${shape} ${customClass} ${fixed ? 'is-fixed' : ''} ${safeAreaInsetBottom ? 'is-safe' : ''} ${
        bordered ? 'is-border' : ''
      }`"
      :style="rootStyle"
    >
      <slot></slot>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-tabbar',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { getCurrentInstance, onMounted, provide, reactive, ref, watch, nextTick, computed, type CSSProperties } from 'vue'
import type { TabbarItem } from '../wd-tabbar-item/types'
import { addUnit, getRect, isDef, objToStyle } from '../common/util'
import { useChildren } from '../composables/useChildren'
import { TABBAR_KEY } from './types'

type TabbarShape = 'default' | 'round'

interface Props {
  // 自定义样式类
  customClass?: string
  // 自定义样式
  customStyle?: string
  // 选中标签的索引值或者名称
  modelValue?: number | string
  // 是否固定在底部
  fixed?: boolean
  // 是否设置底部安全距离（iphone X 类型的机型）
  safeAreaInsetBottom?: boolean
  // 是否显示顶部边框
  bordered?: boolean
  // 标签栏的形状。可选项：default/round
  shape?: TabbarShape
  // 激活标签的颜色
  activeColor?: string
  // 未激活标签的颜色
  inactiveColor?: string
  // 固定在底部时，是否在标签位置生成一个等高的占位元素
  placeholder?: boolean
  // 自定义组件的层级
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customStyle: '',
  modelValue: 0,
  fixed: false,
  bordered: true,
  safeAreaInsetBottom: false,
  shape: 'default',
  inactiveColor: '',
  activeColor: '',
  placeholder: false,
  zIndex: 99
})
const height = ref<number | ''>('') // 占位高度
const { proxy } = getCurrentInstance() as any

const { linkChildren } = useChildren(TABBAR_KEY)

linkChildren({
  props,
  setChange
})

const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.zIndex)) {
    style['z-index'] = props.zIndex
  }
  return `${objToStyle(style)};${props.customStyle}`
})

watch(
  [() => props.fixed, () => props.placeholder],
  () => {
    setPlaceholderHeight()
  },
  { deep: true, immediate: false }
)

onMounted(() => {
  if (props.fixed && props.placeholder) {
    nextTick(() => {
      setPlaceholderHeight()
    })
  }
})

const emit = defineEmits(['change', 'update:modelValue'])

/**
 * 子项状态变更
 * @param child 子项
 */
function setChange(child: TabbarItem) {
  let active = child.name
  emit('update:modelValue', active)
  emit('change', {
    value: active
  })
}

function setPlaceholderHeight() {
  if (!props.fixed || !props.placeholder) {
    return
  }

  getRect('.wd-tabbar', false, proxy).then((res: any) => {
    height.value = res.height
  })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
