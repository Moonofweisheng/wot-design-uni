<template>
  <page-wraper>
    <wd-message-box></wd-message-box>
    <view>
      <demo-block :title="$t('jiBenYongFa')">
        <wd-switch v-model="checked1" @change="handleChange1" />
      </demo-block>
      <demo-block :title="$t('xiu-gai-zhi-activevalue-inactivevalue')">
        <view style="margin-bottom: 10px">{{ checked2 }}</view>
        <wd-switch v-model="checked2" active-value="沃特" inactive-value="商家后台" @change="handleChange2" />
      </demo-block>
      <demo-block :title="$t('zi-ding-yi-yan-se-activecolor-inactivecolor')">
        <wd-switch v-model="checked3" active-color="#13ce66" inactive-color="#f00" @change="handleChange3" />
      </demo-block>
      <demo-block :title="$t('zi-ding-yi-da-xiao')">
        <wd-switch v-model="checked4" :size="24" @change="handleChange4" />
      </demo-block>
      <demo-block :title="$t('xuan-zhong-jin-yong')">
        <wd-switch v-model="checked5" disabled />
      </demo-block>
      <demo-block :title="$t('fei-xuan-zhong-jin-yong')">
        <wd-switch v-model="checked6" disabled />
      </demo-block>
      <demo-block :title="$t('beforechange-xiu-gai-qian-gou-zi-han-shu')">
        <wd-switch v-model="checked7" :before-change="beforeChange" @change="handleChange5" />
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-design-uni'
import type { SwitchBeforeChange } from '@/uni_modules/wot-design-uni/components/wd-switch/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const checked1 = ref<boolean>(true)
const checked2 = ref<string>(t('wo-te'))
const checked3 = ref<boolean>(true)
const checked4 = ref<boolean>(true)
const checked5 = ref<boolean>(true)
const checked6 = ref<boolean>(false)
const checked7 = ref<boolean>(false)

const message = useMessage()

const beforeChange: SwitchBeforeChange = ({ value, resolve }) => {
  message
    .confirm(t('shi-fou-qie-huan-kai-guan'))
    .then(() => {
      resolve(true)
    })
    .catch(() => {
      resolve(false)
    })
}
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
</script>
<style lang="scss" scoped>
page {
  background-color: #ededed;
}
.row {
  margin: 10px 0;
  padding: 0 10px;
  background: rgb(255, 255, 255);
}
.desc {
  padding: 0 15px;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
}
.code {
  color: rgb(0, 131, 255);
  white-space: nowrap;
  font-size: 0.8em;
  background-color: rgb(248, 248, 248);
  -webkit-font-smoothing: initial;
  padding: 1px 2px;
  margin: 0 2px;
  border-radius: 2px;
}
.center {
  text-align: center;
  padding-bottom: 10px;
}
.test {
  color: red;
}
</style>
