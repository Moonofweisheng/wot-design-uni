<template>
  <view :class="`wd-grid-item ${border && !gutter ? itemClass : ''} ${customClass}`" @click="click" :style="`${style};${customStyle}`">
    <view
      :class="`wd-grid-item__content ${square ? 'is-square' : ''} ${border && gutter > 0 ? 'is-round' : ''}`"
      :style="gutterContentStyle"
      :hover-class="hoverClass"
    >
      <slot v-if="useSlot" />
      <block v-else>
        <view :style="'width:' + iconSize + '; height: ' + iconSize" class="wd-grid-item__wrapper">
          <wd-badge custom-class="badge" v-bind="customBadgeProps">
            <template v-if="useIconSlot">
              <slot name="icon" />
            </template>
            <wd-icon v-else :name="icon" :size="iconSize" :custom-class="customIcon" />
          </wd-badge>
        </view>
        <slot name="text" v-if="useTextSlot" />
        <view v-else class="wd-grid-item__text custom-text">{{ text }}</view>
      </block>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-grid-item',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import wdBadge from '../wd-badge/wd-badge.vue'
import { onMounted, ref, watch, computed } from 'vue'
import { useParent } from '../composables/useParent'
import { GRID_KEY } from '../wd-grid/types'
import { deepAssign, isDef, isUndefined, omitBy } from '../common/util'
import { gridItemProps } from './types'
import type { BadgeProps } from '../wd-badge/types'

const props = defineProps(gridItemProps)
const emit = defineEmits(['itemclick'])

const style = ref<string>('')
const gutterContentStyle = ref<string>('')
const itemClass = ref<string>('')
const gutter = ref<number>(0)
const square = ref<boolean>(false)
const border = ref<boolean>(true)
const { parent: grid } = useParent(GRID_KEY)

const childCount = computed(() => {
  if (isDef(grid) && isDef(grid.children)) {
    return grid.children.length
  } else {
    return 0
  }
})

const customBadgeProps = computed(() => {
  const badgeProps: Partial<BadgeProps> = deepAssign(
    isDef(props.badgeProps) ? omitBy(props.badgeProps, isUndefined) : {},
    omitBy(
      {
        max: props.max,
        isDot: props.isDot,
        modelValue: props.value,
        type: props.type
      },
      isUndefined
    )
  )
  return badgeProps
})

watch(
  () => childCount.value,
  () => {
    if (!grid) return
    const width = grid.props.column ? 100 / grid.props.column + '%' : 100 / (childCount.value || 1) + '%'
    // 单独定义间隔
    const gutterStyle = grid.props.gutter ? `padding:${grid.props.gutter}px ${grid.props.gutter}px 0 0; background-color: transparent;` : ''
    // 单独定义正方形
    const squareStyle = grid.props.square ? `background-color:transparent; padding-bottom: 0; padding-top:${width}` : ''
    style.value = `width: ${width}; ${squareStyle || gutterStyle}`
  },
  {
    deep: true,
    immediate: true
  }
)

onMounted(() => {
  init()
})

function init() {
  if (!grid) return
  const children = grid.children
  const width = grid.props.column ? 100 / grid.props.column + '%' : 100 / children.length + '%'
  // 单独定义间隔
  const gutterStyle = grid.props.gutter ? `padding:${grid.props.gutter}px ${grid.props.gutter}px 0 0; background-color: transparent;` : ''
  // 单独定义正方形
  const squareStyle = grid.props.square ? `background-color:transparent; padding-bottom: 0; padding-top:${width}` : ''
  // 间隔+正方形
  gutterContentStyle.value =
    grid.props.gutter && grid.props.square
      ? `right: ${grid.props.gutter}px; bottom:${grid.props.gutter}px;height: auto; background-color: ${grid.props.bgColor}`
      : `background-color: ${grid.props.bgColor}`

  border.value = Boolean(grid.props.border)
  square.value = Boolean(grid.props.square)
  gutter.value = Number(grid.props.gutter)
  style.value = `width: ${width}; ${squareStyle || gutterStyle}`
}

function click() {
  if (grid && !grid.props.clickable) return
  const { url, linkType } = props
  emit('itemclick')
  if (url) {
    switch (linkType) {
      case 'navigateTo':
        uni.navigateTo({
          url
        })
        break
      case 'reLaunch':
        uni.reLaunch({
          url
        })
        break
      case 'redirectTo':
        uni.redirectTo({
          url
        })
        break
      case 'switchTab':
        uni.switchTab({
          url
        })
        break
      default:
        console.error(`[wot-design] warning(wd-grid-item): linkType can not be ${linkType}`)
        break
    }
  }
}
/**
 * 设置样式
 * @param classes
 */
function setiIemClass(classes: string) {
  itemClass.value = classes
}

const hoverClass = computed(() => {
  if (grid?.props.clickable) {
    return grid.props.hoverClass ? grid.props.hoverClass : 'wd-grid-item__content--hover'
  }
  return 'none'
})

defineExpose({
  setiIemClass,
  itemClass,
  init
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
