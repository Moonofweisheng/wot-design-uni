<template>
  <view
    :class="['wd-cell', isBorder ? 'is-border' : '', size ? 'is-' + size : '', center ? 'is-center' : '', customClass]"
    :style="customStyle"
    :hover-class="isLink || clickable ? 'is-hover' : 'none'"
    hover-stay-time="70"
    @click="onClick"
  >
    <view :class="['wd-cell__wrapper', vertical ? 'is-vertical' : '']">
      <view
        :class="['wd-cell__left', isRequired ? 'is-required' : '']"
        :style="titleWidth ? 'min-width:' + titleWidth + ';max-width:' + titleWidth + ';' : ''"
      >
        <!--左侧icon部位-->
        <wd-icon v-if="icon" :name="icon" :custom-class="`wd-cell__icon  ${customIconClass}`"></wd-icon>
        <slot v-else name="icon" />

        <view class="wd-cell__title">
          <!--title BEGIN-->
          <view v-if="title" :class="customTitleClass">{{ title }}</view>
          <slot v-else name="title"></slot>
          <!--title END-->

          <!--label BEGIN-->
          <view v-if="label" :class="`wd-cell__label ${customLabelClass}`">{{ label }}</view>
          <slot v-else name="label" />
          <!--label END-->
        </view>
      </view>
      <!--right content BEGIN-->
      <view class="wd-cell__right">
        <view class="wd-cell__body">
          <!--文案内容-->
          <view :class="`wd-cell__value ${customValueClass}`">
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
import { computed } from 'vue'
import { useCell } from '../composables/useCell'
import { useParent } from '../composables/useParent'
import { FORM_KEY } from '../wd-form/types'
import { cellProps } from './types'
import { isDef } from '../common/util'

const props = defineProps(cellProps)
const emit = defineEmits(['click'])

const cell = useCell()

const isBorder = computed(() => {
  return isDef(cell.border.value) ? cell.border.value : props.border
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
