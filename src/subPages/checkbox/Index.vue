<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <wd-checkbox v-model="check1">{{ $t('wo-te') }}</wd-checkbox>
    </demo-block>

    <demo-block :title="$t('xiu-gai-xing-zhuang-square')">
      <wd-checkbox v-model="check2" shape="square">{{ $t('wo-te') }}</wd-checkbox>
    </demo-block>

    <demo-block :title="$t('xiu-gai-xing-zhuang-button')">
      <wd-checkbox v-model="check3" shape="button">{{ $t('wo-te') }}</wd-checkbox>
    </demo-block>

    <demo-block :title="$t('xiu-gai-xuan-zhong-yan-se')">
      <wd-checkbox v-model="check4" checked-color="rgb(52, 209, 157)">{{ $t('wo-te') }}</wd-checkbox>
    </demo-block>

    <demo-block :title="$t('jin-yong-zhuang-tai')">
      <view style="margin-bottom: 10px">
        <wd-checkbox-group v-model="value1" disabled>
          <wd-checkbox :modelValue="1">{{ $t('wo-te') }}</wd-checkbox>
          <wd-checkbox :modelValue="2" :disabled="false">{{ $t('shang-jia-hou-tai') }}</wd-checkbox>
          <wd-checkbox :modelValue="3" shape="square">{{ $t('wo-te') }}</wd-checkbox>
          <wd-checkbox :modelValue="4" shape="square">{{ $t('shang-jia-hou-tai') }}</wd-checkbox>
        </wd-checkbox-group>
      </view>
      <wd-checkbox-group v-model="value2" disabled>
        <wd-checkbox :modelValue="1" shape="button">{{ $t('wo-te') }}</wd-checkbox>
        <wd-checkbox :modelValue="2" shape="button">{{ $t('shang-jia-hou-tai') }}</wd-checkbox>
      </wd-checkbox-group>
    </demo-block>

    <demo-block :title="$t('xiu-gai-truevalue-he-falsevalue-value3') + value3">
      <wd-checkbox v-model="value3" :true-value="$t('wo-te')" :false-value="$t('shang-jia-hou-tai')" @change="handleChange1">
        {{ $t('fu-xuan-kuang') }}
      </wd-checkbox>
    </demo-block>

    <demo-block :title="$t('tong-hang-zhan-shi')">
      <wd-checkbox-group v-model="value4" inline>
        <wd-checkbox :modelValue="1">{{ $t('wo-te') }}</wd-checkbox>
        <wd-checkbox :modelValue="2">{{ $t('shang-jia-hou-tai') }}</wd-checkbox>
      </wd-checkbox-group>
    </demo-block>

    <demo-block :title="$t('fu-xuan-kuang-zu')">
      <wd-checkbox-group v-model="value5">
        <wd-checkbox :modelValue="1">{{ $t('wo-te') }}</wd-checkbox>
        <wd-checkbox :modelValue="2">{{ $t('shang-jia-hou-tai') }}</wd-checkbox>
      </wd-checkbox-group>
    </demo-block>

    <demo-block :title="$t('biao-dan-mo-shi-fu-xuan-kuang-zu')" transparent>
      <wd-checkbox-group v-model="value6" cell>
        <wd-checkbox :modelValue="1">{{ $t('wo-te') }}</wd-checkbox>
        <wd-checkbox :modelValue="2">{{ $t('shang-jia-hou-tai') }}</wd-checkbox>
      </wd-checkbox-group>
    </demo-block>

    <demo-block :title="$t('biao-dan-mo-shi-fu-xuan-kuang-an-niu-zu')" transparent>
      <wd-checkbox-group v-model="value7" cell shape="button">
        <wd-checkbox :modelValue="1" disabled>{{ $t('xuan-xiang-yi') }}</wd-checkbox>
        <wd-checkbox :modelValue="2">{{ $t('xuan-xiang-er') }}</wd-checkbox>
        <wd-checkbox :modelValue="3">{{ $t('xuan-xiang-san') }}</wd-checkbox>
        <wd-checkbox :modelValue="4">{{ $t('xuan-xiang-si') }}</wd-checkbox>
        <wd-checkbox :modelValue="5">{{ $t('xuan-xiang-wu') }}</wd-checkbox>
        <wd-checkbox :modelValue="6">{{ $t('xuan-xiang-liu') }}</wd-checkbox>
        <wd-checkbox :modelValue="7">{{ $t('xuan-xiang-qi') }}</wd-checkbox>
      </wd-checkbox-group>
    </demo-block>

    <demo-block :title="$t('she-zhi-zui-xiao-xuan-zhong-shu-liang-he-zui-da-xuan-zhong-shu-liang')" transparent>
      <wd-checkbox-group v-model="value8" :min="1" :max="3" cell>
        <wd-checkbox :modelValue="1">{{ $t('jing-dong') }}</wd-checkbox>
        <wd-checkbox :modelValue="2">{{ $t('wo-te') }}</wd-checkbox>
        <wd-checkbox :modelValue="3">{{ $t('shang-jia-hou-tai') }}</wd-checkbox>
        <wd-checkbox :modelValue="4">{{ $t('ying-xiao-zhong-xin') }}</wd-checkbox>
      </wd-checkbox-group>
    </demo-block>

    <demo-block :title="$t('da-chi-cun')">
      <wd-checkbox-group v-model="value9" inline size="large">
        <wd-checkbox modelValue="jingmai">{{ $t('wo-te') }}</wd-checkbox>
        <wd-checkbox modelValue="shop">{{ $t('shang-jia-hou-tai') }}</wd-checkbox>
      </wd-checkbox-group>
      <wd-checkbox-group v-model="value10" size="large" class="group">
        <wd-checkbox modelValue="jingmai">{{ $t('wo-te') }}</wd-checkbox>
        <wd-checkbox modelValue="shop">{{ $t('shang-jia-hou-tai') }}</wd-checkbox>
      </wd-checkbox-group>
    </demo-block>

    <demo-block :title="$t('jie-he-cell-shi-yong')" transparent>
      <wd-cell-group border>
        <wd-checkbox-group v-model="value10" size="large">
          <wd-cell :title="$t('dian-zan')" center clickable @click="handleCheck1">
            <view @click.stop="noop">
              <wd-checkbox model-value="1" ref="checkBox1" custom-style="margin:0;"></wd-checkbox>
            </view>
          </wd-cell>
          <wd-cell :title="$t('tou-bi')" center clickable @click="handleCheck2">
            <view @click.stop="noop">
              <wd-checkbox model-value="2" ref="checkBox2" custom-style="margin:0;"></wd-checkbox>
            </view>
          </wd-cell>
          <wd-cell :title="$t('yi-jian-san-lian')" center clickable @click="handleCheck3">
            <view @click.stop="noop">
              <wd-checkbox model-value="3" ref="checkBox3" custom-style="margin:0;"></wd-checkbox>
            </view>
          </wd-cell>
        </wd-checkbox-group>
      </wd-cell-group>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import type { CheckboxInstance } from '@/uni_modules/wot-design-uni/components/wd-checkbox/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const checkBox1 = ref<CheckboxInstance>()
const checkBox2 = ref<CheckboxInstance>()
const checkBox3 = ref<CheckboxInstance>()

function handleCheck1() {
  checkBox1.value && checkBox1.value.toggle()
}

function handleCheck2() {
  checkBox2.value && checkBox2.value.toggle()
}
function handleCheck3() {
  checkBox3.value && checkBox3.value.toggle()
}

function noop() {}

const check1 = ref<boolean>(true)
const check2 = ref<boolean>(true)
const check3 = ref<boolean>(true)
const check4 = ref<boolean>(true)
const check5 = ref<boolean>(true)
const check6 = ref<boolean>(true)

const value0 = ref<number[]>([1, 2, 3])

const value1 = ref<number[]>([1, 3])
const value2 = ref<number[]>([1])
const value3 = ref<string>(t('wo-te-12'))

const value4 = ref<number[]>([1])
const value5 = ref<number[]>([])

const value6 = ref<number[]>([1])
const value7 = ref<number[]>([1])
const value8 = ref<number[]>([1])
const value9 = ref<string[]>([])
const value10 = ref<string[]>([])

function handleChange1(e: any) {
  console.log(e)
}
</script>
<style lang="scss" scoped>
.group {
  display: block;
  margin-top: 10px;
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
