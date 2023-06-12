<template>
  <view class="wd-slider {{ !hideLabel ? 'wd-slider__has-label' : '' }} {{ disabled ? 'wd-slider--disabled' : '' }} custom-class">
    <view class="wd-slider__label-min custom-min-class" v-if="{{ !hideMinMax }}">
      {{ min }}
    </view>
    <view class="wd-slider__bar-wrapper" style="{{ inactiveColor ? 'background:' + inactiveColor : '' }}">
      <view class="wd-slider__bar" style="{{ barStyle }}; {{ activeColor ? 'background:' + activeColor : '' }}"></view>
      <!-- 左边 -->
      <view
        class="wd-slider__button-wrapper"
        style="left: {{ leftBarPercent + '%' }}; visibility: {{ !disabled ? 'show' : 'hidden' }}"
        bind:touchstart="onTouchStart"
        catch:touchmove="onTouchMove"
        bind:touchend="onTouchEnd"
        bind:touchcancel="onTouchEnd"
      >
        <view class="wd-slider__label" v-if="{{ !hideLabel }}">
          {{ leftNewValue }}
        </view>
        <view class="wd-slider__button" />
      </view>
      <!-- 右边 -->
      <view
        v-if="{{ showRight }}"
        class="wd-slider__button-wrapper"
        style="left: {{ rightBarPercent + '%' }}; visibility: {{ !disabled ? 'show' : 'hidden' }}"
        bind:touchstart="onTouchStartRight"
        catch:touchmove="onTouchMoveRight"
        bind:touchend="onTouchEndRight"
        bind:touchcancel="onTouchEndRight"
      >
        <view class="wd-slider__label" v-if="{{ !hideLabel }}">
          {{ rightNewValue }}
        </view>
        <view class="wd-slider__button" />
      </view>
    </view>
    <view class="wd-slider__label-max custom-max-class" v-if="{{ !hideMinMax }}">
      {{ max }}
    </view>
  </view>
</template>
<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { getRect } from '../common/util'
const $slider = '.wd-slider'

interface Props {
  'custom-min-class': string
  'custom-max-class': string
  hideMinMax: boolean
  hideLabel: boolean
  disabled: boolean
  inactiveColor: string
  activeColor: string
  max: number
  min: number
  step: number
  value: number
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  inactiveColor: '#e5e5e5',
  activeColor: '',
  max: 100,
  min: 0,
  step: 1,
  value: 0
})

const showRight = ref<boolean>(false)
const barStyle = ref<string>('width: 0; height: 3px')
const barHeight = ref<string>('3px')
const leftNewValue = ref<number>(0)
const rightNewValue = ref<number>(0)
const rightBarPercent = ref<number>(0)
const leftBarPercent = ref<number>(0)
const trackWidth = ref<number>(0)
const trackLeft = ref<number>(0)
const startValue = ref<number>(0)
const currentValue = ref<number>(0)

const { proxy } = getCurrentInstance() as any

onMounted(() => {
  getRect($slider, false, proxy).then((data: any) => {
    // trackWidth: 轨道全长
    trackWidth.value = data.width
    // trackLeft: 轨道距离左侧的距离
    trackLeft.value = data.left
  })
})

function onTouchStart(event) {
  const { disabled, value } = props
  if (disabled) return
  touchStart(event)
  startValue.value = checkType(value) !== 'Array' ? format(value) : leftBarPercent.value < rightBarPercent.value ? format(value[0]) : format(value[1])
  emit('dragstart', {
    value: currentValue.value
  })
}
function onTouchMove(event) {
  const { disabled, max, min } = props
  if (disabled) return
  touchMove(event)
  // 移动间距 this.deltaX 就是向左(-)向右(+)
  const diff = (this.deltaX / this.trackWidth) * (max - min)
  this.newValue = this.startValue + diff
  // 左滑轮滑动控制
  leftBarSlider(this.newValue)
  this.$emit('dragmove', {
    value: currentValue.value
  })
}
function onTouchEnd() {
  if (this.data.disabled) return
  this.$emit('dragend', {
    value: this.currentValue
  })
}
// 右边滑轮滑动状态监听
function onTouchStartRight(event) {
  if (this.data.disabled) return
  const { leftBarPercent, rightBarPercent, value } = this.data
  // 右滑轮移动时数据绑定
  this.touchStart.call(rightSlider, event)
  // 记录开始数据值
  rightSlider.startValue = leftBarPercent < rightBarPercent ? this.format(value[1]) : this.format(value[0])
  this.$emit('dragstart', {
    value: this.currentValue
  })
}
function onTouchMoveRight(event) {
  if (this.data.disabled) return
  const { max, min } = this.data
  this.touchMove.call(rightSlider, event)
  // 移动间距 this.deltaX 就是向左向右
  const diff = (rightSlider.deltaX / this.trackWidth) * (max - min)
  rightSlider.newValue = this.format(rightSlider.startValue + diff)
  // 右滑轮滑动控制
  this.rightBarSlider(rightSlider.newValue)
  this.$emit('dragmove', {
    value: this.currentValue
  })
}
function onTouchEndRight() {
  if (this.data.disabled) return
  this.$emit('dragend', {
    value: this.currentValue
  })
}
/**
 * 控制右侧滑轮滑动， value校验
 * @param {Number} value 当前滑轮绑定值
 */
function rightBarSlider(value) {
  const { min, max } = this.data
  value = this.format(value)
  const rightBarPercent = ((value - min) / (max - min)) * 100
  this.setData({
    rightNewValue: value,
    rightBarPercent: this.format(rightBarPercent)
  })
  this.styleControl()
}
/**
 * 控制左滑轮滑动，更新渲染数据，对 value 进行校验取整
 * @param {Number} value 当前滑轮绑定值
 */
function leftBarSlider(value) {
  const { min, max, showRight } = this.data
  value = this.format(value)
  // 把 value 转换成百分比
  const percent = ((value - min) / (max - min)) * 100
  if (!showRight) {
    this.setData({
      value,
      leftNewValue: value,
      leftBarPercent: percent,
      barStyle: `width: ${percent}%; height: ${this.data.barHeight};`
    })
  } else {
    this.setData({
      leftNewValue: value,
      leftBarPercent: percent
    })
    this.styleControl()
  }
}
// 样式控制
function styleControl() {
  const { leftNewValue, rightNewValue } = this.data
  const { leftBarPercent, rightBarPercent } = this.data
  // 左右滑轮距离左边最短为当前激活条所处位置
  const barLeft = leftBarPercent < rightBarPercent ? [leftBarPercent, rightBarPercent] : [rightBarPercent, leftBarPercent]
  // 通过左右滑轮的间距控制 激活条宽度 barLeft[1] - barLeft[0]
  const barStyle = `width: ${barLeft[1] - barLeft[0]}%; height: ${this.data.barHeight}; left: ${barLeft[0]}%`
  this.currentValue = leftNewValue < rightNewValue ? [leftNewValue, rightNewValue] : [rightNewValue, leftNewValue]
  this.setData({ barStyle })
}
// 将pos转化为value
function pos2Value(pos) {
  const { max, min, step } = this.data
  const percent = pos / this.trackWidth
  const value = percent * (max - min) + min
  const res = min + Math.floor((value - min) / step) * step
  return res
}
function checkType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
function equal(arr1, arr2) {
  let i = 0
  arr1.forEach((item, index) => {
    item === arr2[index] && i++
  })
  return i === 2
}
function format(value) {
  const { max, min, step } = this.data
  return Math.round(Math.max(min, Math.min(value, max)) / step) * step
}
</script>
<style lang="scss" scoped>
@import '../common/abstracts/variable';
@import '../common/abstracts/mixin';

@include b(slider) {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: $-slider-handle-radius * 3;

  @include e(label-min, label-max) {
    font-size: $-slider-fs;
    color: $-slider-color;
  }
  @include e(label) {
    text-align: center;
    width: $-slider-handle-radius * 2;
    line-height: $-slider-handle-radius * 2;
    font-size: $-slider-fs;
    line-height: 1.2;
    color: $-slider-color;
    background-color: rgba($color: #fff, $alpha: 0.5);
    border-radius: 100%;
    position: absolute;
    bottom: $-slider-handle-radius * 2 + 8px;
  }
  @include e(bar-wrapper) {
    flex: 1;
    position: relative;
    border-radius: $-slider-axie-height / 2;
    background-color: #e5e5e5;
    margin: ($-slider-handle-radius - $-slider-axie-height / 2) 0;
  }
  @include e(bar) {
    position: relative;
    border-radius: inherit;
    height: $-slider-axie-height;
    background: $-slider-line-color;
  }
  @include e(button-wrapper) {
    width: $-slider-handle-radius * 2;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate3d(-50%, -50%, 0);
  }
  @include e(has-label) {
    padding-top: $-slider-fs * 1.2 + 8px;
  }
  @include e(button) {
    height: $-slider-handle-radius * 2;
    width: $-slider-handle-radius * 2;
    background: $-slider-handle-bg;
    border-radius: 100%;
    border: 1px solid $-slider-axie-bg;
    box-sizing: border-box;
    box-shadow: 0 2px 4px 0 rgba($color: #9b9b9b, $alpha: 0.5);
  }
  @include e(label-min) {
    margin-right: $-slider-handle-radius + 11px;
  }
  @include e(label-max) {
    margin-left: $-slider-handle-radius + 11px;
  }
  @include m(disabled) {
    @include me(bar) {
      opacity: 0.25;
    }
    @include me(label-min, label-max) {
      color: $-slider-disabled-color;
    }
  }
}
</style>
