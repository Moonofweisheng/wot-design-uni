<template>
  <view class="wd-week-date">
    <!-- 上一周 -->
    <view class="wd-week-date__btn" @click="prevWeek">
      <slot name="prev">
        <wd-icon name="arrow-left" />
      </slot>
    </view>

    <!-- 周列表 -->
    <view class="wd-week-date__week">
      <view
        v-for="item in weekList"
        :key="item.fullDate"
        class="wd-week-date__item"
        :class="{
          'is-disabled': item.isDisabled,
          'is-active': item.isActive,
          'is-circle': shape === 'circle'
        }"
        @click="onSelect(item)"
      >
        <view class="wd-week-date__week-label">
          {{ item.week }}
        </view>
        <view class="wd-week-date__date">
          {{ item.date }}
        </view>
      </view>
    </view>

    <!-- 下一周 -->
    <view class="wd-week-date__btn" @click="nextWeek">
      <slot name="next">
        <wd-icon name="arrow-right" />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import dayjs, { type Dayjs } from '../../dayjs'
import { weekDateProps, type WeekChangeEvent, type WeekDateItem } from './types'

const props = defineProps(weekDateProps)

const emit = defineEmits<{
  (e: 'update:modelValue', date: string): void
  // change用于切换
  (e: 'change', item: WeekChangeEvent): void
  // select用于选择日期
  (e: 'select', item: WeekDateItem): void
}>()

const normalizeDate = (value?: string | number | Date | null): Dayjs | null => {
  if (value === null || value === undefined || value === '') {
    return null
  }

  const date = dayjs(value)

  if (!date.isValid()) {
    console.warn(`[wot ui] warning(wd-week-date): Invalid date value: ${value}`)
    return null
  }

  return date.startOf('day')
}

const WEEK_LABELS = ['日', '一', '二', '三', '四', '五', '六'] as const

const anchorDate = ref(normalizeDate(props.modelValue) ?? dayjs())

const stopModelValueWatch = watch(
  () => props.modelValue,
  (val) => {
    const normalized = normalizeDate(val)
    anchorDate.value = normalized ?? dayjs()
  },
  { immediate: true }
)

/**
 * 当前周起始日
 */
const startOfWeek = computed(() => {
  const day = anchorDate.value.day()
  const weekStart = props.weekStart === 1 ? 1 : 0
  const diff = (day - weekStart + 7) % 7
  return anchorDate.value.subtract(diff, 'day')
})

/**
 * 当前选中日期（用于高亮）
 */
const selectedDate = computed(() => {
  return normalizeDate(props.modelValue) ?? dayjs().startOf('day')
})

/**
 * 一周 7 天数据
 */
const weekList = computed<WeekDateItem[]>(() => {
  const selected = selectedDate.value
  const start = startOfWeek.value

  return Array.from({ length: 7 }, (_, index) => {
    const current = start.add(index, 'day')
    const rawDate = current.toDate()

    const isDisabled = props.disabledDate?.(rawDate) ?? false

    return {
      fullDate: current.format('YYYY-MM-DD'),
      date: current.format('DD'),
      week: WEEK_LABELS[current.day()],
      isActive: selected ? current.isSame(selected, 'day') : false,
      isDisabled
    }
  })
})

/**
 * 选择日期
 */
const onSelect = (item: (typeof weekList.value)[number]) => {
  if (item.isDisabled) return

  emit('update:modelValue', item.fullDate)
  emit('select', item)
}

/**
 * 周切换
 */
const prevWeek = () => {
  anchorDate.value = anchorDate.value.subtract(1, 'week')
  emit('change', {
    date: anchorDate.value.format('YYYY-MM-DD'),
    type: 'prev'
  })
}

const nextWeek = () => {
  anchorDate.value = anchorDate.value.add(1, 'week')
  emit('change', {
    date: anchorDate.value.format('YYYY-MM-DD'),
    type: 'next'
  })
}

onBeforeUnmount(() => {
  stopModelValueWatch()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
