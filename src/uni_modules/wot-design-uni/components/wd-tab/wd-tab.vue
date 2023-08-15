<template>
  <view :class="`wd-tab ${customClass}`">
    <view v-if="painted" cclass="wd-tab__body" :style="isShow ? '' : 'display: none;'">
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
import { getCurrentInstance, onBeforeMount, ref, watch } from 'vue'
import { getType } from '../common/util'
import { inject } from 'vue'

interface Props {
  customClass?: string
  // 唯一标识符
  name: string | number
  // tab的label
  title?: string
  // tab禁用，无法点击
  disabled: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  disabled: false
})

const painted = ref<boolean>(false) // 初始状态tab不会渲染，必须通过tabs来设置painted使tab渲染
const isShow = ref<boolean>(false)
const { proxy } = getCurrentInstance() as any
const parent = inject<any>('tabs')

watch(
  () => props.name,
  (newValue) => {
    if (newValue === '' || newValue === undefined) {
      console.error('[wot design] error(wd-tab): name must be set !')
      return
    }
    if (getType(newValue) !== 'number' && getType(newValue) !== 'string') {
      console.error('[wot design] error(wd-tab): the type of name should be number or string')
      return
    }
    // 当tab与tabs建立relations关系之后，tab的name改变,需要检测一下与其他tab的name是否冲突
    if (parent) {
      checkName(proxy)
      // parent.setActive(this.parent.data.value)
      parent.updateItems()
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.title,
  () => {
    if (parent) {
      parent.updateItems()
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.disabled,
  () => {
    if (parent) {
      parent.updateItems()
    }
  },
  {
    deep: true,
    immediate: true
  }
)

onBeforeMount(() => {
  if (parent && parent.setChild) {
    parent.setChild(proxy)
  }
})

/**
 * @description 检测tab绑定的name是否和其它tab的name冲突
 * @param {Object} self 自身
 */
function checkName(self) {
  const { name: myName } = props
  if (myName === undefined || myName === null || myName === '') {
    return
  }
  parent &&
    parent.children.forEach((child) => {
      if (child.$.uid !== self.$.uid && child.name === myName) {
        throw Error(`The tab's bound value: ${myName} has been used`)
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
