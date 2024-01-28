<template>
  <view :class="`wd-collapse ${viewmore ? 'is-viewmore' : ''} ${customClass}`">
    <!-- 普通或手风琴 -->
    <block v-if="!viewmore">
      <slot></slot>
    </block>
    <!-- 查看更多模式 -->
    <view v-else>
      <view
        :class="`wd-collapse__content ${!modelValue ? 'is-retract' : ''} `"
        :style="`-webkit-line-clamp: ${contentLineNum}; -webkit-box-orient: vertical`"
      >
        <slot></slot>
      </view>
      <view class="wd-collapse__more" @click="handleMore">
        <!-- 自定义展开按钮 -->
        <view v-if="useMoreSlot" :class="customMoreSlotClass">
          <slot name="more"></slot>
        </view>
        <!-- 显示展开或折叠按钮 -->
        <block v-else>
          <span class="wd-collapse__more-txt">{{ !modelValue ? translate('expand') : translate('retract') }}</span>
          <view :class="`wd-collapse__arrow ${modelValue ? 'is-retract' : ''}`">
            <wd-icon name="arrow-down"></wd-icon>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-collapse',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue'
import { COLLAPSE_KEY, type CollapseToggleAllOptions } from './types'
import { useChildren } from '../composables/useChildren'
import { isArray, isDef } from '../common/util'
import { useTranslate } from '../composables/useTranslate'

interface Props {
  customClass?: string
  customMoreSlotClass?: string
  modelValue: string | Array<string> | boolean
  accordion?: boolean
  viewmore?: boolean
  useMoreSlot?: boolean
  lineNum?: number
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customMoreSlotClass: '',
  accordion: false,
  viewmore: false,
  useMoreSlot: false,
  lineNum: 2
})

const { translate } = useTranslate('collapse')
const contentLineNum = ref<number>(0) // 查看更多的折叠面板，收起时的显示行数

const { linkChildren, children } = useChildren(COLLAPSE_KEY)

linkChildren({ props, toggle })

const emit = defineEmits(['change', 'update:modelValue'])

watch(
  () => props.modelValue,
  (newVal) => {
    const { viewmore, accordion } = props
    // 手风琴状态下 value 类型只能为 string
    if (accordion && typeof newVal !== 'string') {
      console.error('accordion value must be string')
    } else if (!accordion && !viewmore && !isArray(newVal)) {
      console.error('value must be Array')
    }
  },
  { deep: true, immediate: true }
)

watch(
  () => props.lineNum,
  (newVal) => {
    if (newVal <= 0) {
      console.error('lineNum must greater than 0')
    }
  },
  { deep: true, immediate: true }
)

onBeforeMount(() => {
  const { lineNum, viewmore, modelValue } = props
  contentLineNum.value = viewmore && !modelValue ? lineNum : 0
})

function updateChange(activeNames: string | string[] | boolean) {
  emit('update:modelValue', activeNames)
  emit('change', {
    value: activeNames
  })
}

function toggle(name: string, expanded: boolean) {
  const { accordion, modelValue } = props
  if (accordion) {
    updateChange(name === modelValue ? '' : name)
  } else if (expanded) {
    updateChange((modelValue as string[]).concat(name))
  } else {
    updateChange((modelValue as string[]).filter((activeName) => activeName !== name))
  }
}

const toggleAll = (options: boolean | CollapseToggleAllOptions = {}) => {
  if (props.accordion) {
    return
  }
  if (typeof options === 'boolean') {
    options = { expanded: options }
  }

  const { expanded, skipDisabled } = options
  const names: string[] = []

  children.forEach((item: any, index: number) => {
    if (item.disabled && skipDisabled) {
      if (item.$.exposed.expanded.value) {
        names.push(item.name || index)
      }
    } else {
      if (isDef(expanded) ? expanded : !item.$.exposed.expanded.value) {
        names.push(item.name || index)
      }
    }
  })
  updateChange(names)
}

/**
 * 查看更多点击
 */
function handleMore() {
  emit('update:modelValue', !props.modelValue)
  emit('change', {
    value: !props.modelValue
  })
}

defineExpose({
  toggleAll
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
