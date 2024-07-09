<template>
  <page-wraper>
    <demo-block title="基本用法">
      <wd-statistic prefix="今日：" color="#36B8C2" endVal="230.122" :decimals="2" :duration="5000" suffix="%" />
    </demo-block>

    <demo-block title="prefix 前缀插槽">
      <wd-statistic prefix="今日：" />
    </demo-block>

    <demo-block title="suffix 后缀插槽">
      <wd-statistic suffix="%" />
    </demo-block>

    <demo-block title="ref方法">
      <wd-statistic :autoplay="false" endVal="8888" ref="refStatistic" />
      <wd-row>
        <wd-col :span="8"><wd-button @click="clickStart" size="small" block :gutter="10">开始</wd-button></wd-col>
        <wd-col :span="8"><wd-button @click="clickReset" size="small" block :gutter="10">重置</wd-button></wd-col>
        <wd-col :span="8"><wd-button @click="clickPause" size="small" block :gutter="10">暂停</wd-button></wd-col>
      </wd-row>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const refStatistic = ref()

function clickStart() {
  refStatistic.value.start()
}
function clickReset() {
  refStatistic.value.reset()
}
function clickPause() {
  refStatistic.value.pause()
}
</script>
<style lang="scss" scoped></style>
