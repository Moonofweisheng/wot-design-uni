<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <wd-qr-code text="wot-design-uni" />
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-chi-cun')">
      <wd-qr-code text="wot-design-uni" :size="300" />
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-yan-se')">
      <wd-qr-code text="wot-design-uni" color-dark="#3c9cff" color-light="#fff" />
    </demo-block>

    <demo-block :title="$t('dai-logo')">
      <wd-qr-code text="wot-design-uni" :logo="joy" />
    </demo-block>

    <demo-block title="Logo 样式">
      <wd-qr-code
        text="wot-design-uni"
        :logo="joy"
        :logo-width="50"
        :logo-height="50"
        :logo-radius="10"
        logo-background-color="#FFFFFF"
        :logo-border-radius="6"
        logo-border-color="#fff"
        :logo-border-width="4"
      />
    </demo-block>

    <demo-block :title="$t('dian-zhuang')">
      <wd-qr-code text="wot-design-uni" dot-type="dots" :dot-scale="0.9" />
    </demo-block>

    <demo-block :title="$t('yuan-jiao')">
      <wd-qr-code text="wot-design-uni" dot-type="rounded" />
    </demo-block>

    <demo-block :title="$t('ye-hua')">
      <wd-qr-code text="wot-design-uni" dot-type="liquid" />
    </demo-block>

    <demo-block :title="$t('jian-bian')">
      <wd-qr-code text="wot-design-uni" enable-gradient :gradient-direction="45" :gradient-colors="['#FF0000', '#00FF00', '#0000FF']" />
    </demo-block>

    <demo-block title="背景图片">
      <wd-qr-code text="wot-design-uni" :background-image="joy" />
    </demo-block>

    <demo-block :title="$t('dao-chu-tu-pian')">
      <wd-qr-code ref="qrCode" text="wot-design-uni" />
      <view style="margin-top: 15px">
        <wd-button @click="exportImage">{{ $t('dao-chu-tu-pian') }}</wd-button>
      </view>
      <view v-if="imgSrc" style="margin-top: 15px">
        <text>{{ $t('dao-chu-jie-guo') }}</text>
        <image :src="imgSrc" style="width: 200px; height: 200px; display: block" />
      </view>
    </demo-block>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { joy } from '../../pages/images/joy'

const { t } = useI18n()
const qrCode = ref()
const imgSrc = ref('')

function exportImage() {
  qrCode.value
    .exportImage()
    .then((res: string) => {
      imgSrc.value = res
      console.log(res)
      uni.showToast({
        title: t('dao-chu-cheng-gong'),
        icon: 'success'
      })
    })
    .catch((err: any) => {
      console.error(err)
      uni.showToast({
        title: t('dao-chu-shi-bai'),
        icon: 'none'
      })
    })
}
</script>

<style lang="scss" scoped>
.wd-qr-code {
  margin: 0 auto;
}
</style>
