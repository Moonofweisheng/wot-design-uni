<template>
  <view class="wd-week-date">
    <view class="wd-week-date__btn" @click="prevWeek">
      <wd-icon name="arrow-left"></wd-icon>
    </view>
    <view class="wd-week-date__week">
      <view
        v-for="item in weekList"
        :key="item.fullDate"
        class="wd-week-date__item"
        :class="{
          'is-active': item.isActive,
          'is-today': item.isToday
        }"
        @click="onSelect(item.fullDate)"
      >
        <view class="wd-week-date__week-label">
          {{ item.week }}
        </view>
        <view class="wd-week-date__date">
          {{ item.date }}
        </view>
      </view>
    </view>
    <view class="wd-week-date__btn" @click="nextWeek">
      <wd-icon name="arrow-right"></wd-icon>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import dayjs, { type Dayjs } from '../../dayjs'
import { weekDateProps } from './types'

const props = defineProps(weekDateProps)

const emit = defineEmits<{
  (e: 'update:modelValue', date: string): void
  (e: 'change', date: string): void
}>()

const WEEK_LABELS = ['日', '一', '二', '三', '四', '五', '六'] as const

const normalizeDate = (value?: string | number | Date | null): Dayjs | null => {
  if (value === null || value === undefined || value === '') {
    return null
  }

  const date = dayjs(value)

  if (!date.isValid()) {
    console.warn(`[WeekDate] Invalid date value: ${value}`)
    return null
  }

  return date.startOf('day')
}

const anchorDate = ref(normalizeDate(props.modelValue) ?? dayjs())
watch(
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
  const weekStart = Number(props.weekStart) === 1 ? 1 : 0

  const diff = (day - weekStart + 7) % 7

  return anchorDate.value.subtract(diff, 'day')
})

/**
 * 当前选中的日期(已标准化)
 * 空值时默认为今天,用于高亮显示
 */
const selectedDate = computed(() => {
  return normalizeDate(props.modelValue) ?? dayjs().startOf('day')
})

const weekList = computed(() => {
  const today = dayjs().startOf('day')
  const selected = selectedDate.value

  return Array.from({ length: 7 }, (_, index) => {
    const date = startOfWeek.value.add(index, 'day')

    return {
      fullDate: date.format('YYYY-MM-DD'),
      date: date.format('DD'),
      week: WEEK_LABELS[date.day()],
      isToday: date.isSame(today, 'day'),
      isActive: date.isSame(selected, 'day')
    }
  })
})

/**
 * 选择日期
 */
const onSelect = (date: string) => {
  console.log('date', date)

  emit('update:modelValue', date)
  emit('change', date)
}

/**
 * 上一周
 */
const prevWeek = () => {
  anchorDate.value = anchorDate.value.subtract(1, 'week')
  // emit('update:modelValue')
  // emit('change', date)
}

/**
 * 下一周
 */
const nextWeek = () => {
  anchorDate.value = anchorDate.value.add(1, 'week')
  // emit('update:modelValue')
  // emit('change', date)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
