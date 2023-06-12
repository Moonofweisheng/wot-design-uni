<template>
  <view
    :class="['wd-cell', border ? 'is-border' : '', size ? 'is-' + size : '', center ? 'is-center' : '', 'custom-class']"
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
        <wd-icon v-if="icon" :name="icon" class="wd-cell__icon custom-icon-class"></wd-icon>
        <slot v-else name="icon" />

        <view class="wd-cell__title">
          <!--title BEGIN-->
          <view>
            <view v-if="title" class="custom-title-class">{{ title }}</view>
            <slot v-else name="title"></slot>
          </view>
          <!--title END-->

          <!--label BEGIN-->
          <view>
            <view v-if="label" class="wd-cell__label custom-label-class">{{ label }}</view>
            <slot v-else name="label" />
          </view>
          <!--label END-->
        </view>
      </view>
      <!--right content BEGIN-->
      <view class="wd-cell__right">
        <!--文案内容-->
        <view :class="['wd-cell__value', ['custom-value-class']]">
          <template v-if="value">{{ value }}</template>
          <slot v-else></slot>
        </view>
        <!--箭头-->
        <wd-icon v-if="isLink" class="wd-cell__arrow-right" name="arrow-right" />
      </view>
      <!--right content END-->
    </view>
  </view>
</template>

<script lang="ts">
export default {
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
  options: {
    virtualHost: true
  }
}
</script>

<script lang="ts" setup>
import { getCurrentInstance, inject, nextTick, onMounted, ref, watch } from 'vue'

interface Props {
  title: string
  value: string
  icon: string
  label: string
  isLabel: string
  isLink: boolean
  to: string
  replace: boolean
  clickable: boolean
  size: string
  titleWidth: string
  center: boolean
  required: boolean
  vertical: boolean
  'custom-icon-class': string
  'custom-label-class': string
  'custom-value-class': string
  'custom-title-class': string
}

const props = withDefaults(defineProps<Props>(), {
  isLink: false,
  clickable: false,
  replace: false,
  center: false,
  required: false,
  vertical: false
})

const border = ref<boolean>(false) // 是否展示边框
const cellGroup: any = inject('cell-group')
const cellList: any = inject('cell-list')

watch(
  () => cellGroup.border,
  (newVal) => {
    setIndexAndStatus(newVal)
  }
)
const { proxy } = getCurrentInstance() as any

const emit = defineEmits(['click'])

onMounted(() => {
  nextTick(() => {
    cellList.value = [...cellList.value.concat([{ title: props.title, uid: proxy.$.uid }])]
  })
})

/**
 * @description 从cellGroup获取此组件的索引
 * @return {Number} 此组件的索引
 */
function getIndex() {
  if (!cellList || cellList.value) return
  return cellList.value.findIndex((cell) => {
    return cell.uid === proxy.$.uid
  })
}

/**
 * @description 为所有索引非0的组件设置刘海线，此方法由cellGroup调用
 */
function setIndexAndStatus(isBorder: boolean) {
  const index = getIndex()
  border.value = isBorder && index
}

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
@import '../common/abstracts/variable.scss';
@import '../common/abstracts/_mixin.scss';

@include b(cell) {
  position: relative;
  padding-left: $-cell-padding;
  background-color: $-color-white;
  text-decoration: none;
  color: $-cell-title-color;
  line-height: $-cell-ling-height;
  -webkit-tap-highlight-color: transparent;

  @include when(border) {
    .wd-cell__wrapper {
      @include halfPixelBorder('top');
    }
  }
  @include e(wrapper) {
    position: relative;
    display: flex;
    padding: $-cell-wrapper-padding $-cell-padding $-cell-wrapper-padding 0;
    justify-content: space-between;
    align-items: flex-start;

    @include when(vertical) {
      display: block;

      .wd-cell__right {
        margin-top: $-cell-vertical-top;
      }
      .wd-cell__value {
        text-align: left;
      }
    }
    @include when(label) {
      padding: $-cell-wrapper-padding-with-label $-cell-padding $-cell-wrapper-padding-with-label 0;
    }
  }
  @include e(left) {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    margin-right: $-cell-padding;
    font-size: $-cell-title-fs;
    box-sizing: border-box;

    @include when(required) {
      padding-left: 12px;

      &::after {
        position: absolute;
        content: '*';
        top: 0;
        left: 0;
        font-size: $-cell-required-size;
        color: $-cell-required-color;
      }
    }
  }
  @include e(right) {
    position: relative;
    display: flex;
    flex: 1;
  }
  @include e(title) {
    flex: 1;
    width: 100%;
    font-size: $-cell-title-fs;
    margin-right: $-cell-padding;
  }
  @include e(label) {
    margin-top: 2px;
    font-size: $-cell-label-fs;
    color: $-cell-label-color;
    @include lineEllipsis;
  }
  @include e(icon) {
    display: block;
    position: relative;
    width: $-cell-icon-size;
    height: $-cell-icon-size;
    line-height: 1.25;
    margin-right: $-cell-icon-right;
    font-size: $-cell-icon-size;
  }
  @include e(value) {
    position: relative;
    flex: 1;
    font-size: $-cell-value-fs;
    color: $-cell-value-color;
    text-align: right;
    line-height: $-cell-value-line-height;
    vertical-align: top;
  }
  @include e(arrow-right) {
    display: inline-block;
    margin-left: 8px;
    width: $-cell-arrow-size;
    line-height: 1.22;
    font-size: $-cell-arrow-size;
    color: $-cell-arrow-color;
    vertical-align: top;
  }
  @include when(link) {
    -webkit-tap-highlight-color: $-cell-tap-bg;
  }
  @include when(hover) {
    background-color: $-cell-tap-bg;
  }
  @include when(large) {
    .wd-cell__title {
      font-size: $-cell-title-fs-large;
    }
    .wd-cell__label {
      font-size: $-cell-label-fs-large;
    }
    .wd-cell__icon {
      font-size: $-cell-icon-size-large;
      width: $-cell-icon-size-large;
      height: $-cell-icon-size-large;
    }
  }
  @include when(center) {
    .wd-cell__wrapper {
      align-items: center;
    }
  }
}
</style>
