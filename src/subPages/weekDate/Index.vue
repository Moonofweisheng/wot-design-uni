<template>
  <page-wraper>
    <demo-block :title="$t('ji-ben-shi-yong')">
      <wd-week-date v-model="value1" />
    </demo-block>

    <demo-block :title="$t('qi-shi-zhou-qi-zhou-ri')">
      <wd-week-date v-model="value2" :week-start="0" />
    </demo-block>

    <!-- 形状 -->
    <demo-block :title="$t('xing-zhuang')">
      <wd-week-date v-model="value3" shape="circle" />
    </demo-block>

    <!-- 禁用日期 -->
    <demo-block :title="$t('jin-yong-zhi-qian-de-ri-qi')">
      <wd-week-date v-model="value4" :disabled-date="disableBeforeToday" />
    </demo-block>

    <demo-block :title="$t('jin-yong-zhi-hou-de-ri-qi')">
      <wd-week-date v-model="value5" :disabled-date="disableAfterToday" />
    </demo-block>

    <demo-block :title="$t('jin-yong-xing-qi-san-he-xing-qi-wu')">
      <wd-week-date v-model="value6" :disabled-date="disableWedFri" />
    </demo-block>

    <!-- 选择回调 -->
    <demo-block :title="$t('xuan-ze-hui-diao')">
      <wd-week-date v-model="value7" :disabled-date="disableBeforeToday" @select="handleSelect" />
    </demo-block>

    <!-- 切换周事件 -->
    <demo-block :title="$t('qie-huan-zhou-shi-jian')">
      <wd-week-date v-model="value8" @change="handleChange1" />
    </demo-block>

    <!-- 切换周日期跟随 -->
    <demo-block :title="$t('qie-huan-zhou-ri-qi-gen-sui')">
      <wd-week-date v-model="value9" @change="handleChange2" />
    </demo-block>

    <!-- 自定义图标 插槽 -->
    <demo-block :title="$t('zi-ding-yi-tu-biao-cha-zhi')">
      <wd-week-date v-model="value10" shape="circle">
        <template #prev>
          <wd-icon name="caret-left" size="22px" color="#ff5722" />
        </template>
        <template #next>
          <wd-icon name="caret-right" size="22px" color="#ff5722" />
        </template>
      </wd-week-date>
    </demo-block>
    <wd-toast />
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { dayjs, useToast } from '@/uni_modules/wot-design-uni'
import type { WeekChangeEvent, WeekDateItem } from '@/uni_modules/wot-design-uni/components/wd-week-date'

const { success } = useToast()
const { t } = useI18n()

const disableBeforeToday = (date: Date) => {
  return dayjs(date).isBefore(dayjs(), 'day')
}

// 禁用日期之后的日期
const disableAfterToday = (date: Date) => {
  return dayjs(date).isAfter(dayjs(), 'day')
}

// 禁用星期三和星期五
const disableWedFri = (date: Date) => {
  const day = dayjs(date).day()
  return day === 3 || day === 5
}

const value1 = ref('')
const value2 = ref('')
const value3 = ref(1767600387123)
const value4 = ref(Date.now())
const value5 = ref(new Date())
const value6 = ref(new Date('2023-01-01'))
const value7 = ref('')
const value8 = ref('')
const value9 = ref('')
const value10 = ref('')

const handleSelect = (date: WeekDateItem) => {
  success(`${t('qie-huan-ri-qi')}${date.fullDate}`)
}

const handleChange1 = (date: WeekChangeEvent) => {
  success(`${t('ri-qi')}：${date.date}，${t('lei-xing')}：${date.type}`)
}

const handleChange2 = (date: WeekChangeEvent) => {
  success(`${t('ri-qi')}：${date.date}，${t('lei-xing')}：${date.type}`)
  value7.value = date.date
}
</script>

<style lang="scss" scoped></style>
