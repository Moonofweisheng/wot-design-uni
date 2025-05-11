<template>
  <view :class="`wd-tab ${customClass}`" :style="customStyle">
    <view :class="['wd-tab__body', { 'wd-tab__body--inactive': !active }]" v-if="shouldBeRender" :style="tabBodyStyle">
      <slot />
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-tab',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { getCurrentInstance, ref, watch, type CSSProperties } from 'vue'
import { isDef, isNumber, isString, objToStyle } from '../common/util'
import { useParent } from '../composables/useParent'
import { TABS_KEY } from '../wd-tabs/types'
import { computed } from 'vue'
import { tabProps } from './types'

const props = defineProps(tabProps)

const { proxy } = getCurrentInstance() as any
const { parent: tabs, index } = useParent(TABS_KEY)

// 激活项下标
const active = computed(() => {
  return isDef(tabs) ? tabs.state.activeIndex === index.value : false
})

const painted = ref<boolean>(active.value) // 初始状态tab不会渲染，必须通过tabs来设置painted使tab渲染

const tabBodyStyle = computed(() => {
  const style: CSSProperties = {}
  if (!active.value && (!isDef(tabs) || !tabs.props.animated)) {
    style.display = 'none'
  }
  return objToStyle(style)
})

const shouldBeRender = computed(() => !props.lazy || painted.value || active.value)

watch(active, (val) => {
  if (val) painted.value = true
})

watch(
  () => props.name,
  (newValue) => {
    if (isDef(newValue) && !isNumber(newValue) && !isString(newValue)) {
      console.error('[wot ui] error(wd-tab): the type of name should be number or string')
      return
    }
    if (tabs) {
      checkName(proxy)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

/**
 * @description 检测tab绑定的name是否和其它tab的name冲突
 * @param {Object} self 自身
 */
function checkName(self: any) {
  const { name: myName } = props
  if (myName === undefined || myName === null || myName === '') {
    return
  }
  tabs &&
    tabs.children.forEach((child: any) => {
      if (child.$.uid !== self.$.uid && child.name === myName) {
        console.error(`The tab's bound value: ${myName} has been used`)
      }
    })
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
