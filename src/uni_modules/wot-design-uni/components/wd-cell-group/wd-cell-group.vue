<template>
  <view :class="['wd-cell-group', border ? 'is-border' : '', 'custom-class']">
    <view v-if="title || value || useSlot" class="wd-cell-group__title">
      <!--左侧标题-->
      <view class="wd-cell-group__left">
        <text v-if="title">{{ title }}</text>
        <slot v-else name="title"></slot>
      </view>
      <!--右侧标题-->
      <view class="wd-cell-group__right">
        <text v-if="value">{{ value }}</text>
        <slot v-else name="value"></slot>
      </view>
    </view>
    <view class="wd-cell-group__body">
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
  options: {
    virtualHost: true
  }
}
</script>

<script lang="ts" setup>
import { getCurrentInstance, provide, ref } from 'vue'

interface Props {
  title: string
  value: string
  useSlot: boolean
  border: boolean
}
const props = withDefaults(defineProps<Props>(), {
  useSlot: false
})

const cellList = ref<any>([]) // cell列表
provide('cell-list', cellList)
const { proxy } = getCurrentInstance() as any
provide('cell-group', proxy)
</script>

<style lang="scss" scoped>
@import '../common/abstracts/variable.scss';
@import '../common/abstracts/_mixin.scss';

@include b(cell-group) {
  background-color: $-color-white;

  @include when(border) {
    .wd-cell-group__title {
      @include halfPixelBorder;
    }
  }
  @include e(title) {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: $-cell-group-padding;
    background: $-color-white;
    font-size: $-cell-group-title-fs;
    color: $-cell-group-title-color;
    font-weight: $-fw-medium;
    line-height: 1.43;
  }
  @include e(right) {
    color: $-cell-group-value-color;
    font-size: $-cell-group-value-fs;
  }
  @include e(body) {
    background: $-color-white;
  }
}
</style>
