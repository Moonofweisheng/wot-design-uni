<!--
 * @Author: weisheng
 * @Date: 2024-11-09 12:35:25
 * @LastEditTime: 2025-03-30 20:47:41
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/pages/form/demo2.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <wd-form ref="form" :model="model" :reset-on-change="false">
      <wd-cell-group border>
        <wd-input
          :label="$t('wai-bi-ba-bu')"
          label-width="100px"
          prop="name"
          clearable
          v-model="model.name"
          :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')"
          @blur="handleBlur('name')"
          :rules="[{ required: true, message: $t('qing-shu-ru-wai-bi-ba-bu') }]"
        />
        <wd-input
          :label="$t('ma-ka-ba-ka-dan-hao-0')"
          prop="phoneNumber"
          label-width="100px"
          clearable
          @blur="handleBlur('phoneNumber')"
          v-model="model.phoneNumber"
          :placeholder="$t('ma-ka-ba-ka-dan-hao')"
          :rules="[{ required: true, message: $t('ma-ka-ba-ka-dan-hao') }]"
        />

        <wd-input
          :label="$t('ma-ka-ba-ka-id')"
          prop="id"
          label-width="100px"
          clearable
          @blur="handleBlur('id')"
          v-model="model.id"
          :placeholder="$t('qing-tian-xie-ma-ka-ba-ka-id')"
          :rules="[{ required: true, message: $t('qing-tian-xie-ma-ka-ba-ka-id') }]"
        />
      </wd-cell-group>
    </wd-form>

    <view class="footer">
      <wd-button type="primary" @click="handleSubmit">{{ $t('ti-jiao') }}</wd-button>
      <wd-button type="primary" @click="handleValidate">{{ $t('xiao-yan-dan-hao-he-id') }}</wd-button>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { FormInstance } from '@/uni_modules/wot-design-uni/components/wd-form/types'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const model = reactive<{
  name: string
  phoneNumber: string
  id: string
}>({
  name: '',
  phoneNumber: '',
  id: ''
})

const { success: showSuccess } = useToast()
const form = ref<FormInstance>()

function handleBlur(prop: string) {
  form.value!.validate(prop)
}

function handleValidate() {
  form
    .value!.validate(['phoneNumber', 'id'])
    .then(({ valid }) => {
      if (valid) {
        showSuccess(t('xiao-yan-tong-guo'))
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleSubmit() {
  form
    .value!.validate()
    .then(({ valid }) => {
      if (valid) {
        showSuccess(t('xiao-yan-tong-guo'))
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>
<style lang="scss" scoped>
.footer {
  padding: 12px;
  display: flex;
}
</style>
