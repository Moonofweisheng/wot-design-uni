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
import { computed } from 'vue'
import dayjs from '../../dayjs'
import { weekDateProps } from './types'

const props = defineProps(weekDateProps)

const emit = defineEmits<{
  (e: 'update:modelValue', date: string): void
  (e: 'change', date: string): void
}>()

/**
 * 当前选中日期
 */
const currentDate = computed(() => {
  return props.modelValue ? dayjs(props.modelValue) : dayjs()
})

/**
 * 当前周起始日
 */
const startOfWeek = computed(() => {
  const day = currentDate.value.day()
  const diff = props.weekStart === 1 ? (day === 0 ? -6 : 1 - day) : -day

  return currentDate.value.add(diff, 'day')
})

/**
 * 周列表（7 天）
 */
const weekList = computed(() => {
  return Array.from({ length: 7 }).map((_, index) => {
    const date = startOfWeek.value.add(index, 'day')

    return {
      fullDate: date.format('YYYY-MM-DD'),
      date: date.format('DD'),
      week: '日一二三四五六'[date.day()],
      isToday: date.isSame(dayjs(), 'day'),
      isActive: date.isSame(currentDate.value, 'day')
    }
  })
})

/**
 * 选择日期
 */
const onSelect = (date: string) => {
  emit('update:modelValue', date)
  emit('change', date)
}

/**
 * 上一周
 */
const prevWeek = () => {
  const date = currentDate.value.subtract(7, 'day').format('YYYY-MM-DD')
  emit('update:modelValue', date)
  emit('change', date)
}

/**
 * 下一周
 */
const nextWeek = () => {
  const date = currentDate.value.add(7, 'day').format('YYYY-MM-DD')
  emit('update:modelValue', date)
  emit('change', date)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
