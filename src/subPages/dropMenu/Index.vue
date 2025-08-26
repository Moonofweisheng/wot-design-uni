<template>
  <page-wraper>
    <view @click.stop="">
      <wd-message-box></wd-message-box>
    </view>
    <view class="demo-body">
      <demo-block :title="$t('jiBenYongFa')" transparent>
        <wd-drop-menu>
          <wd-drop-menu-item v-model="value1" :options="option1" @change="handleChange1" />
          <wd-drop-menu-item v-model="value2" :options="option2" @change="handleChange2" />
        </wd-drop-menu>
      </demo-block>
      <demo-block :title="$t('zi-ding-yi-cai-dan-nei-rong')" transparent>
        <wd-drop-menu>
          <wd-drop-menu-item v-model="value3" :options="option1" @change="handleChange3" />
          <wd-drop-menu-item ref="dropMenu" :title="$t('shai-xuan')" @opened="handleOpened">
            <view>
              <wd-slider v-model="valuetest" ref="slider" />
              <wd-cell :title="$t('biao-ti-wen-zi-10')" :value="$t('nei-rong')" />
              <wd-cell :title="$t('biao-ti-wen-zi-10')" :label="$t('miaoShuXinXi-0')" :value="$t('nei-rong')" />
              <view style="padding: 0 10px 20px; box-sizing: border-box">
                <wd-button block size="large" @click="confirm">{{ $t('zhu-yao-an-niu') }}</wd-button>
              </view>
            </view>
          </wd-drop-menu-item>
        </wd-drop-menu>
      </demo-block>
      <demo-block :title="$t('zi-ding-yi-cai-dan-xuan-xiang')" transparent>
        <view class="custom-menu">
          <wd-drop-menu custom-style="flex: 1; min-width: 0">
            <wd-drop-menu-item v-model="value4" :options="option1" @change="handleChange4" />
          </wd-drop-menu>
          <view style="flex: 1">
            <wd-sort-button v-model="value5" :title="$t('shang-jia-shi-jian')" @change="handleChange5" />
          </view>
        </view>
      </demo-block>
      <demo-block :title="$t('zi-ding-yi-cai-dan-tu-biao')" transparent>
        <wd-drop-menu>
          <wd-drop-menu-item :title="$t('di-tu')" icon="location" icon-size="14px" />
        </wd-drop-menu>
      </demo-block>
      <demo-block :title="$t('yi-bu-da-kai-guan-bi')" transparent>
        <wd-drop-menu>
          <wd-drop-menu-item v-model="value10" :options="option1" @change="handleChange1" :before-toggle="handleBeforeToggle" />
        </wd-drop-menu>
      </demo-block>
      <demo-block :title="$t('xiang-shang-dan-chu')" transparent>
        <wd-drop-menu direction="up">
          <wd-drop-menu-item v-model="value6" :options="option1" @change="handleChange6" custom-title="custom-title" custom-icon="custom-icon" />
          <wd-drop-menu-item v-model="value7" :options="option2" @change="handleChange7" />
        </wd-drop-menu>
      </demo-block>
      <demo-block :title="$t('jinYong')" transparent>
        <wd-drop-menu direction="up">
          <wd-drop-menu-item v-model="value8" disabled :options="option1" @change="handleChange8" />
          <wd-drop-menu-item v-model="value9" :options="option2" @change="handleChange9" />
        </wd-drop-menu>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import { useMessage } from '@/uni_modules/wot-design-uni'
import type { SliderInstance } from '@/uni_modules/wot-design-uni/components/wd-slider/types'
import type { DropMenuItemBeforeToggle } from '@/uni_modules/wot-design-uni/components/wd-drop-menu-item/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const messageBox = useMessage()

const dropMenu = ref()
const slider = ref<SliderInstance>()

const valuetest = ref<number>(30)

const value1 = ref<number>(1)
const value2 = ref<number>(0)
const value3 = ref<number>(0)
const value4 = ref<number>(0)
const value5 = ref<number>(0)
const value6 = ref<number>(0)
const value7 = ref<number>(0)
const value8 = ref<number>(0)
const value9 = ref<number>(0)
const value10 = ref<number>(0)

const option1 = ref<Record<string, any>[]>([
  { label: t('quan-bu-shang-pin'), value: 0 },
  { label: t('xin-kuan-shang-pin'), value: 1, tip: t('zhe-shi-bu-chong-xin-xi') },
  { label: t('zhe-shi-bi-jiao-chang-de-shai-xuan-tiao-jian-zhe-shi-bi-jiao-chang-de-shai-xuan-tiao-jian'), value: 2 }
])
const option2 = ref<Record<string, any>[]>([
  { label: t('zong-he'), value: 0 },
  { label: t('xiao-liang'), value: 1 },
  { label: t('shang-jia-shi-jian'), value: 2 }
])

function handleOpened() {
  slider.value?.initSlider()
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

function confirm() {
  dropMenu.value.close()
}

const handleBeforeToggle: DropMenuItemBeforeToggle = ({ status, resolve }) => {
  messageBox
    .confirm({
      title: `${status ? t('yi-bu-da-kai') : t('yi-bu-guan-bi')}`,
      msg: `${status ? t('que-ding-yao-da-kai-xia-la-cai-dan-ma') : t('que-ding-yao-guan-bi-xia-la-cai-dan-ma')}`
    })
    .then(() => {
      resolve(true)
    })
    .catch(() => {
      resolve(false)
    })
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .custom-menu {
    background: $-dark-background2;
  }
}
.demo-body {
  height: 100vh;
}

.custom-menu {
  display: flex;
  background: #fff;
  text-align: center;
}

:deep(.custom-title) {
  color: red;
}
:deep(.custom-icon) {
  color: red;
}
</style>
