<template>
  <view class="wd-year-panel">
    <view v-if="showPanelTitle" class="wd-year-panel__title">{{ title }}</view>
    <scroll-view
      class="wd-year-panel__container"
      :style="`height: ${(panelHeight || 378) + (showPanelTitle ? 26 : 16)}px`"
      scroll-y
      :scroll-into-view="scrollIntoViewValue"
    >
      <view v-for="(item, index) in years(minDate, maxDate)" :key="index" :id="`year${index}`">
        <year
          class="year"
          :type="type"
          :date="item"
          :data-date="item"
          :value="value"
          :min-date="minDate"
          :max-date="maxDate"
          :max-range="maxRange"
          :formatter="formatter"
          :range-prompt="rangePrompt"
          :allow-same-day="allowSameDay"
          :default-time="defaultTime"
          @change="handleDateChange"
        />
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import { compareYear, formatYearTitle, getYears } from '../utils'
import { getType } from '../../common/util'
import Year from '../year/year.vue'

interface Props {
  type: string
  value: Array<number> | number | null
  minDate: number
  maxDate: number
  // eslint-disable-next-line @typescript-eslint/ban-types
  formatter: Function
  maxRange: number
  rangePrompt: string
  allowSameDay: boolean
  showPanelTitle: boolean
  defaultTime: Array<number>
  panelHeight: number
}
const props = withDefaults(defineProps<Props>(), {
  allowSameDay: false,
  showPanelTitle: false
})

const title = ref<string>('')
const scrollIntoViewValue = ref<string>('')

let contentObserver: null | UniApp.IntersectionObserver = null
const instance = getCurrentInstance() as any

const years = computed(() => {
  return (minDate, maxDate) => {
    return getYears(minDate, maxDate)
  }
})

const emit = defineEmits(['change'])

onMounted(() => {
  initRect()
  scrollIntoView()
})

const requestAnimationFrame = (cb = () => void 0) => {
  return new Promise((resolve, reject) => {
    uni
      .createSelectorQuery()
      .selectViewport()
      .boundingClientRect()
      .exec(() => {
        resolve(true)
        cb()
      })
  })
}

function initRect(thresholds = [0, 0.15, 0.7, 0.8, 0.9, 1]) {
  if (!props.showPanelTitle) return

  if (contentObserver != null) {
    contentObserver.disconnect()
  }

  contentObserver = uni.createIntersectionObserver(instance, {
    thresholds,
    observeAll: true
  })

  contentObserver.relativeTo('.wd-year-panel__container')
  contentObserver.observe('.year', (res: any) => {
    if (res.boundingClientRect.top <= res.relativeRect.top) {
      title.value = formatYearTitle(res.dataset.date)
    }
  })
}
function scrollIntoView() {
  requestAnimationFrame().then(() => {
    let activeDate
    const type = getType(props.value)
    if (type === 'array') {
      activeDate = props.value![0]
    } else if (type === 'number') {
      activeDate = props.value
    }

    if (!activeDate) {
      activeDate = Date.now()
    }

    const years = getYears(props.minDate, props.maxDate)

    years.some((year, index) => {
      if (compareYear(year, activeDate) === 0) {
        scrollIntoViewValue.value = `year${index}`
        return true
      }

      return false
    })
  })
}
function handleDateChange({ value }) {
  emit('change', {
    value
  })
}

defineExpose({
  initRect,
  scrollIntoView
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
