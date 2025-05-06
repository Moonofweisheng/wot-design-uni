<template>
  <view :class="`wd-resize ${customClass}`" :style="rootStyle">
    <!--插槽需要脱离父容器文档流，防止父容器固宽固高，进而导致插槽大小被被父容器限制-->
    <view :id="resizeId" :class="`wd-resize__container ${customContainerClass}`">
      <!--被监听的插槽-->
      <slot />
      <!--监听插槽变大-->
      <scroll-view
        class="wd-resize__wrapper"
        :scroll-y="true"
        :scroll-top="expandScrollTop"
        :scroll-x="true"
        :scroll-left="expandScrollLeft"
        @scroll="onScrollHandler"
      >
        <view class="wd-resize__wrapper--placeholder" style="height: 100000px; width: 100000px"></view>
      </scroll-view>
      <!--监听插槽变小-->
      <scroll-view
        class="wd-resize__wrapper"
        :scroll-y="true"
        :scroll-top="shrinkScrollTop"
        :scroll-x="true"
        :scroll-left="shrinkScrollLeft"
        @scroll="onScrollHandler"
      >
        <view class="wd-resize__wrapper--placeholder" style="height: 250%; width: 250%"></view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-resize',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import { addUnit, objToStyle, uuid } from '../common/util'
import { resizeProps } from './types'

const props = defineProps(resizeProps)
const emit = defineEmits(['resize'])

const expandScrollTop = ref<number>(0)
const shrinkScrollTop = ref<number>(0)
const expandScrollLeft = ref<number>(0)
const shrinkScrollLeft = ref<number>(0)
const height = ref<number>(0)
const width = ref<number>(0)
const scrollEventCount = ref<number>(0)

const rootStyle = computed(() => {
  const style: Record<string, string | number> = {
    width: addUnit(width.value),
    height: addUnit(height.value)
  }
  return `${objToStyle(style)}${props.customStyle}`
})
let onScrollHandler = () => {}
const { proxy } = getCurrentInstance() as any

const resizeId = ref<string>(`resize${uuid()}`)

onMounted(() => {
  // 初始化数据获取
  const query = uni.createSelectorQuery().in(proxy).select(`#${resizeId.value}`).boundingClientRect()
  query.exec(([res]) => {
    // 闭包记录容器高度
    let lastHeight = res.height
    let lastWidth = res.width
    // 立即填充父容器高宽
    height.value = lastHeight
    width.value = lastWidth
    // 监听滚动事件
    onScrollHandler = () => {
      const query = uni.createSelectorQuery().in(proxy).select(`#${resizeId.value}`).boundingClientRect()
      query.exec(([res]) => {
        // 前两次滚动事件被触发，说明 created 的修改已渲染，通知用户代码当前容器大小
        if (scrollEventCount.value++ === 0) {
          const result: Record<string, string | number> = {}
          ;['bottom', 'top', 'left', 'right', 'height', 'width'].forEach((propName) => {
            result[propName] = res[propName]
          })
          emit('resize', result)
        }
        // 滚动条拉到底部会触发两次多余的事件，屏蔽掉。
        if (scrollEventCount.value < 3) return
        // 手动设置父容器高宽，防止父容器坍塌
        // 滚动完，重新获取容器新的高度
        const newHeight = res.height
        const newWidth = res.width
        // 立即填充父容器高宽
        height.value = newHeight
        width.value = newWidth
        // 宽高都改变时，只需要触发一次 size 事件
        const emitStack: number[] = []
        if (newHeight !== lastHeight) {
          lastHeight = newHeight
          emitStack.push(1)
        }
        if (newWidth !== lastWidth) {
          lastWidth = newWidth
          emitStack.push(1)
        }
        if (emitStack.length !== 0) {
          const result: Record<string, any> = {}
          ;['bottom', 'top', 'left', 'right', 'height', 'width'].forEach((propName) => {
            result[propName] = res[propName]
          })
          emit('resize', result)
        }
        // 滚动条拉到底部（如果使用 nextTick 效果更佳）
        scrollToBottom({
          lastWidth: lastWidth,
          lastHeight: lastHeight
        })
      })
    }
    // 滚动条拉到底部（如果使用 nextTick 效果更佳）
    scrollToBottom({
      lastWidth: lastWidth,
      lastHeight: lastHeight
    })
  })
})

function scrollToBottom({ lastWidth, lastHeight }: { lastWidth: number; lastHeight: number }) {
  expandScrollTop.value = 100000 + lastHeight
  shrinkScrollTop.value = 3 * height.value + lastHeight
  expandScrollLeft.value = 100000 + lastWidth
  shrinkScrollLeft.value = 3 * width.value + lastWidth
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
