<template>
  <view :class="['wd-cell-group', border ? 'is-border' : '', customClass]">
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
  customClass?: string
  title: string
  value: string
  useSlot: boolean
  border: boolean
}
const props = withDefaults(defineProps<Props>(), {
  useSlot: false,
  customClass: ''
})

const cellList = ref<any>([]) // cell列表
provide('cell-list', cellList)
const { proxy } = getCurrentInstance() as any
provide('cell-group', proxy)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
