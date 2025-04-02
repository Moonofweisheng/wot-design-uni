<template>
  <page-wraper>
    <wd-form ref="form" :model="model" errorType="toast">
      <wd-cell-group border>
        <wd-input
          :label="$t('wai-bi-ba-bu')"
          label-width="100px"
          prop="value1"
          clearable
          v-model="model.value1"
          :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')"
          :rules="[{ required: true, message: $t('qing-shu-ru-wai-bi-ba-bu') }]"
        />
        <wd-input
          :label="$t('sha-ka-la-ka')"
          label-width="100px"
          prop="value2"
          show-password
          clearable
          v-model="model.value2"
          :placeholder="$t('qing-shu-ru-sha-ka-la-ka')"
          :rules="[{ required: true, message: $t('qing-shu-ru-sha-ka-la-ka') }]"
        />
      </wd-cell-group>
      <view class="footer">
        <wd-button type="primary" size="large" @click="handleSubmit" block>{{ $t('ti-jiao') }}</wd-button>
      </view>
    </wd-form>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { FormInstance } from '@/uni_modules/wot-design-uni/components/wd-form/types'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { success: showSuccess } = useToast()
const model = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: ''
})

const form = ref<FormInstance>()

function handleSubmit() {
  form
    .value!.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: t('xiao-yan-tong-guo')
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
