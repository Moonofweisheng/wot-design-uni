<template>
  <view>
    <wd-popup
      transition="zoom-in"
      v-model="show"
      :close-on-click-modal="closeOnClickModal"
      :lazy-render="lazyRender"
      custom-class="wd-message-box"
      @clickmodal="toggleModal('modal')"
      :z-index="zIndex"
      :duration="200"
    >
      <view :class="rootClass">
        <!--内容部分-->
        <view :class="bodyClass">
          <!--公共title-->
          <view v-if="title" class="wd-message-box__title">
            {{ title }}
          </view>
          <!--其它类型-->
          <view class="wd-message-box__content">
            <!--prompt类型-->
            <block v-if="type === 'prompt'">
              <!--输入框-->
              <wd-input v-model="inputValue" :type="inputType" size="large" :placeholder="inputPlaceholder || '请输入'" @input="inputValChange" />
              <!--错误提示-->
              <view v-if="showErr" class="wd-message-box__input-error">
                {{ inputError || '输入的数据不合法' }}
              </view>
            </block>
            <!--使用插槽-->
            <slot v-if="useSlot"></slot>
            <!--使用文本-->
            <block v-else>{{ msg }}</block>
          </view>
        </view>
        <!--action按钮组合-->
        <view :class="`wd-message-box__actions ${showCancelButton ? 'wd-message-box__flex' : 'wd-message-box__block'}`">
          <wd-button type="info" block v-if="showCancelButton" custom-style="margin-right: 16px;" @click="toggleModal('cancel')">
            {{ cancelButtonText || '取消' }}
          </wd-button>
          <wd-button block @click="toggleModal('confirm')">
            {{ confirmButtonText || '确定' }}
          </wd-button>
        </view>
      </view>
    </wd-popup>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-message-box',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, inject, ref, watch } from 'vue'
import { MessageOptions, MessageType } from './types'
import { defaultOptions, messageDefaultOptionKey } from '.'

interface Props {
  useSlot?: boolean
  selector?: string
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  useSlot: false,
  customClass: '',
  selector: ''
})

const rootClass = computed(() => {
  return `wd-message-box__container ${props.customClass}`
})

const bodyClass = computed(() => {
  return `wd-message-box__body ${!title.value ? 'is-no-title' : ''} ${type.value === 'prompt' ? 'is-prompt' : ''}`
})

const messageOptionKey = props.selector ? '__MESSAGE_OPTION__' + props.selector : messageDefaultOptionKey
const messageOption = inject(messageOptionKey) || ref<MessageOptions>(defaultOptions) // message选项

/**
 * 消息文案
 */
const msg = ref<string>('')
// eslint-disable-next-line @typescript-eslint/ban-types
let onConfirm: Function | null = null
// eslint-disable-next-line @typescript-eslint/ban-types
let onCancel: Function | null = null
const show = ref<boolean>(false)
/**
 * 标题
 */
const title = ref<string>('')
/**
 * 是否展示取消按钮
 */
const showCancelButton = ref<boolean>(false)
/**
 * 是否支持点击蒙层进行关闭，点击蒙层回调传入的action为'modal'
 */
const closeOnClickModal = ref<boolean>(true)
/**
 * 确定按钮文案
 */
const confirmButtonText = ref<string>('')
/**
 * 取消按钮文案
 */
const cancelButtonText = ref<string>('')

/**
 * 弹框类型
 */
const type = ref<MessageType>('alert')

/**
 * 当type为prompt时，输入框类型
 */
const inputType = ref<string>('text')

/**
 * 当type为prompt时，输入框初始值
 */
const inputValue = ref<string | number>('')

/**
 * 当type为prompt时，输入框placeholder
 */
const inputPlaceholder = ref<string>('')

/**
 * 当type为prompt时，输入框正则校验，点击确定按钮时进行校验
 */
const inputPattern = ref<RegExp>()

/**
 * 当type为prompt时，输入框校验函数，点击确定按钮时进行校验
 */
// eslint-disable-next-line @typescript-eslint/ban-types
let inputValidate: Function | null = null

/**
 * 当type为prompt时，输入框检验不通过时的错误提示文案
 */
const inputError = ref<string>('')
const showErr = ref<boolean>(false)
/**
 * 弹窗层级
 */
const zIndex = ref<number>(99)
/**
 * 弹层内容懒渲染，触发展示时才渲染内容
 */
const lazyRender = ref<boolean>(true)

// 监听options变化展示
watch(
  () => messageOption.value,
  (newVal: MessageOptions) => {
    reset(newVal)
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => show.value,
  (newValue) => {
    resetErr(newValue)
  },
  {
    deep: true,
    immediate: true
  }
)

/**
 * @description 关闭消息框的统一主调 handle
 * @param {'cancel' | 'confirm'} action
 */
function toggleModal(action: 'confirm' | 'cancel' | 'modal') {
  // closeOnClickModal为false，此时点击蒙层没任何效果
  if (action === 'modal' && !closeOnClickModal.value) {
    return
  }
  // prompt类型的弹窗 文案没有通过校验，点击了确定按钮没有任何效果
  if (type.value === 'prompt' && action === 'confirm' && !validate()) {
    return
  }
  show.value = false
  switch (action) {
    case 'confirm':
      onConfirm &&
        onConfirm({
          action: action,
          value: inputValue.value
        })
      break
    case 'cancel':
      onCancel &&
        onCancel({
          action: action
        })
      break
    default:
      onCancel &&
        onCancel({
          action: 'modal'
        })
      break
  }
}
/**
 * @description 如果存在校验规则行为，则进行判断校验是否通过规则。默认不存在校验直接铜鼓。
 * @return {Boolean} 是否通过校验
 */
function validate() {
  if (inputPattern.value && !inputPattern.value.test(String(inputValue.value))) {
    showErr.value = true
    return false
  }
  if (typeof inputValidate === 'function') {
    const validateResult = inputValidate(inputValue)
    if (!validateResult) {
      showErr.value = true
      return false
    }
  }
  showErr.value = false
  return true
}
/**
 * @description show关闭时，销毁错误提示
 * @param val
 */
function resetErr(val) {
  if (val === false) {
    showErr.value = false
  }
}
function inputValChange(value: string | number) {
  if (value === '') {
    showErr.value = false
    return
  }
  inputValue.value = value
}

/**
 * 重置message选项值
 * @param option message选项值
 */
function reset(option: MessageOptions) {
  if (option) {
    title.value = option.title || title.value
    showCancelButton.value = option.showCancelButton || showCancelButton.value
    show.value = option.show!
    closeOnClickModal.value = option.closeOnClickModal!
    confirmButtonText.value = option.confirmButtonText!
    cancelButtonText.value = option.cancelButtonText!
    msg.value = option.msg!
    type.value = option.type!
    inputType.value = option.inputType!
    inputValue.value = option.inputValue!
    inputPlaceholder.value = option.inputPlaceholder!
    inputPattern.value = option.inputPattern!
    inputValidate = option.inputValidate!
    onConfirm = (option as any).onConfirm
    onCancel = (option as any).onCancel
    inputError.value = option.inputError!
    showErr.value = option.showErr!
    zIndex.value = option.zIndex!
    lazyRender.value = option.lazyRender!
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
