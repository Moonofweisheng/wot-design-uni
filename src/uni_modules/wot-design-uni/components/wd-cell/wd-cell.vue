<template>
  <view
    :class="['wd-cell', border ? 'is-border' : '', size ? 'is-' + size : '', center ? 'is-center' : '', customClass]"
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
  options: {
    virtualHost: true,
    styleIsolation: 'shared'
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
    if (cellList) {
      cellList.value = [...cellList.value.concat([{ title: props.title, uid: proxy.$.uid }])]
    }
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
@import './index.scss';
</style>
