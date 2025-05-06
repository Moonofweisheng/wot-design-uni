<template>
  <view :class="`wd-collapse ${viewmore ? 'is-viewmore' : ''} ${customClass}`" :style="customStyle">
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
import wdIcon from '../wd-icon/wd-icon.vue'
import { onBeforeMount, ref, watch } from 'vue'
import { COLLAPSE_KEY, collapseProps, type CollapseExpose, type CollapseToggleAllOptions } from './types'
import { useChildren } from '../composables/useChildren'
import { isArray, isBoolean, isDef } from '../common/util'
import { useTranslate } from '../composables/useTranslate'

const props = defineProps(collapseProps)
const emit = defineEmits(['change', 'update:modelValue'])

const { translate } = useTranslate('collapse')
const contentLineNum = ref<number>(0) // 查看更多的折叠面板，收起时的显示行数

const { linkChildren, children } = useChildren(COLLAPSE_KEY)

linkChildren({ props, toggle })

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
  { deep: true }
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

/**
 * 切换所有面板展开状态，传 true 为全部展开，false 为全部收起，不传参为全部切换
 * @param options 面板状态
 */
const toggleAll = (options: CollapseToggleAllOptions = {}) => {
  if (props.accordion) {
    return
  }
  if (isBoolean(options)) {
    options = { expanded: options }
  }

  const { expanded, skipDisabled } = options
  const names: string[] = []
  children.forEach((item, index) => {
    if (item.disabled && skipDisabled) {
      if (item.$.exposed!.getExpanded()) {
        names.push(item.name || index)
      }
    } else if (isDef(expanded) ? expanded : !item.$.exposed!.getExpanded()) {
      names.push(item.name || index)
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

defineExpose<CollapseExpose>({
  toggleAll
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
