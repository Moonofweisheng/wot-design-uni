import { computed, type MaybeRefOrGetter, onMounted, onUnmounted, reactive, ref, toValue, watch } from 'vue'
import { uniqID } from '../common/util'

// TODO 安卓端
const isApp = uni.getAppBaseInfo().uniPlatform === 'app'

// 全局弹窗栈，跟踪所有弹窗的显示顺序
const globalPopupStack = ref<string[]>([])

// 页面弹窗栈，记录每个页面的弹窗显示顺序
const pagePopupStacks = reactive<Record<string, string[]>>({})

export function useTopPopup(isVisible: MaybeRefOrGetter<boolean>, disabled?: MaybeRefOrGetter<boolean>, onHide?: () => void) {
  // 生成唯一标识符
  const uid = uniqID()

  // 是否禁用
  const isDisabledProp = computed(() => toValue(disabled))

  // 获取当前页面路径
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const currentPagePath = currentPage?.route as string

  // 初始化当前页面的弹窗栈
  if (!pagePopupStacks[currentPagePath]) {
    pagePopupStacks[currentPagePath] = []
  }

  // 添加弹窗到栈中
  const addToPopupStack = () => {
    if (!globalPopupStack.value.includes(uid)) {
      globalPopupStack.value.push(uid)
    }
    if (!pagePopupStacks[currentPagePath]!.includes(uid)) {
      pagePopupStacks[currentPagePath]!.push(uid)
    }
  }

  // 从栈中移除弹窗
  const removeFromPopupStack = () => {
    const index = globalPopupStack.value.indexOf(uid)
    if (index !== -1) {
      globalPopupStack.value.splice(index, 1)
    }
    const pageIndex = pagePopupStacks[currentPagePath]!.indexOf(uid)
    if (pageIndex !== -1) {
      pagePopupStacks[currentPagePath]!.splice(pageIndex, 1)
    }
  }

  // 监听弹窗可见性变化
  watch(
    () => toValue(isVisible),
    (nv) => {
      if (isDisabledProp.value) return
      if (nv) {
        addToPopupStack()
      } else {
        removeFromPopupStack()
      }
    },
    {
      immediate: true
    }
  )

  // 处理弹窗隐藏
  const handlePopupHide = () => {
    if (!isDisabledProp.value && toValue(isVisible) && isApp) {
      onHide?.()
    }
  }

  // 组件挂载时注册事件监听
  onMounted(() => {
    uni.$on(uid, handlePopupHide)
  })

  // 组件卸载时清理资源
  onUnmounted(() => {
    removeFromPopupStack()
    uni.$off(uid, handlePopupHide)
  })

  // 判断当前弹窗是否为顶层弹窗
  const isTopPopup = computed(() => {
    return globalPopupStack.value[globalPopupStack.value.length - 1] === uid
  })

  return {
    isTopPopup
  }
}
