<template>
  <view class="wd-year-panel">
    <view v-if="showPanelTitle" class="wd-year-panel__title">{{ title }}</view>
    <scroll-view class="wd-year-panel__container" :style="`height: ${scrollHeight}px`" scroll-y @scroll="yearScroll" :scroll-top="scrollTop">
      <view v-for="(item, index) in years(minDate, maxDate)" :key="index" :id="`year${index}`">
        <year
          class="year"
          :type="type"
          :date="item.date"
          :data-date="item.date"
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
<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref, nextTick } from 'vue'
import { compareYear, formatYearTitle, getYears } from '../utils'
import { getType } from '../../common/util'
import Year from '../year/year.vue'
import { YearInfo } from './type'

interface Props {
  type: string
  value: Array<number> | number | null
  minDate: number
  maxDate: number
  // eslint-disable-next-line @typescript-eslint/ban-types
  formatter?: Function
  maxRange?: number
  rangePrompt?: string
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
const scrollTop = ref<number>(0) // 滚动位置

const scrollIntoViewValue = ref<string>('')

let contentObserver: null | UniApp.IntersectionObserver = null
const instance = getCurrentInstance() as any

// 滚动区域的高度
const scrollHeight = computed(() => {
  const scrollHeight: number = (props.panelHeight || 378) + (props.showPanelTitle ? 26 : 16)
  return scrollHeight
})

const years = computed(() => {
  return (minDate: number, maxDate: number): YearInfo[] => {
    let years = getYears(minDate, maxDate).map((year) => {
      return {
        date: year,
        height: 237
      }
    })
    return years
  }
})

const emit = defineEmits(['change'])

onMounted(() => {
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

    const yearsInfo = years.value(props.minDate, props.maxDate)

    let top: number = 0
    for (let index = 0; index < yearsInfo.length; index++) {
      if (compareYear(yearsInfo[index].date, activeDate) === 0) {
        break
      }
      top += yearsInfo[index] ? Number(yearsInfo[index].height) : 0
    }
    scrollTop.value = 0
    nextTick(() => {
      scrollTop.value = top
    })
  })
}

const yearScroll = (e: Event) => {
  const yearsInfo = years.value(props.minDate, props.maxDate)
  if (yearsInfo.length <= 1) {
    return
  }
  const scrollTop = Math.max(0, (e.target as Element).scrollTop)
  doSetSubtitle(scrollTop, yearsInfo)
}

/**
 * 设置小标题
 * scrollTop 滚动条位置
 */
function doSetSubtitle(scrollTop: number, yearsInfo: YearInfo[]) {
  let height: number = 0 // 月份高度和
  for (let index = 0; index < yearsInfo.length; index++) {
    height = height + yearsInfo[index].height
    if (scrollTop < height + 45) {
      title.value = formatYearTitle(yearsInfo[index].date)
      return
    }
  }
}

function handleDateChange({ value }) {
  emit('change', {
    value
  })
}

defineExpose({
  scrollIntoView
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
