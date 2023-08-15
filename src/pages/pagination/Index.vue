<template>
  <page-wraper>
    <demo-block title="基本用法" transparent>
      <wd-pagination v-model="page1" :total="total1" @change="handleChange1"></wd-pagination>
    </demo-block>
    <demo-block title="Icon图标" transparent>
      <wd-pagination v-model="page2" :total="total2" show-icon @change="handleChange2"></wd-pagination>
    </demo-block>
    <demo-block title="文字提示" transparent>
      <wd-pagination v-model="page3" :total="total3" :page-size="pageSize3" @change="handleChange3" show-icon show-message></wd-pagination>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const page1 = ref<number>(1)
const total1 = ref<number>(190)
const page2 = ref<number>(1)
const total2 = ref<number>(19)
const page3 = ref<number>(1)
const total3 = ref<number>(160)
const pageSize3 = ref<number>(20)

function handleChange1({ value }) {
  console.log(value)
}
function handleChange2({ value }) {
  console.log(value)
}
function handleChange3({ value }) {
  console.log(value)
}
</script>
<style lang="scss" scoped>
.button-block {
  margin-right: 0;
}
</style>
