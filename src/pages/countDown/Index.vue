<!--
 * @Author: weisheng
 * @Date: 2024-08-09 10:12:54
 * @LastEditTime: 2024-08-09 13:10:34
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\pages\countDown\Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <demo-block title="基本用法">
      <wd-count-down :time="time" />
    </demo-block>

    <demo-block title="自定义格式">
      <wd-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
    </demo-block>

    <demo-block title="毫秒级渲染">
      <wd-count-down :time="time" millisecond format="HH:mm:ss:SS" />
    </demo-block>

    <demo-block title="自定义样式">
      <wd-count-down :time="time">
        <template #default="{ current }">
          <span class="custom-count-down">{{ current.hours }}</span>
          <span class="custom-count-down-colon">:</span>
          <span class="custom-count-down">{{ current.minutes }}</span>
          <span class="custom-count-down-colon">:</span>
          <span class="custom-count-down">{{ current.seconds }}</span>
        </template>
      </wd-count-down>
    </demo-block>

    <demo-block title="手动控制">
      <wd-count-down ref="countDown" :time="3000" millisecond :auto-start="false" format="ss:SSS" @finish="onFinish"></wd-count-down>
      <wd-grid clickable border>
        <wd-grid-item text="开始" icon="play-circle-stroke" @itemclick="start" />
        <wd-grid-item text="暂停" icon="pause-circle" @itemclick="pause" />
        <wd-grid-item text="重置" icon="refresh" @itemclick="reset" />
      </wd-grid>
    </demo-block>
    <wd-toast></wd-toast>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { CountDownInstance } from '@/uni_modules/wot-design-uni/components/wd-count-down/types'
import { ref } from 'vue'
const { show: showToast } = useToast()

const time = ref(30 * 60 * 60 * 1000)

const countDown = ref<CountDownInstance>()

const start = () => {
  countDown.value!.start()
}
const pause = () => {
  countDown.value!.pause()
}
const reset = () => {
  countDown.value!.reset()
}
const onFinish = () => showToast('倒计时结束')
</script>
<style lang="scss" scoped>
.custom-count-down {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #f0883a;
  border-radius: 2px;
}

.custom-count-down-colon {
  display: inline-block;
  margin: 0 4px;
  color: #f0883a;
}
</style>
