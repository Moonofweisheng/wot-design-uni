<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <wd-input-number v-model="value1" @change="handleChange1" />
    </demo-block>
    <demo-block :title="$t('she-zhi-bu-chang')">
      <wd-input-number v-model="value2" @change="handleChange2" :step="2" />
    </demo-block>
    <demo-block :title="$t('xian-zhi-zui-da-zui-xiao-zhi')">
      <wd-input-number v-model="value3" @change="handleChange3" :min="3" :max="10" />
    </demo-block>
    <demo-block :title="$t('jinYong')">
      <wd-input-number v-model="value4" @change="handleChange4" disabled />
    </demo-block>
    <demo-block :title="$t('jin-yong-shu-ru-kuang')">
      <wd-input-number v-model="value10" @change="handleChange4" disable-input />
    </demo-block>
    <demo-block :title="$t('wu-shu-ru-kuang')">
      <view class="flex">
        <view>{{ $t('shu-liang-value5') }}{{ value5 }}</view>
        <wd-input-number v-model="value5" @change="handleChange5" without-input />
      </view>
    </demo-block>
    <demo-block :title="$t('she-zhi-xiao-shu-jing-du')">
      <wd-input-number v-model="value6" @change="handleChange6" :precision="1" :step="0.1" />
    </demo-block>
    <demo-block :title="$t('shu-ru-yan-ge-wei-bu-shu-de-bei-shu')">
      <wd-input-number v-model="value7" @change="handleChange7" step-strictly :step="2" />
    </demo-block>
    <demo-block :title="$t('xiu-gai-shu-ru-kuang-kuan-du')">
      <wd-input-number v-model="value8" input-width="70px" @change="handleChange8" />
    </demo-block>
    <demo-block :title="$t('yun-xu-kong-zhi-bing-she-zhi-placeholder')">
      <wd-input-number v-model="value9" allow-null :placeholder="$t('bu-xian')" input-width="70px" @change="handleChange9" />
    </demo-block>
    <demo-block :title="$t('yi-bu-bian-geng')">
      <wd-input-number v-model="value11" :before-change="beforeChange" />
    </demo-block>
    <demo-block :title="$t('chang-an-jia-jian')">
      <wd-input-number v-model="value12" long-press @change="handleChange12" />
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { InputNumberBeforeChange } from '@/uni_modules/wot-design-uni/components/wd-input-number/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { loading, close } = useToast()
const { t } = useI18n()

const value1 = ref<number>(1)
const value2 = ref<number>(1)
const value3 = ref<number>(1)
const value4 = ref<number>(2)
const value5 = ref<number>(1)
const value6 = ref<string>('1.2')
const value7 = ref<number>(1)
const value8 = ref<number>(2)
const value9 = ref<string>('')
const value10 = ref<number>(1)
const value11 = ref<number>(1)
const value12 = ref<number>(1)

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
function handleChange5({ value }: any) {
  console.log(value)
}
function handleChange6({ value }: any) {
  console.log(value)
}
function handleChange7({ value }: any) {
  console.log(value)
}
function handleChange8({ value }: any) {
  console.log(value)
}
function handleChange9({ value }: any) {
  console.log(value)
}
function handleChange12({ value }: any) {
  console.log(value)
}

const beforeChange: InputNumberBeforeChange = (value) => {
  loading({ msg: t('zheng-zai-geng-xin-dao-value') + value })
  return new Promise((resolve) => {
    setTimeout(() => {
      close()
      resolve(true)
    }, 500)
  })
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
