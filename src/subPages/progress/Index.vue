<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <wd-progress :percentage="percentageZero" />
    </demo-block>

    <demo-block :title="$t('bu-xian-shi-jin-du-wen-zi')">
      <wd-progress :percentage="60" hide-text />
    </demo-block>

    <demo-block :title="$t('jin-du-tiao-zhuang-tai')">
      <wd-progress :percentage="100" hide-text status="success" />
      <wd-progress :percentage="80" hide-text status="danger" />
      <wd-progress :percentage="90" hide-text status="warning" />
    </demo-block>

    <demo-block :title="$t('xiu-gai-yan-se')">
      <wd-progress :percentage="80" color="#00c740" />
    </demo-block>

    <demo-block :title="$t('yan-se-shu-zu')">
      <wd-progress :percentage="100" :color="['#00c740', '#ffb300', '#e2231a', '#0083ff']" />
      <wd-progress :percentage="percentage" :color="colorObject" />
    </demo-block>

    <demo-block :title="$t('dong-tai-she-zhi')">
      <wd-progress :percentage="percentageDynamic" />
      <wd-button custom-style="margin-right: 10px;" @click="add" type="success" size="small">+10</wd-button>
      <wd-button @click="reduce" type="error" size="small">-10</wd-button>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import type { ProgressColor } from '@/uni_modules/wot-design-uni/components/wd-progress/types'
import { ref } from 'vue'

const percentageZero = ref<number>(30)
const percentage = ref<number>(100)

// 动态进度 变量
const percentageDynamic = ref<number>(50)

// 动态变量加10
const add = () => {
  percentageDynamic.value = Math.min(percentageDynamic.value + 10, 100)
}

// 动态变量减10
const reduce = () => {
  percentageDynamic.value = Math.max(percentageDynamic.value - 10, 0)
}

const colorObject = ref<ProgressColor[]>([
  {
    color: 'yellow',
    percentage: 30
  },
  {
    color: 'red',
    percentage: 60
  },
  {
    color: 'blue',
    percentage: 80
  },
  {
    color: 'black',
    percentage: 90
  }
])
</script>
<style lang="scss" scoped></style>
