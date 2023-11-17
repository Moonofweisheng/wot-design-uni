<template>
  <view :class="`wd-grid-item ${border && !gutter ? itemClass : ''} ${customClass}`" @click="click" :style="style">
    <view :class="`wd-grid-item__content ${square ? 'is-square' : ''} ${border && gutter > 0 ? 'is-round' : ''}`" :style="gutterContentStyle">
      <slot v-if="useSlot" />
      <block v-else>
        <view :style="'width:' + iconSize + '; height: ' + iconSize" class="wd-grid-item__wrapper">
          <wd-badge custom-class="badge" :is-dot="isDot" :modelValue="value" :max="max" :type="type" v-bind="badgeProps">
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
import { getCurrentInstance, inject, onBeforeMount, onMounted, ref, type Ref, watch } from 'vue'

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
type LinkType = 'navigateTo' | 'switchTab' | 'reLaunch' | 'redirectTo'
interface Props {
  customText?: string
  customIcon?: string
  customClass?: string
  icon?: string
  iconSize?: string
  text?: string
  url?: string
  linkType?: LinkType
  useSlot?: boolean
  useIconSlot?: boolean
  useTextSlot?: boolean
  // badge属性
  isDot?: boolean
  type?: BadgeType
  value?: number
  max?: number
  // 徽标属性，透传给 Badge 组件
  badgeProps?: BadgeProps
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customText: '',
  customIcon: '',
  icon: '',
  iconSize: '26px',
  linkType: 'navigateTo',
  useSlot: false,
  useIconSlot: false,
  useTextSlot: false
})

const style = ref<string>('')
const gutterContentStyle = ref<string>('')
const itemClass = ref<string>('')
const gutter = ref<number>(0)
const square = ref<boolean>(false)
const border = ref<boolean>(true)

const parent = inject<any>('wdgrid')
const childCount = inject<Ref<null | number>>('childCount') || ref(0)
const { proxy } = getCurrentInstance() as any

const emit = defineEmits(['itemclick'])

watch(
  () => childCount.value,
  () => {
    if (!parent) return
    const width = parent.column ? 100 / parent.column + '%' : 100 / (childCount.value || 1) + '%'
    // 单独定义间隔
    const gutterStyle = parent.gutter ? `padding:${parent.gutter}px ${parent.gutter}px 0 0; background-color: transparent;` : ''
    // 单独定义正方形
    const squareStyle = parent.square ? `background-color:transparent; padding-bottom: 0; padding-top:${width}` : ''
    style.value = `width: ${width}; ${squareStyle || gutterStyle}`
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
  init()
})

function init() {
  if (!parent) return
  const children = parent.$.exposed.children
  const width = parent.column ? 100 / parent.column + '%' : 100 / children.length + '%'
  // 单独定义间隔
  const gutterStyle = parent.gutter ? `padding:${parent.gutter}px ${parent.gutter}px 0 0; background-color: transparent;` : ''
  // 单独定义正方形
  const squareStyle = parent.square ? `background-color:transparent; padding-bottom: 0; padding-top:${width}` : ''
  // 间隔+正方形
  gutterContentStyle.value =
    parent.gutter && parent.square
      ? `right: ${parent.gutter}px; bottom:${parent.gutter}px;height: auto; background-color: ${parent.bgColor}`
      : `background-color: ${parent.bgColor}`

  border.value = parent.border
  square.value = parent.square
  gutter.value = parent.gutter
  style.value = `width: ${width}; ${squareStyle || gutterStyle}`
}

function click() {
  if (!parent.clickable) return
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
        console.warn(`[wot-design] warning(wd-grid-item): linkType can not be ${linkType}`)
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

defineExpose({
  setiIemClass,
  itemClass,
  init
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
