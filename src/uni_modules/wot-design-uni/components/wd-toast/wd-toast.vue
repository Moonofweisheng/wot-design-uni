<template>
  <wd-transition name="fade" :show="show" :custom-style="transitionStyle">
    <view :class="rootClass">
      <!--iconName优先级更高-->
      <wd-loading v-if="iconName === 'loading'" :type="loadingType" :color="loadingColor" custom-class="wd-toast__icon" :customStyle="loadingStyle" />
      <view
        class="wd-toast__iconWrap wd-toast__icon"
        v-else-if="iconName === 'success' || iconName === 'warning' || iconName === 'info' || iconName === 'error'"
        :style="`width:${iconSize}px; height:${iconSize}px`"
      >
        <view class="wd-toast__iconBox">
          <view class="wd-toast__iconSvg" :style="`background-image: url(${svgStr}); width:${iconSize}px; height:${iconSize}px`"></view>
        </view>
      </view>
      <view v-else-if="customIcon" class="wd-toast__icon custom-icon-class" />
      <!--文本-->
      <view v-if="msg" class="wd-toast__msg">{{ msg }}</view>
    </view>
  </wd-transition>
</template>

<script lang="ts">
export default {
  name: 'wd-toast',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, inject, onBeforeMount, ref, watch } from 'vue'
import base64 from '../common/base64'
import { defaultOptions, toastDefaultOptionKey, toastIcon } from '.'
import { ToastLoadingType, ToastOptions } from './type'
import { isDef, objToStyle } from '../common/util'

interface Props {
  customIconClass?: string
  customClass?: string
  selector?: string
}

const props = withDefaults(defineProps<Props>(), {
  customIconClass: '',
  customClass: '',
  selector: ''
})

const iconName = ref<string>('') // 图标类型
const customIcon = ref<boolean>(false)
const msg = ref<string>('') // 消息内容
const position = ref<string>('middle')
const show = ref<boolean>(false)
const zIndex = ref<number>(100)
const loadingType = ref<ToastLoadingType>('outline')
const loadingColor = ref<string>('#4D80F0')
const iconSize = ref<number>(42)
const svgStr = ref<string>('') // 图标

const toastOptionKey = props.selector ? '__TOAST_OPTION__' + props.selector : toastDefaultOptionKey
const toastOption = inject(toastOptionKey) || ref<ToastOptions>(defaultOptions) // toast选项

// 监听options变化展示
watch(
  () => toastOption.value,
  (newVal: ToastOptions) => {
    reset(newVal)
  },
  {
    deep: true,
    immediate: true
  }
)

// 监听options变化展示
watch(
  () => iconName.value,
  () => {
    buildSvg()
  },
  {
    deep: true,
    immediate: true
  }
)

/**
 * 动画自定义样式
 */
const transitionStyle = computed(() => {
  const style: Record<string, string | number> = {
    'z-index': zIndex.value,
    position: 'fixed',
    top: '50%',
    left: 0,
    width: '100%',
    transform: 'translate(0, -50%)',
    'text-align': 'center'
  }
  return objToStyle(style)
})

/**
 * 加载自定义样式
 */
const loadingStyle = computed(() => {
  const style: Record<string, string | number> = {
    display: 'inline-block',
    'margin-right': '16px'
  }
  return objToStyle(style)
})

const rootClass = computed(() => {
  return `wd-toast ${props.customClass} wd-toast--${position.value} ${
    (iconName.value !== 'loading' || msg.value) && (iconName.value || customIcon.value) ? 'wd-toast--with-icon' : ''
  } ${iconName.value === 'loading' && !msg.value ? 'wd-toast--loading' : ''}`
})

onBeforeMount(() => {
  buildSvg()
})

function buildSvg() {
  if (iconName.value !== 'success' && iconName.value !== 'warning' && iconName.value !== 'info' && iconName.value !== 'error') return
  const iconSvg = toastIcon[iconName.value]()
  const iconSvgStr = `"data:image/svg+xml;base64,${base64(iconSvg)}"`
  svgStr.value = iconSvgStr
}

/**
 * 重置toast选项值
 * @param option toast选项值
 */
function reset(option: ToastOptions) {
  if (option) {
    iconName.value = isDef(option.iconName!) ? option.iconName! : iconName.value
    customIcon.value = isDef(option.customIcon!) ? option.customIcon! : customIcon.value
    msg.value = isDef(option.msg!) ? option.msg! : msg.value
    position.value = isDef(option.position!) ? option.position! : position.value
    show.value = isDef(option.show!) ? option.show! : show.value
    zIndex.value = isDef(option.zIndex!) ? option.zIndex! : zIndex.value
    loadingType.value = isDef(option.loadingType!) ? option.loadingType! : loadingType.value
    loadingColor.value = isDef(option.loadingColor!) ? option.loadingColor! : loadingColor.value
    iconSize.value = isDef(option.iconSize!) ? option.iconSize! : iconSize.value
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
