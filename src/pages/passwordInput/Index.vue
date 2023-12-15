<template>
  <page-wraper>
    <demo-block title="基本用法" transparent>
      <wd-password-input v-model="value1" :focused="currentFocusedKey === 1" @focus="currentFocusedKey = 1" />
    </demo-block>
    <demo-block title="自定义长度" transparent>
      <wd-password-input v-model="value2" :length="4" :focused="currentFocusedKey === 2" @focus="currentFocusedKey = 2" />
    </demo-block>
    <demo-block title="限制最大最小值" transparent>
      <wd-password-input v-model="value3" :gutter="10" :focused="currentFocusedKey === 3" @focus="currentFocusedKey = 3" />
    </demo-block>
    <demo-block title="明文展示" transparent>
      <wd-password-input v-model="value4" :mask="false" :focused="currentFocusedKey === 4" @focus="currentFocusedKey = 4" />
    </demo-block>
    <demo-block title="提示信息" transparent>
      <wd-password-input
        v-model="value5"
        info="密码为 6 位数字"
        :error-info="errorInfo"
        :focused="currentFocusedKey === 5"
        @focus="currentFocusedKey = 5"
      />
    </demo-block>
    <!-- <wd-number-keyboard v-model:visible="visible" @input="onInput" @delete="onDelete"></wd-number-keyboard> -->
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'

const value1 = ref<string>('123')
const value2 = ref<string>('123')
const value3 = ref<string>('123')
const value4 = ref<string>('123')
const value5 = ref<string>('123')
const errorInfo = ref<string>('')

const currentFocusedKey = ref<number>(1)

// const visible = ref<boolean>(true)

watch(value5, (newVal) => {
  if (newVal.length === 6 && newVal !== '123456') {
    errorInfo.value = '密码错误'
  } else {
    errorInfo.value = ''
  }
})
</script>
<style lang="scss" scoped></style>
