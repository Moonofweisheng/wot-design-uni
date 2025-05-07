<template>
  <page-wraper>
    <demo-block :title="$t('ji-chu-yong-fa-0')">
      <wd-sort-button v-model="value1" :title="$t('jia-ge')" @change="handleChange1" />
    </demo-block>

    <demo-block :title="$t('she-zhi-allowreset-yun-xu-zhong-zhi-an-niu')">
      <wd-sort-button v-model="value2" :title="$t('jia-ge-0')" allow-reset @change="handleChange2" />
    </demo-block>

    <demo-block :title="$t('she-zhi-descfirst-you-xian-qie-huan-wei-jiang-xu')">
      <wd-sort-button v-model="value3" :title="$t('jia-ge-1')" desc-first @change="handleChange3" />
    </demo-block>

    <demo-block :title="$t('bu-zhan-shi-xia-hua-xian-dang-zhi-you-yi-ge-pai-xu-an-niu-shi-ying-qu-xiao-zhan-shi-xia-hua-xian')">
      <wd-sort-button v-model="value4" :title="$t('jia-ge-2')" :line="false" @change="handleChange4" />
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<number>(0)
const value2 = ref<number>(0)
const value3 = ref<number>(0)
const value4 = ref<number>(0)

function handleChange1({ value }: any) {
  console.log(value)
}
function handleChange2({ value }: any) {
  console.log(value)
}
function handleChange3({ value }: any) {
  console.log(value)
}
function handleChange4({ value }: any) {
  console.log(value)
}
</script>
<style lang="scss" scoped></style>
