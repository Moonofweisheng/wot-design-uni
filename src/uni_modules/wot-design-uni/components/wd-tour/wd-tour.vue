<template>
  <view :class="rootClass" @touchmove.stop.prevent="() => {}">
    <view v-show="showTour" class="wd-tour__masked" @click="handleClickMask"></view>

    <view v-for="(step, index) in steps" :key="index" style="height: 0">
      <template v-if="index === active">
        <view v-show="showTour" :class="['wd-tour__mask', mask ? '' : 'is-none']" :style="popupStyles"></view>

        <view
          v-show="showPopup"
          :class="['wd-tour__popup', arrow ? `is-arrow is-arrow--${alignPosition}` : '']"
          :style="{ ...contentStyles, ['--wd-bg-color']: props.bgColor }"
        >
          <view v-if="type == 'step'" class="wd-tour__content">
            <view v-if="showClose" class="wd-tour__content--top">
              <wd-icon @click="handleClose" name="close" size="16px" />
            </view>

            <slot name="content" :item="step">
              <view class="wd-tour__content--inner">
                {{ step.content }}
              </view>
            </slot>

            <view class="wd-tour__content--bottom">
              <view class="wd-tour__content--bottom-init" v-if="showProgress">
                <slot name="step-progress">{{ active + 1 }}/{{ steps.length }}</slot>
              </view>
              <view class="wd-tour__content--bottom-operate">
                <slot name="prev-step">
                  <wd-button v-if="active !== 0 && showPrevStep" @click="handleStepChange('prev')" type="info" plain size="small">
                    {{ prevStepTxt }}
                  </wd-button>
                </slot>

                <slot name="next-step">
                  <wd-button v-if="steps.length - 1 !== active" @click="handleStepChange('next')" type="primary" size="small">
                    {{ nextStepTxt }}
                  </wd-button>
                </slot>

                <slot name="end-step">
                  <wd-button v-if="steps.length - 1 === active" @click="handleClose" type="info" size="small">
                    {{ completeTxt }}
                  </wd-button>
                </slot>
              </view>
            </view>
          </view>

          <view v-if="type === 'card'" class="wd-tour__content">
            <view v-if="showClose" class="wd-tour__content--top is-title">
              <wd-icon @click="handleClose" name="close" size="16px" />
            </view>
            <slot name="content" :item="step">
              <view class="wd-tour__content--inner is-title">
                {{ step.content }}
              </view>
            </slot>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-tour',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, watch, ref, nextTick, getCurrentInstance } from 'vue'
import { getRect } from '../common/util'
import { tourOptions, type IRect } from './types'
const instance = getCurrentInstance()

const props = defineProps(tourOptions)
const emit = defineEmits(['update:modelValue', 'change', 'close'])
const { windowTop, windowWidth, windowHeight } = uni.getWindowInfo()
const showTour = ref<boolean>(false)
const showPopup = ref<boolean>(false)
const active = ref<number>(0)
const alignPosition = ref('')

const popupStyles = ref<IRect<string>>({})
const contentStyles = ref<IRect<string>>({})

const rootClass = computed(() => {
  return `wd-tour ${props.customClass}`
})
const setPopupStyles = async () => {
  try {
    const currentStep = props.steps[active.value]
    const rect = await getRect(`#${currentStep.target}`, false)
    const { width = 0, height = 0, left = 0, top = 0 } = rect
    // 中心点 【x，y】
    const center = [left + width / 2, top + height / 2]

    popupStyles.value = {
      width: `${width}px`,
      height: `${height}px`,
      top: `${center[1] - height / 2 + windowTop}px`,
      left: `${center[0] - width / 2}px`,
      ...currentStep.popupStyle
    }
    nextTick(() => {
      setContentStyles(rect)
    })
  } catch (error) {
    console.error(`${error}, 请检查元素id是否存在或唯一`)
  }
}
const setContentStyles = async (rect: IRect<number>) => {
  const currentStep = props.steps[active.value]
  const { height = 0, left = 0, top = 0, right = 0 } = rect
  // 获取内容元素自身节点信息
  const selfRect = await getRect('.wd-tour__popup', false, instance)
  // 判断 X轴对齐方式
  const isRightAligned = right > windowWidth / 2
  // 判断Y轴对齐方式
  const isBottomAligned = top + height > windowHeight - 100
  // mask距离页面顶部 + mask自身高度 + 页面导航栏高度 + 自定义三角高度 + 自定义间距
  let contentTop = top + height + windowTop + 10 + 5

  if (selfRect.height && isBottomAligned) {
    contentTop = top + windowTop - selfRect.height - 10 - 5
    alignPosition.value = isRightAligned ? 'right-bottom' : 'left-bottom'
  } else {
    alignPosition.value = isRightAligned ? 'right-top' : 'left-top'
  }

  contentStyles.value = {
    top: `${contentTop}px`,
    left: isRightAligned ? '' : `${left}px`,
    right: isRightAligned ? `${windowWidth - right}px` : '',
    ...currentStep.contentStyle
  }
}
const handleStepChange = (type: string) => {
  if (type == 'next') {
    active.value = active.value + 1
  } else {
    active.value = active.value - 1
  }
  showTour.value = false
  nextTick(() => {
    setPopupStyles()
    showTour.value = true
  })
  emit('change', active.value)
}
const handleClose = () => {
  showTour.value = false
  showPopup.value = false
  emit('close', active.value)
  emit('update:modelValue', false)
}
const handleClickMask = () => {
  props.closeOnClickOverlay && handleClose()
}
watch(
  () => props.modelValue,
  (val) => {
    active.value = props.current || 0
    if (val) {
      setPopupStyles()
    }
    showTour.value = val
    showPopup.value = val
  }
)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
