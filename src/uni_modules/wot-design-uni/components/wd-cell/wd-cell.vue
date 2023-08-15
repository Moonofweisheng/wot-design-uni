<template>
  <view
    :class="['wd-cell', cell.border.value ? 'is-border' : '', size ? 'is-' + size : '', center ? 'is-center' : '', customClass]"
    :hover-class="isLink || clickable ? 'is-hover' : 'none'"
    hover-stay-time="70"
    @click="onClick"
  >
    <view :class="['wd-cell__wrapper', vertical ? 'is-vertical' : '']">
      <view
        :class="['wd-cell__left', required ? 'is-required' : '']"
        :style="titleWidth ? 'min-width:' + titleWidth + ';max-width:' + titleWidth + ';' : ''"
      >
        <!--左侧icon部位-->
        <wd-icon v-if="icon" :name="icon" :custom-class="`wd-cell__icon  ${customIconClass}`"></wd-icon>
        <slot v-else name="icon" />

        <view class="wd-cell__title">
          <!--title BEGIN-->
          <view>
            <view v-if="title" :class="customTitleClass">{{ title }}</view>
            <slot v-else name="title"></slot>
          </view>
          <!--title END-->

          <!--label BEGIN-->
          <view>
            <view v-if="label" :class="`wd-cell__label ${customLabelClass}`">{{ label }}</view>
            <slot v-else name="label" />
          </view>
          <!--label END-->
        </view>
      </view>
      <!--right content BEGIN-->
      <view class="wd-cell__right">
        <!--文案内容-->
        <view :class="`wd-cell__value ${customValueClass}`">
          <template v-if="value">{{ value }}</template>
          <slot v-else></slot>
        </view>
        <!--箭头-->
        <wd-icon v-if="isLink" custom-class="wd-cell__arrow-right" name="arrow-right" />
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
import { useCell } from '../mixins/useCell'

interface Props {
  title?: string
  value?: string
  icon?: string
  label?: string
  isLink: boolean
  to?: string
  replace: boolean
  clickable: boolean
  size?: string
  titleWidth?: string
  center: boolean
  required: boolean
  vertical: boolean
  customClass?: string
  customIconClass?: string
  customLabelClass?: string
  customValueClass?: string
  customTitleClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  customIconClass: '',
  customLabelClass: '',
  customValueClass: '',
  customTitleClass: '',
  isLink: false,
  clickable: false,
  replace: false,
  center: false,
  required: false,
  vertical: false
})

const cell = useCell()

const emit = defineEmits(['click'])

/**
 * @description 点击cell的handle
 */
function onClick() {
  const url = props.to
  if (url && props.isLink) {
    ;(uni as any)[props.replace ? 'redirectTo' : 'navigateTo']({ url })
  }
  if (props.clickable) {
    emit('click')
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
