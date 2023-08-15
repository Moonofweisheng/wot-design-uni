<template>
  <view
    v-if="currentStatus"
    :class="`wd-step ${customClass} ${currentStatus ? 'is-' + currentStatus : ''} ${canAlignCenter ? 'is-center' : ''}  ${
      vertical ? 'is-vertical' : ''
    }`"
    :style="styles"
  >
    <view :class="`wd-step__header  ${dot ? 'is-dot' : ''}`">
      <view :class="`wd-step__icon  ${dot ? 'is-dot' : !!icon || iconSlot ? 'is-icon' : 'is-text'}`">
        <view v-if="dot" class="wd-step__dot"></view>
        <slot v-else-if="iconSlot" name="icon" />
        <wd-icon v-else-if="icon" class="wd-step__icon-inner" :name="icon" />
        <view v-else class="wd-step__icon-outer">
          <wd-icon v-if="currentStatus === 'finished'" name="check-bold" />
          <wd-icon v-else-if="currentStatus === 'error'" name="close-bold" />
          <text v-else>{{ index + 1 }}</text>
        </view>
      </view>
      <view v-if="index < childrenLength - 1" class="wd-step__line"></view>
    </view>
    <view class="wd-step__content">
      <view :class="`wd-step__title ${descriptionSlot || description ? 'is-description' : ''}`">
        <slot v-if="titleSlot" name="title" />
        <text v-else>{{ currentTitle }}</text>
      </view>
      <view v-if="descriptionSlot || description" class="wd-step__description">
        <slot v-if="descriptionSlot" />
        <text v-else>{{ description }}</text>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-step',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { getCurrentInstance, inject, onBeforeMount, ref } from 'vue'

type StepStatus = 'finished' | 'process' | 'error'

interface Props {
  customClass?: string
  customStyle?: string
  title?: string
  description?: string
  icon?: string
  status?: StepStatus
  iconSlot: boolean
  titleSlot: boolean
  descriptionSlot: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customStyle: '',
  iconSlot: false,
  titleSlot: false,
  descriptionSlot: false
})

const index = ref<number>(-1)
const styles = ref<string>('')
const currentStatus = ref<string>('')
const currentTitle = ref<string>('')
const canAlignCenter = ref<boolean>(false)
const vertical = ref<boolean>(false)
const dot = ref<boolean>(false)
const childrenLength = ref<number>(0)

const parent = inject<any>('wdsteps')
const { proxy } = getCurrentInstance() as any

onBeforeMount(() => {
  if (parent) {
    parent.$.exposed.setChild && parent.$.exposed.setChild(proxy)
  }
})

/**
 * 父组件设置子组件样式
 * @param v vertical
 * @param d dot
 * @param c canAlignCenter
 */
function setStyleFromParent(v: boolean, d: boolean, c: boolean) {
  vertical.value = v
  dot.value = d
  canAlignCenter.value = c
}

function getIndex() {
  const index = parent.$.exposed.children.findIndex((child: { $: { uid: any } }) => {
    return child.$.uid === proxy.$.uid
  })
  return index
}

function getStyles() {
  const { vertical, space } = parent
  if (vertical) {
    return space ? `height: ${space}` : ''
  } else {
    return `width: ${space || 100 / parent.$.exposed.children.length + '%'}`
  }
}
function getCurrentStatus(index: number) {
  if (props.status) {
    return props.status
  }

  const { active } = parent

  if (active > index) {
    return 'finished'
  } else if (active === index) {
    return 'process'
  } else {
    return 'wait'
  }
}
function getCurrentTitle(currentStatus: string) {
  if (props.title) return props.title

  switch (currentStatus) {
    case 'finished':
      return '已完成'
    case 'error':
      return '失败'
    case 'process':
      return '进行中'
    case 'wait':
    default:
      return '未开始'
  }
}
function setIndexAndStatus() {
  index.value = getIndex()
  currentStatus.value = getCurrentStatus(index.value)
  currentTitle.value = getCurrentTitle(currentStatus.value)
  styles.value = getStyles()
  childrenLength.value = parent.$.exposed.children.length
}

defineExpose({ setIndexAndStatus, setStyleFromParent })
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
