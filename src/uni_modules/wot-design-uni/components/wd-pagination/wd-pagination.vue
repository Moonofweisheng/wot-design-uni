<template>
  <view :class="`wd-pager ${customClass}`" :style="customStyle" v-if="!(hideIfOnePage && totalPageNum === 1)">
    <view class="wd-pager__content">
      <wd-button :plain="modelValue > 1" type="info" size="small" :disabled="modelValue <= 1" custom-class="wd-pager__nav" @click="sub">
        <text v-if="!showIcon">{{ prevText || translate('prev') }}</text>
        <wd-icon
          v-else
          :custom-class="`wd-pager__left wd-pager__icon ${modelValue <= 1 ? 'wd-pager__nav--disabled' : 'wd-pager__nav--active'}`"
          name="arrow-right"
        ></wd-icon>
      </wd-button>
      <view class="wd-pager__size">
        <text class="wd-pager__current">{{ modelValue }}</text>
        <text class="wd-pager__separator">/</text>
        <text>{{ totalPageNum }}</text>
      </view>
      <wd-button
        :plain="modelValue < totalPageNum"
        type="info"
        size="small"
        :disabled="modelValue >= totalPageNum"
        custom-class="wd-pager__nav"
        @click="add"
      >
        <text v-if="!showIcon">{{ nextText || translate('next') }}</text>
        <wd-icon
          v-else
          :custom-class="`wd-pager__icon ${modelValue >= totalPageNum ? 'wd-pager__nav--disabled' : 'wd-pager__nav--active'}`"
          name="arrow-right"
        ></wd-icon>
      </wd-button>
    </view>
    <view class="wd-pager__message" v-if="showMessage">
      <text>{{ translate('page', modelValue) }}，</text>
      <text v-if="total">{{ translate('total', total) }}，</text>
      <text>{{ translate('size', pageSize) }}</text>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-pagination',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import wdButton from '../wd-button/wd-button.vue'
import { ref, watch } from 'vue'
import { useTranslate } from '../composables/useTranslate'
import { paginationProps } from './types'

const { translate } = useTranslate('pagination')

const props = defineProps(paginationProps)
const emit = defineEmits(['change', 'update:modelValue'])

const totalPageNum = ref<number>(0) // 总页数

watch(
  () => props.totalPage,
  (newValue) => {
    if (!totalPageNum.value && newValue) {
      totalPageNum.value = newValue
    }
  },
  { immediate: true, deep: true }
)

watch(
  () => props.total,
  () => {
    updateTotalPage()
  },
  { immediate: true, deep: true }
)

function add() {
  const { modelValue } = props
  if (modelValue > totalPageNum.value - 1) {
    return
  }
  emit('change', { value: modelValue + 1 })
  emit('update:modelValue', modelValue + 1)
}

function sub() {
  const { modelValue } = props
  if (modelValue < 2) {
    return
  }
  emit('change', { value: modelValue - 1 })
  emit('update:modelValue', modelValue - 1)
}

function updateTotalPage() {
  const { total, pageSize } = props
  totalPageNum.value = Math.ceil(total / pageSize)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
