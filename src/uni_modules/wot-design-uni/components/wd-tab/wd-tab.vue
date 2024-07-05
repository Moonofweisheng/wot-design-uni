<template>
  <view :class="`wd-tab ${customClass}`" :style="customStyle">
    <view v-if="painted" class="wd-tab__body" :style="isShow ? '' : 'display: none;'">
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
import { getCurrentInstance, ref, watch } from 'vue'
import { isDef, isNumber, isString } from '../common/util'
import { useParent } from '../composables/useParent'
import { TABS_KEY } from '../wd-tabs/types'
import { computed } from 'vue'
import { tabProps } from './types'

const props = defineProps(tabProps)

const painted = ref<boolean>(false) // 初始状态tab不会渲染，必须通过tabs来设置painted使tab渲染
const isShow = ref<boolean>(false)
const { proxy } = getCurrentInstance() as any
const { parent: tabs, index } = useParent(TABS_KEY)

// 激活项下标
const activeIndex = computed(() => {
  return isDef(tabs) ? tabs.state.activeIndex : 0
})

watch(
  () => props.name,
  (newValue) => {
    if (isDef(newValue) && !isNumber(newValue) && !isString(newValue)) {
      console.error('[wot design] error(wd-tab): the type of name should be number or string')
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

watch(
  () => activeIndex.value,
  (newValue) => {
    if (newValue === index.value) {
      setShow(true, true)
    } else {
      setShow(painted.value, false)
    }
  },
  { deep: true, immediate: true }
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

/**
 * 设置子组件展示
 * @param setPainted
 * @param setIsShow
 */
function setShow(setPainted: boolean, setIsShow: boolean) {
  painted.value = setPainted
  isShow.value = setIsShow
}

defineExpose({
  setShow,
  painted
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
