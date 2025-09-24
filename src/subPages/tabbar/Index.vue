<template>
  <page-wraper :safeAreaInsetBottom="false">
    <wd-toast></wd-toast>
    <demo-block hor="0" :title="$t('ji-chu-yong-fa-0')" transparent>
      <wd-tabbar bordered @change="handleChange" v-model="tabbar0">
        <wd-tabbar-item :title="$t('shou-ye')" icon="home"></wd-tabbar-item>
        <wd-tabbar-item :title="$t('fen-lei')" icon="cart"></wd-tabbar-item>
        <wd-tabbar-item :title="$t('wo-de')" icon="user"></wd-tabbar-item>
      </wd-tabbar>
    </demo-block>

    <demo-block hor="0" :title="$t('tong-guo-ming-cheng-pi-pei')" transparent>
      <wd-tabbar bordered @change="handleChange" v-model="tabbar1">
        <wd-tabbar-item name="home" :title="$t('shou-ye')" icon="home"></wd-tabbar-item>
        <wd-tabbar-item name="cart" :title="$t('fen-lei')" icon="cart"></wd-tabbar-item>
        <wd-tabbar-item name="setting" :title="$t('she-zhi')" icon="setting"></wd-tabbar-item>
        <wd-tabbar-item name="user" :title="$t('wo-de')" icon="user"></wd-tabbar-item>
      </wd-tabbar>
    </demo-block>

    <demo-block hor="0" :title="$t('hui-biao-ti-shi')" transparent>
      <wd-tabbar v-model="tabbar2" @change="handleChange">
        <wd-tabbar-item is-dot :value="2" :title="$t('dian-zhuang')" icon="home"></wd-tabbar-item>
        <wd-tabbar-item :value="2" icon="cart" :title="$t('fen-lei')"></wd-tabbar-item>
        <wd-tabbar-item :value="30" :title="$t('wo-de')" icon="user"></wd-tabbar-item>
        <wd-tabbar-item :value="200" :title="$t('zui-da-zhi')" icon="user"></wd-tabbar-item>
      </wd-tabbar>
    </demo-block>
    <demo-block hor="0" :title="$t('xuan-fu-biao-qian-lan')" transparent>
      <wd-tabbar shape="round" v-model="tabbar3" @change="handleChange">
        <wd-tabbar-item :title="$t('shou-ye')" is-dot :value="2" icon="home"></wd-tabbar-item>
        <wd-tabbar-item :title="$t('fen-lei')" :value="2" icon="cart"></wd-tabbar-item>
        <wd-tabbar-item :title="$t('xiang-ce')" :value="30" icon="photo"></wd-tabbar-item>
        <wd-tabbar-item :title="$t('wo-de')" :value="200" icon="user"></wd-tabbar-item>
      </wd-tabbar>
    </demo-block>

    <demo-block hor="0" :title="$t('ziDingYiTuBiao')" transparent>
      <wd-tabbar v-model="tabbar4" @change="handleChange">
        <wd-tabbar-item :value="2" :title="$t('shou-ye')" icon="home"></wd-tabbar-item>
        <wd-tabbar-item :value="2" icon="cart" :title="$t('fen-lei')">
          <template #icon>
            <wd-img round height="40rpx" width="40rpx" src="https://wot-ui.cn/assets/panda.jpg"></wd-img>
          </template>
        </wd-tabbar-item>
        <wd-tabbar-item :value="3" :title="$t('wo-de')" icon="user"></wd-tabbar-item>
      </wd-tabbar>
    </demo-block>

    <demo-block hor="0" :title="$t('zi-ding-yi-yan-se-0')" transparent>
      <wd-tabbar v-model="tabbar5" @change="handleChange" active-color="#ee0a24" inactive-color="#7d7e80">
        <wd-tabbar-item is-dot :value="2" :title="$t('dian-zhuang-0')" icon="home"></wd-tabbar-item>
        <wd-tabbar-item :value="2" icon="cart" :title="$t('fen-lei')"></wd-tabbar-item>
        <wd-tabbar-item :value="30" :title="$t('wo-de')" icon="user"></wd-tabbar-item>
        <wd-tabbar-item :value="200" :title="$t('zui-da-zhi-0')" icon="photo"></wd-tabbar-item>
        <wd-tabbar-item :value="10" :title="$t('ke-fu')" icon="chat"></wd-tabbar-item>
      </wd-tabbar>
    </demo-block>
    <demo-block hor="0" :title="$t('jian-ting-qie-huan-shi-jian')" transparent>
      <wd-tabbar v-model="tabbar6" @change="handleChange1" active-color="#ee0a24" inactive-color="#7d7e80">
        <wd-tabbar-item :title="$t('shou-ye')" icon="home"></wd-tabbar-item>
        <wd-tabbar-item :title="$t('fen-lei')" icon="cart"></wd-tabbar-item>
        <wd-tabbar-item :title="$t('wo-de')" icon="user"></wd-tabbar-item>
        <wd-tabbar-item :title="$t('xiang-ce')" icon="photo"></wd-tabbar-item>
        <wd-tabbar-item :title="$t('ke-fu')" icon="chat"></wd-tabbar-item>
      </wd-tabbar>
    </demo-block>

    <demo-block hor="0" :title="$t('gu-ding-di-bu')" transparent>
      <wd-tabbar fixed shape="round" v-model="tabbar7" @change="handleChange" bordered safeAreaInsetBottom placeholder>
        <wd-tabbar-item :value="2" is-dot :title="$t('shou-ye')" icon="home"></wd-tabbar-item>
        <wd-tabbar-item :title="$t('fen-lei')" icon="cart"></wd-tabbar-item>
        <wd-tabbar-item :title="$t('wo-de')" icon="user"></wd-tabbar-item>
        <wd-tabbar-item :value="200" :title="$t('xiang-ce')" icon="photo"></wd-tabbar-item>
        <wd-tabbar-item :value="10" :title="$t('ke-fu')" icon="chat"></wd-tabbar-item>
      </wd-tabbar>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { show } = useToast()
const tabbar0 = ref(1)
const tabbar1 = ref('home')
const tabbar2 = ref(2)
const tabbar3 = ref(2)
const tabbar4 = ref(1)
const tabbar5 = ref(1)
const tabbar6 = ref(1)
const tabbar7 = ref(1)
function handleChange(event: any) {
  console.log(event)
}

function handleChange1({ value }: { value: string }) {
  show(t('xuan-zhong-biao-qian-value') + value)
}
</script>
<style lang="scss" scoped>
:deep(.page-wraper) {
  background: #f6f6f6;
}
</style>
