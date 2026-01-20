<template>
  <page-wraper>
    <demo-block :title="t('ji-chu-yong-fa')">
      <wd-puzzle-captcha
        puzzle-shape="puzzle"
        decoy-mode
        image-url="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        @success="onSuccess()"
        @fail="onFail()"
      ></wd-puzzle-captcha>
    </demo-block>
  </page-wraper>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useToast } from '@/uni_modules/wot-design-uni'

const { t } = useI18n()

const toast = useToast()

function onSuccess() {
  toast.success(t('yan-zheng-cheng-gong'))
}

function onFail() {
  toast.error(t('yan-zheng-shi-bai-qing-chong-shi'))
}
</script>

<style lang="scss" scoped></style>
