<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <wd-input
        type="text"
        @input="handleInput"
        v-model="value"
        :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')"
        @change="handleChange"
        @blur="handleBlur"
      />
    </demo-block>
    <demo-block :title="$t('jin-yong-zhuang-tai')">
      <wd-input type="text" @input="handleInput" v-model="value1" disabled />
    </demo-block>
    <demo-block :title="$t('zhi-du-zhuang-tai')">
      <wd-input type="text" @input="handleInput" v-model="value2" readonly />
    </demo-block>
    <demo-block :title="$t('cuo-wu-zhuang-tai-0')">
      <wd-input type="text" @input="handleInput" v-model="value3" :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')" error />
    </demo-block>
    <demo-block :title="$t('qing-kong-an-niu')">
      <wd-input type="text" @input="handleInput" v-model="value4" clearable @change="handleChange1" />
    </demo-block>
    <demo-block :title="$t('you-zhi-qie-ju-jiao-shi-zhan-shi-qing-kong-an-niu')">
      <wd-input type="text" clear-trigger="focus" @input="handleInput" v-model="value20" clearable @change="handleChange1" />
    </demo-block>
    <demo-block :title="$t('dian-ji-qing-chu-an-niu-shi-bu-zi-dong-ju-jiao')">
      <wd-input type="text" :focus-when-clear="false" @input="handleInput" v-model="value21" clearable @change="handleChange1" />
    </demo-block>
    <demo-block :title="$t('mi-ma-kuang')">
      <wd-input type="text" @input="handleInput" v-model="value5" clearable show-password @change="handleChange2" />
    </demo-block>
    <demo-block :title="$t('shu-zi-lei-xing')">
      <wd-input type="number" @input="handleInput" v-model="value9" />
    </demo-block>
    <demo-block :title="$t('she-zhi-qian-hou-icon')">
      <wd-input type="text" v-model="value6" @input="handleInput" prefix-icon="dong" suffix-icon="list" clearable @change="handleChange3" />
    </demo-block>
    <demo-block :title="$t('zi-shu-xian-zhi-0')">
      <wd-input type="text" v-model="value7" @input="handleInput" :maxlength="20" show-word-limit />
    </demo-block>
    <demo-block :title="$t('qu-xiao-di-bu-bian-kuang-zi-ding-yi-shi-yong')">
      <wd-input
        v-model="value8"
        @input="handleInput"
        no-border
        :placeholder="$t('qing-shu-ru-jia-ge')"
        custom-style="display: inline-block; width: 70px; vertical-align: middle;"
      />
      <text class="custom-txt">{{ $t('yuan') }}</text>
    </demo-block>
    <demo-block :title="$t('cell-lei-xing')" transparent>
      <wd-cell-group border>
        <wd-input type="text" :label="$t('jiBenYongFa')" v-model="value12" @input="handleInput" :placeholder="$t('qing-shu-ru-0')" />
        <wd-input type="text" :label="$t('jinYong')" v-model="value13" @input="handleInput" disabled :placeholder="$t('wai-bi-ba-bu')" />
        <wd-input
          type="text"
          :label="$t('qing-chu-mi-ma')"
          v-model="value14"
          @input="handleInput"
          :placeholder="$t('qing-shu-ru-0')"
          clearable
          show-password
        />
        <wd-input
          type="text"
          :label="$t('cuo-wu-zhuang-tai-0')"
          v-model="value15"
          @input="handleInput"
          :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')"
          error
        />
        <wd-input type="text" :label="$t('bi-tian')" v-model="value16" @input="handleInput" :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')" required />
        <wd-input
          type="text"
          :label="$t('bi-tian-xing-hao-zai-you-ce')"
          v-model="value23"
          @input="handleInput"
          :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')"
          required
          marker-side="after"
        />
        <wd-input
          type="text"
          :label="$t('zi-shu-xian-zhi-0')"
          v-model="value22"
          :placeholder="$t('qing-shu-ru-0')"
          :maxlength="20"
          show-word-limit
          clearable
        />
        <wd-input
          type="text"
          :label="$t('tu-biao')"
          v-model="value17"
          @input="handleInput"
          :placeholder="$t('qing-shu-ru-0')"
          prefix-icon="dong"
          suffix-icon="list"
        />
        <wd-input
          type="text"
          :label="$t('zi-ding-yi-cha-cao')"
          center
          v-model="value18"
          @input="handleInput"
          :placeholder="$t('qing-shu-ru-0')"
          clearable
        >
          <template #suffix>
            <wd-button size="small" custom-class="button">{{ $t('huo-qu-yan-zheng-ma') }}</wd-button>
          </template>
        </wd-input>
        <wd-input
          type="text"
          :label="$t('da-chi-cun')"
          clearable
          size="large"
          v-model="value19"
          @input="handleInput"
          :placeholder="$t('qing-shu-ru-0')"
        />
      </wd-cell-group>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const value = ref<string>('')
const value1 = ref<string>(t('zhe-shi-jin-yong-zhuang-tai'))
const value2 = ref<string>(t('zhe-shi-zhi-du-zhuang-tai'))
const value3 = ref<string>('123456')
const value4 = ref<string>(t('zhi-chi-qing-kong'))
const value5 = ref<string>('password')
const value6 = ref<string>('')
const value7 = ref<string>('1234')
const value8 = ref<string>('')
const value9 = ref<number | ''>('')
const value12 = ref<string>('')
const value13 = ref<string>(t('gai-shu-ru-kuang-jin-yong'))
const value14 = ref<string>('12345678')
const value15 = ref<string>('')
const value16 = ref<string>('')
const value17 = ref<string>('')
const value18 = ref<string>('')
const value19 = ref<string>('')
const value20 = ref<string>('')
const value21 = ref<string>('')
const value22 = ref<string>('')
const value23 = ref<string>('')

function handleChange(event: any) {
  console.log(event)
}
function handleChange1(event: any) {
  console.log(event)
}
function handleChange2(event: any) {
  console.log(event)
}
function handleChange3(event: any) {
  console.log(event)
}
function handleBlur(event: any) {
  console.log('失焦', event)
}

function handleInput(event: any) {
  console.log(event)
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .custom-txt {
    color: $-dark-color;
  }
}
.custom-txt {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  line-height: 24px;
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
