<template>
  <page-wraper>
    <demo-block title="基本用法">
      <wd-statistic :endVal="endVal" suffix="年" color="#16baaa"></wd-statistic>
    </demo-block>

    <demo-block title="插槽">
      <wd-statistic prefix="￥" :decimals="2" :endVal="186.321" :fontSize="32" suffix="%" color="#1e9fff"></wd-statistic>
      <wd-statistic prefix="￥" :decimals="2" :endVal="21286.321" :fontSize="32" suffix="%" color="#ff5722"></wd-statistic>
      <wd-statistic prefix="￥" :decimals="2" :endVal="21286.321" :fontSize="32" suffix="%" color="#ffb800" :duration="2000"></wd-statistic>
    </demo-block>

    <demo-block title="ref方法">
      <wd-statistic
        ref="refStatistic"
        @callback="endFun"
        prefix="￥"
        :startVal="0"
        :decimals="3"
        :endVal="9999.32"
        :fontSize="32"
        suffix="%"
        color="#1e9fff"
        :duration="3000"
      ></wd-statistic>

      <wd-row :gutter="20">
        <wd-col :span="12"><wd-button block @click="refStatistic.start()">启动动画</wd-button></wd-col>
        <wd-col :span="12"><wd-button block @click="refStatistic.reset()">重置动画</wd-button></wd-col>
      </wd-row>
      <wd-row :gutter="20">
        <wd-col :span="12"><wd-button block @click="refStatistic.pause()">暂停动画</wd-button></wd-col>
        <wd-col :span="12"><wd-button block @click="refStatistic.pauseResume()">切换暂停和恢复状态</wd-button></wd-col>
      </wd-row>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const endVal = ref<number>(2024)
const refStatistic = ref(null)

function endFun() {
  console.log('endFun')
}
</script>
<style lang="scss" scoped></style>
