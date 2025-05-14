<!--
 * @Author: weisheng
 * @Date: 2023-10-10 17:02:32
 * @LastEditTime: 2025-05-13 13:16:42
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/subPages/slider/Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <demo-block :title="$t('ji-chu-yong-fa-0')">
      <wd-slider v-model="value1" />
    </demo-block>
    <demo-block :title="$t('zhi-ding-xuan-ze-fan-wei')">
      <wd-slider v-model="value2" :min="-10" :max="10" />
      <wd-slider v-model="value8" :min="160" :max="280" :step="30" />
    </demo-block>
    <demo-block :title="$t('zhi-ding-bu-chang')">
      <wd-slider v-model="value4" hide-min-max :step="10" />
    </demo-block>
    <demo-block :title="$t('zhi-ding-zui-da-zhi-he-zui-xiao-zhi')">
      <wd-slider v-model="value7" :min="5" :max="50" />
    </demo-block>
    <demo-block :title="$t('jin-yong-zhuang-tai')">
      <wd-slider v-model="value5" disabled />
    </demo-block>
    <demo-block :title="$t('shuang-xiang-hua-kuai')">
      <wd-slider v-model="value6" :min="10" :max="80" />
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<number>(30)
const value2 = ref<number>(479)
const value8 = ref<number>(185)

const value4 = ref<number>(11)
const value5 = ref<number>(70)
const value6 = ref<number[]>([20, 40])
const value7 = ref<number>(20)
</script>

<style lang="css" scoped></style>
