<!--
 * @Author: weisheng
 * @Date: 2023-08-01 11:12:05
 * @LastEditTime: 2023-08-15 16:12:36
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-cell-group\wd-cell-group.vue
 * 记得注释
-->
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
  name: 'wd-cell-group',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { getCurrentInstance, provide, ref } from 'vue'

interface Props {
  customClass?: string
  title?: string
  value?: string
  useSlot: boolean
  border: boolean
}
const props = withDefaults(defineProps<Props>(), {
  useSlot: false,
  border: false,
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
