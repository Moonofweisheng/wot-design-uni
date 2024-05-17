<template>
  <view class="wd-index-anchor" :class="customClass" :style="customStyle">
    <slot>
      {{ index }}
    </slot>
  </view>
</template>

<script setup lang="ts">
import { indexAnchorProps } from './type'
import { onMounted } from 'vue'
import { getCurrentInstance } from 'vue'
import { inject } from 'vue'
import { indexBarInjectionKey } from '../wd-index-bar/type'

const props = defineProps(indexAnchorProps)

const indexBar = inject(indexBarInjectionKey)!

const { proxy } = getCurrentInstance()!

function getInfo() {
  const query = uni.createSelectorQuery().in(proxy).select('.wd-index-anchor').boundingClientRect()
  query.exec(([res]) => {
    const anchor = indexBar.anchorList.value.find((v) => v.index === props.index)!
    anchor.top = res.top
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
