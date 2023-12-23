<template>
  <page-wraper>
    <view class="password-input">
      <demo-block title="基本用法" transparent>
        <wd-password-input v-model="value1" :focused="visible1" @focus="showKeyBoard(1)" />
        <wd-number-keyboard v-model:visible="visible1" v-model="value1" :maxlength="6"></wd-number-keyboard>
      </demo-block>
      <demo-block title="自定义长度" transparent>
        <wd-password-input v-model="value2" :length="4" :focused="visible2" @focus="showKeyBoard(2)" />
        <wd-number-keyboard v-model:visible="visible2" v-model="value2" :maxlength="4"></wd-number-keyboard>
      </demo-block>
      <demo-block title="限制最大最小值" transparent>
        <wd-password-input v-model="value3" :gutter="10" :focused="visible3" @focus="showKeyBoard(3)" />
        <wd-number-keyboard v-model:visible="visible3" v-model="value3" :maxlength="6"></wd-number-keyboard>
      </demo-block>
      <demo-block title="明文展示" transparent>
        <wd-password-input v-model="value4" :mask="false" :focused="visible4" @focus="showKeyBoard(4)" />
        <wd-number-keyboard v-model:visible="visible4" v-model="value4" :maxlength="6"></wd-number-keyboard>
      </demo-block>
      <demo-block title="提示信息" transparent>
        <wd-password-input v-model="value5" info="密码为 6 位数字" :error-info="errorInfo" :focused="visible5" @focus="showKeyBoard(5)" />
        <wd-number-keyboard v-model:visible="visible5" v-model="value5" :maxlength="6"></wd-number-keyboard>
      </demo-block>
    </view>
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

const visible1 = ref<boolean>(true)
const visible2 = ref<boolean>(false)
const visible3 = ref<boolean>(false)
const visible4 = ref<boolean>(false)
const visible5 = ref<boolean>(false)

const visibleArr = [visible1, visible2, visible3, visible4, visible5]

function showKeyBoard(index: number) {
  visibleArr.forEach((item, i) => (i === index - 1 ? (item.value = true) : (item.value = false)))
}

watch(value5, (newVal) => {
  if (newVal.length === 6 && newVal !== '123456') {
    errorInfo.value = '密码错误'
  } else {
    errorInfo.value = ''
  }
})
</script>
<style lang="scss" scoped>
.password-input {
  padding-bottom: 240px;
}
</style>
