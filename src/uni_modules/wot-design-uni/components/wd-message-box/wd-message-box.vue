<template>
  <view>
    <wd-popup
      transition="zoom-in"
      v-model="messageState.show"
      :close-on-click-modal="messageState.closeOnClickModal"
      :lazy-render="messageState.lazyRender"
      custom-class="wd-message-box"
      @click-modal="toggleModal('modal')"
      :z-index="messageState.zIndex"
      :duration="200"
      :root-portal="rootPortal"
    >
      <view :class="rootClass">
        <view :class="bodyClass">
          <view v-if="messageState.title" class="wd-message-box__title">
            {{ messageState.title }}
          </view>
          <view class="wd-message-box__content">
            <block v-if="messageState.type === 'prompt'">
              <wd-input
                v-model="messageState.inputValue"
                :type="messageState.inputType"
                :size="messageState.inputSize"
                :placeholder="messageState.inputPlaceholder"
                @input="inputValChange"
              />
              <view v-if="messageState.showErr" class="wd-message-box__input-error">
                {{ messageState.inputError || translate('inputNoValidate') }}
              </view>
            </block>
            <slot>{{ messageState.msg }}</slot>
          </view>
        </view>
        <view :class="`wd-message-box__actions ${messageState.showCancelButton ? 'wd-message-box__flex' : 'wd-message-box__block'}`">
          <wd-button v-bind="customCancelProps" v-if="messageState.showCancelButton" @click="toggleModal('cancel')">
            {{ messageState.cancelButtonText || translate('cancel') }}
          </wd-button>
          <wd-button v-bind="customConfirmProps" @click="toggleModal('confirm')">
            {{ messageState.confirmButtonText || translate('confirm') }}
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
import wdPopup from '../wd-popup/wd-popup.vue'
import wdButton from '../wd-button/wd-button.vue'
import wdInput from '../wd-input/wd-input.vue'
import { computed, inject, reactive, ref, watch } from 'vue'
import { messageBoxProps, type MessageOptionsWithCallBack, type MessageResult } from './types'
import { defaultOptions, getMessageDefaultOptionKey } from '.'
import { deepAssign, isDef, isFunction, isUndefined, omitBy } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import type { ButtonProps } from '../wd-button/types'

const props = defineProps(messageBoxProps)

const { translate } = useTranslate('message-box')

const rootClass = computed(() => {
  return `wd-message-box__container ${props.customClass}`
})

const bodyClass = computed(() => {
  return `wd-message-box__body ${!messageState.title ? 'is-no-title' : ''} ${messageState.type === 'prompt' ? 'is-prompt' : ''}`
})

const messageOptionKey = getMessageDefaultOptionKey(props.selector)
const messageOption = inject(messageOptionKey, ref<MessageOptionsWithCallBack>(defaultOptions)) // message选项

const messageState = reactive<MessageOptionsWithCallBack>({
  msg: '', // 消息内容
  show: false, // 是否显示弹框
  title: '', // 标题
  showCancelButton: false, // 是否展示取消按钮
  closeOnClickModal: true, // 是否支持点击蒙层关闭
  confirmButtonText: '', // 确定按钮文案
  cancelButtonText: '', // 取消按钮文案
  type: 'alert', // 弹框类型
  inputType: 'text', // 输入框类型
  inputValue: '', // 输入框初始值
  inputPlaceholder: '', // 输入框placeholder
  inputError: '', // 输入框错误提示文案
  showErr: false, // 是否显示错误提示
  zIndex: 99, // 弹窗层级
  lazyRender: true // 弹层内容懒渲染
})

/**
 * 确认按钮属性
 */
const customConfirmProps = computed(() => {
  const buttonProps: Partial<ButtonProps> = deepAssign(
    {
      block: true
    },
    isDef(messageState.confirmButtonProps) ? omitBy(messageState.confirmButtonProps, isUndefined) : {}
  )
  buttonProps.customClass = `${buttonProps.customClass || ''} wd-message-box__actions-btn`
  return buttonProps
})

/**
 * 取消按钮属性
 */
const customCancelProps = computed(() => {
  const buttonProps: Partial<ButtonProps> = deepAssign(
    {
      block: true,
      type: 'info'
    },
    isDef(messageState.cancelButtonProps) ? omitBy(messageState.cancelButtonProps, isUndefined) : {}
  )
  buttonProps.customClass = `${buttonProps.customClass || ''} wd-message-box__actions-btn`
  return buttonProps
})

// 监听options变化展示
watch(
  () => messageOption.value,
  (newVal: MessageOptionsWithCallBack) => {
    reset(newVal)
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => messageState.show,
  (newValue) => {
    resetErr(!!newValue)
  },
  {
    deep: true,
    immediate: true
  }
)

/**
 * 点击操作
 * @param action
 */
function toggleModal(action: 'confirm' | 'cancel' | 'modal') {
  if (action === 'modal' && !messageState.closeOnClickModal) {
    return
  }
  if (messageState.type === 'prompt' && action === 'confirm' && !validate()) {
    return
  }
  switch (action) {
    case 'confirm':
      if (messageState.beforeConfirm) {
        messageState.beforeConfirm({
          resolve: (isPass) => {
            if (isPass) {
              handleConfirm({
                action: action,
                value: messageState.inputValue
              })
            }
          }
        })
      } else {
        handleConfirm({
          action: action,
          value: messageState.inputValue
        })
      }
      break
    case 'cancel':
      handleCancel({
        action: action
      })
      break
    default:
      handleCancel({
        action: 'modal'
      })
      break
  }
}

/**
 * 确认回调
 * @param result
 */
function handleConfirm(result: MessageResult) {
  messageState.show = false
  if (isFunction(messageState.success)) {
    messageState.success(result)
  }
}

/**
 * 取消回调
 * @param result
 */
function handleCancel(result: MessageResult) {
  messageState.show = false
  if (isFunction(messageState.fail)) {
    messageState.fail(result)
  }
}

/**
 * 如果存在校验规则行为，则进行判断校验是否通过规则。默认不存在校验直接铜鼓。
 */
function validate() {
  if (messageState.inputPattern && !messageState.inputPattern.test(String(messageState.inputValue))) {
    messageState.showErr = true
    return false
  }
  if (typeof messageState.inputValidate === 'function') {
    const validateResult = messageState.inputValidate(messageState.inputValue!)
    if (!validateResult) {
      messageState.showErr = true
      return false
    }
  }
  messageState.showErr = false
  return true
}

/**
 * @description show关闭时，销毁错误提示
 * @param val
 */
function resetErr(val: boolean) {
  if (val === false) {
    messageState.showErr = false
  }
}
function inputValChange({ value }: { value: string | number }) {
  if (value === '') {
    messageState.showErr = false
    return
  }
  messageState.inputValue = value
}

/**
 * 重置message选项值
 * @param option message选项值
 */
function reset(option: MessageOptionsWithCallBack) {
  if (option) {
    messageState.title = isDef(option.title) ? option.title : ''
    messageState.showCancelButton = isDef(option.showCancelButton) ? option.showCancelButton : false
    messageState.show = option.show
    messageState.closeOnClickModal = option.closeOnClickModal
    messageState.confirmButtonText = option.confirmButtonText
    messageState.cancelButtonText = option.cancelButtonText
    messageState.msg = option.msg
    messageState.type = option.type
    messageState.inputType = option.inputType
    messageState.inputSize = option.inputSize
    messageState.inputValue = option.inputValue
    messageState.inputPlaceholder = option.inputPlaceholder
    messageState.inputPattern = option.inputPattern!
    messageState.inputValidate = option.inputValidate
    messageState.success = option.success
    messageState.fail = option.fail
    messageState.beforeConfirm = option.beforeConfirm
    messageState.inputError = option.inputError
    messageState.showErr = option.showErr
    messageState.zIndex = option.zIndex
    messageState.lazyRender = option.lazyRender
    messageState.confirmButtonProps = option.confirmButtonProps
    messageState.cancelButtonProps = option.cancelButtonProps
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
