<template>
  <view :class="`wd-pager ${customClass}`" v-if="!(hideIfOnePage && totalPageNum === 1)">
    <view class="wd-pager__content">
      <wd-button :plain="modelValue > 1" type="info" size="small" :disabled="modelValue <= 1" custom-class="wd-pager__nav" @click="sub">
        <text v-if="!showIcon">{{ prevText }}</text>
        <wd-icon
          v-else
          size="14px"
          :custom-class="`wd-pager__left ${modelValue <= 1 ? 'wd-pager__nav--disabled' : 'wd-pager__nav--active'}`"
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
        <text v-if="!showIcon">{{ nextText }}</text>
        <wd-icon
          v-else
          size="14px"
          :custom-class="modelValue >= totalPageNum ? 'wd-pager__nav--disabled' : 'wd-pager__nav--active'"
          name="arrow-right"
        ></wd-icon>
      </wd-button>
    </view>
    <view class="wd-pager__message" v-if="showMessage">
      <text>当前页：{{ modelValue }}，</text>
      <text v-if="total">当前数据：{{ total }}，</text>
      <text>分页大小：{{ pageSize }}</text>
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
import { ref, watch } from 'vue'

interface Props {
  customClass?: string
  modelValue: number // 当前页
  totalPage: number
  showIcon: boolean // 是否展示分页为Icon图标
  showMessage: boolean
  total: number
  pageSize: number
  prevText: string
  nextText: string
  hideIfOnePage: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  totalPage: 1,
  showIcon: false, // 是否展示分页为Icon图标
  showMessage: false,
  total: 0,
  pageSize: 10, // 分页大小
  prevText: '上一页',
  nextText: '下一页',
  hideIfOnePage: true
})

const totalPageNum = ref<number>(0) // 总页数

const emit = defineEmits(['change', 'update:modelValue'])

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
  if (total) {
    totalPageNum.value = Math.ceil(total / pageSize)
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
