<template>
  <view class="wd-index-anchor" :class="customClass" :style="customStyle">
    <slot>
      {{ index }}
    </slot>
  </view>
</template>

<script setup lang="ts">
import { indexAnchorProps } from './type'
import { onMounted, getCurrentInstance, inject } from 'vue'
import { indexBarInjectionKey } from '../wd-index-bar/type'
import { getRect } from '../common/util'

const props = defineProps(indexAnchorProps)

const indexBar = inject(indexBarInjectionKey)!

const { proxy } = getCurrentInstance()!

function getInfo() {
  getRect('.wd-index-anchor', false, proxy).then((res) => {
    const anchor = indexBar.anchorList.value.find((v) => v.index === props.index)!
    anchor.top = res.top!
  })
}

onMounted(() => {
  indexBar.anchorList.value.push({ top: 0, index: props.index })
  getInfo()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
