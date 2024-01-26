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
        <wd-icon v-else-if="icon" custom-class="wd-step__icon-inner" :name="icon" />
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
import { computed } from 'vue'
import { useParent } from '../composables/useParent'
import { STEPS_KEY } from '../wd-steps/types'
import { isDef } from '../common/util'
import { useTranslate } from '../composables/useTranslate'

type StepStatus = 'finished' | 'process' | 'error'

interface Props {
  customClass?: string
  customStyle?: string
  title?: string
  description?: string
  icon?: string
  status?: StepStatus
  iconSlot?: boolean
  titleSlot?: boolean
  descriptionSlot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customStyle: '',
  iconSlot: false,
  titleSlot: false,
  descriptionSlot: false
})

const { parent: steps, index } = useParent(STEPS_KEY)

const { translate } = useTranslate('steps')

const currentStatus = computed(() => {
  return getCurrentStatus(index.value)
})

const currentTitle = computed(() => {
  return getCurrentTitle(currentStatus.value)
})
const styles = computed(() => {
  return getStyles()
})

const canAlignCenter = computed(() => {
  if (isDef(steps)) {
    const { vertical, alignCenter } = steps.props
    return Boolean(!vertical && alignCenter)
  } else {
    return false
  }
})

const vertical = computed(() => {
  if (isDef(steps)) {
    return Boolean(steps.props.vertical)
  } else {
    return false
  }
})
const dot = computed(() => {
  if (isDef(steps)) {
    return Boolean(steps.props.dot)
  } else {
    return false
  }
})

const childrenLength = computed(() => {
  if (isDef(steps)) {
    return Number(steps.children.length)
  } else {
    return 0
  }
})

function getStyles() {
  if (steps) {
    const { vertical, space } = steps.props
    if (vertical) {
      return space ? `height: ${space}` : ''
    } else {
      return `width: ${space || 100 / steps.children.length + '%'}`
    }
  } else {
    return ''
  }
}
function getCurrentStatus(index: number) {
  if (props.status) {
    return props.status
  }

  if (steps) {
    const { active } = steps.props
    if (Number(active) > index) {
      return 'finished'
    } else if (Number(active) === index) {
      return 'process'
    } else {
      return 'wait'
    }
  } else {
    return 'wait'
  }
}
function getCurrentTitle(currentStatus: string) {
  if (props.title) return props.title

  switch (currentStatus) {
    case 'finished':
      return translate('finished')
    case 'error':
      return translate('failed')
    case 'process':
      return translate('process')
    case 'wait':
    default:
      return translate('wait')
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
