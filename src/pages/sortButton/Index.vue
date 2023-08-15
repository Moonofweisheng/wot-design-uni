<template>
  <page-wraper>
    <demo-block title="基础用法">
      <wd-sort-button v-model="value1" title="价格" @change="handleChange1" />
    </demo-block>

    <demo-block title="设置 allow-reset 允许重置按钮">
      <wd-sort-button v-model="value2" title="价格" allow-reset @change="handleChange2" />
    </demo-block>

    <demo-block title="设置 desc-first 优先切换为降序">
      <wd-sort-button v-model="value3" title="价格" desc-first @change="handleChange3" />
    </demo-block>

    <demo-block title="不展示下划线（当只有一个排序按钮时，应取消展示下划线）">
      <wd-sort-button v-model="value4" title="价格" :line="false" @change="handleChange4" />
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<number>(0)
const value2 = ref<number>(0)
const value3 = ref<number>(0)
const value4 = ref<number>(0)

function handleChange1({ value }) {
  console.log(value)
}
function handleChange2({ value }) {
  console.log(value)
}
function handleChange3({ value }) {
  console.log(value)
}
function handleChange4({ value }) {
  console.log(value)
}
</script>
<style lang="scss" scoped></style>
