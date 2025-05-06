<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <wd-rate v-model="value1" @change="changeValue1" />
    </demo-block>

    <demo-block :title="$t('zhi-du-zhuang-tai-readonly')">
      <wd-rate v-model="value2" readonly />
    </demo-block>

    <demo-block :title="$t('jin-yong-zhuang-tai')">
      <wd-rate v-model="value3" disabled />
    </demo-block>

    <demo-block :title="$t('xiu-gai-xuan-zhong-yan-se')">
      <view style="margin-bottom: 10px">
        <wd-rate v-model="value4" active-color="linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)" @change="changeValue2" />
      </view>
      <wd-rate
        v-model="value5"
        :active-color="[
          'linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)',
          'linear-gradient(315deg, rgba(245,34,34,1) 0%,rgba(255,117,102,1) 100%)'
        ]"
      />
    </demo-block>

    <demo-block :title="$t('xiu-gai-icon-he-xuan-zhong-yan-se')">
      <wd-rate v-model="value6" icon="dong" active-icon="dong" active-color="#4D80F0" />
    </demo-block>

    <demo-block :title="$t('xiu-gai-sizespace')">
      <wd-rate v-model="value7" space="10px" size="30px" />
    </demo-block>

    <demo-block :title="$t('yun-xu-ban-xuan')">
      <wd-rate v-model="value8" allow-half />
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<number>(5)
const value2 = ref<number>(3)
const value3 = ref<number>(2)
const value4 = ref<number>(3)
const value5 = ref<number>(4)
const value6 = ref<number>(3)
const value7 = ref<number>(5)
const value8 = ref<number>(2.5)

function changeValue1({ value }: any) {
  console.log(value)
}
function changeValue2({ value }: any) {
  console.log(value)
}
</script>
