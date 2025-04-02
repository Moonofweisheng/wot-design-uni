<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <view>
        {{
          $t(
            '1-nei-rong-xiang-zai-3-xiang-yi-nei-qie-you-bi-jiao-zhong-yao-de-xin-xi-bei-xuan-ru-fu-kuan-lei-xing-xuan-ze-deng-ke-kao-lv-cai-yong-yuan-xing-zu-jian-yin-wei-hui-gen-yuan-xing-fu-xuan-kuang-rong-yi-hun-xiao-qie-hui-zao-cheng-dang-qian-biao-dan-ye-ye-mian-jie-gou-bu-tong-yi'
          )
        }}
        <text style="color: #f0883a">{{ $t('yi-ban-qing-kuang-bu-jian-yi-shi-yong-dian-zhuang-dan-xuan') }}</text>
      </view>
      <view style="margin-bottom: 10px">
        {{ $t('2-dan-xuan-kuang-ji-ben-shi-yong-wei-dui-gao-du-jin-hang-kuo-chong') }}
        <text style="color: #f0883a">{{ $t('yi-ban-qing-kuang-jian-yi-shi-yong-biao-dan-dan-xuan-zu') }}</text>
      </view>
      <wd-radio-group v-model="value0" @change="change">
        <wd-radio :value="1">{{ $t('dan-xuan-kuang-1') }}</wd-radio>
        <wd-radio :value="2">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
      </wd-radio-group>
    </demo-block>

    <demo-block :title="$t('xiu-gai-xing-zhuang-button-0')">
      <wd-radio-group shape="button" v-model="value1" @change="change">
        <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
        <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
      </wd-radio-group>
    </demo-block>

    <demo-block :title="$t('xiu-gai-xing-zhuang-dot')">
      <wd-radio-group shape="dot" v-model="value2" @change="change">
        <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
        <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
      </wd-radio-group>
    </demo-block>

    <demo-block :title="$t('biao-dan-dan-xuan-zu')" transparent>
      <wd-radio-group cell v-model="value3" @change="change">
        <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
        <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
      </wd-radio-group>
    </demo-block>

    <demo-block :title="$t('biao-dan-dan-xuan-an-niu-zu')" transparent>
      <wd-radio-group v-model="value4" cell shape="button">
        <wd-radio :value="1">{{ $t('xuan-xiang-yi') }}</wd-radio>
        <wd-radio :value="2">{{ $t('xuan-xiang-er') }}</wd-radio>
        <wd-radio :value="3">{{ $t('xuan-xiang-san') }}</wd-radio>
        <wd-radio :value="4">{{ $t('xuan-xiang-si') }}</wd-radio>
        <wd-radio :value="5">{{ $t('xuan-xiang-wu') }}</wd-radio>
        <wd-radio :value="6">{{ $t('xuan-xiang-liu') }}</wd-radio>
        <wd-radio :value="7">{{ $t('xuan-xiang-qi') }}</wd-radio>
      </wd-radio-group>
    </demo-block>

    <demo-block :title="$t('tong-hang-zhan-shi')">
      <wd-radio-group v-model="value5" inline>
        <wd-radio :value="1">{{ $t('dan-xuan-kuang-1') }}</wd-radio>
        <wd-radio :value="2">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
      </wd-radio-group>
      <wd-divider dashed></wd-divider>
      <wd-radio-group v-model="value6" inline shape="dot">
        <wd-radio :value="1">{{ $t('dan-xuan-kuang-1') }}</wd-radio>
        <wd-radio :value="2">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
      </wd-radio-group>
      <wd-divider dashed></wd-divider>
      <wd-radio-group v-model="value13" inline shape="dot" icon-placement="right">
        <wd-radio :value="1">{{ $t('dan-xuan-kuang-1') }}</wd-radio>
        <wd-radio :value="2">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
      </wd-radio-group>
    </demo-block>

    <demo-block :title="$t('xiu-gai-xuan-zhong-yan-se')">
      <wd-radio-group v-model="value7" @change="change" checked-color="#fa4350">
        <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
        <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
      </wd-radio-group>

      <wd-radio-group shape="dot" v-model="value12" @change="change" checked-color="#fa4350">
        <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
        <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
      </wd-radio-group>
    </demo-block>

    <demo-block :title="$t('jinYong')">
      <wd-radio-group v-model="value1" disabled shape="dot">
        <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
        <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
      </wd-radio-group>
      <view class="divider"></view>
      <wd-radio-group v-model="value1" disabled>
        <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
        <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
      </wd-radio-group>
      <view class="divider"></view>
      <wd-radio-group v-model="value1" disabled shape="button">
        <wd-radio :value="1">{{ $t('xuanXiang_1-0') }}</wd-radio>
        <wd-radio :value="2">{{ $t('xuanXiang_2-0') }}</wd-radio>
      </wd-radio-group>
    </demo-block>

    <demo-block :title="$t('da-chi-cun')">
      <wd-radio-group v-model="value8" size="large">
        <wd-radio :value="1">{{ $t('dan-xuan-kuang-1') }}</wd-radio>
        <wd-radio :value="2">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
      </wd-radio-group>
      <view class="divider"></view>
      <wd-radio-group v-model="value9" size="large" shape="dot">
        <wd-radio :value="1">{{ $t('dan-xuan-kuang-1') }}</wd-radio>
        <wd-radio :value="2">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
      </wd-radio-group>
      <view class="divider"></view>
      <wd-radio-group v-model="value10" size="large" inline custom-class="group">
        <wd-radio :value="1">{{ $t('dan-xuan-kuang-1') }}</wd-radio>
        <wd-radio :value="2">{{ $t('dan-xuan-kuang-2') }}</wd-radio>
      </wd-radio-group>
    </demo-block>

    <demo-block :title="$t('radio-de-props-bi-radiogroup-de-you-xian-ji-gao')">
      <wd-radio-group hape="button" disabled checked-color="#fa4350" v-model="value11" @change="change">
        <wd-radio :value="1" checked-color="#000" :disabled="false">{{ $t('xuanXiang_1-0') }}</wd-radio>
        <wd-radio :value="2" :disabled="false">{{ $t('xuanXiang_2-0') }}</wd-radio>
        <wd-radio :value="3">{{ $t('xuanXiang_3-0') }}</wd-radio>
      </wd-radio-group>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<number>(1)
const value0 = ref<number>(1)
const value1 = ref<number>(1)
const value2 = ref<number>(1)
const value3 = ref<number>(1)
const value4 = ref<number>(1)
const value5 = ref<number>(1)
const value6 = ref<number>(1)
const value7 = ref<number>(1)
const value8 = ref<number>(1)
const value9 = ref<number>(1)
const value10 = ref<number>(1)
const value11 = ref<number>(1)
const value12 = ref<number>(1)
const value13 = ref<number>(1)

function change(e: any) {
  console.log(e)
}
</script>
<style lang="scss" scoped>
.divider {
  margin-top: 10px;
  margin-bottom: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
