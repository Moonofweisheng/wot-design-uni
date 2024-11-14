<template>
  <!-- #ifdef MP-DINGTALK -->
  <view :class="`wd-index-anchor-ding ${isSticky ? 'is-sticky' : ''}`">
    <!-- #endif -->
    <view :class="`wd-index-anchor ${isSticky ? 'is-sticky' : ''} ${customClass}`" :style="customStyle" :id="indexAnchorId">
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
import { onMounted, getCurrentInstance, ref, computed } from 'vue'
import { indexBarInjectionKey } from '../wd-index-bar/type'
import { getRect, isDef, uuid } from '../common/util'
import { useParent } from '../composables/useParent'

const props = defineProps(indexAnchorProps)

const { parent: indexBar } = useParent(indexBarInjectionKey)

const indexAnchorId = ref<string>(`indexBar${uuid()}`)

const { proxy } = getCurrentInstance()!

const top = ref<number>(0)

const isSticky = computed(() => {
  return indexBar && indexBar.props.sticky && indexBar.anchorState.activeIndex === props.index
})

function getInfo() {
  getRect(`#${indexAnchorId.value}`, false, proxy).then((res) => {
    if (isDef(indexBar)) {
      top.value = Math.floor(res.top!)
    }
  })
}

onMounted(() => {
  getInfo()
})

defineExpose({
  top
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
