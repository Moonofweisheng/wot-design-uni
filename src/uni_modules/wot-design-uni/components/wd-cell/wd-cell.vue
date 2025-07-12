<template>
  <view
    :class="['wd-cell', isBorder ? 'is-border' : '', size ? 'is-' + size : '', center ? 'is-center' : '', customClass]"
    :style="customStyle"
    :hover-class="isLink || clickable ? 'is-hover' : 'none'"
    :hover-stay-time="70"
    @click="onClick"
  >
    <view :class="['wd-cell__wrapper', vertical ? 'is-vertical' : '']">
      <view
        v-if="showLeft"
        :class="['wd-cell__left', isRequired ? 'is-required' : '']"
        :style="titleWidth ? 'min-width:' + titleWidth + ';max-width:' + titleWidth + ';' : ''"
      >
        <!--左侧icon部位-->
        <slot name="icon">
          <wd-icon v-if="icon" :name="icon" :custom-class="`wd-cell__icon  ${customIconClass}`"></wd-icon>
        </slot>

        <view class="wd-cell__title">
          <!--title BEGIN-->
          <slot name="title" v-if="useTitleSlot && $slots.title"></slot>
          <view v-else-if="title" :class="customTitleClass">{{ title }}</view>
          <!--title END-->

          <!--label BEGIN-->
          <slot name="label">
            <view v-if="label" :class="`wd-cell__label ${customLabelClass}`">{{ label }}</view>
          </slot>
          <!--label END-->
        </view>
      </view>
      <!--right content BEGIN-->
      <view class="wd-cell__right">
        <view class="wd-cell__body">
          <!--文案内容-->
          <view :class="`wd-cell__value ${customValueClass} wd-cell__value--${valueAlign} ${ellipsis ? 'wd-cell__value--ellipsis' : ''}`">
            <slot>{{ value }}</slot>
          </view>
          <!--箭头-->
          <wd-icon v-if="isLink" custom-class="wd-cell__arrow-right" name="arrow-right" />
          <slot v-else name="right-icon" />
        </view>
        <view v-if="errorMessage" class="wd-cell__error-message">{{ errorMessage }}</view>
      </view>
      <!--right content END-->
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-cell',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed, useSlots } from 'vue'
import { useCell } from '../composables/useCell'
import { useParent } from '../composables/useParent'
import { FORM_KEY } from '../wd-form/types'
import { cellProps } from './types'
import { isDef } from '../common/util'

const props = defineProps(cellProps)
const emit = defineEmits(['click'])

// 获取插槽
const slots = useSlots()

const cell = useCell()

const isBorder = computed(() => {
  return Boolean(isDef(props.border) ? props.border : cell.border.value)
})

const { parent: form } = useParent(FORM_KEY)

const errorMessage = computed(() => {
  if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
    return form.errorMessages[props.prop]
  } else {
    return ''
  }
})

// 是否展示必填
const isRequired = computed(() => {
  let formRequired = false
  if (form && form.props.rules) {
    const rules = form.props.rules
    for (const key in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, key) && key === props.prop && Array.isArray(rules[key])) {
        formRequired = rules[key].some((rule) => rule.required)
      }
    }
  }
  return props.required || props.rules.some((rule) => rule.required) || formRequired
})

// 是否展示左侧部分
const showLeft = computed(() => {
  // 插槽优先级高于props
  // 有icon插槽或icon属性
  const hasIcon = slots.icon || props.icon
  // 有title插槽或title属性
  const hasTitle = (slots.title && props.useTitleSlot) || props.title
  // 有label插槽或label属性
  const hasLabel = slots.label || props.label

  return hasIcon || hasTitle || hasLabel
})

/**
 * @description 点击cell的handle
 */
function onClick() {
  const url = props.to

  if (props.clickable || props.isLink) {
    emit('click')
  }
  if (url && props.isLink) {
    if (props.replace) {
      uni.redirectTo({ url })
    } else {
      uni.navigateTo({ url })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
