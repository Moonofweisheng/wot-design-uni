<template>
  <page-wraper>
    <demo-block :title="$t('ji-chu-yong-fa')">
      <wd-slide-verify @success="handleSuccess" @fail="handleFail" />
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-wen-an')">
      <wd-slide-verify :text="$t('qing-tuo-dong-hua-kuai')" :success-text="$t('yan-zheng-cheng-gong')" />
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-chi-cun')">
      <wd-slide-verify :width="250" :height="50" />
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-yan-se')">
      <wd-slide-verify background-color="#E8F4FF" active-background-color="#4D94FF" />
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-tu-biao')">
      <wd-slide-verify icon="arrow-right" success-icon="read" :icon-size="24" />
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-rong-cuo-fan-wei')">
      <wd-slide-verify :tolerance="20" />
    </demo-block>

    <demo-block :title="$t('jin-yong-zhuang-tai')">
      <wd-slide-verify disabled />
    </demo-block>

    <demo-block :title="$t('cha-cao-yong-fa')">
      <wd-slide-verify>
        <template #text>
          <text>Slide right to complete verification</text>
        </template>
        <template #success-text>
          <text>{{ $t('yan-zheng-tong-guo') }}</text>
        </template>
        <template #icon>
          <view>ICON</view>
        </template>
        <template #success-icon>
          <view style="color: red">OK</view>
        </template>
      </wd-slide-verify>
    </demo-block>
  </page-wraper>
</template>

<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { useI18n } from 'vue-i18n'

const toast = useToast()
const { t } = useI18n()

function handleSuccess() {
  toast.success(t('yan-zheng-cheng-gong'))
}

function handleFail() {
  toast.error(t('yan-zheng-shi-bai-qing-chong-shi'))
}
</script>

<style lang="scss" scoped>
:deep(.wd-slide-verify) {
  margin-bottom: 20px;
}

:deep(.wd-slide-verify:last-child) {
  margin-bottom: 0;
}
</style>
