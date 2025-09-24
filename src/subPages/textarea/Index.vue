<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')" transparent>
      <wd-textarea v-model="value1" :placeholder="$t('qing-tian-xie-ping-jia')" />
    </demo-block>
    <demo-block :title="$t('zhi-du')" transparent>
      <wd-textarea v-model="value8" readonly clearable></wd-textarea>
    </demo-block>
    <demo-block :title="$t('jinYong')" transparent>
      <wd-textarea v-model="value11" disabled clearable></wd-textarea>
    </demo-block>
    <demo-block :title="$t('qing-kong-an-niu-he-zi-shu-xian-zhi')" transparent>
      <wd-textarea v-model="value2" :maxlength="120" clearable show-word-limit />
    </demo-block>
    <demo-block :title="$t('you-zhi-qie-ju-jiao-shi-zhan-shi-qing-kong-an-niu')" transparent>
      <wd-textarea clear-trigger="focus" v-model="value14" :maxlength="120" clearable show-word-limit />
    </demo-block>
    <demo-block :title="$t('dian-ji-qing-chu-an-niu-shi-bu-zi-dong-ju-jiao')" transparent>
      <wd-textarea v-model="value15" :focus-when-clear="false" :maxlength="120" clearable show-word-limit />
    </demo-block>
    <demo-block :title="$t('da-chi-cun')" transparent>
      <wd-textarea v-model="value7" size="large" :maxlength="120" clearable show-word-limit></wd-textarea>
    </demo-block>
    <demo-block :title="$t('gao-du-zi-shi-ying')">
      <wd-textarea v-model="value3" auto-height clearable></wd-textarea>
    </demo-block>

    <demo-block :title="$t('cell-lei-xing')" transparent>
      <wd-cell-group border>
        <wd-textarea
          :label="$t('gao-du-zi-shi-ying-0')"
          auto-height
          clearable
          v-model="value5"
          :placeholder="$t('qing-shu-ru-0')"
          prefix-icon="location"
        />
        <wd-textarea :label="$t('qing-kong-an-niu')" clearable v-model="value4" :placeholder="$t('qing-shu-ru-0')" required />

        <wd-textarea
          :label="$t('bi-tian-xing-hao-zai-you-ce')"
          clearable
          v-model="value16"
          :placeholder="$t('qing-shu-ru-0')"
          required
          marker-side="after"
        />
        <wd-textarea
          :label="$t('zi-shu-xian-zhi-0')"
          :maxlength="240"
          clearable
          show-word-limit
          v-model="value6"
          :placeholder="$t('qing-shu-ru-0')"
          required
        />
        <wd-textarea
          :label="$t('zhi-du')"
          readonly
          clearable
          :maxlength="240"
          show-word-limit
          v-model="value12"
          :placeholder="$t('qing-shu-ru-0')"
          required
        />
        <wd-textarea
          :label="$t('jinYong')"
          disabled
          clearable
          :maxlength="240"
          show-word-limit
          v-model="value13"
          :placeholder="$t('qing-shu-ru-0')"
          required
        />
      </wd-cell-group>
    </demo-block>

    <demo-block :title="$t('da-chi-cun')" transparent>
      <wd-cell-group border>
        <wd-textarea
          :label="$t('gao-du-zi-shi-ying-1')"
          auto-height
          size="large"
          clearable
          v-model="value9"
          :placeholder="$t('qing-shu-ru-0')"
          required
        />
        <wd-textarea
          :label="$t('zi-shu-xian-zhi-0')"
          size="large"
          :maxlength="240"
          clearable
          show-word-limit
          v-model="value10"
          :placeholder="$t('qing-shu-ru-0')"
          required
        />
      </wd-cell-group>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const value1 = ref<string>('')
const value2 = ref<string>(t('zhi-chi-qing-kong-he-zi-shu-xian-zhi-de-wen-ben-yu'))
const value3 = ref<string>(t('shu-ru-wen-zi-hou-shu-ru-kuang-gao-du-gen-sui-zi-shu-duo-shao-bian-hua'))
const value4 = ref<string>('')
const value5 = ref<string>('')
const value6 = ref<string>('')
const value7 = ref<string>('')
const value8 = ref<string>(t('zhi-du-zhi-du-zhi-du'))
const value9 = ref<string>('')
const value10 = ref<string>('')
const value11 = ref<string>(t('jin-yong-jin-yong-jin-yong'))
const value12 = ref<string>(t('zhi-du-zhi-du-zhi-du-0'))
const value13 = ref<string>(t('jin-yong-jin-yong-jin-yong-0'))
const value14 = ref<string>('')
const value15 = ref<string>('')
const value16 = ref<string>('')
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .custom-txt {
    color: $-dark-color;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.suffix-slot {
  display: inline-block;
  height: 37px;
  line-height: 37px;
  margin-left: 8px;
  vertical-align: middle;
}
:deep(.button) {
  margin-left: 8px;
  vertical-align: middle;
}
</style>
