<template>
  <view :style="customStyle" :class="`wd-drop-menu ${customClass}`" @click.stop="noop">
    <view class="wd-drop-menu__list">
      <view
        v-for="(item, index) in titleList"
        :key="index"
        @click="toggle(item.uid)"
        :class="`wd-drop-menu__item ${item.disabled ? 'is-disabled' : ''} ${currentUid === item.uid ? 'is-active' : ''}`"
      >
        <view class="wd-drop-menu__item-title">
          <view class="wd-drop-menu__item-title-text">{{ item.title }}</view>
          <wd-icon name="arrow-down" size="14px" custom-class="wd-drop-menu__arrow" />
        </view>
      </view>
    </view>
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-drop-menu',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, onMounted, provide, ref, watch } from 'vue'
import { closeOther } from '../common/clickoutside'
import { getRect } from '../common/util'

type DropDirction = 'up' | 'down'
interface Props {
  customClass: string
  customStyle: string
  zIndex: number
  direction: DropDirction
  modal: boolean
  closeOnClickModal: boolean
  duration: number
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customStyle: '',
  zIndex: 12,
  direction: 'down',
  modal: true,
  closeOnClickModal: true,
  duration: 200
})

// 保存的永远是当前选中的值
const titleList = ref<Record<string, any>[]>([])
// -1表示折叠
const currentUid = ref<string | null>(null)
const offset = ref<number>(0)
const windowHeight = ref<number>(0)

const children: any[] = []
const { proxy } = getCurrentInstance() as any

watch(
  () => props.direction,
  (newValue) => {
    if (newValue !== 'up' && newValue !== 'down') {
      // eslint-disable-next-line quotes
      console.warn("[wot design] warning(wd-drop-menu): direction must be 'up' or 'down'")
    }
  },
  { deep: true, immediate: true }
)

onBeforeMount(() => {
  windowHeight.value = uni.getSystemInfoSync().windowHeight
})

onMounted(() => {
  updateTitle()
})

/**
 * 设置子项
 * @param child
 */
function setChild(child) {
  const hasChild = children.findIndex((drop) => {
    return drop.$.uid === child.$.uid
  })
  if (hasChild <= -1) {
    children.push(child)
  } else {
    children[hasChild] = child
  }
}

function noop() {}

function toggle(uid: string) {
  // 如果重复展开相同的选项，则折叠选项卡
  const child = children.find((child) => {
    return child.$.uid === uid
  })
  // 点击当前 menu, 关闭其他 menu
  if (child && !child.disabled) {
    closeOther(child)
    fold(child)
  }
}
/**
 * 控制菜单内容是否展开
 * @param {Number} currentIndex 当前选的索引
 */
function fold(child?: any) {
  currentUid.value = child ? child.$.uid : null
  if (!child) {
    children.forEach((item, index) => {
      item.$.exposed.setShowPop(false)
    })
    return
  }

  getRect('.wd-drop-menu', false, proxy).then((rect: any) => {
    if (!rect) return
    const { top, bottom } = rect

    if (props.direction === 'down') {
      offset.value = bottom
      // #ifdef H5
      // H5端，导航栏为普通元素，需要将组件移动到导航栏的下边沿
      // H5的导航栏高度为44px
      offset.value = bottom + 44
      // #endif
    } else {
      offset.value = windowHeight.value - top
    }
    // 选中当前关掉其他的
    children.forEach((item, index) => {
      if (child.$.uid === item.$.uid) {
        item.$.exposed.open()
      } else {
        item.$.exposed.setShowPop(false)
      }
    })
  })
}
// 重设选中的 value 菜单列表
function updateTitle() {
  const titleListTemp: Record<string, any>[] = []
  children.forEach((item, index) => {
    titleListTemp.push({
      uid: item.$.uid,
      title: item.$.exposed.displayTitle.value,
      disabled: item.disabled
    })
  })
  titleList.value = titleListTemp
}

defineExpose({
  setChild,
  offset,
  fold,
  updateTitle
})

provide('dropMenu', proxy)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
