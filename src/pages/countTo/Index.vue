<template>
  <page-wraper>
    <demo-block title="基本用法">
      <wd-count-to :endVal="endVal" suffix="年" color="#16baaa"></wd-count-to>
      <wd-count-to prefix="￥" :decimals="2" :endVal="186.321" :fontSize="32" suffix="%" color="#1e9fff"></wd-count-to>
      <wd-count-to prefix="￥" :decimals="2" :endVal="21286.321" :fontSize="32" suffix="%" color="#ff5722"></wd-count-to>
      <wd-count-to prefix="￥" :decimals="2" :endVal="21286.321" :fontSize="32" suffix="%" color="#ffb800" :duration="2000"></wd-count-to>
    </demo-block>

    <demo-block title="设置主题">
      <wd-count-to type="primary" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
      <wd-count-to type="error" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
      <wd-count-to type="success" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
      <wd-count-to type="warning" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
      <wd-count-to prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
    </demo-block>

    <demo-block title="手动控制">
      <wd-count-to
        ref="countTo"
        :auto-start="false"
        prefix="￥"
        :startVal="1000"
        :decimals="3"
        :endVal="9999.32"
        :fontSize="32"
        suffix="%"
        color="#1e9fff"
      ></wd-count-to>

      <wd-grid clickable border>
        <wd-grid-item text="开始" icon="play-circle-stroke" @itemclick="start" />
        <wd-grid-item text="暂停" icon="pause-circle" @itemclick="pause" />
        <wd-grid-item text="重置" icon="refresh" @itemclick="reset" />
      </wd-grid>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import type { CountToInstance } from '@/uni_modules/wot-design-uni/components/wd-count-to/types'
import { ref } from 'vue'

const endVal = ref<number>(2024)
const countTo = ref<CountToInstance>()

const start = () => {
  countTo.value!.start()
}
const pause = () => {
  countTo.value!.pause()
}
const reset = () => {
  countTo.value!.reset()
}
</script>
<style lang="scss" scoped></style>
