<template>
  <!-- #ifdef MP-DINGTALK -->
  <view :class="`wd-index-anchor-ding ${indexBar && indexBar.props.sticky && indexBar.anchorState.activeIndex === index ? 'is-sticky' : ''}`">
    <!-- #endif -->
    <view
      :class="`wd-index-anchor ${indexBar && indexBar.props.sticky && indexBar.anchorState.activeIndex === index ? 'is-sticky' : ''} ${customClass}`"
      :style="customStyle"
      :id="indexAnchorId"
    >
      <slot>
        {{ index }}
      </slot>
    </view>
    <!-- #ifdef MP-DINGTALK -->
  </view>
  <!-- #endif -->
</template>

<script setup lang="ts">
import { indexAnchorProps } from './type'
import { onMounted, getCurrentInstance, ref } from 'vue'
import { indexBarInjectionKey } from '../wd-index-bar/type'
import { getRect, isDef, uuid } from '../common/util'
import { useParent } from '../composables/useParent'

const props = defineProps(indexAnchorProps)

const { parent: indexBar } = useParent(indexBarInjectionKey)

const indexAnchorId = ref<string>(`indexBar${uuid()}`)

const { proxy } = getCurrentInstance()!

function getInfo() {
  getRect(`#${indexAnchorId.value}`, false, proxy).then((res) => {
    if (isDef(indexBar)) {
      const anchor = indexBar.anchorState.anchorList.find((v) => v.index === props.index)!
      anchor.top = res.top!
    }
  })
}

onMounted(() => {
  if (isDef(indexBar)) {
    indexBar.anchorState.anchorList.push({ top: 0, index: props.index })
  }
  getInfo()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
